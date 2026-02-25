import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";
import SpotlightReveal from "@/components/ui/SpotlightReveal";
import PageHero from "@/components/ui/PageHero";
import PAHComparisonChart from "@/components/technology/PAHComparisonChart";
import CertBadgeRow from "@/components/technology/CertBadgeRow";
import TimelineSection from "@/components/about/TimelineSection";
import { sharedOpenGraph } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "technology" });
  const title = `${t("title")} | VIVAZ Clay Targets`;
  return {
    title,
    description: t("metaDescription"),
    openGraph: { ...sharedOpenGraph, title, description: t("metaDescription") },
  };
}

export default async function TecnologiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "technology" });

  const pahTranslations = {
    traditional: t("pahChart.traditional"),
    euLimit: t("pahChart.euLimit"),
    ecoStar: t("pahChart.ecoStar"),
    natura: t("pahChart.natura"),
    euLimitLabel: t("pahChart.euLimitLabel"),
    noPatLabel: t("pahChart.noPatLabel"),
    unit: t("pahChart.unit"),
  };

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

  return (
    <main>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundImage="/img/natura-detail.png"
        backgroundOpacity="opacity-40"
      />

      {/* Pine Resin */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <InView animation="slide-in-left">
              <div className="overflow-hidden rounded-[24px]">
                <Image
                  src="/img/natura-detail.png"
                  alt={t("pineResinTitle")}
                  width={702}
                  height={478}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </InView>
            <InView animation="slide-in-right">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[10px] w-[10px] rounded-full bg-primary animate-pulse" />
                <span className="text-[13px] font-medium uppercase tracking-[2px] text-primary">
                  {t("subtitle")}
                </span>
              </div>
              <h2 className="mb-6 text-[28px] font-bold leading-tight text-primary lg:text-[34px]">
                {t("pineResinTitle")}
              </h2>
              <p className="font-body text-[17px] leading-[30px] text-muted">
                {t("pineResinDesc")}
              </p>
            </InView>
          </div>
        </Container>
      </section>

      {/* Manufacturing Process */}
      <section className="bg-cream-light py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <InView animation="slide-in-left" className="order-2 lg:order-1">
              <h2 className="mb-6 text-[28px] font-bold leading-tight text-primary lg:text-[34px]">
                {t("processTitle")}
              </h2>
              <p className="font-body text-[17px] leading-[30px] text-muted">
                {t("processDesc")}
              </p>
            </InView>
            <InView animation="slide-in-right" className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[24px]">
                <Image
                  src="/img/ecostar-detail.png"
                  alt={t("processTitle")}
                  width={702}
                  height={478}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </InView>
          </div>
        </Container>
      </section>

      {/* Environmental Commitment */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <InView animation="scale-in">
              <div className="overflow-hidden rounded-[24px]">
                <Image
                  src="/img/commitment-bg.png"
                  alt={t("environmentTitle")}
                  width={1055}
                  height={626}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </InView>
            <InView animation="fade-in-up">
              <h2 className="mb-6 text-[28px] font-bold leading-tight text-primary lg:text-[34px]">
                {t("environmentTitle")}
              </h2>
              <p className="font-body text-[17px] leading-[30px] text-muted">
                {t("environmentDesc")}
              </p>
            </InView>
          </div>
        </Container>
      </section>

      {/* Spotlight Reveal — interactive torch effect */}
      <section className="bg-primary-dark py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <h2 className="mb-4 text-center text-[28px] font-bold text-warm-white lg:text-[34px]">
              {t("pineResinTitle")}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-center font-body text-[16px] text-warm-white/70">
              {t("pineResinDesc").substring(0, 100)}...
            </p>
          </InView>
          <InView animation="scale-in">
            <SpotlightReveal
              topImage="/img/ecostar-macro.png"
              bottomImage="/img/natura-detail.png"
              spotlightSize={220}
            />
          </InView>
        </Container>
      </section>

      {/* PAH Comparison Chart — replaces text-based comparison (SUST-02) */}
      <section className="bg-cream py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <h2 className="mb-4 text-center text-[28px] font-bold text-primary lg:text-[34px]">
              {t("resinSectionTitle")}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center font-body text-[16px] text-muted">
              {t("resinSectionDesc")}
            </p>
          </InView>
          <InView animation="scale-in">
            <PAHComparisonChart translations={pahTranslations} />
          </InView>
        </Container>
      </section>

      {/* Timeline — 25 years of ecological leadership */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <div className="mb-12 text-center">
              <h2 className="text-[28px] font-bold text-primary lg:text-[34px]">
                {t("timelineTitle")}
              </h2>
            </div>
          </InView>
          <TimelineSection events={timelineEvents} />
        </Container>
      </section>

      {/* REACH Certification + CertBadgeRow (SUST-04) */}
      <section className="relative overflow-hidden bg-primary-dark py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <Image src="/img/hero-bg.png" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <Container className="relative z-10 text-center">
          <InView animation="scale-in">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-white/20 px-4 py-2">
                <Image src="/svg/check.svg" alt="" width={16} height={16} className="brightness-200" />
                <span className="text-[13px] font-medium uppercase tracking-[2px] text-warm-white/80">REACH</span>
              </div>
              <h2 className="mb-6 text-[28px] font-bold text-warm-white lg:text-[36px]">{t("reachTitle")}</h2>
              <p className="mb-8 font-body text-[17px] leading-[30px] text-warm-white/80">{t("reachDesc")}</p>
              <div className="flex justify-center">
                <CertBadgeRow
                  certifications={["REACH", "ISSF", "ISO 14001", "EU 2025/660"]}
                  className="justify-center"
                />
              </div>
            </div>
          </InView>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-cream py-16 text-center lg:py-20">
        <Container>
          <InView animation="fade-in-up">
            <h2 className="mb-6 text-[24px] font-bold text-primary lg:text-[28px]">
              {t("title")}
            </h2>
            <Button href="/productos" variant="primary" size="lg">
              {t("title")}
            </Button>
          </InView>
        </Container>
      </section>
    </main>
  );
}
