import Image from "next/image";
import { Link, type AppHref } from "@/i18n/navigation";
import Badge from "@/components/ui/Badge";
import MotionImage from "@/components/ui/MotionImage";
import DisciplineBadge from "@/components/product/DisciplineBadge";
import { assetUrl, IMG_PRESETS } from "@/lib/directus";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** Override the link destination (default: /productos/[slug]) */
  href?: AppHref;
  /** Labels for PAH badges */
  pahFreeLabel?: string;
  pahCompliantLabel?: string;
}

export default function ProductCard({
  product,
  href,
  pahFreeLabel = "0 PAH",
  pahCompliantLabel = "PAH Compliant",
}: ProductCardProps) {
  const isNatura = product.range_category === "Premium Natura";
  const bgColor = isNatura ? "bg-accent/10" : "bg-primary/10";
  const cardHref: AppHref = href ?? {
    pathname: "/productos/[slug]",
    params: { slug: product.slug },
  };

  const isPahFree = product.pah_level === "0 mg/kg - Free";
  const singleSportingBadgeProducts = new Set(["natura-rabbit", "eco-star-110", "eco-star-standard"]);
  const displayDisciplines = singleSportingBadgeProducts.has(product.slug)
    ? (product.disciplines ?? []).filter((discipline) => discipline.pim_disciplines_id.name === "Sporting")
    : product.disciplines ?? [];
  // Show first 3 disciplines, mark overflow
  const visibleDisciplines = displayDisciplines.slice(0, 3);
  const overflowCount = displayDisciplines.length - visibleDisciplines.length;

  return (
    <Link
      href={cardHref}
      className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`relative aspect-square overflow-hidden ${bgColor}`}>
        {product.image ? (
          <MotionImage
            layoutId={`product-image-${product.slug}`}
            viewTransitionName={`product-${product.slug}`}
            src={assetUrl(product.image, { width: IMG_PRESETS.card })}
            alt={product.name}
            fill
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Image
              src={isNatura ? "/img/natura-detail.png" : "/img/ecostar-detail.png"}
              alt={product.name}
              width={300}
              height={200}
              className="object-contain opacity-60"
            />
          </div>
        )}
        {/* PAH badge */}
        <div className="absolute right-3 top-3">
          {isPahFree ? (
            <span className="inline-block rounded-full bg-nature px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              {pahFreeLabel}
            </span>
          ) : (
            <span className="inline-block rounded-full bg-warning px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              {pahCompliantLabel}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 font-body text-xs font-medium uppercase tracking-wider text-muted">
          {product.range_category}
        </p>
        <h3 className="text-[18px] font-bold text-primary">{product.name}</h3>
        {product.description_short && (
          <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted">
            {product.description_short}
          </p>
        )}
        {product.diameter_mm && (
          <p className="mt-2 font-body text-xs text-muted">{product.diameter_mm} mm</p>
        )}

        {/* Discipline badges */}
        {visibleDisciplines.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1">
            {visibleDisciplines.map((d) => (
              <DisciplineBadge
                key={d.pim_disciplines_id.id}
                name={d.pim_disciplines_id.name}
              />
            ))}
            {overflowCount > 0 && (
              <span className="inline-block rounded bg-cream px-2 py-1 text-xs font-medium text-muted">
                +{overflowCount}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
