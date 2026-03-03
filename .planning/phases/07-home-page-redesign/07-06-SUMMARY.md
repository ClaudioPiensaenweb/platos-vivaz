---
phase: 07-home-page-redesign
plan: 06
subsystem: ui
tags: [next-intl, contact-form, server-component, tailwind, framer-motion]

# Dependency graph
requires:
  - phase: 07-home-page-redesign/07-01
    provides: HeroSection component
  - phase: 07-home-page-redesign/07-02
    provides: ProductRangeStrip component
  - phase: 07-home-page-redesign/07-03
    provides: WhyVivazGrid component
  - phase: 07-home-page-redesign/07-04
    provides: ProductFeature component
  - phase: 07-home-page-redesign/07-05
    provides: VideoReels component
provides:
  - ContactCTABanner — full-bleed dark green gradient with product photo + accent CTA
  - ContactFormSection — two-column address data + 5-field contact form
  - Assembled v2.0 home page with all 8 sections in correct order
  - All 4 locale translation files with home.contactCta and home.contactForm namespaces
affects:
  - phase 08+ (inner pages now use redesigned PageHero component)
  - contacto page (ContactFormSection replaces ContactSplit on home)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - full-bleed section with inline gradient style (no bg- class limitation)
    - ContactFormSection uses hardcoded address data + getTranslations for labels
    - PageHero redesigned with CSS gradient + rounded bottom corners + negative margin overlap

key-files:
  created:
    - frontend/src/components/home/ContactCTABanner.tsx
    - frontend/src/components/home/ContactFormSection.tsx
  modified:
    - frontend/src/app/[locale]/page.tsx
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json
    - frontend/src/components/home/HeroSection.tsx
    - frontend/src/components/home/WhyVivazGrid.tsx
    - frontend/src/components/home/ProductRangeStrip.tsx
    - frontend/src/components/home/VideoReels.tsx
    - frontend/src/components/ui/PageHero.tsx
    - frontend/src/components/ui/ProductBadge.tsx
    - frontend/src/components/layout/Navbar.tsx
    - frontend/src/components/layout/NavbarClient.tsx
    - frontend/src/app/globals.css

key-decisions:
  - "ContactCTABanner uses full-bleed photo (fill + object-cover) inside inline gradient background for richer visual impact"
  - "ContactFormSection inlines Nacional/Internacional contact data (address, phones, emails) rather than delegating to ContactCards for Figma fidelity"
  - "Navbar redesigned: transparent on home when at top, bg-primary-dark/90 backdrop-blur when scrolled, removes section-level bg colors"
  - "PageHero removes backgroundImage prop — uses CSS gradient always (simpler, faster, consistent across all inner pages)"
  - "ProductBadge uses outline/border style with checkmark icon instead of filled leaf (aligns with v2.0 design refinement)"

patterns-established:
  - "Inline gradient on section background: use style={{backgroundImage: 'linear-gradient(...)'}} for non-Tailwind gradients"
  - "Scroll-based navbar transparency: isHome + scrolled state → conditional bg class"
  - "Inner page hero: rounded bottom corners + negative margin pulls next section up for visual overlap"

requirements-completed: [HOME-09, HOME-10]

# Metrics
duration: 15min
completed: 2026-03-03
---

# Phase 7 Plan 6: Contact CTA + Form Assembly Summary

**Complete v2.0 home page assembled with ContactCTABanner (full-bleed gradient, accent CTA) and ContactFormSection (address data + 5-field form), plus Figma-fidelity redesign of Navbar, HeroSection, PageHero, and WhyVivazGrid**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-03T12:00:00Z
- **Completed:** 2026-03-03T12:19:36Z
- **Tasks:** 2 of 3 (Task 3 is human-verify checkpoint)
- **Files modified:** 14

## Accomplishments

- ContactCTABanner: dark green gradient background with full-bleed product photo left and heading + accent CTA button right
- ContactFormSection: two-column layout with hardcoded Nacional/Internacional address data left, 5-field form right
- Home page assembled with all 8 sections in order: Hero, ProductRangeStrip, WhyVivaz, ProductFeature(natura), ProductFeature(ecostar), VideoReels, ContactCTABanner, ContactFormSection
- Navbar redesigned to transparent-to-dark on scroll (home only), using solid bg-primary on inner pages
- PageHero redesigned with CSS gradient (removes backgroundImage prop) and rounded bottom corners
- Build passes: `npx next build` succeeds with 42 static/dynamic pages, no errors

