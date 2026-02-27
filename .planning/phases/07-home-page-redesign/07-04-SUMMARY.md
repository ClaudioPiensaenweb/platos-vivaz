---
phase: 07-home-page-redesign
plan: "04"
subsystem: frontend/components
tags: [component, ui, product-feature, directus, i18n]
dependency_graph:
  requires:
    - directus.ts (assetUrl helper)
    - components/ui/Container
    - components/ui/Button
    - components/ui/InView
  provides:
    - components/ui/ProductBadge (reusable badge with leaf icon + variant)
    - components/home/ProductFeature (side-by-side feature section for NATURA/ECO STAR)
  affects:
    - Home page sections (wired in 07-06)
    - 4 locale JSON files (badge copy updated)
tech_stack:
  added: []
  patterns:
    - Directus assetUrl() for CMS-managed product images via imageUuid prop
    - Alternating two-column grid layout (content left/image right for NATURA, reversed for ECO STAR)
    - InView slide-in animations for content and image columns
    - Variant-based badge styling (nature = bg-nature/20, eco = bg-accent/10)
key_files:
  created:
    - frontend/src/components/ui/ProductBadge.tsx
    - frontend/src/components/home/ProductFeature.tsx
  modified:
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json
decisions:
  - ProductBadge is a distinct component from existing Badge — uses leaf SVG icon vs check.svg, different variant colors
  - imageUuid prop defers Directus fetch to parent page.tsx (wired in 07-06), keeping ProductFeature as a pure presentational component
  - Badge text updated to material-specific copy (100% Pine Resin vs generic eco-friendly) across all 4 locales
metrics:
  duration: "6 min"
  completed: "2026-02-27"
  tasks_completed: 2
  files_modified: 6
---

# Phase 7 Plan 04: ProductBadge + ProductFeature Sections Summary

ProductBadge reusable component with leaf icon and nature/eco variant styles, plus ProductFeature component replacing ProductShowcase with Directus CMS image support via imageUuid prop, alternating two-column layout, and updated badge translations across all four locales.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create ProductBadge reusable component | 3810c20 | frontend/src/components/ui/ProductBadge.tsx |
| 2 | Create ProductFeature component replacing ProductShowcase | 61eaad0 | frontend/src/components/home/ProductFeature.tsx, 4x messages/{locale}.json |

## What Was Built

### ProductBadge (`frontend/src/components/ui/ProductBadge.tsx`)

A new reusable badge component distinct from the existing `Badge` (which uses check.svg). ProductBadge renders:
- Inline leaf SVG icon (16x16, `fill="currentColor"` inherits variant color)
- Pill shape: `rounded-full px-4 py-2`
- Uppercase text: `text-[13px] font-semibold uppercase tracking-[2px]`
- Two variants:
  - `nature`: `bg-nature/20 text-primary` (green-toned for NATURA)
  - `eco`: `bg-accent/10 text-accent` (accent-toned for ECO STAR)

### ProductFeature (`frontend/src/components/home/ProductFeature.tsx`)

Replaces `ProductShowcase` with Directus CMS image support. Key differences from old component:
- Accepts `imageUuid: string` prop instead of hardcoded `/img/` paths
- Uses `assetUrl(imageUuid, { width: 702, format: "webp" })` for Directus image URL
- `unoptimized` on next/image since Directus handles optimization
- Uses `ProductBadge` instead of old `Badge` component
- `h2` updated to `text-[28px] md:text-[36px]` responsive sizing per plan spec

Layout behavior:
- NATURA (`variant="natura"`): content column LEFT, image column RIGHT; `bg-cream` background
- ECO STAR (`variant="ecostar"`): image column LEFT, content column RIGHT; `bg-white` background
- Both use `InView` slide-in animations (content and image slide from opposite directions)

### Translation Updates

Badge keys updated to material-specific copy across all 4 locales:

| Locale | natura.badge | ecostar.badge |
|--------|-------------|---------------|
| es | 100% Resina de Pino | Eficiencia Ecologica |
| en | 100% Pine Resin | Ecological Efficiency |
| fr | 100% Resine de Pin | Efficacite Ecologique |
| de | 100% Kiefernharz | Okologische Effizienz |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `frontend/src/components/ui/ProductBadge.tsx`: EXISTS
- `frontend/src/components/home/ProductFeature.tsx`: EXISTS
- Commit 3810c20 (ProductBadge): EXISTS
- Commit 61eaad0 (ProductFeature + locale updates): EXISTS
- ESLint: 0 errors on both components
- TypeScript: 0 errors
