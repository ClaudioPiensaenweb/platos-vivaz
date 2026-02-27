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

/* Green corner mark from briefing/v2/marca-esquina.svg (20x20px) */
function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute hidden lg:block ${className}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="20" y1="0.5" x2="-4.37114e-08" y2="0.499998" stroke="#075627" />
      <line x1="0.5" y1="-2.18557e-08" x2="0.500001" y2="20" stroke="#075627" />
    </svg>
  );
}

export default function HeroSection({ market }: HeroSectionProps) {
  const t = useTranslations("hero");

  const description =
    market === "national" ? t("descriptionNational") : t("descriptionExport");

  return (
    <section className="relative -mt-[130px] flex h-screen min-h-[700px] items-center overflow-hidden lg:min-h-[996px]">
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

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Crosshair decorations (desktop only) */}
      <CrosshairHero className="left-[15%] top-[28%]" />
      <CrosshairHero className="right-[18%] top-[55%]" />
      <CrosshairHero className="left-[52%] top-[22%]" />

      {/* Corner mark decorations (desktop only) */}
      <CornerMark className="left-[10%] top-[20%]" />
      <CornerMark className="right-[10%] top-[20%]" />
      <CornerMark className="left-[10%] bottom-[20%]" />
      <CornerMark className="right-[10%] bottom-[20%]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-[130px] text-center">
        <p className="animate-fade-in-up mb-4 flex items-center gap-3 font-body text-base font-medium uppercase tracking-[4.16px] text-white md:text-lg lg:text-[26px]">
          <span className="inline-block h-[10px] w-[10px] rounded-full bg-accent lg:h-[14px] lg:w-[14px]" />
          {t("subtitle")}
        </p>
        <h1 className="animate-fade-in-up delay-100 mb-6 max-w-4xl break-words text-3xl font-bold leading-tight tracking-[-1.5px] text-white md:text-5xl lg:text-[72px] lg:leading-[88px] lg:tracking-[-2.88px]">
          {t("title")}
        </h1>
        <p className="animate-fade-in-up delay-200 mb-8 max-w-2xl font-body text-base text-white md:text-lg lg:text-[26px]">
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
