---
phase: 03-components
plan: 02
subsystem: ui
tags: [nextjs, react, typescript, tailwind, directus, blog, contact, geo-routing, accessibility]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: sanitize.ts, DisciplineBadge, InView, DirectusImage, ContactForm, types.ts
  - phase: 02-cms-data
    provides: assetUrl helper, BlogPost/BrandData types, directus client
  - phase: 03-01
    provides: phase component foundation and patterns

provides:
  - TechSpecGrid: PAH-prominent product spec grid (product detail pages)
  - TimelineSection: reusable horizontal/vertical milestone timeline
  - StatCard: clean value/label card primitive
  - ContactSplit: async Server Component with geo-routing (x-vivaz-market header)
  - ContactCards: Client Component with highlighted geo-matched card
  - WhatsAppFAB: accessible fixed WhatsApp floating action button
  - BlogCard: locale-aware blog listing card with image/date/category
  - BlogHero: full-width blog post hero with title overlay
  - BlogContent: sanitized HTML blog body using isomorphic-dompurify
  - CertBadgeRow: flex-wrap certification pill row

affects: [04-pages, product-detail, contact-page, blog-pages, about-page, technology-page]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "props-as-translations: Server Components receive translation strings as props, never useTranslations()"
    - "uuid-not-url: DirectusImage receives uuid prop directly, not a pre-built assetUrl() string"
    - "geo-routing-propagation: ContactSplit reads x-vivaz-market header once and passes market down as prop"
    - "client-boundary: ContactCards and WhatsAppFAB are 'use client'; ContactSplit and all blog/spec components are Server"

key-files:
  created:
    - frontend/src/components/product/TechSpecGrid.tsx
    - frontend/src/components/about/TimelineSection.tsx
    - frontend/src/components/about/StatCard.tsx
    - frontend/src/components/contact/ContactSplit.tsx
    - frontend/src/components/contact/ContactCards.tsx
    - frontend/src/components/contact/WhatsAppFAB.tsx
    - frontend/src/components/blog/BlogCard.tsx
    - frontend/src/components/blog/BlogHero.tsx
    - frontend/src/components/blog/BlogContent.tsx
    - frontend/src/components/technology/CertBadgeRow.tsx
  modified: []

key-decisions:
  - "DirectusImage takes uuid prop not full URL — BlogCard and BlogHero pass post.image UUID directly"
  - "ContactCards is a Client Component ('use client') for highlight state; ContactSplit is Server to read headers()"
  - "TimelineSection receives events array prop — content never hardcoded in component, reusable for tech and about pages"
  - "WhatsAppFAB number sanitized via replace(/[^0-9]/g,'') before building wa.me URL"
  - "PAH cell col-span-2 md:col-span-1 for visual prominence on mobile"

patterns-established:
  - "PAH color coding: 0 mg/kg-Free → nature/primary (green), <50 mg/kg → warning (amber)"
  - "Blog locale resolution: find translation by languages_code, fallback to root post fields"
  - "Geo-highlight: ring-2 ring-primary/30 bg-primary/5 for highlighted market card"

requirements-completed: [PROD-04, SUST-05, ABOUT-03]

# Metrics
duration: 5min
completed: 2026-02-25
---

# Phase 3 Plan 02: Feature Components Summary

**TechSpecGrid with PAH-prominent spec grid, geo-routed ContactSplit, accessible WhatsAppFAB, locale-aware blog components (BlogCard/BlogHero/BlogContent), and reusable TimelineSection — 10 components ready for Phase 4 page assembly**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-25T12:42:04Z
- **Completed:** 2026-02-25T12:47:00Z
- **Tasks:** 2
- **Files modified:** 10 created

