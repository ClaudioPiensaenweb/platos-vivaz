import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ManageCookiesButton from "@/components/legal/ManageCookiesButton";
import { Link } from "@/i18n/navigation";
import { sharedOpenGraph } from "@/lib/metadata";
import type { Metadata } from "next";

// ── Content per locale ───────────────────────────────────────────
interface CookieRow {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
}
interface CookieCategory {
  heading: string;
  badge: string;
  description: string;
  cookies: CookieRow[];
}
interface PageContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  intro: string;
  categories: CookieCategory[];
  controlHeading: string;
  controlParagraphs: string[];
  manageBtnLabel: string;
  moreInfoHeading: string;
  moreInfoParagraphs: string[];
  tableHeaders: { name: string; provider: string; purpose: string; duration: string };
  privacyLinkLabel: string;
}

function getContent(locale: string): PageContent {
  const map: Record<string, PageContent> = {
    es: {
      title: "Política de Cookies",
      subtitle: "RGPD · LOPD · ePrivacy",
      lastUpdated: "Última actualización: mayo de 2026",
      intro: "Este sitio web utiliza cookies propias y de terceros. A continuación te explicamos qué cookies usamos, para qué y cómo puedes gestionarlas.",
      tableHeaders: { name: "Cookie", provider: "Proveedor", purpose: "Finalidad", duration: "Duración" },
      categories: [
        {
          heading: "Técnicas (necesarias)",
          badge: "Siempre activas",
          description: "Imprescindibles para el funcionamiento del sitio. Sin ellas, algunas funciones básicas no estarían disponibles. No requieren consentimiento (art. 22.2 LSSI-CE).",
          cookies: [
            { name: "vivaz-cookie-consent", provider: "Propio", purpose: "Almacena las preferencias de cookies del usuario", duration: "12 meses" },
            { name: "NEXT_LOCALE", provider: "Propio (Next.js)", purpose: "Recuerda el idioma seleccionado", duration: "Sesión" },
          ],
        },
        {
          heading: "Analíticas",
          badge: "Opcional",
          description: "Permiten medir el tráfico y analizar el comportamiento de los visitantes para mejorar el sitio. Los datos se recogen de forma anónima.",
          cookies: [
            { name: "_ga", provider: "Google Analytics", purpose: "Distingue usuarios únicos", duration: "2 años" },
            { name: "_ga_*", provider: "Google Analytics", purpose: "Persiste el estado de sesión", duration: "2 años" },
          ],
        },
        {
          heading: "Marketing",
          badge: "Opcional",
          description: "Permiten mostrar publicidad personalizada en otras plataformas y medir el rendimiento de campañas.",
          cookies: [
            { name: "_fbp", provider: "Meta (Facebook Pixel)", purpose: "Seguimiento de conversiones y remarketing", duration: "3 meses" },
            { name: "_gcl_au", provider: "Google Ads", purpose: "Medición de conversiones de Google Ads", duration: "3 meses" },
          ],
        },
      ],
      controlHeading: "¿Cómo gestionar tus preferencias?",
      controlParagraphs: [
        "Puedes aceptar o rechazar las cookies no esenciales en el panel de preferencias. Además, puedes configurarlas en cualquier momento desde este botón:",
        "También puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento del sitio.",
      ],
      manageBtnLabel: "Gestionar mis preferencias de cookies",
      moreInfoHeading: "Más información",
      moreInfoParagraphs: [
        "Para más información sobre el tratamiento de tus datos personales, consulta nuestra Política de Privacidad o escríbenos a info@platosvivaz.com.",
      ],
      privacyLinkLabel: "Política de Privacidad",
    },
    en: {
      title: "Cookie Policy",
      subtitle: "GDPR · LOPD · ePrivacy",
      lastUpdated: "Last updated: May 2026",
      intro: "This website uses first-party and third-party cookies. Below we explain which cookies we use, what they are for and how you can manage them.",
      tableHeaders: { name: "Cookie", provider: "Provider", purpose: "Purpose", duration: "Duration" },
      categories: [
        {
          heading: "Technical (necessary)",
          badge: "Always active",
          description: "Essential for the website to function. Without them, some basic features would not be available. No consent required (Art. 22.2 LSSI-CE).",
          cookies: [
            { name: "vivaz-cookie-consent", provider: "Own", purpose: "Stores the user's cookie preferences", duration: "12 months" },
            { name: "NEXT_LOCALE", provider: "Own (Next.js)", purpose: "Remembers the selected language", duration: "Session" },
          ],
        },
        {
          heading: "Analytics",
          badge: "Optional",
          description: "Allow us to measure traffic and analyse visitor behaviour to improve the site. Data is collected anonymously.",
          cookies: [
            { name: "_ga", provider: "Google Analytics", purpose: "Distinguishes unique users", duration: "2 years" },
            { name: "_ga_*", provider: "Google Analytics", purpose: "Persists session state", duration: "2 years" },
          ],
        },
        {
          heading: "Marketing",
          badge: "Optional",
          description: "Allow us to show personalised advertising on other platforms and measure campaign performance.",
          cookies: [
            { name: "_fbp", provider: "Meta (Facebook Pixel)", purpose: "Conversion tracking and remarketing", duration: "3 months" },
            { name: "_gcl_au", provider: "Google Ads", purpose: "Google Ads conversion measurement", duration: "3 months" },
          ],
        },
      ],
      controlHeading: "How to manage your preferences",
      controlParagraphs: [
        "You can accept or reject non-essential cookies in the preferences panel. You can also configure them at any time using this button:",
        "You can also configure your browser to block or delete cookies. Please note that disabling certain cookies may affect the functioning of the site.",
      ],
      manageBtnLabel: "Manage my cookie preferences",
      moreInfoHeading: "More information",
      moreInfoParagraphs: [
        "For more information about the processing of your personal data, please see our Privacy Policy or contact us at info@platosvivaz.com.",
      ],
      privacyLinkLabel: "Privacy Policy",
    },
    fr: {
      title: "Politique de Cookies",
      subtitle: "RGPD · LOPD · ePrivacy",
      lastUpdated: "Dernière mise à jour : mai 2026",
      intro: "Ce site web utilise des cookies propres et de tiers. Nous vous expliquons ci-dessous quels cookies nous utilisons, à quoi ils servent et comment vous pouvez les gérer.",
      tableHeaders: { name: "Cookie", provider: "Fournisseur", purpose: "Finalité", duration: "Durée" },
      categories: [
        {
          heading: "Techniques (nécessaires)",
          badge: "Toujours actifs",
          description: "Indispensables au fonctionnement du site. Sans eux, certaines fonctions de base ne seraient pas disponibles. Aucun consentement requis (art. 22.2 LSSI-CE).",
          cookies: [
            { name: "vivaz-cookie-consent", provider: "Propre", purpose: "Stocke les préférences de cookies de l'utilisateur", duration: "12 mois" },
            { name: "NEXT_LOCALE", provider: "Propre (Next.js)", purpose: "Mémorise la langue sélectionnée", duration: "Session" },
          ],
        },
        {
          heading: "Analytiques",
          badge: "Optionnel",
          description: "Permettent de mesurer le trafic et d'analyser le comportement des visiteurs pour améliorer le site. Les données sont collectées de manière anonyme.",
          cookies: [
            { name: "_ga", provider: "Google Analytics", purpose: "Distingue les utilisateurs uniques", duration: "2 ans" },
            { name: "_ga_*", provider: "Google Analytics", purpose: "Maintient l'état de session", duration: "2 ans" },
          ],
        },
        {
          heading: "Marketing",
          badge: "Optionnel",
          description: "Permettent d'afficher des publicités personnalisées sur d'autres plateformes et de mesurer les performances des campagnes.",
          cookies: [
            { name: "_fbp", provider: "Meta (Facebook Pixel)", purpose: "Suivi des conversions et remarketing", duration: "3 mois" },
            { name: "_gcl_au", provider: "Google Ads", purpose: "Mesure des conversions Google Ads", duration: "3 mois" },
          ],
        },
      ],
      controlHeading: "Comment gérer vos préférences ?",
      controlParagraphs: [
        "Vous pouvez accepter ou refuser les cookies non essentiels dans le panneau de préférences. Vous pouvez également les configurer à tout moment depuis ce bouton :",
        "Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies. Notez que la désactivation de certains cookies peut affecter le fonctionnement du site.",
      ],
      manageBtnLabel: "Gérer mes préférences de cookies",
      moreInfoHeading: "Plus d'informations",
      moreInfoParagraphs: [
        "Pour plus d'informations sur le traitement de vos données personnelles, consultez notre Politique de confidentialité ou écrivez-nous à info@platosvivaz.com.",
      ],
      privacyLinkLabel: "Politique de Confidentialité",
    },
    de: {
      title: "Cookie-Richtlinie",
      subtitle: "DSGVO · LOPD · ePrivacy",
      lastUpdated: "Letzte Aktualisierung: Mai 2026",
      intro: "Diese Website verwendet eigene Cookies und Cookies von Dritten. Im Folgenden erklären wir, welche Cookies wir verwenden, wofür sie da sind und wie Sie sie verwalten können.",
      tableHeaders: { name: "Cookie", provider: "Anbieter", purpose: "Zweck", duration: "Dauer" },
      categories: [
        {
          heading: "Technische (notwendig)",
          badge: "Immer aktiv",
          description: "Unerlässlich für das Funktionieren der Website. Ohne sie wären einige grundlegende Funktionen nicht verfügbar. Keine Einwilligung erforderlich (Art. 22.2 LSSI-CE).",
          cookies: [
            { name: "vivaz-cookie-consent", provider: "Eigener", purpose: "Speichert die Cookie-Einstellungen des Nutzers", duration: "12 Monate" },
            { name: "NEXT_LOCALE", provider: "Eigener (Next.js)", purpose: "Merkt sich die gewählte Sprache", duration: "Sitzung" },
          ],
        },
        {
          heading: "Analyse",
          badge: "Optional",
          description: "Ermöglichen die Messung des Datenverkehrs und die Analyse des Besucherverhaltens zur Verbesserung der Website. Daten werden anonym erhoben.",
          cookies: [
            { name: "_ga", provider: "Google Analytics", purpose: "Unterscheidet eindeutige Benutzer", duration: "2 Jahre" },
            { name: "_ga_*", provider: "Google Analytics", purpose: "Erhält den Sitzungsstatus aufrecht", duration: "2 Jahre" },
          ],
        },
        {
          heading: "Marketing",
          badge: "Optional",
          description: "Ermöglichen die Anzeige personalisierter Werbung auf anderen Plattformen und die Messung der Kampagnenleistung.",
          cookies: [
            { name: "_fbp", provider: "Meta (Facebook Pixel)", purpose: "Conversion-Tracking und Remarketing", duration: "3 Monate" },
            { name: "_gcl_au", provider: "Google Ads", purpose: "Google Ads Conversion-Messung", duration: "3 Monate" },
          ],
        },
      ],
      controlHeading: "Wie können Sie Ihre Einstellungen verwalten?",
      controlParagraphs: [
        "Sie können nicht wesentliche Cookies im Einstellungsbereich akzeptieren oder ablehnen. Sie können sie auch jederzeit über diese Schaltfläche konfigurieren:",
        "Sie können Ihren Browser auch so konfigurieren, dass Cookies blockiert oder gelöscht werden. Bitte beachten Sie, dass das Deaktivieren bestimmter Cookies die Funktionalität der Website beeinträchtigen kann.",
      ],
      manageBtnLabel: "Meine Cookie-Einstellungen verwalten",
      moreInfoHeading: "Weitere Informationen",
      moreInfoParagraphs: [
        "Weitere Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer Datenschutzerklärung oder schreiben Sie uns an info@platosvivaz.com.",
      ],
      privacyLinkLabel: "Datenschutzerklärung",
    },
  };
  return map[locale] ?? map.en;
}

