import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import ContactCards from "@/components/contact/ContactCards";

export default async function ContactFormSection() {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";

  const tContact = await getTranslations("contact");

  return (
    <section id="contacto" className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column: address / contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[24px] font-bold text-primary">
                {tContact("talkTitle")}
              </h2>
              <p className="mt-3 font-body text-[17px] leading-relaxed text-muted">
                {tContact("talkDesc")}
              </p>
            </div>

            <ContactCards
              highlightedMarket={market}
              layout="stacked"
              translations={{
                national: tContact("national"),
                international: tContact("international"),
                phone: tContact("phone_label"),
                email: tContact("email_label"),
              }}
            />
          </div>

          {/* Right column: contact form */}
          <div className="rounded-[24px] bg-white p-8 shadow-sm lg:p-10">
            <h3 className="mb-6 text-[20px] font-bold text-primary">
              {tContact("formTitle")}
            </h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
