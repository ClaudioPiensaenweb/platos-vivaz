/**
 * Plantillas HTML de los correos del formulario de contacto.
 * Solo estilos en línea y tablas: los clientes de correo no admiten CSS externo.
 * Colores de marca (los mismos que globals.css): verde #075627, verde oscuro
 * #242e22, acento #f45b38, crema #f5f0e2. El logotipo es un PNG servido desde
 * la propia web, porque Gmail y Outlook no muestran SVG.
 */

interface AdminEmailData {
  name: string;
  email: string;
  phone: string;
  company: string;
  market: string;
  interest: string;
  message: string;
  source_page: string;
}

interface UserEmailData {
  name: string;
}

const SITE_URL = "https://platosvivaz.com";
const LOGO_URL = `${SITE_URL}/img/email/vivaz-logo-verde.png`;
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const VERDE = "#075627";
const VERDE_OSCURO = "#242e22";
const CREMA = "#f5f0e2";
const CREMA_CLARA = "#faf8ea";
const BORDE = "#e6dfcb";
const TEXTO = "#3b4239";
const TENUE = "#6b7280";

/** Lo que escribe el visitante nunca entra como HTML en el correo. */
function esc(v: string): string {
  return (v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(opts: {
  title: string;
  preheader: string;
  body: string;
  footer: string;
}): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <title>${opts.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${CREMA_CLARA}; font-family: ${FONT};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: ${CREMA_CLARA};">${opts.preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${CREMA_CLARA};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid ${BORDE}; border-radius: 12px;">
          <tr>
            <td style="padding: 28px 36px 24px 36px; border-bottom: 1px solid ${BORDE};">
              <a href="${SITE_URL}" style="text-decoration: none;">
                <img src="${LOGO_URL}" width="132" height="40" alt="VIVAZ" style="display: block; border: 0; outline: none; width: 132px; height: 40px;">
              </a>
            </td>
          </tr>
          ${opts.body}
          <tr>
            <td style="padding: 20px 36px; background-color: ${CREMA}; border-top: 1px solid ${BORDE}; border-radius: 0 0 12px 12px;">
              ${opts.footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function etiqueta(texto: string): string {
  return `<p style="margin: 0 0 6px 0; font-family: ${FONT}; font-size: 11px; font-weight: bold; color: ${TENUE}; text-transform: uppercase; letter-spacing: 0.8px;">${texto}</p>`;
}

function row(label: string, value: string, href?: string): string {
  const contenido = value
    ? href
      ? `<a href="${href}" style="color: ${VERDE}; text-decoration: none;">${esc(value)}</a>`
      : esc(value)
    : `<span style="color: ${TENUE};">No indicado</span>`;
  return `
                <tr>
                  <td style="padding: 11px 0; width: 120px; vertical-align: top; border-bottom: 1px solid ${BORDE}; font-family: ${FONT}; font-size: 13px; color: ${TENUE};">${label}</td>
                  <td style="padding: 11px 0; vertical-align: top; border-bottom: 1px solid ${BORDE}; font-family: ${FONT}; font-size: 15px; color: ${VERDE_OSCURO};">${contenido}</td>
                </tr>`;
}

export function generateAdminEmail(data: AdminEmailData): string {
  const timestamp = new Date().toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
    dateStyle: "full",
    timeStyle: "short",
  });
  const telefono = data.phone
    ? `tel:${data.phone.replace(/[^+\d]/g, "")}`
    : undefined;
  const asunto = encodeURIComponent("Re: tu consulta en VIVAZ Clay Targets");
  const mensaje = data.message
    ? esc(data.message).replace(/\n/g, "<br>")
    : `<span style="color: ${TENUE};">Sin mensaje</span>`;

  const body = `
          <tr>
            <td style="padding: 32px 36px 8px 36px;">
              ${etiqueta(`Nuevo contacto · ${esc(data.market) || "Internacional"}`)}
              <h1 style="margin: 0; font-family: ${FONT}; font-size: 24px; line-height: 1.3; font-weight: bold; color: ${VERDE_OSCURO};">${esc(data.name)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 36px 0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid ${BORDE};">
                ${row("Correo", data.email, `mailto:${data.email}`)}
                ${row("Teléfono", data.phone, telefono)}
                ${row("Empresa", data.company)}
                ${row("Interés", data.interest)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 36px 0 36px;">
              ${etiqueta("Mensaje")}
              <div style="padding: 16px 18px; background-color: ${CREMA_CLARA}; border: 1px solid ${BORDE}; border-radius: 8px; font-family: ${FONT}; font-size: 15px; line-height: 1.65; color: ${TEXTO};">${mensaje}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 36px 36px 36px;">
              <a href="mailto:${data.email}?subject=${asunto}" style="display: inline-block; padding: 12px 22px; background-color: ${VERDE}; border-radius: 8px; font-family: ${FONT}; font-size: 15px; font-weight: bold; color: #ffffff; text-decoration: none;">Responder a ${esc(data.name)}</a>
            </td>
          </tr>`;

  const footer = `<p style="margin: 0; font-family: ${FONT}; font-size: 12px; line-height: 1.6; color: ${TENUE};">Recibido el ${timestamp}<br>Página de origen: ${esc(data.source_page) || "No indicada"}</p>`;

  return layout({
    title: "Nuevo contacto - VIVAZ Clay Targets",
    preheader: `${esc(data.name)} ha escrito desde platosvivaz.com`,
    body,
    footer,
  });
}

function contacto(titulo: string, telefono: string, correo: string): string {
  return `
                  <td width="50%" style="padding: 18px 20px; vertical-align: top;">
                    ${etiqueta(titulo)}
                    <p style="margin: 0; font-family: ${FONT}; font-size: 15px; line-height: 1.7; color: ${VERDE_OSCURO};">
                      <a href="tel:${telefono.replace(/[^+\d]/g, "")}" style="color: ${VERDE_OSCURO}; text-decoration: none;">${telefono}</a><br>
                      <a href="mailto:${correo}" style="color: ${VERDE}; text-decoration: none;">${correo}</a>
                    </p>
                  </td>`;
}

export function generateUserEmail(data: UserEmailData): string {
  const body = `
          <tr>
            <td style="padding: 36px 36px 8px 36px;">
              <h1 style="margin: 0 0 16px 0; font-family: ${FONT}; font-size: 24px; line-height: 1.3; font-weight: bold; color: ${VERDE_OSCURO};">Hemos recibido tu mensaje</h1>
              <p style="margin: 0 0 14px 0; font-family: ${FONT}; font-size: 16px; line-height: 1.65; color: ${TEXTO};">Hola ${esc(data.name)}:</p>
              <p style="margin: 0; font-family: ${FONT}; font-size: 16px; line-height: 1.65; color: ${TEXTO};">Gracias por escribirnos. Nuestro equipo revisará tu consulta y te responderá en un plazo de <strong style="color: ${VERDE_OSCURO};">24 a 48 horas laborables</strong>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 36px 36px 36px;">
              <p style="margin: 0 0 12px 0; font-family: ${FONT}; font-size: 14px; line-height: 1.6; color: ${TENUE};">Si prefieres hablar antes con nosotros, estos son nuestros contactos directos:</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${CREMA_CLARA}; border: 1px solid ${BORDE}; border-radius: 8px;">
                <tr>
                  ${contacto("Mercado nacional", "+34 618 757 580", "info@platosvivaz.com")}
                  ${contacto("Exportación", "+34 606 172 746", "sales@vivazclaytargets.com")}
                </tr>
              </table>
            </td>
          </tr>`;

  const footer = `<p style="margin: 0; font-family: ${FONT}; font-size: 12px; line-height: 1.6; color: ${TENUE};"><strong style="color: ${VERDE_OSCURO};">VIVAZ Clay Targets</strong> · <a href="${SITE_URL}" style="color: ${VERDE}; text-decoration: none;">platosvivaz.com</a><br>Recibes este correo porque has enviado el formulario de contacto de nuestra web.</p>`;

  return layout({
    title: "Hemos recibido tu mensaje - VIVAZ Clay Targets",
    preheader: "Te responderemos en un plazo de 24 a 48 horas laborables.",
    body,
    footer,
  });
}
