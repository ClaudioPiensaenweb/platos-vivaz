import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";
import SpotlightReveal from "@/components/ui/SpotlightReveal";
import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "technology" });
  return { title: `${t("title")} | VIVAZ Clay Targets` };
}

export default async function TecnologiaPage() {
  const t = await getTranslations("technology");

  const petroleumItems = t("petroleumItems").split("|");
  const vivazItems = t("vivazItems").split("|");

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

      {/* Environmental Comparison — the key visual */}
      <section className="bg-cream py-20 lg:py-28">
        <Container>
          <InView animation="fade-in-up">
            <h2 className="mb-4 text-center text-[28px] font-bold text-primary lg:text-[34px]">
              {t("comparisonTitle")}
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center font-body text-[16px] text-muted">
              {t("environmentDesc").substring(0, 80)}...
            </p>
          </InView>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Petroleum column */}
            <InView animation="slide-in-left">
              <div className="h-full rounded-[24px] border border-red-100 bg-white p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-[20px] font-bold text-red-700">{t("petroleumLabel")}</h3>
                </div>
                <ul className="space-y-4">
                  {petroleumItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-[15px] text-red-600/80">
                      <span className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-red-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </InView>

            {/* Vivaz column */}
            <InView animation="slide-in-right">
              <div className="h-full rounded-[24px] border border-nature bg-nature/20 p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Image src="/svg/check.svg" alt="" width={20} height={20} />
                  </div>
                  <h3 className="text-[20px] font-bold text-primary">{t("vivazLabel")}</h3>
                </div>
                <ul className="space-y-4">
                  {vivazItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-[15px] text-primary">
                      <Image src="/svg/check.svg" alt="" width={18} height={18} className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </InView>
          </div>
        </Container>
      </section>

      {/* REACH Certification */}
      <section className="relative overflow-hidden bg-primary-dark py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <Image src="/img/hero-bg.png" alt="" fill className="object-cover" />
        </div>
        <Container className="relative z-10 text-center">
          <InView animation="scale-in">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-warm-white/20 px-4 py-2">
                <Image src="/svg/check.svg" alt="" width={16} height={16} className="brightness-200" />
                <span className="text-[13px] font-medium uppercase tracking-[2px] text-warm-white/80">REACH</span>
              </div>
              <h2 className="mb-6 text-[28px] font-bold text-warm-white lg:text-[36px]">{t("reachTitle")}</h2>
              <p className="font-body text-[17px] leading-[30px] text-warm-white/80">{t("reachDesc")}</p>
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
