interface CertBadgeRowProps {
  certifications: string[];
  className?: string;
  /** Use "dark" when placed on a dark background */
  variant?: "light" | "dark";
}

export default function CertBadgeRow({ certifications, className = "", variant = "light" }: CertBadgeRowProps) {
  if (certifications.length === 0) return null;

  const badgeStyles = variant === "dark"
    ? "bg-warm-white/15 text-warm-white border border-warm-white/20"
    : "bg-primary/10 text-primary";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {certifications.map((cert) => (
        <span
          key={cert}
          className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyles}`}
        >
          {cert}
        </span>
      ))}
    </div>
  );
}
