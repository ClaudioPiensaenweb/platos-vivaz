# Phase 5: Polish - Research

**Researched:** 2026-02-25
**Domain:** Core Web Vitals optimization, SEO metadata, i18n sitemap, mobile QA — Next.js 16 + next-intl 4 + framer-motion 12
**Confidence:** HIGH

## Summary

Phase 5 is a QA and hardening phase — no new features, only tightening what Phases 1-4 built. The work splits into four tracks: (1) Core Web Vitals optimization on the 5 key pages (home, NATURA product, regulation, technology, contact), (2) mobile layout QA at 375px and 768px, (3) meta/OG tag completion for pages missing description/openGraph, and (4) sitemap validation.

The good news: the codebase is already in solid shape. The sitemap.ts already implements `localePrefix: "as-needed"` correctly with x-default pointing to the Spanish URL. The HeroSection already has `priority` on the hero image. InView uses IntersectionObserver so scroll-triggered animations do not block LCP. The main gaps found in codebase audit are: (a) 5 pages return only `title` in `generateMetadata` — missing `description` and `openGraph`, (b) the locale message files lack description/meta keys for those pages, (c) no `sizes` prop on several below-fold `<Image>` components, and (d) the hero CSS animations (`.animate-fade-in-up`) run immediately on page load with no `prefers-reduced-motion` guard in CSS (framer-motion components use `useReducedMotion` but the CSS class system does not).

**Primary recommendation:** Run the audit-fix-verify loop: measure first (next build + manual Lighthouse on 5 pages), fix the identified gaps in priority order (metadata > image sizing > CSS reduced-motion > mobile layout), then verify against success criteria.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Performance Budget:**
- Keep all framer-motion animations — they are the brand differentiator. Optimize around them: defer non-critical animations, use will-change hints, ensure they don't block LCP
- Image strategy: mark hero/above-fold images as `priority={true}`, all below-fold images as `loading="lazy"`. Add explicit width/height to prevent CLS
- Audit approach: run `next build` to check bundle sizes, then manual Lighthouse audit on 5 key pages (home, NATURA product, regulation, technology, contact) in Spanish locale
- Other locales share the same components/layout — locale-specific issues unlikely given shared rendering paths

**Meta & SEO Strategy:**
- Meta titles via template pattern in locale files: `[Page Topic] | Vivaz Clay Targets` — each page gets a unique translated key (e.g., `meta.home.title`, `meta.products.natura.title`) in all 4 locales
- Meta descriptions: unique per page per locale, stored in locale message files alongside titles
- Open Graph: one shared brand OG image (1200x630, Vivaz logo + product shot) for all pages — simple, consistent, professional
- Sitemap: use next-intl's built-in sitemap generation with getPathnames() to auto-generate correct hreflang alternates — handles `localePrefix: "as-needed"` natively (es = no prefix, en/fr/de get prefix)
- Structured data: keep current scope (product JSON-LD already done in Phase 2) — no additional schemas

**Mobile QA Scope:**
- Test at two breakpoints: 375px (iPhone SE) and 768px (iPad) — desktop is already the primary design target
- ComplianceMatrix: keep existing overflow-x-auto horizontal scroll on mobile
- PAH chart: bars reduce width or stack vertically on narrow viewports — minimal changes from Phase 3 implementation
- Contact form: verify inputs are full-width on mobile, touch targets 44px+, Nacional/Internacional cards stack cleanly
- Typography: audit Quablo headings on hero sections and page titles at 375px — fix with responsive text classes (`text-3xl md:text-5xl` pattern) if any overflow or disproportion found
- FormatTabs: verify horizontal scroll works cleanly on mobile without clipping

