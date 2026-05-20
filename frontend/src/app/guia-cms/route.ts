import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Sirve la guía de formación del CMS como HTML standalone con charset correcto.
// El archivo vive en public/guia-cms.html — copiado al runner por el Dockerfile.
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "guia-cms.html");
  const html = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      // No indexar — es un documento interno de formación
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
