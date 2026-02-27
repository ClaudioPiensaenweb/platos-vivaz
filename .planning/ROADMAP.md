# Roadmap: Vivaz Clay Targets (platosvivaz.com)

## Milestones

- ✅ **v1.0 MVP** — Phases 1-5 (shipped 2026-02-25)
- 🚧 **v2.0 Design Overhaul & Content Expansion** — Phases 6-10 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-5) — SHIPPED 2026-02-25</summary>

- [x] Phase 1: Foundation (3/3 plans) — completed 2026-02-25
- [x] Phase 2: CMS Data (2/2 plans) — completed 2026-02-25
- [x] Phase 3: Components (2/2 plans) — completed 2026-02-25
- [x] Phase 4: Page Assembly (3/3 plans) — completed 2026-02-25
- [x] Phase 5: Polish (2/2 plans) — completed 2026-02-25

See: `.planning/milestones/v1.0-ROADMAP.md` for full details.

</details>

### 🚧 v2.0 Design Overhaul & Content Expansion (In Progress)

**Milestone Goal:** Redesign the home page to match updated brand direction, expand content pages (Sostenibilidad, Regulación), add VIVAZ RANGE product line, and enforce consistent typography site-wide — page by page with plans per block.

- [ ] **Phase 6: Global Foundations** - Navbar restructure and site-wide typography applied before any page work
- [ ] **Phase 7: Home Page Redesign** - Full home page overhaul block by block (hero → products → videos → contact)
- [ ] **Phase 8: Tecnología y Sostenibilidad** - Expanded sustainability narrative and SEO heading structure
- [ ] **Phase 9: Regulación 2026** - Expanded explanatory content for shooters and clubs
- [ ] **Phase 10: Products** - VIVAZ RANGE product line page and 6-discipline info on all product pages

## Phase Details

### Phase 6: Global Foundations
**Goal**: Site-wide navigation and typography are correct on every page before individual pages are redesigned
**Depends on**: Nothing (first v2.0 phase — builds on v1.0)
**Requirements**: NAV-01, NAV-02, NAV-03, TYPO-01, TYPO-02, TYPO-03
**Success Criteria** (what must be TRUE):
  1. Navbar shows "Tecnología y sostenibilidad" in all 4 locales
  2. "Noticias / Regulación 2026" appears as a single combined nav link in all 4 locales
  3. Instagram icon link appears in the navbar on every page
  4. All H1-H6 headings across every page render uppercase
  5. All headings wrap with balanced line breaks and Spanish grammar is correct throughout
**Plans**: 2 plans

Plans:
- [x] 06-01-PLAN.md — Navbar restructure: fix translation casing, verify combined link, update Instagram URL (NAV-01, NAV-02, NAV-03)
- [ ] 06-02-PLAN.md — Global typography: uppercase + balanced headings, Spanish grammar review (TYPO-01, TYPO-02, TYPO-03)

### Phase 7: Home Page Redesign
**Goal**: Visitors land on a home page that immediately communicates Vivaz brand identity through a forest hero, three product lines, redesigned WhyVivaz cards, product feature sections, vertical video reels, and a contact CTA + form
**Depends on**: Phase 6
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09, HOME-10
**Success Criteria** (what must be TRUE):
  1. Hero displays forest background with crosshair elements, uppercase "VIVAZ CLAY TARGETS / LÍDERES EN PLATOS ECOLÓGICOS" heading, subtitle, and product CTA button
  2. ProductRangeStrip shows NATURA, ECO STAR, and VIVAZ RANGE with product images and crosshair decorations
  3. WhyVivaz section shows "POR QUÉ VIVAZ" with 3 redesigned image cards (Calidad, Sostenibilidad, Experiencia)
  4. NATURA and ECO STAR each have a side-by-side feature section with badge, heading, description, CTA, and product image
  5. Vertical video reels section shows 4 columns at 9:16 ratio with play overlays and a "VER TODOS LOS VÍDEOS" link
  6. Contact CTA banner and contact form section appear at the bottom of the home page
