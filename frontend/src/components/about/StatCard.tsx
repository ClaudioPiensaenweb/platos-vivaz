import type { ReactNode } from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export default function StatCard({ value, label, icon, className = "" }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 text-center shadow-sm ${className}`}>
      {icon && (
        <div className="mb-3 flex justify-center text-primary">{icon}</div>
      )}
      <p className="font-heading text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 font-body text-sm text-muted">{label}</p>
    </div>
  );
}