### Claude's Discretion
- Exact Lighthouse optimization techniques (font-display, preconnect hints, etc.)
- Whether to add `fetchpriority="high"` or rely on Next.js `priority` prop
- Specific responsive text size values for heading adjustments
- Sitemap generation implementation details (route vs app directory approach)
- Bundle analysis tool choice (built-in Next.js analyzer vs @next/bundle-analyzer)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| I18N-04 | Sitemap includes all locale variants for each page | Sitemap already implemented in `sitemap.ts` — needs validation that alternates.languages are correct for all pages including dynamic product/blog routes, and that the `localePrefix: "as-needed"` URL construction is correct |
| PERF-01 | Core Web Vitals passing — LCP < 2.5s, CLS < 0.1, INP < 200ms on all pages | Next.js `priority` prop on above-fold images, `sizes` prop on all `<Image>` components, CSS animation guards for reduced-motion, framer-motion `useReducedMotion` already on components |
| PERF-02 | Mobile responsive across all pages (375px+) | Manual viewport testing at 375px and 768px; fix Quablo heading overflow, verify form touch targets, confirm ComplianceMatrix scroll and FormatTabs scroll |
| PERF-04 | Unique meta title/description per page per locale with Open Graph tags | 5 pages (home layout, about, technology, regulation, contact) missing `description` and `openGraph` in `generateMetadata` — need locale keys added and generateMetadata updated |
</phase_requirements>

---

## Standard Stack

### Core (already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | generateMetadata, Image, sitemap API | Built-in — no install needed |
| next-intl | ^4.1.0 | getTranslations in generateMetadata, sitemap getPathname | Official i18n pattern for this project |
| framer-motion | ^12.34.0 | Already on all animated components | Brand requirement — kept as-is |

### Supporting (no new installs needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @next/bundle-analyzer | optional | Bundle size analysis | Optional — `next build` output sufficient per user decision |
| Lighthouse CLI | system | Performance audit | Run against `localhost:3000` after `next build && next start` |

**Installation:**
```bash
# No new packages required for Phase 5.
# All tools are built-in or system-level.
```

---

## Architecture Patterns

### Recommended Project Structure (no changes needed)

The existing structure handles all phase requirements:

```
src/
├── app/[locale]/
│   ├── layout.tsx          # Global metadata (title template, OG image, metadataBase)
│   ├── page.tsx            # Home — needs description + openGraph added
│   ├── contacto/page.tsx   # Needs description + openGraph added
│   ├── sobre-vivaz/page.tsx # Needs description + openGraph added
│   ├── tecnologia/page.tsx  # Needs description + openGraph added
│   └── regulacion-2026/page.tsx # Needs description + openGraph added
├── messages/
│   ├── es.json             # Needs meta description keys for 5 pages
│   ├── en.json             # Same
│   ├── fr.json             # Same
│   └── de.json             # Same
└── app/sitemap.ts          # Already correct — verify only
```

### Pattern 1: Metadata Inheritance via Layout Template

**What:** The `[locale]/layout.tsx` already defines global title/description. Pages OVERRIDE it with their own `generateMetadata`. The issue is that several pages return only `title` — they inherit the global OG image from the layout (openGraph is shallow-merged), but they don't set a page-specific `description` or `openGraph.title/description`.

**Critical behavior (verified from Next.js 16 official docs):** openGraph fields are shallowly merged — if a page sets `openGraph: { title: "X" }` without `description`, the parent's `openGraph.description` is LOST. Pages must either spread parent openGraph OR set all required OG fields.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// WRONG — loses parent openGraph.description:
return {
  title: `${t("title")} | VIVAZ Clay Targets`,
  openGraph: { title: t("title") }, // description dropped
}

// CORRECT — set all needed fields, inherit image from shared constant:
import { sharedOpenGraph } from "@/lib/metadata"; // shared OG image

return {
  title: `${t("title")} | VIVAZ Clay Targets`,
  description: t("metaDescription"),
  openGraph: {
    ...sharedOpenGraph,
    title: `${t("title")} | VIVAZ Clay Targets`,
    description: t("metaDescription"),
  },
}
```

**The shared OG image pattern** (decision: one brand image for all pages):

```typescript
// src/lib/metadata.ts (create this utility)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

