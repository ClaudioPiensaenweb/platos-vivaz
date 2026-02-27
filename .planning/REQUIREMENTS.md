# Requirements: Vivaz Clay Targets

**Defined:** 2026-02-27
**Core Value:** Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging EU 2026 regulation as the proof point of 25 years of ecological leadership.

## v2.0 Requirements

Requirements for v2.0 Design Overhaul & Content Expansion. Each maps to roadmap phases.

### Home Page — Hero

- [ ] **HOME-01**: Hero displays forest background image with crosshair decorative elements
- [ ] **HOME-02**: Hero text reads "VIVAZ CLAY TARGETS" + "LÍDERES EN PLATOS ECOLÓGICOS" (uppercase) with subtitle and CTA button to products

### Home Page — Product Range Strip

- [ ] **HOME-03**: ProductRangeStrip shows 3 product lines: NATURA, ECO STAR, VIVAZ RANGE with product images and crosshair decorations

### Home Page — WhyVivaz

- [ ] **HOME-04**: WhyVivaz section displays "POR QUÉ VIVAZ" with 3 redesigned image cards (Calidad, Sostenibilidad, Experiencia) per design reference

### Home Page — Product Features

- [ ] **HOME-05**: NATURA side-by-side feature section with eco-friendly badge, heading, description, CTA, and close-up product image
- [ ] **HOME-06**: ECO STAR side-by-side feature section following same layout pattern

### Home Page — Videos

- [ ] **HOME-07**: Vertical video reels section (9:16 ratio) with 4 columns, play button overlays, Directus-managed content
- [ ] **HOME-08**: "VER TODOS LOS VÍDEOS" link button in section header

### Home Page — Contact CTA

- [ ] **HOME-09**: Contact CTA banner with dark green gradient background, product photo left, heading + CTA right
- [ ] **HOME-10**: Contact section with address + Nacional/Internacional data left, contact form (Nombre, Apellidos, Email, Teléfono, Mensaje) right

### Navbar

- [x] **NAV-01**: Rename "Tecnología" to "Tecnología y sostenibilidad" across all 4 locales
- [x] **NAV-02**: Combine "Noticias" and "Regulación 2026" into single "Noticias / Regulación 2026" nav link
- [x] **NAV-03**: Add Instagram icon link to navbar (right side, next to last nav item)

### Tecnología y Sostenibilidad Page

- [ ] **SOST-01**: Page restructured with expanded sustainability narrative (innovación materia prima, producción responsable, eficiencia energética, gestión residuos)
- [ ] **SOST-02**: SEO-oriented heading hierarchy with keyword-rich H1/H2 structure
- [ ] **SOST-03**: Technical information strictly maintained (pine resin since 2001, water-based paint, solar energy, emission filters)

### Regulación 2026 Page

- [ ] **REG-01**: Expanded explanatory content about EU 2025/660 regulation for shooters and clubs
- [ ] **REG-02**: Clear "what changes" section (50 mg/kg PAH limit, petroleum-based targets banned)
- [ ] **REG-03**: "Why this matters" section (environmental protection, shooter health, sustainable materials)
- [ ] **REG-04**: VIVAZ advantage highlighted (two compliant products: NATURA and ECO STAR)

### Products

- [ ] **PROD-01**: VIVAZ RANGE product line page at /productos/vivaz-range with FormatTabs, TechSpecGrid, and logistics data
- [ ] **PROD-02**: VIVAZ RANGE product data seeded in Directus (formats, specs, images)
- [ ] **PROD-03**: Disciplines info (American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60) displayed on product pages

### Typography (Global)

- [x] **TYPO-01**: All H1-H6 headings rendered in uppercase via CSS text-transform
- [x] **TYPO-02**: All headings use text-wrap: balance for even line breaks
- [x] **TYPO-03**: Spanish grammar review and corrections across all locale files

## Deferred (v2.1+)

- Distributor/shooting ground finder with map
- On-demand PDF data sheet generation
- GDPR cookie consent banner
- CI pipeline with locale key diff + Lighthouse gate
- Directus type generation from OpenAPI spec
- Quablo font subsetting for Latin ranges

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / direct sales | Vivaz sells B2B through distributors |
| User accounts / login | Corporate site, no user-facing auth |
| Live chat widget | WhatsApp FAB covers quick contact |
| Mobile app | Web-only |
| Machine/launcher products | Vivaz manufactures targets only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| HOME-01 | Phase 7 | Pending |
| HOME-02 | Phase 7 | Pending |
| HOME-03 | Phase 7 | Pending |
| HOME-04 | Phase 7 | Pending |
| HOME-05 | Phase 7 | Pending |
| HOME-06 | Phase 7 | Pending |
| HOME-07 | Phase 7 | Pending |
| HOME-08 | Phase 7 | Pending |
| HOME-09 | Phase 7 | Pending |
| HOME-10 | Phase 7 | Pending |
| NAV-01 | Phase 6 | Pending |
| NAV-02 | Phase 6 | Pending |
| NAV-03 | Phase 6 | Pending |
| SOST-01 | Phase 8 | Pending |
| SOST-02 | Phase 8 | Pending |
| SOST-03 | Phase 8 | Pending |
| REG-01 | Phase 9 | Pending |
| REG-02 | Phase 9 | Pending |
| REG-03 | Phase 9 | Pending |
| REG-04 | Phase 9 | Pending |
| PROD-01 | Phase 10 | Pending |
| PROD-02 | Phase 10 | Pending |
| PROD-03 | Phase 10 | Pending |
| TYPO-01 | Phase 6 | Complete |
| TYPO-02 | Phase 6 | Complete |
| TYPO-03 | Phase 6 | Complete |

**Coverage:**
- v2.0 requirements: 26 total
- Mapped to phases: 26
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-27*
*Last updated: 2026-02-27 — traceability complete after roadmap creation*
