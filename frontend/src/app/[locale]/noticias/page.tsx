export const revalidate = 30; // Revalida cada 30 s → cambios del CMS visibles en ≤30 s

import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import InView from "@/components/ui/InView";
import BlogCard from "@/components/blog/BlogCard";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getBlogPosts } from "@/lib/directus";
import { sharedOpenGraph } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const title = `${t("metaTitle")} | VIVAZ Clay Targets`;
  return {
    title,
    description: t("metaDescription"),
    openGraph: { ...sharedOpenGraph, title, description: t("metaDescription") },
  };
}

export default async function NoticiasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    posts = await getBlogPosts();
  } catch {
    // Directus not available yet
  }

  return (
    <main>
      <BreadcrumbSchema locale={locale} items={[{ name: "Noticias", path: "/noticias" }]} />
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-cream-light py-20 lg:py-28">
        <Container>
          {posts.length > 0 ? (
            <InView animation="fade-in-up">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    locale={locale}
                    readMoreLabel={t("readMore")}
                  />
                ))}
              </div>
            </InView>
          ) : (
            <InView animation="fade-in-up">
              <div className="mx-auto max-w-lg rounded-[24px] bg-white px-8 py-16 text-center shadow-sm">
                {/* Newspaper icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
                  <svg
                    className="h-8 w-8 text-primary/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-[20px] font-bold text-primary">
                  {t("noPosts")}
                </h3>
                <p className="mb-8 font-body text-[15px] leading-relaxed text-muted">
                  {t("noPostsSubtitle")}
                </p>
                <Button href="/tecnologia" variant="outline" size="sm">
                  {t("noPostsCta")}
                </Button>
              </div>
            </InView>
          )}
        </Container>
      </section>
    </main>
  );
}