**Plans**: TBD

Plans:
- [ ] 07-01: Hero block (HOME-01, HOME-02)
- [ ] 07-02: ProductRangeStrip 3-line update (HOME-03)
- [ ] 07-03: WhyVivaz card redesign (HOME-04)
- [ ] 07-04: NATURA and ECO STAR feature sections (HOME-05, HOME-06)
- [ ] 07-05: Vertical video reels section (HOME-07, HOME-08)
- [ ] 07-06: Contact CTA banner and contact form section (HOME-09, HOME-10)

### Phase 8: Tecnología y Sostenibilidad
**Goal**: The Tecnología y sostenibilidad page tells a complete, SEO-optimised sustainability story that retains all v1.0 technical facts while adding narrative depth across four pillars
**Depends on**: Phase 6
**Requirements**: SOST-01, SOST-02, SOST-03
**Success Criteria** (what must be TRUE):
  1. Page covers four sustainability pillars: innovación materia prima, producción responsable, eficiencia energética, gestión residuos
  2. H1/H2 heading hierarchy is keyword-rich and SEO-oriented
  3. Technical facts are intact: pine resin since 2001, water-based paint, solar energy, emission filters
**Plans**: TBD

Plans:
- [ ] 08-01: Expanded sustainability content and SEO headings (SOST-01, SOST-02, SOST-03)

### Phase 9: Regulación 2026
**Goal**: Shooters and clubs visiting the Regulación 2026 page understand the EU 2025/660 rule, what it bans, why it matters for their health and the environment, and why Vivaz's two products are the safe choice
**Depends on**: Phase 6
**Requirements**: REG-01, REG-02, REG-03, REG-04
**Success Criteria** (what must be TRUE):
  1. Page provides expanded explanatory content about EU 2025/660 for shooters and clubs
  2. A dedicated "what changes" section explains the 50 mg/kg PAH limit and that petroleum-based targets are banned
  3. A "why this matters" section explains environmental protection, shooter health, and sustainable materials
  4. Vivaz advantage section highlights that both NATURA and ECO STAR comply
**Plans**: TBD

Plans:
- [ ] 09-01: Regulación 2026 content expansion (REG-01, REG-02, REG-03, REG-04)

### Phase 10: Products
**Goal**: Visitors can browse the VIVAZ RANGE product line at its own page and see which of the 6 shooting disciplines each product line supports
**Depends on**: Phase 6
**Requirements**: PROD-01, PROD-02, PROD-03
**Success Criteria** (what must be TRUE):
  1. /productos/vivaz-range exists and displays FormatTabs, TechSpecGrid, and logistics data
  2. VIVAZ RANGE product data (formats, specs, images) is seeded in Directus and renders correctly
  3. The 6 disciplines (American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60) appear on product pages
**Plans**: TBD

Plans:
- [ ] 10-01: VIVAZ RANGE page and Directus seed (PROD-01, PROD-02)
- [ ] 10-02: Disciplines info on product pages (PROD-03)

## Progress

**Execution Order:** Phases execute in numeric order: 6 → 7 → 8 → 9 → 10

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 3/3 | Complete | 2026-02-25 |
| 2. CMS Data | v1.0 | 2/2 | Complete | 2026-02-25 |
| 3. Components | v1.0 | 2/2 | Complete | 2026-02-25 |
| 4. Page Assembly | v1.0 | 3/3 | Complete | 2026-02-25 |
| 5. Polish | v1.0 | 2/2 | Complete | 2026-02-25 |
| 6. Global Foundations | v2.0 | 1/2 | In progress | - |
| 7. Home Page Redesign | v2.0 | 0/6 | Not started | - |
| 8. Tecnología y Sostenibilidad | v2.0 | 0/1 | Not started | - |
| 9. Regulación 2026 | v2.0 | 0/1 | Not started | - |
| 10. Products | v2.0 | 0/2 | Not started | - |

---
*Roadmap created: 2026-02-25*
*Last updated: 2026-02-27 — 06-01 complete (navbar casing, Instagram URL, combined link)*
