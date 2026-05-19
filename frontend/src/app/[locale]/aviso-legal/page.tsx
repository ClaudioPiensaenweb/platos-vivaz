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
  privacyLinkLabel: string;
  cookieLinkLabel: string;
}

const COMPANY = "JESÚS Y VICENTE VÁZQUEZ S.L.";
const NIF = "B21237425";
const ADDRESS_ES = "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), España";
const ADDRESS_EN = "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), Spain";
const ADDRESS_FR = "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), Espagne";
const ADDRESS_DE = "C/ Jesús Sánchez Martín nº 3, 21360 Repilado (Huelva), Spanien";
const EMAIL = "info@platosvivaz.com";
const WEBSITE = "www.platosvivaz.com";

function getContent(locale: string): PageContent {
  const map: Record<string, PageContent> = {
    es: {
      title: "Aviso Legal",
      subtitle: "LSSI-CE",
      lastUpdated: "Última actualización: mayo de 2026",
      privacyLinkLabel: "Política de Privacidad",
      cookieLinkLabel: "Política de Cookies",
      sections: [
        {
          heading: "Datos identificativos",
          paragraphs: [
            `En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:`,
            `Titular: ${COMPANY}`,
            `NIF: ${NIF}`,
            `Domicilio: ${ADDRESS_ES}`,
            `Correo electrónico: ${EMAIL}`,
            `Sitio web: ${WEBSITE}`,
          ],
        },
        {
          heading: "Propiedad intelectual e industrial",
          paragraphs: [
            `Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseño gráfico y código fuente) son propiedad de ${COMPANY} o de terceros que han autorizado expresamente su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.`,
            "Queda expresamente prohibida su reproducción total o parcial, distribución, comunicación pública, transformación o cualquier otra forma de explotación sin la autorización escrita y expresa del titular.",
          ],
        },
        {
          heading: "Exclusión de responsabilidad",
          paragraphs: [
            `${COMPANY} no garantiza la inexistencia de errores en los contenidos ni su permanente actualización. La empresa no se hace responsable de los daños y perjuicios que pudieran derivarse del acceso o uso de la información publicada en este sitio web.`,
            "Los enlaces a sitios de terceros se ofrecen a título informativo. No asumimos responsabilidad alguna sobre el contenido, funcionamiento o disponibilidad de dichos sitios.",
          ],
        },
        {
          heading: "Legislación aplicable y jurisdicción",
          paragraphs: [
            "El presente aviso legal se rige por la legislación española vigente. Para la resolución de cualquier controversia o conflicto que pudiera derivarse del acceso o uso de este sitio web, las partes se someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los juzgados y tribunales del domicilio del usuario, salvo que la ley disponga otro fuero imperativo.",
          ],
        },
      ],
    },
    en: {
      title: "Legal Notice",
      subtitle: "LSSI-CE",
      lastUpdated: "Last updated: May 2026",
      privacyLinkLabel: "Privacy Policy",
      cookieLinkLabel: "Cookie Policy",
      sections: [
        {
          heading: "Identification",
          paragraphs: [
            "In compliance with Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the following information is provided:",
            `Owner: ${COMPANY}`,
            `NIF: ${NIF}`,
            `Address: ${ADDRESS_EN}`,
            `Email: ${EMAIL}`,
            `Website: ${WEBSITE}`,
          ],
        },
        {
          heading: "Intellectual and industrial property",
          paragraphs: [
            `All content on this website (texts, images, logos, graphic design and source code) is the property of ${COMPANY} or third parties who have expressly authorised its use, and is protected by Spanish and international intellectual and industrial property law.`,
            "Total or partial reproduction, distribution, public communication, transformation or any other form of exploitation is expressly prohibited without the written and express authorisation of the owner.",
          ],
        },
        {
          heading: "Liability disclaimer",
          paragraphs: [
            `${COMPANY} does not guarantee the absence of errors in its content or its continual updating. The company is not liable for damages arising from access to or use of the information published on this website.`,
            "Links to third-party sites are provided for information purposes only. We assume no responsibility for the content, operation or availability of such sites.",
          ],
        },
        {
          heading: "Applicable law and jurisdiction",
          paragraphs: [
            "This legal notice is governed by current Spanish law. For the resolution of any disputes arising from access to or use of this website, the parties submit, expressly waiving any other jurisdiction to which they may be entitled, to the courts of the user's place of residence, unless the law provides for another mandatory jurisdiction.",
          ],
        },
      ],
    },
    fr: {
      title: "Mentions Légales",
      subtitle: "LSSI-CE",
      lastUpdated: "Dernière mise à jour : mai 2026",
      privacyLinkLabel: "Politique de Confidentialité",
      cookieLinkLabel: "Politique de Cookies",
      sections: [
        {
          heading: "Identification",
          paragraphs: [
            "Conformément à la loi espagnole 34/2002 du 11 juillet relative aux services de la société de l'information et du commerce électronique (LSSI-CE), les informations suivantes sont fournies :",
            `Propriétaire : ${COMPANY}`,
            `NIF : ${NIF}`,
            `Adresse : ${ADDRESS_FR}`,
            `E-mail : ${EMAIL}`,
            `Site web : ${WEBSITE}`,
          ],
        },
        {
          heading: "Propriété intellectuelle et industrielle",
          paragraphs: [
            `Tous les contenus de ce site web (textes, images, logos, design graphique et code source) sont la propriété de ${COMPANY} ou de tiers qui ont expressément autorisé leur utilisation, et sont protégés par la législation espagnole et internationale relative à la propriété intellectuelle et industrielle.`,
            "Toute reproduction totale ou partielle, distribution, communication publique, transformation ou toute autre forme d'exploitation est expressément interdite sans l'autorisation écrite et expresse du titulaire.",
          ],
        },
        {
          heading: "Exclusion de responsabilité",
          paragraphs: [
            `${COMPANY} ne garantit pas l'absence d'erreurs dans les contenus ni leur mise à jour permanente. La société n'est pas responsable des dommages pouvant résulter de l'accès ou de l'utilisation des informations publiées sur ce site.`,
            "Les liens vers des sites tiers sont fournis à titre informatif uniquement. Nous n'assumons aucune responsabilité quant au contenu, au fonctionnement ou à la disponibilité de ces sites.",
          ],
        },
        {
          heading: "Loi applicable et juridiction",
          paragraphs: [
            "Les présentes mentions légales sont régies par la législation espagnole en vigueur. Pour la résolution de tout litige découlant de l'accès ou de l'utilisation de ce site web, les parties se soumettent, en renonçant expressément à tout autre for, aux tribunaux du domicile de l'utilisateur, sauf disposition légale impérative contraire.",
          ],
        },
      ],
    },
    de: {
      title: "Impressum",
      subtitle: "LSSI-CE",
      lastUpdated: "Letzte Aktualisierung: Mai 2026",
      privacyLinkLabel: "Datenschutzerklärung",
      cookieLinkLabel: "Cookie-Richtlinie",
      sections: [
        {
          heading: "Angaben",
          paragraphs: [
            "In Übereinstimmung mit dem spanischen Gesetz 34/2002 vom 11. Juli über Dienste der Informationsgesellschaft und des elektronischen Geschäftsverkehrs (LSSI-CE) werden folgende Informationen bereitgestellt:",
            `Inhaber: ${COMPANY}`,
            `NIF: ${NIF}`,
            `Adresse: ${ADDRESS_DE}`,
            `E-Mail: ${EMAIL}`,
            `Website: ${WEBSITE}`,
          ],
        },
        {
          heading: "Geistiges und gewerbliches Eigentum",
          paragraphs: [
            `Alle Inhalte dieser Website (Texte, Bilder, Logos, grafische Gestaltung und Quellcode) sind Eigentum von ${COMPANY} oder Dritter, die deren Verwendung ausdrücklich genehmigt haben, und sind durch das spanische und internationale Recht zum Schutz des geistigen und gewerblichen Eigentums geschützt.`,
            "Die vollständige oder teilweise Vervielfältigung, Verbreitung, öffentliche Mitteilung, Umgestaltung oder jede andere Form der Verwertung ist ohne die ausdrückliche schriftliche Genehmigung des Inhabers ausdrücklich verboten.",
          ],
        },
        {
          heading: "Haftungsausschluss",
          paragraphs: [
            `${COMPANY} garantiert nicht die Fehlerfreiheit der Inhalte oder deren ständige Aktualisierung. Das Unternehmen haftet nicht für Schäden, die aus dem Zugriff auf oder der Nutzung der auf dieser Website veröffentlichten Informationen entstehen.`,
            "Links zu Websites Dritter dienen nur zu Informationszwecken. Wir übernehmen keine Verantwortung für den Inhalt, den Betrieb oder die Verfügbarkeit solcher Websites.",
          ],
        },
        {
          heading: "Anwendbares Recht und Gerichtsstand",
          paragraphs: [
            "Dieses Impressum unterliegt dem geltenden spanischen Recht. Für die Beilegung von Streitigkeiten, die sich aus dem Zugriff auf oder der Nutzung dieser Website ergeben, unterwerfen sich die Parteien unter ausdrücklichem Verzicht auf jeden anderen Gerichtsstand den Gerichten des Wohnsitzes des Nutzers, sofern das Gesetz keinen anderen zwingenden Gerichtsstand vorsieht.",
          ],
        },
      ],
    },
  };
  return map[locale] ?? map.en;
}

