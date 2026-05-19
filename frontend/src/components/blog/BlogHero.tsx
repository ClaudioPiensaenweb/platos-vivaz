import Image from "next/image";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import type { BlogPost, BlogCategory } from "@/lib/types";

/* Static fallback images by category slug */
const CATEGORY_IMAGES: Record<string, string> = {
  regulacion: "/img/vivaz-clay-targets-sustainability-home.jpg",
};

interface BlogHeroProps {
  post: BlogPost;
  locale: string;
  backLabel: string;
}

function getLocalizedContent(post: BlogPost, locale: string) {
  const translation = post.translations?.find((t) => t.languages_code === locale);
  return {
    title: translation?.title ?? post.title,
    excerpt: translation?.excerpt ?? post.excerpt,
  };
}

function getCategoryName(category: BlogPost["category"]): string | null {
  if (!category || typeof category === "number") return null;
  return (category as BlogCategory).name ?? null;
}

function getCategorySlug(category: BlogPost["category"]): string | null {
  if (!category || typeof category === "number") return null;
  return (category as BlogCategory).slug ?? null;
}

export default function BlogHero({ post, locale, backLabel }: BlogHeroProps) {
  const { title, excerpt } = getLocalizedContent(post, locale);
  const categoryName = getCategoryName(post.category);
  const categorySlug = getCategorySlug(post.category);
  const heroImage = post.image
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL || ""}/assets/${post.image}?width=1400&quality=80`
    : categorySlug
      ? CATEGORY_IMAGES[categorySlug]
      : null;

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const wordCount = (post.content || "").replace(/<[^>]+>/g, "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      {/* Dark header strip for the transparent navbar */}
      <div
        className="relative z-10 overflow-hidden rounded-bl-[60px] rounded-br-[60px] md:rounded-bl-[120px] md:rounded-br-[120px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #042e15 0%, #075627 30%, #03441d 65%, #242e22 100%)",
          minHeight: "200px",
        }}
      >
        <div className="pt-[calc(70px+2rem)] lg:pt-[calc(105px+2rem)] pb-24 md:pb-32" />
      </div>

      {/* Content card — overlaps the hero */}
      <Container className="relative z-20 -mt-16 md:-mt-24">
        <div className="mx-auto max-w-[820px]">
          {/* Text block */}
          <div className="rounded-t-[24px] bg-white px-6 pt-8 pb-6 shadow-lg shadow-black/5 md:px-10 md:pt-10 md:pb-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-[12px] text-muted/50 uppercase tracking-wider">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">VIVAZ</Link>
                </li>
                <li aria-hidden="true" className="text-muted/30">/</li>
                <li>
                  <Link href="/noticias" className="hover:text-primary transition-colors">{backLabel}</Link>
                </li>
                {categoryName && (
                  <>
                    <li aria-hidden="true" className="text-muted/30">/</li>
                    <li className="text-muted/70">{categoryName}</li>
                  </>
                )}
              </ol>
            </nav>

            {/* Category badge */}
            {categoryName && (
              <span className="mb-4 inline-block rounded-full bg-primary/8 border border-primary/15 px-3 py-1 font-body text-[11px] font-medium text-primary/70 uppercase tracking-wider">
                {categoryName}
              </span>
            )}

            {/* Title */}
            <h1
              className="font-heading font-bold text-primary leading-[1.12] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.6rem, 1rem + 2.5vw, 2.5rem)" }}
            >
              {title}
            </h1>

            {/* Excerpt */}
            {excerpt && (
              <p className="mt-4 font-body text-[15px] leading-[1.7] text-muted/80 max-w-[640px]">
                {excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary/8 pt-4 font-body text-[12px] text-muted/50 uppercase tracking-wider">
              {formattedDate && (
                <time dateTime={post.published_at!} className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  {formattedDate}
                </time>
              )}
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {readingTime} min
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
                VIVAZ Clay Targets
              </span>
            </div>
          </div>

          {/* Featured image — full width, rounds bottom */}
          {heroImage && (
            <div className="relative aspect-[16/8] overflow-hidden rounded-b-[24px] shadow-lg shadow-black/5">
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 820px"
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
