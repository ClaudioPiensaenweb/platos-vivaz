import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import ProductRangeStrip from "@/components/home/ProductRangeStrip";
import WhyVivazGrid from "@/components/home/WhyVivazGrid";
import ProductShowcase from "@/components/home/ProductShowcase";
import CommitmentBanner from "@/components/home/CommitmentBanner";
import VideoSection from "@/components/home/VideoSection";
import ContactSplit from "@/components/contact/ContactSplit";
import { getVideos } from "@/lib/directus";
import type { WebVideo } from "@/lib/types";

export default async function HomePage() {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";

  const t = await getTranslations("home");

  let videos: WebVideo[] = [];
  try {
    videos = await getVideos();
  } catch {
    // Graceful empty state — VideoSection renders null when videos.length === 0
  }

  const videoTranslations = {
    title: t("videos.title"),
    watchVideo: t("videos.watchVideo"),
  };

  return (
    <>
      <HeroSection market={market} />
      <ProductRangeStrip />
      <WhyVivazGrid />
      <ProductShowcase variant="natura" />
      <ProductShowcase variant="ecostar" />
      <VideoSection videos={videos} translations={videoTranslations} />
      <CommitmentBanner />
      <ContactSplit />
    </>
  );
}
