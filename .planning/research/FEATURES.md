# Feature Landscape

**Domain:** Premium B2B manufacturing corporate website — clay target manufacturer, sustainability positioning
**Project:** Vivaz Clay Targets (platosvivaz.com)
**Researched:** 2026-02-25
**Overall confidence:** HIGH (codebase audit + briefing primary sources) / MEDIUM (competitor benchmarking)

---

## Research Method

Primary sources: Full codebase audit (40+ components, 8 pages, types.ts, en.json, all page TSX),
briefing document (`briefing/vivaz textos web.md`), and `PROJECT.md`. This is a subsequent-milestone
research (site already at 8 pages). Gap analysis between what is built and what a best-in-class site
requires is the primary research output.

WebSearch and WebFetch were unavailable in this environment. Competitor analysis (Eurotarget, Laporte,
White Flyer, EJ Churchill, Coniston) reflects training knowledge and project briefing context. Confidence
is flagged per section.

---

## Context: What Is Already Built

The codebase already delivers more than most B2B manufacturer sites. Noting this upfront prevents
re-inventing what exists:

| Already Built | Confidence |
|---------------|------------|
| Hero with framer-motion animation + MagneticButton CTA | HIGH (HeroSection.tsx audited) |
| Product detail page with specs grid + logistics table | HIGH (ProductDetail.tsx audited) |
| Technology page with petroleum vs NATURA comparison | HIGH (tecnologia/page.tsx audited) |
| Regulation 2026 page with live countdown timer + timeline | HIGH (RegulationInfographic.tsx audited) |
| About page with 1967 history + 2001 pioneer narrative | HIGH (sobre-vivaz/page.tsx audited) |
| Contact form with national/export market segmentation | HIGH (CrmLead type in types.ts) |
| Geo-routing middleware (national/export market detection) | HIGH (middleware referenced in PROJECT.md) |
| SpotlightReveal interactive texture comparison | HIGH (SpotlightReveal.tsx audited) |
| Blog/news system with Directus CMS | HIGH (noticias routes + BlogPost type audited) |
| SEO endpoints: sitemap, robots, llms.txt | HIGH (PROJECT.md confirmed) |
| 4 locales (es, en, fr, de) via next-intl | HIGH (messages directory confirmed) |

**Core finding:** The infrastructure is strong. The gaps are execution quality, missing content,
missing micro-features, and communication architecture — not missing technical systems.

---

## Table Stakes

Features that must exist and work or B2B users leave, trust fails, or the site fails its conversion job.
These are not differentiators — they are entry requirements.

| Feature | Why Expected | Complexity | Current State | Priority |
|---------|--------------|------------|---------------|----------|
| All product specs visible (diameter, weight, PAH, material, color) | Distributors qualify before calling; missing specs = call competitor instead | Low | Exists in ProductDetail; needs content populated in Directus | P0 |
| Real contact data (not placeholder phone numbers) | Contact page currently shows "+34 XXX XXX XXX" (audited) — useless | Low | ContactoPage has placeholders; BrandData type has real fields | P0 |
| WhatsApp click-to-chat button | Standard in Spanish B2B; Mediterranean export markets expect it | Low | BrandData.whatsapp field exists in schema; button not built | P0 |
| All 6 product formats in Directus | American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60 — must have entries | Low | ProductRangeStrip exists; Directus data population unknown | P0 |
| Complete translations (no fallback strings) | 90%+ export; French/German buyer seeing Spanish text = abandoned session | Medium | 4 locale JSON files exist; completeness needs audit | P1 |
| EU 2026 Regulation page (fully populated) | Buyers are actively researching compliance; Vivaz must own this topic | Low | Page exists with countdown; content needs expansion | P1 |
| Mobile-responsive all 8 pages | >50% research happens on phone; broken layout = disqualified vendor | Low | Tailwind responsive utilities in use; needs QA pass | P1 |
| Core Web Vitals passing (LCP < 2.5s) | Performance affects SEO ranking and premium perception | Medium | framer-motion + Lenis + Directus images are risk areas | P1 |
| GDPR pages (Privacy, Legal Notice, Cookie Policy) | Footer links already exist; pages need content; EU requirement | Low | Footer links present (en.json audited); pages may not exist | P1 |
| No JavaScript errors / hydration issues | Briefing notes existing rendering errors — fixes before any new features | Low-Med | Known issues reported in PROJECT.md | P0 |
| Downloadable product catalog (PDF) | Standard B2B requirement; distributors forward to customers | Low | PDFs already in `/briefing/Catalog-min.pdf`; not served publicly | P1 |
| SEO metadata per page and locale | Title + description + OG unique per page; `sitemap.ts` correct | Low | Infrastructure exists; content completeness unknown | P1 |

