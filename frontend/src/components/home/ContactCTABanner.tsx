import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";

export default async function ContactCTABanner() {
  const t = await getTranslations("home");

  return (
    <section className="bg-gradient-to-r from-primary-dark to-primary py-16 lg:py-24">
      <Container>
        <InView animation="fade-in">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left: product / sustainability photo */}
            <div className="overflow-hidden rounded-[20px]">
              <Image
                src="/img/contact-cta-bg.jpg"
                alt={t("contactCta.title")}
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Right: heading + description + CTA */}
            <div className="flex flex-col items-start gap-6">
              <h2 className="text-[28px] font-bold leading-tight text-white md:text-[36px]">
                {t("contactCta.title")}
              </h2>
              <p className="font-body text-[18px] leading-relaxed text-white/80 max-w-md">
                {t("contactCta.description")}
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-[10px] border-2 border-white px-9 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary"
              >
                {t("contactCta.cta")}
              </a>
            </div>
          </div>
        </InView>
      </Container>
    </section>
  );
}
