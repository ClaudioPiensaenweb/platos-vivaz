"use client";

import { motion } from "framer-motion";
import { Link, usePathname, type AppHref } from "@/i18n/navigation";

interface NavLinkProps {
  href: AppHref;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : href.pathname;
  const isActive = pathname === hrefStr || pathname.startsWith(hrefStr + "/");

  return (
    <Link
      href={href}
      className="relative whitespace-nowrap text-[13px] text-white transition-colors hover:text-nature xl:text-[15px]"
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-active-indicator"
          className="nav-indicator absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-nature"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}
