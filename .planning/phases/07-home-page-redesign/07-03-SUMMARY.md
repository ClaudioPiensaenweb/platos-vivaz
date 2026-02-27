---
phase: 07-home-page-redesign
plan: 03
subsystem: ui
tags: [next-intl, react, tailwind, i18n, home-page]

# Dependency graph
requires: []
provides:
  - WhyVivazGrid redesigned with 3 pillars: Calidad, Sostenibilidad, Experiencia
  - All 4 locale files updated with experience/experienceDesc keys replacing performance/performanceDesc
affects: [home-page]

# Tech tracking
tech-stack:
  added: []
  patterns: [pillar key rename pattern, aspect-ratio image wrapper, rounded-t card image]

key-files:
  created: []
  modified:
    - frontend/src/components/home/WhyVivazGrid.tsx
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json

key-decisions:
  - "Third pillar renamed from performance/RENDIMIENTO to experience/EXPERIENCIA — brand language shift from feature to heritage"
  - "Image wrapper gets aspect-[16/10] + rounded-t-[30px] for consistent card height and full top rounding"
  - "Image file why-performance.png retained — only translation key and TypeScript key renamed"

patterns-established:
  - "Pillar data array: key, descKey, image — useTranslations('whyVivaz') drives all text"
  - "Card structure: aspect-ratio image wrapper (rounded-t) + green card body (rounded-b)"

requirements-completed: [HOME-04]

# Metrics
duration: 2min
completed: 2026-02-27
---

# Phase 7 Plan 03: WhyVivazGrid Redesign Summary

**WhyVivazGrid updated to 3 heritage pillars (Calidad, Sostenibilidad, Experiencia) with aspect-ratio image tops, top-rounded card rounding, and consistent copy across 4 locales**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-27T00:24:47Z
- **Completed:** 2026-02-27T00:26:25Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Renamed third pillar from `performance` to `experience` in TypeScript component
- Added `aspect-[16/10]` to image wrapper for consistent card heights across all 3 cards
- Added `rounded-t-[30px]` to image wrapper so top corners match the card shape
- Updated all 4 locale files (es, en, fr, de) with `experience`/`experienceDesc` replacing `performance`/`performanceDesc`
- New copy emphasizes 50+ years of trajectory at world championships and shooting grounds

## Task Commits

Each task was committed atomically:

1. **Task 1: Update WhyVivazGrid component cards to match v2.0 design** - `093004f` (feat)
2. **Task 2: Update whyVivaz translation keys for "Experiencia" in all 4 locales** - `9e4e164` (feat)

**Plan metadata:** (docs commit — see final commit below)

## Files Created/Modified
- `frontend/src/components/home/WhyVivazGrid.tsx` - Renamed experience key, added aspect-[16/10] + rounded-t-[30px] to image wrapper
- `frontend/src/messages/es.json` - performance/performanceDesc -> experience/experienceDesc (EXPERIENCIA)
- `frontend/src/messages/en.json` - performance/performanceDesc -> experience/experienceDesc (EXPERIENCE)
- `frontend/src/messages/fr.json` - performance/performanceDesc -> experience/experienceDesc (EXPERIENCE)
- `frontend/src/messages/de.json` - performance/performanceDesc -> experience/experienceDesc (ERFAHRUNG)

## Decisions Made
- Third pillar renamed from "RENDIMIENTO/PERFORMANCE" to "EXPERIENCIA/EXPERIENCE/ERFAHRUNG" — aligns with brand language shift from feature description to heritage/trajectory narrative
- Image file `/img/why-performance.png` was kept as-is (only the logical key and translation were changed)
- Copy for experienceDesc emphasizes "50+ years of trajectory at world championships" — heritage angle vs. previous performance angle

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- WhyVivaz section now displays Calidad, Sostenibilidad, Experiencia with consistent aspect-ratio image cards and green bodies
- All 4 locale files ready — no leftover `performance` or `performanceDesc` keys
- Ready for Phase 7 Plan 04 (next home page section)

---
*Phase: 07-home-page-redesign*
*Completed: 2026-02-27*
