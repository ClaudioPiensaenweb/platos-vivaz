"use client";

import type { WebVideo } from "@/lib/types";
import { assetUrl } from "@/lib/directus";

interface VideoReelsTranslations {
  title: string;
  watchVideo: string;
  viewAll: string;
}

interface VideoReelsProps {
  videos: WebVideo[];
  translations: VideoReelsTranslations;
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

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ReelCard({
  video,
  watchVideoLabel,
}: {
  video: WebVideo;
  watchVideoLabel: string;
}) {
  const thumbnailUrl = video.thumbnail
    ? assetUrl(video.thumbnail, { width: 400, format: "webp" })
    : null;

  function handleClick() {
    window.open(video.video_url, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="group relative w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        aria-label={`${watchVideoLabel}: ${video.title}`}
      >
        {/* Thumbnail — 9:16 vertical aspect ratio */}
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[16px] bg-primary-dark">
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
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20 rounded-[16px]" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
              <div className="ml-1">
                <PlayIcon />
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Title below card */}
      <p className="mt-2 font-body text-[13px] font-medium leading-snug text-warm-white/90">
        {video.title}
      </p>
    </div>
  );
}

function PlaceholderReelCard() {
  return (
    <div>
      {/* 9:16 placeholder card */}
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[16px] bg-primary-dark/60">
        {/* Placeholder content */}
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-warm-white/30 text-[13px] font-medium uppercase tracking-[2px]">
            Video
          </span>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 rounded-[16px]" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/40 shadow-lg">
            <div className="ml-1 opacity-60">
              <PlayIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder title bar */}
      <div className="mt-2 h-3 w-3/4 rounded bg-warm-white/10" />
    </div>
  );
}

export default function VideoReels({ videos, translations }: VideoReelsProps) {
  const isEmpty = videos.length === 0;

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: "linear-gradient(180deg, #1a3a2a 0%, #1f4433 100%)",
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
        <div className="mb-12">
          {/* Subtitle with decorative lines */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-[13px] font-medium uppercase tracking-[3px] text-accent">
              VIVAZ CLAY TARGETS
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>

          {/* Title + "Ver todos" link row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[28px] font-bold leading-tight text-warm-white lg:text-[38px]">
              {translations.title}
            </h2>

            {/* "VER TODOS LOS VIDEOS" link */}
            <a
              href="https://www.instagram.com/vivaz_claytargets/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 text-accent text-[14px] font-semibold uppercase tracking-[2px] transition-colors hover:text-warm-white"
            >
              {translations.viewAll}
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Video grid — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {isEmpty
            ? Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderReelCard key={i} />
              ))
            : videos.map((video) => (
                <ReelCard
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
