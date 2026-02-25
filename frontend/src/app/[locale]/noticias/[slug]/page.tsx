import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { getBlogPostBySlug } from "@/lib/directus";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { sanitizeHtml } from "@/lib/sanitize";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: "VIVAZ Clay Targets" };
    return {
      title: `${post.seo_title || post.title} | VIVAZ Clay Targets`,
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
  const { slug } = await params;
  const t = await getTranslations("news");

  let post;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <div className="pt-24">
      <Container className="py-12">
        <Link
          href="/noticias"
          className="mb-8 inline-block text-sm text-accent hover:text-accent-hover"
        >
          &larr; {t("backToNews")}
        </Link>

        <article className="mx-auto max-w-3xl">
          <div className="mb-8 aspect-video rounded-lg bg-cream" />

          <time className="text-sm text-muted">
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString()
              : ""}
          </time>

          <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
          )}

          {post.content && (
            <div
              className="prose prose-lg mt-8 max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />
          )}
        </article>
      </Container>
    </div>
  );
}
