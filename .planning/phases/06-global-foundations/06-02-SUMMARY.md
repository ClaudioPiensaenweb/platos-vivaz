---
phase: 06-global-foundations
plan: 02
subsystem: ui
tags: [css, typography, i18n, tailwind, next-intl]

# Dependency graph
requires:
  - phase: 05-quality-audit
    provides: "Verified build and page structure — heading elements confirmed in DOM"
provides:
  - "Global h1-h6 CSS rule with text-transform: uppercase and text-wrap: balance"
  - "Grammatically correct German privacy consent string"
affects:
  - 07-home-redesign
  - 08-products-page
  - 09-technology-about-pages
  - 10-vivaz-range-page

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Global heading style via CSS cascade (not per-component Tailwind classes)"
    - "text-wrap: balance on headings to prevent orphan words at narrow viewports"

key-files:
  created: []
  modified:
    - frontend/src/app/globals.css
    - frontend/src/messages/de.json

key-decisions:
  - "Apply text-transform: uppercase at CSS level (idempotent with existing per-component uppercase Tailwind classes)"
  - "Apply text-wrap: balance at CSS level (Chrome 114+, Firefox 121+, Safari 17.5+ support)"
  - "Do NOT remove existing uppercase Tailwind classes from components — they are harmless documentation of intent"
  - "German privacyConsent fixed to work with link-appended rendering pattern"

patterns-established:
  - "Heading styles established globally in globals.css — future pages inherit automatically"

requirements-completed:
  - TYPO-01
  - TYPO-02
  - TYPO-03

# Metrics
duration: 3min
completed: 2026-02-27
---

# Phase 6 Plan 02: Global Typography Foundations Summary

**Global h1-h6 CSS rule enforcing uppercase and balanced line-wrapping, plus German grammar fix in privacy consent**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-27T09:41:52Z
- **Completed:** 2026-02-27T09:44:52Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Added `text-transform: uppercase` and `text-wrap: balance` to the global `h1, h2, h3, h4, h5, h6` rule in `globals.css` — all current and future headings render uppercase with balanced line breaks automatically
- Reviewed all 4 locale files (es, en, fr, de) for grammar, spelling, punctuation, and consistency — Spanish, English, and French are error-free
- Fixed a genuine grammar error in `de.json` where the privacy consent string had a dangling German article ("die") separated from its noun by the rest of the clause

## Task Commits

Each task was committed atomically:

1. **Task 1: Add uppercase and text-wrap balance to global heading rule** - `bdb6939` (feat)
2. **Task 2: Spanish grammar review and corrections across all locale files** - `5d705db` (fix)

**Plan metadata:** (see final commit below)

## Files Created/Modified

- `frontend/src/app/globals.css` - Extended h1-h6 rule with `text-transform: uppercase` and `text-wrap: balance`
- `frontend/src/messages/de.json` - Fixed `contact.privacyConsent` grammar: "Ich habe die gelesen und stimme ihr zu" → "Ich habe gelesen und akzeptiere die"

## Decisions Made

- CSS-level uppercase is idempotent with Tailwind `uppercase` class — no per-component changes needed and no existing classes removed
- `text-wrap: balance` has broad modern browser support (Chrome 114+, Firefox 121+, Safari 17.5+) — safe to apply globally
- German privacy consent rephrased to work with the component's link-appended rendering pattern (privacyConsent text + link at end) while remaining grammatically correct
- "HAP" in Spanish strings is the correct Spanish-language acronym for "Hidrocarburos Aromáticos Policíclicos" — preserved as-is; "PAH" is the brand abbreviation used in product specs — both are correct where they appear
- No style-only changes made to any locale file — only genuine grammar errors corrected

## Deviations from Plan

None — plan executed exactly as written. The German grammar fix was part of the planned grammar review scope (Task 2).

## Issues Encountered

- Stale `.next/lock` file from a previous build process blocked initial build run — removed stale lock file and retried successfully (no code changes needed)

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All headings site-wide will automatically render uppercase and with balanced wrapping — Phases 7-10 can use heading elements without worrying about per-page typography setup
- All locale files are grammatically clean — ready for Phase 7 home page redesign which will add new translation keys
- No blockers

---
*Phase: 06-global-foundations*
*Completed: 2026-02-27*