// ── Metadata ─────────────────────────────────────────────────────
const metaMap: Record<string, { title: string; description: string }> = {
  es: { title: "Aviso Legal | VIVAZ Clay Targets", description: "Aviso legal de VIVAZ Clay Targets. Información corporativa, propiedad intelectual y condiciones de uso del sitio web." },
  en: { title: "Legal Notice | VIVAZ Clay Targets", description: "VIVAZ Clay Targets legal notice. Corporate information, intellectual property and terms of use of the website." },
  fr: { title: "Mentions Légales | VIVAZ Clay Targets", description: "Mentions légales de VIVAZ Clay Targets. Informations corporatives, propriété intellectuelle et conditions d'utilisation." },
  de: { title: "Impressum | VIVAZ Clay Targets", description: "Impressum von VIVAZ Clay Targets. Unternehmensangaben, geistiges Eigentum und Nutzungsbedingungen der Website." },
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
export default async function AvisoLegalPage({
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
              href="/politica-privacidad"
              className="font-body text-[14px] font-medium text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              → {c.privacyLinkLabel}
            </Link>
            <Link
              href="/politica-cookies"
              className="font-body text-[14px] font-medium text-primary underline underline-offset-4 hover:text-accent transition-colors"
            >
              → {c.cookieLinkLabel}
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
