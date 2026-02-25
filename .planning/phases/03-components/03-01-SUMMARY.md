---
phase: 03-components
plan: 01
subsystem: ui
tags: [framer-motion, intersection-observer, accessibility, data-visualization, tailwind, raf]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Design tokens (CSS variables), InView component, globals.css, layout structure
  - phase: 02-cms-data
    provides: Directus types, assetUrl helper
provides:
  - Pointer-fine gated MagneticButton (plain div fallback on touch)
  - Pointer-fine gated SpotlightReveal (plain image fallback on touch)
  - MotionConfig reducedMotion="user" blanket in PageTransition
  - animateCount rAF count-up utility with ease-out cubic
  - PAHComparisonChart scroll-triggered bar chart with count-up animation
  - ComplianceMatrix accessible 3x5 table with icon+text status cells
  - warning/warning-light design tokens in globals.css
affects: [04-pages, any component using framer-motion, technology page, regulation page]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Pointer-fine lazy useState: useState(() => typeof window !== 'undefined' && matchMedia('(pointer: fine)').matches) — SSR-safe, avoids lint rule set-state-in-effect"
    - "Scroll-triggered animation: IntersectionObserver threshold 0.2, unobserve after first trigger, useReducedMotion for instant display"
    - "animateCount utility: performance.now precision, ease-out cubic 1-Math.pow(1-t,3), rAF loop"
    - "Zero-height bar: render as 4px accent line with opacity transition instead of height 0 (avoids invisible bar problem)"

key-files:
  created:
    - frontend/src/lib/animate.ts
    - frontend/src/components/technology/PAHComparisonChart.tsx
    - frontend/src/components/regulation/ComplianceMatrix.tsx
  modified:
    - frontend/src/components/ui/MagneticButton.tsx
    - frontend/src/components/ui/SpotlightReveal.tsx
    - frontend/src/components/providers/PageTransition.tsx
    - frontend/src/app/globals.css

key-decisions:
  - "Lazy useState initializer for pointer-fine detection: avoids react-hooks/set-state-in-effect lint error while staying SSR-safe (default false for server, reads matchMedia immediately on client)"
  - "animateCount with duration=1ms for reduced-motion: avoids synchronous setState in useEffect, resolves in single rAF frame"
  - "NATURA bar rendered as 4px accent line: zero-height bar is visually invisible — accent line communicates 0 mg/kg clearly"
  - "warning/warning-light tokens added to globals.css: plan referenced bg-warning/border-warning but token did not exist"
  - "ComplianceMatrix as Server Component: no interactivity needed, static data, no use client directive"

patterns-established:
  - "Pointer-fine lazy initializer: reusable pattern for all future desktop-only UI effects"
  - "translations-as-props for Client Components: PAHComparisonChart receives all text as props, no useTranslations() in client"
  - "Accessible status cells: icon (aria-hidden) + text label, never color alone for compliance status"

requirements-completed: [SUST-01, REG-04, PERF-05, DESGN-03]

# Metrics
duration: 7min
completed: 2026-02-25
---

# Phase 03 Plan 01: Motion Infrastructure and Data Visualization Components Summary

**Pointer-fine gated MagneticButton/SpotlightReveal, MotionConfig reduced-motion blanket, PAH bar chart with scroll-triggered count-up animation, and accessible compliance matrix for NATURA/ECO STAR/Traditional comparison**

## Performance

- **Duration:** 7 min
- **Started:** 2026-02-25T12:42:04Z
- **Completed:** 2026-02-25T12:48:48Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- MagneticButton and SpotlightReveal fully disabled on pointer:coarse devices using lazy useState initializer pattern — no interaction failures on mobile
- MotionConfig reducedMotion="user" added to PageTransition wrapping all framer-motion children in the app
- animateCount rAF utility with ease-out cubic precision timing
- PAHComparisonChart with IntersectionObserver scroll trigger, count-up animation for Traditional (>500) and ECO STAR (<50), EU 50 mg/kg threshold dashed line, NATURA as 4px accent line
- ComplianceMatrix Server Component with semantic HTML (scope="col"/"row"), icon+text status cells for color-blindness accessibility, horizontal scroll on mobile
- warning/warning-light tokens added to design token manifest

## Task Commits

Each task was committed atomically:

