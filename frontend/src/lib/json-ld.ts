import type { Product } from "./types";
import { assetUrl } from "./directus";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

/* ── Organization + LocalBusiness (global — layout.tsx) ── */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "VIVAZ Clay Targets",
    alternateName: "Platos Vivaz",
    legalName: "Jesús y Vicente Vázquez S.L.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/svg/vivaz-logo-light.svg`,
      width: 200,
      height: 60,
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/img/vivaz-calidad.jpg`,
    },
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "VIVAZ Clay Target Range",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Premium Natura Range",
          description: "0 mg/kg PAH — 100% pine resin clay targets",
        },
        {
          "@type": "OfferCatalog",
          name: "Eco Star Efficiency Range",
          description: "<50 mg/kg PAH — ecological hybrid clay targets",
        },
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Jesús Sánchez Martín 3",
      addressLocality: "Repilado",
      addressRegion: "Huelva",
      postalCode: "21360",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.8408,
      longitude: -6.7206,
    },
    hasMap: "https://maps.google.com/?q=37.8408,-6.7206",
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
    "@id": `${SITE_URL}/#website`,
    name: "VIVAZ Clay Targets",
    alternateName: "Platos Vivaz",
    url: SITE_URL,
    inLanguage: ["es", "en", "fr", "de"],
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/noticias?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ── BreadcrumbList ── */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
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
    "@id": `${SITE_URL}/productos/${productSlug}#product`,
    name: product.name,
    description:
      product.description_short ||
      product.subtitle ||
      `${product.name} - ecological clay target by VIVAZ`,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 800,
    },
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "VIVAZ Clay Targets",
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    material: product.material,
    category: "Clay Targets / Shooting Sports Equipment",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: productUrl,
      priceCurrency: "EUR",
      seller: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "PAH Level",
        value: product.pah_level,
        unitCode: "M3",
        unitText: "mg/kg",
      },
      product.diameter_mm && {
        "@type": "PropertyValue",
        name: "Diameter",
        value: product.diameter_mm,
        unitCode: "MMT",
        unitText: "mm",
      },
      product.weight_g && {
        "@type": "PropertyValue",
        name: "Weight",
        value: product.weight_g,
        unitCode: "GRM",
        unitText: "g",
      },
      product.resin_pct && {
        "@type": "PropertyValue",
        name: "Pine Resin Composition",
        value: product.resin_pct,
        unitCode: "P1",
        unitText: "%",
      },
    ].filter(Boolean),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]", ".product-description"],
    },
  };
}

