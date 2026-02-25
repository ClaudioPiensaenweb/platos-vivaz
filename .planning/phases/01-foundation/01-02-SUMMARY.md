---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [next-intl, tailwind, lenis, server-components, i18n]

# Dependency graph
requires:
  - phase: 01-foundation-plan-01
    provides: design token manifest (bg-danger, bg-success, etc.) used in RegulationContent

provides:
  - PageHero shared Server Component replacing 5 duplicated hero patterns
  - RegulationContent Server Component with translations-as-props pattern
  - Lenis ScrollToTop on route change preventing scroll position conflicts

affects: [04-page-assembly, 02-cms-integration, regulation page content]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Shared PageHero: single Server Component encapsulates hero markup across all inner pages"
    - "Translations-as-props: Server page uses getTranslations, passes object to child component — no useTranslations in non-client components"
    - "Lenis ScrollToTop: useLenis() + usePathname() effect resets scroll position on every route change"

key-files:
  created:
    - frontend/src/components/ui/PageHero.tsx
    - frontend/src/components/regulation/RegulationContent.tsx
  modified:
    - frontend/src/app/[locale]/sobre-vivaz/page.tsx
    - frontend/src/app/[locale]/tecnologia/page.tsx
    - frontend/src/app/[locale]/contacto/page.tsx
    - frontend/src/app/[locale]/productos/page.tsx
    - frontend/src/app/[locale]/regulacion-2026/page.tsx
    - frontend/src/components/providers/SmoothScroll.tsx
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json

key-decisions:
  - "Delete RegulationInfographic.tsx rather than keep as deprecated — clean break avoids confusion with new RegulationContent.tsx"
  - "Add 16 regulation translation keys immediately to all 4 locale files rather than using t.has() fallbacks — cleaner than conditional chains, Plan 01-03 will finalize translations"
  - "RegulationContent uses bg-danger/text-danger token classes (not raw red-*) matching design token manifest from Plan 01-01"

patterns-established:
  - "PageHero pattern: all inner pages use <PageHero title subtitle backgroundImage backgroundOpacity minHeight minHeightLg> — no duplicated hero markup"
  - "Server Component translations pattern: page.tsx calls getTranslations, builds translations object, passes as props to content component"

requirements-completed: [FOUND-05, FOUND-06, FOUND-07]

# Metrics
duration: 5min
completed: 2026-02-25
---

# Phase 1 Plan 02: Component Extraction Summary

**PageHero shared Server Component eliminates 5 duplicated hero patterns; RegulationContent fixes Server/Client hydration split by passing translations as props; Lenis resets scroll position on route change via ScrollToTop helper.**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-25T10:32:01Z
- **Completed:** 2026-02-25T10:37:40Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- Created `PageHero.tsx` as a reusable Server Component replacing 5 duplicated hero sections (sobre-vivaz, tecnologia, contacto, productos, regulacion-2026)
- Created `RegulationContent.tsx` as a Server Component with translations received as props — eliminates `useTranslations` usage in a non-client component, fixing the hydration error
- Added `ScrollToTop` helper inside `SmoothScroll.tsx` — Lenis now resets scroll position to 0 (immediate) on every route change via `usePathname` + `useLenis` effect
- Added 16 new regulation translation keys to all 4 locale files (es, en, fr, de) covering timeline, info cards, and CTA content

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract PageHero shared component and refactor 5 pages** - `20709e1` (feat)
2. **Task 2: Refactor RegulationInfographic Server/Client split and verify Lenis scroll** - `508aa3f` + `55694ba` (absorbed by parallel Plan 01-01 execution)

**Plan metadata:** (see final docs commit)

## Files Created/Modified

- `frontend/src/components/ui/PageHero.tsx` - Shared hero Server Component with configurable title, subtitle, background image/opacity, and min-height props; accepts children for extras like CountdownTimer
- `frontend/src/components/regulation/RegulationContent.tsx` - Server Component rendering full regulation page content (hero via PageHero, timeline, info cards, CTA); receives all translated strings as a `translations` prop object; uses `bg-danger`/`text-danger` token classes
- `frontend/src/components/providers/SmoothScroll.tsx` - Added `ScrollToTop` inner component using `useLenis()` + `usePathname()` effect to call `lenis.scrollTo(0, { immediate: true })` on route change
- `frontend/src/app/[locale]/sobre-vivaz/page.tsx` - Hero replaced with `<PageHero>`
- `frontend/src/app/[locale]/tecnologia/page.tsx` - Hero replaced with `<PageHero>`
- `frontend/src/app/[locale]/contacto/page.tsx` - Hero replaced with `<PageHero>`
- `frontend/src/app/[locale]/productos/page.tsx` - Hero replaced with `<PageHero>`; unused `Image` import removed
- `frontend/src/app/[locale]/regulacion-2026/page.tsx` - Imports `RegulationContent`, builds `translations` object via `getTranslations`, passes as props
- `frontend/src/messages/es.json` - Added 16 regulation translation keys
- `frontend/src/messages/en.json` - Added 16 regulation translation keys
- `frontend/src/messages/fr.json` - Added 16 regulation translation keys
- `frontend/src/messages/de.json` - Added 16 regulation translation keys

## Decisions Made

- **Delete RegulationInfographic.tsx** rather than keeping it as a deprecated file — the component was never committed to git (it was untracked), so deletion is safe and avoids confusion with the new `RegulationContent.tsx`
- **Add translation keys immediately** to all locale files rather than using `t.has()` fallback patterns — cleaner code, avoids conditional chains; Plan 01-03 will replace placeholder content with finalized marketing copy
- **bg-danger / text-danger** token classes used in RegulationContent for the 2026 enforcement visual (instead of raw `red-500`/`red-600`) — consistent with design token manifest established in Plan 01-01

## Deviations from Plan

None — plan executed exactly as written. Plan 01-01 (running in parallel, Wave 1) committed the Task 2 files before this plan's Task 2 execution, meaning the changes merged cleanly with zero conflicts.

## Issues Encountered

**Parallel execution merge:** Plan 01-01 ran concurrently and committed `RegulationContent.tsx`, `SmoothScroll.tsx`, locale files, and `regulacion-2026/page.tsx` before Task 2 of this plan ran. The commit `55694ba` (01-01: lock design token manifest) already captured the Task 2 deliverables. No conflicts — both plans converged on the same intended output. Task 1 commit `20709e1` (this plan) captures the PageHero extraction.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 5 inner pages now use the shared `PageHero` component — Phase 4 page assembly can update hero content by modifying props only
- `RegulationContent` Server Component pattern is the template for Phase 2 CMS-driven page components (pass Directus data as props, keep components server-only)
- Lenis scroll conflicts resolved — navigation is clean across all routes

---
*Phase: 01-foundation*
*Completed: 2026-02-25*

## Self-Check: PASSED

- FOUND: `frontend/src/components/ui/PageHero.tsx`
- FOUND: `frontend/src/components/regulation/RegulationContent.tsx`
- CONFIRMED: `frontend/src/components/regulation/RegulationInfographic.tsx` deleted
- FOUND: `.planning/phases/01-foundation/01-02-SUMMARY.md`
- FOUND: commit `20709e1` (Task 1: PageHero extraction)
