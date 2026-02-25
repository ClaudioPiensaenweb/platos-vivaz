// ===========================================
// VIVAZ Clay Targets - Setup Schema Completo
// Ejecutar: node setup-schema.js
// Skills: CORPORATE, PIM, BLOG, CRM + i18n
// ===========================================

import { createDirectus, rest, staticToken, createCollection, createField, createRelation } from '@directus/sdk';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

if (!ADMIN_TOKEN) {
  console.error('ERROR: Define ADMIN_TOKEN en .env');
  process.exit(1);
}

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(ADMIN_TOKEN))
  .with(rest());

// --- Helpers ---
async function safeCreateCollection(payload) {
  try {
    await client.request(createCollection(payload));
    console.log(`  [OK] Colección "${payload.collection}" creada.`);
  } catch (e) {
    if (e?.errors?.[0]?.extensions?.code === 'ALREADY_EXISTS' || e.message?.includes('already exists')) {
      console.log(`  [SKIP] Colección "${payload.collection}" ya existe.`);
    } else {
      console.error(`  [ERR] Colección "${payload.collection}":`, e.message || e);
    }
  }
}

async function safeCreateField(collection, payload) {
  try {
    await client.request(createField(collection, payload));
    console.log(`    [OK] Campo "${collection}.${payload.field}" creado.`);
  } catch (e) {
    if (e?.errors?.[0]?.extensions?.code === 'ALREADY_EXISTS' || e.message?.includes('already exists')) {
      console.log(`    [SKIP] Campo "${collection}.${payload.field}" ya existe.`);
    } else {
      console.error(`    [ERR] Campo "${collection}.${payload.field}":`, e.message || e);
    }
  }
}

async function safeCreateRelation(payload) {
  try {
    await client.request(createRelation(payload));
    console.log(`    [OK] Relación "${payload.collection}.${payload.field}" creada.`);
  } catch (e) {
    if (e?.errors?.[0]?.extensions?.code === 'ALREADY_EXISTS' || e.message?.includes('already exists')) {
      console.log(`    [SKIP] Relación "${payload.collection}.${payload.field}" ya existe.`);
    } else {
      console.error(`    [ERR] Relación "${payload.collection}.${payload.field}":`, e.message || e);
    }
  }
}

