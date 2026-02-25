import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import CountdownTimer from "./CountdownTimer";

interface RegulationContentProps {
  limitDate: string;
  regulationName: string;
  translations: {
    title: string;
    timeline: string;
    timelineVivazTitle: string;
    timelineVivazDesc: string;
    timelinePublishedTitle: string;
    timelinePublishedDesc: string;
    timelineEnforcedTitle: string;
    timelineEnforcedDesc: string;
    pahRestrictionTitle: string;
    pahRestrictionDesc: string;
    vivazReadyTitle: string;
    vivazReadyDesc: string;
    marketImpactTitle: string;
    marketImpactDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
  };
}

export default function RegulationContent({
  limitDate,
  regulationName,
  translations,
}: RegulationContentProps) {
  return (
    <main>
      {/* Hero — dramatic dark with countdown as focal point */}
      <PageHero
        title={translations.title}
        subtitle={regulationName}
        minHeight="min-h-[60vh]"
        minHeightLg="lg:min-h-[75vh]"
      >
        <InView animation="fade-in-up" delay={200}>
          <CountdownTimer targetDate={limitDate} />
        </InView>
      </PageHero>

      {/* Timeline — horizontal on desktop, vertical on mobile */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <div className="mb-16 text-center">
              <p className="mb-2 text-[13px] font-medium uppercase tracking-[2px] text-primary/60">
                {translations.timeline}
              </p>
              <h2 className="text-[28px] font-bold text-primary lg:text-[34px]">
                {translations.title}
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
                      {translations.timelineVivazTitle}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-muted">
                      {translations.timelineVivazDesc}
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
                      {regulationName}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-muted">
                      {translations.timelinePublishedDesc}
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
                      {translations.timelineEnforcedTitle}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-muted">
                      {translations.timelineEnforcedDesc}
                    </p>
                  </div>
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </section>

      {/* Info Cards — what the regulation means */}
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
                  {translations.pahRestrictionTitle}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-muted">
                  {translations.pahRestrictionDesc}
                </p>
              </div>
            </InView>

            <InView animation="scale-in" delay={150}>
              <div className="h-full rounded-[24px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-nature/40">
                  <Image src="/svg/check.svg" alt="" width={22} height={22} />
                </div>
                <h3 className="mb-3 text-[18px] font-bold text-primary">
                  {translations.vivazReadyTitle}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-muted">
                  {translations.vivazReadyDesc}
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
                  {translations.marketImpactTitle}
                </h3>
                <p className="font-body text-[15px] leading-relaxed text-muted">
                  {translations.marketImpactDesc}
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
              {translations.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-body text-[17px] text-warm-white/70">
              {translations.ctaDesc}
            </p>
            <Button href="/contacto" variant="primary" size="lg">
              {translations.ctaButton}
            </Button>
          </InView>
        </Container>
      </section>
    </main>
  );
}
