import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";

interface ProductShowcaseProps {
  variant: "natura" | "ecostar";
}

export default function ProductShowcase({ variant }: ProductShowcaseProps) {
  const t = useTranslations(variant);

  const isNatura = variant === "natura";

  const imageSrc = isNatura ? "/img/products/natura.png" : "/img/products/eco-star.png";

  const content = (
    <InView animation={isNatura ? "slide-in-left" : "slide-in-right"}>
      <div className="flex flex-col justify-center px-4 lg:px-0">
        <Badge variant={isNatura ? "nature" : "eco"} className="mb-6 self-start">
          {t("badge")}
        </Badge>
        <h2 className="mb-4 text-[28px] font-bold leading-tight text-primary">
          {t("title")}
        </h2>
        <p className="mb-8 max-w-[475px] font-body text-[18px] leading-[28px] text-primary">
          {t("description")}
        </p>
        <Button
          href={{ pathname: "/productos/[slug]", params: { slug: isNatura ? "natura-110" : "eco-star-110" } }}
          className="self-start"
        >
          {t("cta")}
        </Button>
      </div>
    </InView>
  );

  const image = (
    <InView animation={isNatura ? "slide-in-right" : "slide-in-left"}>
      <div className="group relative overflow-hidden rounded-[20px]">
        <Image
          src={imageSrc}
          alt={t("title")}
          width={702}
          height={478}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </InView>
  );

  return (
    <section className={`py-20 ${isNatura ? "bg-cream" : "bg-white"}`}>
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {isNatura ? (
            <>
              {content}
              {image}
            </>
          ) : (
            <>
              {image}
              {content}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
