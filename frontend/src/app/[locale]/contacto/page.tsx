import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
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

export default async function ContactoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ producto?: string; tipo?: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const tHome = await getTranslations("home");
  const { producto, tipo } = await searchParams;

  /* Build pre-filled message from product query params */
  let defaultMessage = "";
  if (producto) {
    if (tipo === "pedido") {
      defaultMessage = `${t("orderRequest")} ${producto}.`;
    } else {
      defaultMessage = `${t("infoRequest")} ${producto}.`;
    }
  }

  return (
    <main>
      <BreadcrumbSchema locale={locale} items={[{ name: "Contacto", path: "/contacto" }]} />
      <PageHero
        title={t("title")}
        subtitle={t("heroSubtitle")}
      />

      {/* Contact section — rounded card matching footer */}
      <section className="px-4 pt-4">
        <div className="overflow-hidden rounded-3xl bg-cream-light py-20 lg:py-28">
        <Container>
          <div className="relative grid gap-12 lg:grid-cols-[3fr_2fr]">
            {/* Vertical separator line */}
            <div className="absolute left-[60%] top-0 hidden h-full w-px bg-primary/15 lg:block" />

            {/* Left column: heading + address + contacts */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-[28px] font-bold leading-[38px] text-primary">
                  {tHome("contactForm.title")}
                </h2>
                <p className="mt-3 font-body text-[16px] leading-[24px] text-primary">
                  {tHome("contactForm.description")}
                </p>
              </div>

              {/* Address */}
              <div>
                <p className="mb-2 font-body text-[15px] font-light text-primary">
                  {tHome("contactForm.address")}
                </p>
                <div className="font-body text-[18px] font-light leading-[31px] text-primary">
                  <p>Calle Jesús Sánchez Martín 3</p>
                  <p>21360 Repilado (Huelva) – España</p>
                </div>
              </div>

              {/* Nacional / Internacional side by side */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Nacional */}
                <div className="min-w-0">
                  <h3 className="mb-4 text-[18px] font-bold text-primary uppercase">
                    {tHome("contactForm.national")}
                  </h3>

                  <p className="mb-1 font-body text-[15px] font-light text-primary">
                    {tHome("contactForm.phone")}
                  </p>
                  <a
                    href="tel:+34618757580"
                    className="mb-4 block font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                  >
                    +34-618-757-580
                  </a>

                  <p className="mb-1 font-body text-[15px] font-light text-primary">
                    {tHome("contactForm.email")}
                  </p>
                  <a
                    href="mailto:info@platosvivaz.com"
                    className="block break-all font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                  >
                    info@platosvivaz.com
                  </a>
                </div>

                {/* Internacional */}
                <div className="min-w-0">
                  <h3 className="mb-4 text-[18px] font-bold text-primary uppercase">
                    {tHome("contactForm.international")}
                  </h3>

                  <p className="mb-1 font-body text-[15px] font-light text-primary">
                    {tHome("contactForm.phone")}
                  </p>
                  <a
                    href="tel:+34606172746"
                    className="mb-4 block font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                  >
                    +34-606-172-746
                  </a>

                  <p className="mb-1 font-body text-[15px] font-light text-primary">
                    {tHome("contactForm.email")}
                  </p>
                  <a
                    href="mailto:sales@vivazclaytargets.com"
                    className="block break-all font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                  >
                    sales@vivazclaytargets.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: contact form */}
            <div>
              <h3 className="mb-6 text-[18px] font-bold text-primary uppercase">
                {t("formTitle")}
              </h3>
              <ContactForm defaultMessage={defaultMessage} />
            </div>
          </div>
        </Container>
        </div>
      </section>

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
