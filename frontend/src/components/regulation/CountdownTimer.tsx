"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const t = useTranslations("regulation");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    function calculate() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      setIsExpired(false);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }

    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Format the start date for the "in force" badge
  const startDate = new Date(targetDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (isExpired) {
    return (
      <div className="flex items-center gap-2.5 rounded-full border border-nature/40 bg-nature/15 px-4 py-1.5 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nature opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-nature"></span>
        </span>
        <span className="text-[12px] font-semibold uppercase tracking-[2px] text-nature">
          {t("liveStatus")}
        </span>
      </div>
    );
  }

  const blocks = [
    { value: timeLeft.days, label: t("days") },
    { value: timeLeft.hours, label: t("hours") },
    { value: timeLeft.minutes, label: t("minutes") },
    { value: timeLeft.seconds, label: t("seconds") },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-white/10 backdrop-blur-sm sm:h-[90px] sm:w-[90px] sm:rounded-[20px]">
            <span className="text-[28px] font-bold text-accent sm:text-[38px]">
              {String(block.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-[11px] font-medium uppercase tracking-wider text-warm-white/60 sm:text-[12px]">
            {block.label}
          </span>
          {/* Colon separator */}
          {i < blocks.length - 1 && (
            <span className="absolute hidden" aria-hidden="true">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