---

## Differentiators

Features that create genuine competitive advantage for Vivaz. Grounded in actual factual advantages
that competitors cannot replicate.

### Group A: Sustainability Communication — Highest Leverage

**Context (HIGH confidence):** Eurotarget communicates sustainability better than Vivaz despite having
an inferior product. Vivaz has 0 mg/kg PAH (NATURA) — the strongest factual position in the industry.
The communication gap is the highest-ROI problem to solve on the entire site.

| Feature | Value Proposition | Complexity | Current State | Notes |
|---------|-------------------|------------|---------------|-------|
| PAH spectrum visualization | Single scannable graphic: traditional (>500) → EU limit (50) → ECO STAR (<50) → NATURA (0). Makes the regulation and Vivaz's advantage obvious in 5 seconds | Medium | Technology page has a text-list comparison (petroleum vs Vivaz columns); not a spectrum chart | Build as SVG/CSS bar chart; use InView animation; appears on regulation page AND product page |
| "Compliant since 2001" stamp / callout | Concrete proof that Vivaz's sustainability is not greenwashing; 25 years before the EU required it | Low | Timeline exists on regulation page; no visual stamp treatment | CSS badge component; use on hero, product pages, technology page |
| Sustainability narrative as homepage architecture | Sustainability is the organizing principle of the site — not a section. Every block should reinforce: "before the law required it" | Medium | WhyVivazGrid has sustainability as one of 3 pillars; needs to be the primary narrative, not equal third | Copy architecture decision; no new components needed |
| Carbon footprint and solar energy data | Proves real operational commitment beyond raw material (briefing mentions solar energy installation) | Medium | Briefing confirms solar energy + water-based paints; not on site | Requires factual numbers from client; add to Technology page |

### Group B: Product Depth — Discipline Mapping

| Feature | Value Proposition | Complexity | Current State | Notes |
|---------|-------------------|------------|---------------|-------|
| Discipline-to-product mapping | Shooters know their discipline; show them which Vivaz product to use. ISSF → NATURA; Sporting → ECO STAR | Low | DisciplineBadge component exists; not integrated on product listing/detail | Copy edit + component integration; no new API needed |
| NATURA vs ECO STAR comparison table | Distributors often want both lines; side-by-side comparison removes pre-sales qualification calls | Low | Not built | Static HTML table; fields from types.ts already defined |
| Video: target flight + smoke break | Shooters respond emotionally to "the cloud of smoke"; YouTube Short already exists in briefing | Low | Not built; YouTube URL in briefing: `youtube.com/shorts/grZ-7UL6NAE` | Single embed component; zero production cost; high emotional impact |
| Expert testimonial | "Whoever tries NATURA agrees it is the best target in the market" — briefing language | Low | Not built | One named credible quote beats ten marketing claims; requires client to confirm name/attribution |
| ISSF credential display | Hard purchasing requirement for Olympic clubs; removes qualification friction | Low | Mentioned in product range_category but not a visible badge | Badge design + copy; requires client confirmation of ISSF approval status |

### Group C: B2B Conversion Infrastructure

| Feature | Value Proposition | Complexity | Current State | Notes |
|---------|-------------------|------------|---------------|-------|
| WhatsApp button with geo-conditional routing | National → +34-618-757-580; Export → +34-606-172-746. Middleware already detects market | Low | BrandData has both numbers + whatsapp field; button not implemented | Component already available (MagneticButton wrapper); one `<a href="https://wa.me/...">` link |
| Downloadable catalog CTA on product pages | PDFs already exist; distributing them via a button removes the "email us for catalog" step | Low | PDFs in `/briefing/` not publicly served | Move PDFs to `/public/downloads/`; add Button component on product pages |
| Technical data sheet per product | Institutional shooting grounds and regulated markets require before purchase | Medium | Not built; ProductDetail has Button → contact; no document link | Requires client to provide formatted PDFs per product; Directus file upload |
| REACH compliance downloadable declaration | Enterprise distributors require traceability chain; prevents "email your REACH cert" delays | Low | REACH section on technology page; no document | Requires client to provide official REACH declaration; serves from Directus |
| Lead form email notification | Form submits to Directus CRM; client must receive email notification to act on leads | Low | CrmLead type exists; email sending not confirmed in contact route | Check `/api/contact/route.ts`; add nodemailer or resend if missing |

