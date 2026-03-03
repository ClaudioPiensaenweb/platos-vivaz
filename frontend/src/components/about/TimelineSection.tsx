import InView from "@/components/ui/InView";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  events: TimelineEvent[];
  className?: string;
}

export default function TimelineSection({ events, className = "" }: TimelineSectionProps) {
  return (
    <InView animation="fade-in-up" className={className}>
      <div className="relative">
        {/* Desktop: horizontal connecting line through center of dots */}
        <div
          className="absolute left-0 right-0 top-[1.125rem] hidden h-px bg-primary/20 md:block"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8 md:flex-row md:gap-0">
          {events.map((event, index) => (
            <div
              key={event.year}
              className="relative flex flex-1 md:flex-col md:items-center md:px-4"
            >
              {/* Mobile: vertical connecting line between dots */}
              {index < events.length - 1 && (
                <div
                  className="absolute left-[1.0625rem] top-9 h-[calc(100%-2.25rem)] w-px bg-primary/20 md:hidden"
                  aria-hidden="true"
                />
              )}

              {/* Mobile: dot + content side by side / Desktop: stacked centered */}
              <div className="flex gap-4 md:flex-col md:items-center md:gap-0">
                {/* Dot */}
                <div className="relative z-10 mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary md:mb-6 md:mt-0">
                  <span className="sr-only">{event.year}</span>
                </div>

                {/* Content */}
                <div className="md:text-center">
                  <p className="font-heading text-2xl font-bold text-primary">
                    {event.year}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold uppercase text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InView>
  );
}
