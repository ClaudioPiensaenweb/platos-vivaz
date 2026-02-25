# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-25)

**Core value:** Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging EU 2026 regulation as the proof point of 25 years of ecological leadership.
**Current focus:** Phase 1 - Foundation (Complete)

## Current Position

Phase: 1 of 5 (Foundation)
Plan: 3 of 3 in current phase (Phase 1 complete)
Status: Phase 1 complete — ready for Phase 2
Last activity: 2026-02-25 — Completed 01-03 (i18n completion, hreflang, sitemap)

Progress: [██░░░░░░░░] 20%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 6 min
- Total execution time: 0.3 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 18 min | 6 min |

**Recent Trend:**
- Last 5 plans: 5 min, 5 min, 8 min
- Trend: Stable

*Updated after each plan completion*
| Phase 01-foundation P01 | 5 | 2 tasks | 10 files |
| Phase 01-foundation P02 | 5 | 2 tasks | 12 files |
| Phase 01-foundation P03 | 8 | 2 tasks | 8 files |

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

### Pending Todos

None yet.

### Blockers/Concerns

- [Research flag]: @react-pdf/renderer React 19 peer dependency unverified — run `npm info @react-pdf/renderer peerDependencies` before Phase 2 PDF work. Fallback: static PDFs in Directus storage.
- [Research flag]: GDPR/cookie consent scope depends on whether analytics scripts will be deployed — confirm with client before Phase 3 vanilla-cookieconsent work.
- [Research flag]: Video hero (Phase 4) depends on whether Davide Carolis session produced video assets — confirm with client.
- [Research flag]: ISSF approval current status for NATURA must be confirmed before displaying ISSF badges on product pages.

## Session Continuity

Last session: 2026-02-25
Stopped at: Completed 01-03-PLAN.md — i18n completion, hreflang/canonical, sitemap locale-prefix fix
Resume file: None
