"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { animateCount } from "@/lib/animate";

interface PAHChartTranslations {
  traditional: string;
  euLimit: string;
  ecoStar: string;
  natura: string;
  euLimitLabel: string;
  noPatLabel: string;
  unit: string;
}

interface PAHComparisonChartProps {
  translations: PAHChartTranslations;
}

export default function PAHComparisonChart({
  translations,
}: PAHComparisonChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [traditionalCount, setTraditionalCount] = useState(0);
  const [ecoStarCount, setEcoStarCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // IntersectionObserver: trigger animation once when chart scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Start count-up animations when chart is in view
  useEffect(() => {
    if (!started) return;

    // When reduced motion: use 1ms duration so animateCount resolves in a single rAF
    const traditionalDuration = shouldReduceMotion ? 1 : 1200;
    const ecoStarDuration = shouldReduceMotion ? 1 : 800;

    animateCount(0, 500, traditionalDuration, setTraditionalCount);
    animateCount(0, 49, ecoStarDuration, setEcoStarCount);
  }, [started, shouldReduceMotion]);

  // Bar height classes: toggled by `started` state for CSS transition
  const traditionalHeight = started ? "h-full" : "h-0";
  const ecoStarHeight = started ? "h-[10%]" : "h-0";

  return (
    <div ref={containerRef} className="w-full">
      {/* Chart container */}
      <div className="relative flex items-end justify-center gap-8 md:gap-16 px-4 md:px-8 pt-8 pb-12 bg-cream-light rounded-2xl overflow-hidden">
        {/* EU threshold dashed line at 10% from bottom (50/500 = 10%) */}
        <div
          className="absolute left-0 right-0 border-t-2 border-dashed border-warning z-10 pointer-events-none"
          style={{ bottom: "calc(10% + 3rem)" }}
          aria-hidden="true"
        >
          <span className="absolute right-2 -top-5 text-xs font-medium text-warning bg-cream-light px-1 whitespace-nowrap">
            {translations.euLimitLabel}
          </span>
        </div>

        {/* Traditional bar */}
        <div className="flex flex-col items-center gap-2" style={{ height: "240px" }}>
          {/* Count display */}
          <div className="text-sm font-bold text-danger" aria-live="polite">
            {started ? (
              <>
                {traditionalCount >= 500 ? ">500" : traditionalCount}{" "}
                <span className="text-xs font-normal text-muted">{translations.unit}</span>
              </>
            ) : (
              <span className="opacity-0">0</span>
            )}
          </div>
          {/* Bar */}
          <div className="flex-1 w-16 md:w-20 flex items-end">
            <div
              className={`w-full bg-danger rounded-t-lg transition-all duration-1000 ease-out origin-bottom ${traditionalHeight}`}
              style={{ transformOrigin: "bottom" }}
              role="img"
              aria-label={`${translations.traditional}: >500 ${translations.unit}`}
            />
          </div>
          {/* Label */}
          <div className="text-center">
            <p className="text-xs font-semibold text-foreground">{translations.traditional}</p>
            <p className="text-xs text-muted">{translations.euLimit}</p>
          </div>
        </div>

        {/* ECO STAR bar */}
        <div className="flex flex-col items-center gap-2" style={{ height: "240px" }}>
          {/* Count display */}
          <div className="text-sm font-bold text-success" aria-live="polite">
            {started ? (
              <>
                {ecoStarCount >= 49 ? "<50" : ecoStarCount}{" "}
                <span className="text-xs font-normal text-muted">{translations.unit}</span>
              </>
            ) : (
              <span className="opacity-0">0</span>
            )}
          </div>
          {/* Bar */}
          <div className="flex-1 w-16 md:w-20 flex items-end">
            <div
              className={`w-full bg-success/70 rounded-t-lg transition-all duration-1000 ease-out origin-bottom ${ecoStarHeight}`}
              style={{ transformOrigin: "bottom" }}
              role="img"
              aria-label={`ECO STAR: <50 ${translations.unit}`}
            />
          </div>
          {/* Label */}
          <div className="text-center">
            <p className="text-xs font-semibold text-foreground">{translations.ecoStar}</p>
            <p className="text-xs text-muted">{translations.euLimit}</p>
          </div>
        </div>

        {/* NATURA bar — zero height rendered as accent line */}
        <div className="flex flex-col items-center gap-2" style={{ height: "240px" }}>
          {/* Count display */}
          <div className="text-sm font-bold text-primary" aria-live="polite">
            {started ? (
              <>
                0{" "}
                <span className="text-xs font-normal text-muted">{translations.unit}</span>
              </>
            ) : (
              <span className="opacity-0">0</span>
            )}
          </div>
          {/* Bar — 4px accent line for zero value */}
          <div className="flex-1 w-16 md:w-20 flex items-end">
            <div
              className={`w-full h-1 bg-primary rounded-sm transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}
              role="img"
              aria-label={`${translations.natura}: 0 ${translations.unit} — ${translations.noPatLabel}`}
            />
          </div>
          {/* Label */}
          <div className="text-center">
            <p className="text-xs font-semibold text-primary">{translations.natura}</p>
            <p className="text-xs text-success font-medium">{translations.noPatLabel}</p>
          </div>
        </div>
      </div>

      {/* Legend note */}
      <p className="mt-3 text-center text-xs text-muted">
        {translations.unit} = mg/kg (PAH concentration)
      </p>
    </div>
  );
}
