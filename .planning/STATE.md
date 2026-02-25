# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-25)

**Core value:** Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging EU 2026 regulation as the proof point of 25 years of ecological leadership.
**Current focus:** Phase 3 - Components (In Progress)

## Current Position

Phase: 3 of 5 (Components)
Plan: 3 of 3 in current phase (Plans 01 and 02 complete)
Status: Plan 03-01 complete — MagneticButton/SpotlightReveal pointer-fine guards, MotionConfig blanket, PAHComparisonChart, ComplianceMatrix, animateCount
Last activity: 2026-02-25 — Completed 03-01 (motion safety infrastructure, PAH bar chart, compliance matrix)

Progress: [██████░░░░] 60%

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: 5 min
- Total execution time: ~0.7 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 18 min | 6 min |
| 02-cms-data | 2/3 | 6 min | 3 min |
| 03-components | 3/3 | ~17 min | 6 min |

**Recent Trend:**
- Last 5 plans: 5 min, 5 min, 8 min, 3 min, 3 min
- Trend: Stable

*Updated after each plan completion*
| Phase 01-foundation P01 | 5 | 2 tasks | 10 files |
| Phase 01-foundation P02 | 5 | 2 tasks | 12 files |
| Phase 01-foundation P03 | 8 | 2 tasks | 8 files |
| Phase 02-cms-data P01 | 3 | 2 tasks | 3 files |
| Phase 02-cms-data P02 | 3 | 3 tasks | 8 files |
| Phase 03-components P02 | 5 | 2 tasks | 10 files |
| Phase 03-components P01 | 7 | 2 tasks | 7 files |

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
Stopped at: Completed 03-01-PLAN.md — pointer-fine guards, MotionConfig blanket, PAHComparisonChart, ComplianceMatrix, animateCount
Resume file: None
