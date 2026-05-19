import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";

export default function CommitmentBanner() {
  const t = useTranslations("commitment");

  return (
    <section className="relative py-20">
      <Container>
        <div className="relative flex flex-col lg:flex-row">
          {/* Green card */}
          <InView animation="slide-in-left">
            <div className="relative z-10 w-full rounded-[30px] bg-nature p-10 lg:max-w-[535px] lg:p-16">
              <Image
                src="/svg/vivaz-logo-green.svg"
                alt="VIVAZ"
                width={116}
                height={35}
              />

              <div className="mt-10">
                <Image
                  src="/svg/check.svg"
                  alt=""
                  width={52}
                  height={52}
                  className="opacity-60"
                />
              </div>

              <h2 className="mt-6 text-[30px] font-bold leading-tight text-primary">
                {t("title")}
              </h2>

              <p className="mt-6 max-w-[429px] font-body text-[18px] leading-[28px] text-primary">
                {t("description")}
              </p>

              <Button href="/tecnologia" className="mt-8">
                {t("cta")}
              </Button>
            </div>
          </InView>

          {/* Background image (right side) */}
          <InView animation="fade-in" className="relative mt-6 h-[300px] overflow-hidden rounded-[20px] lg:-ml-16 lg:mt-0 lg:h-auto lg:flex-1">
            <Image
              src="/img/commitment-bg.png"
              alt=""
              fill
              className="object-cover"
            />
          </InView>
        </div>
      </Container>
    </section>
  );
}
