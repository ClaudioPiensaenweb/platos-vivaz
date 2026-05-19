import { NextResponse } from "next/server";
import { createDirectus, rest, staticToken, createItem } from "@directus/sdk";
import nodemailer from "nodemailer";
import { generateAdminEmail, generateUserEmail } from "@/lib/email-templates";

// Server-side: prefer DIRECTUS_INTERNAL_URL (http://127.0.0.1:8056)
// NEXT_PUBLIC_DIRECTUS_URL is the *public* URL for the browser — using it
// from the server causes SSL errors when Directus runs on plain HTTP internally.
const DIRECTUS_URL =
  process.env.DIRECTUS_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  "http://localhost:8055";
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || "";

// ── SMTP transport (Nodemailer + Strato) ───────────────────────
// Configured via env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// Falls back gracefully — if SMTP_USER is not set, emails are skipped.
function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true para 465 SSL/TLS, false para 587 STARTTLS
    auth: { user, pass },
  });
}

// ── Simple in-memory rate limiter ──────────────────────────────
// Max 5 submissions per IP within a 15-minute window
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, { n: number; t: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now - e.t > RATE_WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  e.n++;
  return e.n > RATE_MAX;
}

// Cleanup stale entries every 30 min
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, e] of hits) {
      if (now - e.t > RATE_WINDOW_MS) hits.delete(ip);
    }
  }, 30 * 60 * 1000);
}

// ── Cloudflare Turnstile verification ─────────────────────────
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("Contact form: TURNSTILE_SECRET_KEY not set — skipping captcha");
    return true; // fail open en desarrollo sin clave
  }
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v1/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// ── Input sanitization ─────────────────────────────────────────
/** Strip newlines / control chars → prevents email header injection */
function san(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\r\n\t\x00-\x1f]/g, " ").trim().slice(0, 1000);
}
function sanEmail(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\r\n\t\x00-\x1f\s]/g, "").trim().slice(0, 254);
}

export async function POST(request: Request) {
  try {
    // ── Rate limiting ──
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();

    // ── Turnstile verification (anti-spam) ──
    const turnstileToken = typeof body["cf-turnstile-response"] === "string"
      ? body["cf-turnstile-response"]
      : "";
    const turnstileOk = await verifyTurnstile(turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Captcha verification failed. Please try again." },
        { status: 400 }
      );
    }

    const name        = san(body.name);
    const apellidos   = san(body.apellidos);
    const email       = sanEmail(body.email);
    const phone       = san(body.phone);
    const market      = san(body.market);
    const message     = san(body.message);
    const source_page = san(body.source_page);
    const company     = san(body.company);
    const interest    = san(body.interest);

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!ADMIN_TOKEN) {
      console.warn("Contact form: DIRECTUS_ADMIN_TOKEN not set");
      return NextResponse.json({ success: true, fallback: true });
    }

    const client = createDirectus(DIRECTUS_URL)
      .with(staticToken(ADMIN_TOKEN))
      .with(rest());

    await client.request(
      createItem("crm_leads", {
        name,
        apellidos,
        email,
        phone,
        company,
        market: market || "Internacional",
        interest,
        message,
        source_page,
        status: "new",
      }),
    );

    // Lead saved — enviar emails vía SMTP (no bloquea la respuesta)
    const transport = createTransport();
    if (transport) {
      // Enrutar según mercado: Nacional → email_national, Internacional → email_export
      const isNacional = (market || "").toLowerCase() === "nacional";
      const adminTo = isNacional
        ? (process.env.ADMIN_EMAIL_NACIONAL || process.env.ADMIN_EMAIL || "info@platosvivaz.com")
        : (process.env.ADMIN_EMAIL_EXPORT   || process.env.ADMIN_EMAIL || "sales@vivazclaytargets.com");
      const fromAddr  = process.env.SMTP_USER   || "web@platosvivaz.com";
      const fromLabel = `VIVAZ Clay Targets <${fromAddr}>`;
      const fullName  = [name, apellidos].filter(Boolean).join(" ");

      try {
        await Promise.all([
          transport.sendMail({
            from:    fromLabel,
            to:      adminTo,
            subject: `Nuevo contacto: ${fullName} — ${market || "Internacional"}`,
            html:    generateAdminEmail({
              name: fullName, email, phone, company,
              market: market || "Internacional", interest, message, source_page,
            }),
          }),
          transport.sendMail({
            from:    fromLabel,
            to:      email,
            subject: "Hemos recibido tu mensaje — VIVAZ Clay Targets",
            html:    generateUserEmail({ name }),
          }),
        ]);
      } catch (emailError) {
        // El fallo de email nunca debe bloquear la respuesta ni perder el lead
        console.error("SMTP email error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: true, fallback: true });
  }
}
