// Salud profunda del formulario de contacto.
// Comprueba, sin efectos, cada dependencia que necesita un envío:
// captcha (Turnstile), Directus (tabla crm_leads) y SMTP. No guarda contactos
// ni envía correos. Los detalles son códigos cortos: nunca hosts ni secretos.

export const URL_TURNSTILE = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const ESPERA_MS = 5000;
const TOKEN_FALSO = "salud-profunda-token-invalido";

export type Resultado = { ok: boolean; detalle: string };

export type Dependencias = {
  entorno: Record<string, string | undefined>;
  peticion: typeof fetch;
  verificarSmtp: (config: {
    host: string;
    port: number;
    user: string;
    pass: string;
  }) => Promise<void>;
};

const ok = (): Resultado => ({ ok: true, detalle: "ok" });
const fallo = (detalle: string): Resultado => ({ ok: false, detalle });

export function urlDirectus(entorno: Dependencias["entorno"]): string {
  return (
    entorno.DIRECTUS_INTERNAL_URL ||
    entorno.NEXT_PUBLIC_DIRECTUS_URL ||
    "http://localhost:8055"
  );
}

function esSecretoRechazado(cuerpo: unknown): boolean {
  const codigos = (cuerpo as { "error-codes"?: unknown } | null)?.["error-codes"];
  return (
    Array.isArray(codigos) &&
    codigos.some((c) => c === "invalid-input-secret" || c === "missing-input-secret")
  );
}

export async function comprobarCaptcha(d: Dependencias): Promise<Resultado> {
  const secreto = d.entorno.TURNSTILE_SECRET_KEY;
  if (!secreto) return fallo("sin_secreto");
  try {
    const res = await d.peticion(URL_TURNSTILE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: secreto, response: TOKEN_FALSO }),
      signal: AbortSignal.timeout(ESPERA_MS),
    });
    let cuerpo: unknown;
    try {
      cuerpo = await res.json();
    } catch {
      return fallo(res.ok ? "respuesta_no_json" : `http_${res.status}`);
    }
    if (!res.ok && !esSecretoRechazado(cuerpo)) return fallo(`http_${res.status}`);
    const datos = cuerpo as { success?: unknown; "error-codes"?: unknown };
    if (!datos || typeof datos.success !== "boolean") return fallo("cuerpo_inesperado");
    if (datos.success) return fallo("acepta_token_falso");
    if (esSecretoRechazado(datos)) return fallo("secreto_rechazado");
    return ok();
  } catch (error) {
    return fallo(`sin_conexion_${error instanceof Error ? error.name : "error"}`);
  }
}

export async function comprobarDirectus(d: Dependencias): Promise<Resultado> {
  const token = d.entorno.DIRECTUS_ADMIN_TOKEN;
  if (!token) return fallo("sin_token");
  try {
    const res = await d.peticion(
      `${urlDirectus(d.entorno)}/items/crm_leads?limit=1&fields=id`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(ESPERA_MS),
      },
    );
    if (res.status === 401 || res.status === 403) return fallo(`token_rechazado_${res.status}`);
    if (res.status === 404) return fallo("tabla_inexistente");
    if (!res.ok) return fallo(`http_${res.status}`);
    return ok();
  } catch (error) {
    return fallo(`sin_conexion_${error instanceof Error ? error.name : "error"}`);
  }
}

export async function comprobarSmtp(d: Dependencias): Promise<Resultado> {
  const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass } = d.entorno;
  if (!host || !user || !pass) return fallo("sin_configurar");
  const port = parseInt(d.entorno.SMTP_PORT || "465", 10);
  try {
    await Promise.race([
      d.verificarSmtp({ host, port, user, pass }),
      new Promise((_, rechazar) =>
        setTimeout(() => rechazar(new Error("tiempo_agotado")), ESPERA_MS + 1000),
      ),
    ]);
    return ok();
  } catch (error) {
    const codigo = (error as { code?: string; responseCode?: number })?.code;
    const respuesta = (error as { responseCode?: number })?.responseCode;
    if (codigo === "EAUTH" || respuesta === 535) return fallo("autenticacion_rechazada");
    return fallo(`sin_conexion_${codigo || (error instanceof Error ? error.name : "error")}`);
  }
}

export async function saludProfunda(d: Dependencias) {
  const [captcha, directus, correo] = await Promise.all([
    comprobarCaptcha(d),
    comprobarDirectus(d),
    comprobarSmtp(d),
  ]);
  const comprobaciones = { captcha, base_datos: directus, correo };
  const estado = Object.values(comprobaciones).every((c) => c.ok) ? "ok" : "error";
  return { estado, comprobaciones };
}

export function tokenValido(esperado: string | undefined, cabecera: string | null): boolean {
  if (!esperado || !cabecera) return false;
  const a = new TextEncoder().encode(cabecera);
  const b = new TextEncoder().encode(`Bearer ${esperado}`);
  if (a.length !== b.length) return false;
  let diferencia = 0;
  for (let i = 0; i < a.length; i++) diferencia |= a[i] ^ b[i];
  return diferencia === 0;
}
