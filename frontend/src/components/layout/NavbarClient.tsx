"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, usePathname, useRouter, type AppHref } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import Image from "next/image";

interface NavbarClientProps {
  menuItems: { label: string; href: AppHref }[];
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
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const isHome = pathname === "/";

  // Close mobile menu + mobile lang on navigation
  useEffect(() => {
    setMobileOpen(false);
    setMobileLangOpen(false);
  }, [pathname]);

  // Close mobile lang dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false);
      }
    }
    if (mobileLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mobileLangOpen]);

  // All pages: transparent initially, solid on scroll. Hide on scroll down, show on scroll up.
  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      // Track if we've scrolled past initial viewport
      setScrolled(currentY > 50);

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
  }, []);

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
    // For dynamic routes (e.g. /productos/[slug]), pass params so the slug is preserved
    const slug = params?.slug as string | undefined;
    if (slug && pathname.includes("[slug]")) {
      router.replace(
        { pathname: pathname as "/productos/[slug]", params: { slug } },
        { locale: newLocale }
      );
    } else {
      router.replace(pathname as "/", { locale: newLocale });
    }
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
    }, 400);
  }

  // Determine nav background style — transparent on all pages, solid on scroll (no overlay/blur)
  const navBg = scrolled
    ? "bg-primary"
    : "bg-transparent";

  return (
    <>
      <header
        className={`fixed left-0 right-0 transition-all duration-300 ease-in-out ${
          mobileOpen ? "z-[60]" : "z-50"
        } ${
          hidden ? "-translate-y-[calc(100%+20px)]" : "translate-y-0"
        } top-0 px-0`}
      >
        <nav
          className={`mx-auto flex h-[70px] items-stretch transition-colors duration-300 lg:h-[105px] ${navBg}`}
        >
          {children}

          {/* Desktop language dropdown — hover */}
          <div
            ref={langRef}
            className="hidden items-center pr-4 lg:flex xl:pr-6"
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
                className={`absolute right-0 top-full min-w-[160px] overflow-hidden rounded-[12px] bg-white shadow-xl shadow-black/15 transition-all duration-200 ${
                  langOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
                style={{ marginTop: "0px", paddingTop: "4px" }}
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

          {/* Mobile: language dropdown + hamburger */}
          <div className="flex items-center gap-3 pr-5 lg:hidden">
            <div ref={mobileLangRef} className="relative">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="flex items-center gap-1 rounded-[8px] px-2.5 py-1.5 text-[13px] font-medium text-white transition-all hover:bg-white/10"
              >
                <svg className="h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z" />
                </svg>
                {localeShort[locale]}
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${mobileLangOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute right-0 top-full mt-1.5 min-w-[140px] overflow-hidden rounded-[10px] bg-white shadow-xl shadow-black/15 transition-all duration-200 ${
                  mobileLangOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      switchLocale(loc);
                      setMobileLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition-colors ${
                      loc === locale
                        ? "bg-nature/30 font-medium text-primary"
                        : "text-foreground hover:bg-cream-light"
                    }`}
                  >
                    <span className="font-semibold text-primary/60">{localeShort[loc]}</span>
                    <span>{localeLabels[loc]}</span>
                    {loc === locale && (
                      <svg className="ml-auto h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
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
        className={`fixed inset-0 z-[55] transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{
          backgroundImage: "linear-gradient(180deg, #075627 0%, #03441d 55%, #242e22 100%)",
        }}
      >
        <div className="flex h-full flex-col items-center justify-center px-8">
          {/* Navigation links */}
          <nav className="flex flex-col items-center gap-1">
            {menuItems.map((item, i) => {
              const hrefStr = typeof item.href === "string" ? item.href : item.href.pathname;
              const isActive = pathname === hrefStr || pathname.startsWith(hrefStr + "/");
              return (
                <Link
                  key={hrefStr}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`animate-fade-in-up rounded-[12px] px-6 py-3 text-[18px] font-medium tracking-[-0.3px] transition-all ${
                    isActive
                      ? "bg-white/10 text-nature"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Separator */}
          <div className="mt-8 mb-6 h-px w-16 bg-white/20" />

          {/* Language selector */}
          <div className="flex gap-2">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`rounded-[8px] px-3 py-1.5 text-[13px] font-medium transition-all ${
                  loc === locale
                    ? "bg-white/15 text-white border border-white/20"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {localeShort[loc]}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="mt-6">
            <a
              href="https://www.instagram.com/vivazclaytargets/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Image src="/svg/instagram.svg" alt="Instagram" width={28} height={28} className="opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
