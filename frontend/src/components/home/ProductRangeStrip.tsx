import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import InView from "@/components/ui/InView";

/* Decorative reticle/scope (mirilla) for corners */
function CornerMirilla({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute hidden lg:block ${className}`}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="13" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="14" y1="0" x2="14" y2="8" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="14" y1="20" x2="14" y2="28" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="0" y1="14" x2="8" y2="14" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="20" y1="14" x2="28" y2="14" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="14" cy="14" r="1.5" fill="#075627" fillOpacity="0.2" />
    </svg>
  );
}

/* Separator reticle/scope (mirilla) between columns */
function SeparatorMirilla({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute hidden lg:block ${className}`}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="16" cy="16" r="6" stroke="#075627" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="16" y1="0" x2="16" y2="10" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="16" y1="22" x2="16" y2="32" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="0" y1="16" x2="10" y2="16" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="22" y1="16" x2="32" y2="16" stroke="#075627" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="16" cy="16" r="1.5" fill="#075627" fillOpacity="0.2" />
    </svg>
  );
}

const ranges = [
  {
    key: "natura" as const,
    href: "/productos/natura-standard",
    chips: [
      { src: "/img/vivaz-clay-04-3.png", offset: 0 },
      { src: "/img/vivaz-clay-05-3.png", offset: 116 },
    ],
  },
  {
    key: "ecostar" as const,
    href: "/productos/eco-star-standard",
    chips: [
      { src: "/img/vivaz-clay-04-4.png", offset: 0 },
      { src: "/img/vivaz-clay-11-3.png", offset: 116 },
    ],
  },
  {
    key: "vivazRange" as const,
    href: "/productos",
    chips: [
      { src: "/img/vivaz-clay-03-3.png", offset: 0 },
      { src: "/img/vivaz-clay-07-3.png", offset: 87 },
      { src: "/img/vivaz-clay-14-3.png", offset: 174 },
      { src: "/img/vivaz-clay-16-3.png", offset: 261 },
    ],
  },
];

export default function ProductRangeStrip() {
  const t = useTranslations("range");

  return (
    <section className="relative -mt-36 rounded-b-[120px] bg-cream-light pb-20 pt-44">
      <Container>
        {/* Corner crosses */}
        <div className="relative">
          <CornerMirilla className="-left-6 -top-10" />
          <CornerMirilla className="-right-6 -top-10" />
          <CornerMirilla className="-bottom-10 -left-6" />
          <CornerMirilla className="-bottom-10 -right-6" />

          <InView animation="fade-in-up">
            <div className="relative grid grid-cols-1 items-end gap-8 md:grid-cols-3">
              {/* Separator crosses between columns */}
              <SeparatorMirilla className="left-[33%] top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <SeparatorMirilla className="left-[66%] top-1/2 -translate-x-1/2 -translate-y-1/2" />

              {ranges.map((range) => (
                <div key={range.key} className="flex flex-col items-center">
                  {/* Clay chips */}
                  <div
                    className="relative mx-auto"
                    style={{
                      width: range.chips.length > 2 ? 436 : 291,
                      height: 174,
                    }}
                  >
                    {range.chips.map((chip, i) => (
                      <div
                        key={i}
                        className="absolute top-0 transition-transform duration-300 hover:scale-105"
                        style={{ left: chip.offset }}
                      >
                        <Image
                          src={chip.src}
                          alt=""
                          width={175}
                          height={174}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Label with link */}
                  <Link
                    href={range.href}
                    className="mt-6 text-[24px] font-bold tracking-[-0.96px] text-primary transition-colors hover:text-accent"
                  >
                    {t(range.key)}
                  </Link>
                </div>
              ))}
            </div>
          </InView>
        </div>
      </Container>
    </section>
  );
}
