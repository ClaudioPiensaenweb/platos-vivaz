---
phase: 04-page-assembly
plan: 01
subsystem: ui
tags: [nextjs, react, tailwind, next-intl, directus, framer-motion, server-components]

# Dependency graph
requires:
  - phase: 03-components
    provides: ContactSplit, ContactCards, WhatsAppFAB, TimelineSection, VideoSection infrastructure
  - phase: 02-cms-data
    provides: Directus data layer, getVideos/getBrandData functions, types
  - phase: 01-foundation
    provides: PageHero, Container, Button, InView, i18n routing

provides:
  - Home page fully assembled with all sections in design order (Hero->ProductRangeStrip->WhyVivaz->NATURA->ECO STAR->VideoSection->CommitmentBanner->ContactSplit)
  - About page with TimelineSection (1967/2001/2026) and SVG icon value cards
  - Contact page with ContactSplit side-by-side card layout
  - VideoSection component — 4-card grid from Directus web_videos
  - WhatsAppFAB globally on all pages via locale layout
  - Footer redesigned as dark rounded-corner card with 4-column layout
  - Simplified ContactForm (name, apellidos, email, phone, market, message, privacy checkbox)
  - Geo-adapted HeroSection copy via x-vivaz-market header
  - All new translation keys in all 4 locales (es/en/fr/de)

