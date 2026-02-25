import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import InView from "@/components/ui/InView";

export default function CTASection() {
  const t = useTranslations("ctaSection");

  return (
    <section className="relative overflow-hidden rounded-b-[90px]">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(6deg, #03441d 0%, #242e22 100%)",
        }}
      />

      {/* Left side image */}
      <div className="absolute left-0 top-0 hidden h-full w-1/2 lg:block">
        <Image
          src="/img/commitment-bg.png"
          alt=""
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-dark" />
      </div>

      <Container className="relative z-10 py-24">
        <InView animation="slide-in-right">
          <div className="ml-auto max-w-[500px]">
            {/* Green dot + subtitle */}
            <div className="flex items-center gap-3">
              <div className="h-[10px] w-[10px] animate-pulse rounded-full bg-success" />
              <span className="font-body text-[16px] font-medium text-warm-white">
                {t("subtitle")}
              </span>
            </div>

            <h2 className="mt-4 text-[30px] font-bold leading-tight text-warm-white">
              {t("title")}
            </h2>

            <p className="mt-4 font-body text-[18px] leading-[28px] text-warm-white">
              {t("description")}
            </p>

            <MagneticButton className="mt-8 inline-block">
              <Button href="/contacto">
                {t("cta")}
              </Button>
            </MagneticButton>
          </div>
        </InView>
      </Container>
    </section>
  );
}
