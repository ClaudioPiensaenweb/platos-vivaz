# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-25)

**Core value:** Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging EU 2026 regulation as the proof point of 25 years of ecological leadership.
**Current focus:** Phase 5 - Polish (In Progress)

## Current Position

Phase: 5 of 5 (Polish)
Plan: 1 of 2 complete — Phase 05 In Progress
Status: Plan 05-01 complete — SEO metadata complete for all pages (sharedOpenGraph, metadataBase, OG tags on all 7 pages in 4 locales, prefers-reduced-motion CSS guard)
Last activity: 2026-02-25 — Completed 05-01 (SEO metadata + reduced-motion guard)

Progress: [█████████░] 93%

## Performance Metrics

**Velocity:**
- Total plans completed: 11
- Average duration: 6 min
- Total execution time: ~1.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 18 min | 6 min |
| 02-cms-data | 2/3 | 6 min | 3 min |
| 03-components | 3/3 | ~17 min | 6 min |
| 04-page-assembly | 3/3 | ~29 min | 10 min |

**Recent Trend:**
- Last 5 plans: 8 min, 3 min, 3 min, 9 min, 9 min
- Trend: Stable

*Updated after each plan completion*
| Phase 01-foundation P01 | 5 | 2 tasks | 10 files |
| Phase 01-foundation P02 | 5 | 2 tasks | 12 files |
| Phase 01-foundation P03 | 8 | 2 tasks | 8 files |
| Phase 02-cms-data P01 | 3 | 2 tasks | 3 files |
| Phase 02-cms-data P02 | 3 | 3 tasks | 8 files |
| Phase 03-components P02 | 5 | 2 tasks | 10 files |
| Phase 03-components P01 | 7 | 2 tasks | 7 files |
| Phase 04-page-assembly P01 | 9 | 2 tasks | 16 files |
| Phase 04-page-assembly P02 | 9 | 2 tasks | 8 files |
| Phase 04-page-assembly P03 | 11 | 2 tasks | 8 files |
| Phase 05-polish P01 | 5 | 2 tasks | 13 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Brownfield revision — preserve existing Next.js 16 + Directus 11 + Tailwind v4 stack
- [Init]: NATURA as premium flagship (0 mg/kg PAH), ECO STAR as performance line (<50 mg/kg PAH)
- [Init]: No Regular product line in v1 — pending client confirmation
- [01-01]: Used isomorphic-dompurify (not bare dompurify) — SSR-safe for Next.js App Router server components
- [01-01]: DOMPurify allowlist excludes img tag — Directus images rendered via assetUrl() helper only
- [01-01]: danger-light token uses full hex (#fef2f2) for Tailwind opacity modifier composability
- [Phase 01-foundation]: Delete RegulationInfographic.tsx and create RegulationContent.tsx — translations-as-props pattern fixes Server/Client hydration split without useTranslations in non-client components
- [Phase 01-foundation]: PageHero shared Server Component: single component replaces 5 duplicated hero sections — props-based customization (backgroundImage, opacity, minHeight)
- [Phase 01-foundation]: Lenis ScrollToTop: useLenis()+usePathname() effect calls scrollTo(0, immediate) on route change — prevents scroll position conflicts in App Router
- [01-03]: products.heroSubtitle added to all locales — brand name literal kept in message files for zero-hardcoded-string consistency
- [01-03]: Sitemap canonical uses no-prefix for Spanish, /locale/ prefix for en/fr/de — correct per localePrefix: "as-needed"
- [01-03]: x-default hreflang points to root Spanish URL in both layout metadata and sitemap
- [02-01]: M2M discipline links built via slug-based readItems() lookups — never hardcode Directus IDs across environments
- [02-01]: Node 22 native Blob + FormData used for PDF upload in seed-pdf.js — no extra npm packages needed
- [02-01]: NATURA Standard + Rabbit: issf_approved=true; all ECO STAR + Battue: issf_approved=false — spec from plan data table
- [02-02]: assetUrl() enforces format=webp and quality=80 as ALWAYS-set defaults — callers override with explicit params
- [02-02]: IMG_PRESETS.card = 600 (not 400) — retina screens need 2x pixels; 600px at 80% quality is ~50KB
- [02-02]: Resend null-check at module level — contact form degrades gracefully without RESEND_API_KEY
- [02-02]: Email in nested try/catch — email failure never blocks form success response
- [02-02]: onboarding@resend.dev default from address — works without DNS verification in dev/staging
- [02-02]: productJsonLd Spanish locale prefix = empty string — matches localePrefix: "as-needed"
- [Phase 03-components]: DirectusImage takes uuid prop not full URL — blog components pass post.image UUID directly, not assetUrl() string
- [Phase 03-components]: ContactCards is Client Component for highlight state; ContactSplit is Server Component boundary that reads await headers() for geo-routing
- [Phase 03-components]: TimelineSection receives events array prop — never hardcodes milestones; Phase 4 supplies 1967/2001/2026 content
- [03-01]: Lazy useState initializer for pointer-fine: useState(() => typeof window !== 'undefined' && matchMedia('(pointer: fine)').matches) — SSR-safe AND avoids react-hooks/set-state-in-effect lint rule
- [03-01]: animateCount with 1ms duration for reduced-motion — avoids synchronous setState in useEffect body
- [03-01]: NATURA bar as 4px accent line — zero-height bar invisible; accent line communicates 0 mg/kg clearly
- [03-01]: warning token added to globals.css — amber #d97706 for EU threshold visualizations
- [04-01]: ContactSplit self-contained Server Component — fetches own translations via getTranslations(), reads x-vivaz-market; parent just renders <ContactSplit /> with no props
- [04-01]: ContactCards layout prop — "stacked" (default) vs "side-by-side" for flexible card arrangement on different pages
- [04-01]: Footer converted from Client to Server Component — getTranslations() from next-intl/server
- [04-01]: About page SVG icons as inline component functions — no external icon library, crosshair/lightbulb/leaf/handshake
- [04-01]: VideoSection returns null on empty array — graceful empty state, no skeleton
- [04-02]: Line-level slugs [natura, eco-star] not per-SKU — one URL per product line, format variants switched client-side via useState
- [04-02]: LogisticsTable converted from useTranslations hook to props-based translations — required for use inside client component that receives server-fetched translations
- [04-02]: Catalog PDF URL built directly from DIRECTUS_PUBLIC_URL env var — assetUrl() enforces webp format which would corrupt PDF
- [04-02]: ProductCard href prop optional — defaults to /productos/[slug], overridden at listing to line-level slugs
- [Phase 04-page-assembly]: regulacion-2026/page.tsx rebuilt from scratch — dropping RegulationContent wrapper is cleaner for Phase 3 component wiring
- [Phase 04-page-assembly]: BlogContent accepts content string prop — locale-aware content selection happens in page before passing to component
- [05-01]: sharedOpenGraph pattern — single constant in metadata.ts spread into each page openGraph, overriding only title/description
- [05-01]: metadataBase: new URL(siteUrl) in layout.tsx — enables relative OG image paths to resolve as absolute HTTPS URLs for social crawlers
- [05-01]: prefers-reduced-motion guard uses !important on animation:none — overrides specificity from CSS utility class animation shorthand

### Pending Todos

None yet.

### Blockers/Concerns

- [Research flag]: GDPR/cookie consent scope depends on whether analytics scripts will be deployed — confirm with client before Phase 3 vanilla-cookieconsent work.
- [Research flag]: Video hero (Phase 4) depends on whether Davide Carolis session produced video assets — confirm with client.
- [Research flag]: ISSF approval current status for NATURA must be confirmed before displaying ISSF badges on product pages.
- [Resolved]: @react-pdf/renderer React 19 concern — resolved by using static PDFs in Directus storage (Catalog-min.pdf via seed-pdf.js). No @react-pdf/renderer needed.
- [User setup needed]: Resend API key must be configured (RESEND_API_KEY env var) and platosvivaz.com domain verified in Resend Dashboard before production email sending works.

## Session Continuity

Last session: 2026-02-25
Stopped at: Completed 05-01-PLAN.md — SEO metadata (sharedOpenGraph, metadataBase, OG tags all pages), prefers-reduced-motion guard. Phase 05 plan 1/2 complete.
Resume file: None
