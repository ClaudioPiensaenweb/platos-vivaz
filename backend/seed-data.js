// ===========================================
// VIVAZ Clay Targets - Seed Data
// ===========================================

import { createDirectus, rest, staticToken, createItem, createItems, updateSingleton, readItems } from '@directus/sdk';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(ADMIN_TOKEN))
  .with(rest());

async function seedLanguages() {
  console.log('\n--- Idiomas ---');
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];
  try {
    await client.request(createItems('languages', languages));
    console.log('  [OK] Idiomas creados');
  } catch (e) {
    console.log('  [SKIP] Idiomas ya existen o error:', e.message?.substring(0, 80));
  }
}

async function seedDisciplines() {
  console.log('\n--- Disciplinas ---');
  const disciplines = [
    { name: 'American Trap', slug: 'american-trap', status: 'published', sort: 1 },
    { name: 'Universal Trap', slug: 'universal-trap', status: 'published', sort: 2 },
    { name: 'Double Trap', slug: 'double-trap', status: 'published', sort: 3 },
    { name: 'Olympic Skeet', slug: 'olympic-skeet', status: 'published', sort: 4 },
    { name: 'Sporting', slug: 'sporting', status: 'published', sort: 5 },
    { name: 'Compak Sporting', slug: 'compak-sporting', status: 'published', sort: 6 },
    { name: 'FITASC', slug: 'fitasc', status: 'published', sort: 7 },
    { name: 'Rabbit', slug: 'rabbit', status: 'published', sort: 8 },
    { name: 'Battue', slug: 'battue', status: 'published', sort: 9 },
  ];
  try {
    await client.request(createItems('pim_disciplines', disciplines));
    console.log('  [OK] Disciplinas creadas');
  } catch (e) {
    console.log('  [SKIP] Disciplinas ya existen o error:', e.message?.substring(0, 80));
  }
}

