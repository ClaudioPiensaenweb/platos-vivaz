const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

/**
 * Localized path map derived from i18n/routing.ts.
 * Key: canonical ES path. Value: per-locale path (without locale prefix for ES).
 * Dynamic segments use the [param] placeholder — replace before calling buildAlternates.
 */
const LOCALIZED_PATHS: Record<string, Record<string, string>> = {
  "/": { es: "", en: "/en", fr: "/fr", de: "/de" },
  "/productos": { es: "/productos", en: "/en/products", fr: "/fr/produits", de: "/de/produkte" },
  "/productos/[slug]": { es: "/productos/[slug]", en: "/en/products/[slug]", fr: "/fr/produits/[slug]", de: "/de/produkte/[slug]" },
  "/tecnologia": { es: "/tecnologia", en: "/en/technology", fr: "/fr/technologie", de: "/de/technologie" },
  "/sobre-vivaz": { es: "/sobre-vivaz", en: "/en/about", fr: "/fr/a-propos", de: "/de/ueber-uns" },
  "/regulacion-2026": { es: "/regulacion-2026", en: "/en/regulation-2026", fr: "/fr/reglementation-2026", de: "/de/regulierung-2026" },
  "/contacto": { es: "/contacto", en: "/en/contact", fr: "/fr/contact", de: "/de/kontakt" },
  "/noticias": { es: "/noticias", en: "/en/news", fr: "/fr/actualites", de: "/de/nachrichten" },
  "/noticias/[slug]": { es: "/noticias/[slug]", en: "/en/news/[slug]", fr: "/fr/actualites/[slug]", de: "/de/nachrichten/[slug]" },
  "/politica-privacidad": { es: "/politica-privacidad", en: "/en/privacy-policy", fr: "/fr/politique-confidentialite", de: "/de/datenschutz" },
  "/aviso-legal": { es: "/aviso-legal", en: "/en/legal-notice", fr: "/fr/mentions-legales", de: "/de/impressum" },
  "/politica-cookies": { es: "/politica-cookies", en: "/en/cookie-policy", fr: "/fr/politique-cookies", de: "/de/cookie-richtlinie" },
};

/**
 * Generates correct hreflang alternates for any page.
 *
 * @param canonicalPathEs  The ES canonical path (e.g. "/regulacion-2026")
 * @param slugs            Optional dynamic segments to replace (e.g. { slug: "natura-110" })
 *
 * @example
 * // Static page
 * buildAlternates("/regulacion-2026")
 *
 * // Dynamic page
 * buildAlternates("/productos/[slug]", { slug: "natura-110" })
 */
export function buildAlternates(
  canonicalPathEs: string,
  slugs?: Record<string, string>
): { canonical: string; languages: Record<string, string> } {
  const paths = LOCALIZED_PATHS[canonicalPathEs] ?? {
    es: canonicalPathEs,
    en: `/en${canonicalPathEs}`,
    fr: `/fr${canonicalPathEs}`,
    de: `/de${canonicalPathEs}`,
  };

  const resolve = (p: string) => {
    let out = p;
    if (slugs) {
      for (const [k, v] of Object.entries(slugs)) {
        out = out.replace(`[${k}]`, v);
      }
    }
    return `${SITE_URL}${out}`;
  };

  return {
    canonical: resolve(paths.es),
    languages: {
      es: resolve(paths.es),
      en: resolve(paths.en),
      fr: resolve(paths.fr),
      de: resolve(paths.de),
      "x-default": resolve(paths.es),
    },
  };
}

export const sharedOpenGraph = {
  siteName: "VIVAZ Clay Targets",
  type: "website" as const,
  images: [
    {
      url: `${SITE_URL}/img/og-vivaz.png`,
      width: 1200,
      height: 630,
      alt: "VIVAZ Clay Targets — Ecological Clay Target Manufacturers Since 1967",
    },
  ],
};
