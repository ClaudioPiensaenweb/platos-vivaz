import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import ProductRangeStrip from "@/components/home/ProductRangeStrip";
import WhyVivazGrid from "@/components/home/WhyVivazGrid";
import ProductFeature from "@/components/home/ProductFeature";
import InstagramReels from "@/components/home/InstagramReels";
import ContactCTABanner from "@/components/home/ContactCTABanner";
import ContactFormSection from "@/components/home/ContactFormSection";
export default async function HomePage() {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";

  await getTranslations("home");

  return (
    <>
      <HeroSection market={market} />
      <ProductRangeStrip />
      <WhyVivazGrid />
      <ProductFeature variant="natura" />
      <ProductFeature variant="ecostar" />
      <InstagramReels />
      <ContactCTABanner />
      <ContactFormSection />
    </>
  );
}
