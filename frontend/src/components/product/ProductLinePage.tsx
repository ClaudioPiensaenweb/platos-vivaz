"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import TechSpecGrid from "@/components/product/TechSpecGrid";
import LogisticsTable from "@/components/product/LogisticsTable";
import CertBadgeRow from "@/components/technology/CertBadgeRow";
import PAHComparisonChart from "@/components/technology/PAHComparisonChart";
import ProductImageSlide from "@/components/product/ProductImageSlide";
import { assetUrl, IMG_PRESETS } from "@/lib/directus";
import type { Product } from "@/lib/types";
import type { StaticFormat } from "@/app/[locale]/productos/[slug]/page";

/* ── Static product image map (overrides Directus when all variants share same image) ── */
const PRODUCT_IMAGES: Record<string, string> = {
  "natura 110": "/img/products/standard-orange.png",
  "natura rabbit": "/img/products/rabbit-100.png",
  "natura battue": "/img/products/battue.png",
  "natura mini rabbit": "/img/products/mini-rabbit.png",
  "natura extra rabbit": "/img/products/extra-rabbit-110.png",
  "natura midi": "/img/products/midi-90.png",
  "natura mini 60": "/img/products/mini-60.png",
  "eco star": "/img/products/eco-star.png",
};

function getProductImage(name: string): string | undefined {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(PRODUCT_IMAGES)) {
    if (lower.includes(key)) return val;
  }
  return undefined;
}

/* ── Static cota image map (until Directus has cota field) ── */
const COTA_IMAGES: Record<string, string> = {
  "natura 110": "/img/products/standard-orange-cota.png",
  "natura rabbit": "/img/products/rabbit-100-cota.png",
  "natura battue": "/img/products/battue-cota.png",
  "natura mini rabbit": "/img/products/mini-rabbit-cota.png",
  "natura extra rabbit": "/img/products/extra-rabbit-110-cota.png",
  "natura midi": "/img/products/midi-90-cota.png",
  "natura mini 60": "/img/products/mini-60-cota.png",
  "eco star": "/img/products/eco-star-110-cota.png",
};

function getCotaImage(name: string): string | undefined {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(COTA_IMAGES)) {
    if (lower.includes(key)) return val;
  }
  return undefined;
}

interface ProductLineTranslations {
  downloadCatalog: string;
  specifications: string;
  logistics: string;
  formats: string;
  selectFormat: string;
  certifications: string;
  pahChartTitle: string;
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
  pahChart: {
    traditional: string;
    euLimit: string;
    ecoStar: string;
    natura: string;
    euLimitLabel: string;
    noPatLabel: string;
    unit: string;
  };
  logisticsTable: {
    logistics: string;
    boxUnits: string;
    palletEu: string;
    container20: string;
    container40: string;
  };
  requestOrder: string;
  requestInfo: string;
  subtitles: Record<string, string>;
}

interface ProductLinePageProps {
  variants: Product[];
  translations: ProductLineTranslations;
  catalogPdfUrl: string;
  locale: string;
  initialIndex?: number;
  allFormats?: StaticFormat[];
  activeSlug?: string;
}

