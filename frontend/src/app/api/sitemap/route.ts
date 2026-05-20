import { NextResponse } from "next/server";
import { getProducts, getBlogPosts, assetUrl, IMG_PRESETS } from "@/lib/directus";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";
const locales = ["es", "en", "fr", "de"] as const;
type Locale = (typeof locales)[number];

function localeUrl(locale: Locale, path: string): string {
  const prefix = locale === "es" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  alternates?: { hreflang: string; href: string }[];
  images?: { loc: string; title?: string }[];
}

function renderUrl(entry: UrlEntry): string {
  const lines: string[] = ["  <url>"];
  lines.push(`    <loc>${esc(entry.loc)}</loc>`);
  if (entry.lastmod) lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
  if (entry.changefreq) lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  if (entry.priority != null) lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
  for (const alt of entry.alternates ?? []) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${esc(alt.href)}"/>`
    );
  }
  for (const img of entry.images ?? []) {
    lines.push(`    <image:image>`);
    lines.push(`      <image:loc>${esc(img.loc)}</image:loc>`);
    if (img.title) lines.push(`      <image:title>${esc(img.title)}</image:title>`);
    lines.push(`    </image:image>`);
  }
  lines.push("  </url>");
  return lines.join("\n");
}

function buildAlternates(path: string): { hreflang: string; href: string }[] {
  const alts = (locales as readonly Locale[]).map((locale) => ({
    hreflang: locale,
    href: localeUrl(locale, path),
  }));
  alts.push({ hreflang: "x-default", href: localeUrl("es", path) });
  return alts;
}

function expandLocales(
  path: string,
  options: {
    lastmod?: string;
    changefreq?: string;
    priority?: number;
    images?: { loc: string; title?: string }[];
  }
): UrlEntry[] {
  const alternates = buildAlternates(path);
  return (locales as readonly Locale[]).map((locale) => ({
    loc: localeUrl(locale, path),
    lastmod: options.lastmod,
    changefreq: options.changefreq,
    priority: options.priority,
    alternates,
    ...(options.images?.length ? { images: options.images } : {}),
  }));
}

const today = new Date().toISOString().split("T")[0];

const staticPages: { path: string; changefreq: string; priority: number }[] = [
  { path: "",                 changefreq: "weekly",  priority: 1.0 },
  { path: "/productos",       changefreq: "weekly",  priority: 0.9 },
  { path: "/tecnologia",      changefreq: "monthly", priority: 0.8 },
  { path: "/sobre-vivaz",     changefreq: "monthly", priority: 0.8 },
  { path: "/regulacion-2026", changefreq: "monthly", priority: 0.7 },
  { path: "/noticias",        changefreq: "weekly",  priority: 0.8 },
  { path: "/contacto",        changefreq: "monthly", priority: 0.7 },
];

export async function GET() {
  const entries: UrlEntry[] = [];

  for (const page of staticPages) {
    entries.push(
      ...expandLocales(page.path, {
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
      })
    );
  }

  try {
    const products = await getProducts();
    for (const product of products) {
      const path = `/productos/${product.slug}`;
      const images: { loc: string; title?: string }[] = [];
      if (product.image) {
        images.push({
          loc: assetUrl(product.image, { width: IMG_PRESETS.hero, format: "webp" }),
          title: product.name,
        });
      }
      if (product.image_transparent) {
        images.push({
          loc: assetUrl(product.image_transparent, { width: IMG_PRESETS.hero, format: "png" }),
          title: `${product.name} — transparent`,
        });
      }
      entries.push(
        ...expandLocales(path, {
          lastmod: today,
          changefreq: "monthly",
          priority: 0.9,
          images,
        })
      );
    }
  } catch {
    // Directus unavailable — skip product pages
  }

  try {
    const posts = await getBlogPosts({ limit: 200 });
    for (const post of posts) {
      entries.push(
        ...expandLocales(`/noticias/${post.slug}`, {
          lastmod: post.published_at
            ? new Date(post.published_at).toISOString().split("T")[0]
            : today,
          changefreq: "monthly",
          priority: 0.7,
        })
      );
    }
  } catch {
    // Directus unavailable — skip blog posts
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(renderUrl).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