1. **Task 1: Pointer-fine guards and MotionConfig reduced-motion blanket** - `3a6aaa9` (feat)
2. **Task 2: PAHComparisonChart, ComplianceMatrix, animateCount utility** - `b1406de` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified
- `frontend/src/lib/animate.ts` - rAF count-up utility, ease-out cubic, performance.now
- `frontend/src/components/technology/PAHComparisonChart.tsx` - Client Component, scroll-triggered 3-bar chart with EU threshold line
- `frontend/src/components/regulation/ComplianceMatrix.tsx` - Server Component, 3x5 accessible table with icon+text status
- `frontend/src/components/ui/MagneticButton.tsx` - Added pointer-fine lazy initializer + dynamic change listener
- `frontend/src/components/ui/SpotlightReveal.tsx` - Added pointer-fine lazy initializer, plain image fallback on touch
- `frontend/src/components/providers/PageTransition.tsx` - Added MotionConfig reducedMotion="user" wrapper
- `frontend/src/app/globals.css` - Added --color-warning (#d97706) and --color-warning-light tokens

## Decisions Made
- **Lazy useState initializer for pointer-fine:** `useState(() => typeof window !== 'undefined' && matchMedia('(pointer: fine)').matches)` — SSR-safe AND avoids `react-hooks/set-state-in-effect` lint rule. Dynamic changes still handled via `addEventListener("change")` in `useEffect`.
- **animateCount with duration=1ms for reduced-motion:** Avoids synchronous `setState` inside `useEffect` body. Single rAF frame resolves to final value.
- **NATURA bar as 4px accent line:** Zero-height bar is invisible — renders as a thin green line at baseline with "0 mg/kg" label, making the zero PAH content visually clear.
- **warning tokens added to globals.css:** Plan referenced `border-warning` / `bg-warning` but token didn't exist. Added amber (#d97706) per project design system convention.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added warning color token to globals.css**
- **Found during:** Task 2 (PAHComparisonChart implementation)
- **Issue:** Plan specified `border-warning` and `bg-warning` CSS classes but `--color-warning` token was not defined in globals.css
- **Fix:** Added `--color-warning: #d97706` (amber) and `--color-warning-light: #fef3c7` to both `:root` and `@theme inline` blocks
- **Files modified:** `frontend/src/app/globals.css`
- **Verification:** TypeScript compiles, Tailwind classes resolve
- **Committed in:** `b1406de` (Task 2 commit)

**2. [Rule 1 - Bug] Refactored pointer-fine detection to lazy initializer**
- **Found during:** Task 2 verification (npm run lint)
- **Issue:** Original `useEffect` called `setHasFinePointer(mq.matches)` synchronously — triggered `react-hooks/set-state-in-effect` lint error
- **Fix:** Changed to lazy `useState` initializer that reads `matchMedia` at construction time; `useEffect` only registers the change listener
- **Files modified:** `frontend/src/components/ui/MagneticButton.tsx`, `frontend/src/components/ui/SpotlightReveal.tsx`
- **Verification:** `npm run lint` passes for all new/modified files
- **Committed in:** `b1406de` (Task 2 commit)

**3. [Rule 1 - Bug] Refactored PAHComparisonChart reduced-motion to use animateCount with 1ms duration**
- **Found during:** Task 2 verification (npm run lint)
- **Issue:** Synchronous `setTraditionalCount(500)` / `setEcoStarCount(49)` in `useEffect` body triggered lint rule
- **Fix:** Both reduced-motion and normal animation use `animateCount()` — duration 1ms for reduced-motion resolves in single rAF frame
- **Files modified:** `frontend/src/components/technology/PAHComparisonChart.tsx`
- **Verification:** `npm run lint` passes, `npx tsc --noEmit` passes
- **Committed in:** `b1406de` (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (1 Rule 2 missing token, 2 Rule 1 lint bugs)
**Impact on plan:** All fixes necessary for correctness, lint compliance, and complete token coverage. No scope creep.

## Issues Encountered
- Stale TypeScript `.tsbuildinfo` cache showed pre-existing errors in untracked blog components (BlogCard.tsx, BlogHero.tsx). After deleting `tsconfig.tsbuildinfo`, all errors cleared — our new files compiled cleanly.
- Pre-existing lint errors remain in NavbarClient.tsx and CountdownTimer.tsx (untracked files, out of scope per deviation rules). Logged to deferred items.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All motion infrastructure established for Phase 4 page assembly
- PAHComparisonChart and ComplianceMatrix ready to be used in technology and regulation pages
- warning color token available for all future uses
- Pattern established: pointer-fine detection via lazy useState initializer — all future desktop-only effects should follow this pattern

---
*Phase: 03-components*
*Completed: 2026-02-25*
