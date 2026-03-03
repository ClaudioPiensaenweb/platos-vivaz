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
    nature: "border-primary/30 text-primary",
    eco: "border-primary/30 text-primary",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium ${variants[variant]} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
        className="shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {text}
    </span>
  );
}
