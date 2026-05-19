import type { Product } from "./types";
import { assetUrl } from "./directus";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

/* ── Organization (global — layout.tsx) ── */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VIVAZ Clay Targets",
    alternateName: "Platos Vivaz",
    legalName: "Jes\u00fas y Vicente V\u00e1zquez S.L.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/svg/vivaz-logo-light.svg`,
      width: 200,
      height: 60,
    },
    image: `${SITE_URL}/img/vivaz-calidad.jpg`,
    foundingDate: "1967",
    description:
      "European leaders in ecological clay targets since 1967. Pioneers in 100% pine resin technology since 2001, manufacturing clay targets with 0 mg/kg PAH. Compliant with EU 2025/660 REACH regulation.",
    slogan: "The ecological choice in clay target shooting",
    knowsAbout: [
      "clay target manufacturing",
      "ecological shooting sports",
      "pine resin technology",
      "PAH-free clay targets",
      "EU REACH regulation compliance",
      "ISSF approved clay targets",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Jes\u00fas S\u00e1nchez Mart\u00edn 3",
      addressLocality: "Repilado (Jabugo)",
      addressRegion: "Huelva",
      postalCode: "21360",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.8408,
      longitude: -6.7206,
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 11,
      maxValue: 50,
    },
    areaServed: "Worldwide",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+34-618-757-580",
        contactType: "sales",
        areaServed: "ES",
        availableLanguage: ["Spanish"],
        email: "info@platosvivaz.com",
      },
      {
        "@type": "ContactPoint",
        telephone: "+34-606-172-746",
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["Spanish", "English", "French", "German"],
        email: "sales@vivazclaytargets.com",
      },
    ],
    sameAs: [
      "https://www.instagram.com/vivazclaytargets/",
      "https://www.facebook.com/VivazClayTargets",
      "https://www.linkedin.com/company/vivaz-clay-targets-jesus-y-vicente-vazquez-sl/",
      "https://www.youtube.com/@vivazclaytargets",
      "https://www.iwa.info/en/exhibitors/vivaz-clay-targets-2484614",
    ],
  };
}

/* ── WebSite (global — layout.tsx) ── */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VIVAZ Clay Targets",
    alternateName: "Platos Vivaz",
    url: SITE_URL,
    inLanguage: ["es", "en", "fr", "de"],
    publisher: {
      "@type": "Organization",
      name: "VIVAZ Clay Targets",
      url: SITE_URL,
    },
  };
}

/* ── BreadcrumbList ── */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ── Product (product detail pages) ── */
export function productJsonLd(product: Product, locale: string) {
  const imageUrl = product.image
    ? assetUrl(product.image, { width: 800 })
    : `${SITE_URL}/img/products/standard-orange.png`;

  const localePrefix = locale === "es" ? "" : `/${locale}`;
  const productSlug = product.slug || product.name.toLowerCase().replace(/\s+/g, "-");
  const productUrl = `${SITE_URL}${localePrefix}/productos/${productSlug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description_short || product.subtitle || `${product.name} - ecological clay target by VIVAZ`,
    image: imageUrl,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "VIVAZ Clay Targets",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Jes\u00fas y Vicente V\u00e1zquez S.L.",
      url: SITE_URL,
    },
    material: product.material,
    category: "Clay Targets",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: productUrl,
      priceCurrency: "EUR",
      seller: {
        "@type": "Organization",
        name: "VIVAZ Clay Targets",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "PAH Level",
        value: product.pah_level,
      },
      product.diameter_mm && {
        "@type": "PropertyValue",
        name: "Diameter",
        value: `${product.diameter_mm}mm`,
      },
      product.weight_g && {
        "@type": "PropertyValue",
        name: "Weight",
        value: `${product.weight_g}g`,
      },
      product.resin_pct && {
        "@type": "PropertyValue",
        name: "Pine Resin Composition",
        value: `${product.resin_pct}%`,
      },
    ].filter(Boolean),
  };
}
