import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";

interface HeroSectionProps {
  market?: "national" | "export";
}

/* Decorative reticle/scope component (mirilla) */
function Mirilla({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`absolute hidden lg:block ${className}`}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="30" cy="30" r="28" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
      {/* Inner circle */}
      <circle cx="30" cy="30" r="12" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      {/* Crosshair lines */}
      <line x1="30" y1="0" x2="30" y2="18" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="30" y1="42" x2="30" y2="60" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="0" y1="30" x2="18" y2="30" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="42" y1="30" x2="60" y2="30" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
      {/* Center dot */}
      <circle cx="30" cy="30" r="2" fill="white" fillOpacity="0.3" />
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
        src="/img/hero-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
        quality={90}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      {/* Topographic SVG overlay (decorative) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-10">
        <Image
          src="/svg/hero-overlay.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Decorative reticles (mirillas) */}
      <Mirilla size={60} className="left-[19.5%] top-[32%]" />
      <Mirilla size={60} className="right-[20.9%] top-[49%]" />
      <Mirilla size={48} className="left-[48%] top-[32%]" />

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
