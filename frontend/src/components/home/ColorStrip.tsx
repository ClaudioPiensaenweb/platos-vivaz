import { useTranslations } from "next-intl";
import Image from "next/image";

/* Clay chip images for the infinite marquee strip */
const clayImages = [
  "/img/vivaz-clay-04-2.png",
  "/img/vivaz-clay-05-2.png",
  "/img/vivaz-clay-06-2.png",
  "/img/vivaz-clay-07-2.png",
  "/img/vivaz-clay-08-2.png",
  "/img/vivaz-clay-09-2.png",
  "/img/vivaz-clay-10-2.png",
  "/img/vivaz-clay-11-2.png",
  "/img/vivaz-clay-12-2.png",
  "/img/vivaz-clay-13-2.png",
  "/img/vivaz-clay-14-2.png",
  "/img/vivaz-clay-15-2.png",
  "/img/vivaz-clay-16-2.png",
];

function MarqueeRow() {
  return (
    <>
      {clayImages.map((src, i) => (
        <div
          key={i}
          className="mx-3 shrink-0 overflow-hidden rounded-full transition-transform duration-300 hover:scale-110"
        >
          <Image
            src={src}
            alt=""
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        </div>
      ))}
    </>
  );
}

export default function ColorStrip() {
  const t = useTranslations("colorStrip");

  return (
    <section className="bg-cream py-16">
      <div className="mx-auto mb-10 max-w-4xl px-4 text-center">
        <h2 className="text-[32px] font-bold tracking-[-1.52px] text-primary md:text-[38px]">
          {t("title")}
        </h2>
      </div>

      {/* Full-width infinite marquee strip — scrolls right to left */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-cream to-transparent md:w-32" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-cream to-transparent md:w-32" />

        {/* Marquee track: duplicate images for seamless loop */}
        <div className="animate-marquee flex w-max items-center">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      {/* VIVAZ watermark */}
      <div className="mt-10 text-center">
        <Image
          src="/img/vivaz-watermark.png"
          alt=""
          width={400}
          height={60}
          className="mx-auto opacity-[0.32]"
        />
      </div>
    </section>
  );
}
