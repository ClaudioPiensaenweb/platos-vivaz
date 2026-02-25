import type { MetadataRoute } from "next";
import { getProducts, getBlogPosts } from "@/lib/directus";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";
const locales = ["es", "en", "fr", "de"];

const staticPages = [
  "",
  "/productos",
  "/tecnologia",
  "/sobre-vivaz",
  "/regulacion-2026",
  "/noticias",
  "/contacto",
];

function localeUrl(locale: string, path: string): string {
  // localePrefix: "as-needed" — default locale (es) has no prefix
  const prefix = locale === "es" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages — one entry per page (canonical = Spanish/no-prefix URL)
  // with hreflang alternates for all 4 locales
  for (const page of staticPages) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = localeUrl(locale, page);
    }
    // x-default points to the root Spanish URL
    alternates["x-default"] = localeUrl("es", page);

    entries.push({
      url: localeUrl("es", page),
      lastModified: new Date(),
      alternates: { languages: alternates },
    });
  }

  // Dynamic product pages
  try {
    const products = await getProducts();
    for (const product of products) {
      const alternates: Record<string, string> = {};
      for (const locale of locales) {
        alternates[locale] = localeUrl(locale, `/productos/${product.slug}`);
      }
      alternates["x-default"] = localeUrl("es", `/productos/${product.slug}`);

      entries.push({
        url: localeUrl("es", `/productos/${product.slug}`),
        lastModified: new Date(),
        alternates: { languages: alternates },
      });
    }
  } catch {
    // Directus not available
  }

  // Dynamic blog posts
  try {
    const posts = await getBlogPosts({ limit: 100 });
    for (const post of posts) {
      const alternates: Record<string, string> = {};
      for (const locale of locales) {
        alternates[locale] = localeUrl(locale, `/noticias/${post.slug}`);
      }
      alternates["x-default"] = localeUrl("es", `/noticias/${post.slug}`);

      entries.push({
        url: localeUrl("es", `/noticias/${post.slug}`),
        lastModified: post.published_at ? new Date(post.published_at) : new Date(),
        alternates: { languages: alternates },
      });
    }
  } catch {
    // Directus not available
  }

  return entries;
}
