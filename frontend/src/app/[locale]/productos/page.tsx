import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import type { Metadata } from "next";

/* ── Static product catalog ── */
interface StaticProduct {
  slug: string;
  name: string;
  image: string;
  cotaImage?: string;
  diameter?: string;
  disciplines: string[];
}

const naturaProducts: StaticProduct[] = [
  { slug: "natura-110", name: "Natura 110", image: "/img/products/standard-orange.png", cotaImage: "/img/products/standard-orange-cota.png", diameter: "110 mm", disciplines: ["ISSF", "FITASC"] },
  { slug: "natura-extra-rabbit-110", name: "Natura Extra Rabbit", image: "/img/products/extra-rabbit-110.png", cotaImage: "/img/products/extra-rabbit-110-cota.png", diameter: "110 mm", disciplines: ["Sporting"] },
  { slug: "natura-midi-90", name: "Natura Midi 90", image: "/img/products/midi-90.png", cotaImage: "/img/products/midi-90-cota.png", diameter: "90 mm", disciplines: ["Sporting"] },
  { slug: "natura-battue", name: "Natura Battue", image: "/img/products/battue.png", cotaImage: "/img/products/battue-cota.png", diameter: "108 mm", disciplines: ["Sporting"] },
  { slug: "natura-mini-60", name: "Natura Mini 60", image: "/img/products/mini-60.png", cotaImage: "/img/products/mini-60-cota.png", diameter: "60 mm", disciplines: ["Sporting"] },
  { slug: "natura-rabbit", name: "Natura Rabbit 100", image: "/img/products/rabbit-100.png", cotaImage: "/img/products/rabbit-100-cota.png", diameter: "100 mm", disciplines: ["Sporting"] },
  { slug: "natura-mini-rabbit", name: "Natura Mini Rabbit", image: "/img/products/mini-rabbit.png", cotaImage: "/img/products/mini-rabbit-cota.png", diameter: "100 mm", disciplines: ["Sporting"] },
];

const ecoStarProducts: StaticProduct[] = [
  { slug: "eco-star-110", name: "Eco Star 110", image: "/img/products/eco-star.png", diameter: "110 mm", disciplines: ["ISSF", "FITASC", "EU 2026"] },
];

/* Map diameter to image scale: 110mm=100%, 90mm=82%, 60mm=55% */
function diameterScale(diameter?: string): string {
  if (!diameter) return "p-8";
  const mm = parseInt(diameter);
  if (mm >= 110) return "p-8";
  if (mm >= 90) return "p-12";
  return "p-16";
}

