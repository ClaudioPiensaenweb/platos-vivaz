import Image from "next/image";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "nature" | "eco" | "neutral";
  className?: string;
}

export default function Badge({ children, variant = "nature", className = "" }: BadgeProps) {
  const variants = {
    nature: "border-primary text-primary",
    eco: "border-primary text-primary",
    neutral: "border-foreground/30 text-foreground",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium ${variants[variant]} ${className}`}
    >
      <Image src="/svg/check.svg" alt="" width={24} height={24} />
      {children}
    </span>
  );
}