async function seedProducts() {
  console.log('\n--- Productos ---');
  const products = [
    {
      name: 'Natura Standard',
      slug: 'natura-standard',
      subtitle: 'The Premium Clay Target',
      range_category: 'Premium Natura',
      pah_level: '0 mg/kg - Free',
      material: 'Resina de Pino 100%',
      diameter_mm: 110,
      weight_g: 105,
      height_mm: 25,
      resin_pct: 100,
      issf_approved: true,
      color: 'Orange',
      badge_text: '100% Natural eco-friendly',
      description_short: 'Fabricado íntegramente con resina natural de pino, con contenido PAH de 0 mg/kg.',
      description: '<p>Fabricado íntegramente con resina natural de pino, con contenido PAH de 0 mg/kg. Desarrollado para ofrecer el máximo rendimiento en disciplinas ISSF y para tiradores que exigen la máxima precisión en cada lanzamiento.</p>',
      certifications: ['ISSF', 'FITASC', 'EU 2026'],
      featured: true,
      status: 'published',
      sort: 1,
      logistics_data: {
        box_units: 150,
        pallet_eu: { boxes: 55, total: 8250 },
        container_20: { pallets: 10, method: 'Sin paletizar', total: 197250 },
        container_40: { pallets: 24, type: 'Estándar', total: 234000 },
      },
    },
    {
      name: 'Natura Rabbit',
      slug: 'natura-rabbit',
      subtitle: 'Premium Rabbit Target',
      range_category: 'Premium Natura',
      pah_level: '0 mg/kg - Free',
      material: 'Resina de Pino 100%',
      diameter_mm: 110,
      weight_g: 105,
      height_mm: 25,
      resin_pct: 100,
      issf_approved: true,
      color: 'Orange',
      badge_text: '100% Natural eco-friendly',
      description_short: 'Plato Rabbit premium fabricado con resina de pino 100%. Diseño reforzado para lanzamiento de canto.',
      description: '<p>El Natura Rabbit está fabricado íntegramente con resina natural de pino (0 mg/kg PAH). Su diseño reforzado garantiza una resistencia superior al rodar por el suelo, ofreciendo la trayectoria impredecible característica de la disciplina Rabbit con la máxima fiabilidad.</p>',
      certifications: ['ISSF', 'EU 2026'],
      featured: false,
      status: 'published',
      sort: 2,
      logistics_data: {
        box_units: 150,
        pallet_eu: { boxes: 55, total: 8250 },
        container_20: { pallets: 10, method: 'Sin paletizar', total: 197250 },
        container_40: { pallets: 24, type: 'Estándar', total: 234000 },
      },
    },
    {
      name: 'Natura Battue',
      slug: 'natura-battue',
      subtitle: 'Premium Battue Target',
      range_category: 'Premium Natura',
      pah_level: '0 mg/kg - Free',
      material: 'Resina de Pino 100%',
      diameter_mm: 110,
      weight_g: 75,
      height_mm: 20,
      resin_pct: 100,
      issf_approved: false,
      color: 'Orange',
      badge_text: '100% Natural eco-friendly',
      description_short: 'Plato Battue premium con perfil plano para trayectorias impredecibles.',
      description: '<p>El Natura Battue presenta un perfil ultrafino que le confiere su característica trayectoria en espiral. Fabricado con resina de pino 100% (0 mg/kg PAH), es el plato preferido por los tiradores de Sporting y FITASC que buscan el máximo desafío con materiales completamente ecológicos.</p>',
      certifications: ['FITASC', 'EU 2026'],
      featured: false,
      status: 'published',
      sort: 3,
      logistics_data: {
        box_units: 150,
        pallet_eu: { boxes: 55, total: 8250 },
        container_20: { pallets: 10, method: 'Sin paletizar', total: 197250 },
        container_40: { pallets: 24, type: 'Estándar', total: 234000 },
      },
    },
    {
      name: 'Eco Star Standard',
      slug: 'eco-star-standard',
      subtitle: 'The Efficient Choice',
      range_category: 'Eco Star Efficiency',
      pah_level: '< 50 mg/kg - Compliant',
      material: 'Híbrido Ecológico',
      diameter_mm: 110,
      weight_g: 105,
      height_mm: 25,
      resin_pct: 85,
      issf_approved: false,
      color: 'Green',
      badge_text: 'Environmentally friendly',
      description_short: 'ECO STAR está diseñado para ofrecer una resistencia superior y un comportamiento impecable.',
      description: '<p>ECO STAR está diseñado para ofrecer una resistencia superior y un comportamiento impecable en lanzamientos largos y exigentes. Cumple con la normativa europea 2026.</p>',
      certifications: ['EU 2026'],
      featured: true,
      status: 'published',
      sort: 4,
      logistics_data: {
        box_units: 150,
        pallet_eu: { boxes: 55, total: 8250 },
        container_20: { pallets: 10, method: 'Sin paletizar', total: 197250 },
        container_40: { pallets: 24, type: 'Estándar', total: 234000 },
      },
    },
    {
      name: 'Eco Star Rabbit',
      slug: 'eco-star-rabbit',
      subtitle: 'Efficient Rabbit Target',
      range_category: 'Eco Star Efficiency',
      pah_level: '< 50 mg/kg - Compliant',
      material: 'Híbrido Ecológico',
      diameter_mm: 110,
      weight_g: 105,
      height_mm: 25,
      resin_pct: 85,
      issf_approved: false,
      color: 'Green',
      badge_text: 'Environmentally friendly',
      description_short: 'Plato Rabbit eficiente con materiales ecológicos conforme a normativa.',
      description: '<p>El Eco Star Rabbit combina la resistencia necesaria para la disciplina Rabbit con una composición ecológica que cumple la normativa UE 2026 (&lt;50 mg/kg PAH). Ideal para campos que buscan una opción eficiente y respetuosa con el medio ambiente.</p>',
      certifications: ['EU 2026'],
      featured: false,
      status: 'published',
      sort: 5,
      logistics_data: {
        box_units: 150,
        pallet_eu: { boxes: 55, total: 8250 },
        container_20: { pallets: 10, method: 'Sin paletizar', total: 197250 },
        container_40: { pallets: 24, type: 'Estándar', total: 234000 },
      },
    },
    {
      name: 'Midi 90',
      slug: 'midi-90',
      subtitle: 'Compact Clay Target',
      range_category: 'Special Formats',
      pah_level: '< 50 mg/kg - Compliant',
      material: 'Híbrido Ecológico',
      diameter_mm: 90,
      weight_g: 75,
      height_mm: 25,
      resin_pct: 85,
      issf_approved: false,
      color: 'Black',
      description_short: 'Plato de formato reducido (90mm) para disciplinas que requieren mayor dificultad.',
      description: '<p>El Midi 90 ofrece un objetivo de 90mm de diámetro que aumenta significativamente la dificultad respecto al plato estándar. Fabricado con materiales ecológicos conformes a la normativa 2026, es la elección perfecta para competiciones de Sporting y Compak Sporting que buscan añadir un reto extra.</p>',
      certifications: ['EU 2026'],
      featured: false,
      status: 'published',
      sort: 6,
      logistics_data: {
        box_units: 200,
        pallet_eu: { boxes: 60, total: 12000 },
        container_20: { pallets: 10, method: 'Sin paletizar', total: 240000 },
        container_40: { pallets: 24, type: 'Estándar', total: 288000 },
      },
    },
    {
      name: 'Mini 60',
      slug: 'mini-60',
      subtitle: 'Mini Clay Target',
      range_category: 'Special Formats',
      pah_level: '< 50 mg/kg - Compliant',
      material: 'Híbrido Ecológico',
      diameter_mm: 60,
      weight_g: 35,
      height_mm: 20,
      resin_pct: 85,
      issf_approved: false,
      color: 'Black',
      description_short: 'El plato más pequeño de la gama (60mm). Máxima dificultad y diversión.',
      description: '<p>El Mini 60 es el plato más pequeño de la gama Vivaz con tan solo 60mm de diámetro. Pensado para competiciones de Compak Sporting donde la dificultad es máxima, ofrece una experiencia de tiro única. Fabricado con materiales ecológicos conformes a la normativa UE 2026.</p>',
      certifications: ['EU 2026'],
      featured: false,
      status: 'published',
      sort: 7,
      logistics_data: {
        box_units: 250,
        pallet_eu: { boxes: 65, total: 16250 },
        container_20: { pallets: 10, method: 'Sin paletizar', total: 325000 },
        container_40: { pallets: 24, type: 'Estándar', total: 390000 },
      },
    },
  ];

  for (const product of products) {
    try {
      await client.request(createItem('pim_products', product));
      console.log(`  [OK] Producto "${product.name}" creado`);
    } catch (e) {
      console.log(`  [SKIP] Producto "${product.name}":`, e.message?.substring(0, 80));
    }
  }
}

