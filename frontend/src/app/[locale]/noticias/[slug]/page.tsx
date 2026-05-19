import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import BlogContent from "@/components/blog/BlogContent";
import { getBlogPostBySlug } from "@/lib/directus";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { BlogPost, BlogCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

/* ── Static fallback images by category ── */
const CATEGORY_IMAGES: Record<string, string> = {
  regulacion: "/img/vivaz-clay-targets-sustainability-home.jpg",
};

function getCategoryName(cat: BlogPost["category"]): string | null {
  if (!cat || typeof cat === "number") return null;
  return (cat as BlogCategory).name ?? null;
}
function getCategorySlug(cat: BlogPost["category"]): string | null {
  if (!cat || typeof cat === "number") return null;
  return (cat as BlogCategory).slug ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: "VIVAZ Clay Targets" };
    const tr = post.translations?.find((t) => t.languages_code === locale);
    const title = tr?.seo_title || tr?.title || post.seo_title || post.title;
    const description = tr?.seo_description || post.seo_description || tr?.excerpt || post.excerpt || "";
    const pathMap: Record<string, string> = {
      es: `/noticias/${slug}`, en: `/en/news/${slug}`,
      fr: `/fr/actualites/${slug}`, de: `/de/nachrichten/${slug}`,
    };
    return {
      title: `${title} | VIVAZ Clay Targets`,
      description,
      alternates: {
        canonical: `${siteUrl}${pathMap[locale] || pathMap.es}`,
        languages: {
          es: `${siteUrl}${pathMap.es}`, en: `${siteUrl}${pathMap.en}`,
          fr: `${siteUrl}${pathMap.fr}`, de: `${siteUrl}${pathMap.de}`,
          "x-default": `${siteUrl}${pathMap.es}`,
        },
      },
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
  try { post = await getBlogPostBySlug(slug); } catch { notFound(); }
  if (!post) notFound();

  const tr = post.translations?.find((x) => x.languages_code === locale);
  const content = tr?.content ?? post.content ?? "";
  const title = tr?.title ?? post.title;
  const excerpt = tr?.excerpt ?? post.excerpt ?? "";
  const categoryName = getCategoryName(post.category);
  const categorySlug = getCategorySlug(post.category);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

  const heroImage = post.image
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL || ""}/assets/${post.image}?width=1400&quality=80`
    : categorySlug ? CATEGORY_IMAGES[categorySlug] : null;

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })
    : null;
  const wordCount = (post.content || "").replace(/<[^>]+>/g, "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  /* BlogPosting JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    wordCount,
    datePublished: post.published_at || new Date().toISOString(),
    dateModified: post.published_at || new Date().toISOString(),
    author: { "@type": "Organization", name: "VIVAZ Clay Targets", url: siteUrl },
    publisher: { "@type": "Organization", name: "VIVAZ Clay Targets", url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/svg/vivaz-logo-light.svg` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/noticias/${slug}` },
    image: heroImage || `${siteUrl}/img/vivaz-clay-targets-sustainability-home.jpg`,
    inLanguage: locale,
    ...(categoryName ? { articleSection: categoryName } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[class*='excerpt']", "article p:first-of-type"],
    },
  };

  return (
    <main className="bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Dark header strip */}
      <PageHero title="" />

      {/* Single white card: everything together */}
      <Container className="relative z-20 -mt-16 md:-mt-24 pb-20">
        <div className="mx-auto max-w-[820px] rounded-[30px] bg-white shadow-lg shadow-black/5 overflow-hidden">

          {/* ── Header section (padded) ── */}
          <div className="px-6 pt-8 md:px-10 md:pt-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-[12px] text-muted/50 uppercase tracking-wider">
                <li><Link href="/" className="hover:text-primary transition-colors">VIVAZ</Link></li>
                <li aria-hidden="true" className="text-muted/30">/</li>
                <li><Link href="/noticias" className="hover:text-primary transition-colors">{t("title")}</Link></li>
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
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary/8 pt-4 pb-6 font-body text-[12px] text-muted/50 uppercase tracking-wider">
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

          {/* ── Featured image (edge-to-edge inside card) ── */}
          {heroImage && (
            <div className="relative aspect-[16/7] overflow-hidden">
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

          {/* ── Article body (padded) ── */}
          <article className="px-6 py-10 md:px-12 md:py-14">
            {content && <BlogContent content={content} />}

            {/* Source */}
            <div className="mt-12 rounded-xl border border-primary/10 bg-cream/40 p-5">
              <p className="font-body text-[13px] text-muted/70">
                <strong className="text-primary/80">Fuente:</strong>{" "}
                <a
                  href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Reglamento (UE) 2025/660 — EUR-Lex
                </a>
              </p>
            </div>

            {/* Product cards — compliant alternatives */}
            <div className="mt-12">
              <h3 className="mb-4 font-heading text-[16px] font-bold text-primary uppercase tracking-wider">
                Platos que ya cumplen la normativa
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/productos/natura-110"
                  className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-cream/30 p-4 transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-accent/5 p-2">
                    <Image
                      src="/img/products/standard-orange.png"
                      alt="Natura"
                      fill
                      className="object-contain p-1 transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-[15px] font-bold text-primary">Natura</p>
                    <p className="font-body text-[12px] text-accent font-semibold">0 mg/kg PAH</p>
                    <p className="mt-0.5 font-body text-[12px] text-muted/60">100% resina de pino</p>
                  </div>
                </Link>
                <Link
                  href="/productos/eco-star-110"
                  className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-cream/30 p-4 transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-primary/5 p-2">
                    <Image
                      src="/img/products/eco-star.png"
                      alt="Eco Star"
                      fill
                      className="object-contain p-1 transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-[15px] font-bold text-primary">Eco Star</p>
                    <p className="font-body text-[12px] text-accent font-semibold">&lt; 50 mg/kg PAH</p>
                    <p className="mt-0.5 font-body text-[12px] text-muted/60">Fórmula híbrida ecológica</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Nav footer */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 pt-8">
              <Link
                href="/noticias"
                className="font-body text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                &larr; {t("backToList")}
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Contactar
              </Link>
            </div>
          </article>

        </div>{/* end white card */}
      </Container>
    </main>
  );
}