affects: [04-02-products, 04-03-regulation-technology, any pages using Footer, ContactForm, or ContactSplit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ContactSplit as self-contained Server Component — fetches own translations via getTranslations, reads x-vivaz-market header; no props needed from parent
    - ContactCards layout prop — "stacked" (default) vs "side-by-side" for flexible placement
    - VideoSection empty state — returns null when videos array is empty, no skeleton needed
    - HeroSection market prop — conditional description key based on "national" | "export" market

key-files:
  created:
    - frontend/src/app/[locale]/page.tsx
    - frontend/src/components/home/VideoSection.tsx
  modified:
    - frontend/src/app/[locale]/layout.tsx
    - frontend/src/app/[locale]/sobre-vivaz/page.tsx
    - frontend/src/app/[locale]/contacto/page.tsx
    - frontend/src/components/home/HeroSection.tsx
    - frontend/src/components/layout/Footer.tsx
    - frontend/src/components/contact/ContactForm.tsx
    - frontend/src/components/contact/ContactSplit.tsx
    - frontend/src/components/contact/ContactCards.tsx
    - frontend/src/components/ui/Button.tsx
    - frontend/src/app/api/contact/route.ts
    - frontend/src/lib/directus.ts
    - frontend/src/lib/types.ts
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json

key-decisions:
  - "ContactSplit self-contained: refactored from requiring translations props to fetching via getTranslations() internally — simpler usage on both home page (no props) and contact page"
  - "ContactCards layout prop: added stacked|side-by-side layout toggle rather than restructuring ContactSplit twice"
  - "VideoSection uses window.open(_blank) for video playback — no modal needed for simplicity"
  - "Button.disabled prop added (Rule 1 auto-fix) — ContactForm privacy checkbox disables submit button"
  - "Footer converted from Client Component (useTranslations) to Server Component (getTranslations) — consistent with other layout components"
  - "About page value icons: inline SVG components (QualityIcon/InnovationIcon/SustainabilityIcon/ServiceIcon) — no external icon library dependency"

patterns-established:
  - "Self-contained section Server Components: fetch own translations, read headers() internally — parent just renders <ContactSplit />"
  - "SVG icons as local component functions — no emoji, no icon library, full design control"
  - "VideoSection: topographic CSS background using repeating-linear-gradient — no SVG asset needed"

requirements-completed: [HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-06, ABOUT-01, ABOUT-02, SUST-03, DESGN-01, DESGN-02, DESGN-04]

# Metrics
duration: 9min
completed: 2026-02-25
---

# Phase 4 Plan 01: Page Assembly (Home, About, Contact) Summary

**Home page assembled with geo-adapted hero, VideoSection (4-card Directus grid), and inline ContactSplit; About page with 1967/2001/2026 TimelineSection and SVG value icons; Contact page with side-by-side Nacional/Internacional cards; WhatsAppFAB global; Footer redesigned as dark rounded card.**

## Performance

- **Duration:** ~9 min
- **Started:** 2026-02-25T14:42:03Z
- **Completed:** 2026-02-25T14:50:31Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments

- Home page assembled with all 8 sections in design order — Hero (geo-adapted) -> ProductRangeStrip -> WhyVivazGrid -> NATURA showcase -> ECO STAR showcase -> VideoSection -> CommitmentBanner -> ContactSplit
- About page upgraded with TimelineSection (3 milestone events from translation keys) and proper SVG icon value cards replacing emoji
- Contact page rewritten to use ContactSplit with side-by-side card layout on desktop
- VideoSection new component: responsive 4-card grid with thumbnail + play overlay button, topographic CSS background, opens video_url in new tab
- WhatsAppFAB added globally in locale layout, brand number fetched from Directus with fallback
- Footer redesigned as dark rounded-corner card with 4-column layout (brand/nav/contact/social+legal)
- ContactForm simplified: removed company/interest fields, added apellidos and privacy checkbox

## Task Commits

Each task was committed atomically:

1. **Task 1: Global layout + VideoSection + Footer + ContactForm updates** - `c139c44` (feat)
2. **Task 2: Assemble Home, About, and Contact pages** - `f341200` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified

- `frontend/src/app/[locale]/page.tsx` - Home page async Server Component with full section assembly
- `frontend/src/components/home/VideoSection.tsx` - New: 4-card video grid with Directus thumbnails
- `frontend/src/app/[locale]/layout.tsx` - Added WhatsAppFAB + getBrandData for WhatsApp number
- `frontend/src/app/[locale]/sobre-vivaz/page.tsx` - Added TimelineSection + SVG value icons
- `frontend/src/app/[locale]/contacto/page.tsx` - Replaced inline content with ContactSplit
- `frontend/src/components/home/HeroSection.tsx` - Added market prop for geo-adapted copy
- `frontend/src/components/layout/Footer.tsx` - Redesigned dark rounded card, 4-column, Server Component
- `frontend/src/components/contact/ContactForm.tsx` - Simplified fields + apellidos + privacy checkbox
- `frontend/src/components/contact/ContactSplit.tsx` - Self-contained with getTranslations + cardLayout prop
- `frontend/src/components/contact/ContactCards.tsx` - Added layout prop (stacked|side-by-side)
- `frontend/src/components/ui/Button.tsx` - Added disabled prop support
- `frontend/src/app/api/contact/route.ts` - Handle apellidos field, optional company/interest
- `frontend/src/lib/directus.ts` - Added getVideos() function
- `frontend/src/lib/types.ts` - Added WebVideo interface, updated CrmLead with optional fields
- `frontend/src/messages/es.json` - Added hero.descriptionNational/Export, home.videos, footer.*, contact.apellidos/privacy, about.timeline
- `frontend/src/messages/en.json` - Same keys in English
- `frontend/src/messages/fr.json` - Same keys in French
- `frontend/src/messages/de.json` - Same keys in German

## Decisions Made

- ContactSplit refactored to be self-contained (fetches own translations internally via getTranslations) so callers don't need to pass translations props — simpler ergonomics
- ContactCards layout prop added for stacked/side-by-side toggle rather than forking the component
- Button component extended with `disabled` prop (was missing, needed for privacy checkbox gating)
- Footer converted from Client Component to Server Component — uses getTranslations from next-intl/server
- About page SVG icons implemented as inline component functions — no external icon library needed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Button component lacked `disabled` prop**
- **Found during:** Task 1 (ContactForm simplification)
- **Issue:** ContactForm used `disabled` prop on Button but Button interface didn't accept it
- **Fix:** Added `disabled?: boolean` to ButtonProps interface, applied `disabled:opacity-50 disabled:cursor-not-allowed` styles
- **Files modified:** frontend/src/components/ui/Button.tsx
- **Verification:** TypeScript compilation passes with zero errors
- **Committed in:** c139c44 (Task 1 commit)

**2. [Rule 1 - Refactor] ContactSplit required translations props but plan said "just render <ContactSplit />"**
- **Found during:** Task 2 (Home page assembly)
- **Issue:** Existing ContactSplit required translations object prop, making "just render <ContactSplit />" on the home page impossible
- **Fix:** Refactored ContactSplit to fetch its own translations via getTranslations() from next-intl/server
- **Files modified:** frontend/src/components/contact/ContactSplit.tsx
- **Verification:** TypeScript passes, no translations prop needed on home page
- **Committed in:** f341200 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 Rule 1 bug, 1 Rule 1 refactor)
**Impact on plan:** Both fixes essential for correctness. No scope creep.

## Issues Encountered

- None significant — TypeScript passed with zero new errors after all changes

## User Setup Required

None — no external service configuration required for this plan.

## Next Phase Readiness

- Home, About, Contact pages ready for visual review
- Product pages (04-02) and Regulation/Technology pages (04-03) are independent plans in same phase
- WhatsAppFAB active on all pages immediately
- VideoSection renders gracefully with empty state when Directus web_videos collection is empty

---
*Phase: 04-page-assembly*
*Completed: 2026-02-25*
