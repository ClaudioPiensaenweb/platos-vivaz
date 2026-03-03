import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/product/ProductCard";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import { getProducts } from "@/lib/directus";
import type { Metadata } from "next";

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

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    // Directus not available yet — show empty state
  }

  // Group products by range
  const naturaProducts = products.filter(
    (p) => p.range_category === "Premium Natura"
  );
  const ecoStarProducts = products.filter(
    (p) => p.range_category === "Eco Star Efficiency"
  );
  const specialProducts = products.filter(
    (p) => p.range_category === "Special Formats"
  );

  const pahFreeLabel = t("pahBadge0");
  const pahCompliantLabel = t("pahBadgeCompliant");

  return (
    <main>
      <PageHero
        title={t("title")}
        subtitle={t("heroSubtitle")}
      />

      {/* Products */}
      <section className="bg-cream py-16 lg:py-24">
        <Container>
          {products.length > 0 ? (
            <div className="space-y-24">
              {/* Premium Natura — dark green premium feel */}
              {naturaProducts.length > 0 && (
                <div>
                  <InView animation="fade-in-up">
                    <div className="mb-10">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-1 w-12 rounded-full bg-primary" />
                        <h2 className="text-[24px] font-bold text-primary lg:text-[28px]">
                          {t("premiumNatura")}
                        </h2>
                      </div>
                      <p className="ml-16 font-body text-sm text-muted">
                        {t("pahBadge0")} — {t("issfApproved")}
                      </p>
                    </div>
                  </InView>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {naturaProducts.map((product, i) => (
                      <InView key={product.id} animation="scale-in" delay={i * 100}>
                        <ProductCard
                          product={product}
                          href="/productos/natura"
                          pahFreeLabel={pahFreeLabel}
                          pahCompliantLabel={pahCompliantLabel}
                        />
                      </InView>
                    ))}
                  </div>
                </div>
              )}

              {/* Eco Star — accent/performance feel */}
              {ecoStarProducts.length > 0 && (
                <div>
                  <InView animation="fade-in-up">
                    <div className="mb-10">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-1 w-12 rounded-full bg-accent" />
                        <h2 className="text-[24px] font-bold text-primary lg:text-[28px]">
                          {t("ecoStarEfficiency")}
                        </h2>
                      </div>
                      <p className="ml-16 font-body text-sm text-muted">
                        {t("pahBadgeCompliant")} — EU 2026
                      </p>
                    </div>
                  </InView>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ecoStarProducts.map((product, i) => (
                      <InView key={product.id} animation="scale-in" delay={i * 100}>
                        <ProductCard
                          product={product}
                          href="/productos/eco-star"
                          pahFreeLabel={pahFreeLabel}
                          pahCompliantLabel={pahCompliantLabel}
                        />
                      </InView>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Formats — link back to parent lines */}
              {specialProducts.length > 0 && (
                <div>
                  <InView animation="fade-in-up">
                    <div className="mb-10">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="h-1 w-12 rounded-full bg-nature" />
                        <h2 className="text-[24px] font-bold text-primary lg:text-[28px]">
                          {t("specialFormats")}
                        </h2>
                      </div>
                    </div>
                  </InView>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {specialProducts.map((product, i) => {
                      // Special formats link to their parent line
                      const specialHref =
                        product.range_category === "Eco Star Efficiency"
                          ? "/productos/eco-star"
                          : "/productos/natura";
                      return (
                        <InView key={product.id} animation="scale-in" delay={i * 100}>
                          <ProductCard
                            product={product}
                            href={specialHref}
                            pahFreeLabel={pahFreeLabel}
                            pahCompliantLabel={pahCompliantLabel}
                          />
                        </InView>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <InView animation="fade-in-up">
              <div className="rounded-[24px] bg-white py-16 text-center">
                <p className="font-body text-[18px] text-primary">
                  {t("emptyState")}
                </p>
              </div>
            </InView>
          )}
        </Container>
      </section>
    </main>
  );
}
