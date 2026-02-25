/**
 * Email HTML templates for contact form notifications.
 * Uses inline styles only — external CSS is not supported by email clients.
 * Brand colors: green (#1B5E20), accent (#E8732A), cream (#F5F0E8), white (#FFFFFF)
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

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 10px 16px; background-color: #F5F0E8; font-weight: bold; font-family: Arial, sans-serif; font-size: 14px; color: #333333; width: 160px; vertical-align: top; border-bottom: 1px solid #e0d8cc;">${label}</td>
      <td style="padding: 10px 16px; background-color: #ffffff; font-family: Arial, sans-serif; font-size: 14px; color: #444444; vertical-align: top; border-bottom: 1px solid #e0d8cc;">${value || "—"}</td>
    </tr>`;
}

export function generateAdminEmail(data: AdminEmailData): string {
  const timestamp = new Date().toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo contacto - VIVAZ Clay Targets</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color: #1B5E20; padding: 24px 32px;">
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 1px;">VIVAZ CLAY TARGETS</p>
              <p style="margin: 8px 0 0 0; font-family: Arial, sans-serif; font-size: 14px; color: rgba(255,255,255,0.85);">Nuevo contacto desde platosvivaz.com</p>
            </td>
          </tr>

          <!-- Contact Data Table -->
          <tr>
            <td style="padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row("Nombre", data.name)}
                ${row("Email", data.email)}
                ${row("Teléfono", data.phone)}
                ${row("Empresa", data.company)}
                ${row("Mercado", data.market)}
                ${row("Interés", data.interest)}
              </table>
            </td>
          </tr>

          <!-- Message Block -->
          <tr>
            <td style="padding: 20px 24px;">
              <p style="margin: 0 0 8px 0; font-family: Arial, sans-serif; font-size: 13px; font-weight: bold; color: #1B5E20; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p>
              <div style="background-color: #F5F0E8; border-left: 4px solid #E8732A; padding: 16px; border-radius: 4px; font-family: Arial, sans-serif; font-size: 14px; color: #444444; line-height: 1.6;">
                ${data.message ? data.message.replace(/\n/g, "<br>") : "<em>Sin mensaje</em>"}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F0E8; padding: 16px 24px; border-top: 1px solid #e0d8cc;">
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #888888;">
                Recibido el ${timestamp} · Página de origen: ${data.source_page || "Desconocida"}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateUserEmail(data: UserEmailData): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hemos recibido tu mensaje - VIVAZ Clay Targets</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color: #1B5E20; padding: 28px 32px; text-align: center;">
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 22px; font-weight: bold; color: #ffffff; letter-spacing: 2px;">VIVAZ CLAY TARGETS</p>
              <p style="margin: 6px 0 0 0; font-family: Arial, sans-serif; font-size: 12px; color: rgba(255,255,255,0.75); letter-spacing: 1px; text-transform: uppercase;">European Leaders in Ecological Clay Targets</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="margin: 0 0 16px 0; font-family: Arial, sans-serif; font-size: 16px; color: #333333;">Hola ${data.name},</p>
              <p style="margin: 0 0 16px 0; font-family: Arial, sans-serif; font-size: 15px; color: #555555; line-height: 1.7;">
                Hemos recibido tu mensaje correctamente. Nuestro equipo te contactara en las proximas <strong>24-48 horas</strong>.
              </p>
              <p style="margin: 0 0 24px 0; font-family: Arial, sans-serif; font-size: 15px; color: #555555; line-height: 1.7;">
                Mientras tanto, puedes contactarnos directamente:
              </p>

              <!-- Contact Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0E8; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px 24px; border-bottom: 1px solid #e0d8cc;">
                    <p style="margin: 0 0 4px 0; font-family: Arial, sans-serif; font-size: 11px; font-weight: bold; color: #1B5E20; text-transform: uppercase; letter-spacing: 0.5px;">Mercado Nacional</p>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #444444;">Tel: +34-618-757-580</p>
                    <p style="margin: 4px 0 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #444444;"><a href="mailto:admin@platosvivaz.com" style="color: #E8732A; text-decoration: none;">admin@platosvivaz.com</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 4px 0; font-family: Arial, sans-serif; font-size: 11px; font-weight: bold; color: #1B5E20; text-transform: uppercase; letter-spacing: 0.5px;">Export / Internacional</p>
                    <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #444444;">Tel: +34-606-172-746</p>
                    <p style="margin: 4px 0 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #444444;"><a href="mailto:sales@vivazclaytargets.com" style="color: #E8732A; text-decoration: none;">sales@vivazclaytargets.com</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1B5E20; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: rgba(255,255,255,0.8);">
                VIVAZ Clay Targets &mdash; European Leaders in Ecological Clay Targets
              </p>
              <p style="margin: 6px 0 0 0; font-family: Arial, sans-serif; font-size: 11px; color: rgba(255,255,255,0.6);">
                <a href="https://platosvivaz.com" style="color: rgba(255,255,255,0.7); text-decoration: none;">platosvivaz.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
