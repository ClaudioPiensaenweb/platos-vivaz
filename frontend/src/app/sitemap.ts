import type { MetadataRoute } from "next";
import { getProducts, getBlogPosts, assetUrl, IMG_PRESETS } from "@/lib/directus";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";
const locales = ["es", "en", "fr", "de"] as const;
type Locale = (typeof locales)[number];

// localePrefix: "as-needed" — default locale (es) has no prefix
function localeUrl(locale: Locale, path: string): string {
  const prefix = locale === "es" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

/** Builds the alternates map (all locales + x-default → es) for a given path */
function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localeUrl(locale, path);
  }
  languages["x-default"] = localeUrl("es", path);
  return { languages };
}

/**
 * Expands one logical page into N entries (one per locale URL).
 * Google recommends that every language variant appear as its own <url>,
 * each carrying the full set of hreflang alternates.
 */
function expandLocales(
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
    images?: string[];
  }
): MetadataRoute.Sitemap {
  const alternates = buildAlternates(path);
  return locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates,
    ...(options.images?.length ? { images: options.images } : {}),
  }));
}

// ─── Static pages config ──────────────────────────────────────────────────────

const staticPages: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "",               changeFrequency: "weekly",  priority: 1.0 },
  { path: "/productos",     changeFrequency: "weekly",  priority: 0.9 },
  { path: "/tecnologia",    changeFrequency: "monthly", priority: 0.8 },
  { path: "/sobre-vivaz",   changeFrequency: "monthly", priority: 0.8 },
  { path: "/regulacion-2026", changeFrequency: "monthly", priority: 0.7 },
  { path: "/noticias",      changeFrequency: "weekly",  priority: 0.8 },
  { path: "/contacto",      changeFrequency: "monthly", priority: 0.7 },
];

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Static pages
  for (const page of staticPages) {
    entries.push(
      ...expandLocales(page.path, {
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    );
  }

  // 2. Product detail pages (with main image for Google Images)
  try {
    const products = await getProducts();
    for (const product of products) {
      const path = `/productos/${product.slug}`;
      const images: string[] = [];
      if (product.image) {
        images.push(assetUrl(product.image, { width: IMG_PRESETS.hero, format: "webp" }));
      }
      if (product.image_transparent) {
        images.push(assetUrl(product.image_transparent, { width: IMG_PRESETS.hero, format: "png" }));
      }
      entries.push(
        ...expandLocales(path, {
          changeFrequency: "monthly",
          priority: 0.9,
          images,
        })
      );
    }
  } catch {
    // Directus not available at build time — skip product pages
  }

  // 3. Blog / news posts
  try {
    const posts = await getBlogPosts({ limit: 200 });
    for (const post of posts) {
      const path = `/noticias/${post.slug}`;
      entries.push(
        ...expandLocales(path, {
          lastModified: post.published_at ? new Date(post.published_at) : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        })
      );
    }
  } catch {
    // Directus not available at build time — skip blog posts
  }

  return entries;
}
