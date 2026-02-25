interface ComplianceMatrixTranslations {
  natura: string;
  ecoStar: string;
  traditional: string;
  pahLevel: string;
  euCompliant: string;
  composition: string;
  issfApproved: string;
  biodegradable: string;
  compliant: string;
  nonCompliant: string;
}

interface ComplianceMatrixProps {
  translations: ComplianceMatrixTranslations;
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="inline-block h-4 w-4 text-success flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      aria-hidden="true"
      className="inline-block h-4 w-4 text-danger flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

interface StatusCellProps {
  value: boolean;
  compliantLabel: string;
  nonCompliantLabel: string;
}

function StatusCell({ value, compliantLabel, nonCompliantLabel }: StatusCellProps) {
  return (
    <span className="flex items-center gap-1.5">
      {value ? <CheckIcon /> : <CrossIcon />}
      <span className={value ? "text-success font-medium" : "text-danger font-medium"}>
        {value ? compliantLabel : nonCompliantLabel}
      </span>
    </span>
  );
}

export default function ComplianceMatrix({ translations }: ComplianceMatrixProps) {
  const rows = [
    {
      product: translations.natura,
      pahLevel: "0 mg/kg",
      euCompliant: true,
      composition: "Resina de pino",
      issfApproved: true,
      biodegradable: true,
      highlight: true,
    },
    {
      product: translations.ecoStar,
      pahLevel: "<50 mg/kg",
      euCompliant: true,
      composition: "Bio-compound",
      issfApproved: false,
      biodegradable: true,
      highlight: false,
    },
    {
      product: translations.traditional,
      pahLevel: ">500 mg/kg",
      euCompliant: false,
      composition: "Petroleo/Alquitran",
      issfApproved: true,
      biodegradable: false,
      highlight: false,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-primary/10">
            <th
              scope="col"
              className="px-4 py-3 text-left font-semibold text-foreground"
            >
              {/* Product column header (empty — row headers identify products) */}
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">
              {translations.pahLevel}
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">
              {translations.euCompliant}
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">
              {translations.composition}
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">
              {translations.issfApproved}
            </th>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-foreground">
              {translations.biodegradable}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.product}
              className={
                index % 2 === 0
                  ? row.highlight
                    ? "bg-primary/5"
                    : "bg-white"
                  : "bg-cream/50"
              }
            >
              <th
                scope="row"
                className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap"
              >
                {row.product}
              </th>
              <td className="px-4 py-3 text-foreground">
                <span
                  className={
                    row.euCompliant
                      ? "text-success font-medium"
                      : "text-danger font-medium"
                  }
                >
                  {row.pahLevel}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusCell
                  value={row.euCompliant}
                  compliantLabel={translations.compliant}
                  nonCompliantLabel={translations.nonCompliant}
                />
              </td>
              <td className="px-4 py-3 text-foreground">{row.composition}</td>
              <td className="px-4 py-3">
                <StatusCell
                  value={row.issfApproved}
                  compliantLabel={translations.compliant}
                  nonCompliantLabel={translations.nonCompliant}
                />
              </td>
              <td className="px-4 py-3">
                <StatusCell
                  value={row.biodegradable}
                  compliantLabel={translations.compliant}
                  nonCompliantLabel={translations.nonCompliant}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
