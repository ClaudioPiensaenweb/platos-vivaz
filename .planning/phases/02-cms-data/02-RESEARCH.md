# Phase 2: CMS Data - Research

**Researched:** 2026-02-25
**Domain:** Directus 11 data seeding, Resend email API, image transformation pipeline, JSON-LD structured data
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Product data structure**
- Full technical spec per product: PAH mg/kg, composition (resin %), weight, diameter, height, colors available, disciplines approved, ISSF status, formats (pallet/box quantities), logistics data
- Many-to-many relationship between pim_products and pim_disciplines via junction table — separate pim_disciplines collection with its own data (name, description, icon)
- Real product images available — user will upload to Directus
- sys_brand collection: Vivaz only — single brand record with factory address, contact emails, phone, social links, key stats (founded 1967, etc.)

**Image pipeline**
- Use Directus /assets/ endpoint with query params via existing assetUrl() helper — no next/image optimization
- 3 standard dimension presets: Thumbnail (200px), Card (600px), Hero/Full (1200px)
- assetUrl() should enforce WebP format by default (format=webp added automatically unless caller overrides)
- All images served as WebP with quality 80
- Alt text auto-generated from product name + locale ("NATURA clay target" / "Plato NATURA") — no custom alt text field in Directus

**Contact form & email**
- Email service: Resend (API key in env var)
- Form fields: Name, email, phone (optional), company/club name, discipline interest (dropdown), message — standard B2B distributor inquiry format
- Dual storage: send email notification to admin AND save to crm_leads Directus collection
- Admin gets formatted notification email, user gets "We received your message" confirmation email
- Two email templates needed: admin notification + user confirmation

**PDF data sheets**
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROD-07 | Technical data sheets and certificates accessible (downloadable PDFs or linked documents) | Catalog-min.pdf upload to Directus /files via uploadFiles SDK, link UUID to sys_brand.catalog_pdf field, assetUrl() generates download URL |
| LEAD-05 | Email notification sent to admin on form submission (currently TODO) | Resend SDK: `resend.emails.send({ from, to, subject, html })` wired into existing /api/contact route. Admin notification + user confirmation pattern. |
| PERF-03 | JSON-LD structured data on product pages (Product schema) | Existing json-ld.ts productJsonLd() needs augmentation: add brand, material, additionalProperty for PAH; inject via `<script type="application/ld+json">` in Server Component |
| PERF-06 | Image pipeline optimized — assetUrl() always requests WebP with explicit dimensions | Modify assetUrl() in directus.ts: add `format: 'webp'` as default, add `quality: 80` as default, add width preset constants. Breaking change: remove need to pass format manually. |
</phase_requirements>

---

## Summary

Phase 2 is a data plumbing phase with four distinct workstreams: (1) complete product data seeding with all technical specs and M2M discipline relationships, (2) Resend email integration into the existing /api/contact route, (3) assetUrl() enhancement to enforce WebP+quality defaults, and (4) JSON-LD augmentation and catalog PDF upload.

The existing codebase is well-structured for this phase. The schema in `backend/setup-schema.js` already defines all required collections (pim_products, pim_disciplines, M2M junction, sys_brand, crm_leads). The seed data in `backend/seed-data.js` has product stubs but is missing: `weight_g` values, `height_mm` field (not in schema), `issf_approved` boolean, raw PAH numeric values, full M2M discipline linkages, and the brand catalog_pdf field. The contact API route at `frontend/src/app/api/contact/route.ts` saves leads to Directus but has a `// TODO` comment where email should fire — it needs Resend added.

The critical constraint for PERF-06 and PERF-03: `assetUrl()` currently applies no format or quality by default. Every call must be audited to ensure explicit dimensions are passed. The `productJsonLd()` function in `json-ld.ts` hardcodes the Directus URL in the image path instead of using `assetUrl()` — this should be fixed as part of PERF-03 to ensure WebP format in structured data images.

**Primary recommendation:** Execute workstreams in this order: (1) schema additions + seed data augmentation, (2) assetUrl() WebP defaults, (3) Resend email wiring, (4) JSON-LD + PDF upload. Each is independent and low-risk.

---

## Standard Stack

