import type { ImageLoaderProps } from "next/image";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

export default function directusImageLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(`/assets/${src}`, DIRECTUS_URL);
  url.searchParams.set("width", String(width));
  url.searchParams.set("quality", String(quality || 80));
  url.searchParams.set("format", "webp");
  return url.toString();
}
