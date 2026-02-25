---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [tailwindcss, typography, dompurify, sanitization, design-tokens, security]

# Dependency graph
requires: []
provides:
  - "@tailwindcss/typography plugin activated via @plugin directive in globals.css"
  - "sanitizeHtml() utility in src/lib/sanitize.ts (isomorphic-dompurify wrapper)"
  - "All dangerouslySetInnerHTML calls wrapped in sanitizeHtml()"
  - "Design token manifest locked with success and danger color variants"
  - "Zero hardcoded hex values in JSX — all colors trace to CSS variables"
affects:
  - 01-02
  - 02-content
  - 03-seo
  - 04-video

# Tech tracking
tech-stack:
  added:
    - "@tailwindcss/typography ^0.5.19 (prose classes for Directus HTML content)"
    - "isomorphic-dompurify ^3.0.0 (server-safe XSS sanitization)"
    - "@types/dompurify (TypeScript types for dompurify)"
  patterns:
    - "Tailwind v4 @plugin directive in globals.css (NOT v3 plugins[] array)"
    - "All Directus HTML sanitized via sanitizeHtml() before dangerouslySetInnerHTML"
    - "Design tokens declared in :root + exposed via @theme inline (Tailwind v4 pattern)"

key-files:
  created:
    - "frontend/src/lib/sanitize.ts — DOMPurify wrapper with HTML allowlist"
  modified:
    - "frontend/src/app/globals.css — @plugin directive + danger/success tokens + manifest comment"
    - "frontend/src/components/product/ProductDetail.tsx — sanitizeHtml() wrapping"
    - "frontend/src/app/[locale]/noticias/[slug]/page.tsx — sanitizeHtml() wrapping"
    - "frontend/src/app/[locale]/sobre-vivaz/page.tsx — bg-[#0bb14e] -> bg-success"
    - "frontend/src/components/home/CTASection.tsx — hardcoded hex -> token classes"

key-decisions:
  - "Used isomorphic-dompurify (not DOMPurify directly) — SSR-safe, works in Next.js server components"
  - "DOMPurify allowlist restricted to safe rich-text elements only: p br strong em ul ol li h2 h3 h4 a span blockquote — no img (uses assetUrl()), no script/iframe"
  - "danger-light token uses full hex (#fef2f2) not rgba for Tailwind bg-opacity composability"
  - "RegulationInfographic.tsx referenced in plan does not exist — actual file is RegulationContent.tsx which already uses bg-danger tokens (codebase was ahead of plan)"

patterns-established:
  - "Pattern: All Directus HTML must pass through sanitizeHtml() before dangerouslySetInnerHTML"
  - "Pattern: New color values go in :root as CSS variable, then exposed in @theme inline — never hardcoded in JSX"
  - "Pattern: @plugin in globals.css for Tailwind v4 plugins (not tailwind.config.js)"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, FOUND-04]

# Metrics
duration: 5min
completed: 2026-02-25
---

# Phase 1 Plan 01: Foundation — Typography, Sanitization, Design Tokens Summary

**@tailwindcss/typography installed, all Directus HTML sanitized via isomorphic-dompurify, and design token manifest locked with zero hardcoded hex values in JSX**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-25T15:11:37Z
- **Completed:** 2026-02-25T15:16:31Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Installed @tailwindcss/typography and activated via `@plugin "@tailwindcss/typography"` directive (Tailwind v4 syntax) — prose classes now render styled typography in product descriptions and blog posts
- Created `src/lib/sanitize.ts` with isomorphic-dompurify wrapper; wrapped all `dangerouslySetInnerHTML` usages in both `ProductDetail.tsx` and the noticias slug page — no raw HTML from Directus renders unsanitized
- Added danger and success color token families to globals.css `:root` and `@theme inline`; replaced all hardcoded hex classes (`bg-[#...]`, `text-[#...]`) in JSX — grep returns 0 matches

## Task Commits

Each task was committed atomically:

1. **Task 1: Install packages, activate typography plugin, create sanitizeHtml utility** - `508aa3f` (feat)
2. **Task 2: Lock design token manifest, eliminate hardcoded hex values** - `55694ba` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `frontend/src/lib/sanitize.ts` — DOMPurify wrapper with safe rich-text HTML allowlist
- `frontend/src/app/globals.css` — @plugin directive, danger/success token family, manifest comment header
- `frontend/src/components/product/ProductDetail.tsx` — import + sanitizeHtml() on product.description
- `frontend/src/app/[locale]/noticias/[slug]/page.tsx` — import + sanitizeHtml() on post.content
- `frontend/src/app/[locale]/sobre-vivaz/page.tsx` — `bg-[#0bb14e]` -> `bg-success`
- `frontend/src/components/home/CTASection.tsx` — `bg-[#0bb14e]` -> `bg-success`, `bg-[#242e22]` -> `bg-primary-dark`

## Decisions Made

- Used `isomorphic-dompurify` (not bare `dompurify`) because it is SSR-safe and works in Next.js server components and the App Router without `window` dependency
- DOMPurify allowlist restricted to safe rich-text tags only — `img` excluded because Directus images are rendered via `assetUrl()` helper, not raw HTML
- `danger-light` token uses full hex (`#fef2f2`) not `rgba()` for better Tailwind opacity modifier composability (`bg-danger-light/50`)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing tokens] Fixed additional hardcoded hex values in CTASection.tsx**
- **Found during:** Task 2 (audit of hardcoded hex grep)
- **Issue:** Plan only listed sobre-vivaz and RegulationInfographic.tsx as files with `bg-[#...]` classes. Grep revealed CTASection.tsx also had `bg-[#0bb14e]` and `bg-[#242e22]` hardcoded hex classes — both token violations
- **Fix:** Replaced `bg-[#0bb14e]` with `bg-success` and `bg-[#242e22]` with `bg-primary-dark` in CTASection.tsx
- **Files modified:** `frontend/src/components/home/CTASection.tsx`
- **Verification:** grep returns 0 matches after fix
- **Committed in:** `55694ba` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 — missing token coverage in plan scope)
**Impact on plan:** Necessary to satisfy the plan's own done criteria of "grep for hardcoded hex values returns zero results." No scope creep.

## Issues Encountered

- **RegulationInfographic.tsx does not exist on disk.** The plan referenced `frontend/src/components/regulation/RegulationInfographic.tsx` but the actual codebase file is `RegulationContent.tsx`. The plan was written against an older codebase snapshot. The actual `RegulationContent.tsx` already uses `bg-danger` and `text-danger` token classes — it was ahead of the plan. The danger tokens added to globals.css are still required for `RegulationContent.tsx` to work correctly, so the token addition was valid and necessary.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Typography plugin active: prose classes will render styled headings, paragraphs, and lists when Directus content populates
- Sanitization foundation: all HTML from Directus passes through DOMPurify before rendering — secure baseline for all content phases
- Design token manifest locked: Phase 1-02 and all subsequent phases can use `bg-danger`, `bg-success`, and full token vocabulary without introducing new hex values
- Build passes cleanly with all 34 routes generated

---
*Phase: 01-foundation*
*Completed: 2026-02-25*
