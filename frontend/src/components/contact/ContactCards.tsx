"use client";

interface ContactCardsTranslations {
  national: string;
  international: string;
  phone: string;
  email: string;
}

interface ContactCardsProps {
  highlightedMarket: "national" | "export";
  translations: ContactCardsTranslations;
  phoneNational?: string;
  phoneExport?: string;
  emailNational?: string;
  emailExport?: string;
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function ContactCards({
  highlightedMarket,
  translations,
  phoneNational = "+34 618 757 580",
  phoneExport = "+34 606 172 746",
  emailNational = "export@platosvivaz.com",
  emailExport = "sales@vivazclaytargets.com",
}: ContactCardsProps) {
  const cards = [
    {
      key: "national" as const,
      label: translations.national,
      phone: phoneNational,
      email: emailNational,
    },
    {
      key: "export" as const,
      label: translations.international,
      phone: phoneExport,
      email: emailExport,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => {
        const isHighlighted = card.key === highlightedMarket;
        return (
          <div
            key={card.key}
            className={`rounded-xl p-6 transition-all ${
              isHighlighted
                ? "ring-2 ring-primary/30 bg-primary/5"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3 className="mb-4 font-heading text-lg font-bold text-foreground">
              {card.label}
            </h3>

            <div className="space-y-3">
              <a
                href={`tel:${card.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 font-body text-sm text-muted hover:text-primary transition-colors"
              >
                <span className="text-primary">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="sr-only">{translations.phone}: </span>
                  {card.phone}
                </span>
              </a>

              <a
                href={`mailto:${card.email}`}
                className="flex items-center gap-3 font-body text-sm text-muted hover:text-primary transition-colors"
              >
                <span className="text-primary">
                  <EmailIcon />
                </span>
                <span>
                  <span className="sr-only">{translations.email}: </span>
                  {card.email}
                </span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