function StaticProductCard({ product, pahLabel, isEcoStar = false, locale }: { product: StaticProduct; pahLabel: string; isEcoStar?: boolean; locale: string }) {
  const localePrefix = locale === "es" ? "" : `/${locale}`;
  return (
    <NextLink
      href={`${localePrefix}/productos/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`relative aspect-square overflow-hidden ${isEcoStar ? "bg-primary/10" : "bg-accent/10"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-contain ${diameterScale(product.diameter)} transition-transform duration-300 group-hover:scale-105`}
        />
        <div className="absolute right-3 top-3">
          <span className={`inline-block rounded-full ${isEcoStar ? "bg-warning" : "bg-nature"} px-2.5 py-1 text-xs font-semibold text-white shadow-sm`}>
            {pahLabel}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[18px] font-bold text-primary">{product.name}</h3>
        {product.diameter && (
          <p className="mt-2 inline-flex items-center gap-1.5 font-body text-xs text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-muted/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /></svg>
            {product.diameter}
          </p>
        )}
        {product.disciplines.length > 0 && (
          <div className="mt-auto flex flex-wrap items-center gap-1 pt-3">
            {product.disciplines.map((d) => (
              <span key={d} className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {d}
              </span>
            ))}
          </div>
        )}
      </div>
    </NextLink>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: `${t("title")} | VIVAZ Clay Targets`,
    description: t("metaDescriptionNatura"),
  };
}

export default async function ProductosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const families = [
    {
      slug: "natura-110",
      name: t("premiumNatura"),
      description: t("naturaFamilyDesc"),
      image: "/img/products/natura.png",
      bgColor: "bg-accent/5",
      accentColor: "bg-primary",
      pahBadge: t("pahBadge0"),
      pahBadgeColor: "bg-nature",
      highlights: [
        t("naturaHighlight1"),
        t("naturaHighlight2"),
        t("naturaHighlight3"),
        t("naturaHighlight4"),
      ],
    },
    {
      slug: "eco-star-110",
      name: t("ecoStarEfficiency"),
      description: t("ecoStarFamilyDesc"),
      image: "/img/products/eco-star.png",
      bgColor: "bg-primary/5",
      accentColor: "bg-accent",
      pahBadge: t("pahBadgeCompliant"),
      pahBadgeColor: "bg-warning",
      highlights: [
        t("ecoStarHighlight1"),
        t("ecoStarHighlight2"),
        t("ecoStarHighlight3"),
      ],
    },
  ];

  return (
    <main>
      <BreadcrumbSchema locale={locale} items={[{ name: "Productos", path: "/productos" }]} />
      <PageHero title={t("title")} subtitle={t("heroSubtitle")} />

      <section className="bg-cream py-16 lg:py-24">
        <Container>
          <div className="space-y-10">
            {/* ── Natura & Eco Star family cards ── */}
            {families.map((family, idx) => (
              <InView key={family.slug} animation="fade-in-up" delay={idx * 120}>
                <Link
                  href={{
                    pathname: "/productos/[slug]",
                    params: { slug: family.slug },
                  }}
                  className="group block overflow-hidden rounded-[24px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`grid items-center gap-0 lg:grid-cols-2 ${
                      idx % 2 === 1 ? "lg:[direction:rtl]" : ""
                    }`}
                  >
                    {/* Image side */}
                    <div
                      className={`relative flex items-center justify-center overflow-hidden ${family.bgColor} aspect-[4/3] lg:aspect-square`}
                    >
                      <Image
                        src={family.image}
                        alt={family.name}
                        width={500}
                        height={400}
                        className="object-contain w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* PAH badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`rounded-full ${family.pahBadgeColor} px-3 py-1.5 text-xs font-bold text-white shadow-md`}
                        >
                          {family.pahBadge}
                        </span>
                      </div>
                    </div>

                    {/* Info side */}
                    <div
                      className={`flex flex-col gap-4 p-8 lg:p-12 ${
                        idx % 2 === 1 ? "lg:[direction:ltr]" : ""
                      }`}
                    >
                      <h2 className="text-[clamp(24px,3.5vw,36px)] font-bold text-primary leading-tight">
                        {family.name}
                      </h2>

                      <p className="font-body text-base text-muted leading-relaxed">
                        {family.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {family.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary/70"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all duration-200 group-hover:bg-accent/90 group-hover:shadow-md">
                          {t("viewLine")}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </InView>
            ))}

            {/* ── VIVAZ RANGE — NATURA + ECO STAR sections ── */}
            <InView animation="fade-in-up" delay={240}>
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-10 rounded-full bg-nature" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    VIVAZ
                  </p>
                </div>
                <h2 className="text-[clamp(24px,3.5vw,36px)] font-bold text-primary leading-tight mb-3">
                  {t("vivazRange")}
                </h2>
                <p className="font-body text-base text-muted leading-relaxed mb-3 max-w-2xl">
                  {t("vivazRangeFamilyDesc")}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary/70">
                    {t("vivazRangeHighlight1")}
                  </span>
                  <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary/70">
                    {t("vivazRangeHighlight2")}
                  </span>
                  <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary/70">
                    {t("vivazRangeHighlight3")}
                  </span>
                </div>

                {/* ── NATURA sub-section ── */}
                <div className="mb-12">
                  <h3 className="mb-6 text-[22px] font-bold text-primary flex items-center gap-3">
                    <span className="inline-block h-3 w-3 rounded-full bg-nature" />
                    NATURA
                    <span className="rounded-full bg-nature/10 px-2.5 py-0.5 text-xs font-medium text-nature">0 mg/kg PAH</span>
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {naturaProducts.map((p, i) => (
                      <InView key={p.slug} animation="scale-in" delay={i * 80} className="h-full">
                        <StaticProductCard product={p} pahLabel={t("pahBadge0")} locale={locale} />
                      </InView>
                    ))}
                  </div>
                </div>

                {/* ── ECO STAR sub-section ── */}
                <div>
                  <h3 className="mb-6 text-[22px] font-bold text-primary flex items-center gap-3">
                    <span className="inline-block h-3 w-3 rounded-full bg-accent" />
                    ECO STAR
                    <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">{"<50 mg/kg PAH"}</span>
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {ecoStarProducts.map((p, i) => (
                      <InView key={p.slug} animation="scale-in" delay={i * 80} className="h-full">
                        <StaticProductCard product={p} pahLabel={t("pahBadgeCompliant")} isEcoStar locale={locale} />
                      </InView>
                    ))}
                  </div>
                </div>
              </div>
            </InView>
          </div>
        </Container>
      </section>
    </main>
  );
}