// ── Metadata ─────────────────────────────────────────────────────
const metaMap: Record<string, { title: string; description: string }> = {
  es: { title: "Política de Cookies | VIVAZ Clay Targets", description: "Política de cookies de VIVAZ Clay Targets. Información sobre las cookies utilizadas y cómo gestionar tu consentimiento." },
  en: { title: "Cookie Policy | VIVAZ Clay Targets", description: "VIVAZ Clay Targets cookie policy. Information about the cookies used and how to manage your consent." },
  fr: { title: "Politique de Cookies | VIVAZ Clay Targets", description: "Politique de cookies de VIVAZ Clay Targets. Informations sur les cookies utilisés et comment gérer votre consentement." },
  de: { title: "Cookie-Richtlinie | VIVAZ Clay Targets", description: "Cookie-Richtlinie von VIVAZ Clay Targets. Informationen über verwendete Cookies und wie Sie Ihre Einwilligung verwalten können." },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaMap[locale] ?? metaMap.en;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { ...sharedOpenGraph, title: meta.title, description: meta.description },
  };
}

// ── Page ──────────────────────────────────────────────────────────
export default async function PoliticaCookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = getContent(locale);

  return (
    <main className="bg-cream">
      <PageHero title={c.title} subtitle={c.subtitle} />

      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 font-body text-[13px] text-muted italic">{c.lastUpdated}</p>
          <p className="mb-12 font-body text-[15px] leading-relaxed text-primary/80">{c.intro}</p>

          {/* Cookie categories */}
          <div className="flex flex-col gap-12">
            {c.categories.map((cat) => (
              <section key={cat.heading}>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h2 className="text-[18px] font-bold text-primary">{cat.heading}</h2>
                  <span
                    className={`rounded-full px-3 py-0.5 font-body text-[11px] font-semibold uppercase tracking-wide ${
                      cat.badge === "Siempre activas" || cat.badge === "Always active" || cat.badge === "Toujours actifs" || cat.badge === "Immer aktiv"
                        ? "bg-nature/20 text-primary"
                        : "bg-primary/10 text-primary/60"
                    }`}
                  >
                    {cat.badge}
                  </span>
                </div>
                <p className="mb-4 font-body text-[14px] leading-relaxed text-primary/70">
                  {cat.description}
                </p>

                {/* Responsive table */}
                <div className="overflow-x-auto rounded-xl border border-primary/10">
                  <table className="w-full min-w-[480px] font-body text-[13px]">
                    <thead>
                      <tr className="bg-primary/5 text-left">
                        <th className="px-4 py-2.5 font-semibold text-primary/60 w-[160px]">{c.tableHeaders.name}</th>
                        <th className="px-4 py-2.5 font-semibold text-primary/60">{c.tableHeaders.provider}</th>
                        <th className="px-4 py-2.5 font-semibold text-primary/60">{c.tableHeaders.purpose}</th>
                        <th className="px-4 py-2.5 font-semibold text-primary/60 w-[100px]">{c.tableHeaders.duration}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.cookies.map((row, i) => (
                        <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-primary/[0.02]"}>
                          <td className="px-4 py-2.5 font-mono text-[12px] text-primary/80 break-all">{row.name}</td>
                          <td className="px-4 py-2.5 text-primary/70">{row.provider}</td>
                          <td className="px-4 py-2.5 text-primary/70">{row.purpose}</td>
                          <td className="px-4 py-2.5 text-primary/70 whitespace-nowrap">{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>

          {/* Manage preferences */}
          <section className="mt-14">
            <h2 className="mb-3 text-[18px] font-bold text-primary">{c.controlHeading}</h2>
            <p className="mb-5 font-body text-[15px] leading-relaxed text-primary/80">
              {c.controlParagraphs[0]}
            </p>
            <ManageCookiesButton
              label={c.manageBtnLabel}
              className="inline-flex items-center rounded-full border-2 border-primary px-6 py-2.5 font-body text-[13px] font-semibold text-primary transition-colors hover:bg-primary hover:text-warm-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            {c.controlParagraphs[1] && (
              <p className="mt-5 font-body text-[15px] leading-relaxed text-primary/80">
                {c.controlParagraphs[1]}
              </p>
            )}
          </section>

          {/* More info */}
          <section className="mt-10">
            <h2 className="mb-3 text-[18px] font-bold text-primary">{c.moreInfoHeading}</h2>
            {c.moreInfoParagraphs.map((p, i) => (
              <p key={i} className="font-body text-[15px] leading-relaxed text-primary/80">{p}</p>
            ))}
          </section>

          {/* Related link */}
          <div className="mt-14 border-t border-primary/10 pt-8">
            <Link
              href="/politica-privacidad"
              className="font-body text-[14px] font-medium text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              → {c.privacyLinkLabel}
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
