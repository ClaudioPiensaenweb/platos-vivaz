import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  /** If true, renders a shorter hero with no text — just the dark background strip */
  compact?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  children,
  compact = false,
}: PageHeroProps) {
  if (compact || !title) {
    // Compact mode: just a dark background strip for the transparent header to sit on
    return (
      <section
        className="relative z-10 overflow-hidden rounded-bl-[60px] rounded-br-[60px] md:rounded-bl-[120px] md:rounded-br-[120px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #042e15 0%, #075627 30%, #03441d 65%, #242e22 100%)",
          minHeight: "260px",
        }}
      >
        {/* Just enough height for navbar + overlap area */}
        <div className="pt-[calc(70px+2rem)] lg:pt-[calc(105px+2rem)] pb-16" />
      </section>
    );
  }

  return (
    <section
      className="relative z-10 flex min-h-[40vh] items-end overflow-hidden rounded-bl-[60px] rounded-br-[60px] -mb-6 md:rounded-bl-[120px] md:rounded-br-[120px] md:-mb-10 lg:min-h-[44vh]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #042e15 0%, #075627 30%, #03441d 65%, #242e22 100%)",
      }}
    >
      {/* pt: accounts for transparent fixed header (70px mobile / 105px lg) + generous breathing room */}
      <Container className="relative z-10 pb-16 pt-[calc(70px+4rem)] md:pb-20 lg:pt-[calc(105px+4rem)]">
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
        {children && (
          <div className="mt-8 flex justify-center">{children}</div>
        )}
      </Container>
    </section>
  );
}
