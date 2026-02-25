import DisciplineBadge from "@/components/product/DisciplineBadge";
import type { Product } from "@/lib/types";

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

export default function TechSpecGrid({ product, translations }: TechSpecGridProps) {
  const isPahFree = product.pah_level === "0 mg/kg - Free";
  const pahColorClass = isPahFree
    ? "bg-nature/10 text-primary"
    : "bg-warning/10 text-warning";

  return (
    <div className="bg-cream/50 rounded-xl p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* PAH Level — prominent, spans full width on mobile */}
        <div
          className={`col-span-2 md:col-span-1 rounded-lg p-4 ${pahColorClass}`}
        >
          <p className="text-xs font-medium uppercase tracking-wider opacity-70 mb-1">
            {translations.pahLevel}
          </p>
          <p className="text-base font-bold leading-tight">{product.pah_level}</p>
        </div>

        {/* Diameter */}
        {product.diameter_mm !== null && (
          <div className="rounded-lg bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
              {translations.diameter}
            </p>
            <p className="text-base font-semibold text-foreground">
              {product.diameter_mm} mm
            </p>
          </div>
        )}

        {/* Weight */}
        {product.weight_g !== null && (
          <div className="rounded-lg bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
              {translations.weight}
            </p>
            <p className="text-base font-semibold text-foreground">
              {product.weight_g} g
            </p>
          </div>
        )}

        {/* Height */}
        {product.height_mm !== null && (
          <div className="rounded-lg bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
              {translations.height}
            </p>
            <p className="text-base font-semibold text-foreground">
              {product.height_mm} mm
            </p>
          </div>
        )}

        {/* Material */}
        <div className="rounded-lg bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
            {translations.material}
          </p>
          <p className="text-base font-semibold text-foreground">{product.material}</p>
        </div>

        {/* Color */}
        {product.color !== null && (
          <div className="rounded-lg bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
              {translations.color}
            </p>
            <p className="text-base font-semibold text-foreground">{product.color}</p>
          </div>
        )}

        {/* Resin content */}
        {product.resin_pct !== null && (
          <div className="rounded-lg bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
              {translations.resinContent}
            </p>
            <p className="text-base font-semibold text-foreground">
              {product.resin_pct}%
            </p>
          </div>
        )}

        {/* ISSF Approved */}
        <div className="rounded-lg bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted mb-1">
            {translations.issfApproved}
          </p>
          <p className="text-base font-semibold text-foreground">
            {product.issf_approved ? translations.yes : translations.no}
          </p>
        </div>
      </div>

      {/* Disciplines row */}
      {product.disciplines && product.disciplines.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {product.disciplines.map((d) => (
            <DisciplineBadge key={d.pim_disciplines_id.id} name={d.pim_disciplines_id.name} />
          ))}
        </div>
      )}
    </div>
  );
}
