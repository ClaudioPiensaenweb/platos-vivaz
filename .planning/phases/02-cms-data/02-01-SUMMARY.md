---
phase: 02-cms-data
plan: 01
subsystem: database
tags: [directus, seed, schema, pim, cms, pdf, m2m]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js + Directus stack, pim_products/pim_disciplines/sys_brand collections already created in setup-schema.js
provides:
  - setup-schema.js extended with height_mm, resin_pct, issf_approved fields on pim_products
  - setup-schema.js extended with catalog_pdf, founded_year, address fields on sys_brand + file relation
  - seed-data.js seeds all 7 products with complete technical specs (weight_g, height_mm, resin_pct, issf_approved)
  - seed-data.js seeds sys_brand singleton with full corporate/contact data
  - seed-data.js creates M2M discipline-product junction rows (22 links across 7 products)
  - seed-pdf.js uploads Catalog-min.pdf to Directus file storage and links UUID to sys_brand.catalog_pdf
affects: [02-02, 03-product-pages, 04-contact-form, 05-final]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "updateSingleton() from @directus/sdk for singleton collections (sys_brand, web_regulation)"
    - "readItems() + slug-based ID lookup for M2M junction row creation without hardcoded IDs"
    - "Node 22 built-in Blob + FormData for file uploads via uploadFiles() — no extra packages needed"

key-files:
  created:
    - backend/seed-pdf.js
  modified:
    - backend/setup-schema.js
    - backend/seed-data.js

key-decisions:
  - "Product technical specs sourced from plan data table: weight_g/height_mm/resin_pct/issf_approved per product family (NATURA 100% resin, ECO STAR 85% resin)"
  - "M2M links built via slug-based lookups (readItems with slug filter) — never hardcode Directus IDs that change between environments"
  - "seed-pdf.js uses Node 22 native Blob/FormData — no @azure/storage-blob or form-data package needed"
  - "Descriptions written in Spanish for Rabbit/Battue/EcoStarRabbit/Midi90/Mini60 — matching existing Natura Standard pattern"

patterns-established:
  - "Safe re-run pattern: safeCreateField() skips ALREADY_EXISTS — all schema scripts are idempotent"
  - "Seed order: languages → disciplines → products → disciplineLinks → brand → regulation → menus"
  - "Catalog PDF upload: readFileSync → Blob → FormData → uploadFiles → updateSingleton pattern"

requirements-completed: [PROD-07]

# Metrics
duration: 3min
completed: 2026-02-25
---

# Phase 2 Plan 1: CMS Data — Schema Fields, Complete Seed Data, and PDF Upload Scripts

**Directus schema extended with 6 new fields, all 7 products seeded with full technical specs and M2M discipline links, sys_brand singleton populated, and catalog PDF upload script created using Node 22 native FormData**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-25T04:25:39Z
- **Completed:** 2026-02-25T04:28:39Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- setup-schema.js extended: 3 new pim_products fields (height_mm, resin_pct, issf_approved) and 3 new sys_brand fields (catalog_pdf, founded_year, address) with file relation for catalog_pdf
- seed-data.js: all 7 products now include weight_g/height_mm/resin_pct/issf_approved specs; Rabbit/Battue/EcoStarRabbit/Midi90/Mini60 now have complete HTML descriptions and logistics_data
- seed-data.js: new seedBrand() function seeds sys_brand singleton with full corporate/contact data via updateSingleton()
- seed-data.js: new seedDisciplineLinks() function creates 22 M2M junction rows linking products to disciplines using slug-based ID lookups (no hardcoded IDs)
- seed-pdf.js: new script uploads Catalog-min.pdf (553KB) to Directus file storage and links returned UUID to sys_brand.catalog_pdf

## Task Commits

Each task was committed atomically:

1. **Task 1: Add schema fields and complete seed data** - `b5912dc` (feat)
2. **Task 2: Create seed-pdf.js** - `8dc0006` (feat)

## Files Created/Modified

- `backend/setup-schema.js` - Added height_mm, resin_pct, issf_approved to pim_products; added catalog_pdf, founded_year, address + file relation to sys_brand
- `backend/seed-data.js` - Complete product specs for all 7 products, seedBrand(), seedDisciplineLinks(), updated imports (updateSingleton, readItems), updated main() call order
- `backend/seed-pdf.js` - New script: reads Catalog-min.pdf, uploads via uploadFiles(), links UUID to sys_brand.catalog_pdf via updateSingleton()

## Decisions Made

- Product technical specs (weight_g, height_mm, resin_pct, issf_approved) taken from plan data table — NATURA family: 100% resin/ISSF-approved (Standard + Rabbit), ECO STAR family: 85% resin/not ISSF-approved
- M2M discipline links built with slug-based ID lookups via readItems() — environment-portable, works across dev/staging/prod Directus instances
- Node 22 built-in Blob + FormData used for PDF upload — no additional npm packages needed
- Descriptions for missing products written in Spanish matching the existing Natura Standard HTML pattern

## Deviations from Plan

None — plan executed exactly as written. The plan's product data table, function signatures, import list, and main() call order were all followed precisely.

## Issues Encountered

None — all 3 scripts pass syntax checks and all 9 plan verification checks pass.

## User Setup Required

None — scripts are ready to run against a live Directus instance. User runs: `node backend/setup-schema.js` then `node backend/seed-data.js` then `node backend/seed-pdf.js`.

## Next Phase Readiness

- All backend schema and seed scripts ready for execution against Directus
- Plan 02-02 (frontend image pipeline + contact form) can proceed in parallel — zero file conflicts
- Product pages (Phase 3) will have complete technical spec data: all 7 products with weight/height/resin/ISSF/discipline relationships
- sys_brand singleton ready with corporate data and PDF link for footer and contact components

---
*Phase: 02-cms-data*
*Completed: 2026-02-25*
