import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import ContactSplit from "@/components/contact/ContactSplit";
import { sharedOpenGraph } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const title = `${t("title")} | VIVAZ Clay Targets`;
  return {
    title,
    description: t("metaDescription"),
    openGraph: { ...sharedOpenGraph, title, description: t("metaDescription") },
  };
}

export default async function ContactoPage() {
  const t = await getTranslations("contact");

  return (
    <main>
      <PageHero
        title={t("title")}
        subtitle={t("heroSubtitle")}
      />

      {/* ContactSplit — form + Nacional/Internacional side-by-side on desktop */}
      <ContactSplit cardLayout="side-by-side" />

      {/* Trust stats */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <InView animation="fade-in-up">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center lg:gap-16">
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">50+</p>
                <p className="font-body text-[14px] text-muted">{t("statsYears")}</p>
              </div>
              <div className="h-8 w-px bg-primary/10" />
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">2001</p>
                <p className="font-body text-[14px] text-muted">{t("statsPioneer")}</p>
              </div>
              <div className="h-8 w-px bg-primary/10" />
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">0</p>
                <p className="font-body text-[14px] text-muted">{t("statsPah")}</p>
              </div>
              <div className="h-8 w-px bg-primary/10" />
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">EU</p>
                <p className="font-body text-[14px] text-muted">{t("statsReach")}</p>
              </div>
            </div>
          </InView>
        </Container>
      </section>
    </main>
  );
}
