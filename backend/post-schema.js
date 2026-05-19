// ===========================================
// VIVAZ - Post Schema: Public Read Permissions
// Directus 11.x uses Policies + Permissions
// ===========================================

import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

async function apiRequest(method, path, body) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

async function main() {
  console.log('=== Post Schema: Public Permissions (Directus 11.x) ===\n');

  // Step 1: Create a public access policy
  let policyId = null;

  // Check if a public policy already exists
  const existingPolicies = await apiRequest('GET', '/policies?filter[name][_eq]=Public%20Website%20Access');
  if (existingPolicies.ok && existingPolicies.data?.data?.length > 0) {
    policyId = existingPolicies.data.data[0].id;
    console.log(`  [SKIP] Policy already exists: ${policyId}`);
  } else {
    const policyResult = await apiRequest('POST', '/policies', {
      name: 'Public Website Access',
      description: 'Public read access for website frontend',
      admin_access: false,
      app_access: false,
    });

    if (policyResult.ok) {
      policyId = policyResult.data?.data?.id;
      console.log(`  [OK] Policy created: ${policyId}`);
    } else {
      console.error('  [ERR] Could not create policy:', JSON.stringify(policyResult.data));
      process.exit(1);
    }
  }

  // Step 2: Assign the policy to the public role (null role)
  // Get the public role
  const rolesResult = await apiRequest('GET', '/roles');
  let publicRoleId = null;

  if (rolesResult.ok) {
    // In Directus 11.x, we need to assign policy to public via access
    // The "public" role is represented by null in permissions
    // We create an access entry linking policy to null role
    const accessResult = await apiRequest('POST', '/access', {
      role: null,
      policy: policyId,
    });

    if (accessResult.ok) {
      console.log('  [OK] Policy assigned to public role');
    } else {
      const msg = JSON.stringify(accessResult.data?.errors?.[0]?.message || '');
      if (msg.includes('unique') || msg.includes('already')) {
        console.log('  [SKIP] Policy already assigned to public role');
      } else {
        console.log(`  [WARN] Access assignment: ${accessResult.status} - ${msg}`);
      }
    }
  }

  // Step 3: Create permissions for the policy
  const publicCollections = [
    'pim_products',
    'pim_disciplines',
    'pim_products_disciplines',
    'pim_products_translations',
    'pim_disciplines_translations',
    'blog_posts',
    'blog_categories',
    'blog_posts_translations',
    'web_pages',
    'web_pages_translations',
    'web_regulation',
    'sys_brand',
    'sys_skills',
    'sys_menus',
    'sys_menus_translations',
    'languages',
    'directus_files',
  ];

  for (const collection of publicCollections) {
    const result = await apiRequest('POST', '/permissions', {
      policy: policyId,
      collection,
      action: 'read',
      fields: ['*'],
    });

    if (result.ok) {
      console.log(`  [OK] Public read: ${collection}`);
    } else {
      const msg = JSON.stringify(result.data?.errors?.[0]?.message || '').substring(0, 80);
      if (msg.includes('unique') || msg.includes('already')) {
        console.log(`  [SKIP] ${collection}: already configured`);
      } else {
        console.log(`  [WARN] ${collection}: ${result.status} - ${msg}`);
      }
    }
  }

  // Public CREATE permission for crm_leads (forms)
  const result = await apiRequest('POST', '/permissions', {
    policy: policyId,
    collection: 'crm_leads',
    action: 'create',
    fields: ['name', 'email', 'phone', 'company', 'market', 'interest', 'message', 'source_page'],
  });

  if (result.ok) {
    console.log('  [OK] Public create: crm_leads');
  } else {
    console.log(`  [WARN] crm_leads create: ${result.status} - ${JSON.stringify(result.data?.errors?.[0]?.message || '').substring(0, 80)}`);
  }

  console.log('\n=== Post Schema complete ===\n');
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
