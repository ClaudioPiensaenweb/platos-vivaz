---
phase: 07-home-page-redesign
plan: 01
subsystem: ui
tags: [nextjs, hero, svg, i18n, tailwind, next-image]

# Dependency graph
requires:
  - phase: 06-global-foundations
    provides: Global CSS typography (uppercase headings, text-wrap balance) applied before page work
provides:
  - Forest hero background image at frontend/public/img/hero-forest.jpg
  - Redesigned HeroSection with CrosshairHero + CornerMark SVG decorations
  - Updated hero.title translations (removed "European/Europeos") in all 4 locales
affects: [07-06-page-assembly, home-page]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Inline SVG components (CrosshairHero, CornerMark) embedded directly in TSX for zero-HTTP decorative assets
    - hidden lg:block on decorative elements for clean mobile experience

key-files:
  created:
    - frontend/public/img/hero-forest.jpg
  modified:
    - frontend/src/components/home/HeroSection.tsx
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json

key-decisions:
  - "hero.title simplified to remove 'EUROPEOS/EUROPEAN/EUROPÉENS/EUROPÄISCHE' per CONTEXT.md design reference"
  - "CrosshairHero and CornerMark SVGs inlined as TSX components, not img/public assets — zero HTTP overhead"
  - "Dark gradient overlay changed from via-black/30 to from-black/60 via-black/30 to-black/60 per plan spec"

patterns-established:
  - "Inline SVG as named TSX function: function CrosshairHero({ className }) — reusable pattern for future decorative assets"

requirements-completed: [HOME-01, HOME-02]

# Metrics
duration: 3min
completed: 2026-02-27
---

# Phase 7 Plan 01: Hero Section Redesign Summary

**Forest background hero with inline CrosshairHero + CornerMark SVG decorations, dark gradient overlay, and simplified 4-locale heading ("LÍDERES EN PLATOS ECOLÓGICOS")**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-02-27T10:24:51Z
- **Completed:** 2026-02-27T10:27:18Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Replaced static hero-bg.png + topographic overlay with briefing/v2/foto-cabecera.jpg (forest photo, 909KB)
- Replaced inline Mirilla SVG with CrosshairHero (target-hero.svg, white crosshair 39x40) and CornerMark (marca-esquina.svg, green L-shape 20x20) — 3 crosshairs and 4 corner marks, all hidden on mobile via `hidden lg:block`
- Updated hero.title across ES/EN/FR/DE to remove the "European/Europeos" qualifier per design CONTEXT.md

## Task Commits

Each task was committed atomically:

1. **Task 1: Copy forest hero image and redesign HeroSection component** - `9664629` (feat)
2. **Task 2: Update hero translation keys for all 4 locales** - `399d8e9` (feat)

**Plan metadata:** (pending final docs commit)

## Files Created/Modified

- `frontend/public/img/hero-forest.jpg` - Forest background photograph (909KB, from briefing/v2/foto-cabecera.jpg)
- `frontend/src/components/home/HeroSection.tsx` - Redesigned with CrosshairHero + CornerMark SVGs, forest bg, dark gradient overlay
- `frontend/src/messages/es.json` - hero.title: "LÍDERES EN PLATOS ECOLÓGICOS"
- `frontend/src/messages/en.json` - hero.title: "LEADERS IN ECOLOGICAL CLAY TARGETS"
- `frontend/src/messages/fr.json` - hero.title: "LEADERS DES PLATEAUX ECOLOGIQUES"
- `frontend/src/messages/de.json` - hero.title: "FUHRER BEI OKOLOGISCHEN WURFSCHEIBEN"

## Decisions Made

- CrosshairHero and CornerMark embedded as inline TSX SVG components (not img tags or public SVG files) for zero HTTP overhead on decorative assets
- 3 CrosshairHero instances positioned at left-[15%] top-[28%], right-[18%] top-[55%], left-[52%] top-[22%] for asymmetric decorative effect
- 4 CornerMark instances at four content area corners for brand identity framing

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- JSON file CRLF line ending conflict prevented direct Edit tool usage on message files after initial read — resolved by using Node.js JSON manipulation for all locale updates.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Hero section fully redesigned, ready for page assembly in plan 07-06
- forest background and SVG decorations match the briefing/v2 design direction
- All 4 locale translations consistent and verified

---
*Phase: 07-home-page-redesign*
*Completed: 2026-02-27*
