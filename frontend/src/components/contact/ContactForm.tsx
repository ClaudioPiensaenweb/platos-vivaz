"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import TurnstileWidget, { type TurnstileRef } from "@/components/ui/TurnstileWidget";
import { Link } from "@/i18n/navigation";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export default function ContactForm({ defaultMessage }: { defaultMessage?: string }) {
  const t = useTranslations("contact");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileRef>(null);

  const [formData, setFormData] = useState({
    name: "",
    apellidos: "",
    email: "",
    phone: "",
    market: "Nacional",
    message: defaultMessage || "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyChecked || !turnstileToken) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source_page: window.location.pathname,
          "cf-turnstile-response": turnstileToken,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", apellidos: "", email: "", phone: "", market: "Nacional", message: "" });
        setPrivacyChecked(false);
        setTurnstileToken(null);
      } else {
        setStatus("error");
        // Reset widget so user can retry
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[20px] bg-nature/20 p-8 text-center">
        <p className="text-[18px] font-medium text-primary">{t("success")}</p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-[10px] border border-cream bg-cream-light px-4 py-3 font-body text-[15px] text-foreground transition-colors focus:border-primary focus:bg-white focus:outline-none";

  const canSubmit = privacyChecked && !!turnstileToken && status !== "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-body text-sm font-medium text-primary">
            {t("name")}
          </label>
          <input
            id="name" name="name" type="text" required
            value={formData.name} onChange={handleChange} className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="apellidos" className="mb-1.5 block font-body text-sm font-medium text-primary">
            {t("apellidos")}
          </label>
          <input
            id="apellidos" name="apellidos" type="text"
            value={formData.apellidos} onChange={handleChange} className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-body text-sm font-medium text-primary">
            {t("email")}
          </label>
          <input
            id="email" name="email" type="email" required
            value={formData.email} onChange={handleChange} className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block font-body text-sm font-medium text-primary">
            {t("phone")}
          </label>
          <input
            id="phone" name="phone" type="tel"
            value={formData.phone} onChange={handleChange} className={inputClasses}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="market" className="mb-1.5 block font-body text-sm font-medium text-primary">
            {t("market")}
          </label>
          <select
            id="market" name="market"
            value={formData.market} onChange={handleChange} className={inputClasses}
          >
            <option value="Nacional">{t("marketNational")}</option>
            <option value="Internacional">{t("marketInternational")}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-body text-sm font-medium text-primary">
          {t("message")}
        </label>
        <textarea
          id="message" name="message" rows={5}
          value={formData.message} onChange={handleChange} className={inputClasses}
        />
      </div>

      {/* Privacy checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="privacy" type="checkbox" required
          checked={privacyChecked}
          onChange={(e) => setPrivacyChecked(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-cream text-primary focus:ring-primary"
        />
        <label htmlFor="privacy" className="font-body text-[13px] leading-relaxed text-muted">
          {t("privacyConsent")}{" "}
          <Link
            href="/politica-privacidad"
            target="_blank"
            className="underline hover:text-primary transition-colors"
          >
            {t("privacyLink")}
          </Link>
        </label>
      </div>

      {/* Cloudflare Turnstile — only renders when site key is configured */}
      {TURNSTILE_SITE_KEY && (
        <TurnstileWidget
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onVerify={setTurnstileToken}
          onExpire={() => setTurnstileToken(null)}
        />
      )}

      {status === "error" && (
        <p className="font-body text-sm text-danger">{t("error")}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!canSubmit}
      >
        {status === "sending" ? "..." : t("send")}
      </Button>
    </form>
  );
}
