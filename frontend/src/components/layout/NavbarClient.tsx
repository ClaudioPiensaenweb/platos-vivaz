"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Image from "next/image";

interface NavbarClientProps {
  menuItems: { label: string; href: string }[];
  children: ReactNode;
}

const localeLabels: Record<string, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

const localeShort: Record<string, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
  de: "DE",
};

export default function NavbarClient({ menuItems, children }: NavbarClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Home: hide on scroll down, show on scroll up
  // Interior: always visible (no hide logic)
  useEffect(() => {
    if (!isHome) {
      setHidden(false);
      return;
    }

    function handleScroll() {
      const currentY = window.scrollY;
      // Only start hiding after scrolling past the navbar height
      if (currentY > 120) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
    setMobileOpen(false);
  }

  function handleLangMouseEnter() {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setLangOpen(true);
  }

  function handleLangMouseLeave() {
    hoverTimeoutRef.current = setTimeout(() => {
      setLangOpen(false);
    }, 200);
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          hidden ? "-translate-y-[calc(100%+20px)]" : "translate-y-0"
        } ${
          isHome
            ? "top-5 px-4 lg:px-8 xl:px-[120px] 2xl:px-[240px]"
            : "top-0 px-0"
        }`}
      >
        <nav
          className={`mx-auto flex h-[70px] overflow-hidden lg:h-[105px] ${
            isHome
              ? "max-w-[1440px] rounded-[20px]"
              : "max-w-none rounded-none shadow-lg shadow-black/10"
          }`}
        >
          {children}

          {/* Desktop language dropdown — hover */}
          <div
            ref={langRef}
            className="hidden items-center bg-primary pr-4 lg:flex xl:pr-6"
            onMouseEnter={handleLangMouseEnter}
            onMouseLeave={handleLangMouseLeave}
          >
            <div className="mx-2 h-[39px] w-px bg-white/20" />
            <div className="relative">
              <button
                className="flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-[14px] font-medium text-white transition-all hover:bg-white/10"
              >
                <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z" />
                </svg>
                {localeShort[locale]}
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute right-0 top-full mt-2 min-w-[160px] overflow-hidden rounded-[12px] bg-white shadow-xl shadow-black/15 transition-all duration-200 ${
                  langOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
                onMouseEnter={handleLangMouseEnter}
                onMouseLeave={handleLangMouseLeave}
              >
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] transition-colors ${
                      loc === locale
                        ? "bg-nature/30 font-medium text-primary"
                        : "text-foreground hover:bg-cream-light"
                    }`}
                  >
                    <span className="font-semibold text-primary/60">{localeShort[loc]}</span>
                    <span>{localeLabels[loc]}</span>
                    {loc === locale && (
                      <svg className="ml-auto h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: hamburger + compact lang */}
          <div className="flex items-center gap-3 bg-primary pr-5 lg:hidden">
            <button
              onClick={() => {
                const idx = routing.locales.indexOf(locale as typeof routing.locales[number]);
                const next = routing.locales[(idx + 1) % routing.locales.length];
                switchLocale(next);
              }}
              className="rounded-[8px] border border-white/20 px-2 py-1 text-[12px] font-medium text-white/80"
            >
              {localeShort[locale]}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[60] text-white"
              aria-label="Menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-primary-dark transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-6">
          {menuItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="animate-fade-in-up text-2xl font-bold text-white transition-colors hover:text-nature"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-6 flex items-center gap-6">
            <a href="https://www.instagram.com/vivaz_claytargets/" target="_blank" rel="noopener noreferrer">
              <Image src="/svg/instagram.svg" alt="Instagram" width={33} height={33} />
            </a>
          </div>

          <div className="mt-4 flex gap-3">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`rounded-[10px] px-4 py-2 text-sm font-medium transition-all ${
                  loc === locale ? "bg-accent text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