## Accomplishments
- TechSpecGrid renders product specs in responsive grid with PAH level as most prominent cell (color-coded: green for 0 mg/kg Free, amber for <50 mg/kg Compliant), includes DisciplineBadge row
- ContactSplit reads x-vivaz-market header via await headers() and passes matched market to ContactCards for geo-highlight; both National and Export cards always visible
- Blog component suite: BlogCard with locale-aware translation fallback, BlogHero with full-width image overlay, BlogContent with isomorphic-dompurify sanitization before dangerouslySetInnerHTML
- WhatsAppFAB with aria-label accessibility, fixed z-50 positioning, number sanitization, and WhatsApp brand green (#25D366)
- TimelineSection props-driven for reuse across technology and about pages (events array, not hardcoded milestones)

## Task Commits

Each task was committed atomically:

1. **Task 1: TechSpecGrid, TimelineSection, StatCard** - `557c07e` (feat)
2. **Task 2: ContactSplit, ContactCards, WhatsAppFAB, blog components, CertBadgeRow** - `eabf4ba` (feat)

**Plan metadata:** *(this commit)*

## Files Created/Modified
- `frontend/src/components/product/TechSpecGrid.tsx` - PAH-prominent responsive spec grid for product detail pages
- `frontend/src/components/about/TimelineSection.tsx` - Props-driven horizontal/vertical milestone timeline with InView fade-in
- `frontend/src/components/about/StatCard.tsx` - Clean value/label stat card with optional icon
- `frontend/src/components/contact/ContactSplit.tsx` - Async Server Component: reads x-vivaz-market header, renders 50/50 form+cards grid
- `frontend/src/components/contact/ContactCards.tsx` - Client Component: two contact cards with geo-matched ring highlight
- `frontend/src/components/contact/WhatsAppFAB.tsx` - Fixed WhatsApp floating action button with aria-label and number sanitization
- `frontend/src/components/blog/BlogCard.tsx` - Locale-aware blog listing card with DirectusImage, date, category badge
- `frontend/src/components/blog/BlogHero.tsx` - Full-width blog post hero with image overlay, title, date
- `frontend/src/components/blog/BlogContent.tsx` - Sanitized HTML blog body using sanitizeHtml() from @/lib/sanitize
- `frontend/src/components/technology/CertBadgeRow.tsx` - Flex-wrap certification pill row

## Decisions Made
- **DirectusImage takes `uuid` prop not full URL**: BlogCard and BlogHero pass `post.image` UUID directly to DirectusImage, not a pre-built `assetUrl()` string — consistent with how the component was designed in Phase 1
- **ContactCards is Client Component**: ContactSplit is the Server Component boundary that reads headers(); ContactCards receives the resolved market as prop and uses it for highlight state client-side
- **TimelineSection never hardcodes milestones**: receives `events: Array<{year, title, description}>` from consuming page — Phase 4 will supply actual 1967/2001/2026 content

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed DirectusImage prop name mismatch**
- **Found during:** Task 2 (BlogCard, BlogHero)
- **Issue:** Plan spec said `src={imageUrl}` but DirectusImage component accepts `uuid` prop, not `src`. Passing a full assetUrl() string would have caused incorrect double-processing by the directus-image-loader.
- **Fix:** Removed assetUrl() calls from blog components; passed `uuid={post.image}` directly to DirectusImage
- **Files modified:** frontend/src/components/blog/BlogCard.tsx, frontend/src/components/blog/BlogHero.tsx
- **Verification:** TypeScript passes with zero errors
- **Committed in:** eabf4ba (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Necessary for correctness — assetUrl() + DirectusImage double-processing would have generated malformed image URLs. No scope creep.

## Issues Encountered
- Pre-existing ESLint warnings in SpotlightReveal.tsx and middleware.ts (out of scope, logged to deferred items). All 10 new files pass ESLint cleanly.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All Phase 3 components complete: TechSpecGrid, TimelineSection, StatCard, ContactSplit, ContactCards, WhatsAppFAB, BlogCard, BlogHero, BlogContent, CertBadgeRow
- Phase 4 can now compose full pages by importing these components with real Directus data and translations
- Phase 4 will supply actual timeline event content (1967/2001/2026 milestones) to TimelineSection
- Phase 4 will pass BrandData phone/email values to ContactSplit/ContactCards instead of default placeholders

---
*Phase: 03-components*
*Completed: 2026-02-25*