export const sharedOpenGraph = {
  siteName: "VIVAZ Clay Targets",
  type: "website" as const,
  images: [
    {
      url: `${SITE_URL}/img/og-vivaz.jpg`, // 1200x630 brand image
      width: 1200,
      height: 630,
      alt: "VIVAZ Clay Targets — Ecological Clay Target Manufacturers",
    },
  ],
};
```

### Pattern 2: Next.js Image — LCP and CLS Optimization

**What:** The `priority` prop on `<Image>` tells Next.js to preload the image, disabling lazy loading. The `sizes` prop helps the browser choose the correct srcset entry.

**Current state (from codebase audit):**
- HeroSection: `priority` YES, no `sizes` (full-screen hero — `sizes="100vw"` needed)
- PageHero: `priority` YES, no `sizes` (full-screen background — `sizes="100vw"` needed)
- BlogHero: `priority` YES
- ProductLinePage hero image: `priority` YES
- Navbar logo: `priority` YES
- ProductShowcase (natura/ecostar): NO `priority`, NO `sizes` — below-fold, fine without priority, but needs `sizes`

**CLS prevention** — `width` and `height` props prevent layout shift by reserving space. All `fill` images (hero backgrounds) are immune to CLS when the parent has explicit height. Explicit-dimension images need both `width` and `height` set.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
// For full-bleed backgrounds:
<Image fill src="..." sizes="100vw" className="object-cover" priority />

// For content images with explicit dimensions:
<Image src="..." width={702} height={478} sizes="(max-width: 768px) 100vw, 50vw" />
```

### Pattern 3: Sitemap with `localePrefix: "as-needed"`

**What:** The `sitemap.ts` is already implemented correctly. The key pattern is the `localeUrl()` helper that omits the prefix for `es` and adds `/locale/` prefix for `en`, `fr`, `de`. The `alternates.languages` property in the Next.js `MetadataRoute.Sitemap` type generates `<loc>` + `<xhtml:link rel="alternate">` entries.

**Current sitemap.ts status (verified):** Already handles static pages, dynamic products, and dynamic blog posts. Already includes x-default pointing to Spanish URLs. The `localeUrl()` helper correctly implements `localePrefix: "as-needed"`.

**Verification needed:** Confirm the sitemap renders correctly at `/sitemap.xml` when Directus is running (the try/catch fallback silently skips dynamic entries if Directus is down).

### Pattern 4: CSS Animation with Reduced Motion Guard

**What:** The CSS `@keyframes` animations (`.animate-fade-in-up`, etc.) applied directly on HeroSection elements run unconditionally. The framer-motion components already use `useReducedMotion()` but the CSS utility classes do not.

**Fix:** Add a `@media (prefers-reduced-motion: reduce)` block in `globals.css`:

```css
/* Source: MDN + verified pattern */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-fade-in,
  .animate-slide-in-left,
  .animate-slide-in-right,
  .animate-scale-in {
    animation: none;
    opacity: 1;
  }
  .animate-marquee {
    animation: none;
  }
  ::view-transition-old(page-content),
  ::view-transition-new(page-content),
  ::view-transition-old(product-hero),
  ::view-transition-new(product-hero) {
    animation: none;
  }
}
```

### Pattern 5: Locale Description Keys per Page

**Current gaps (from codebase audit):**

| Page | Has title key | Has description key | Has OG |
|------|--------------|--------------------|----|
| Home (layout.tsx metadata) | YES (metadata.title) | YES (metadata.description) | Partial (no image) |
| contacto/page.tsx | YES (contact.title) | NO | NO |
| sobre-vivaz/page.tsx | YES (about.title) | NO | NO |
| tecnologia/page.tsx | YES (technology.title) | NO | NO |
| regulacion-2026/page.tsx | YES (regulation.title) | NO | NO |
| productos/[slug] | YES | YES (metaDescriptionNatura/EcoStar) | NO |
| noticias | YES (news.metaTitle) | YES (news.metaDescription) | NO |
| noticias/[slug] | YES (post.seo_title) | YES (post.seo_description) | NO |

Keys needed in all 4 locale files:

```json
// contact namespace — add:
"metaDescription": "[translated unique description]"

// about namespace — add:
"metaDescription": "[translated unique description]"

// technology namespace — add:
"metaDescription": "[translated unique description]"

// regulation namespace — add:
"metaDescription": "[translated unique description]"
```

### Anti-Patterns to Avoid

