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

export default function LogisticsTable({ data, translations }: LogisticsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-cream-dark">
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              {translations.logistics}
            </th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">
              Qty
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-cream">
            <td className="px-4 py-3 text-muted">{translations.boxUnits}</td>
            <td className="px-4 py-3 text-right font-medium text-foreground">
              {data.box_units}
            </td>
          </tr>
          <tr className="border-b border-cream">
            <td className="px-4 py-3 text-muted">
              {translations.palletEu} ({data.pallet_eu.boxes} boxes)
            </td>
            <td className="px-4 py-3 text-right font-medium text-foreground">
              {data.pallet_eu.total.toLocaleString()} units
            </td>
          </tr>
          <tr className="border-b border-cream">
            <td className="px-4 py-3 text-muted">
              {translations.container20} ({data.container_20.pallets} pallets -{" "}
              {data.container_20.method})
            </td>
            <td className="px-4 py-3 text-right font-medium text-foreground">
              {data.container_20.total.toLocaleString()} units
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-muted">
              {translations.container40} ({data.container_40.pallets} pallets -{" "}
              {data.container_40.type})
            </td>
            <td className="px-4 py-3 text-right font-medium text-foreground">
              {data.container_40.total.toLocaleString()} units
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
