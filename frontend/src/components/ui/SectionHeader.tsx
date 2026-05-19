interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeader({
  subtitle,
  title,
  className = "",
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      {subtitle && (
        <p
          className={`mb-2 text-base font-medium ${
            light ? "text-warm-white" : "text-primary"
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-[28px] font-bold leading-tight tracking-[-1.12px] ${
          light ? "text-warm-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