// =============================================
// 1. SKILL_CORPORATE (Base)
// =============================================
async function setupCorporate() {
  console.log('\n=== SKILL_CORPORATE (Base) ===\n');

  // --- sys_brand (Singleton) ---
  await safeCreateCollection({
    collection: 'sys_brand',
    schema: { name: 'sys_brand', singleton: true },
    meta: { icon: 'palette', note: 'Configuración de marca y contacto', singleton: true },
  });

  const brandFields = [
    { field: 'logo', type: 'uuid', meta: { interface: 'file-image', width: 'half', note: 'Logo principal SVG' }, schema: {} },
    { field: 'logo_dark', type: 'uuid', meta: { interface: 'file-image', width: 'half', note: 'Logo para fondos oscuros' }, schema: {} },
    { field: 'color_primary', type: 'string', meta: { interface: 'input', width: 'half', note: 'Color primario (hex)' }, schema: { default_value: '#1B5E20' } },
    { field: 'color_accent', type: 'string', meta: { interface: 'input', width: 'half', note: 'Color acento (hex)' }, schema: { default_value: '#E8732A' } },
    { field: 'color_cream', type: 'string', meta: { interface: 'input', width: 'half', note: 'Color crema fondo (hex)' }, schema: { default_value: '#F5F0E8' } },
    { field: 'font_heading', type: 'string', meta: { interface: 'input', width: 'half', note: 'Fuente headings' }, schema: { default_value: 'Quablo' } },
    { field: 'font_body', type: 'string', meta: { interface: 'input', width: 'half', note: 'Fuente body' }, schema: { default_value: 'Quablo' } },
    { field: 'company_name', type: 'string', meta: { interface: 'input', width: 'half', note: 'Nombre empresa' }, schema: { default_value: 'VIVAZ CLAY TARGETS' } },
    { field: 'tagline', type: 'string', meta: { interface: 'input', width: 'full', note: 'Eslogan' }, schema: { default_value: 'European Leaders in Ecological Clay Targets' } },
    { field: 'divider_contact', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'Contacto', icon: 'phone' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'phone_national', type: 'string', meta: { interface: 'input', width: 'half', note: 'Teléfono nacional' }, schema: {} },
    { field: 'phone_export', type: 'string', meta: { interface: 'input', width: 'half', note: 'Teléfono exportación' }, schema: {} },
    { field: 'email_national', type: 'string', meta: { interface: 'input', width: 'half', note: 'Email nacional' }, schema: {} },
    { field: 'email_export', type: 'string', meta: { interface: 'input', width: 'half', note: 'Email exportación' }, schema: {} },
    { field: 'whatsapp', type: 'string', meta: { interface: 'input', width: 'half', note: 'WhatsApp' }, schema: {} },
    { field: 'instagram_url', type: 'string', meta: { interface: 'input', width: 'half', note: 'URL Instagram' }, schema: {} },
    { field: 'catalog_pdf', type: 'uuid', meta: { interface: 'file-image', width: 'half', note: 'Catálogo PDF descargable' }, schema: {} },
    { field: 'founded_year', type: 'integer', meta: { interface: 'input', width: 'half', note: 'Año de fundación' }, schema: {} },
    { field: 'address', type: 'text', meta: { interface: 'input-multiline', width: 'full', note: 'Dirección fábrica' }, schema: {} },
  ];

  for (const f of brandFields) await safeCreateField('sys_brand', f);

  await safeCreateRelation({ collection: 'sys_brand', field: 'logo', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
  await safeCreateRelation({ collection: 'sys_brand', field: 'logo_dark', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
  await safeCreateRelation({ collection: 'sys_brand', field: 'catalog_pdf', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });

  // --- sys_skills (Singleton) ---
  await safeCreateCollection({
    collection: 'sys_skills',
    schema: { name: 'sys_skills', singleton: true },
    meta: { icon: 'toggle_on', note: 'Skills activos del proyecto', singleton: true },
  });

  const skillFields = [
    { field: 'skill_corporate', type: 'boolean', meta: { interface: 'boolean', width: 'half', note: 'Base (siempre activo)' }, schema: { default_value: true } },
    { field: 'skill_pim', type: 'boolean', meta: { interface: 'boolean', width: 'half', note: 'Catálogo técnico' }, schema: { default_value: true } },
    { field: 'skill_blog', type: 'boolean', meta: { interface: 'boolean', width: 'half', note: 'Noticias / Blog' }, schema: { default_value: true } },
    { field: 'skill_crm', type: 'boolean', meta: { interface: 'boolean', width: 'half', note: 'Captación de leads' }, schema: { default_value: true } },
    { field: 'skill_ecommerce', type: 'boolean', meta: { interface: 'boolean', width: 'half', note: 'Venta online' }, schema: { default_value: false } },
  ];

  for (const f of skillFields) await safeCreateField('sys_skills', f);

  // --- sys_menus ---
  await safeCreateCollection({
    collection: 'sys_menus',
    schema: { name: 'sys_menus' },
    meta: { icon: 'menu', note: 'Menús de navegación', sort_field: 'sort' },
  });

  const menuFields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Publicado', value: 'published' }, { text: 'Borrador', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'draft' } },
    { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true }, schema: {} },
    { field: 'title', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: { is_nullable: false } },
    { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'url', type: 'string', meta: { interface: 'input', width: 'half', note: 'URL relativa (ej: /productos)' }, schema: {} },
    { field: 'parent_id', type: 'integer', meta: { interface: 'select-dropdown-m2o', width: 'half' }, schema: { is_nullable: true } },
  ];

  for (const f of menuFields) await safeCreateField('sys_menus', f);

  await safeCreateRelation({
    collection: 'sys_menus', field: 'parent_id', related_collection: 'sys_menus',
    meta: { one_field: 'children', one_deselect_action: 'nullify' },
    schema: { on_delete: 'SET NULL' },
  });

  // --- web_pages ---
  await safeCreateCollection({
    collection: 'web_pages',
    schema: { name: 'web_pages' },
    meta: { icon: 'web', note: 'Páginas del sitio (JSON Canvas)', sort_field: 'sort', archive_field: 'status', archive_value: 'archived', unarchive_value: 'published' },
  });

  const pageFields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Publicado', value: 'published' }, { text: 'Borrador', value: 'draft' }, { text: 'Archivado', value: 'archived' }] }, width: 'half' }, schema: { default_value: 'draft' } },
    { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true }, schema: {} },
    { field: 'title', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: { is_nullable: false } },
    { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_unique: true } },
    { field: 'canvas_content', type: 'json', meta: { interface: 'input-code', options: { language: 'json' }, width: 'full', note: 'JSON Canvas del layout visual' }, schema: {} },
    { field: 'divider_seo', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'SEO', icon: 'search' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'seo_title', type: 'string', meta: { interface: 'input', width: 'half', note: 'Título SEO (max 60)' }, schema: {} },
    { field: 'seo_description', type: 'text', meta: { interface: 'input-multiline', width: 'half', note: 'Descripción SEO (max 160)' }, schema: {} },
    { field: 'seo_image', type: 'uuid', meta: { interface: 'file-image', width: 'half', note: 'Imagen Open Graph' }, schema: {} },
  ];

  for (const f of pageFields) await safeCreateField('web_pages', f);

  await safeCreateRelation({ collection: 'web_pages', field: 'seo_image', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
}

// =============================================
// 2. SKILL_PIM (Catálogo Técnico)
// =============================================
async function setupPIM() {
  console.log('\n=== SKILL_PIM (Catálogo Técnico) ===\n');

  // --- pim_disciplines ---
  await safeCreateCollection({
    collection: 'pim_disciplines',
    schema: { name: 'pim_disciplines' },
    meta: { icon: 'sports', note: 'Disciplinas de tiro', sort_field: 'sort', archive_field: 'status', archive_value: 'archived', unarchive_value: 'published' },
  });

  const disciplineFields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Publicado', value: 'published' }, { text: 'Borrador', value: 'draft' }, { text: 'Archivado', value: 'archived' }] }, width: 'half' }, schema: { default_value: 'draft' } },
    { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true }, schema: {} },
    { field: 'name', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: { is_nullable: false } },
    { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_unique: true } },
    { field: 'description', type: 'text', meta: { interface: 'input-rich-text-html' }, schema: {} },
    { field: 'image', type: 'uuid', meta: { interface: 'file-image', width: 'half' }, schema: {} },
    { field: 'icon', type: 'string', meta: { interface: 'input', width: 'half', note: 'Nombre del icono' }, schema: {} },
  ];

  for (const f of disciplineFields) await safeCreateField('pim_disciplines', f);
  await safeCreateRelation({ collection: 'pim_disciplines', field: 'image', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });

  // --- pim_products ---
  await safeCreateCollection({
    collection: 'pim_products',
    schema: { name: 'pim_products' },
    meta: { icon: 'target', note: 'Catálogo de platos de tiro', sort_field: 'sort', archive_field: 'status', archive_value: 'archived', unarchive_value: 'published' },
  });

  const productFields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Publicado', value: 'published' }, { text: 'Borrador', value: 'draft' }, { text: 'Archivado', value: 'archived' }] }, width: 'half' }, schema: { default_value: 'draft' } },
    { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true }, schema: {} },
    { field: 'name', type: 'string', meta: { interface: 'input', width: 'half', required: true, note: 'Nombre del producto' }, schema: { is_nullable: false } },
    { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_unique: true } },
    { field: 'subtitle', type: 'string', meta: { interface: 'input', width: 'full', note: 'Subtítulo (ej: The Premium Clay Target)' }, schema: {} },
    { field: 'range_category', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Premium Natura', value: 'Premium Natura' }, { text: 'Eco Star Efficiency', value: 'Eco Star Efficiency' }, { text: 'Special Formats', value: 'Special Formats' }] }, width: 'half', note: 'Gama del producto' }, schema: {} },
    { field: 'pah_level', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: '0 mg/kg - Free', value: '0 mg/kg - Free' }, { text: '< 50 mg/kg - Compliant', value: '< 50 mg/kg - Compliant' }] }, width: 'half', note: 'Nivel PAH (CRÍTICO para normativa)' }, schema: {} },
    { field: 'material', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Resina de Pino 100%', value: 'Resina de Pino 100%' }, { text: 'Híbrido Ecológico', value: 'Híbrido Ecológico' }] }, width: 'half' }, schema: {} },

    { field: 'divider_specs', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'Especificaciones', icon: 'straighten' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'diameter_mm', type: 'integer', meta: { interface: 'input', width: 'half', note: 'Diámetro en mm (110, 90, 60)' }, schema: {} },
    { field: 'weight_g', type: 'integer', meta: { interface: 'input', width: 'half', note: 'Peso en gramos' }, schema: {} },
    { field: 'color', type: 'string', meta: { interface: 'input', width: 'half', note: 'Color principal' }, schema: {} },
    { field: 'badge_text', type: 'string', meta: { interface: 'input', width: 'half', note: 'Texto del badge (ej: 100% Natural)' }, schema: {} },
    { field: 'certifications', type: 'json', meta: { interface: 'tags', width: 'full', note: 'Certificaciones (ISSF, FITASC, etc.)' }, schema: {} },
    { field: 'featured', type: 'boolean', meta: { interface: 'boolean', width: 'half', note: 'Mostrar en Home' }, schema: { default_value: false } },

    { field: 'divider_content', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'Contenido', icon: 'description' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'description_short', type: 'text', meta: { interface: 'input-multiline', width: 'full', note: 'Descripción corta (para cards)' }, schema: {} },
    { field: 'description', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full', note: 'Descripción completa (ficha)' }, schema: {} },

    { field: 'divider_media', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'Media', icon: 'image' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'image', type: 'uuid', meta: { interface: 'file-image', width: 'half', note: 'Foto principal' }, schema: {} },
    { field: 'image_transparent', type: 'uuid', meta: { interface: 'file-image', width: 'half', note: 'Plato sin fondo (PNG)' }, schema: {} },

    { field: 'divider_logistics', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'Logística', icon: 'local_shipping' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'logistics_data', type: 'json', meta: { interface: 'input-code', options: { language: 'json' }, width: 'full', note: 'Datos logísticos (cajas, pallets, contenedores)' }, schema: {} },

    { field: 'divider_technical', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'Especificaciones Técnicas', icon: 'science' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'height_mm', type: 'integer', meta: { interface: 'input', width: 'half', note: 'Altura en mm' }, schema: {} },
    { field: 'resin_pct', type: 'integer', meta: { interface: 'input', width: 'half', note: 'Porcentaje resina de pino' }, schema: {} },
    { field: 'issf_approved', type: 'boolean', meta: { interface: 'boolean', width: 'half', note: 'Aprobado ISSF' }, schema: { default_value: false } },
  ];

  for (const f of productFields) await safeCreateField('pim_products', f);

  await safeCreateRelation({ collection: 'pim_products', field: 'image', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
  await safeCreateRelation({ collection: 'pim_products', field: 'image_transparent', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });

  // --- Junction M2M: products <-> disciplines ---
  await safeCreateCollection({
    collection: 'pim_products_disciplines',
    schema: { name: 'pim_products_disciplines' },
    meta: { icon: 'link', hidden: true, note: 'Relación productos-disciplinas' },
  });

  const junctionFields = [
    { field: 'pim_products_id', type: 'integer', meta: { hidden: true }, schema: {} },
    { field: 'pim_disciplines_id', type: 'integer', meta: { hidden: true }, schema: {} },
  ];

  for (const f of junctionFields) await safeCreateField('pim_products_disciplines', f);

  await safeCreateField('pim_products', {
    field: 'disciplines',
    type: 'alias',
    meta: { interface: 'list-m2m', special: ['m2m'], note: 'Disciplinas compatibles' },
  });

  await safeCreateRelation({
    collection: 'pim_products_disciplines', field: 'pim_products_id', related_collection: 'pim_products',
    meta: { one_field: 'disciplines', junction_field: 'pim_disciplines_id' },
    schema: { on_delete: 'CASCADE' },
  });

  await safeCreateRelation({
    collection: 'pim_products_disciplines', field: 'pim_disciplines_id', related_collection: 'pim_disciplines',
    meta: { junction_field: 'pim_products_id' },
    schema: { on_delete: 'CASCADE' },
  });
}

// =============================================
// 3. SKILL_BLOG (Noticias / Regulación)
// =============================================
async function setupBlog() {
  console.log('\n=== SKILL_BLOG (Noticias) ===\n');

  await safeCreateCollection({
    collection: 'blog_categories',
    schema: { name: 'blog_categories' },
    meta: { icon: 'category', note: 'Categorías del blog', sort_field: 'sort' },
  });

  const catFields = [
    { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true }, schema: {} },
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Publicado', value: 'published' }, { text: 'Borrador', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'draft' } },
    { field: 'name', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: { is_nullable: false } },
    { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_unique: true } },
    { field: 'description', type: 'text', meta: { interface: 'input-multiline' }, schema: {} },
  ];

  for (const f of catFields) await safeCreateField('blog_categories', f);

  await safeCreateCollection({
    collection: 'blog_posts',
    schema: { name: 'blog_posts' },
    meta: { icon: 'article', note: 'Artículos y noticias', archive_field: 'status', archive_value: 'archived', unarchive_value: 'published' },
  });

  const postFields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Publicado', value: 'published' }, { text: 'Borrador', value: 'draft' }, { text: 'Archivado', value: 'archived' }] }, width: 'half' }, schema: { default_value: 'draft' } },
    { field: 'title', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: { is_nullable: false } },
    { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_unique: true } },
    { field: 'excerpt', type: 'text', meta: { interface: 'input-multiline', note: 'Extracto breve' }, schema: {} },
    { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html', note: 'Contenido del artículo' }, schema: {} },
    { field: 'image', type: 'uuid', meta: { interface: 'file-image', width: 'half' }, schema: {} },
    { field: 'category', type: 'integer', meta: { interface: 'select-dropdown-m2o', width: 'half' }, schema: {} },
    { field: 'published_at', type: 'timestamp', meta: { interface: 'datetime', width: 'half' }, schema: {} },
    { field: 'divider_seo', type: 'alias', meta: { interface: 'presentation-divider', options: { title: 'SEO', icon: 'search' }, special: ['alias', 'no-data'], width: 'full' } },
    { field: 'seo_title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'seo_description', type: 'text', meta: { interface: 'input-multiline', width: 'half' }, schema: {} },
  ];

  for (const f of postFields) await safeCreateField('blog_posts', f);

  await safeCreateRelation({ collection: 'blog_posts', field: 'image', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
  await safeCreateRelation({
    collection: 'blog_posts', field: 'category', related_collection: 'blog_categories',
    meta: { one_field: 'posts', one_deselect_action: 'nullify' },
    schema: { on_delete: 'SET NULL' },
  });
}

// =============================================
// 4. SKILL_CRM (Captación)
// =============================================
async function setupCRM() {
  console.log('\n=== SKILL_CRM (Captación) ===\n');

  await safeCreateCollection({
    collection: 'crm_leads',
    schema: { name: 'crm_leads' },
    meta: { icon: 'person_add', note: 'Leads de contacto y distribuidores' },
  });

  const leadFields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Nuevo', value: 'new' }, { text: 'Contactado', value: 'contacted' }, { text: 'Cualificado', value: 'qualified' }, { text: 'Descartado', value: 'discarded' }] }, width: 'half' }, schema: { default_value: 'new' } },
    { field: 'name', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: { is_nullable: false } },
    { field: 'email', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'phone', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'company', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'market', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Nacional', value: 'Nacional' }, { text: 'Internacional', value: 'Internacional' }] }, width: 'half' }, schema: {} },
    { field: 'interest', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Distribución', value: 'Distribución' }, { text: 'Club/Campo', value: 'Club/Campo' }, { text: 'Tirador', value: 'Tirador' }] }, width: 'half' }, schema: {} },
    { field: 'message', type: 'text', meta: { interface: 'input-multiline' }, schema: {} },
    { field: 'source_page', type: 'string', meta: { interface: 'input', width: 'half', note: 'Página de origen' }, schema: {} },
    { field: 'date_created', type: 'timestamp', meta: { interface: 'datetime', width: 'half', readonly: true, special: ['date-created'] }, schema: {} },
  ];

  for (const f of leadFields) await safeCreateField('crm_leads', f);
}

// =============================================
// 5. SINGLETON REGULACIÓN
// =============================================
async function setupRegulation() {
  console.log('\n=== Regulación 2026 ===\n');

  await safeCreateCollection({
    collection: 'web_regulation',
    schema: { name: 'web_regulation', singleton: true },
    meta: { icon: 'gavel', note: 'Datos de la normativa UE 2025/660', singleton: true },
  });

  const regFields = [
    { field: 'limit_date', type: 'date', meta: { interface: 'datetime', width: 'half', note: 'Fecha límite normativa' }, schema: { default_value: '2026-04-22' } },
    { field: 'pah_limit_mg', type: 'integer', meta: { interface: 'input', width: 'half', note: 'Límite PAH en mg/kg' }, schema: { default_value: 50 } },
    { field: 'regulation_name', type: 'string', meta: { interface: 'input', width: 'half', note: 'Nombre normativa' }, schema: { default_value: 'EU 2025/660' } },
    { field: 'regulation_url', type: 'string', meta: { interface: 'input', width: 'half', note: 'URL oficial' }, schema: {} },
    { field: 'banned_substances', type: 'json', meta: { interface: 'tags', width: 'full', note: 'Sustancias prohibidas' }, schema: {} },
    { field: 'countdown_enabled', type: 'boolean', meta: { interface: 'boolean', width: 'half' }, schema: { default_value: true } },
  ];

  for (const f of regFields) await safeCreateField('web_regulation', f);
}

// =============================================
// 6. TRADUCCIONES (i18n)
// =============================================
async function setupTranslations() {
  console.log('\n=== TRADUCCIONES (i18n) ===\n');

  // --- languages (tabla con PK string "code") ---
  // Directus requiere definir la PK en la creación de la colección para evitar auto-increment "id".
  try {
    const res = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collection: 'languages',
        schema: { name: 'languages' },
        meta: { icon: 'language', note: 'Idiomas disponibles' },
        fields: [
          { field: 'code', type: 'string', schema: { is_primary_key: true, is_nullable: false, max_length: 10 }, meta: { interface: 'input', width: 'half', required: true } },
          { field: 'name', type: 'string', schema: {}, meta: { interface: 'input', width: 'half' } },
        ],
      }),
    });
    if (res.ok) {
      console.log('  [OK] Colección "languages" creada con PK "code".');
    } else {
      const errData = await res.json().catch(() => ({}));
      const msg = errData?.errors?.[0]?.message || '';
      if (msg.includes('already exists')) {
        console.log('  [SKIP] Colección "languages" ya existe.');
      } else {
        console.error('  [ERR] languages:', msg);
      }
    }
  } catch (e) {
    console.error('  [ERR] languages:', e.message);
  }

  // --- Helper: crear tabla de traducción ---
  async function createTranslationTable(parentCollection, fields) {
    const translationCollection = `${parentCollection}_translations`;
    const parentField = `${parentCollection}_id`;

    await safeCreateCollection({
      collection: translationCollection,
      schema: { name: translationCollection },
      meta: { icon: 'translate', hidden: true, note: `Traducciones de ${parentCollection}` },
    });

    await safeCreateField(translationCollection, { field: parentField, type: 'integer', meta: { hidden: true }, schema: {} });
    await safeCreateField(translationCollection, { field: 'languages_code', type: 'string', meta: { interface: 'input', hidden: true }, schema: {} });

    for (const f of fields) {
      await safeCreateField(translationCollection, f);
    }

    await safeCreateField(parentCollection, {
      field: 'translations',
      type: 'alias',
      meta: { interface: 'translations', special: ['translations'], note: 'Traducciones' },
    });

    await safeCreateRelation({
      collection: translationCollection, field: parentField, related_collection: parentCollection,
      meta: { one_field: 'translations', junction_field: 'languages_code' },
      schema: { on_delete: 'CASCADE' },
    });

    await safeCreateRelation({
      collection: translationCollection, field: 'languages_code', related_collection: 'languages',
      meta: { junction_field: parentField },
      schema: { on_delete: 'CASCADE' },
    });
  }

  // Traducciones de productos
  await createTranslationTable('pim_products', [
    { field: 'name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'subtitle', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'description_short', type: 'text', meta: { interface: 'input-multiline' }, schema: {} },
    { field: 'description', type: 'text', meta: { interface: 'input-rich-text-html' }, schema: {} },
    { field: 'badge_text', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
  ]);

  // Traducciones de disciplinas
  await createTranslationTable('pim_disciplines', [
    { field: 'name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'description', type: 'text', meta: { interface: 'input-rich-text-html' }, schema: {} },
  ]);

  // Traducciones de blog
  await createTranslationTable('blog_posts', [
    { field: 'title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'excerpt', type: 'text', meta: { interface: 'input-multiline' }, schema: {} },
    { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html' }, schema: {} },
    { field: 'seo_title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'seo_description', type: 'text', meta: { interface: 'input-multiline', width: 'half' }, schema: {} },
  ]);

  // Traducciones de páginas
  await createTranslationTable('web_pages', [
    { field: 'title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'canvas_content', type: 'json', meta: { interface: 'input-code', options: { language: 'json' } }, schema: {} },
    { field: 'seo_title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
    { field: 'seo_description', type: 'text', meta: { interface: 'input-multiline', width: 'half' }, schema: {} },
  ]);

  // Traducciones de menús
  await createTranslationTable('sys_menus', [
    { field: 'title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
  ]);
}

// =============================================
// EJECUCIÓN PRINCIPAL
// =============================================
async function main() {
  console.log('============================================');
  console.log(' VIVAZ CLAY TARGETS - Setup Schema');
  console.log(' Directus:', DIRECTUS_URL);
  console.log('============================================');

  try {
    await setupCorporate();
    await setupPIM();
    await setupBlog();
    await setupCRM();
    await setupRegulation();
    await setupTranslations();

    console.log('\n============================================');
    console.log(' SETUP COMPLETADO');
    console.log(' Abre Directus en:', DIRECTUS_URL);
    console.log('============================================\n');
  } catch (err) {
    console.error('\n[FATAL]', err);
    process.exit(1);
  }
}

main();
