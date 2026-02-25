import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import BlogHero from "@/components/blog/BlogHero";
import BlogContent from "@/components/blog/BlogContent";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/directus";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts({ limit: 100 });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: "VIVAZ Clay Targets" };
    // Prefer locale-specific translation if available
    const translation = post.translations?.find(
      (t) => t.languages_code === locale
    );
    const title = translation?.title ?? post.title;
    return {
      title: `${post.seo_title || title} | VIVAZ Clay Targets`,
      description: post.seo_description || post.excerpt || "",
    };
  } catch {
    return { title: "VIVAZ Clay Targets" };
  }
}

export default async function NoticiaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

  let post;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  // Prefer locale-specific content for body
  const translation = post.translations?.find(
    (tr) => tr.languages_code === locale
  );
  const content = translation?.content ?? post.content ?? "";

  return (
    <main>
      <BlogHero post={post} locale={locale} />

      <section className="bg-white py-12 lg:py-16">
        <Container className="max-w-3xl">
          <Link
            href="/noticias"
            className="mb-8 inline-block font-body text-sm text-accent hover:text-accent-hover transition-colors"
          >
            &larr; {t("backToList")}
          </Link>

          {content && <BlogContent content={content} />}
        </Container>
      </section>
    </main>
  );
}
