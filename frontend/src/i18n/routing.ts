import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "fr", "de"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/productos": {
      es: "/productos",
      en: "/products",
      fr: "/produits",
      de: "/produkte",
    },
    "/productos/[slug]": {
      es: "/productos/[slug]",
      en: "/products/[slug]",
      fr: "/produits/[slug]",
      de: "/produkte/[slug]",
    },
    "/tecnologia": {
      es: "/tecnologia",
      en: "/technology",
      fr: "/technologie",
      de: "/technologie",
    },
    "/sobre-vivaz": {
      es: "/sobre-vivaz",
      en: "/about",
      fr: "/a-propos",
      de: "/ueber-uns",
    },
    "/regulacion-2026": {
      es: "/regulacion-2026",
      en: "/regulation-2026",
      fr: "/reglementation-2026",
      de: "/regulierung-2026",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
      fr: "/contact",
      de: "/kontakt",
    },
    "/noticias": {
      es: "/noticias",
      en: "/news",
      fr: "/actualites",
      de: "/nachrichten",
    },
    "/noticias/[slug]": {
      es: "/noticias/[slug]",
      en: "/news/[slug]",
      fr: "/actualites/[slug]",
      de: "/nachrichten/[slug]",
    },
    "/politica-privacidad": {
      es: "/politica-privacidad",
      en: "/privacy-policy",
      fr: "/politique-confidentialite",
      de: "/datenschutz",
    },
    "/aviso-legal": {
      es: "/aviso-legal",
      en: "/legal-notice",
      fr: "/mentions-legales",
      de: "/impressum",
    },
    "/politica-cookies": {
      es: "/politica-cookies",
      en: "/cookie-policy",
      fr: "/politique-cookies",
      de: "/cookie-richtlinie",
    },
  },
});