- **Setting `openGraph: { title: "X" }` without spreading parent fields:** This drops all parent openGraph fields (image, siteName, type). Always set the complete openGraph object or spread from a shared constant.
- **Using `priority` on all images:** `priority` disables lazy loading and forces a preload link in the `<head>`. Only use on above-the-fold images. Overuse bloats the initial HTML and can hurt performance.
- **Missing `sizes` on non-fill images:** Without `sizes`, Next.js cannot generate an accurate srcset, leading to oversized image downloads on mobile.
- **Hardcoding OG image URLs without `NEXT_PUBLIC_SITE_URL`:** OG images must be absolute URLs. Always build from the env var.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG image generation | Custom canvas renderer | Static `/public/img/og-vivaz.jpg` (1200x630 JPEG) | User decision: one shared brand image — no dynamic generation needed |
| Sitemap locale URL generation | Custom URL builder | Already implemented `localeUrl()` in `sitemap.ts` | Correct, tested, handles as-needed prefix |
| Bundle analysis | Custom size tracking | `ANALYZE=true next build` with `@next/bundle-analyzer` or just `next build` output | Built-in solution — sufficient per user decision |
| CLS measurement | Manual JS measurement | Lighthouse DevTools or PageSpeed Insights | Automated tool gives exact CLS attribution |
| Mobile viewport testing | Physical devices | Browser DevTools responsive mode at 375px | Sufficient for layout QA; real devices for INP only if issues found |

**Key insight:** This phase is audit-and-fix, not build-new. Most problems can be found with browser DevTools and fixed with targeted edits. Avoid over-engineering.

---

## Common Pitfalls

### Pitfall 1: OG Image Must Be Absolute URL

**What goes wrong:** `openGraph.images` with a relative path (e.g., `/img/og-vivaz.jpg`) silently fails — social crawlers receive an unresolvable URL.
**Why it happens:** The `generateMetadata` API accepts relative URLs only when `metadataBase` is set in a parent layout. The current `[locale]/layout.tsx` does NOT set `metadataBase`.
**How to avoid:** Either add `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)` to the layout, OR use absolute URLs in all OG image objects. Setting `metadataBase` in the root locale layout is the cleaner solution — it then allows relative paths everywhere else.
**Warning signs:** `og:image` meta tag in page source shows a relative path like `/img/og-vivaz.jpg` instead of `https://platosvivaz.com/img/og-vivaz.jpg`.

### Pitfall 2: Framer-Motion Layout Shift on Load

**What goes wrong:** Framer-motion `initial={{ opacity: 0 }}` components render invisible initially, then animate in. If above-fold content uses this pattern, the LCP element may be invisible until framer hydrates.
**Why it happens:** Server-renders the element at opacity 0 (or omits it), then client-side framer-motion animates it in — the LCP image/text may not be "painted" until after JS hydration.
**How to avoid:** Hero images use CSS `priority` + `fill` and are NOT inside framer-motion wrappers (confirmed in codebase). InView component correctly starts elements at `opacity-0` using CSS class, which is also fine as InView targets below-fold content. Check that HeroSection's h1 and background image are not inside framer-motion `AnimatePresence` wrappers.
**Warning signs:** Lighthouse LCP report shows text or image as LCP element with delay attributable to "render delay."

### Pitfall 3: Metadata Shallow Merge Drops OG Fields

**What goes wrong:** A page sets `openGraph: { title: "X" }`. The parent layout has `openGraph: { title: "...", description: "...", siteName: "..." }`. The page's openGraph completely replaces the parent's — `description` and `siteName` are dropped.
**Why it happens:** Next.js metadata merging is SHALLOW for nested objects. Only top-level keys are merged/inherited. Nested objects are replaced entirely.
**How to avoid:** When adding OG to page-level `generateMetadata`, always provide all required fields. Use a shared `sharedOpenGraph` constant to avoid repetition.
**Warning signs:** `<meta property="og:description">` missing from page source even though parent layout defines it.

### Pitfall 4: German Long Words Breaking Mobile Layouts

**What goes wrong:** German compound words (e.g., "Normkonformität", "Ökologische") can overflow narrow containers that have no `overflow-wrap: break-word`.
**Why it happens:** CSS default is `overflow-wrap: normal` — long unbreakable words extend beyond container width, causing horizontal scroll.
**How to avoid:** Add `overflow-wrap: break-word` or `word-break: break-word` to heading and label containers. Use `hyphens: auto` with `lang="de"` on the html element.
**Warning signs:** Horizontal scrollbar visible at 375px viewport in German locale. Check PageHero headings specifically.

