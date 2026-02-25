# Vivaz Clay Targets — platosvivaz.com

## What This Is

Website for Vivaz Clay Targets (Platos Vivaz), a Spanish manufacturer of ecological clay targets for shooting sports founded in 1967. The site positions Vivaz as the European leader in quality and sustainability — the first company to use pine resin (2001) instead of petroleum-based materials. Two product lines: NATURA (premium, 0 mg/kg PAH) and ECO STAR (high performance, <50 mg/kg PAH). Target audiences: shooters, shooting grounds, distributors, and hunters across international markets (90%+ export).

## Core Value

Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging the EU 2026 regulation (EU 2025/660) as the proof point that Vivaz has been ahead of the industry for 25 years.

## Requirements

### Validated

Existing codebase already delivers:

- ✓ Next.js 16 + React 19 + TypeScript + Tailwind v4 + framer-motion stack — existing
- ✓ Directus 11 CMS backend with product, blog, regulation, brand, leads collections — existing
- ✓ Multi-language support (es, en, fr, de) via next-intl with localePrefix "as-needed" — existing
- ✓ Docker Compose deployment (PostgreSQL + Directus + Next.js + Nginx proxy) — existing
- ✓ 8 page routes: Home, Productos (list + detail), Tecnologia, Sobre Vivaz, Noticias (list + detail), Contacto, Regulacion 2026 — existing
- ✓ Agency-grade UI components: SpotlightReveal, MagneticButton, MotionImage, InView, SmoothScroll, PageTransition — existing
- ✓ Contact form API with CRM lead storage in Directus — existing
- ✓ SEO endpoints: sitemap.ts, robots.ts, llms.txt — existing
- ✓ Quablo (heading) + Manrope (body) typography system — existing
- ✓ Geo-routing middleware (national/export market detection) — existing

### Active

- [ ] Comprehensive design and copy revision across all pages (changed direction since initial build)
- [ ] Home page overhaul: hero video/landscape + Natura visualization, "Why Vivaz" pillars (Quality, Sustainability, Performance), CTA for Natura/ECO STAR
- [ ] Product pages: NATURA as premium flagship (100% pine resin, 0% PAH, ISSF disciplines), ECO STAR as efficient choice (Sporting disciplines, <50 mg/kg PAH)
- [ ] Full product range display: American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60 formats
- [ ] Technology & Sustainability page: pine resin technical explanation, visual comparison vs traditional targets, carbon footprint data, REACH traceability
- [ ] About Vivaz: innovation history since 1967, factory, team, values
- [ ] Regulation 2026 page: EU 2025/660 explainer with infographic, PAH limits (0.005%), timeline, link to EU commission, Vivaz's 25-year head start
- [ ] News/Blog section fully functional with Directus content
- [ ] Contact page: forms + WhatsApp button, split national (+34-618-757-580) and international (+34-606-172-746) contacts
- [ ] Product technical data sheets and certificates accessible
- [ ] Logistics table for product range
- [ ] Design that conveys precision, innovation, reliability — clean, not overloaded
- [ ] Content from briefing document (`briefing/vivaz textos web.md`) integrated across all pages
- [ ] Fix loading errors and rendering issues from initial build

### Out of Scope

- Regular product line — deferred, to be confirmed later
- E-commerce / direct sales — Vivaz sells B2B through distributors
- User accounts / login system — not needed for corporate site
- Machine/launcher products — Vivaz manufactures targets only (unlike competitor Laporte)
- Mobile app — web-only

## Context

### Market Position
- 4 European manufacturers cover 95% of world demand (excl. USA): Eurotarget (Italy), Laporte (France), Vivaz & Corsivia (Spain)
- Vivaz has the best quality and supply consistency, confirmed by shooters
- Eurotarget communicates sustainability better despite inferior product
- Laporte leverages machine+target positioning but unstable eco supply
- Vivaz's historical deficit: communication and web presence

### 2026 Regulation Opportunity
- EU 2025/660: from April 2026, clay targets cannot contain >0.005% PAH (50 mg/kg sum of 18 PAH types)
- Petroleum-based binder targets will be illegal in EU
- Industry faces cost increases and material sourcing challenges
- Vivaz is uniquely positioned: 25 years of ecological production experience
- Two compliant products ready: NATURA (0 mg/kg PAH) and ECO STAR (<50 mg/kg PAH)

### Reference Sites (design inspiration)
- E.J. Churchill Shooting Ground (ejchurchill.com)
- Coniston Shooting Ground (conistonshootingground.co.uk)
- White Flyer (whiteflyer.com)

### Existing Codebase State
- Brownfield: All 8 routes built with 40+ components
- Design direction changed since initial build — needs comprehensive refresh
- Copy needs updating to match briefing document
- Some rendering/loading issues reported
- Tech stack is solid and should be preserved

### Briefing Assets Available
- `briefing/vivaz textos web.md` — Complete web copy (all sections, all languages base)
- `briefing/IMG/` — Product photos, crash details, branding, generated images
- `briefing/v2/` — Updated assets (hero header, target SVGs, range image, brand mark)
- `briefing/Quablo Complete Desktop/` — Full Quablo font family (already integrated)
- `briefing/Fotos Davide Carolis/` — Professional photography
- `briefing/Platos Vivaz PW.fig` — Figma design file

## Constraints

- **Tech Stack**: Next.js 16 + React 19 + Directus 11 + Tailwind v4 — already built, preserve
- **Languages**: es, en, fr, de — all pages must support 4 locales via next-intl
- **Products**: Only NATURA and ECO STAR in v1 (no Regular)
- **CMS**: All dynamic content (products, blog, regulation data) served from Directus
- **Hosting**: Docker Compose stack behind Nginx proxy with Let's Encrypt SSL
- **Domain**: platosvivaz.com (production)
- **Design**: Clean, precision-focused, not overloaded — must convey premium quality

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Brownfield revision (not rebuild) | Solid tech foundation exists, changing direction not stack | — Pending |
| NATURA as premium flagship | 0 mg/kg PAH, best product in market per expert feedback | — Pending |
| ECO STAR as performance line | <50 mg/kg PAH, Sporting disciplines, value positioning | — Pending |
| No Regular product in v1 | Pending client confirmation | — Pending |
| Sustainability as core narrative | EU 2026 regulation validates Vivaz's 25-year strategy | — Pending |
| Bilingual contact split | National (Spain) vs International (export) with different numbers | — Pending |

---
*Last updated: 2026-02-25 after initialization*
