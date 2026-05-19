import { getProducts, getBrandData, applyProductTranslation } from "@/lib/directus";
import { getTranslations } from "next-intl/server";
import ProductLinePage from "@/components/product/ProductLinePage";
import PageHero from "@/components/ui/PageHero";
import { notFound } from "next/navigation";
import { sharedOpenGraph } from "@/lib/metadata";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import type { Metadata } from "next";

/* ── Static format catalog (source of truth for format pills) ── */
export interface StaticFormat {
  slug: string;
  name: string;
  diameter: number;
}

const naturaFormats: StaticFormat[] = [
  { slug: "natura-110", name: "Natura 110", diameter: 110 },
  { slug: "natura-rabbit", name: "Natura Rabbit", diameter: 110 },
  { slug: "natura-battue", name: "Natura Battue", diameter: 110 },
  { slug: "natura-extra-rabbit-110", name: "Natura Extra Rabbit", diameter: 110 },
  { slug: "natura-midi-90", name: "Natura Midi", diameter: 90 },
  { slug: "natura-mini-rabbit", name: "Natura Mini Rabbit", diameter: 60 },
  { slug: "natura-mini-60", name: "Natura Mini", diameter: 60 },
];

const ecoStarFormats: StaticFormat[] = [
  { slug: "eco-star-110", name: "Eco Star 110", diameter: 110 },
];

const familyFormats: Record<string, StaticFormat[]> = {
  natura: naturaFormats,
  "eco-star": ecoStarFormats,
};

/* ── Slug → range mapping ──
   Family slugs:    natura, eco-star
   Product slugs:   natura-standard, natura-battue, eco-star-110, etc.
   All product slugs map to their family range for data fetching. */
const familyRangeMap: Record<string, string> = {
  natura: "Premium Natura",
  "eco-star": "Eco Star Efficiency",
};

/* Individual product slug → family slug
   This is the source of truth for valid products — Directus variants
   not matching any key here will be filtered out. */
const productToFamily: Record<string, string> = {
  "natura-110": "natura",
  "natura-standard": "natura", // legacy slug redirect
  "natura-rabbit": "natura",
  "natura-rabbit-100": "natura",
  "natura-battue": "natura",
  "natura-mini-rabbit": "natura",
  "natura-extra-rabbit": "natura",
  "natura-extra-rabbit-110": "natura",
  "natura-midi": "natura",
  "natura-midi-90": "natura",
  "natura-mini-60": "natura",
  "eco-star-110": "eco-star",
  "eco-star-standard": "eco-star", // legacy slug redirect
};

/* Check if a Directus product name matches any valid product slug */
function isValidProduct(name: string): boolean {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return Object.keys(productToFamily).some(
    (key) => slug === key || slug.startsWith(key) || key.includes(slug) || slug.includes(key.replace("natura-", "").replace("eco-star-", ""))
  );
}

function resolveSlug(slug: string): { range: string; familySlug: string; productSlug: string | null } | null {
  /* Direct family slug */
  if (familyRangeMap[slug]) {
    return { range: familyRangeMap[slug], familySlug: slug, productSlug: null };
  }
  /* Exact match in product map */
  const familySlug = productToFamily[slug];
  if (familySlug) {
    return { range: familyRangeMap[familySlug], familySlug, productSlug: slug };
  }
  /* Partial match: slug might have extra numbers (e.g. natura-standard-110) */
  for (const [key, family] of Object.entries(productToFamily)) {
    if (slug.startsWith(key)) {
      return { range: familyRangeMap[family], familySlug: family, productSlug: slug };
    }
  }
  return null;
}

export function generateStaticParams() {
  return [
    { slug: "natura" },
    { slug: "eco-star" },
    ...Object.keys(productToFamily).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  const resolved = resolveSlug(slug);
  if (!resolved) return { title: t("title") };

  const isNatura = resolved.familySlug === "natura";
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

  const resolved = resolveSlug(slug);
  if (!resolved) notFound();

  const t = await getTranslations({ locale, namespace: "products" });
  const tContact = await getTranslations({ locale, namespace: "contact" });

  let variants: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    // Dropdown values from Directus → translated display labels
    const MATERIAL_MAP: Record<string, string> = {
      "Resina de Pino 100%": t("materialPineResin"),
      "Híbrido Ecológico":   t("materialHybrid"),
    };

    const allVariants = await getProducts({ range: resolved.range });
    variants = allVariants
      .filter((v) => isValidProduct(v.name))
      .map((v) => applyProductTranslation(v, locale))
      .map((v) => ({
        ...v,
        material: MATERIAL_MAP[v.material] ?? v.material,
      }));
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
    pahChart: {
      traditional: t("pahChart.traditional"),
      euLimit: t("pahChart.euLimit"),
      ecoStar: t("pahChart.ecoStar"),
      natura: t("pahChart.natura"),
      euLimitLabel: t("pahChart.euLimitLabel"),
      noPatLabel: t("pahChart.noPatLabel"),
      unit: t("pahChart.unit"),
    },
    logisticsTable: {
      logistics: t("logistics"),
      boxUnits: t("logisticsTable.boxUnits"),
      palletEu: t("logisticsTable.palletEu"),
      container20: t("logisticsTable.container20"),
      container40: t("logisticsTable.container40"),
    },
    requestOrder: tContact("requestOrder"),
    requestInfo: tContact("requestInfo"),
    subtitles: {
      "natura 110": t("subtitles.natura 110"),
      "natura rabbit": t("subtitles.natura rabbit"),
      "natura battue": t("subtitles.natura battue"),
      "eco star": t("subtitles.eco star"),
    } as Record<string, string>,
  };

  /* Resolve initial variant from product slug */
  let initialIndex = 0;
  if (resolved.productSlug) {
    const idx = variants.findIndex((v) => {
      const vSlug = v.name.toLowerCase().replace(/\s+/g, "-");
      return vSlug === resolved.productSlug || vSlug.startsWith(resolved.productSlug!);
    });
    if (idx >= 0) initialIndex = idx;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";
  const localePrefix = locale === "es" ? "" : `/${locale}`;
  const activeVariant = variants[initialIndex] ?? variants[0];

  return (
    <main className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(activeVariant, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "VIVAZ", url: siteUrl },
          { name: "Productos", url: `${siteUrl}${localePrefix}/productos` },
          { name: activeVariant.name, url: `${siteUrl}${localePrefix}/productos/${slug}` },
        ])) }}
      />
      <PageHero title="" />
      <ProductLinePage
        variants={variants}
        translations={translations}
        catalogPdfUrl={catalogPdfUrl}
        locale={locale}
        initialIndex={initialIndex}
        allFormats={familyFormats[resolved.familySlug] || []}
        activeSlug={slug}
      />
    </main>
  );
}
