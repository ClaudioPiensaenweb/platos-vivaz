"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "vivaz-cookie-consent";
const CONSENT_VERSION = "1";

interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
}

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const consent: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    version: CONSENT_VERSION,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("vivaz:consent-updated", { detail: consent }));

  // Update GTM Consent Mode v2 in real time
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    });
  }
}

// ── Toggle component ──────────────────────────────────────────────
function CookieToggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-warm-white/5 px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="font-body text-[14px] font-semibold text-warm-white">{label}</p>
        <p className="mt-0.5 font-body text-[12px] text-warm-white/60 leading-relaxed">
          {description}
        </p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/50 ${
          checked ? "bg-nature" : "bg-warm-white/20"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-warm-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

// ── Main banner ───────────────────────────────────────────────────
export default function CookieBanner() {
  const t = useTranslations("cookieBanner");

  const [visible, setVisible] = useState(false);
  const [configMode, setConfigMode] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Show banner only if no stored consent
    const consent = getStoredConsent();
    if (!consent) {
      setVisible(true);
    }

    // Listen for "manage cookies" trigger from footer button
    const handleOpen = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setConfigMode(true);
      setVisible(true);
    };
    window.addEventListener("vivaz:open-cookies", handleOpen);
    return () => window.removeEventListener("vivaz:open-cookies", handleOpen);
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    saveConsent(true, true);
    setVisible(false);
    setConfigMode(false);
  };

  const handleRejectAll = () => {
    saveConsent(false, false);
    setVisible(false);
    setConfigMode(false);
  };

  const handleSave = () => {
    saveConsent(analytics, marketing);
    setVisible(false);
    setConfigMode(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("title")}
      className="fixed bottom-0 left-0 right-0 z-50 bg-primary shadow-2xl border-t border-warm-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-8">
        {!configMode ? (
          /* ── Default banner ── */
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-warm-white text-[15px]">{t("title")}</p>
              <p className="mt-1 font-body text-[13px] text-warm-white/70 leading-relaxed">
                {t("description")}{" "}
                <Link
                  href="/politica-cookies"
                  className="underline underline-offset-2 hover:text-warm-white transition-colors"
                >
                  {t("cookiePolicy")}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:flex-shrink-0">
              <button
                onClick={handleRejectAll}
                className="rounded-full border border-warm-white/25 px-5 py-2 font-body text-[13px] font-medium text-warm-white/75 transition-colors hover:border-warm-white/50 hover:text-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/40"
              >
                {t("rejectAll")}
              </button>
              <button
                onClick={() => setConfigMode(true)}
                className="rounded-full border border-warm-white/25 px-5 py-2 font-body text-[13px] font-medium text-warm-white/75 transition-colors hover:border-warm-white/50 hover:text-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/40"
              >
                {t("configure")}
              </button>
              <button
                onClick={handleAcceptAll}
                className="rounded-full bg-nature px-5 py-2 font-body text-[13px] font-semibold text-primary transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-nature/60"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        ) : (
          /* ── Configure mode ── */
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-warm-white text-[15px]">{t("configure")}</p>
            <div className="flex flex-col gap-2">
              <CookieToggle
                label={t("necessary")}
                description={t("necessaryDesc")}
                checked={true}
                disabled={true}
                onChange={() => {}}
              />
              <CookieToggle
                label={t("analytics")}
                description={t("analyticsDesc")}
                checked={analytics}
                onChange={setAnalytics}
              />
              <CookieToggle
                label={t("marketing")}
                description={t("marketingDesc")}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={handleRejectAll}
                className="rounded-full border border-warm-white/25 px-5 py-2 font-body text-[13px] font-medium text-warm-white/75 transition-colors hover:border-warm-white/50 hover:text-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/40"
              >
                {t("rejectAll")}
              </button>
              <button
                onClick={handleAcceptAll}
                className="rounded-full border border-warm-white/25 px-5 py-2 font-body text-[13px] font-medium text-warm-white/75 transition-colors hover:border-warm-white/50 hover:text-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/40"
              >
                {t("acceptAll")}
              </button>
              <button
                onClick={handleSave}
                className="rounded-full bg-nature px-5 py-2 font-body text-[13px] font-semibold text-primary transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-nature/60"
              >
                {t("save")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
