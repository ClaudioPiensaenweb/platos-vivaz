"use client";

interface Props {
  label: string;
  className?: string;
}

export default function ManageCookiesButton({ label, className }: Props) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("vivaz:open-cookies"))}
      className={className}
    >
      {label}
    </button>
  );
}
