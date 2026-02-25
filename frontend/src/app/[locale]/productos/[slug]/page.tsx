import { getProducts, getBrandData } from "@/lib/directus";
import { getTranslations } from "next-intl/server";
import ProductLinePage from "@/components/product/ProductLinePage";
import { notFound } from "next/navigation";
import { sharedOpenGraph } from "@/lib/metadata";
import type { Metadata } from "next";

const rangeMap: Record<string, string> = {
  natura: "Premium Natura",
  "eco-star": "Eco Star Efficiency",
};

export function generateStaticParams() {
  return [{ slug: "natura" }, { slug: "eco-star" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  const range = rangeMap[slug];
  if (!range) return { title: t("title") };

  const isNatura = slug === "natura";
  const lineName = isNatura ? t("premiumNatura") : t("ecoStarEfficiency");

  const productTitle = `${lineName} | VIVAZ Clay Targets`;
  const productDescription = isNatura ? t("metaDescriptionNatura") : t("metaDescriptionEcoStar");
  return {
    title: productTitle,
    description: productDescription,
    openGraph: {
      ...sharedOpenGraph,
      title: productTitle,
      description: productDescription,
    },
  };
}

export default async function ProductLineDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const range = rangeMap[slug];
  if (!range) notFound();

  const t = await getTranslations({ locale, namespace: "products" });

  let variants: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    variants = await getProducts({ range });
  } catch {
    // Directus unavailable
  }

  if (variants.length === 0) notFound();

  let brand;
  try {
    brand = await getBrandData();
  } catch {
    // Brand data unavailable
  }

  // For PDF assets: skip image transforms, return bare asset URL
  const catalogPdfUrl = brand?.catalog_pdf
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"}/assets/${brand.catalog_pdf}`
    : "";

  const translations = {
    downloadCatalog: t("downloadCatalog"),
    specifications: t("specifications"),
    logistics: t("logistics"),
    formats: t("formats"),
    selectFormat: t("selectFormat"),
    certifications: t("certifications"),
    pahChartTitle: t("pahChartTitle"),
    // TechSpecGrid
    pahLevel: t("pahLevel"),
    diameter: t("diameter"),
    weight: t("weight"),
    height: t("height"),
    material: t("material"),
    color: t("color"),
    resinContent: t("resinContent"),
    issfApproved: t("issfApproved"),
    yes: t("yes"),
    no: t("no"),
    // PAH chart
    pahChart: {
      traditional: t("pahChart.traditional"),
      euLimit: t("pahChart.euLimit"),
      ecoStar: t("pahChart.ecoStar"),
      natura: t("pahChart.natura"),
      euLimitLabel: t("pahChart.euLimitLabel"),
      noPatLabel: t("pahChart.noPatLabel"),
      unit: t("pahChart.unit"),
    },
    // Logistics table
    logisticsTable: {
      logistics: t("logistics"),
      boxUnits: t("logisticsTable.boxUnits"),
      palletEu: t("logisticsTable.palletEu"),
      container20: t("logisticsTable.container20"),
      container40: t("logisticsTable.container40"),
    },
  };

  return (
    <main>
      <ProductLinePage
        variants={variants}
        translations={translations}
        catalogPdfUrl={catalogPdfUrl}
        locale={locale}
      />
    </main>
  );
}
