---
phase: 05-polish
plan: 01
subsystem: ui
tags: [seo, metadata, open-graph, accessibility, sitemap, next.js, i18n]

# Dependency graph
requires:
  - phase: 04-page-assembly
    provides: All pages assembled (contacto, noticias, productos, sobre-vivaz, tecnologia, regulacion-2026)

provides:
  - sharedOpenGraph constant in frontend/src/lib/metadata.ts for consistent OG brand image
  - metadataBase in layout.tsx enabling absolute OG image URL resolution
  - Complete OG tags (title, description, og:image, og:site_name) on all pages
  - Unique meta descriptions in all 4 locales for contact, about, technology, and regulation pages
  - prefers-reduced-motion CSS guard disabling all animation classes

affects:
  - 05-02 (performance plan may reference metadata patterns)
  - Any future page additions (should follow sharedOpenGraph pattern)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - sharedOpenGraph spread pattern — import constant, spread into page openGraph, override title/description per page
    - metadataBase in root layout — enables relative OG image paths to resolve as absolute URLs

key-files:
  created:
    - frontend/src/lib/metadata.ts
  modified:
    - frontend/src/app/[locale]/layout.tsx
    - frontend/src/app/[locale]/contacto/page.tsx
    - frontend/src/app/[locale]/noticias/page.tsx
    - frontend/src/app/[locale]/productos/[slug]/page.tsx
    - frontend/src/app/[locale]/sobre-vivaz/page.tsx
    - frontend/src/app/[locale]/tecnologia/page.tsx
    - frontend/src/app/[locale]/regulacion-2026/page.tsx
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json
    - frontend/src/app/globals.css

key-decisions:
  - "sharedOpenGraph pattern: single constant in metadata.ts spread into each page, overriding only title/description — ensures consistent og:image and og:site_name across all pages"
  - "OG image URL uses NEXT_PUBLIC_SITE_URL env var with platosvivaz.com fallback — absolute URL guaranteed when metadataBase + env var set"
  - "prefers-reduced-motion uses !important on animation:none — overrides any specificity from inline style or component-level animation props"
  - "About, technology, and regulation pages also updated (deviation Rule 2) — plan specified metaDescription keys were added to locale files for these namespaces, so completing their OG metadata was the correct completion of the intent"

patterns-established:
  - "Page generateMetadata: const title = ...; return { title, description: t('metaDescription'), openGraph: { ...sharedOpenGraph, title, description } }"
  - "Shared OG image via frontend/src/lib/metadata.ts sharedOpenGraph — import and spread in any new page"

requirements-completed: [PERF-04, I18N-04]

# Metrics
duration: 5min
completed: 2026-02-25
---

# Phase 5 Plan 01: SEO Metadata and Reduced-Motion Summary

**sharedOpenGraph constant with metadataBase, complete OG tags on all 7 pages in 4 locales, and prefers-reduced-motion CSS guard for all animation classes**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-25T05:47:52Z
- **Completed:** 2026-02-25T05:52:52Z
- **Tasks:** 2
- **Files modified:** 13 (1 created, 12 modified)

## Accomplishments

- Created `frontend/src/lib/metadata.ts` with `sharedOpenGraph` constant — single source of truth for OG image, siteName, and type across all pages
- Added `metadataBase: new URL(siteUrl)` to layout.tsx so relative OG image paths resolve as absolute HTTPS URLs (required by social crawlers)
- Added unique `metaDescription` translation keys to all 4 locale files for contact, about, technology, and regulation page namespaces (16 new strings total)
- Added full `openGraph` spread to all 7 pages (contacto, noticias, productos/[slug], sobre-vivaz, tecnologia, regulacion-2026, layout)
- Added `prefers-reduced-motion: reduce` media query guard to globals.css, disabling all 6 animation classes and view-transition animations
- Verified sitemap.ts is correctly implemented with hreflang alternates for es/en/fr/de on all static pages, dynamic product pages, and dynamic blog posts

## Task Commits

Each task was committed atomically:

