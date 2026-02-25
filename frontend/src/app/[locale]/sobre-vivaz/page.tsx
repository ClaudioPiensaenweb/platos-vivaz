import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import TimelineSection from "@/components/about/TimelineSection";
import { sharedOpenGraph } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const title = `${t("title")} | VIVAZ Clay Targets`;
  return {
    title,
    description: t("metaDescription"),
    openGraph: { ...sharedOpenGraph, title, description: t("metaDescription") },
  };
}

/* SVG icon components for the values section (no emoji) */
function QualityIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Crosshair / target */}
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <line x1="16" y1="0" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="25" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="16" x2="7" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InnovationIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Lightbulb */}
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1.4.58 2.67 1.5 3.56.78.76 1.23 1.5 1.41 2.44" />
    </svg>
  );
}

function SustainabilityIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Leaf */}
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function ServiceIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Handshake */}
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  );
}

const VALUE_ICONS = {
  valueQuality: { Icon: QualityIcon, bg: "bg-primary", text: "text-warm-white" },
  valueInnovation: { Icon: InnovationIcon, bg: "bg-accent", text: "text-white" },
  valueSustainability: { Icon: SustainabilityIcon, bg: "bg-success", text: "text-white" },
  valueService: { Icon: ServiceIcon, bg: "bg-primary-dark", text: "text-warm-white" },
} as const;

export default async function SobreVivazPage() {
  const t = await getTranslations("about");

  const timelineEvents = [
    {
      year: 1967,
      title: t("timeline.founded"),
      description: t("timeline.foundedDesc"),
    },
    {
      year: 2001,
      title: t("timeline.pioneers"),
      description: t("timeline.pioneersDesc"),
    },
    {
      year: 2026,
      title: t("timeline.regulation"),
      description: t("timeline.regulationDesc"),
    },
  ];

  const values = Object.keys(VALUE_ICONS) as (keyof typeof VALUE_ICONS)[];

  return (
    <main>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage="/img/commitment-bg.png"
        backgroundOpacity="opacity-30"
      />

      {/* History */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <InView animation="slide-in-left">
              <div className="overflow-hidden rounded-[24px]">
                <Image
                  src="/img/why-quality.png"
                  alt={t("historyTitle")}
                  width={464}
                  height={275}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </InView>
            <InView animation="slide-in-right">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 rounded-full bg-accent" />
                <span className="text-[13px] font-medium uppercase tracking-[2px] text-accent">1967</span>
              </div>
              <h2 className="mb-6 text-[28px] font-bold leading-tight text-primary lg:text-[34px]">
                {t("historyTitle")}
              </h2>
              <p className="font-body text-[17px] leading-[30px] text-muted">
                {t("historyDesc")}
              </p>
            </InView>
          </div>
        </Container>
      </section>

      {/* Timeline — 1967 / 2001 / 2026 milestones */}
      <section className="bg-cream-light py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <div className="mb-12 text-center">
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <span className="text-[13px] font-medium uppercase tracking-[3px] text-accent">
                  VIVAZ
                </span>
                <div className="h-px w-8 bg-accent" />
              </div>
              <h2 className="text-[28px] font-bold text-primary lg:text-[34px]">
                {t("pioneerTitle")}
              </h2>
            </div>
          </InView>
          <TimelineSection events={timelineEvents} />
        </Container>
      </section>

      {/* Pioneers — narrative section */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <InView animation="slide-in-left" className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 rounded-full bg-primary" />
                <span className="text-[13px] font-medium uppercase tracking-[2px] text-primary">2001</span>
              </div>
              <h2 className="mb-6 text-[28px] font-bold leading-tight text-primary lg:text-[34px]">
                {t("pioneerTitle")}
              </h2>
              <p className="font-body text-[17px] leading-[30px] text-muted">
                {t("pioneerDesc")}
              </p>
            </InView>
            <InView animation="slide-in-right" className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[24px]">
                <Image
                  src="/img/why-sustainability.png"
                  alt={t("pioneerTitle")}
                  width={481}
                  height={275}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </InView>
          </div>
        </Container>
      </section>

      {/* Factory — full-bleed image with overlay card */}
      <section className="relative overflow-hidden bg-primary-dark py-0">
        <div className="relative min-h-[500px] lg:min-h-[600px]">
          <Image
            src="/img/commitment-bg.png"
            alt={t("factoryTitle")}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent" />
          <Container className="relative z-10 flex min-h-[500px] items-center py-16 lg:min-h-[600px]">
            <InView animation="slide-in-left">
              <div className="max-w-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[10px] w-[10px] rounded-full bg-nature animate-pulse" />
                  <span className="text-[13px] font-medium uppercase tracking-[2px] text-nature">
                    {t("subtitle")}
                  </span>
                </div>
                <h2 className="mb-6 text-[28px] font-bold leading-tight text-warm-white lg:text-[38px]">
                  {t("factoryTitle")}
                </h2>
                <p className="font-body text-[17px] leading-[30px] text-warm-white/80">
                  {t("factoryDesc")}
                </p>
              </div>
            </InView>
          </Container>
        </div>
      </section>

      {/* Values — SVG icon cards (no emoji) */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <h2 className="mb-12 text-center text-[28px] font-bold text-primary lg:text-[34px]">
              {t("valuesTitle")}
            </h2>
          </InView>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((key, i) => {
              const { Icon, bg, text } = VALUE_ICONS[key];
              return (
                <InView key={key} animation="scale-in" delay={i * 100}>
                  <div className="group rounded-[20px] bg-cream-light p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                    <div
                      className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${bg} shadow-md transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`h-8 w-8 ${text}`} />
                    </div>
                    <p className="font-body text-[16px] font-medium text-primary-deep">{t(key)}</p>
                  </div>
                </InView>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-cream py-16 text-center lg:py-20">
        <Container>
          <InView animation="fade-in-up">
            <h2 className="mb-2 text-[14px] font-medium uppercase tracking-[3px] text-primary/60">{t("brandName")}</h2>
            <p className="mb-8 text-[24px] font-bold text-primary lg:text-[28px]">
              {t("title")}
            </p>
            <Button href="/contacto" variant="primary" size="lg">
              {t("title")}
            </Button>
          </InView>
        </Container>
      </section>
    </main>
  );
}
