---
phase: 06-global-foundations
plan: 01
subsystem: ui
tags: [next-intl, navbar, i18n, translations]

# Dependency graph
requires: []
provides:
  - "Navbar nav.technology key uses sentence-case in Spanish (Tecnología y sostenibilidad)"
  - "Instagram icon links to real Vivaz profile in desktop and mobile navbar"
  - "Combined Noticias/Regulación 2026 nav link verified correct across all 4 locales"
affects: [07-home-page, 08-product-pages, 09-about-regulation, 10-contact]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Sentence-case for Spanish nav labels (not title-case)"]

key-files:
  created: []
  modified:
    - frontend/src/messages/es.json
    - frontend/src/components/layout/Navbar.tsx
    - frontend/src/components/layout/NavbarClient.tsx

key-decisions:
  - "Spanish nav.technology uses sentence-case: 'Tecnología y sostenibilidad' (lowercase s). Brand decision, not a title."
  - "Instagram URL confirmed as https://www.instagram.com/vivaz_claytargets/ for both desktop and mobile navbar"

patterns-established:
  - "Spanish translations use sentence-case for multi-word nav labels"

requirements-completed: [NAV-01, NAV-02, NAV-03]

# Metrics
duration: 8min
completed: 2026-02-27
---

# Phase 06 Plan 01: Global Foundations — Navbar Finalization Summary

**Spanish nav casing fixed to sentence-case, Instagram icon linked to real Vivaz profile (vivaz_claytargets), and combined Noticias/Regulación 2026 link verified across all 4 locales**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-02-27T09:35:00Z
- **Completed:** 2026-02-27T09:43:43Z
- **Tasks:** 1
- **Files modified:** 3

## Accomplishments
- Fixed `es.json` nav.technology from "Tecnología y Sostenibilidad" to "Tecnología y sostenibilidad" (brand-standard sentence-case)
- Updated desktop Navbar Instagram href from placeholder `https://instagram.com` to `https://www.instagram.com/vivaz_claytargets/`
- Updated mobile menu Instagram href from placeholder `https://instagram.com` to `https://www.instagram.com/vivaz_claytargets/`
- Confirmed en/fr/de nav.technology labels are correct for their language conventions (no changes needed)
- Confirmed nav.news combined "Noticias / Regulación 2026" link maps to `/regulacion-2026` in all 4 locales
- Build: 42 static pages generated successfully, 0 TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix nav translation casing and Instagram URL across all locales** - `42fe972` (feat)

**Plan metadata:** [docs commit — see below]

## Files Created/Modified
- `frontend/src/messages/es.json` - Fixed nav.technology casing: "Sostenibilidad" → "sostenibilidad"
- `frontend/src/components/layout/Navbar.tsx` - Updated desktop Instagram href to real Vivaz profile URL
- `frontend/src/components/layout/NavbarClient.tsx` - Updated mobile menu Instagram href to real Vivaz profile URL

## Decisions Made
- Spanish nav label uses sentence-case ("Tecnología y sostenibilidad") per brand decision in STATE.md; English/German use title-case by convention and were left unchanged
- Instagram URL is `https://www.instagram.com/vivaz_claytargets/` (trailing slash included for canonical URL)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- First `next build` run returned a transient ENOENT error for `pages-manifest.json` during page data collection; second run completed fully (42 pages, 0 errors). This is a pre-existing race condition in the local dev environment unrelated to the changes.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Navbar is fully finalized for all 4 locales — ready for all page-level work in phases 7-10
- No blockers

---
*Phase: 06-global-foundations*
*Completed: 2026-02-27*

## Self-Check: PASSED

- FOUND: frontend/src/messages/es.json
- FOUND: frontend/src/components/layout/Navbar.tsx
- FOUND: frontend/src/components/layout/NavbarClient.tsx
- FOUND: .planning/phases/06-global-foundations/06-01-SUMMARY.md
- FOUND commit: 42fe972
