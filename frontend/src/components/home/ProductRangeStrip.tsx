import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import InView from "@/components/ui/InView";

/* L-shaped corner mark from briefing/v2/marca-esquina.svg — matches Figma design */
function CornerMark({
  className = "",
  rotate = "",
}: {
  className?: string;
  rotate?: string;
}) {
  return (
    <svg
      className={`absolute hidden lg:block ${rotate} ${className}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="20" y1="0.5" x2="0" y2="0.5" stroke="#075627" />
      <line x1="0.5" y1="0" x2="0.5" y2="20" stroke="#075627" />
    </svg>
  );
}

/* Dark crosshair for separator between columns (22x23, from target-oscuro.svg) */
function SeparatorCrosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute hidden lg:block ${className}`}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="10.4951" y1="23" x2="10.4951" y2="1" stroke="#075627" />
      <line x1="0" y1="0.5" x2="22" y2="0.5" stroke="#075627" />
    </svg>
  );
}

const ranges = [
  {
    key: "natura" as const,
    href: "/productos/natura-standard",
    type: "chips" as const,
    chips: [
      { src: "/img/vivaz-clay-04-3.png", offset: 0, rotate: -10, size: 138 },
      { src: "/img/vivaz-clay-05-3.png", offset: 100, rotate: 8, size: 138 },
    ],
  },
  {
    key: "ecostar" as const,
    href: "/productos/eco-star-standard",
    type: "chips" as const,
    chips: [
      { src: "/img/vivaz-clay-04-4.png", offset: 0, rotate: -8, size: 131 },
      { src: "/img/vivaz-clay-11-3.png", offset: 97, rotate: 10, size: 131 },
    ],
  },
  {
    key: "vivazRange" as const,
    href: "/productos",
    type: "product" as const,
    productImage: "/img/vivaz-range-product.png",
    chips: [],
  },
];

export default function ProductRangeStrip() {
  const t = useTranslations("range");

  return (
    <section className="relative z-[1] -mt-36 overflow-hidden rounded-bl-[60px] rounded-br-[60px] bg-cream-light pb-24 pt-44 md:rounded-bl-[120px] md:rounded-br-[120px]">
      <Container>
        {/* Corner L-marks + grid — all inside same relative container */}
        <InView animation="fade-in-up">
          <div className="relative">
            {/* Corner marks aligned to grid container edges */}
            <CornerMark className="-left-6 top-0" />
            <CornerMark className="-right-6 top-0" rotate="rotate-90" />
            <CornerMark className="-left-6 bottom-0" rotate="-rotate-90" />
            <CornerMark className="-right-6 bottom-0" rotate="rotate-180" />

            <div className="relative grid grid-cols-1 items-end gap-8 md:grid-cols-3">
              {/* Separator crosshairs — 4 total: top + bottom of each gap */}
              <SeparatorCrosshair className="left-[33%] top-0 -translate-x-1/2" />
              <SeparatorCrosshair className="bottom-0 left-[33%] -translate-x-1/2 rotate-180" />
              <SeparatorCrosshair className="left-[66%] top-0 -translate-x-1/2" />
              <SeparatorCrosshair className="bottom-0 left-[66%] -translate-x-1/2 rotate-180" />

              {ranges.map((range) => (
                <Link
                  key={range.key}
                  href={range.href}
                  className="group flex flex-col items-center"
                >
                  {/* Product visual with reticle overlay */}
                  <div
                    className="relative mx-auto flex items-end justify-center"
                    style={{
                      width: range.type === "product" ? 430 : 260,
                      height: 174,
                    }}
                  >
                    {range.type === "product" && range.productImage ? (
                      <Image
                        src={range.productImage}
                        alt=""
                        width={430}
                        height={174}
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      range.chips.map((chip, i) => (
                        <div
                          key={i}
                          className="absolute bottom-0 transition-transform duration-500 group-hover:scale-110"
                          style={{
                            left: chip.offset,
                            transform: `rotate(${chip.rotate}deg)`,
                          }}
                        >
                          <Image
                            src={chip.src}
                            alt=""
                            width={chip.size}
                            height={chip.size}
                            className="object-cover drop-shadow-[0px_4px_9px_rgba(0,0,0,0.15)]"
                          />
                        </div>
                      ))
                    )}
                  </div>

                  {/* Label */}
                  <span className="mt-10 text-[20px] font-bold tracking-[-0.8px] text-primary transition-colors duration-300 group-hover:text-accent">
                    {t(range.key)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </InView>
      </Container>
    </section>
  );
}
