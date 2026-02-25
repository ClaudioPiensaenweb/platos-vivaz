"use client";

import type { Product } from "@/lib/types";

interface FormatTabsProps {
  variants: Product[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function FormatTabs({ variants, activeIndex, onSelect }: FormatTabsProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max">
        {variants.map((variant, index) => {
          const isActive = index === activeIndex;
          const isNatura = variant.range_category === "Premium Natura";
          const activeClass = isNatura
            ? "bg-primary text-white border-primary"
            : "bg-accent text-white border-accent";
          const inactiveClass =
            "bg-white text-primary border-cream-dark hover:border-primary/50 hover:bg-cream/50";

          return (
            <button
              key={variant.id}
              onClick={() => onSelect(index)}
              className={`flex flex-col items-center gap-1 rounded-xl border px-4 py-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                isActive ? activeClass : inactiveClass
              }`}
              aria-pressed={isActive}
              type="button"
            >
              <span className="text-sm font-semibold leading-tight whitespace-nowrap">
                {variant.name}
              </span>
              {variant.diameter_mm !== null && (
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-primary/10 text-primary"
                  }`}
                >
                  ø{variant.diameter_mm} mm
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
