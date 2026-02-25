interface CertBadgeRowProps {
  certifications: string[];
  className?: string;
}

export default function CertBadgeRow({ certifications, className = "" }: CertBadgeRowProps) {
  if (certifications.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {certifications.map((cert) => (
        <span
          key={cert}
          className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
        >
          {cert}
        </span>
      ))}
    </div>
  );
}
