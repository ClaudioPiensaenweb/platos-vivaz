---
phase: 07-home-page-redesign
plan: "02"
subsystem: ui
tags: [next-intl, framer-motion, tailwind, i18n, home-page]

# Dependency graph
requires:
  - phase: 06-global-foundations
    provides: Global typography (uppercase H tags, text-wrap balance) applied before page work
provides:
  - ProductRangeStrip with 3 clickable product line labels linking to product pages
  - InView fade-in-up scroll animation on product range grid
  - Standardized range brand names (VIVAZ RANGE) across all 4 locales
affects:
  - 07-03-whyvivaz-grid
  - 07-04-product-feature
  - Any plan that references ProductRangeStrip or range translation namespace

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Product line labels use Link from @/i18n/navigation for locale-aware routing"
    - "InView component wraps scroll sections for consistent fade-in-up entrance"
    - "Brand names (product line names) are NOT translated — identical string in all locales"

key-files:
  created: []
  modified:
    - frontend/src/components/home/ProductRangeStrip.tsx
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json

key-decisions:
  - "VIVAZ RANGE brand name is not localized — fr and de had translated versions, corrected to 'VIVAZ RANGE'"
  - "Product label links use locale-aware Link from @/i18n/navigation, not plain <a> tags"

patterns-established:
  - "Brand names (NATURA, ECO STAR, VIVAZ RANGE) stay identical across all locales"
  - "Scroll sections wrapped in InView animation='fade-in-up' for entrance consistency"

requirements-completed:
  - HOME-03

# Metrics
duration: 2min
completed: 2026-02-27
---

# Phase 7 Plan 02: ProductRangeStrip Summary

**ProductRangeStrip updated with clickable labels linking to product pages, InView scroll animation, and VIVAZ RANGE brand name standardized across all 4 locales**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-27T00:45:00Z
- **Completed:** 2026-02-27T00:47:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Added clickable labels (Link component) to each of the 3 product lines in ProductRangeStrip, with hover:text-accent interaction feedback
- NATURA links to `/productos/natura-standard`, ECO STAR to `/productos/eco-star-standard`, VIVAZ RANGE to `/productos`
- Added InView fade-in-up animation wrapper around the product grid for scroll-triggered entrance
- Fixed fr.json and de.json where `range.vivazRange` was incorrectly translated as a common noun rather than kept as the brand name "VIVAZ RANGE"

## Task Commits

Each task was committed atomically:

1. **Task 1: Review and refine ProductRangeStrip component for v2.0 design** - `88ce343` (feat)
2. **Task 2: Verify and update range translation keys in all 4 locales** - `edeafd7` (fix)

## Files Created/Modified
- `frontend/src/components/home/ProductRangeStrip.tsx` - Added Link import, href per range, InView wrapper, label replaced with Link element
- `frontend/src/messages/fr.json` - Fixed `range.vivazRange`: "GAMME VIVAZ" -> "VIVAZ RANGE"
- `frontend/src/messages/de.json` - Fixed `range.vivazRange`: "VIVAZ SORTIMENT" -> "VIVAZ RANGE"

## Decisions Made
- VIVAZ RANGE is a brand name and should not be translated. Previous translations in fr ("GAMME VIVAZ") and de ("VIVAZ SORTIMENT") were incorrect — standardized to "VIVAZ RANGE" in all locales.
- Used locale-aware `Link` from `@/i18n/navigation` (not plain `<a>`) for product label links to ensure correct locale prefixing.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed incorrect translation of brand name in fr and de locales**
- **Found during:** Task 2 (Verify and update range translation keys)
- **Issue:** fr.json had `"vivazRange": "GAMME VIVAZ"` and de.json had `"vivazRange": "VIVAZ SORTIMENT"` — both are translations of a brand name that should be invariant
- **Fix:** Changed both to `"vivazRange": "VIVAZ RANGE"` — the canonical brand name used across all locales
- **Files modified:** `frontend/src/messages/fr.json`, `frontend/src/messages/de.json`
- **Verification:** Node.js check confirmed all 4 locales return "VIVAZ RANGE" for range.vivazRange
- **Committed in:** `edeafd7` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug: incorrect brand name localization)
**Impact on plan:** Essential correctness fix. No scope creep.

## Issues Encountered
- None - both tasks executed cleanly.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- ProductRangeStrip complete: 3-column NATURA / ECO STAR / VIVAZ RANGE with clay chip images, crosshair decorations, clickable labels, and scroll animation
- Ready for 07-03: WhyVivazGrid redesign

---
*Phase: 07-home-page-redesign*
*Completed: 2026-02-27*
