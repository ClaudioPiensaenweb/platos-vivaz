import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import InView from "@/components/ui/InView";
import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: `${t("title")} | VIVAZ Clay Targets` };
}

export default async function ContactoPage() {
  const t = await getTranslations("contact");

  return (
    <main>
      <PageHero
        title={t("title")}
        subtitle="VIVAZ Clay Targets"
        backgroundImage="/img/hero-bg.png"
        backgroundOpacity="opacity-20"
        minHeight="min-h-[45vh]"
        minHeightLg="lg:min-h-[50vh]"
      />

      {/* Contact content */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
            {/* Left — info column */}
            <div className="lg:col-span-2">
              <InView animation="slide-in-left">
                <div className="mb-10">
                  <h2 className="mb-4 text-[24px] font-bold text-primary lg:text-[28px]">
                    Hablemos
                  </h2>
                  <p className="font-body text-[16px] leading-relaxed text-muted">
                    Cuéntanos tu proyecto, disciplina o tipo de uso. Te orientamos hacia la mejor solución para tus necesidades.
                  </p>
                </div>

                {/* Contact cards */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-[16px] bg-cream-light p-5 transition-all duration-300 hover:shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-primary">Email</p>
                      <p className="font-body text-[15px] text-muted">info@vivazclaytargets.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-[16px] bg-cream-light p-5 transition-all duration-300 hover:shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-primary">{t("phone")}</p>
                      <p className="font-body text-[15px] text-muted">+34 XXX XXX XXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-[16px] bg-cream-light p-5 transition-all duration-300 hover:shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-primary">Ubicación</p>
                      <p className="font-body text-[15px] text-muted">España</p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md"
                  >
                    <Image src="/svg/instagram.svg" alt="Instagram" width={20} height={20} />
                  </a>
                </div>
              </InView>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <InView animation="slide-in-right">
                <div className="rounded-[24px] bg-cream-light p-8 lg:p-10">
                  <h3 className="mb-6 text-[20px] font-bold text-primary">
                    {t("send")}
                  </h3>
                  <ContactForm />
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust badges */}
      <section className="bg-cream py-12 lg:py-16">
        <Container>
          <InView animation="fade-in-up">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center lg:gap-16">
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">50+</p>
                <p className="font-body text-[14px] text-muted">Años de experiencia</p>
              </div>
              <div className="h-8 w-px bg-primary/10" />
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">2001</p>
                <p className="font-body text-[14px] text-muted">Pioneros en resina</p>
              </div>
              <div className="h-8 w-px bg-primary/10" />
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">0</p>
                <p className="font-body text-[14px] text-muted">mg/kg PAH (Natura)</p>
              </div>
              <div className="h-8 w-px bg-primary/10" />
              <div>
                <p className="text-[28px] font-bold text-primary lg:text-[34px]">EU</p>
                <p className="font-body text-[14px] text-muted">REACH compliant</p>
              </div>
            </div>
          </InView>
        </Container>
      </section>
    </main>
  );
}
