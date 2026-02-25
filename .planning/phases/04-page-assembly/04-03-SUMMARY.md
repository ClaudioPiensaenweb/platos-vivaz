---
phase: 04-page-assembly
plan: 03
subsystem: pages
tags: [technology-page, regulation-page, blog-pages, phase3-components, i18n, directus]
dependency_graph:
  requires: [03-01-PLAN, 03-02-PLAN]
  provides: [tecnologia-page, regulacion-2026-page, noticias-page, noticias-slug-page]
  affects: [seo, user-experience, content-platform]
tech_stack:
  added: []
  patterns: [translations-as-props, server-component-data-fetch, locale-aware-content, generateStaticParams]
key_files:
  created: []
  modified:
    - frontend/src/app/[locale]/tecnologia/page.tsx
    - frontend/src/app/[locale]/regulacion-2026/page.tsx
    - frontend/src/app/[locale]/noticias/page.tsx
    - frontend/src/app/[locale]/noticias/[slug]/page.tsx
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json
decisions:
  - "tecnologia/page.tsx gets locale via params (not just getTranslations default) to pass locale to TimelineSection events"
  - "regulacion-2026/page.tsx rebuilt from scratch dropping RegulationContent import — direct page assembly matches Phase 3 component API without prop-drilling overhead"
  - "noticias/[slug]/page.tsx: locale-specific content from BlogPostTranslation.content takes precedence over post.content; falls back gracefully"
  - "BlogContent accepts content: string directly — BlogHero handles post+locale for the hero image/title/date overlay"
metrics:
  duration: "11 min"
  completed: "2026-02-25"
  tasks: 2
  files: 8
requirements:
  - SUST-02
  - SUST-04
  - REG-01
  - REG-02
  - REG-03
  - REG-05
  - BLOG-01
  - BLOG-02
  - BLOG-03
---

# Phase 04 Plan 03: Technology, Regulation & Blog Page Assembly Summary

Four pages assembled with Phase 3 components and real Directus data: Technology page with PAHComparisonChart + CertBadgeRow + TimelineSection, Regulation page as full EU 2025/660 explainer with ComplianceMatrix + EUR-Lex link + 25-year head start callout, Blog listing with 3-column BlogCard grid, and Blog detail with BlogHero + BlogContent and locale-aware content selection.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Technology and Regulation pages | c5f8e03 | tecnologia/page.tsx, regulacion-2026/page.tsx, all 4 locale files |
| 2 | Blog listing and detail pages | cc8e0ae | noticias/page.tsx, noticias/[slug]/page.tsx |

## What Was Built

### Technology Page (`tecnologia/page.tsx`)
- Kept: PageHero, pine resin section, manufacturing process, environmental commitment, SpotlightReveal
- Replaced: text-based petroleum vs VIVAZ comparison section -> **PAHComparisonChart** with animated bars (SUST-02)
- Added: **TimelineSection** with 1967/2001/2026 events in a dedicated white section between PAH chart and REACH
- Added: **CertBadgeRow** (REACH, ISSF, ISO 14001, EU 2025/660) inside the REACH dark section (SUST-04)
- Translation keys: `technology.pahChart.*`, `technology.resinSectionTitle/Desc`, `technology.timelineTitle`, `technology.timeline.*`

### Regulation Page (`regulacion-2026/page.tsx`)
- Structure: PageHero with CountdownTimer -> Timeline (2001/2025/2026) -> **25-Year Head Start callout** -> **ComplianceMatrix** -> **CertBadgeRow** -> **PAHComparisonChart** -> **EUR-Lex card** -> Info cards -> CTA
- The page was rebuilt from scratch (dropped RegulationContent wrapper) to cleanly wire Phase 3 components
- EUR-Lex link: `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0660` opens in new tab (REG-03)
- 25-year head start: primary-color callout section with translations (REG-05)
- Translation keys: `regulation.complianceMatrix.*`, `regulation.euDocLink/euDocSummary`, `regulation.headStart/headStartDescription`, `regulation.pahChart.*`

