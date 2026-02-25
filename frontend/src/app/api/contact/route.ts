import { NextResponse } from "next/server";
import { createDirectus, rest, staticToken, createItem } from "@directus/sdk";
import { Resend } from "resend";
import { generateAdminEmail, generateUserEmail } from "@/lib/email-templates";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || "";

// Resend client — null if RESEND_API_KEY not configured (graceful degradation)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, market, interest, message, source_page } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!ADMIN_TOKEN) {
      console.warn("Contact form: DIRECTUS_ADMIN_TOKEN not set, logging lead locally");
      console.log("New lead:", { name, email, phone, company, market, interest, message, source_page });
      return NextResponse.json({ success: true, fallback: true });
    }

    const client = createDirectus(DIRECTUS_URL)
      .with(staticToken(ADMIN_TOKEN))
      .with(rest());

    await client.request(
      createItem("crm_leads", {
        name,
        email,
        phone: phone || "",
        company: company || "",
        market: market || "Internacional",
        interest: interest || "Distribución",
        message: message || "",
        source_page: source_page || "",
        status: "new",
      })
    );

    // Lead saved successfully — now send emails (non-blocking for response)
    if (resend) {
      const adminTo = process.env.ADMIN_EMAIL || "admin@platosvivaz.com";
      const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      try {
        const [adminResult, userResult] = await Promise.all([
          resend.emails.send({
            from: `Vivaz Notificaciones <${fromAddress}>`,
            to: adminTo,
            subject: `Nuevo contacto: ${name} - ${company || "Sin empresa"}`,
            html: generateAdminEmail({ name, email, phone: phone || "", company: company || "", market: market || "Internacional", interest: interest || "Distribución", message: message || "", source_page: source_page || "" }),
          }),
          resend.emails.send({
            from: `VIVAZ Clay Targets <${fromAddress}>`,
            to: email,
            subject: "Hemos recibido tu mensaje - VIVAZ Clay Targets",
            html: generateUserEmail({ name }),
          }),
        ]);

        if (adminResult.error) console.error("Admin email failed:", adminResult.error);
        if (userResult.error) console.error("User email failed:", userResult.error);
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Do NOT rethrow — form submission already succeeded
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    // Still return success to user so they know their message was received
    return NextResponse.json({ success: true, fallback: true });
  }
}
