import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  children,
}: PageHeroProps) {
  return (
    <section
      className="relative z-10 flex min-h-[36vh] items-end overflow-hidden rounded-bl-[60px] rounded-br-[60px] -mb-6 md:rounded-bl-[120px] md:rounded-br-[120px] md:-mb-10 lg:min-h-[40vh]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #075627 0%, #03441d 55%, #242e22 100%)",
      }}
    >
      {/* pt: fixed header height (70px mobile / 105px lg) + breathing room */}
      {/* pb: extra space to account for negative margin overlap */}
      <Container className="relative z-10 pb-14 pt-[calc(70px+2rem)] md:pb-20 lg:pt-[calc(105px+2rem)]">
        <InView animation="fade-in-up">
          <div className="text-center">
            {subtitle && (
              <p
                className="mb-3 font-medium uppercase tracking-[3px] text-nature"
                style={{ fontSize: "clamp(0.75rem, 0.5rem + 0.5vw, 0.875rem)" }}
              >
                {subtitle}
              </p>
            )}
            <h1
              className="mx-auto max-w-3xl break-words font-bold leading-tight text-warm-white lg:leading-[1.15]"
              style={{ fontSize: "clamp(1.75rem, 1rem + 3vw, 3.25rem)", letterSpacing: "-0.03em" }}
            >
              {title}
            </h1>
          </div>
        </InView>
        {children}
      </Container>
    </section>
  );
}
