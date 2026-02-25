import Image from "next/image";
import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MotionImage from "@/components/ui/MotionImage";
import LogisticsTable from "./LogisticsTable";
import { assetUrl } from "@/lib/directus";
import { sanitizeHtml } from "@/lib/sanitize";
import type { Product } from "@/lib/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations("products");
  const isNatura = product.range_category === "Premium Natura";
  const bgColor = isNatura ? "bg-accent/10" : "bg-primary/10";

  return (
    <div className="pt-24">
      <Container className="py-12">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Image */}
          <div className={`relative flex items-center justify-center overflow-hidden rounded-[30px] p-8 ${bgColor}`}>
            {product.image ? (
              <MotionImage
                layoutId={`product-image-${product.slug}`}
                viewTransitionName={`product-${product.slug}`}
                src={assetUrl(product.image, { width: 600, format: "webp" })}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain"
              />
            ) : (
              <Image
                src={isNatura ? "/img/natura-detail.png" : "/img/ecostar-detail.png"}
                alt={product.name}
                width={500}
                height={340}
                className="object-cover"
              />
            )}
          </div>

          {/* Info */}
          <div>
            <p className="mb-2 font-body text-sm font-medium uppercase tracking-wider text-muted">
              {product.range_category}
            </p>
            <h1 className="mb-2 text-[36px] font-bold text-primary">{product.name}</h1>
            {product.subtitle && (
              <p className="mb-4 font-body text-lg text-muted">{product.subtitle}</p>
            )}

            <div className="mb-6 flex flex-wrap gap-2">
              {product.badge_text && (
                <Badge variant={isNatura ? "nature" : "eco"}>{product.badge_text}</Badge>
              )}
              {product.pah_level === "0 mg/kg - Free" && (
                <Badge variant="nature">{t("pahFree")}</Badge>
              )}
              {product.certifications?.map((cert) => (
                <Badge key={cert} variant="neutral">{cert}</Badge>
              ))}
            </div>

            {/* Specs */}
            <div className="mb-6 grid grid-cols-2 gap-4 rounded-[20px] bg-cream p-6">
              {product.diameter_mm && (
                <div>
                  <p className="font-body text-xs text-muted">Diámetro</p>
                  <p className="text-[16px] font-semibold text-primary">{product.diameter_mm} mm</p>
                </div>
              )}
              <div>
                <p className="font-body text-xs text-muted">Material</p>
                <p className="text-[16px] font-semibold text-primary">{product.material}</p>
              </div>
              <div>
                <p className="font-body text-xs text-muted">PAH</p>
                <p className="text-[16px] font-semibold text-primary">{product.pah_level}</p>
              </div>
              {product.color && (
                <div>
                  <p className="font-body text-xs text-muted">Color</p>
                  <p className="text-[16px] font-semibold text-primary">{product.color}</p>
                </div>
              )}
            </div>

            {product.description && (
              <div
                className="prose prose-sm mb-6 max-w-none font-body text-muted"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }}
              />
            )}

            <Button href="/contacto" variant="primary" size="lg">
              {t("contactUs")}
            </Button>
          </div>
        </div>

        {/* Logistics Table */}
        {product.logistics_data && (
          <div className="mt-16 rounded-[30px] bg-white p-8 shadow-sm lg:p-10">
            <h2 className="mb-6 text-[24px] font-bold text-primary">{t("logistics")}</h2>
            <LogisticsTable data={product.logistics_data} />
          </div>
        )}
      </Container>
    </div>
  );
}
