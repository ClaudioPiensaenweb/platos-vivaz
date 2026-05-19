const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://directus:8055';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DESIRED_TOKEN = process.env.ADMIN_TOKEN;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !DESIRED_TOKEN) {
  console.error('ERROR: ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_TOKEN env vars are required.');
  console.error('Set them in .env or docker-compose.yml — never hardcode credentials.');
  process.exit(1);
}

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}

async function bootstrap() {
  console.log('=== Docker Init: Bootstrap Admin Token ===');
  console.log('Directus URL:', DIRECTUS_URL);

  console.log('\n1. Logging in as admin...');
  const loginRes = await jsonFetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!loginRes.ok) {
    console.error('Login failed:', JSON.stringify(loginRes.data));
    process.exit(1);
  }

  const accessToken = loginRes.data.data.access_token;
  console.log('  [OK] Logged in successfully');

  console.log('\n2. Finding admin user...');
  const usersRes = await jsonFetch(`${DIRECTUS_URL}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!usersRes.ok) {
    console.error('Failed to get user:', JSON.stringify(usersRes.data));
    process.exit(1);
  }

  const adminId = usersRes.data.data.id;
  const existingToken = usersRes.data.data.token;
  console.log('  [OK] Admin user ID:', adminId);

  if (existingToken === DESIRED_TOKEN) {
    console.log('\n3. [SKIP] Static token already set');
  } else {
    console.log('\n3. Setting static admin token...');
    const tokenRes = await jsonFetch(`${DIRECTUS_URL}/users/${adminId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ token: DESIRED_TOKEN }),
    });

    if (!tokenRes.ok) {
      console.error('Failed to set token:', JSON.stringify(tokenRes.data));
      process.exit(1);
    }
    console.log('  [OK] Static token set');
  }

  console.log('\n4. Verifying static token...');
  const verifyRes = await jsonFetch(`${DIRECTUS_URL}/users/me`, {
    headers: { Authorization: `Bearer ${DESIRED_TOKEN}` },
  });

  if (!verifyRes.ok) {
    console.error('Token verification failed:', JSON.stringify(verifyRes.data));
    process.exit(1);
  }
  console.log('  [OK] Static token verified');
  console.log('\n=== Bootstrap complete ===\n');
}

bootstrap().catch(err => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