### Blog Listing Page (`noticias/page.tsx`)
- PageHero at top replacing bare `pt-24` container
- **BlogCard** 3-column responsive grid from `getBlogPosts()` (BLOG-01)
- `locale` prop passed to BlogCard for localized date formatting (BLOG-03)
- Empty state: `noPosts` translation key with centered body text
- `generateMetadata()`: `news.metaTitle` + `news.metaDescription` per locale (BLOG-03)
- InView scroll animation on the card grid

### Blog Detail Page (`noticias/[slug]/page.tsx`)
- **BlogHero**: full-width image + title + date overlay (BLOG-02)
- **BlogContent**: sanitized HTML body via `sanitizeHtml()` (BLOG-02)
- Back link uses `news.backToList` translation key
- `generateStaticParams()` from `getBlogPosts({ limit: 100 })`
- Locale-aware content: checks `post.translations.find(tr => tr.languages_code === locale)?.content` before falling back to `post.content` (BLOG-03)
- `generateMetadata()` also checks locale-specific translation for title

## Translation Keys Added

All 4 locale files (es, en, fr, de) received:

**technology namespace:**
- `pahChart.*` (traditional, euLimit, ecoStar, natura, euLimitLabel, noPatLabel, unit)
- `resinSectionTitle`, `resinSectionDesc`
- `timelineTitle`
- `timeline.*` (founded, foundedDesc, pioneers, pioneersDesc, regulation, regulationDesc)

**regulation namespace:**
- `complianceMatrix.*` (10 keys: product names, column headers, compliant/nonCompliant labels)
- `euDocLink`, `euDocSummary`
- `headStart`, `headStartDescription`
- `pahChart.*` (7 keys, same structure as technology.pahChart)

**news namespace:**
- `noPosts`
- `backToList`
- `metaTitle`
- `metaDescription`

## Verification

- `npx tsc --noEmit`: 0 errors (verified twice)
- Technology page: PAHComparisonChart replaces text comparison, CertBadgeRow in REACH section, TimelineSection with 3 events
- Regulation page: all 4 Phase 3 components wired in correct sequence, EUR-Lex external link present
- Blog listing: BlogCard grid from Directus with locale prop
- Blog detail: BlogHero + BlogContent, generateStaticParams, locale-aware content

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Regulation page rebuilt from scratch instead of modifying RegulationContent**
- **Found during:** Task 1
- **Issue:** RegulationContent used translations-as-props pattern but its props interface did not include ComplianceMatrix/PAHChart translations — adding them would require changing the component interface and breaking the Server/Client boundary pattern
- **Fix:** Rebuilt regulacion-2026/page.tsx as a direct Server Component page, keeping the same sections from RegulationContent but adding Phase 3 components inline. This is cleaner and matches the technology page pattern.
- **Files modified:** frontend/src/app/[locale]/regulacion-2026/page.tsx

**2. [Rule 2 - Missing] BlogContent component API: accepts content string, not post+locale**
- **Found during:** Task 2
- **Issue:** Plan said `<BlogContent post={post} locale={locale} />` but BlogContent was built in Phase 3 with `content: string` prop (not post+locale)
- **Fix:** Adapted the call: extract locale-aware content string first (`translation?.content ?? post.content ?? ""`), then pass to `<BlogContent content={content} />`
- **Files modified:** frontend/src/app/[locale]/noticias/[slug]/page.tsx

## Self-Check: PASSED

Files verified to exist:
- frontend/src/app/[locale]/tecnologia/page.tsx: FOUND
- frontend/src/app/[locale]/regulacion-2026/page.tsx: FOUND
- frontend/src/app/[locale]/noticias/page.tsx: FOUND
- frontend/src/app/[locale]/noticias/[slug]/page.tsx: FOUND

Commits verified:
- c5f8e03: FOUND (Task 1 - Technology and Regulation pages)
- cc8e0ae: FOUND (Task 2 - Blog listing and detail pages)
