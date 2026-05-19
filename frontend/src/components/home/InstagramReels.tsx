"use client";

import { useRef, useEffect } from "react";
import Container from "@/components/ui/Container";
import InView from "@/components/ui/InView";

interface Reel {
  src: string;
  instagramUrl: string;
  mention?: { name: string; url: string };
}

const REELS: Reel[] = [
  {
    src: "/img/reels/reel-1.webm",
    instagramUrl: "https://www.instagram.com/p/DUP6RvhCFk2/",
  },
  {
    src: "/img/reels/reel-2.webm",
    instagramUrl: "https://www.instagram.com/p/DTVnjvKAGZl/",
    mention: { name: "@skeethaase", url: "https://www.instagram.com/skeethaase/" },
  },
  {
    src: "/img/reels/reel-3.webm",
    instagramUrl: "https://www.instagram.com/p/DH1M2DMNfmV/",
    mention: { name: "@davidedecarolis_", url: "https://www.instagram.com/davidedecarolis_/" },
  },
  {
    src: "/img/reels/reel-4.webm",
    instagramUrl: "https://www.instagram.com/p/DAJU1watfiB/",
    mention: { name: "@davidedecarolis_", url: "https://www.instagram.com/davidedecarolis_/" },
  },
];

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <InView animation="fade-in-up" delay={index * 100}>
      <a
        href={reel.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-[20px] bg-primary/5 aspect-[9/16] cursor-pointer"
      >
        <video
          ref={videoRef}
          src={reel.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Instagram icon + mention */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            {reel.mention && (
              <span className="text-xs font-medium text-white/90">{reel.mention.name}</span>
            )}
          </div>
          <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider">Ver en Instagram</span>
        </div>

        {/* Play icon center (always visible, fades on hover) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
          <div className="rounded-full bg-black/30 backdrop-blur-sm p-3">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
        </div>
      </a>
    </InView>
  );
}

export default function InstagramReels() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <InView animation="fade-in-up">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              @vivazclaytargets
            </p>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-bold text-primary">
              VIVAZ EN ACCION
            </h2>
          </div>
        </InView>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {REELS.map((reel, i) => (
            <ReelCard key={reel.src} reel={reel} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/vivazclaytargets/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/15 px-6 py-3 font-body text-sm font-semibold text-primary transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            VER TODO EN INSTAGRAM
          </a>
        </div>
      </Container>
    </section>
  );
}