async function seedBrand() {
  console.log('\n--- Marca (sys_brand) ---');
  try {
    await client.request(updateSingleton('sys_brand', {
      company_name: 'VIVAZ CLAY TARGETS',
      tagline: 'European Leaders in Ecological Clay Targets',
      phone_national: '+34-618-757-580',
      phone_export: '+34-606-172-746',
      email_national: 'admin@platosvivaz.com',
      email_export: 'sales@vivazclaytargets.com',
      whatsapp: '+34618757580',
      instagram_url: 'https://instagram.com/vivazclaytargets',
      color_primary: '#1B5E20',
      color_accent: '#E8732A',
      color_cream: '#F5F0E8',
      font_heading: 'Quablo',
      font_body: 'Manrope',
      founded_year: 1967,
      address: 'Ctra. de Hellín, km 2.5, 02520 Chinchilla de Monte-Aragón, Albacete, España',
    }));
    console.log('  [OK] sys_brand singleton actualizado');
  } catch (e) {
    console.log('  [SKIP] sys_brand:', e.message?.substring(0, 80));
  }
}

async function seedDisciplineLinks() {
  console.log('\n--- Vínculos Producto-Disciplina ---');
  try {
    const disciplines = await client.request(readItems('pim_disciplines', { fields: ['id', 'slug'], limit: -1 }));
    const products = await client.request(readItems('pim_products', { fields: ['id', 'slug'], limit: -1 }));

    const dMap = Object.fromEntries(disciplines.map(d => [d.slug, d.id]));
    const pMap = Object.fromEntries(products.map(p => [p.slug, p.id]));

    const links = [
      // natura-standard: American Trap, Universal Trap, Double Trap, Olympic Skeet, Sporting, FITASC
      ...['american-trap', 'universal-trap', 'double-trap', 'olympic-skeet', 'sporting', 'fitasc']
        .map(d => ({ pim_products_id: pMap['natura-standard'], pim_disciplines_id: dMap[d] })),
      // natura-rabbit: Rabbit, Sporting, FITASC
      ...['rabbit', 'sporting', 'fitasc']
        .map(d => ({ pim_products_id: pMap['natura-rabbit'], pim_disciplines_id: dMap[d] })),
      // natura-battue: Battue, Sporting, FITASC
      ...['battue', 'sporting', 'fitasc']
        .map(d => ({ pim_products_id: pMap['natura-battue'], pim_disciplines_id: dMap[d] })),
      // eco-star-standard: Sporting, Compak Sporting, FITASC
      ...['sporting', 'compak-sporting', 'fitasc']
        .map(d => ({ pim_products_id: pMap['eco-star-standard'], pim_disciplines_id: dMap[d] })),
      // eco-star-rabbit: Rabbit, Sporting, Compak Sporting
      ...['rabbit', 'sporting', 'compak-sporting']
        .map(d => ({ pim_products_id: pMap['eco-star-rabbit'], pim_disciplines_id: dMap[d] })),
      // midi-90: Sporting, Compak Sporting, FITASC
      ...['sporting', 'compak-sporting', 'fitasc']
        .map(d => ({ pim_products_id: pMap['midi-90'], pim_disciplines_id: dMap[d] })),
      // mini-60: Sporting, Compak Sporting
      ...['sporting', 'compak-sporting']
        .map(d => ({ pim_products_id: pMap['mini-60'], pim_disciplines_id: dMap[d] })),
    ].filter(link => link.pim_products_id && link.pim_disciplines_id);

    await client.request(createItems('pim_products_disciplines', links));
    console.log(`  [OK] ${links.length} vínculos disciplina creados`);
  } catch (e) {
    console.log('  [SKIP] Vínculos disciplina:', e.message?.substring(0, 80));
  }
}

