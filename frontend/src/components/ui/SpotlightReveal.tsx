"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightRevealProps {
  topImage: string;
  bottomImage: string;
  className?: string;
  spotlightSize?: number;
}

export default function SpotlightReveal({
  topImage,
  bottomImage,
  className,
  spotlightSize = 200,
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maskPosition, setMaskPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  // Lazy initializer: default false for SSR; reads matchMedia immediately on client
  const [hasFinePointer, setHasFinePointer] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });

  // Listen for dynamic pointer changes (e.g., tablet docking)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMaskPosition({ x, y });
    },
    []
  );

  // On touch/coarse pointer devices: show bottom image directly, no mask or cursor effects
  if (!hasFinePointer) {
    return (
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden rounded-[24px]",
          className
        )}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bottomImage})` }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/9] w-full cursor-none overflow-hidden rounded-[24px]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Bottom layer: clean pine resin (revealed) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bottomImage})` }}
      />

      {/* Top layer: dark petroleum (masked by cursor) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-[mask-size] duration-300 ease-out"
        style={{
          backgroundImage: `url(${topImage})`,
          maskImage: isHovering
            ? `radial-gradient(circle ${spotlightSize}px at ${maskPosition.x}% ${maskPosition.y}%, transparent 0%, transparent 80%, black 100%)`
            : "none",
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle ${spotlightSize}px at ${maskPosition.x}% ${maskPosition.y}%, transparent 0%, transparent 80%, black 100%)`
            : "none",
        }}
      />

      {/* Custom cursor indicator */}
      {isHovering && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40"
          style={{
            left: `${maskPosition.x}%`,
            top: `${maskPosition.y}%`,
            width: spotlightSize * 0.6,
            height: spotlightSize * 0.6,
          }}
        >
          <div className="absolute inset-0 animate-ping rounded-full border border-white/20" />
        </div>
      )}

      {/* Hint label */}
      <div
        className={cn(
          "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm transition-opacity duration-500",
          isHovering ? "opacity-0" : "opacity-100"
        )}
      >
        <p className="whitespace-nowrap text-[13px] font-medium text-white">
          Mueve el cursor para descubrir
        </p>
      </div>
    </div>
  );
}
