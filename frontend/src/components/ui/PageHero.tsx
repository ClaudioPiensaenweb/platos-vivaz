import Image from "next/image";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundOpacity?: string;
  minHeight?: string;
  minHeightLg?: string;
  children?: ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage = "/img/hero-bg.png",
  backgroundOpacity = "opacity-25",
  minHeight = "min-h-[60vh]",
  minHeightLg = "lg:min-h-[70vh]",
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative flex ${minHeight} items-end overflow-hidden bg-primary-dark ${minHeightLg}`}
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover ${backgroundOpacity}`}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />
      <Container className="relative z-10 pb-16 pt-40 lg:pb-24">
        <InView animation="fade-in-up">
          {subtitle && (
            <p className="mb-3 text-[14px] font-medium uppercase tracking-[3px] text-nature">
              {subtitle}
            </p>
          )}
          <h1 className="max-w-2xl text-[36px] font-bold leading-tight text-warm-white lg:text-[52px] lg:leading-[1.15]">
            {title}
          </h1>
        </InView>
        {children}
      </Container>
    </section>
  );
}
