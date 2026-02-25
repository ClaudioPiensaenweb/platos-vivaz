import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} | VIVAZ Clay Targets` };
}

export default async function SobreVivazPage() {
  const t = await getTranslations("about");

  const values = [
    { key: "valueQuality" as const, icon: "🎯", color: "bg-primary" },
    { key: "valueInnovation" as const, icon: "💡", color: "bg-accent" },
    { key: "valueSustainability" as const, icon: "🌿", color: "bg-success" },
    { key: "valueService" as const, icon: "🤝", color: "bg-primary-dark" },
  ];

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

      {/* Pioneers — inverted layout */}
      <section className="bg-cream-light py-20 lg:py-28">
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

      {/* Values */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <h2 className="mb-12 text-center text-[28px] font-bold text-primary lg:text-[34px]">
              {t("valuesTitle")}
            </h2>
          </InView>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ key, icon, color }, i) => (
              <InView key={key} animation="scale-in" delay={i * 100}>
                <div className="group rounded-[20px] bg-cream-light p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${color} text-2xl shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <span>{icon}</span>
                  </div>
                  <p className="font-body text-[16px] font-medium text-primary-deep">{t(key)}</p>
                </div>
              </InView>
            ))}
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