export default function ProductLinePage({
  variants,
  translations,
  catalogPdfUrl,
  locale,
  initialIndex = 0,
  allFormats = [],
  activeSlug = "",
}: ProductLinePageProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const activeVariant = variants[activeIndex] ?? variants[0];
  if (!activeVariant) return null;

  const isNatura = activeVariant.range_category === "Premium Natura";
  const imageBg = isNatura ? "bg-accent/5" : "bg-primary/5";
  const fallbackImage = isNatura
    ? "/img/products/natura.png"
    : "/img/products/eco-star.png";

  /* Resolve translated subtitle — match by lowercase product name */
  const translatedSubtitle = (() => {
    const lower = activeVariant.name.toLowerCase();
    for (const [key, val] of Object.entries(translations.subtitles || {})) {
      if (lower.includes(key)) return val;
    }
    return activeVariant.subtitle;
  })();

  const certs = Array.isArray(activeVariant.certifications)
    ? activeVariant.certifications
    : [];

  const techSpecTranslations = {
    pahLevel: translations.pahLevel,
    diameter: translations.diameter,
    weight: translations.weight,
    height: translations.height,
    material: translations.material,
    color: translations.color,
    resinContent: translations.resinContent,
    issfApproved: translations.issfApproved,
    yes: translations.yes,
    no: translations.no,
  };

  return (
    <div className="relative z-20 -mt-16 md:-mt-24 pb-20">
      <Container>
        <div className="rounded-[30px] bg-white p-6 shadow-lg shadow-black/5 md:p-10 lg:p-14">
        {/* ── Hero section (2 columns) ── */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 mb-16 items-start">
          {/* LEFT — Image with optional cota slide */}
          <InView animation="fade-in-up">
            <div className="rounded-[30px] overflow-hidden">
              <ProductImageSlide
                key={activeVariant.id}
                mainImage={
                  getProductImage(activeVariant.name)
                  || (activeVariant.image
                    ? assetUrl(activeVariant.image, { width: IMG_PRESETS.hero })
                    : fallbackImage)
                }
                cotaImage={getCotaImage(activeVariant.name)}
                alt={activeVariant.name}
                pahLabel={
                  activeVariant.pah_level === "0 mg/kg - Free"
                    ? "0 PAH"
                    : "<50 mg/kg"
                }
                isEcoStar={!isNatura}
              />
            </div>
          </InView>

          {/* RIGHT — Info + Config */}
          <InView animation="fade-in-up" delay={100}>
            <div className="flex flex-col gap-4">
              {/* Product name */}
              <h1 className="text-[clamp(28px,4vw,42px)] font-bold text-primary leading-[1.1]">
                {activeVariant.name}
              </h1>

              {/* Certifications row */}
              {certs.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {certs.map((cert) => (
                    <span
                      key={cert}
                      className="rounded-full border border-primary/15 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary/70"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}

              {/* 2. Subtitle */}
              {translatedSubtitle && (
                <p className="font-body text-lg text-muted/80">
                  {translatedSubtitle}
                </p>
              )}

              {/* 3. Description */}
              {activeVariant.description_short && (
                <p className="font-body text-base text-muted leading-relaxed">
                  {activeVariant.description_short}
                </p>
              )}

              {/* 4. Quick specs row */}
              <div className="flex flex-wrap gap-4 mt-1">
                {activeVariant.diameter_mm && (
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{activeVariant.diameter_mm}<span className="text-xs font-normal text-muted ml-0.5">mm</span></p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">{translations.diameter}</p>
                  </div>
                )}
                {activeVariant.weight_g && (
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{activeVariant.weight_g}<span className="text-xs font-normal text-muted ml-0.5">g</span></p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">{translations.weight}</p>
                  </div>
                )}
                {activeVariant.resin_pct && (
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{activeVariant.resin_pct}<span className="text-xs font-normal text-muted ml-0.5">%</span></p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">{translations.resinContent}</p>
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              {(() => {
                const localePrefix = locale === "es" ? "" : `/${locale}`;
                const productName = activeVariant.name;
                return (
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <a
                      href={`${localePrefix}/contacto?producto=${encodeURIComponent(productName)}&tipo=info`}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-white px-6 py-3 font-body text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                      {translations.requestInfo}
                    </a>
                    <a
                      href={`${localePrefix}/contacto?producto=${encodeURIComponent(productName)}&tipo=pedido`}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      {translations.requestOrder}
                    </a>
                    {catalogPdfUrl && (
                      <a
                        href={catalogPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-primary/10 px-5 py-2.5 font-body text-xs font-medium text-muted transition-all duration-200 hover:border-primary/20 hover:text-primary"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        {translations.downloadCatalog}
                      </a>
                    )}
                  </div>
                );
              })()}
            </div>
          </InView>
        </div>

        {/* ── Technical specs ── */}
        <InView animation="fade-in-up">
          <div className="mb-12">
            <h2 className="mb-6 text-[20px] font-bold text-primary">
              {translations.specifications}
            </h2>
            <TechSpecGrid product={activeVariant} translations={techSpecTranslations} />
          </div>
        </InView>

        {/* ── PAH Comparison Chart ── */}
        <InView animation="fade-in-up">
          <div className="mb-12">
            <h2 className="mb-6 text-[20px] font-bold text-primary">
              {translations.pahChartTitle}
            </h2>
            <PAHComparisonChart translations={translations.pahChart} />
          </div>
        </InView>

        {/* ── Logistics table ── */}
        {activeVariant.logistics_data && (
          <InView animation="fade-in-up">
            <div className="rounded-[20px] bg-cream-light p-8 lg:p-10">
              <h2 className="mb-6 text-[24px] font-bold text-primary">
                {translations.logistics}
              </h2>
              <LogisticsTable
                data={activeVariant.logistics_data}
                translations={translations.logisticsTable}
              />
            </div>
          </InView>
        )}
        {/* ── Other formats (cards grouped by diameter) ── */}
        {allFormats.length > 1 && (() => {
          const localePrefix = locale === "es" ? "" : `/${locale}`;
          const otherFormats = allFormats.filter(f => f.slug !== activeSlug && !activeSlug.startsWith(f.slug) && !f.slug.startsWith(activeSlug));
          if (otherFormats.length === 0) return null;
          const diameters = [...new Set(otherFormats.map(f => f.diameter))].sort((a, b) => b - a);
          return (
            <InView animation="fade-in-up">
              <div className="mt-12">
                <h2 className="mb-6 text-[20px] font-bold text-primary">
                  {translations.formats}
                </h2>
                {diameters.map(d => (
                  <div key={d} className="mb-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted/60">
                      {d} mm
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {otherFormats.filter(f => f.diameter === d).map(format => {
                        const img = getProductImage(format.name) || (isNatura ? "/img/products/natura.png" : "/img/products/eco-star.png");
                        return (
                          <a
                            key={format.slug}
                            href={`${localePrefix}/productos/${format.slug}`}
                            className="group flex flex-col overflow-hidden rounded-[16px] bg-cream/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                          >
                            <div className="relative aspect-square overflow-hidden bg-accent/5 p-4">
                              <Image
                                src={img}
                                alt={format.name}
                                fill
                                className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-3">
                              <p className="text-sm font-bold text-primary leading-tight">{format.name}</p>
                              <p className="mt-1 text-xs text-muted/60">{format.diameter} mm</p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </InView>
          );
        })()}

        </div>{/* end white rounded card */}
      </Container>
    </div>
  );
}
