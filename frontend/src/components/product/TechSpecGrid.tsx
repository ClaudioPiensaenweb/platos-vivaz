import Image from "next/image";
import type { Product } from "@/lib/types";

const COLOR_MAP: Record<string, { hex: string; image: string }> = {
  naranja: { hex: "#FF6B00", image: "/img/products/colors/orange.png" },
  negro:   { hex: "#1a1a1a", image: "/img/products/colors/black.png" },
  rosa:    { hex: "#FF1493", image: "/img/products/colors/pink.png" },
  verde:   { hex: "#7CFC00", image: "/img/products/colors/green.png" },
  amarillo:{ hex: "#CCFF00", image: "/img/products/colors/yellow.png" },
  orange:  { hex: "#FF6B00", image: "/img/products/colors/orange.png" },
  black:   { hex: "#1a1a1a", image: "/img/products/colors/black.png" },
  pink:    { hex: "#FF1493", image: "/img/products/colors/pink.png" },
  green:   { hex: "#7CFC00", image: "/img/products/colors/green.png" },
  yellow:  { hex: "#CCFF00", image: "/img/products/colors/yellow.png" },
};

interface TechSpecGridTranslations {
  pahLevel: string;
  diameter: string;
  weight: string;
  height: string;
  material: string;
  color: string;
  resinContent: string;
  issfApproved: string;
  yes: string;
  no: string;
}

interface TechSpecGridProps {
  product: Product;
  translations: TechSpecGridTranslations;
}

function SpecCell({ label, value, className = "" }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg bg-white p-4 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">{label}</p>
      <div className="text-base font-semibold text-foreground">{value}</div>
    </div>
  );
}

export default function TechSpecGrid({ product, translations }: TechSpecGridProps) {
  const isPahFree = product.pah_level === "0 mg/kg - Free";

  const colorDots = product.color ? (
    <div className="flex flex-wrap gap-2.5 mt-1">
      {product.color.split(",").map((c) => {
        const key = c.trim().toLowerCase();
        const colorInfo = COLOR_MAP[key];
        if (!colorInfo) return <span key={key} className="text-sm text-muted">{c.trim()}</span>;
        return (
          <div key={key} className="group relative">
            <button
              type="button"
              className="h-8 w-8 rounded-full border-2 border-white shadow-sm ring-1 ring-primary/10 transition-all hover:scale-110 hover:ring-primary/30"
              style={{ backgroundColor: colorInfo.hex }}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100">
              <div className="w-[200px] rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image src={colorInfo.image} alt={c.trim()} fill className="object-contain" />
                </div>
                <p className="mt-1.5 text-center text-xs font-semibold text-primary">{c.trim()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="bg-cream/50 rounded-xl p-4 md:p-6">
      {/* Row 1: PAH + Diameter + Weight (3 cols on md+) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        <div className={`col-span-2 md:col-span-1 rounded-lg p-4 ${isPahFree ? "bg-nature/10 text-primary" : "bg-warning/10 text-warning"}`}>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70 mb-1">{translations.pahLevel}</p>
          <p className="text-base font-bold leading-tight">{product.pah_level}</p>
        </div>
        {product.diameter_mm !== null && <SpecCell label={translations.diameter} value={`${product.diameter_mm} mm`} />}
        {product.weight_g !== null && <SpecCell label={translations.weight} value={`${product.weight_g} g`} />}
      </div>

      {/* Row 2: Material + Color (2 cols equal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <SpecCell label={translations.material} value={product.material} />
        {product.color !== null && (
          <div className="rounded-lg bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted mb-2">{translations.color}</p>
            {colorDots}
          </div>
        )}
      </div>

      {/* Row 3: Resin + Approved (2 cols equal) */}
      <div className="grid grid-cols-2 gap-3">
        {product.resin_pct !== null && <SpecCell label={translations.resinContent} value={`${product.resin_pct}%`} />}
        <SpecCell label={translations.issfApproved} value={product.issf_approved ? "ISSF / FITASC" : translations.no} />
      </div>
    </div>
  );
}
