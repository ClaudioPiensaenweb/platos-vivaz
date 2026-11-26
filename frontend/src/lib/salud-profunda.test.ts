import test from "node:test";
import assert from "node:assert/strict";
import {
  comprobarCaptcha,
  comprobarDirectus,
  comprobarSmtp,
  saludProfunda,
  tokenValido,
  URL_TURNSTILE,
  type Dependencias,
} from "./salud-profunda.ts";

const SECRETO = "secreto-captcha-de-prueba";
const ENTORNO = {
  TURNSTILE_SECRET_KEY: SECRETO,
  DIRECTUS_ADMIN_TOKEN: "token-directus-de-prueba",
  DIRECTUS_INTERNAL_URL: "http://directus.prueba:8055",
  SMTP_HOST: "smtp.prueba",
  SMTP_USER: "web@prueba",
  SMTP_PASS: "clave-smtp-de-prueba",
};

const json = (cuerpo: unknown, status = 200) =>
  new Response(typeof cuerpo === "string" ? cuerpo : JSON.stringify(cuerpo), { status });

function dependencias(peticion: (url: string, init?: RequestInit) => Promise<Response>, extra: Partial<Dependencias> = {}): Dependencias {
  return {
    entorno: ENTORNO,
    peticion: peticion as typeof fetch,
    verificarSmtp: async () => {},
    ...extra,
  };
}

const captchaBueno = () => json({ success: false, "error-codes": ["invalid-input-response"] });

test("captcha: token falso rechazado con secreto válido es sano", async () => {
  assert.deepEqual(await comprobarCaptcha(dependencias(async () => captchaBueno())), { ok: true, detalle: "ok" });
});

test("captcha: la dirección inexistente de mayo (404) se detecta", async () => {
  const visto: string[] = [];
  const d = dependencias(async (url) => {
    visto.push(url);
    return json("not found", 404);
  });
  assert.deepEqual(await comprobarCaptcha(d), { ok: false, detalle: "http_404" });
  assert.equal(visto[0], URL_TURNSTILE);
  assert.match(URL_TURNSTILE, /\/turnstile\/v0\/siteverify$/);
});

test("captcha: secreto rechazado, cuerpo no JSON, cuerpo raro, sin red y sin secreto", async () => {
  const secretoMalo = dependencias(async () => json({ success: false, "error-codes": ["invalid-input-secret"] }));
  assert.equal((await comprobarCaptcha(secretoMalo)).detalle, "secreto_rechazado");
  const secretoMalo400 = dependencias(async () => json({ success: false, "error-codes": ["invalid-input-secret"] }, 400));
  assert.equal((await comprobarCaptcha(secretoMalo400)).detalle, "secreto_rechazado");
  assert.equal((await comprobarCaptcha(dependencias(async () => json("<html>")))).detalle, "respuesta_no_json");
  assert.equal((await comprobarCaptcha(dependencias(async () => json({ x: 1 })))).detalle, "cuerpo_inesperado");
  assert.equal((await comprobarCaptcha(dependencias(async () => json({ success: true })))).detalle, "acepta_token_falso");
  const sinRed = dependencias(async () => {
    throw new TypeError("fetch failed");
  });
  assert.equal((await comprobarCaptcha(sinRed)).detalle, "sin_conexion_TypeError");
  const sinSecreto = { ...dependencias(async () => captchaBueno()), entorno: {} };
  assert.equal((await comprobarCaptcha(sinSecreto)).detalle, "sin_secreto");
});

test("directus: consulta de solo lectura con el token; detecta token, tabla y caída", async () => {
  const llamadas: { url: string; init?: RequestInit }[] = [];
  const bueno = dependencias(async (url, init) => {
    llamadas.push({ url, init });
    return json({ data: [] });
  });
  assert.equal((await comprobarDirectus(bueno)).ok, true);
  assert.match(llamadas[0].url, /^http:\/\/directus\.prueba:8055\/items\/crm_leads\?/);
  assert.notEqual(llamadas[0].init?.method, "POST");
  assert.equal((await comprobarDirectus(dependencias(async () => json({}, 401)))).detalle, "token_rechazado_401");
  assert.equal((await comprobarDirectus(dependencias(async () => json({}, 403)))).detalle, "token_rechazado_403");
  assert.equal((await comprobarDirectus(dependencias(async () => json({}, 404)))).detalle, "tabla_inexistente");
  assert.equal((await comprobarDirectus(dependencias(async () => json({}, 502)))).detalle, "http_502");
  const sinToken = { ...bueno, entorno: {} };
  assert.equal((await comprobarDirectus(sinToken)).detalle, "sin_token");
});

test("smtp: verifica sin enviar; detecta autenticación, conexión y falta de configuración", async () => {
  const bueno = dependencias(async () => captchaBueno());
  assert.equal((await comprobarSmtp(bueno)).ok, true);
  const auth = dependencias(async () => captchaBueno(), {
    verificarSmtp: async () => {
      throw Object.assign(new Error(`Invalid login ${ENTORNO.SMTP_PASS}`), { code: "EAUTH" });
    },
  });
  assert.deepEqual(await comprobarSmtp(auth), { ok: false, detalle: "autenticacion_rechazada" });
  const caido = dependencias(async () => captchaBueno(), {
    verificarSmtp: async () => {
      throw Object.assign(new Error("x"), { code: "ECONNREFUSED" });
    },
  });
  assert.equal((await comprobarSmtp(caido)).detalle, "sin_conexion_ECONNREFUSED");
  assert.equal((await comprobarSmtp({ ...bueno, entorno: {} })).detalle, "sin_configurar");
});

test("saludProfunda: un resultado por dependencia y sin filtrar secretos", async () => {
  const d = dependencias(async (url) => (url.startsWith(URL_TURNSTILE) ? json("no", 404) : json({ data: [] })));
  const r = await saludProfunda(d);
  assert.equal(r.estado, "error");
  assert.deepEqual(r.comprobaciones.captcha, { ok: false, detalle: "http_404" });
  assert.equal(r.comprobaciones.base_datos.ok, true);
  assert.equal(r.comprobaciones.correo.ok, true);
  const texto = JSON.stringify(r);
  for (const secreto of [SECRETO, ENTORNO.DIRECTUS_ADMIN_TOKEN, ENTORNO.SMTP_PASS, "directus.prueba"]) {
    assert.ok(!texto.includes(secreto));
  }
});

test("saludProfunda: todo sano da ok", async () => {
  const d = dependencias(async (url) => (url.startsWith(URL_TURNSTILE) ? captchaBueno() : json({ data: [] })));
  assert.equal((await saludProfunda(d)).estado, "ok");
});

test("tokenValido: exige coincidencia exacta con Bearer", () => {
  assert.equal(tokenValido("abc", "Bearer abc"), true);
  assert.equal(tokenValido("abc", "Bearer abd"), false);
  assert.equal(tokenValido("abc", "abc"), false);
  assert.equal(tokenValido("abc", null), false);
  assert.equal(tokenValido(undefined, "Bearer "), false);
  assert.equal(tokenValido("", "Bearer "), false);
});
