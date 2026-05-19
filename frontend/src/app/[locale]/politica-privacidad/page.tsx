import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { Link } from "@/i18n/navigation";
import { sharedOpenGraph } from "@/lib/metadata";
import type { Metadata } from "next";

// ── Content per locale ───────────────────────────────────────────
interface Section {
  heading: string;
  paragraphs: string[];
}
interface PageContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  cookieLinkLabel: string;
  legalLinkLabel: string;
}

const COMPANY = "JESÚS Y VICENTE VÁZQUEZ S.L.";
const NIF = "B21237425";
const ADDRESS = "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), España";
const EMAIL = "info@platosvivaz.com";

function getContent(locale: string): PageContent {
  const map: Record<string, PageContent> = {
    es: {
      title: "Política de Privacidad",
      subtitle: "RGPD · LOPD-GDD",
      lastUpdated: "Última actualización: mayo de 2026",
      cookieLinkLabel: "Política de Cookies",
      legalLinkLabel: "Aviso Legal",
      sections: [
        {
          heading: "Responsable del tratamiento",
          paragraphs: [
            `${COMPANY} — NIF: ${NIF}`,
            ADDRESS,
            EMAIL,
          ],
        },
        {
          heading: "Datos personales que tratamos",
          paragraphs: [
            "Los datos recabados a través del formulario de contacto: nombre, apellidos, correo electrónico, teléfono, empresa, mercado de interés y mensaje.",
            "No se recogen datos especialmente sensibles ni se toman decisiones automatizadas.",
          ],
        },
        {
          heading: "Finalidad y base jurídica",
          paragraphs: [
            "Gestionar tu solicitud de información o pedido — art. 6.1.b RGPD (ejecución de medidas precontractuales).",
            "Enviar comunicaciones comerciales si nos das tu consentimiento expreso — art. 6.1.a RGPD.",
          ],
        },
        {
          heading: "Destinatarios",
          paragraphs: [
            "Los datos no serán cedidos a terceros salvo obligación legal o a proveedores de servicios que actúan como encargados del tratamiento (hosting, plataforma de email).",
          ],
        },
        {
          heading: "Conservación",
          paragraphs: [
            "Los datos se conservan durante el tiempo necesario para gestionar tu solicitud y, en su caso, durante los plazos legalmente establecidos (mínimo 3 años para comunicaciones comerciales).",
          ],
        },
        {
          heading: "Tus derechos",
          paragraphs: [
            `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiéndote a ${EMAIL} o mediante escrito a la dirección postal indicada, adjuntando copia de tu DNI/NIE.`,
            "Si consideras que el tratamiento no cumple la normativa vigente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
          ],
        },
        {
          heading: "Cookies y tecnologías de seguimiento",
          paragraphs: [
            "Para información completa sobre las cookies que utilizamos y cómo gestionarlas, consulta nuestra Política de Cookies.",
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      subtitle: "GDPR · LOPD-GDD",
      lastUpdated: "Last updated: May 2026",
      cookieLinkLabel: "Cookie Policy",
      legalLinkLabel: "Legal Notice",
      sections: [
        {
          heading: "Data Controller",
          paragraphs: [
            `${COMPANY} — NIF: ${NIF}`,
            "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), Spain",
            EMAIL,
          ],
        },
        {
          heading: "Personal data we process",
          paragraphs: [
            "Data collected through the contact form: first name, surname, email, phone, company, market of interest and message.",
            "No special category data is collected and no automated decision-making takes place.",
          ],
        },
        {
          heading: "Purpose and legal basis",
          paragraphs: [
            "To handle your information request or order — Art. 6(1)(b) GDPR (pre-contractual measures).",
            "To send commercial communications if you give your express consent — Art. 6(1)(a) GDPR.",
          ],
        },
        {
          heading: "Recipients",
          paragraphs: [
            "Data will not be shared with third parties unless legally required or with service providers acting as processors (hosting, email platform).",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "Data is retained for as long as necessary to handle your request and, where applicable, for the legally established periods (minimum 3 years for commercial communications).",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You may exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${EMAIL} or to the postal address above, enclosing a copy of your ID document.`,
            "If you believe that processing does not comply with applicable law, you may lodge a complaint with the Spanish Data Protection Authority (www.aepd.es).",
          ],
        },
        {
          heading: "Cookies and tracking technologies",
          paragraphs: [
            "For full information about the cookies we use and how to manage them, please see our Cookie Policy.",
          ],
        },
      ],
    },
    fr: {
      title: "Politique de Confidentialité",
      subtitle: "RGPD · LOPD-GDD",
      lastUpdated: "Dernière mise à jour : mai 2026",
      cookieLinkLabel: "Politique de cookies",
      legalLinkLabel: "Mentions légales",
      sections: [
        {
          heading: "Responsable du traitement",
          paragraphs: [
            `${COMPANY} — NIF : ${NIF}`,
            "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), Espagne",
            EMAIL,
          ],
        },
        {
          heading: "Données personnelles traitées",
          paragraphs: [
            "Données collectées via le formulaire de contact : prénom, nom, e-mail, téléphone, entreprise, marché d'intérêt et message.",
            "Aucune donnée sensible n'est collectée et aucune prise de décision automatisée n'est effectuée.",
          ],
        },
        {
          heading: "Finalité et base juridique",
          paragraphs: [
            "Traiter votre demande d'information ou de commande — art. 6.1.b RGPD (mesures précontractuelles).",
            "Vous envoyer des communications commerciales si vous donnez votre consentement exprès — art. 6.1.a RGPD.",
          ],
        },
        {
          heading: "Destinataires",
          paragraphs: [
            "Les données ne seront pas cédées à des tiers sauf obligation légale ou à des prestataires de services agissant comme sous-traitants (hébergement, plateforme e-mail).",
          ],
        },
        {
          heading: "Conservation",
          paragraphs: [
            "Les données sont conservées le temps nécessaire pour traiter votre demande et, le cas échéant, pendant les délais légalement établis (minimum 3 ans pour les communications commerciales).",
          ],
        },
        {
          heading: "Vos droits",
          paragraphs: [
            `Vous pouvez exercer vos droits d'accès, de rectification, de suppression, d'opposition, de limitation et de portabilité en écrivant à ${EMAIL} ou à l'adresse postale ci-dessus, en joignant une copie de votre pièce d'identité.`,
            "Si vous estimez que le traitement n'est pas conforme à la réglementation en vigueur, vous pouvez introduire une réclamation auprès de l'Agence espagnole de protection des données (www.aepd.es).",
          ],
        },
        {
          heading: "Cookies et technologies de suivi",
          paragraphs: [
            "Pour des informations complètes sur les cookies que nous utilisons et comment les gérer, consultez notre Politique de cookies.",
          ],
        },
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      subtitle: "DSGVO · LOPD-GDD",
      lastUpdated: "Letzte Aktualisierung: Mai 2026",
      cookieLinkLabel: "Cookie-Richtlinie",
      legalLinkLabel: "Impressum",
      sections: [
        {
          heading: "Verantwortlicher",
          paragraphs: [
            `${COMPANY} — NIF: ${NIF}`,
            "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), Spanien",
            EMAIL,
          ],
        },
        {
          heading: "Verarbeitete personenbezogene Daten",
          paragraphs: [
            "Über das Kontaktformular erhobene Daten: Vorname, Nachname, E-Mail, Telefon, Unternehmen, Marktinteresse und Nachricht.",
            "Es werden keine besonderen Kategorien personenbezogener Daten erhoben und keine automatisierten Entscheidungen getroffen.",
          ],
        },
        {
          heading: "Zweck und Rechtsgrundlage",
          paragraphs: [
            "Bearbeitung Ihrer Informations- oder Bestellanfrage — Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).",
            "Versand kommerzieller Mitteilungen, sofern Sie Ihre ausdrückliche Einwilligung erteilen — Art. 6 Abs. 1 lit. a DSGVO.",
          ],
        },
        {
          heading: "Empfänger",
          paragraphs: [
            "Daten werden nur dann an Dritte weitergegeben, wenn dies gesetzlich vorgeschrieben ist oder Dienstleister als Auftragsverarbeiter tätig werden (Hosting, E-Mail-Plattform).",
          ],
        },
        {
          heading: "Speicherdauer",
          paragraphs: [
            "Die Daten werden so lange aufbewahrt, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist, und ggf. für die gesetzlich vorgeschriebenen Fristen (mindestens 3 Jahre für kommerzielle Mitteilungen).",
          ],
        },
        {
          heading: "Ihre Rechte",
          paragraphs: [
            `Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung, Widerspruch, Einschränkung und Datenübertragbarkeit geltend machen, indem Sie an ${EMAIL} oder an die oben genannte Postanschrift schreiben und eine Kopie Ihres Ausweisdokuments beifügen.`,
            "Wenn Sie der Ansicht sind, dass die Verarbeitung nicht den geltenden Vorschriften entspricht, können Sie eine Beschwerde bei der spanischen Datenschutzbehörde (www.aepd.es) einreichen.",
          ],
        },
        {
          heading: "Cookies und Tracking-Technologien",
          paragraphs: [
            "Vollständige Informationen über die von uns verwendeten Cookies und deren Verwaltung finden Sie in unserer Cookie-Richtlinie.",
          ],
        },
      ],
    },
  };
  return map[locale] ?? map.en;
}

// ── Metadata ─────────────────────────────────────────────────────
const metaMap: Record<string, { title: string; description: string }> = {
  es: { title: "Política de Privacidad | VIVAZ Clay Targets", description: "Política de privacidad de VIVAZ Clay Targets. Información sobre el tratamiento de tus datos personales conforme al RGPD y la LOPD-GDD." },
  en: { title: "Privacy Policy | VIVAZ Clay Targets", description: "VIVAZ Clay Targets privacy policy. Information about the processing of your personal data in accordance with GDPR and LOPD-GDD." },
  fr: { title: "Politique de Confidentialité | VIVAZ Clay Targets", description: "Politique de confidentialité de VIVAZ Clay Targets. Informations sur le traitement de vos données personnelles conformément au RGPD." },
  de: { title: "Datenschutzerklärung | VIVAZ Clay Targets", description: "Datenschutzerklärung von VIVAZ Clay Targets. Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO und LOPD-GDD." },
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
export default async function PoliticaPrivacidadPage({
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

          <div className="flex flex-col gap-10">
            {c.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-3 text-[18px] font-bold text-primary">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-2">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="font-body text-[15px] leading-relaxed text-primary/80">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Related links */}
          <div className="mt-14 flex flex-wrap gap-4 border-t border-primary/10 pt-8">
            <Link
              href="/politica-cookies"
              className="font-body text-[14px] font-medium text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              → {c.cookieLinkLabel}
            </Link>
            <Link
              href="/aviso-legal"
              className="font-body text-[14px] font-medium text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              → {c.legalLinkLabel}
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
