import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

interface HeroSectionProps {
  market?: "national" | "export";
}

/* White crosshair decoration from briefing/v2/target-hero.svg (39x40px) */
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
      <line x1="20.0049" y1="-2.18557e-08" x2="20.0049" y2="39" stroke="white" />
      <line x1="39" y1="39.5" x2="-4.37114e-08" y2="39.5" stroke="white" />
    </svg>
  );
}


export default function HeroSection({ market }: HeroSectionProps) {
  const t = useTranslations("hero");

  const description =
    market === "national" ? t("descriptionNational") : t("descriptionExport");

  return (
    <section className="relative z-10 flex h-dvh min-h-[600px] items-center overflow-hidden rounded-bl-[60px] rounded-br-[60px] md:rounded-bl-[120px] md:rounded-br-[120px] lg:min-h-[900px]">
      {/* Background Image */}
      <Image
        src="/img/hero-forest.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
        quality={90}
      />

      {/* Dark overlay matching Figma (flat 40% black) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Crosshair decorations — positioned to frame the content, not overlap */}
      <CrosshairHero className="left-1/2 top-[22%] -translate-x-1/2" />
      <CrosshairHero className="left-[12%] top-1/2 -translate-y-1/2 -rotate-90 xl:left-[18%]" />
      <CrosshairHero className="right-[12%] top-1/2 -translate-y-1/2 rotate-90 xl:right-[18%]" />

      {/* Content — fluid responsive sizing */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-8">
        <p
          className="animate-fade-in-up mb-3 font-body font-medium uppercase tracking-[3px] text-white md:mb-4 md:tracking-[4.16px]"
          style={{ fontSize: "clamp(0.75rem, 0.5rem + 1vw, 1.25rem)" }}
        >
          {t("subtitle")}
        </p>
        <h1
          className="animate-fade-in-up delay-100 mb-4 max-w-[90%] break-words font-bold leading-[1.1] text-white md:mb-6 md:max-w-4xl"
          style={{ fontSize: "clamp(1.75rem, 1rem + 4vw, 4rem)", letterSpacing: "-0.04em" }}
        >
          {t("title")}
        </h1>
        <p
          className="animate-fade-in-up delay-200 mb-6 max-w-[85%] font-body font-medium text-white md:mb-8 md:max-w-2xl"
          style={{ fontSize: "clamp(0.813rem, 0.6rem + 0.8vw, 1.25rem)" }}
        >
          {description}
        </p>
        <div className="animate-fade-in-up delay-300">
          <MagneticButton>
            <Button href="/productos" size="lg">
              {t("cta")}
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
