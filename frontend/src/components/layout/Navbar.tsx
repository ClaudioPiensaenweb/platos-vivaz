import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import NavbarClient from "./NavbarClient";
import NavLink from "./NavLink";

export default function Navbar() {
  const t = useTranslations("nav");

  const menuItems = [
    { label: t("products"), href: "/productos" },
    { label: t("technology"), href: "/tecnologia" },
    { label: t("about"), href: "/sobre-vivaz" },
    { label: t("news"), href: "/regulacion-2026" },
    { label: t("contact"), href: "/contacto" },
  ];

  return (
    <NavbarClient menuItems={menuItems}>
      {/* Left dark section with logo */}
      <div className="flex shrink-0 items-center bg-primary-dark pl-6 lg:w-[320px] lg:pl-12 xl:w-[410px] xl:pl-[93px]">
        <Link href="/">
          <Image
            src="/svg/vivaz-logo-light.svg"
            alt="VIVAZ Clay Targets"
            width={177}
            height={54}
            priority
            className="w-[120px] lg:w-[150px] xl:w-[177px]"
          />
        </Link>
      </div>

      {/* Right green section with links (desktop) — centered */}
      <div className="hidden flex-1 items-center justify-center bg-primary px-4 lg:flex xl:px-6">
        <div className="flex items-center">
          {menuItems.map((item, i) => (
            <div key={item.href} className="flex items-center">
              {i > 0 && (
                <div className="mx-2 h-[39px] w-px bg-white/20 xl:mx-4" />
              )}
              <NavLink href={item.href} label={item.label} />
            </div>
          ))}
        </div>
      </div>

      {/* Instagram + lang separator — desktop only, after centered links */}
      <div className="hidden items-center bg-primary lg:flex">
        <div className="mx-2 h-[39px] w-px bg-white/20" />
        <a
          href="https://www.instagram.com/vivaz_claytargets/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Image
            src="/svg/instagram.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
        </a>
      </div>

      {/* Mobile: green fill */}
      <div className="flex flex-1 items-center justify-end bg-primary pr-6 lg:hidden" />
    </NavbarClient>
  );
}