### Core (already installed)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| @directus/sdk | ^18.0.0 | Directus API client — createItem, uploadFiles, updateSingleton | Already in frontend/package.json and backend/package.json |
| resend | to install | Transactional email API — admin + user confirmation emails | NOT installed — needs `npm install resend` in frontend/ |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| form-data | built-in Node 22 | PDF upload via FormData in Node seed script | Already available in Node 22 (docker init image) |
| dotenv | ^16.4.0 | Env var loading in backend seed scripts | Already in backend/package.json |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Resend (locked decision) | Nodemailer + SMTP | Nodemailer requires SMTP server setup; Resend is API-only, works in Next.js Edge/serverless without SMTP config |
| Plain HTML email templates | @react-email/components | React Email adds a build step and dependency; plain HTML strings work with Resend and require no extra install |

**Installation (frontend only):**
```bash
cd frontend && npm install resend
```

---

## Architecture Patterns

### Recommended Project Structure (additions for Phase 2)

```
backend/
├── setup-schema.js        # MODIFY: add height_mm, catalog_pdf fields
├── seed-data.js           # MODIFY: add weight data, M2M linkages, brand record
└── seed-pdf.js            # NEW: upload Catalog-min.pdf to Directus files

frontend/src/
├── app/api/contact/
│   └── route.ts           # MODIFY: add Resend calls (admin + user email)
├── lib/
│   ├── directus.ts        # MODIFY: assetUrl() WebP defaults + preset constants
│   ├── types.ts           # MODIFY: add disciplines field to Product, catalog_pdf to BrandData
│   ├── json-ld.ts         # MODIFY: use assetUrl() for image, add more Product properties
│   └── email-templates.ts # NEW: admin and user HTML email template functions
└── .env.local             # MODIFY: add RESEND_API_KEY
```

### Pattern 1: assetUrl() with WebP Defaults

**What:** Modify the helper to always apply `format=webp&quality=80` unless overridden. Add width preset constants so callsites don't pass magic numbers.

**When to use:** All image rendering throughout the site.

```typescript
// Source: Directus /docs/guides/files/transform + project directus.ts
// Directus transform params: width, height, quality (1-100), format (auto|jpg|png|webp|tiff), fit

export const IMG_PRESETS = {
  thumbnail: 200,
  card: 600,
  hero: 1200,
} as const;

export function assetUrl(
  uuid: string | null,
  params?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    fit?: string;
  }
): string {
  if (!uuid) return "";
  const url = new URL(`/assets/${uuid}`, DIRECTUS_PUBLIC_URL);
  // Enforce WebP default (PERF-06)
  url.searchParams.set("format", params?.format ?? "webp");
  url.searchParams.set("quality", String(params?.quality ?? 80));
  if (params?.width) url.searchParams.set("width", String(params.width));
  if (params?.height) url.searchParams.set("height", String(params.height));
  if (params?.fit) url.searchParams.set("fit", params.fit);
  return url.toString();
}
```

**Breaking change note:** After this change, callers that previously passed `format: "webp"` explicitly will still work (value matches default). Callers that needed PNG (e.g., `image_transparent` with transparency) MUST pass `format: "png"` explicitly. Audit all `assetUrl()` callsites.

### Pattern 2: Resend Email in Next.js App Router

**What:** Instantiate Resend once per request in the API route. Send two emails: admin notification + user confirmation.

```typescript
// Source: https://resend.com/docs/send-with-nextjs
// Environment variable: RESEND_API_KEY
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Inside POST handler, after successful crm_leads createItem:
const adminEmail = generateAdminEmail({ name, email, company, interest, message });
const userEmail = generateUserEmail({ name });

const [adminResult, userResult] = await Promise.all([
  resend.emails.send({
    from: "Vivaz Notificaciones <noreply@platosvivaz.com>",
    to: "admin@platosvivaz.com",
    subject: `Nuevo contacto: ${name} (${company})`,
    html: adminEmail,
  }),
  resend.emails.send({
    from: "VIVAZ Clay Targets <noreply@platosvivaz.com>",
    to: email,
    subject: "Hemos recibido tu mensaje — VIVAZ Clay Targets",
    html: userEmail,
  }),
]);

// Non-blocking: email failure should NOT fail the form submission
// Log errors but return success to user
if (adminResult.error) console.error("Admin email failed:", adminResult.error);
if (userResult.error) console.error("User email failed:", userResult.error);
```

