import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";
import ContactCards from "@/components/contact/ContactCards";
import Container from "@/components/ui/Container";

interface ContactSplitProps {
  /** When "side-by-side", renders Nacional/Internacional cards in a 2-column grid */
  cardLayout?: "stacked" | "side-by-side";
  /** Optional custom section title override */
  sectionTitle?: string;
}

export default async function ContactSplit({
  cardLayout = "stacked",
  sectionTitle,
}: ContactSplitProps = {}) {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";
  const t = await getTranslations("contact");

  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-[13px] font-medium uppercase tracking-[3px] text-accent">
              VIVAZ
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-[28px] font-bold text-primary lg:text-[38px]">
            {sectionTitle ?? t("talkTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-[17px] leading-relaxed text-muted">
            {t("talkDesc")}
          </p>
        </div>

        {/* Main grid: form left, cards right */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-[24px] bg-white p-8 shadow-sm lg:p-10">
              <h3 className="mb-6 text-[20px] font-bold text-primary">
                {t("formTitle")}
              </h3>
              <ContactForm />
            </div>
          </div>

          {/* Contact cards */}
          <div className="lg:col-span-2">
            <ContactCards
              highlightedMarket={market}
              layout={cardLayout}
              translations={{
                national: t("national"),
                international: t("international"),
                phone: t("phone_label"),
                email: t("email_label"),
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
