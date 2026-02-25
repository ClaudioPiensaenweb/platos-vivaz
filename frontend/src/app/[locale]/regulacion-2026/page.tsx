import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import CountdownTimer from "@/components/regulation/CountdownTimer";
import ComplianceMatrix from "@/components/regulation/ComplianceMatrix";
import PAHComparisonChart from "@/components/technology/PAHComparisonChart";
import CertBadgeRow from "@/components/technology/CertBadgeRow";
import Image from "next/image";
import { getRegulationData } from "@/lib/directus";
import type { Metadata } from "next";

const EUR_LEX_URL =
  "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0660";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regulation" });
  return { title: `${t("title")} | VIVAZ Clay Targets` };
}

export default async function RegulacionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  let regulationData = {
    limit_date: "2026-04-22",
    regulation_name: "EU 2025/660",
  };

  try {
    const data = await getRegulationData();
    if (data) {
      regulationData = {
        limit_date: data.limit_date,
        regulation_name: data.regulation_name,
      };
    }
  } catch {
    // Use defaults
  }

  const t = await getTranslations({ locale, namespace: "regulation" });

  const complianceTranslations = {
    natura: t("complianceMatrix.natura"),
    ecoStar: t("complianceMatrix.ecoStar"),
    traditional: t("complianceMatrix.traditional"),
    pahLevel: t("complianceMatrix.pahLevel"),
    euCompliant: t("complianceMatrix.euCompliant"),
    composition: t("complianceMatrix.composition"),
    issfApproved: t("complianceMatrix.issfApproved"),
    biodegradable: t("complianceMatrix.biodegradable"),
    compliant: t("complianceMatrix.compliant"),
    nonCompliant: t("complianceMatrix.nonCompliant"),
  };

  const pahTranslations = {
    traditional: t("pahChart.traditional"),
    euLimit: t("pahChart.euLimit"),
    ecoStar: t("pahChart.ecoStar"),
    natura: t("pahChart.natura"),
    euLimitLabel: t("pahChart.euLimitLabel"),
    noPatLabel: t("pahChart.noPatLabel"),
    unit: t("pahChart.unit"),
  };

  return (
    <main>
      {/* Hero — dramatic dark with countdown as focal point */}
      <PageHero
        title={t("title")}
        subtitle={regulationData.regulation_name}
        minHeight="min-h-[60vh]"
        minHeightLg="lg:min-h-[75vh]"
      >
        <InView animation="fade-in-up" delay={200}>
          <CountdownTimer targetDate={regulationData.limit_date} />
        </InView>
      </PageHero>

      {/* Timeline — 2001 → 2025 → 2026 */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <div className="mb-16 text-center">
              <p className="mb-2 text-[13px] font-medium uppercase tracking-[2px] text-primary/60">
                {t("timeline")}
              </p>
              <h2 className="text-[28px] font-bold text-primary lg:text-[34px]">
                {t("title")}
              </h2>
            </div>
          </InView>

          {/* Horizontal timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Line */}
            <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-cream md:block" />
            <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-cream md:hidden" />

            <div className="grid gap-0 md:grid-cols-3">
              {/* 2001 — VIVAZ Pioneers */}
              <InView animation="fade-in-up" delay={0}>
                <div className="relative flex gap-6 pb-12 md:flex-col md:items-center md:gap-4 md:pb-0 md:text-center">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                    <span className="text-lg font-bold text-white">2001</span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="mb-2 text-[18px] font-bold text-primary">
                      {t("timelineVivazTitle")}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-muted">
                      {t("timelineVivazDesc")}
                    </p>
                  </div>
                </div>
              </InView>

              {/* 2025 — Regulation Published */}
              <InView animation="fade-in-up" delay={200}>
                <div className="relative flex gap-6 pb-12 md:flex-col md:items-center md:gap-4 md:pb-0 md:text-center">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/20">
                    <span className="text-lg font-bold text-white">2025</span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="mb-2 text-[18px] font-bold text-accent">
                      {regulationData.regulation_name}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-muted">
                      {t("timelinePublishedDesc")}
                    </p>
                  </div>
                </div>
              </InView>

              {/* 2026 — Enforcement */}
              <InView animation="fade-in-up" delay={400}>
                <div className="relative flex gap-6 md:flex-col md:items-center md:gap-4 md:text-center">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-danger shadow-lg shadow-danger/20">
                    <span className="text-lg font-bold text-white">2026</span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="mb-2 text-[18px] font-bold text-danger">
                      {t("timelineEnforcedTitle")}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-muted">
                      {t("timelineEnforcedDesc")}
                    </p>
                  </div>
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </section>

      {/* 25-Year Head Start Callout (REG-05) */}
      <section className="bg-primary py-16 lg:py-20">
        <Container>
          <InView animation="fade-in-up">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-[13px] font-medium uppercase tracking-[2px] text-warm-white/60">
                2001 — 2026
              </p>
              <h2 className="mb-4 text-[28px] font-bold text-warm-white lg:text-[34px]">
                {t("headStart")}
              </h2>
              <p className="font-body text-[17px] leading-[30px] text-warm-white/80">
                {t("headStartDescription")}
              </p>
            </div>
          </InView>
        </Container>
      </section>

      {/* ComplianceMatrix — didactic infographic (REG-02) */}
      <section className="bg-cream-light py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-[28px] font-bold text-primary lg:text-[34px]">
                {t("pahRestrictionTitle")}
              </h2>
              <p className="mx-auto max-w-2xl font-body text-[16px] text-muted">
                {t("pahRestrictionDesc")}
              </p>
            </div>
          </InView>
          <InView animation="fade-in-up">
            <ComplianceMatrix translations={complianceTranslations} />
          </InView>
          <InView animation="fade-in-up">
            <div className="mt-8 flex justify-center">
              <CertBadgeRow
                certifications={["REACH", "ISSF", "ISO 14001", "EU 2025/660"]}
                className="justify-center"
              />
            </div>
          </InView>
        </Container>
      </section>

      {/* PAH Comparison Chart — visual proof layer */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-[28px] font-bold text-primary lg:text-[34px]">
                {t("vivazReadyTitle")}
              </h2>
              <p className="mx-auto max-w-2xl font-body text-[16px] text-muted">
                {t("vivazReadyDesc")}
              </p>
            </div>
          </InView>
          <InView animation="scale-in">
            <PAHComparisonChart translations={pahTranslations} />
          </InView>
        </Container>
      </section>

      {/* EUR-Lex External Link (REG-03) */}
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <InView animation="fade-in-up">
            <div className="mx-auto max-w-3xl rounded-[24px] border border-primary/10 bg-white p-8 shadow-sm lg:p-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-bold text-primary">
                  {regulationData.regulation_name}
                </h3>
              </div>
              <p className="mb-6 font-body text-[15px] leading-relaxed text-muted">
                {t("euDocSummary")}
              </p>
              <a
                href={EUR_LEX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-accent hover:text-accent-hover transition-colors"
              >
                {t("euDocLink")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </InView>
        </Container>
      </section>

      {/* Info Cards */}
      <section className="bg-cream-light py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <InView animation="scale-in" delay={0}>
              <div className="h-full rounded-[24px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
                  <svg
                    className="h-6 w-6 text-danger"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-[18px] font-bold text-primary">
                  {t("pahRestrictionTitle")}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-muted">
                  {t("pahRestrictionDesc")}
                </p>
              </div>
            </InView>

            <InView animation="scale-in" delay={150}>
              <div className="h-full rounded-[24px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-nature/40">
                  <Image src="/svg/check.svg" alt="" width={22} height={22} />
                </div>
                <h3 className="mb-3 text-[18px] font-bold text-primary">
                  {t("vivazReadyTitle")}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-muted">
                  {t("vivazReadyDesc")}
                </p>
              </div>
            </InView>

            <InView animation="scale-in" delay={300}>
              <div className="h-full rounded-[24px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-[18px] font-bold text-primary">
                  {t("marketImpactTitle")}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-muted">
                  {t("marketImpactDesc")}
                </p>
              </div>
            </InView>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary-dark py-20 lg:py-24">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/img/commitment-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <Container className="relative z-10 text-center">
          <InView animation="fade-in-up">
            <h2 className="mb-4 text-[24px] font-bold text-warm-white lg:text-[30px]">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-body text-[17px] text-warm-white/70">
              {t("ctaDesc")}
            </p>
            <Button href="/contacto" variant="primary" size="lg">
              {t("ctaButton")}
            </Button>
          </InView>
        </Container>
      </section>
    </main>
  );
}