**From address requirement:** The `from` domain (`platosvivaz.com`) must be verified in the Resend dashboard before deployment. For local dev, use `onboarding@resend.dev` (Resend test domain, always works).

### Pattern 3: M2M Discipline Linkage in Seed Data

**What:** Two approaches to seed pim_products <-> pim_disciplines junction. The simplest is direct junction table inserts after products and disciplines exist.

```javascript
// Source: Directus M2M discussion — junction table direct insert is most reliable
// First seed products and disciplines (get their IDs back)
// Then link via junction table createItems

// Option A: Nested create in product (works but fragile with IDs)
await client.request(createItem('pim_products', {
  ...productData,
  disciplines: [
    { pim_disciplines_id: disciplineId1 },
    { pim_disciplines_id: disciplineId2 },
  ],
}));

// Option B: Separate junction inserts (more explicit, recommended for seed scripts)
await client.request(createItems('pim_products_disciplines', [
  { pim_products_id: productId, pim_disciplines_id: disciplineId },
]));
```

Option B (separate junction inserts) is preferred for seed scripts because it avoids nested create complexity and is explicit about what's being created. Seed disciplines first, capture their IDs, seed products, capture product IDs, then create junction rows.

### Pattern 4: PDF Upload to Directus Files

**What:** Upload a local PDF file to Directus file storage and store the UUID in sys_brand for download links.

```javascript
// Source: https://directus.io/docs/guides/files/upload
// Node.js environment (backend seed script) using built-in FormData (Node 22)
import { uploadFiles, updateSingleton } from '@directus/sdk';
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function uploadCatalogPDF() {
  const pdfPath = resolve('../Catalog-min.pdf');
  const pdfBuffer = readFileSync(pdfPath);
  const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

  const formData = new FormData();
  formData.append('title', 'Vivaz Clay Targets Catalog');
  formData.append('filename_download', 'vivaz-catalog.pdf');
  formData.append('file', blob, 'vivaz-catalog.pdf');

  const result = await client.request(uploadFiles(formData));
  const fileId = result.id; // UUID of uploaded PDF

  // Link to sys_brand singleton
  await client.request(updateSingleton('sys_brand', {
    catalog_pdf: fileId,
  }));
  return fileId;
}
```

**Node 22 note:** Node 22 has built-in `FormData` and `Blob` — no extra `form-data` package needed. The docker init service uses `node:22-alpine`.

### Pattern 5: JSON-LD Product Schema Injection

