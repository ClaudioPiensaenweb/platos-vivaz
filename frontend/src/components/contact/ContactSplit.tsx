import { headers } from "next/headers";
import ContactForm from "@/components/contact/ContactForm";
import ContactCards from "@/components/contact/ContactCards";

interface ContactSplitTranslations {
  national: string;
  international: string;
  phone: string;
  email: string;
  formTitle: string;
}

interface ContactSplitProps {
  translations: ContactSplitTranslations;
  phoneNational?: string;
  phoneExport?: string;
  emailNational?: string;
  emailExport?: string;
}

export default async function ContactSplit({
  translations,
  phoneNational,
  phoneExport,
  emailNational,
  emailExport,
}: ContactSplitProps) {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Left: Contact form */}
      <div>
        {translations.formTitle && (
          <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
            {translations.formTitle}
          </h2>
        )}
        <ContactForm />
      </div>

      {/* Right: Contact cards with geo-highlighted market */}
      <div>
        <ContactCards
          highlightedMarket={market}
          translations={{
            national: translations.national,
            international: translations.international,
            phone: translations.phone,
            email: translations.email,
          }}
          phoneNational={phoneNational}
          phoneExport={phoneExport}
          emailNational={emailNational}
          emailExport={emailExport}
        />
      </div>
    </div>
  );
}
