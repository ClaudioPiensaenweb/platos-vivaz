import { Link } from "@/i18n/navigation";
import DirectusImage from "@/components/ui/DirectusImage";
import type { BlogPost, BlogCategory } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  readMoreLabel?: string;
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

export default function BlogCard({ post, locale, readMoreLabel = "Read more" }: BlogCardProps) {
  const { title, excerpt } = getLocalizedContent(post, locale);
  const categoryName = getCategoryName(post.category);

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-cream">
        {post.image ? (
          <DirectusImage
            uuid={post.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-cream" />
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

        <h2 className="mt-2 font-heading text-lg font-bold text-foreground line-clamp-2">
          {title}
        </h2>

        {excerpt && (
          <p className="mt-2 font-body text-sm leading-relaxed text-muted line-clamp-3">
            {excerpt}
          </p>
        )}

        <Link
          href={`/noticias/${post.slug}`}
          className="mt-4 inline-block font-body text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          {readMoreLabel} &rarr;
        </Link>
      </div>
    </article>
  );
}
