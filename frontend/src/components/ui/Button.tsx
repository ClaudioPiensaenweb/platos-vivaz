import { Link, type AppHref } from "@/i18n/navigation";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: AppHref;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-[10px]";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5",
    secondary: "bg-primary text-white hover:bg-primary-dark",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-[18px]",
    lg: "px-9 py-4 text-lg",
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles} disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
    >
      {children}
    </button>
  );
}
