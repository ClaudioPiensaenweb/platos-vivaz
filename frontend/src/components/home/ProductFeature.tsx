import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";
import ProductBadge from "@/components/ui/ProductBadge";
import { assetUrl } from "@/lib/directus";

interface ProductFeatureProps {
  variant: "natura" | "ecostar";
  /** Directus asset UUID for the product image. Falls back to local static image when absent. */
  imageUuid?: string | null;
}

const FALLBACK_IMAGES: Record<"natura" | "ecostar", string> = {
  natura: "/img/natura-detail.png",
  ecostar: "/img/ecostar-detail.png",
};

export default function ProductFeature({
  variant,
  imageUuid,
}: ProductFeatureProps) {
  const t = useTranslations(variant);

  const isNatura = variant === "natura";

  const imageSrc = imageUuid
    ? assetUrl(imageUuid, { width: 702, format: "webp" })
    : FALLBACK_IMAGES[variant];

  const content = (
    <InView animation={isNatura ? "slide-in-left" : "slide-in-right"}>
      <div className="flex flex-col justify-center px-4 lg:px-0">
        <ProductBadge
          text={t("badge")}
          variant={isNatura ? "nature" : "eco"}
          className="mb-6 self-start"
        />
        <h2 className="text-[28px] font-bold leading-tight text-primary md:text-[36px]">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-[475px] font-body text-[18px] leading-[28px] text-primary">
          {t("description")}
        </p>
        <Button
          href={`/productos/${isNatura ? "natura-standard" : "eco-star-standard"}`}
          className="mt-8 self-start"
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
          unoptimized={!!imageUuid}
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