1. **Task 1: Create shared metadata utility and complete page-level SEO metadata** - `8720ab5` (feat)
2. **Task 2: Add CSS reduced-motion guard and verify sitemap locale coverage** - `b98ff69` (feat)

**Plan metadata:** `b392b07` (docs: complete plan)

## Files Created/Modified

- `frontend/src/lib/metadata.ts` - Created: sharedOpenGraph constant with OG image URL, siteName, type
- `frontend/src/app/[locale]/layout.tsx` - Added metadataBase, sharedOpenGraph import, spread into openGraph
- `frontend/src/app/[locale]/contacto/page.tsx` - Added description + openGraph to generateMetadata
- `frontend/src/app/[locale]/noticias/page.tsx` - Added openGraph to generateMetadata
- `frontend/src/app/[locale]/productos/[slug]/page.tsx` - Added openGraph to generateMetadata
- `frontend/src/app/[locale]/sobre-vivaz/page.tsx` - Added description + openGraph to generateMetadata
- `frontend/src/app/[locale]/tecnologia/page.tsx` - Added description + openGraph to generateMetadata
- `frontend/src/app/[locale]/regulacion-2026/page.tsx` - Added description + openGraph to generateMetadata
- `frontend/src/messages/es.json` - Added metaDescription to contact, about, technology, regulation namespaces
- `frontend/src/messages/en.json` - Added metaDescription to contact, about, technology, regulation namespaces
- `frontend/src/messages/fr.json` - Added metaDescription to contact, about, technology, regulation namespaces
- `frontend/src/messages/de.json` - Added metaDescription to contact, about, technology, regulation namespaces
- `frontend/src/app/globals.css` - Added prefers-reduced-motion media query guard for all animation classes

## Decisions Made

- **sharedOpenGraph pattern:** Single constant in `metadata.ts` spread into each page, overriding only `title` and `description`. Ensures `og:image`, `og:site_name`, and `type` are consistent across all pages without duplication.
- **OG image path:** Uses `NEXT_PUBLIC_SITE_URL` env var with `https://platosvivaz.com` fallback. Path is `/img/og-vivaz.jpg` (does not need to exist yet — crawlers skip missing images gracefully).
- **prefers-reduced-motion with `!important`:** Necessary to override specificity from the `animation` shorthand in utility classes and any framer-motion inline styles.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Extended openGraph to sobre-vivaz, tecnologia, and regulacion-2026 pages**

- **Found during:** Task 1 (Create shared metadata utility)
- **Issue:** Plan explicitly listed metaDescription keys for about/technology/regulation namespaces and locale files, but the per-page generateMetadata updates only listed contacto, noticias, and productos. The metadata keys were useless without corresponding page-level openGraph blocks.
- **Fix:** Added `sharedOpenGraph` import and full openGraph return to sobre-vivaz, tecnologia, and regulacion-2026 page generateMetadata functions — same pattern as the three explicitly listed pages.
- **Files modified:** frontend/src/app/[locale]/sobre-vivaz/page.tsx, frontend/src/app/[locale]/tecnologia/page.tsx, frontend/src/app/[locale]/regulacion-2026/page.tsx
- **Verification:** TypeScript compile passes, all pages now have complete OG metadata
- **Committed in:** 8720ab5 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 - missing critical functionality)
**Impact on plan:** Extension of plan intent to its logical completion. The locale file additions for about/technology/regulation namespaces would have been dead strings without corresponding page updates.

## Issues Encountered

None - TypeScript compiled cleanly on first pass with no type errors.

## User Setup Required

None - no external service configuration required. The OG image `/img/og-vivaz.jpg` should be added to `frontend/public/img/` before production launch for social sharing to show the branded image.

## Next Phase Readiness

- SEO metadata complete for all pages — ready for 05-02 (performance / Core Web Vitals)
- Sitemap confirmed correct with locale alternates — no changes needed
- prefers-reduced-motion guard in place — accessibility requirement met

---
*Phase: 05-polish*
*Completed: 2026-02-25*