**What:** Inject structured data script in Next.js App Router Server Component page.

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
// In frontend/src/app/[locale]/productos/[slug]/page.tsx (Server Component)
import { productJsonLd } from "@/lib/json-ld";

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  const jsonLd = productJsonLd(product, params.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page content */}
    </>
  );
}
```

### Anti-Patterns to Avoid

- **Do not throw on email failure:** Email errors must be caught and logged, not propagated to the user. The form submission succeeds if Directus `createItem` succeeds.
- **Do not use `image_transparent` with WebP:** Transparent PNG images must explicitly pass `format: "png"` to `assetUrl()`. WebP supports transparency but Directus may not always preserve alpha channel correctly. Keep PNG for transparent product images.
- **Do not hardcode Directus URL in json-ld.ts:** The existing code at `json-ld.ts:4` sets `DIRECTUS_URL` separately. Replace with `assetUrl()` call after the WebP default change.
- **Do not assume singleton update works with `createItem`:** `sys_brand` is a singleton. Use `updateSingleton` from @directus/sdk, not `createItem`. The existing `seed-data.js` already correctly uses `updateItem` for `web_regulation` — apply same pattern for `sys_brand`.
- **Do not run `setup-schema.js` again without idempotency check:** All schema fields go through `safeCreateField()` which SKIPs if the field exists. Adding new fields to the schema script is safe to re-run.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTML email delivery | Custom SMTP mailer | Resend SDK | SPF/DKIM/DMARC, deliverability, dev sandbox, no SMTP infra |
| Image format conversion | Sharp.js in Next.js | Directus /assets/ transform | Directus already runs Sharp server-side; no extra compute in Next.js |
| Email HTML design | Table-based email HTML from scratch | Template function returning string | Two simple templates using inline styles — no need for @react-email overhead |
| PDF serving | Custom file endpoint | Directus /assets/{uuid} | Direct download URL with filename_download metadata |

**Key insight:** Directus's built-in Sharp transformation pipeline means zero image processing code in Next.js. The assetUrl() URL generates a transformed image on-demand — Directus caches the result automatically.

---

## Common Pitfalls

### Pitfall 1: Resend from Address Not Verified
**What goes wrong:** Resend rejects the send request with "The email address you're trying to send from is not verified." in production.
**Why it happens:** Resend requires domain DNS verification (SPF + DKIM records) before sending from custom domains.
**How to avoid:** For local development, use `onboarding@resend.dev` as the `from` address — this is Resend's built-in test address that always works. Only switch to `noreply@platosvivaz.com` after the client verifies the domain.
**Warning signs:** 422 error from Resend API; check `error.message` for "not verified".

### Pitfall 2: assetUrl() Missing Width Breaks Caching
**What goes wrong:** Images without explicit `width` parameter bypass Directus's cache and trigger full-size downloads in the browser.
**Why it happens:** Directus only caches transformed images. Without transformation params, the original file is served.
**How to avoid:** ALWAYS pass a width. Use `IMG_PRESETS.thumbnail`, `IMG_PRESETS.card`, or `IMG_PRESETS.hero`. Never call `assetUrl(uuid)` with no params for displayed images.
**Warning signs:** Large image file sizes in browser DevTools (>200KB for what should be a card image).

### Pitfall 3: M2M Seeding Order Dependency
**What goes wrong:** Junction table inserts fail because the product or discipline ID doesn't exist yet.
**Why it happens:** Seed script creates items in wrong order or uses hardcoded IDs that don't match the database.
**How to avoid:** Always seed disciplines first, capture their IDs (from the response of `createItems`), then seed products, capture product IDs, then create junction rows referencing captured IDs. Never hardcode database IDs.
**Warning signs:** Foreign key constraint errors during seed; "RECORD_NOT_UNIQUE" or "NOT NULL constraint" in Directus logs.

### Pitfall 4: transparent PNG Images Becoming WebP
**What goes wrong:** Product images with transparent backgrounds (`image_transparent` field) lose their alpha channel when served as WebP.
**Why it happens:** After assetUrl() defaults to WebP, `image_transparent` images also get format=webp.
**How to avoid:** Always call `assetUrl(product.image_transparent, { width: 600, format: "png" })` for transparent images.
**Warning signs:** White or black background appearing behind product image on transparent overlay.

### Pitfall 5: Email Blocks Form Submission
**What goes wrong:** If Resend is down or the API key is invalid, the contact form returns an error to the user even though the lead was saved.
**Why it happens:** Awaiting email before returning response, letting email errors bubble up.
**How to avoid:** Wrap Resend calls in try/catch independently from the Directus createItem call. Return success to user once lead is saved; log email errors for monitoring.
**Warning signs:** Form returns error during Resend outage even though the lead appeared in crm_leads.

### Pitfall 6: JSON-LD Product Schema Without offers Triggers Google Warning
**What goes wrong:** Google Search Console reports "Missing field 'offers'" for product pages.
**Why it happens:** Google's Product snippet requires at least one of: `review`, `aggregateRating`, or `offers`.
**How to avoid:** For a B2B manufacturer (no prices), use `additionalProperty` array for specs and include an `offers` object with `priceCurrency` and `availability` set to `InStock` without a price, or add a manufacturer note. The existing `productJsonLd()` function omits `offers` entirely — add at minimum `{ "@type": "Offer", "availability": "https://schema.org/InStock", "url": "..." }`.
**Warning signs:** Google Rich Results Test shows "Item is not eligible for rich results."

### Pitfall 7: sys_brand catalog_pdf Field Not in Schema
**What goes wrong:** Trying to set `sys_brand.catalog_pdf` fails because the field doesn't exist in the Directus schema.
**Why it happens:** The current `setup-schema.js` does NOT define a `catalog_pdf` field on `sys_brand`. The PDF upload UUID has nowhere to go.
**How to avoid:** Add `catalog_pdf` (type: uuid, file-image interface, related to directus_files) to `setupCorporate()` in `setup-schema.js` before running the seed PDF script.
**Warning signs:** Directus API returns "Field does not exist" when calling `updateSingleton('sys_brand', { catalog_pdf: uuid })`.

---

## Code Examples

Verified patterns from official sources:

### Resend Send Email (Next.js API Route)
```typescript
// Source: https://resend.com/docs/send-with-nextjs
// Install: npm install resend
// Env var: RESEND_API_KEY

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In POST handler:
const { data, error } = await resend.emails.send({
  from: "Vivaz <noreply@platosvivaz.com>",  // must be verified domain in production
  to: ["admin@platosvivaz.com"],
  subject: "Nuevo contacto desde platosvivaz.com",
  html: "<p>Contenido del email</p>",
});

