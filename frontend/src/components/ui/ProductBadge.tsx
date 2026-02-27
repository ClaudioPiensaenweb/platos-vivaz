interface ProductBadgeProps {
  text: string;
  variant?: "nature" | "eco";
  className?: string;
}

export default function ProductBadge({
  text,
  variant = "nature",
  className = "",
}: ProductBadgeProps) {
  const variants = {
    nature: "bg-nature/20 text-primary",
    eco: "bg-accent/10 text-accent",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-[2px] ${variants[variant]} ${className}`}
    >
      <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        className="shrink-0"
        fill="currentColor"
      >
        <path d="M8 1C4 4 2 8 2 12c2-1 4-2 6-4 2 2 4 3 6 4 0-4-2-8-6-11z" />
      </svg>
      {text}
    </span>
  );
}
