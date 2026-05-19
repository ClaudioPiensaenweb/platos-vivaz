interface DisciplineBadgeProps {
  name: string;
}

export default function DisciplineBadge({ name }: DisciplineBadgeProps) {
  return (
    <span className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
      {name}
    </span>
  );
}