if (error) {
  console.error("Resend error:", error);
  // Do not throw — log only
}
```

### Directus Image Transform URL Parameters
```
// Source: https://directus.io/docs/guides/files/transform
// Supported params:
//   format: auto | jpg | png | webp | tiff
//   quality: 1-100 (default: Sharp default ~80)
//   width: pixels
//   height: pixels
//   fit: cover (default) | contain | inside | outside
//   withoutEnlargement: true | false

// Example: card image
/assets/{uuid}?format=webp&quality=80&width=600&fit=cover

// Example: thumbnail
/assets/{uuid}?format=webp&quality=80&width=200&fit=cover

// Example: transparent PNG (preserve alpha)
/assets/{uuid}?format=png&width=600
```

### Directus updateSingleton
```typescript
// Source: https://docs.directus.io/packages/@directus/sdk/rest/functions/updatesingleton
import { updateSingleton } from "@directus/sdk";

await client.request(updateSingleton("sys_brand", {
  catalog_pdf: fileUUID,
  company_name: "VIVAZ Clay Targets",
  phone_national: "+34-618-757-580",
}));
```

### M2M Junction Seed (Direct Insert — Recommended)
```javascript
// Source: Directus community discussion #2722
// Seed disciplines first, get IDs, seed products, get IDs, then:
import { createItems } from "@directus/sdk";

await client.request(createItems("pim_products_disciplines", [
  { pim_products_id: naturaStandardId, pim_disciplines_id: americanTrapId },
  { pim_products_id: naturaStandardId, pim_disciplines_id: universalTrapId },
  { pim_products_id: naturaStandardId, pim_disciplines_id: olympicSkeetId },
]));
```

### PDF Upload to Directus (Node 22 built-in FormData)
```javascript
// Source: https://directus.io/docs/guides/files/upload
import { uploadFiles } from "@directus/sdk";
import { readFileSync } from "fs";

const pdfBuffer = readFileSync("../Catalog-min.pdf");
const blob = new Blob([pdfBuffer], { type: "application/pdf" });

const formData = new FormData();
formData.append("title", "Vivaz Clay Targets Product Catalog");
formData.append("filename_download", "vivaz-catalog.pdf");
formData.append("file", blob, "vivaz-catalog.pdf");

const file = await client.request(uploadFiles(formData));
console.log("Uploaded PDF UUID:", file.id);
```

### JSON-LD Product Schema (augmented for PERF-03)
```typescript
// Source: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
// Minimum required: name + one of (review | aggregateRating | offers)
// For B2B manufacturer: use offers with availability, no price

