import { Link } from "@/i18n/navigation";
import Image from "next/image";
import DirectusImage from "@/components/ui/DirectusImage";
import type { BlogPost, BlogCategory } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  readMoreLabel?: string;
}

/* Static fallback images for posts without a Directus image */
const FALLBACK_IMAGES: Record<string, string> = {
  regulacion: "/img/vivaz-clay-targets-sustainability-home.jpg",
};

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

export default function BlogCard({ post, locale, readMoreLabel = "Read more" }: BlogCardProps) {
  const { title, excerpt } = getLocalizedContent(post, locale);
  const categoryName = getCategoryName(post.category);
  const categorySlug = getCategorySlug(post.category);
  const fallbackImage = categorySlug ? FALLBACK_IMAGES[categorySlug] : null;

  return (
    <Link
      href={{ pathname: "/noticias/[slug]", params: { slug: post.slug } }}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <article>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-cream">
          {post.image ? (
            <DirectusImage
              uuid={post.image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : fallbackImage ? (
            <Image
              src={fallbackImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-cream">
              <Image
                src="/svg/vivaz-logo-light.svg"
                alt="VIVAZ"
                width={120}
                height={36}
                className="opacity-20"
              />
            </div>
          )}
          {categoryName && (
            <span className="absolute left-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {categoryName}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {post.published_at && (
            <time
              dateTime={post.published_at}
              className="font-body text-xs text-muted"
            >
              {new Date(post.published_at).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}

          <h2 className="mt-2 font-heading text-lg font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h2>

          {excerpt && (
            <p className="mt-2 font-body text-sm leading-relaxed text-muted line-clamp-3">
              {excerpt}
            </p>
          )}

          <span className="mt-4 inline-block font-body text-sm font-medium text-accent group-hover:text-accent-hover transition-colors">
            {readMoreLabel} &rarr;
          </span>
        </div>
      </article>
    </Link>
  );
}
