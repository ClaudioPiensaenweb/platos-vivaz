import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Badge from "@/components/ui/Badge";
import MotionImage from "@/components/ui/MotionImage";
import { assetUrl, IMG_PRESETS } from "@/lib/directus";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNatura = product.range_category === "Premium Natura";
  const bgColor = isNatura ? "bg-accent/10" : "bg-primary/10";

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block overflow-hidden rounded-[20px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
        {product.pah_level === "0 mg/kg - Free" && (
          <div className="absolute right-3 top-3">
            <Badge variant="nature">0 PAH</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
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
          <p className="mt-2 font-body text-xs text-muted">{product.diameter_mm}mm</p>
        )}
      </div>
    </Link>
  );
}
