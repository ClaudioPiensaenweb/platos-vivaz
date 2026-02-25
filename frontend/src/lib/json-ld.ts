import type { Product } from "./types";
import { assetUrl } from "./directus";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VIVAZ Clay Targets",
    legalName: "Jesús y Vicente Vázquez S.L.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    foundingDate: "1967",
    description:
      "European leaders in ecological clay targets. Pioneers in pine resin technology since 2001.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ES",
    },
    sameAs: [],
  };
}

export function productJsonLd(product: Product, locale: string) {
  const imageUrl = product.image
    ? assetUrl(product.image, { width: 800 })
    : undefined;

  // locale URL: Spanish has no prefix (localePrefix: "as-needed")
  const localePrefix = locale === "es" ? "" : `${locale}/`;
  const productUrl = `${SITE_URL}/${localePrefix}productos/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description_short || product.subtitle || "",
    image: imageUrl,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "VIVAZ Clay Targets",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Jesus y Vicente Vazquez S.L.",
      url: SITE_URL,
    },
    material: product.material,
    // Required for Google rich results eligibility (Pitfall 6 from RESEARCH)
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: productUrl,
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
      product.height_mm && {
        "@type": "PropertyValue",
        name: "Height",
        value: `${product.height_mm}mm`,
      },
      product.resin_pct && {
        "@type": "PropertyValue",
        name: "Pine Resin Composition",
        value: `${product.resin_pct}%`,
      },
    ].filter(Boolean),
  };
}
