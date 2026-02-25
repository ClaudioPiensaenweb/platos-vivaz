import DirectusImage from "@/components/ui/DirectusImage";
import type { BlogPost, BlogCategory } from "@/lib/types";

interface BlogHeroProps {
  post: BlogPost;
  locale: string;
}

function getLocalizedContent(post: BlogPost, locale: string) {
  const translation = post.translations?.find((t) => t.languages_code === locale);
  return {
    title: translation?.title ?? post.title,
  };
}

function getCategoryName(category: BlogPost["category"]): string | null {
  if (!category || typeof category === "number") return null;
  return (category as BlogCategory).name ?? null;
}

export default function BlogHero({ post, locale }: BlogHeroProps) {
  const { title } = getLocalizedContent(post, locale);
  const categoryName = getCategoryName(post.category);

  return (
    <div className="relative min-h-[50vh] overflow-hidden bg-foreground">
      {/* Full-width background image */}
      {post.image && (
        <div className="absolute inset-0">
          <DirectusImage
            uuid={post.image}
            alt={title}
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-[50vh] flex-col justify-end p-8 md:p-16">
        {categoryName && (
          <span className="mb-3 inline-block w-fit rounded-full bg-accent/80 px-3 py-1 font-body text-xs font-medium text-white backdrop-blur-sm">
            {categoryName}
          </span>
        )}

        <h1 className="font-heading text-3xl font-bold text-white md:text-5xl lg:text-6xl max-w-4xl">
          {title}
        </h1>

        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="mt-4 font-body text-sm text-white/70"
          >
            {new Date(post.published_at).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>
    </div>
  );
}
