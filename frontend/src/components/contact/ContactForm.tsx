"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    market: "Nacional",
    interest: "Distribución",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source_page: window.location.pathname }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", market: "Nacional", interest: "Distribución", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[20px] bg-nature/20 p-8 text-center">
        <p className="text-[18px] font-medium text-primary">{t("success")}</p>
      </div>
    );
  }

  const inputClasses = "w-full rounded-[10px] border border-cream bg-cream-light px-4 py-3 font-body text-[15px] text-foreground transition-colors focus:border-primary focus:bg-white focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-body text-sm font-medium text-primary">{t("name")}</label>
          <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-body text-sm font-medium text-primary">{t("email")}</label>
          <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block font-body text-sm font-medium text-primary">{t("phone")}</label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block font-body text-sm font-medium text-primary">{t("company")}</label>
          <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="market" className="mb-1.5 block font-body text-sm font-medium text-primary">{t("market")}</label>
          <select id="market" name="market" value={formData.market} onChange={handleChange} className={inputClasses}>
            <option value="Nacional">{t("marketNational")}</option>
            <option value="Internacional">{t("marketInternational")}</option>
          </select>
        </div>
        <div>
          <label htmlFor="interest" className="mb-1.5 block font-body text-sm font-medium text-primary">{t("interest")}</label>
          <select id="interest" name="interest" value={formData.interest} onChange={handleChange} className={inputClasses}>
            <option value="Distribución">{t("interestDistribution")}</option>
            <option value="Club/Campo">{t("interestClub")}</option>
            <option value="Tirador">{t("interestShooter")}</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-body text-sm font-medium text-primary">{t("message")}</label>
        <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className={inputClasses} />
      </div>

      {status === "error" && (
        <p className="font-body text-sm text-danger">{t("error")}</p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full">
        {status === "sending" ? "..." : t("send")}
      </Button>
    </form>
  );
}
