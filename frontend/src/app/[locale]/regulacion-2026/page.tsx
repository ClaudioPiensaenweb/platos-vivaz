import { getTranslations } from "next-intl/server";
import RegulationContent from "@/components/regulation/RegulationContent";
import { getRegulationData } from "@/lib/directus";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regulation" });
  return { title: `${t("title")} | VIVAZ Clay Targets` };
}

export default async function RegulacionPage() {
  let regulationData = {
    limit_date: "2026-04-22",
    regulation_name: "EU 2025/660",
  };

  try {
    const data = await getRegulationData();
    if (data) {
      regulationData = {
        limit_date: data.limit_date,
        regulation_name: data.regulation_name,
      };
    }
  } catch {
    // Use defaults
  }

  const t = await getTranslations("regulation");

  const translations = {
    title: t("title"),
    timeline: t("timeline"),
    timelineVivazTitle: t("timelineVivazTitle"),
    timelineVivazDesc: t("timelineVivazDesc"),
    timelinePublishedTitle: t("timelinePublishedTitle"),
    timelinePublishedDesc: t("timelinePublishedDesc"),
    timelineEnforcedTitle: t("timelineEnforcedTitle"),
    timelineEnforcedDesc: t("timelineEnforcedDesc"),
    pahRestrictionTitle: t("pahRestrictionTitle"),
    pahRestrictionDesc: t("pahRestrictionDesc"),
    vivazReadyTitle: t("vivazReadyTitle"),
    vivazReadyDesc: t("vivazReadyDesc"),
    marketImpactTitle: t("marketImpactTitle"),
    marketImpactDesc: t("marketImpactDesc"),
    ctaTitle: t("ctaTitle"),
    ctaDesc: t("ctaDesc"),
    ctaButton: t("ctaButton"),
  };

  return (
    <RegulationContent
      limitDate={regulationData.limit_date}
      regulationName={regulationData.regulation_name}
      translations={translations}
    />
  );
}
