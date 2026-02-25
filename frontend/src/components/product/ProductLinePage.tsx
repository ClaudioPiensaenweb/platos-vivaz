"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import FormatTabs from "@/components/product/FormatTabs";
import TechSpecGrid from "@/components/product/TechSpecGrid";
import LogisticsTable from "@/components/product/LogisticsTable";
import CertBadgeRow from "@/components/technology/CertBadgeRow";
import PAHComparisonChart from "@/components/technology/PAHComparisonChart";
import { assetUrl, IMG_PRESETS } from "@/lib/directus";
import type { Product } from "@/lib/types";
import Image from "next/image";

interface ProductLineTranslations {
  // General
  downloadCatalog: string;
  specifications: string;
  logistics: string;
  formats: string;
  selectFormat: string;
  certifications: string;
  pahChartTitle: string;
  // TechSpecGrid
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
  // PAH chart
  pahChart: {
    traditional: string;
    euLimit: string;
    ecoStar: string;
    natura: string;
    euLimitLabel: string;
    noPatLabel: string;
    unit: string;
  };
  // Logistics table
  logisticsTable: {
    logistics: string;
    boxUnits: string;
    palletEu: string;
    container20: string;
    container40: string;
  };
}

interface ProductLinePageProps {
  variants: Product[];
  translations: ProductLineTranslations;
  catalogPdfUrl: string;
  locale: string;
}

export default function ProductLinePage({
  variants,
  translations,
  catalogPdfUrl,
}: ProductLinePageProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeVariant = variants[activeIndex] ?? variants[0];
  if (!activeVariant) return null;

  const isNatura = activeVariant.range_category === "Premium Natura";
  const imageBg = isNatura ? "bg-accent/10" : "bg-primary/10";

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
    <div className="pt-24 pb-20">
      <Container>
        {/* Hero section — product image + name */}
        <div className="grid gap-10 md:grid-cols-2 mb-16">
          {/* Image */}
          <InView animation="fade-in-up">
            <div
              className={`relative flex items-center justify-center rounded-[30px] p-10 aspect-square overflow-hidden ${imageBg}`}
            >
              {activeVariant.image ? (
                <Image
                  src={assetUrl(activeVariant.image, { width: IMG_PRESETS.hero })}
                  alt={activeVariant.name}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-muted text-sm">No image</span>
                </div>
              )}
            </div>
          </InView>

          {/* Info */}
          <InView animation="fade-in-up" delay={100}>
            <div>
              <p className="mb-1 font-body text-xs font-medium uppercase tracking-wider text-muted">
                {activeVariant.range_category}
              </p>
              <h1 className="mb-3 text-[36px] font-bold text-primary leading-tight">
                {activeVariant.name}
              </h1>
              {activeVariant.subtitle && (
                <p className="mb-6 font-body text-lg text-muted">{activeVariant.subtitle}</p>
              )}
              {activeVariant.description_short && (
                <p className="mb-8 font-body text-base text-muted leading-relaxed">
                  {activeVariant.description_short}
                </p>
              )}

              {/* Catalog PDF CTA */}
              {catalogPdfUrl && (
                <a
                  href={catalogPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {translations.downloadCatalog}
                </a>
              )}
            </div>
          </InView>
        </div>

        {/* Format variant tabs */}
        {variants.length > 1 && (
          <InView animation="fade-in-up">
            <div className="mb-10">
              <h2 className="mb-4 text-[20px] font-bold text-primary">
                {translations.formats}
              </h2>
              <FormatTabs
                variants={variants}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            </div>
          </InView>
        )}

        {/* Tech spec grid */}
        <InView animation="fade-in-up">
          <div className="mb-12">
            <h2 className="mb-6 text-[20px] font-bold text-primary">
              {translations.specifications}
            </h2>
            <TechSpecGrid product={activeVariant} translations={techSpecTranslations} />
          </div>
        </InView>

        {/* PAH Comparison Chart */}
        <InView animation="fade-in-up">
          <div className="mb-12">
            <h2 className="mb-6 text-[20px] font-bold text-primary">
              {translations.pahChartTitle}
            </h2>
            <PAHComparisonChart translations={translations.pahChart} />
          </div>
        </InView>

        {/* Certifications */}
        {(activeVariant.certifications ?? []).length > 0 && (
          <InView animation="fade-in-up">
            <div className="mb-12">
              <h2 className="mb-4 text-[20px] font-bold text-primary">
                {translations.certifications}
              </h2>
              <CertBadgeRow certifications={activeVariant.certifications ?? []} />
            </div>
          </InView>
        )}

        {/* Logistics table */}
        {activeVariant.logistics_data && (
          <InView animation="fade-in-up">
            <div className="rounded-[30px] bg-white p-8 shadow-sm lg:p-10">
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
      </Container>
    </div>
  );
}