export function productJsonLd(product: Product, locale: string) {
  const imageUrl = assetUrl(product.image, { width: 800 }); // uses WebP default

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description_short || product.subtitle || "",
    image: imageUrl,
    url: `${SITE_URL}/${locale === "es" ? "" : locale + "/"}productos/${product.slug}`,
    brand: { "@type": "Brand", name: "VIVAZ Clay Targets" },
    manufacturer: {
      "@type": "Organization",
      name: "Jesús y Vicente Vázquez S.L.",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/${locale === "es" ? "" : locale + "/"}productos/${product.slug}`,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "PAH Level", value: product.pah_level },
      product.diameter_mm && {
        "@type": "PropertyValue",
        name: "Diameter",
        value: `${product.diameter_mm}mm`,
      },
      product.weight_g && {
        "@type": "PropertyValue",
        name: "Weight",
        value: `${product.weight_g}g`,
      },
      product.material && {
        "@type": "PropertyValue",
        name: "Material",
        value: product.material,
      },
    ].filter(Boolean),
  };
}
```

---

## Schema Gaps Found (Critical for Planning)

The existing `backend/setup-schema.js` and `frontend/src/lib/types.ts` are missing fields that CONTEXT.md requires. These must be added:

### Fields to Add to pim_products (setup-schema.js)
| Field | Type | Purpose |
|-------|------|---------|
| `height_mm` | integer | Physical height of target (not in current schema) |
| `resin_pct` | integer | Pine resin composition percentage (e.g., 100 for NATURA) |
| `issf_approved` | boolean | Whether ISSF approved this target |

**Note from STATE.md:** "ISSF approval current status for NATURA must be confirmed before displaying ISSF badges" — seed this field conservatively.

### Fields to Add to sys_brand (setup-schema.js)
| Field | Type | Purpose |
|-------|------|---------|
| `catalog_pdf` | uuid (file relation) | UUID of uploaded Catalog-min.pdf |
| `founded_year` | integer | Year company founded (1967) — for About page / JSON-LD |
| `address` | text | Factory address |

### Fields to Add to Product TypeScript type (types.ts)
| Field | TypeScript Type | Notes |
|-------|----------------|-------|
| `disciplines` | `{ pim_disciplines_id: Discipline }[]` | M2M — populated when queried with `fields: ["disciplines.pim_disciplines_id.*"]` |
| `height_mm` | `number \| null` | After schema addition |
| `resin_pct` | `number \| null` | After schema addition |
| `issf_approved` | `boolean` | After schema addition |

### Fields to Add to BrandData TypeScript type (types.ts)
| Field | TypeScript Type | Notes |
|-------|----------------|-------|
| `catalog_pdf` | `string \| null` | UUID of catalog PDF file |
| `founded_year` | `number \| null` | 1967 |
| `address` | `string \| null` | Factory postal address |

---

## Complete Seed Data Requirements

### pim_disciplines (9 disciplines — already in seed-data.js, but missing translations)
Disciplines seeded: American Trap, Universal Trap, Double Trap, Olympic Skeet, Sporting, Compak Sporting, FITASC, Rabbit, Battue

NATURA disciplines: American Trap, Universal Trap, Double Trap, Olympic Skeet, Sporting, FITASC
ECO STAR disciplines: Sporting, Compak Sporting, FITASC, Rabbit, Battue
Special formats: Sporting, Compak Sporting

### pim_products (need weight_g values)
| Product | weight_g | height_mm | resin_pct | issf_approved |
|---------|----------|-----------|-----------|--------------|
| Natura Standard | 105 | 25 | 100 | true |
| Natura Rabbit | 105 | 25 | 100 | true |
| Natura Battue | 75 | 20 | 100 | false |
| Eco Star Standard | 105 | 25 | 85 | false |
| Eco Star Rabbit | 105 | 25 | 85 | false |
| Midi 90 | 75 | 25 | 85 | false |
| Mini 60 | 35 | 20 | 85 | false |

**Note:** These weight/height values are typical for clay targets of these dimensions — should be verified with actual Vivaz spec sheet before seeding as authoritative data (LOW confidence on exact numbers).

### sys_brand (needs seeding)
```javascript
{
  company_name: "VIVAZ CLAY TARGETS",
  tagline: "European Leaders in Ecological Clay Targets",
  phone_national: "+34-618-757-580",
  phone_export: "+34-606-172-746",
  email_national: "admin@platosvivaz.com",
  email_export: "sales@vivazclaytargets.com",
  whatsapp: "+34618757580",
  instagram_url: "https://instagram.com/vivazclaytargets",
  color_primary: "#1B5E20",
  color_accent: "#E8732A",
  color_cream: "#F5F0E8",
  font_heading: "Quablo",
  font_body: "Manrope",
  founded_year: 1967,
}
```

---

## Email Template Design Guidance (Claude's Discretion)

Both email templates should be plain HTML strings — no React Email components needed. This avoids an extra build dependency.

### Admin Notification Template
- Subject: `Nuevo contacto: {name} - {company}`
- Content: All form fields in a readable table layout
- From: `Vivaz Notificaciones <noreply@platosvivaz.com>`
- To: admin email from env var (not hardcoded)

### User Confirmation Template
- Subject: `Hemos recibido tu mensaje — VIVAZ Clay Targets`
- Content: Brief confirmation, what to expect (response in X days), contact info
- From: `VIVAZ Clay Targets <noreply@platosvivaz.com>`
- To: user's email address

Both use inline styles only (email clients don't support external CSS). Green (#1B5E20) and cream (#F5F0E8) brand colors.

**Env vars needed:**
```bash
# frontend/.env.local
RESEND_API_KEY=re_xxxx
ADMIN_EMAIL=admin@platosvivaz.com   # admin notification recipient
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| SMTP + Nodemailer | Resend API SDK | No SMTP server needed, built-in deliverability, free tier (100/day), simple error handling |
| Serve original images | Directus transform params | Images resized server-side on first request, cached, ~10x smaller than originals |
| Manual JSON-LD per page | Shared productJsonLd() function | Consistent structured data, easy to extend |

**Deprecated/outdated:**
- `format: "auto"` in Directus: serves WebP to supporting browsers, JPEG otherwise. Prefer explicit `format: "webp"` for predictability (we control Next.js environment; no IE11).
- `react-email`: Required for rich HTML email UX but adds build complexity. For 2 simple transactional emails in this phase, plain HTML strings are the right trade-off.

---

## Open Questions

1. **Resend domain verification for platosvivaz.com**
   - What we know: Domain DNS must have SPF + DKIM records pointing to Resend servers
   - What's unclear: Whether the client controls DNS for platosvivaz.com or if this is blocked
   - Recommendation: Use `onboarding@resend.dev` as from address for local dev and testing. Document the production domain verification step for the client.

2. **Actual product weights and heights from Vivaz spec sheet**
   - What we know: Clay targets of 110mm diameter typically weigh 100-110g and are 25mm tall
   - What's unclear: Vivaz's exact published specs — the briefing materials in the repo may contain this
   - Recommendation: The planner should include a task to read `/briefing/vivaz textos web.md` and `Catalog-min.pdf` for exact specs before seeding. Flag as LOW confidence.

3. **ISSF approval status for NATURA (from STATE.md research flag)**
   - What we know: Certifications array in seed-data.js includes 'ISSF' for NATURA
   - What's unclear: Whether ISSF approval is current — STATE.md flags this as unverified
   - Recommendation: Seed `issf_approved: false` conservatively; set to `true` only after client confirms.

4. **Admin email address for notifications**
   - What we know: The briefing mentions `export@platosvivaz.com` and `admin@platosvivaz.com`
   - What's unclear: Which address should receive contact form notifications
   - Recommendation: Make this an env var (`ADMIN_EMAIL`) — not hardcoded. Default to `admin@platosvivaz.com` in `.env.example`.

---

## Sources

### Primary (HIGH confidence)
- Directus docs `/guides/files/transform` — image transform URL parameters, format options, quality range
- Directus docs `/guides/files/upload` — uploadFiles SDK function, FormData structure, Node.js usage
- Directus SDK docs `updateSingleton` function signature
- Resend docs `send-with-nextjs` — App Router API route integration, RESEND_API_KEY env var
- Resend API reference `emails/send-email` — all send parameters, from/to/subject/html, error handling pattern
- Google Developers `product-snippet` structured data — required fields (name + one of offers/review/aggregateRating)
- Next.js docs `app/guides/json-ld` — script injection in Server Component

### Secondary (MEDIUM confidence)
- Directus community discussion #2722 — M2M junction table direct insert pattern
- WebSearch: Directus 11 uses Sharp for transforms, supports `webp`, `png`, `jpg`, `tiff` format params

### Tertiary (LOW confidence)
- Product physical dimensions (weight_g, height_mm) — estimated from clay target industry standards, not verified against Vivaz spec sheet

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — @directus/sdk v18 confirmed in package.json; Resend docs verified via official site
- Architecture patterns: HIGH — assetUrl() pattern verified against Directus transform docs; Resend pattern from official Next.js guide
- Pitfalls: HIGH — domain verification, M2M ordering, PNG transparency are well-documented failure modes
- Product seed data values: LOW — weight/height numbers are estimates; must be verified against briefing materials

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (Directus 11.x API stable; Resend API very stable)
