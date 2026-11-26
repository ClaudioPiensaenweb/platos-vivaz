import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saludProfunda, tokenValido } from "@/lib/salud-profunda";

export const dynamic = "force-dynamic";

const CABECERAS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

// GET /api/salud — salud profunda del formulario de contacto.
// Protegida con SALUD_TOKEN (Authorization: Bearer <token>). Sin la variable
// responde 503; con un token incorrecto, 401. No guarda contactos ni envía correo.
export async function GET(request: Request) {
  const esperado = process.env.SALUD_TOKEN;
  if (!esperado) {
    return NextResponse.json({ error: "no_disponible" }, { status: 503, headers: CABECERAS });
  }
  if (!tokenValido(esperado, request.headers.get("authorization"))) {
    return NextResponse.json({ error: "no_autorizado" }, { status: 401, headers: CABECERAS });
  }

  const resultado = await saludProfunda({
    entorno: process.env,
    peticion: fetch,
    verificarSmtp: async ({ host, port, user, pass }) => {
      const transporte = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });
      try {
        await transporte.verify();
      } finally {
        transporte.close();
      }
    },
  });

  if (resultado.estado !== "ok") {
    const fallan = Object.entries(resultado.comprobaciones)
      .filter(([, c]) => !c.ok)
      .map(([nombre, c]) => `${nombre}:${c.detalle}`);
    console.error("Salud profunda: fallan", fallan.join(", "));
  }
  return NextResponse.json(resultado, { status: 200, headers: CABECERAS });
}