### Group D: Content Authority — Owning the Regulation Topic

| Feature | Value Proposition | Complexity | Current State | Notes |
|---------|-------------------|------------|---------------|-------|
| "What clubs need to do before April 2026" section | Buyers researching compliance need actionable guidance; being the authority builds trust and captures SEO | Low | Regulation page covers what the law says; does not advise buyers on action | Add a "3 steps to EU 2026 compliance" content block to regulation page |
| Direct EUR-Lex regulation link | Positions Vivaz as the transparent source; anti-greenwashing signal | Low | NOT linked in current regulation page | One `<a>` tag to official EUR-Lex URL |
| Blog: 3-5 regulation-focused articles | Long-tail SEO; capture searches like "clay target PAH 2026 compliant" from clubs | Medium | Blog infrastructure complete (Directus BlogPost + noticias routes) | Content decision: 3 high-quality articles > frequent generic posts |
| llms.txt AI SEO content update | AI-driven product discovery (ChatGPT, Perplexity) is emerging B2B channel; already implemented | Low | llms.txt exists; content may not include 2026 regulation keywords | Edit content to include PAH, EU 2025/660, NATURA, ECO STAR terms |

### Group E: Premium Brand Impression

| Feature | Value Proposition | Complexity | Current State | Notes |
|---------|-------------------|------------|---------------|-------|
| Geo-adapted hero headline | Export visitors see EU 2026 urgency; national visitors see performance narrative. Middleware already detects market | Low-Med | Geo-routing built; hero not geo-conditional | Pass `x-vivaz-market` header to hero component; conditional copy strings in en.json |
| Hero video (atmospheric, looping) | E.J. Churchill, Coniston use atmospheric video; clay crack in slow-mo creates premium emotion that static can't match | Med-High | Current hero uses static `hero-bg.png`; HeroSection.tsx audited | Requires video asset from client or Davide Carolis photography session; technical implementation is straightforward |
| Professional macro photography integration | Briefing includes Fotos Davide Carolis — appears unused in current build | Low | Current build uses placeholder images (`/img/natura-detail.png`) | Audit which briefing images are production-ready; replace placeholders in all page sections |
| Consistent copy voice across all pages | "Clean, precision-focused, not overloaded" — PROJECT.md direction | Low | Mix of Spanish and English copy found in audited components; placeholder strings visible | Full copy revision using `briefing/vivaz textos web.md` as source of truth |

---

## Anti-Features

Features to explicitly NOT build. Either out of scope, wrong for brand positioning, or actively harmful.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| E-commerce / shopping cart | Vivaz sells B2B through distributors; direct sales damages channel relationships; explicitly out of scope | Contact form → CRM lead → distributor handoff |
| User accounts / login | Zero B2B use case on public corporate site; adds auth complexity for no ROI at this stage | No authenticated access; all content public |
| Live chat widget (Intercom, Drift) | Small team cannot man a real-time chat; unanswered chat is worse than no chat | WhatsApp button (async, personal, market-appropriate) |
| Price lists visible on site | B2B pricing is volume/market/tier-customised; public pricing undermines negotiations | "Request a quote" CTA → segmented contact form |
| Distributor finder map (without data) | Building a map UI with empty or placeholder distributor data signals incompleteness | "Find a distributor: contact our export team" CTA |
| Regular product line pages (v1) | CLIENT DEFERRED; incomplete range dilutes NATURA/ECO STAR premium positioning clarity | Do not add until client confirms |
| Greenwashing-style "we care" copy | Generic sustainability language is worse than none for sophisticated B2B buyers | Every claim backed by a number: "0 mg/kg PAH" not "eco-friendly" |
| Social media feed embed | Instagram API is fragile; adds script weight; not a trust signal for B2B distributors | Static social link in footer; no live feed |
| Heavy animation gating product information | Animations must enhance, not block; requiring scroll-play to see product specs loses distributors | Animation as accent (InView transitions); specs always visible |
| Machine / launcher product pages | Vivaz manufactures targets only; adding launchers creates positioning confusion with Laporte | Stay focused; mention launcher compatibility in product copy only |
| Full blog content calendar | Abandoned blog (last post 18 months ago) is worse than no blog | 3-5 high-quality annual posts on regulation + product launches |

---

## Feature Dependencies

