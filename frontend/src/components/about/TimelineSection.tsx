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
        {/* Desktop: horizontal connecting line */}
        <div
          className="absolute left-0 right-0 top-[2.25rem] hidden h-px bg-primary/20 md:block"
          aria-hidden="true"
        />

        <div className="flex flex-col md:flex-row md:gap-0">
          {events.map((event, index) => (
            <div
              key={event.year}
              className="relative flex flex-1 flex-col items-start md:items-center md:px-4"
            >
              {/* Mobile: vertical connecting line (except last item) */}
              {index < events.length - 1 && (
                <div
                  className="absolute left-[1.0625rem] top-[3.5rem] h-full w-px bg-primary/20 md:hidden"
                  aria-hidden="true"
                />
              )}

              {/* Dot with year inside */}
              <div className="relative z-10 mb-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white md:mb-6">
                <span className="sr-only">{event.year}</span>
              </div>

              {/* Year heading (visible label) */}
              <p className="font-heading text-2xl font-bold text-primary md:text-center">
                {event.year}
              </p>

              {/* Title */}
              <h3 className="mt-1 font-heading text-base font-bold text-foreground md:text-center">
                {event.title}
              </h3>

              {/* Description */}
              <p className="mt-2 pl-12 font-body text-sm leading-relaxed text-muted md:pl-0 md:text-center">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </InView>
  );
}
