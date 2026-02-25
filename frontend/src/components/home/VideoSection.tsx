"use client";

import type { WebVideo } from "@/lib/types";
import { assetUrl, IMG_PRESETS } from "@/lib/directus";

interface VideoSectionTranslations {
  title: string;
  watchVideo: string;
}

interface VideoSectionProps {
  videos: WebVideo[];
  translations: VideoSectionTranslations;
}

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function VideoCard({ video, watchVideoLabel }: { video: WebVideo; watchVideoLabel: string }) {
  const thumbnailUrl = video.thumbnail
    ? assetUrl(video.thumbnail, { width: IMG_PRESETS.card, format: "webp" })
    : null;

  function handleClick() {
    window.open(video.video_url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={handleClick}
      className="group relative w-full overflow-hidden rounded-[16px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      aria-label={`${watchVideoLabel}: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-primary-dark">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder when no thumbnail */
          <div className="flex h-full w-full items-center justify-center bg-primary-dark/60">
            <span className="text-warm-white/40 text-[13px] font-medium uppercase tracking-[2px]">
              Video
            </span>
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
            <div className="ml-1">
              <PlayIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <p className="mt-3 text-left font-body text-[14px] font-medium leading-snug text-warm-white/90 group-hover:text-warm-white transition-colors">
        {video.title}
      </p>
    </button>
  );
}

export default function VideoSection({ videos, translations }: VideoSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: `
          linear-gradient(180deg, #1a3a2a 0%, #1f4433 100%)
        `,
      }}
    >
      {/* Topographic contour pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              rgba(200, 220, 190, 0.4) 28px,
              rgba(200, 220, 190, 0.4) 29px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(200, 220, 190, 0.2) 40px,
              rgba(200, 220, 190, 0.2) 41px
            )
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-[13px] font-medium uppercase tracking-[3px] text-accent">
              VIVAZ CLAY TARGETS
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-[28px] font-bold leading-tight text-warm-white lg:text-[38px]">
            {translations.title}
          </h2>
        </div>

        {/* Video grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              watchVideoLabel={translations.watchVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