```
P0: Fix rendering errors → all other features
P0: Real contact data in BrandData → contact page + WhatsApp button
P0: Directus product entries (all 6 formats) → product list + product detail pages

P1: PAH spectrum visualization → Regulation page + Product pages
P1: WhatsApp button → Contact page + floating CTA (uses BrandData.whatsapp already in schema)
P1: Downloadable catalog → PDFs moved to /public/downloads/ → Button on product pages
P1: Video embed → YouTube URL already in briefing → Home + Product page component
P1: Expert testimonial → client confirmation → About or Home page

P2: Technical data sheets → client provides PDFs → Directus file upload → product detail
P2: REACH declaration → client provides document → Technology page download link
P2: ISSF credential → client confirms status → product page badge
P2: Blog articles → editorial decision → 3-5 posts → noticias Directus entries
P2: Carbon footprint data → client provides numbers → Technology page section

BLOCKED ON CLIENT:
- Technical data sheets (PDFs must be created)
- REACH declaration (official document required)
- ISSF approval status (confirmation required)
- Carbon footprint numbers (factual data required)
- Expert testimonial name/attribution (outreach required)
- Video asset (Davide Carolis shoot or existing footage)
```

---

## MVP Recommendation (Current Milestone)

### Must Ship Now (P0 — table stakes gaps in existing build)

1. **Real contact data** — Replace "+34 XXX XXX XXX" placeholders with actual numbers from briefing (+34-618-757-580 national, +34-606-172-746 export, `export@platosvivaz.com`)
2. **WhatsApp button** — BrandData schema ready; one `<a href="https://wa.me/...">` component; add to contact page and floating position
3. **All 6 product formats in Directus** — Content entry, not development
4. **Fix rendering/loading errors** — Diagnosed before any new feature work
5. **GDPR pages** — Privacy Policy, Legal Notice, Cookie Policy; footer links exist but pages may not

### High ROI, Low Effort (P1 differentiators)

6. **YouTube video embed** — URL exists in briefing; one embed component; emotional impact exceeds development cost
7. **"Compliant since 2001" badge treatment** — CSS only; major sustainability communication improvement
8. **Downloadable catalog** — Move existing PDFs to `/public/downloads/`; add Button component; zero new development
9. **PAH spectrum visualization** — SVG/CSS chart; most important single graphic missing from site
10. **Geo-adapted hero copy** — Middleware built; conditional strings in en.json; low implementation cost

### Defer Until Client Provides Assets (P2)

- Technical data sheets (client must produce)
- REACH declaration PDF (client must provide)
- ISSF credentials (client must confirm)
- Video hero (client must provide footage or commission)
- Expert testimonial (client must source attribution)
- Blog articles (editorial effort required)

---

## Confidence Assessment

| Area | Confidence | Source |
|------|------------|--------|
| What is built (current state) | HIGH | Direct codebase audit of all 40+ components and 8 page routes |
| Table stakes gaps | HIGH | Audited contact page with placeholder phones; confirmed missing WhatsApp; confirmed PDFs not served |
| Competitor benchmarking | MEDIUM | Training knowledge + project briefing context; no live site access in this session |
| Sustainability differentiator priority | HIGH | PROJECT.md explicitly states Eurotarget communicates sustainability better; briefing confirms factual position |
| B2B manufacturing feature conventions | MEDIUM | Training knowledge; standard industry patterns |
| Client-blocked features | HIGH | Clearly identified from briefing vs codebase gap analysis |

---

## Sources

**PRIMARY (direct audit):**
- `/frontend/src/lib/types.ts` — Directus schema; confirms BrandData, CrmLead, LogisticsData fields
- `/frontend/src/messages/en.json` — All translation strings; confirms what content is planned
- `/frontend/src/app/[locale]/contacto/page.tsx` — Confirmed placeholder phone numbers
- `/frontend/src/app/[locale]/tecnologia/page.tsx` — Confirmed petroleum/Vivaz comparison exists
- `/frontend/src/components/regulation/RegulationInfographic.tsx` — Confirmed countdown timer + timeline
- `/frontend/src/components/product/ProductDetail.tsx` — Confirmed specs grid + logistics table
- `/frontend/src/app/[locale]/page.tsx` — Home page component structure
- `/.planning/PROJECT.md` — Requirements, market context, competitive gaps, constraints

**PRIMARY (briefing):**
- `/briefing/vivaz textos web.md` — Web copy including YouTube URL, contact numbers, PAH data, product specs
- `briefing/` asset directory — Confirmed Davide Carolis photos + v2 assets + existing PDF catalogs

**MEDIUM confidence (training knowledge):**
- Eurotarget/Laporte/White Flyer feature set comparison
- EJ Churchill / Coniston premium shooting brand patterns
- B2B manufacturing corporate website conventions
