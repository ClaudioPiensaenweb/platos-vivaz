"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageSlideProps {
  mainImage: string;
  cotaImage?: string;
  alt: string;
  pahLabel: string;
  isEcoStar?: boolean;
}

export default function ProductImageSlide({
  mainImage,
  cotaImage,
  alt,
  pahLabel,
  isEcoStar = false,
}: ProductImageSlideProps) {
  const [showCota, setShowCota] = useState(false);

  return (
    <div className={`relative aspect-square overflow-hidden ${isEcoStar ? "bg-primary/10" : "bg-accent/10"}`}>
      <Image
        src={showCota && cotaImage ? cotaImage : mainImage}
        alt={alt}
        fill
        className="object-contain p-8 transition-all duration-300"
      />
      <div className="absolute right-3 top-3">
        <span className={`inline-block rounded-full ${isEcoStar ? "bg-warning" : "bg-nature"} px-2.5 py-1 text-xs font-semibold text-white shadow-sm`}>
          {pahLabel}
        </span>
      </div>
      {cotaImage && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowCota(!showCota);
          }}
          className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
          aria-label={showCota ? "Ver producto" : "Ver cotas"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            {showCota ? (
              <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></>
            ) : (
              <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>
            )}
          </svg>
          {showCota ? "Producto" : "Cotas"}
        </button>
      )}
    </div>
  );
}
