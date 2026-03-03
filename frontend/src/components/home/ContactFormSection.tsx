import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";

export default async function ContactFormSection() {
  const t = await getTranslations("home");
  const tContact = await getTranslations("contact");

  return (
    <section id="contacto" className="bg-cream-light py-20 lg:py-28">
      <Container>
        <div className="relative grid gap-12 lg:grid-cols-[3fr_2fr]">
          {/* Vertical separator line — matches Figma */}
          <div className="absolute left-[60%] top-0 hidden h-full w-px bg-primary/15 lg:block" />

          {/* Left column: heading + address + contacts */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-[28px] font-bold leading-[38px] text-primary">
                {t("contactForm.title")}
              </h2>
              <p className="mt-3 font-body text-[16px] leading-[24px] text-primary">
                {t("contactForm.description")}
              </p>
            </div>

            {/* Address */}
            <div>
              <p className="mb-2 font-body text-[15px] font-light text-primary">
                {t("contactForm.address")}
              </p>
              <div className="font-body text-[18px] font-light leading-[31px] text-primary">
                <p>Calle Jesús Sánchez Martín 3</p>
                <p>21360 Repilado (Huelva) – España</p>
              </div>
            </div>

            {/* Nacional / Internacional side by side */}
            <div className="grid grid-cols-2 gap-8">
              {/* Nacional */}
              <div>
                <h3 className="mb-4 text-[18px] font-bold text-primary uppercase">
                  {t("contactForm.national")}
                </h3>

                <p className="mb-1 font-body text-[15px] font-light text-primary">
                  {t("contactForm.phone")}
                </p>
                <a
                  href="tel:+34618757580"
                  className="mb-4 block font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                >
                  +34-618-757-580
                </a>

                <p className="mb-1 font-body text-[15px] font-light text-primary">
                  {t("contactForm.email")}
                </p>
                <a
                  href="mailto:export@platosvivaz.com"
                  className="block font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                >
                  export@platosvivaz.com
                </a>
              </div>

              {/* Internacional */}
              <div>
                <h3 className="mb-4 text-[18px] font-bold text-primary uppercase">
                  {t("contactForm.international")}
                </h3>

                <p className="mb-1 font-body text-[15px] font-light text-primary">
                  {t("contactForm.phone")}
                </p>
                <a
                  href="tel:+34606172746"
                  className="mb-4 block font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                >
                  +34-606-172-746
                </a>

                <p className="mb-1 font-body text-[15px] font-light text-primary">
                  {t("contactForm.email")}
                </p>
                <a
                  href="mailto:sales@vivazclaytargets.com"
                  className="block font-body text-[18px] font-light text-primary underline transition-colors hover:text-accent"
                >
                  sales@vivazclaytargets.com
                </a>
              </div>
            </div>
          </div>

          {/* Right column: contact form */}
          <div>
            <h3 className="mb-6 text-[18px] font-bold text-primary uppercase">
              {tContact("formTitle")}
            </h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
