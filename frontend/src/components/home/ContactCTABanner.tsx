import { getTranslations } from "next-intl/server";
import Image from "next/image";
import InView from "@/components/ui/InView";

export default async function ContactCTABanner() {
  const t = await getTranslations("home");

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="relative grid min-h-[572px] overflow-hidden md:grid-cols-2"
        style={{
          backgroundImage:
            "linear-gradient(26.6deg, rgb(3, 68, 29) 43.7%, rgb(36, 46, 34) 86.4%)",
        }}
      >
        {/* Left: full-bleed product photo */}
        <div className="relative h-[300px] md:h-full">
          <Image
            src="/img/contact-cta-bg.jpg"
            alt={t("contactCta.title")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: content */}
        <InView animation="fade-in">
          <div className="flex flex-col justify-center px-8 py-12 md:px-16 md:py-20">
            <p className="mb-4 flex items-center gap-2 text-[14px] font-medium tracking-[2px] text-[#fff5e0]">
              <span className="inline-block h-[10px] w-[10px] rounded-full bg-accent" />
              VIVAZ CLAY TARGETS
            </p>
            <h2 className="mb-6 max-w-[420px] text-[24px] font-bold leading-tight tracking-[-1px] text-[#fff5e0] md:text-[28px]">
              {t("contactCta.title")}
            </h2>
            <div className="mb-8 max-w-[420px] font-body text-[16px] leading-[26px] text-[#fff5e0]">
              <p className="mb-2">{t("contactCta.description")}</p>
              <p>{t("contactCta.description2")}</p>
            </div>
            <a
              href="#contacto"
              className="inline-flex w-fit items-center justify-center rounded-[10px] bg-accent px-8 py-3.5 text-[16px] font-medium text-white uppercase transition-colors hover:bg-accent/90"
            >
              {t("contactCta.cta")}
            </a>
          </div>
        </InView>
      </div>
    </section>
  );
}
