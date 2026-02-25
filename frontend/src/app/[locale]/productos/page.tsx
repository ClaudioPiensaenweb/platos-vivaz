import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/product/ProductCard";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import { getProducts } from "@/lib/directus";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: `${t("title")} | VIVAZ Clay Targets` };
}

export default async function ProductosPage() {
  const t = await getTranslations("products");

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    // Directus not available yet - show empty state
  }

  // Group products by range
  const naturaProducts = products.filter(p => p.range_category === "Premium Natura");
  const ecoStarProducts = products.filter(p => p.range_category === "Eco Star Efficiency");
  const specialProducts = products.filter(p => p.range_category === "Special Formats");

  return (
    <main>
      <PageHero
        title={t("title")}
        subtitle="VIVAZ Clay Targets"
        minHeight="min-h-[50vh]"
        minHeightLg="lg:min-h-[55vh]"
      />

      {/* Products */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          {products.length > 0 ? (
            <div className="space-y-20">
              {/* Premium Natura */}
              {naturaProducts.length > 0 && (
                <div>
                  <InView animation="fade-in-up">
                    <div className="mb-10 flex items-center gap-4">
                      <div className="h-1 w-12 rounded-full bg-primary" />
                      <h2 className="text-[24px] font-bold text-primary lg:text-[28px]">{t("premiumNatura")}</h2>
                    </div>
                  </InView>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {naturaProducts.map((product, i) => (
                      <InView key={product.id} animation="scale-in" delay={i * 100}>
                        <ProductCard product={product} />
                      </InView>
                    ))}
                  </div>
                </div>
              )}

              {/* Eco Star */}
              {ecoStarProducts.length > 0 && (
                <div>
                  <InView animation="fade-in-up">
                    <div className="mb-10 flex items-center gap-4">
                      <div className="h-1 w-12 rounded-full bg-accent" />
                      <h2 className="text-[24px] font-bold text-primary lg:text-[28px]">{t("ecoStarEfficiency")}</h2>
                    </div>
                  </InView>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ecoStarProducts.map((product, i) => (
                      <InView key={product.id} animation="scale-in" delay={i * 100}>
                        <ProductCard product={product} />
                      </InView>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Formats */}
              {specialProducts.length > 0 && (
                <div>
                  <InView animation="fade-in-up">
                    <div className="mb-10 flex items-center gap-4">
                      <div className="h-1 w-12 rounded-full bg-nature" />
                      <h2 className="text-[24px] font-bold text-primary lg:text-[28px]">{t("specialFormats")}</h2>
                    </div>
                  </InView>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {specialProducts.map((product, i) => (
                      <InView key={product.id} animation="scale-in" delay={i * 100}>
                        <ProductCard product={product} />
                      </InView>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <InView animation="fade-in-up">
              <div className="rounded-[24px] bg-cream-light py-16 text-center">
                <p className="font-body text-[18px] text-primary">
                  Productos disponibles próximamente.
                </p>
              </div>
            </InView>
          )}
        </Container>
      </section>
    </main>
  );
}