/* ── FAQPage (regulation-2026 page) ── */
const REGULATION_FAQ: Record<string, Array<{ q: string; a: string }>> = {
  es: [
    {
      q: "¿Qué es el Reglamento UE 2025/660?",
      a: "El Reglamento (UE) 2025/660 modifica el Anexo XVII del Reglamento REACH y limita los Hidrocarburos Aromáticos Policíclicos (HAP) en los platos de tiro a un máximo de 50 mg/kg por compuesto. Entra en vigor el 22 de abril de 2026 y se aplica en todos los estados miembros de la Unión Europea.",
    },
    {
      q: "¿Qué platos de tiro cumplen el Reglamento UE 2025/660?",
      a: "Los platos VIVAZ Natura (0 mg/kg HAP, 100% resina de pino, aprobado ISSF) y VIVAZ Eco Star (<50 mg/kg HAP, fórmula híbrida ecológica) cumplen plenamente con el límite de 50 mg/kg establecido por el Reglamento UE 2025/660. Los platos tradicionales fabricados con alquitrán de hulla superan los 500 mg/kg y quedarán prohibidos.",
    },
    {
      q: "¿Cuándo entran en vigor las restricciones de HAP en platos de tiro?",
      a: "Las restricciones de HAP en platos de tiro establecidas por el Reglamento UE 2025/660 entran en vigor el 22 de abril de 2026. A partir de esa fecha, la fabricación y comercialización de platos con niveles de HAP superiores a 50 mg/kg queda prohibida en toda la Unión Europea.",
    },
    {
      q: "¿Cuándo empezó VIVAZ a fabricar platos ecológicos sin HAP?",
      a: "VIVAZ fue el primer fabricante europeo en desarrollar platos de tiro con resina natural de pino en el año 2001, veinticinco años antes de que el Reglamento UE 2025/660 exigiera el límite de 50 mg/kg de HAP. La gama Natura alcanza 0 mg/kg de HAP, superando los requisitos regulatorios en un 100%.",
    },
    {
      q: "¿Qué son los HAP y por qué son perjudiciales en los platos de tiro?",
      a: "Los Hidrocarburos Aromáticos Policíclicos (HAP) son compuestos orgánicos formados durante la combustión de materiales derivados del petróleo como el alquitrán de hulla. En los platos de tiro tradicionales, los fragmentos del disparo contaminan el suelo y el agua con estos compuestos tóxicos, clasificados como carcinogénicos por la IARC y regulados por el Reglamento REACH de la UE.",
    },
  ],
  en: [
    {
      q: "What is EU Regulation 2025/660?",
      a: "EU Regulation 2025/660 amends Annex XVII of the REACH Regulation and limits Polycyclic Aromatic Hydrocarbons (PAH) in clay shooting targets to a maximum of 50 mg/kg per compound. It comes into force on 22 April 2026 and applies across all EU member states.",
    },
    {
      q: "Which clay targets comply with EU Regulation 2025/660?",
      a: "VIVAZ Natura clay targets (0 mg/kg PAH, 100% pine resin, ISSF approved) and VIVAZ Eco Star (<50 mg/kg PAH, ecological hybrid formula) fully comply with the 50 mg/kg limit set by EU Regulation 2025/660. Traditional coal-tar based targets typically exceed 500 mg/kg PAH and will be prohibited.",
    },
    {
      q: "When do PAH restrictions on clay targets come into force?",
      a: "PAH restrictions on clay shooting targets under EU Regulation 2025/660 come into force on 22 April 2026. From that date, manufacturing and marketing of clay targets with PAH levels exceeding 50 mg/kg is prohibited throughout the European Union.",
    },
    {
      q: "When did VIVAZ start manufacturing ecological PAH-free clay targets?",
      a: "VIVAZ was the first European manufacturer to develop clay shooting targets using natural pine resin in 2001, twenty-five years before EU Regulation 2025/660 required the 50 mg/kg PAH limit. The Natura range achieves 0 mg/kg PAH, exceeding regulatory requirements by 100%.",
    },
    {
      q: "What are PAH and why are they harmful in clay targets?",
      a: "Polycyclic Aromatic Hydrocarbons (PAH) are organic compounds formed during combustion of petroleum-derived materials such as coal tar. In traditional clay targets, fragments from shooting contaminate soil and water with these toxic compounds, classified as carcinogenic by the IARC and regulated under EU REACH.",
    },
  ],
  fr: [
    {
      q: "Qu'est-ce que le Règlement UE 2025/660 ?",
      a: "Le Règlement (UE) 2025/660 modifie l'Annexe XVII du Règlement REACH et limite les Hydrocarbures Aromatiques Polycycliques (HAP) dans les plateaux de ball-trap à un maximum de 50 mg/kg par composé. Il entre en vigueur le 22 avril 2026 et s'applique dans tous les États membres de l'Union européenne.",
    },
    {
      q: "Quels plateaux de ball-trap respectent le Règlement UE 2025/660 ?",
      a: "Les plateaux VIVAZ Natura (0 mg/kg HAP, 100% résine de pin, approuvé ISSF) et VIVAZ Eco Star (<50 mg/kg HAP, formule hybride écologique) respectent pleinement la limite de 50 mg/kg du Règlement UE 2025/660. Les plateaux traditionnels à base de goudron de houille dépassent généralement 500 mg/kg et seront interdits.",
    },
    {
      q: "Quand entrent en vigueur les restrictions HAP sur les plateaux de ball-trap ?",
      a: "Les restrictions HAP sur les plateaux de ball-trap établies par le Règlement UE 2025/660 entrent en vigueur le 22 avril 2026. À partir de cette date, la fabrication et la commercialisation de plateaux avec des niveaux de HAP supérieurs à 50 mg/kg est interdite dans toute l'Union européenne.",
    },
    {
      q: "Depuis quand VIVAZ fabrique-t-il des plateaux écologiques sans HAP ?",
      a: "VIVAZ a été le premier fabricant européen à développer des plateaux de ball-trap en résine naturelle de pin en 2001, vingt-cinq ans avant que le Règlement UE 2025/660 n'impose la limite de 50 mg/kg de HAP. La gamme Natura atteint 0 mg/kg de HAP, dépassant les exigences réglementaires de 100%.",
    },
    {
      q: "Qu'est-ce que le HAP et pourquoi est-il nocif dans les plateaux de tir ?",
      a: "Les Hydrocarbures Aromatiques Polycycliques (HAP) sont des composés organiques formés lors de la combustion de matériaux dérivés du pétrole comme le goudron de houille. Dans les plateaux de ball-trap traditionnels, les fragments résultant du tir contaminent le sol et l'eau avec ces composés toxiques, classés comme cancérogènes par le CIRC et réglementés par le REACH de l'UE.",
    },
  ],
  de: [
    {
      q: "Was ist die EU-Verordnung 2025/660?",
      a: "Die EU-Verordnung 2025/660 ändert Anhang XVII der REACH-Verordnung und begrenzt polyzyklische aromatische Kohlenwasserstoffe (PAK) in Tontaubenscheiben auf maximal 50 mg/kg pro Verbindung. Sie tritt am 22. April 2026 in Kraft und gilt in allen EU-Mitgliedstaaten.",
    },
    {
      q: "Welche Tontauben erfüllen die EU-Verordnung 2025/660?",
      a: "VIVAZ Natura Tontauben (0 mg/kg PAK, 100% Kiefernharz, ISSF-zugelassen) und VIVAZ Eco Star (<50 mg/kg PAK, ökologische Hybridformel) erfüllen vollständig den 50 mg/kg-Grenzwert der EU-Verordnung 2025/660. Traditionelle Tontauben auf Steinkohlenteerbasis überschreiten typischerweise 500 mg/kg PAK und werden verboten.",
    },
    {
      q: "Wann treten die PAK-Beschränkungen für Tontauben in Kraft?",
      a: "Die PAK-Beschränkungen für Tontaubenschießen gemäß EU-Verordnung 2025/660 treten am 22. April 2026 in Kraft. Ab diesem Datum ist die Herstellung und Vermarktung von Tontauben mit PAK-Gehalten über 50 mg/kg in der gesamten Europäischen Union verboten.",
    },
    {
      q: "Seit wann stellt VIVAZ ökologische PAK-freie Tontauben her?",
      a: "VIVAZ war der erste europäische Hersteller, der im Jahr 2001 Tontauben aus natürlichem Kiefernharz entwickelte – fünfundzwanzig Jahre bevor die EU-Verordnung 2025/660 den 50 mg/kg PAK-Grenzwert vorschrieb. Die Natura-Serie erreicht 0 mg/kg PAK und übertrifft die gesetzlichen Anforderungen um 100%.",
    },
    {
      q: "Was sind PAK und warum sind sie in Tontauben schädlich?",
      a: "Polyzyklische aromatische Kohlenwasserstoffe (PAK) sind organische Verbindungen, die bei der Verbrennung von Erdölderivaten wie Steinkohlenteer entstehen. Bei traditionellen Tontauben kontaminieren Schussfragmente Boden und Wasser mit diesen toxischen Verbindungen, die von der IARC als krebserzeugend eingestuft und durch EU-REACH reguliert werden.",
    },
  ],
};

export function faqPageJsonLd(locale: string) {
  const faqs = REGULATION_FAQ[locale] ?? REGULATION_FAQ.en;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
