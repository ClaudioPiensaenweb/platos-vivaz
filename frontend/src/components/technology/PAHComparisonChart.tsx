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

/*
 * Infographic scale (NOT linear — exaggerated for clarity):
 * Traditional: >500 → 100% bar height
 * EU limit:     50 → visual 25% line (orange dashed)
 * ECO STAR:    <50 → visual 20% bar (clearly BELOW the limit line)
 * NATURA:        0 → flat accent line at baseline
 */
const BAR_H = 220;

export default function PAHComparisonChart({
  translations,
}: PAHComparisonChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [traditionalCount, setTraditionalCount] = useState(0);
  const [ecoStarCount, setEcoStarCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

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

  useEffect(() => {
    if (!started) return;
    const d1 = shouldReduceMotion ? 1 : 1200;
    const d2 = shouldReduceMotion ? 1 : 800;
    animateCount(0, 500, d1, setTraditionalCount);
    animateCount(0, 49, d2, setEcoStarCount);
  }, [started, shouldReduceMotion]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="rounded-2xl bg-cream-light px-4 py-8 md:px-8">
        {/* Count labels row */}
        <div className="mx-auto flex max-w-2xl justify-center gap-8 md:gap-16">
          <div className="w-16 text-center text-sm font-bold text-danger md:w-20" aria-live="polite">
            {started ? <>{traditionalCount >= 500 ? ">500" : traditionalCount} <span className="text-xs font-normal text-muted">{translations.unit}</span></> : <span className="opacity-0">0</span>}
          </div>
          <div className="w-16 text-center text-sm font-bold text-success md:w-20" aria-live="polite">
            {started ? <>{ecoStarCount >= 49 ? "<50" : ecoStarCount} <span className="text-xs font-normal text-muted">{translations.unit}</span></> : <span className="opacity-0">0</span>}
          </div>
          <div className="w-16 text-center text-sm font-bold text-primary md:w-20" aria-live="polite">
            {started ? <>0 <span className="text-xs font-normal text-muted">{translations.unit}</span></> : <span className="opacity-0">0</span>}
          </div>
        </div>

        {/* Bar area — lines are positioned inside here */}
        <div className="relative mx-auto mt-2 flex max-w-2xl justify-center gap-8 md:gap-16" style={{ height: BAR_H }}>
          {/* Baseline — neutral gray solid line at 0 mg/kg */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 border-t border-foreground/15"
            aria-hidden="true"
          />

          {/* EU limit — orange dashed line at 25% visual height */}
          <div
            className="pointer-events-none absolute left-0 right-0 z-10 border-t-2 border-dashed border-warning"
            style={{ bottom: `${BAR_H * 0.25}px` }}
            aria-hidden="true"
          >
            <span className="absolute -top-5 right-0 whitespace-nowrap bg-cream-light px-1 text-xs font-medium text-warning">
              {translations.euLimitLabel}
            </span>
          </div>

          {/* Traditional bar — 100% */}
          <div className="flex w-16 items-end md:w-20">
            <div
              className={`w-full rounded-t-lg bg-danger transition-all duration-1000 ease-out ${started ? "h-full" : "h-0"}`}
              role="img"
              aria-label={`${translations.traditional}: >500 ${translations.unit}`}
            />
          </div>

          {/* ECO STAR bar — 20% visual (clearly below EU limit line at 25%) */}
          <div className="flex w-16 items-end md:w-20">
            <div
              className={`w-full rounded-t-lg bg-success/70 transition-all duration-1000 ease-out ${started ? "h-[20%]" : "h-0"}`}
              role="img"
              aria-label={`ECO STAR: <50 ${translations.unit}`}
            />
          </div>

          {/* NATURA — 0 mg/kg accent line at baseline */}
          <div className="flex w-16 items-end md:w-20">
            <div
              className={`h-1 w-full rounded-sm bg-primary transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}
              role="img"
              aria-label={`${translations.natura}: 0 ${translations.unit} — ${translations.noPatLabel}`}
            />
          </div>
        </div>

        {/* Labels row */}
        <div className="mx-auto mt-3 flex max-w-2xl justify-center gap-8 md:gap-16">
          <div className="w-16 text-center md:w-20">
            <p className="text-xs font-semibold text-foreground">{translations.traditional}</p>
            <p className="text-xs text-muted">{translations.euLimit}</p>
          </div>
          <div className="w-16 text-center md:w-20">
            <p className="text-xs font-semibold text-foreground">{translations.ecoStar}</p>
            <p className="text-xs text-muted">{translations.euLimit}</p>
          </div>
          <div className="w-16 text-center md:w-20">
            <p className="text-xs font-semibold text-primary">{translations.natura}</p>
            <p className="text-xs font-medium text-success">{translations.noPatLabel}</p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        {translations.unit} = mg/kg (PAH concentration)
      </p>
    </div>
  );
}
