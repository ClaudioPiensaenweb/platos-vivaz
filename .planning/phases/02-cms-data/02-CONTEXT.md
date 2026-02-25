# Phase 2: CMS Data - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Seed Directus collections with complete product, brand, regulation, and blog data. Wire the contact form to send email notifications via Resend and save leads to Directus. Fix the image delivery pipeline to serve WebP with correct dimensions. Make the shared catalog PDF downloadable from product pages and footer.

</domain>

<decisions>
## Implementation Decisions

### Product data structure
- Full technical spec per product: PAH mg/kg, composition (resin %), weight, diameter, height, colors available, disciplines approved, ISSF status, formats (pallet/box quantities), logistics data
- Many-to-many relationship between pim_products and pim_disciplines via junction table — separate pim_disciplines collection with its own data (name, description, icon)
- Real product images available — user will upload to Directus
- sys_brand collection: Vivaz only — single brand record with factory address, contact emails, phone, social links, key stats (founded 1967, etc.)

### Image pipeline
- Use Directus /assets/ endpoint with query params via existing assetUrl() helper — no next/image optimization
- 3 standard dimension presets: Thumbnail (200px), Card (600px), Hero/Full (1200px)
- assetUrl() should enforce WebP format by default (format=webp added automatically unless caller overrides)
- All images served as WebP with quality 80
- Alt text auto-generated from product name + locale ("NATURA clay target" / "Plato NATURA") — no custom alt text field in Directus

### Contact form & email
- Email service: Resend (API key in env var)
- Form fields: Name, email, phone (optional), company/club name, discipline interest (dropdown), message — standard B2B distributor inquiry format
- Dual storage: send email notification to admin AND save to crm_leads Directus collection
- Admin gets formatted notification email, user gets "We received your message" confirmation email
- Two email templates needed: admin notification + user confirmation

### PDF data sheets
- One shared catalog PDF (Catalog-min.pdf) for both NATURA and ECO STAR — no per-product PDFs
- Upload Catalog-min.pdf to Directus file storage, link from sys_brand record
- Download button visible on product pages and in footer
- No auto-generation — static PDF only

### Claude's Discretion
- Email template design/styling
- Exact Directus collection field names and types
- crm_leads schema design
- JSON-LD structured data implementation details
- Blog post seeding content

</decisions>

<specifics>
## Specific Ideas

- The existing assetUrl() helper in src/lib/directus.ts already handles Directus image URLs — audit and enhance it rather than replacing
- Contact form already exists at /api/contact — wire Resend into the existing route
- The catalog PDF lives at /platos-vivaz/Catalog-min.pdf in the project — move it to Directus storage
- pim_disciplines collection may already exist in Directus schema — check before creating

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-cms-data*
*Context gathered: 2026-02-25*
