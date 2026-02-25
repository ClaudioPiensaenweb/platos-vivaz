import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import InView from "@/components/ui/InView";
import BlogCard from "@/components/blog/BlogCard";
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
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        backgroundOpacity="opacity-30"
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
              <p className="text-center font-body text-[17px] text-muted py-16">
                {t("noPosts")}
              </p>
            </InView>
          )}
        </Container>
      </section>
    </main>
  );
}
