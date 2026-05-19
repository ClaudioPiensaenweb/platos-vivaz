import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

interface HeroSectionProps {
  market?: "national" | "export";
}

function CrosshairHero({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute hidden lg:block ${className}`}
      width="39"
      height="40"
      viewBox="0 0 39 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="20.0049" y1="0" x2="20.0049" y2="39" stroke="white" />
      <line x1="39" y1="39.5" x2="0" y2="39.5" stroke="white" />
    </svg>
  );
}

export default function HeroSection({ market }: HeroSectionProps) {
  const t = useTranslations("hero");
  const description = t("description");

  return (
    <>
      {/* ═══ DESKTOP (lg+): fullscreen video hero ═══ */}
      <section className="relative z-10 hidden lg:flex h-dvh min-h-[900px] items-center overflow-hidden rounded-bl-[120px] rounded-br-[120px]">
        <video
          autoPlay muted loop playsInline
          poster="/img/hero-forest.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/img/hero-video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <CrosshairHero className="left-1/2 top-[22%] -translate-x-1/2" />
        <CrosshairHero className="left-[18%] top-1/2 -translate-y-1/2 -rotate-90" />
        <CrosshairHero className="right-[18%] top-1/2 -translate-y-1/2 rotate-90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <p className="animate-fade-in-up mb-4 font-body font-medium uppercase tracking-[4.16px] text-white" style={{ fontSize: "clamp(0.75rem, 0.5rem + 1vw, 1.25rem)" }}>
            {t("subtitle")}
          </p>
          <h1 className="animate-fade-in-up delay-100 mb-6 max-w-4xl break-words font-bold leading-[1.1] text-white" style={{ fontSize: "clamp(2rem, 1rem + 4vw, 4rem)", letterSpacing: "-0.04em" }}>
            {t("title")}
          </h1>
          <p className="animate-fade-in-up delay-200 mb-8 max-w-3xl font-body font-medium text-white/90" style={{ fontSize: "clamp(0.875rem, 0.6rem + 0.8vw, 1.25rem)" }}>
            {description}
          </p>
          <div className="animate-fade-in-up delay-300">
            <MagneticButton>
              <Button href="/productos" size="lg">{t("cta")}</Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ═══ MOBILE/TABLET: video 16:9 top + text on cream bottom = 90svh ═══ */}
      <section className="relative z-10 flex flex-col lg:hidden" style={{ height: "90svh" }}>
        {/* Video — 16:9, flush edges, subtle overlay only */}
        <div className="relative w-full flex-shrink-0" style={{ aspectRatio: "16/9" }}>
          <video
            autoPlay muted loop playsInline
            poster="/img/hero-forest.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/img/hero-video.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Text — cream bg, fills remaining space */}
        <div className="flex flex-1 flex-col items-center justify-center bg-cream px-5 py-4 text-center">
          <p className="animate-fade-in-up mb-1.5 font-body text-[10px] font-medium uppercase tracking-[2.5px] text-primary/50">
            {t("subtitle")}
          </p>
          <h1 className="animate-fade-in-up delay-100 mb-2 font-bold leading-[1.12] tracking-[-0.03em] text-primary text-[clamp(1.3rem,4.5vw,1.75rem)]">
            {t("title")}
          </h1>
          <p className="animate-fade-in-up delay-200 mb-4 max-w-sm font-body text-[12px] font-medium leading-[1.55] text-muted">
            {description}
          </p>
          <div className="animate-fade-in-up delay-300">
            <Button href="/productos" size="md">{t("cta")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
