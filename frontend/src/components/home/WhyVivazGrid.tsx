import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import InView from "@/components/ui/InView";

const pillars = [
  {
    key: "quality" as const,
    descKey: "qualityDesc" as const,
    image: "/img/why-quality.png",
    width: 464,
    height: 275,
  },
  {
    key: "sustainability" as const,
    descKey: "sustainabilityDesc" as const,
    image: "/img/why-sustainability.png",
    width: 481,
    height: 275,
  },
  {
    key: "experience" as const,
    descKey: "experienceDesc" as const,
    image: "/img/why-performance.png",
    width: 464,
    height: 275,
  },
];

export default function WhyVivazGrid() {
  const t = useTranslations("whyVivaz");

  return (
    <section className="bg-white py-20">
      <Container>
        <InView animation="fade-in-up">
          <SectionHeader
            subtitle={t("subtitle")}
            title={t("title")}
            className="mx-auto mb-14 max-w-[937px]"
          />
        </InView>

        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <InView key={pillar.key} animation="scale-in" delay={i * 150}>
              <div className="group overflow-hidden rounded-b-[30px]">
                {/* Image top */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-[30px]">
                  <Image
                    src={pillar.image}
                    alt={t(pillar.key)}
                    width={pillar.width}
                    height={pillar.height}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                </div>

                {/* Green card body */}
                <div className="bg-nature px-8 py-8 text-center">
                  <h3 className="text-[24px] font-bold text-primary-deep">
                    {t(pillar.key)}
                  </h3>
                  <div className="mx-auto my-3 h-px w-[42px] bg-primary-deep" />
                  <p className="font-body text-[16px] leading-[26px] text-primary-deep">
                    {t(pillar.descKey)}
                  </p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </Container>
    </section>
  );
}