### Pitfall 5: Sitemap Dynamic Routes Silently Empty When Directus Offline

**What goes wrong:** `sitemap.ts` wraps product and blog queries in `try/catch`. If Directus is offline during `next build`, the dynamic product and blog sitemap entries are silently omitted.
**Why it happens:** The try/catch is intentional (graceful degradation) but masks the issue in production builds.
**How to avoid:** When running the sitemap verification step, ensure Directus is running. Run `curl localhost:3000/sitemap.xml` and count entries — should include at minimum 2 product slugs (natura, eco-star).

### Pitfall 6: `sizes` Missing Causes Oversized Mobile Image Downloads

**What goes wrong:** Without a `sizes` attribute, Next.js assumes the image fills the full viewport width at all breakpoints. This causes the browser to download a full-width image even on mobile where the image is 50% of viewport.
**Why it happens:** The `sizes` attribute is optional in Next.js `<Image>`, but its absence means the automatic srcset cannot be used effectively.
**How to avoid:** For any `<Image>` not using `fill`, add `sizes`. For 2-column grid images: `sizes="(max-width: 768px) 100vw, 50vw"`. For product card images: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.

---

## Code Examples

Verified patterns from official sources and codebase inspection:

### Shared OG Image Constant

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph
// Create: src/lib/metadata.ts

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

export const sharedOpenGraph = {
  siteName: "VIVAZ Clay Targets",
  type: "website" as const,
  images: [
    {
      url: `${SITE_URL}/img/og-vivaz.jpg`,
      width: 1200,
      height: 630,
      alt: "VIVAZ Clay Targets — Ecological Clay Target Manufacturers Since 1967",
    },
  ],
};
```

### Page generateMetadata with Description and OG

```typescript
// Pattern for all pages missing description/OG
// Example: sobre-vivaz/page.tsx

import { sharedOpenGraph } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const title = `${t("title")} | VIVAZ Clay Targets`;
  return {
    title,
    description: t("metaDescription"),
    openGraph: {
      ...sharedOpenGraph,
      title,
      description: t("metaDescription"),
    },
  };
}
```

### metadataBase in Layout (recommended addition)

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
// In src/app/[locale]/layout.tsx generateMetadata function, add:

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

return {
  metadataBase: new URL(siteUrl),
  title: t("title"),
  description: t("description"),
  // ...rest
};
```

### Image with Correct `sizes` Prop

```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image#sizes
// For full-bleed fill images (HeroSection, PageHero):
<Image fill src="..." sizes="100vw" priority className="object-cover" />

// For 2-column grid images (ProductShowcase):
<Image
  src={imageSrc}
  alt={t("title")}
  width={702}
  height={478}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="h-auto w-full object-cover"
/>
```

### CSS Reduced Motion Guard

```css
/* Add to end of src/app/globals.css */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-fade-in,
  .animate-slide-in-left,
  .animate-slide-in-right,
  .animate-scale-in {
    animation: none;
    opacity: 1;
  }
  .animate-marquee {
    animation: none;
  }
}
```

### Sitemap Validation Command