## Task Commits

1. **Task 1: Create ContactCTABanner and ContactFormSection** - `ecd9185` (feat)
2. **Task 1 refinement: Improved visual design** - `c838ab1` (feat)
3. **Task 2: Assemble v2.0 home page** - `ac17a17` (feat)
4. **Home components Figma fidelity** - `f5863cf` (refactor)
5. **Navbar + globals** - `d4c1860` (refactor)
6. **PageHero + inner pages** - `5443b53` (refactor)

## Files Created/Modified

- `frontend/src/components/home/ContactCTABanner.tsx` - Dark green gradient CTA banner, full-bleed photo left, content right
- `frontend/src/components/home/ContactFormSection.tsx` - Two-column address data + ContactForm, id="contacto" anchor target
- `frontend/src/app/[locale]/page.tsx` - Assembled v2.0 home page with all 8 sections
- `frontend/src/messages/es.json` - Added home.contactCta (title/description/description2/cta) + home.contactForm namespace
- `frontend/src/messages/en.json` - Same additions in English
- `frontend/src/messages/fr.json` - Same additions in French
- `frontend/src/messages/de.json` - Same additions in German
- `frontend/src/components/home/HeroSection.tsx` - Rounded bottom corners, h-dvh, clamp sizing, remove unused CornerMark
- `frontend/src/components/home/WhyVivazGrid.tsx` - -mt-16 overlap with hero, updated image references
- `frontend/src/components/home/ProductRangeStrip.tsx` - CornerMark SVG updated to L-shape matching briefing
- `frontend/src/components/home/VideoReels.tsx` - Refined layout and placeholder card sizing
- `frontend/src/components/ui/PageHero.tsx` - CSS gradient, rounded bottom, negative margin, removes backgroundImage prop
- `frontend/src/components/ui/ProductBadge.tsx` - Outline/border style with checkmark icon
- `frontend/src/components/layout/Navbar.tsx` - Removes section-level bg-primary, transparent layout
- `frontend/src/components/layout/NavbarClient.tsx` - scrolled state for transparent→dark nav transition
- `frontend/src/app/globals.css` - body background set to #ffffff

## Decisions Made

- ContactCTABanner uses full-bleed photo (`fill` + `object-cover`) inside inline gradient background for richer visual impact vs. a contained image inside a Container
- ContactFormSection inlines Nacional/Internacional contact data rather than delegating to `ContactCards` component — matches Figma design with direct address/phone/email display
- Navbar redesigned: transparent at top on home page, becomes `bg-primary-dark/90 backdrop-blur-md` when scrolled past 50px, solid `bg-primary` on all inner pages
- PageHero removes `backgroundImage` prop entirely — uses CSS gradient always, cleaner API and faster load
- ProductBadge uses outline/border style with checkmark icon instead of filled leaf shape (v2.0 design direction)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused CornerMark component in HeroSection**
- **Found during:** Task 1 refinement
- **Issue:** `CornerMark` was defined but never used, causing ESLint `no-unused-vars` warning
- **Fix:** Removed the unused `CornerMark` function from `HeroSection.tsx`
- **Files modified:** `frontend/src/components/home/HeroSection.tsx`
- **Verification:** ESLint warning no longer appears for this file
- **Committed in:** `f5863cf`

---

**Total deviations:** 1 auto-fixed (1 bug/unused-var)
**Impact on plan:** Minor cleanup. No scope creep. All plan objectives met.

## Issues Encountered

- Working tree had uncommitted improvements from a previous partial execution of this plan (commits `ecd9185` and `ac17a17` existed but the working tree had refined versions). Committed the improvements as additional atomic commits — this is normal for iterative development.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Home page v2.0 is fully assembled and visually verified via build passing
- All 8 sections render in correct order
- ContactFormSection provides `id="contacto"` anchor target for CTA banner's `href="#contacto"`
- Task 3 (visual verification checkpoint) awaits human approval at localhost:3030
- Phase 08 (inner pages redesign) can proceed after user visual approval

---
*Phase: 07-home-page-redesign*
*Completed: 2026-03-03*
