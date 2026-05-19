import type { LogisticsData } from "@/lib/types";

interface LogisticsTranslations {
  logistics: string;
  boxUnits: string;
  palletEu: string;
  container20: string;
  container40: string;
}

interface LogisticsTableProps {
  data: LogisticsData;
  translations: LogisticsTranslations;
}

function fmt(n: unknown): string {
  const num = Number(n) || 0;
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function LogisticsTable({ data, translations }: LogisticsTableProps) {
  if (!data || typeof data !== "object") return null;

  const pallet = data.pallet_eu ?? { boxes: 0, total: 0 };
  const c20 = data.container_20 ?? { pallets: 0, method: "-", total: 0 };
  const c40 = data.container_40 ?? { pallets: 0, type: "-", total: 0 };

  const rows = [
    { label: translations.boxUnits, value: fmt(data.box_units) },
    { label: `${translations.palletEu} (${pallet.boxes} boxes)`, value: `${fmt(pallet.total)} units` },
    ...(c20.total > 0 ? [{ label: `${translations.container20} (${c20.pallets} pallets)`, value: `${fmt(c20.total)} units` }] : []),
    ...(c40.total > 0 ? [{ label: `${translations.container40} (${c40.pallets} pallets)`, value: `${fmt(c40.total)} units` }] : []),
  ];

  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center justify-between gap-4 rounded-lg bg-white p-4">
          <span className="text-sm text-muted">{row.label}</span>
          <span className="whitespace-nowrap text-sm font-semibold text-primary">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
