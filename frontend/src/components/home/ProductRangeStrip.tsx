import { useTranslations } from "next-intl";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Link, type AppHref } from "@/i18n/navigation";
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

const ranges: {
  key: "natura" | "ecostar" | "vivazRange";
  href: AppHref;
  type: "chips" | "product";
  productImage?: string;
  chips: { src: string; offset: number; rotate: number; size: number; z?: number }[];
}[] = [
  {
    key: "natura",
    href: { pathname: "/productos/[slug]", params: { slug: "natura-110" } },
    type: "product",
    productImage: "/img/products/natura.png",
    chips: [],
  },
  {
    key: "ecostar",
    href: { pathname: "/productos/[slug]", params: { slug: "eco-star-110" } },
    type: "product",
    productImage: "/img/products/eco-star.png",
    chips: [],
  },
  {
    key: "vivazRange",
    href: "/productos",
    type: "product",
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
                    className="relative mx-auto flex items-center justify-center"
                    style={{
                      width: 260,
                      maxWidth: 260,
                      height: 174,
                    }}
                  >
                    {range.type === "product" && range.productImage ? (
                      <Image
                        src={range.productImage}
                        alt=""
                        width={160}
                        height={160}
                        className="h-[120px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0px_4px_9px_rgba(0,0,0,0.15)]"
                      />
                    ) : (
                      range.chips.map((chip, i) => (
                        <div
                          key={i}
                          className="absolute transition-transform duration-500 group-hover:scale-110"
                          style={{
                            left: chip.offset,
                            top: "50%",
                            transform: `translateY(-50%) rotate(${chip.rotate}deg)`,
                            zIndex: chip.z ?? i,
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
