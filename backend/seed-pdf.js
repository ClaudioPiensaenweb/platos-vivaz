// ===========================================
// VIVAZ Clay Targets - Upload Catalog PDF
// Ejecutar: node seed-pdf.js
// Sube Catalog-min.pdf a Directus y vincula UUID a sys_brand.catalog_pdf
// ===========================================

import { createDirectus, rest, staticToken, uploadFiles, updateSingleton } from '@directus/sdk';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
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

async function main() {
  console.log('============================================');
  console.log(' VIVAZ - Upload Catalog PDF');
  console.log(' Directus:', DIRECTUS_URL);
  console.log('============================================');

  const pdfPath = resolve(__dirname, '..', 'Catalog-min.pdf');
  console.log('  Reading PDF from:', pdfPath);

  let pdfBuffer;
  try {
    pdfBuffer = readFileSync(pdfPath);
    console.log('  [OK] PDF leído:', (pdfBuffer.length / 1024).toFixed(1), 'KB');
  } catch (e) {
    console.error('  [ERR] No se pudo leer el PDF:', e.message);
    process.exit(1);
  }

  const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

  const formData = new FormData();
  formData.append('title', 'Vivaz Clay Targets - Product Catalog');
  formData.append('filename_download', 'vivaz-catalog.pdf');
  formData.append('file', blob, 'vivaz-catalog.pdf');

  try {
    const file = await client.request(uploadFiles(formData));
    console.log('  [OK] PDF subido, UUID:', file.id);

    // Vincular UUID a sys_brand singleton
    await client.request(updateSingleton('sys_brand', {
      catalog_pdf: file.id,
    }));
    console.log('  [OK] sys_brand.catalog_pdf vinculado:', file.id);

    console.log('\n============================================');
    console.log(' UPLOAD COMPLETADO');
    console.log(' UUID del catálogo:', file.id);
    console.log('============================================\n');
  } catch (e) {
    if (e.message?.includes('already exists')) {
      console.log('  [SKIP] El PDF puede que ya exista:', e.message?.substring(0, 80));
    } else {
      console.error('  [ERR] Upload PDF:', e.message || e);
    }
  }
}

main();