async function seedRegulation() {
  console.log('\n--- Regulación ---');
  try {
    // For singletons, we use updateSingleton or createItem
    const { updateItem } = await import('@directus/sdk');
    await client.request(updateItem('web_regulation', 1, {
      limit_date: '2026-04-22',
      pah_limit_mg: 50,
      regulation_name: 'EU 2025/660',
      banned_substances: ['Brea', 'Alquitrán', 'Petróleo', 'PAH'],
      countdown_enabled: true,
    }));
    console.log('  [OK] Datos de regulación cargados');
  } catch (e) {
    console.log('  [SKIP] Regulación:', e.message?.substring(0, 80));
  }
}

async function seedMenus() {
  console.log('\n--- Menús ---');
  const menus = [
    { title: 'Productos', slug: 'productos', url: '/productos', sort: 1, status: 'published' },
    { title: 'Tecnología y Sostenibilidad', slug: 'tecnologia', url: '/tecnologia', sort: 2, status: 'published' },
    { title: 'Sobre Vivaz', slug: 'sobre-vivaz', url: '/sobre-vivaz', sort: 3, status: 'published' },
    { title: 'Noticias / Regulación 2026', slug: 'regulacion-2026', url: '/regulacion-2026', sort: 4, status: 'published' },
    { title: 'Contacto', slug: 'contacto', url: '/contacto', sort: 5, status: 'published' },
  ];
  try {
    await client.request(createItems('sys_menus', menus));
    console.log('  [OK] Menús creados');
  } catch (e) {
    console.log('  [SKIP] Menús ya existen o error:', e.message?.substring(0, 80));
  }
}

async function main() {
  console.log('============================================');
  console.log(' VIVAZ CLAY TARGETS - Seed Data');
  console.log('============================================');

  try {
    await seedLanguages();
    await seedDisciplines();
    await seedProducts();
    await seedDisciplineLinks();
    await seedBrand();
    await seedRegulation();
    await seedMenus();

    console.log('\n============================================');
    console.log(' SEED COMPLETADO');
    console.log('============================================\n');
  } catch (err) {
    console.error('\n[FATAL]', err);
    process.exit(1);
  }
}

main();
