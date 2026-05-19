import { breadcrumbJsonLd } from "@/lib/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

interface BreadcrumbItem {
  name: string;
  /** Path without locale prefix, e.g. "/productos" */
  path: string;
}

interface Props {
  locale: string;
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ locale, items }: Props) {
  const localePrefix = locale === "es" ? "" : `/${locale}`;
  const fullItems = [
    { name: "VIVAZ", url: SITE_URL },
    ...items.map((item) => ({
      name: item.name,
      url: `${SITE_URL}${localePrefix}${item.path}`,
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fullItems)) }}
    />
  );
}
