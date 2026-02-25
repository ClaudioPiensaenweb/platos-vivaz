import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";

export default async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="px-4 pb-4 pt-0 bg-background">
      <div className="rounded-3xl bg-primary overflow-hidden">
        <Container className="py-12 lg:py-16">
          {/* 4-column grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

            {/* Col 1: Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block">
                <Image
                  src="/svg/vivaz-logo-cream.svg"
                  alt="VIVAZ Clay Targets"
                  width={140}
                  height={43}
                  className="h-auto w-[140px]"
                />
              </Link>
              <p className="mt-4 font-body text-[13px] leading-relaxed text-warm-white/60 max-w-[200px]">
                {t("tagline")}
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-warm-white/50">
                {t("navTitle")}
              </h3>
              <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
                <Link
                  href="/productos"
                  className="font-body text-[14px] text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  {nav("products")}
                </Link>
                <Link
                  href="/tecnologia"
                  className="font-body text-[14px] text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  {nav("technology")}
                </Link>
                <Link
                  href="/sobre-vivaz"
                  className="font-body text-[14px] text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  {nav("about")}
                </Link>
                <Link
                  href="/regulacion-2026"
                  className="font-body text-[14px] text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  {nav("news")}
                </Link>
                <Link
                  href="/contacto"
                  className="font-body text-[14px] text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  {nav("contact")}
                </Link>
              </nav>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-warm-white/50">
                {t("contactTitle")}
              </h3>
              <div className="flex flex-col gap-2.5">
                <p className="font-body text-[14px] text-warm-white/70">
                  {t("address")}
                </p>
                <a
                  href="tel:+34618757580"
                  className="font-body text-[14px] text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  +34 618 757 580
                </a>
                <a
                  href="mailto:export@platosvivaz.com"
                  className="font-body text-[14px] text-warm-white/70 transition-colors hover:text-warm-white"
                >
                  export@platosvivaz.com
                </a>
              </div>
            </div>

            {/* Col 4: Social + Legal */}
            <div>
              <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-warm-white/50">
                {t("followTitle")}
              </h3>
              {/* Instagram */}
              <a
                href="https://instagram.com/vivazclaytargets"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/10 transition-all hover:bg-warm-white/20 hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-warm-white"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Legal links */}
              <div className="mt-8 flex flex-col gap-2">
                <Link
                  href="/politica-privacidad"
                  className="font-body text-[13px] text-warm-white/50 transition-colors hover:text-warm-white/80"
                >
                  {t("privacy")}
                </Link>
                <Link
                  href="/aviso-legal"
                  className="font-body text-[13px] text-warm-white/50 transition-colors hover:text-warm-white/80"
                >
                  {t("legal")}
                </Link>
                <Link
                  href="/politica-cookies"
                  className="font-body text-[13px] text-warm-white/50 transition-colors hover:text-warm-white/80"
                >
                  {t("cookies")}
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-warm-white/10 pt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="font-body text-[12px] text-warm-white/40">
              &copy; {new Date().getFullYear()} VIVAZ Clay Targets. {t("rights")}
            </p>
            <p className="font-body text-[12px] text-warm-white/30 italic">
              {t("madeIn")}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
