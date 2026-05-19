import { createDirectus, rest, staticToken, readItems, readSingleton } from "@directus/sdk";
import type { Product, Discipline, BlogPost, RegulationData, BrandData, WebVideo } from "./types";

// Internal URL for server-side requests (inside Docker: http://directus:8055)
// Public URL for client-side / asset URLs (browser-accessible: http://localhost:8055)
const DIRECTUS_INTERNAL_URL =
  process.env.DIRECTUS_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  "http://localhost:8055";
const DIRECTUS_PUBLIC_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || "";

const client = createDirectus(DIRECTUS_INTERNAL_URL)
  .with(staticToken(ADMIN_TOKEN))
  .with(rest());

// Image size presets for consistent usage across components
// IMPORTANT: For transparent images (image_transparent field), always pass format: "png"
// Example: assetUrl(product.image_transparent, { width: IMG_PRESETS.card, format: "png" })
export const IMG_PRESETS = {
  thumbnail: 200,
  card: 600,
  hero: 1200,
} as const;

export function assetUrl(
  uuid: string | null,
  params?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    fit?: string;
  }
): string {
  if (!uuid) return "";
  const url = new URL(`/assets/${uuid}`, DIRECTUS_PUBLIC_URL);
  // Enforce WebP default (PERF-06) — override only with explicit format param
  url.searchParams.set("format", params?.format ?? "webp");
  url.searchParams.set("quality", String(params?.quality ?? 80));
  if (params?.width) url.searchParams.set("width", String(params.width));
  if (params?.height) url.searchParams.set("height", String(params.height));
  if (params?.fit) url.searchParams.set("fit", params.fit);
  return url.toString();
}

export async function getProducts(options?: {
  range?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}) {
  const filter: Record<string, unknown> = { status: { _eq: "published" } };
  if (options?.range) filter.range_category = { _eq: options.range };
  if (options?.featured) filter.featured = { _eq: true };

  const items = await client.request(
    readItems("pim_products", {
      filter,
      sort: ["sort"],
      limit: options?.limit || -1,
      page: options?.page || 1,
      fields: ["*", "translations.*", "disciplines.pim_disciplines_id.*"],
    })
  );

  return (items as unknown as Product[]).map(normalizeProduct);
}

/** Normalize JSON fields that Directus may return as strings */
function normalizeProduct(p: Product): Product {
  // logistics_data may come as JSON string from some DB drivers
  if (typeof p.logistics_data === "string") {
    try {
      p.logistics_data = JSON.parse(p.logistics_data);
    } catch {
      p.logistics_data = null;
    }
  }
  // certifications may come as JSON string
  if (typeof p.certifications === "string") {
    try {
      p.certifications = JSON.parse(p.certifications);
    } catch {
      p.certifications = null;
    }
  }
  // banned_substances (regulation) similar pattern
  return p;
}

export async function getProductBySlug(slug: string) {
  const items = await client.request(
    readItems("pim_products", {
      filter: { slug: { _eq: slug }, status: { _eq: "published" } },
      limit: 1,
      fields: ["*", "translations.*", "disciplines.pim_disciplines_id.*"],
    })
  );

  const product = (items as unknown as Product[])[0] || null;
  return product ? normalizeProduct(product) : null;
}

export async function getDisciplines() {
  const items = await client.request(
    readItems("pim_disciplines", {
      filter: { status: { _eq: "published" } },
      sort: ["sort"],
      fields: ["*", "translations.*"],
    })
  );

  return items as unknown as Discipline[];
}

export async function getBlogPosts(options?: { limit?: number; page?: number }) {
  const items = await client.request(
    readItems("blog_posts", {
      filter: { status: { _eq: "published" } },
      sort: ["-published_at"],
      limit: options?.limit || 10,
      page: options?.page || 1,
      fields: ["*", "translations.*", "category.*"],
    })
  );

  return items as unknown as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const items = await client.request(
    readItems("blog_posts", {
      filter: { slug: { _eq: slug }, status: { _eq: "published" } },
      limit: 1,
      fields: ["*", "translations.*", "category.*"],
    })
  );

  return (items as unknown as BlogPost[])[0] || null;
}

export async function getRegulationData() {
  const data = await client.request(readSingleton("web_regulation")) as unknown as RegulationData;
  // banned_substances may come as JSON string
  if (typeof data?.banned_substances === "string") {
    try {
      data.banned_substances = JSON.parse(data.banned_substances);
    } catch {
      data.banned_substances = [];
    }
  }
  return data;
}

export async function getBrandData() {
  const data = await client.request(readSingleton("sys_brand"));
  return data as unknown as BrandData;
}

export async function getVideos() {
  const items = await client.request(
    readItems("web_videos", {
      filter: { status: { _eq: "published" } },
      sort: ["sort"],
      limit: 4,
      fields: ["*"],
    })
  );
  return items as unknown as WebVideo[];
}

/**
 * Merge the Directus translations array for a given locale into the base
 * product fields. Falls back to the base (Spanish) value when the translation
 * is absent or null/empty so the page never shows a blank field.
 */
export function applyProductTranslation(product: Product, locale: string): Product {
  if (!product.translations?.length || locale === "es") return product;
  const tr = product.translations.find((t) => t.languages_code === locale);
  if (!tr) return product;
  return {
    ...product,
    name:              tr.name              || product.name,
    subtitle:          tr.subtitle          ?? product.subtitle,
    description_short: tr.description_short ?? product.description_short,
    description:       tr.description       ?? product.description,
    badge_text:        tr.badge_text        ?? product.badge_text,
  };
}

export default client;
