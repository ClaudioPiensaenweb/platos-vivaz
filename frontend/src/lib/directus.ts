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

  return items as unknown as Product[];
}

export async function getProductBySlug(slug: string) {
  const items = await client.request(
    readItems("pim_products", {
      filter: { slug: { _eq: slug }, status: { _eq: "published" } },
      limit: 1,
      fields: ["*", "translations.*", "disciplines.pim_disciplines_id.*"],
    })
  );

  return (items as unknown as Product[])[0] || null;
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
  const data = await client.request(readSingleton("web_regulation"));
  return data as unknown as RegulationData;
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

export default client;
