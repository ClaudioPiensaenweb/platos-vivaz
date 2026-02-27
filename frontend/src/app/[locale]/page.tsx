import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import ProductRangeStrip from "@/components/home/ProductRangeStrip";
import WhyVivazGrid from "@/components/home/WhyVivazGrid";
import ProductFeature from "@/components/home/ProductFeature";
import VideoReels from "@/components/home/VideoReels";
import ContactCTABanner from "@/components/home/ContactCTABanner";
import ContactFormSection from "@/components/home/ContactFormSection";
import { getVideos, getProducts } from "@/lib/directus";
import type { WebVideo } from "@/lib/types";

export default async function HomePage() {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";

  const t = await getTranslations("home");

  let videos: WebVideo[] = [];
  try {
    videos = await getVideos();
  } catch {
    // Graceful empty state — VideoReels renders placeholder cards when videos.length === 0
  }

  // Fetch featured product images for ProductFeature sections
  let naturaImageUuid: string | null = null;
  let ecoStarImageUuid: string | null = null;
  try {
    const products = await getProducts({ featured: true });
    const naturaProduct = products.find((p) => p.range_category === "Premium Natura");
    const ecoStarProduct = products.find((p) => p.range_category === "Eco Star Efficiency");
    naturaImageUuid = naturaProduct?.image ?? null;
    ecoStarImageUuid = ecoStarProduct?.image ?? null;
  } catch {
    // Falls back to local static images in ProductFeature when UUID is null
  }

  const videoReelsTranslations = {
    title: t("videos.title"),
    watchVideo: t("videos.watchVideo"),
    viewAll: t("videos.viewAll"),
  };

  return (
    <>
      <HeroSection market={market} />
      <ProductRangeStrip />
      <WhyVivazGrid />
      <ProductFeature variant="natura" imageUuid={naturaImageUuid} />
      <ProductFeature variant="ecostar" imageUuid={ecoStarImageUuid} />
      <VideoReels videos={videos} translations={videoReelsTranslations} />
      <ContactCTABanner />
      <ContactFormSection />
    </>
  );
}