```bash
# Verify sitemap while Directus is running
curl http://localhost:3000/sitemap.xml | grep -c "hreflang"
# Should return a count > 0 for each page/locale combination
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | INP measures all interactions, not just first; harder to game; framer-motion animation completion time counts toward INP |
| Manual hreflang in `<head>` | `alternates.languages` in `MetadataRoute.Sitemap` | Next.js 13.2+ | Automatic, type-safe, co-located with route |
| `themeColor` in metadata | `generateViewport()` | Next.js 14+ | Deprecated in metadata object |
| `next build` then visual check | Lighthouse CI + RUM (Vercel Speed Insights) | 2023+ | Automated regression detection; V2 concern only |

**Deprecated/outdated:**
- `metadata.viewport`: Replaced by `generateViewport()` export — do not use
- `metadata.themeColor`: Same — moved to `generateViewport()`
- `@studio-freight/react-lenis`: Already correctly using `lenis` direct (noted in MEMORY.md)

---

## Open Questions

1. **OG brand image asset existence**
   - What we know: User decision requires a 1200x630 brand OG image at `/public/img/og-vivaz.jpg`
   - What's unclear: This image does not currently exist in `/public/img/` — only `hero-bg.png`, `natura-detail.png`, `ecostar-detail.png` are referenced in codebase
   - Recommendation: Create the OG image as part of Phase 5. If no brand image asset is available, use the hero-bg.png cropped to 1200x630, or fall back to providing only title+description OG tags without an image (which is acceptable for social sharing — text cards work fine)

2. **INP measurement accuracy without real users**
   - What we know: INP requires user interaction to measure — Lighthouse uses TBT (Total Blocking Time) as a proxy
   - What's unclear: The framer-motion 12 bundle (32KB gzipped) adds to JS parse time; on low-end mobile, animation callbacks may delay interaction response
   - Recommendation: Verify TBT < 200ms in Lighthouse as proxy for INP. If TBT is high, investigate with Chrome DevTools Performance panel on throttled CPU (4x slowdown)

3. **home/page.tsx metadata — layout vs page**
   - What we know: The `[locale]/layout.tsx` defines `metadata.title` and `metadata.description` from the `"metadata"` namespace. The home `page.tsx` (src/app/[locale]/page.tsx) currently exports NO `generateMetadata`
   - What's unclear: The home page inherits layout metadata entirely — the home page title IS the site title (`"VIVAZ Clay Targets — Líderes Europeos en Platos Ecológicos"`). This is actually correct behavior for a homepage. But OG image is still missing from the layout.
   - Recommendation: Add `openGraph` with the brand image and `metadataBase` to the `[locale]/layout.tsx` — the homepage inherits it automatically. No separate `generateMetadata` needed on `page.tsx`.

---

## Sitemap Verification Checklist

The `sitemap.ts` is already implemented. Verification steps:

1. Start dev server with Directus running
2. Hit `http://localhost:3000/sitemap.xml`
3. Confirm 7 static pages × 4 locale alternates = 28 `<xhtml:link>` entries for static pages
4. Confirm 2 product pages (natura, eco-star) × 4 locale alternates = 8 product alternates
5. Confirm Spanish URLs have no locale prefix (e.g., `https://platosvivaz.com/productos`)
6. Confirm non-Spanish URLs have prefix (e.g., `https://platosvivaz.com/en/productos`)
7. Confirm `x-default` on each entry points to Spanish URL

**Likely outcome:** The sitemap is already correct and only needs verification, not code changes (per the STATE.md note: hreflang was implemented in 01-03 and the pattern is established).

---

## Sources

### Primary (HIGH confidence)
- `https://nextjs.org/docs/app/api-reference/functions/generate-metadata` — Verified: openGraph shallow merge behavior, metadataBase, alternates.languages, streaming metadata
- `https://next-intl.dev/docs/environments/actions-metadata-route-handlers` — Verified: getTranslations in generateMetadata pattern
- Codebase direct inspection — `sitemap.ts`, all page `generateMetadata` functions, `globals.css`, `InView.tsx`, `HeroSection.tsx`, all 4 locale message files

### Secondary (MEDIUM confidence)
- `https://codewithlucifer.com/blog/optimizing-next-js-15-apps-for-core-web-vitals-in-2025` — Verified with Next.js docs: priority prop, sizes prop, Server Components reduce hydration
- `https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024` — Verified: LCP < 2.5s threshold, INP < 200ms, CLS < 0.1 definitions
- `https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025` — General patterns cross-verified with official docs

### Tertiary (LOW confidence)
- WebSearch: framer-motion 32KB bundle size — cited from reactlibraries.com comparison article, not verified against npm registry; treat as approximate

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified from package.json and official docs; no new libraries needed
- Architecture: HIGH — patterns verified directly from Next.js 16 official docs and codebase inspection
- Pitfalls: HIGH — shallow merge behavior verified from official docs; other pitfalls from codebase audit

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (Next.js and next-intl are stable; CWV thresholds do not change frequently)
