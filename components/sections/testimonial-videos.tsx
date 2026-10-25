"use client";

import Image from "next/image";
import { useState } from "react";

import { PlayTriangleIcon } from "@/components/icons/brand-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { TestimonialVideo } from "@/content/types";
import { cn } from "@/lib/utils";

type Video = TestimonialVideo;

const flags = {
  us: { src: "/images/flags/us-flag.png", alt: "United States" },
} as const;

/**
 * Video testimonial with a click-to-load facade (no YouTube JS until the visitor presses
 * play), plus the thumbnail slider drawn under it in both designs (desktop 856px row: arrow,
 * 226x128 thumbnails 24px apart, arrow; mobile: same thumbnails 16px apart, overflowing).
 * Picking a thumbnail swaps the main video. Videos come from Studio → Home → Testimonials.
 */
export function TestimonialVideos({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = videos[active];
  if (!video) return null;

  const flag = flags[video.country];

  return (
    <div className="flex flex-col gap-6">
      {/* Poster zooms on hover (client request 2026-10-22); the caption flag is fixed-size, so
          `img-zoom` leaves it alone. */}
      <figure className="img-zoom relative aspect-[358/201] overflow-hidden rounded-md border border-white/20 bg-navy lg:aspect-[856/480] lg:rounded-sm">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <>
            <Image
              src={video.poster.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 856px, calc(100vw - 32px)"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(270deg,rgb(102_102_102/0.7)_0%,rgb(0_0_0/0.7)_100%)]"
            />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${video.title}`}
              className="group absolute inset-0 cursor-pointer outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-inset"
            >
              <span
                aria-hidden
                // max-[360px]: 32px button + 8px caption gap so it clears the name on 320px phones (audit L3).
                className="absolute top-[13px] left-[17px] flex size-10 items-center justify-center rounded-full border-[0.77px] border-brand/50 bg-brand max-[360px]:top-2.5 max-[360px]:size-8 lg:top-[27px] lg:left-[29px] lg:size-[77px] lg:bg-white/20"
              >
                <PlayTriangleIcon className="ml-0.5 size-7 text-white max-[360px]:size-[22px] lg:ml-1 lg:size-11" />
              </span>
            </button>
            <figcaption className="pointer-events-none absolute bottom-1.5 left-4 flex flex-col gap-4 text-white max-[360px]:gap-2 lg:bottom-[42px] lg:left-8">
              <span className="flex flex-col gap-1">
                <span className="text-h5 lg:text-stat-sm">{video.name}</span>
                <span className="text-b1 font-medium lg:text-b3">{video.company}</span>
              </span>
              <Image src={flag.src} alt={flag.alt} width={70} height={37} className="h-[37px] w-[70px]" />
            </figcaption>
          </>
        )}
      </figure>

      {/* Viewport width follows the number of videos, max 3 (user request 2026-10-25): each slot
          is a 226px thumbnail plus the 16px (lg 24px) gap, so with 1–2 videos the viewport shrinks
          to fit them and `justify-center` centres the row, keeping both arrows right beside the
          thumbnails. With more than 3 the viewport holds exactly 3 (726px on desktop, as drawn) and
          scrolls; on narrow phones it shrinks to the space left between the arrows. */}
      <Carousel
        opts={{ align: "start" }}
        style={{ "--thumbs": Math.min(videos.length, 3) } as React.CSSProperties}
        className="flex items-center justify-center gap-4 lg:gap-6 [&>[data-slot=carousel-content]]:min-w-0 [&>[data-slot=carousel-content]]:flex-1 [&>[data-slot=carousel-content]]:max-w-[calc(var(--thumbs)*226px+(var(--thumbs)-1)*16px)] lg:[&>[data-slot=carousel-content]]:max-w-[calc(var(--thumbs)*226px+(var(--thumbs)-1)*24px)]"
      >
        {/* relative inset-auto + before:*: invisible 44x44 tap area around the 40px arrow. inset-auto
            cancels the base -left-12/-right-12 offsets, so the arrow stays where `static` put it. */}
        <CarouselPrevious className="relative inset-auto size-10 shrink-0 translate-y-0 rounded-full border-0 bg-brand-50 text-brand before:absolute before:-inset-0.5 hover:bg-brand-100" />
        <CarouselContent className="-ml-4 lg:-ml-6">
          {videos.map((v, i) => {
            const thumbFlag = flags[v.country];
            return (
              // Index key: the same video may be listed more than once.
              // Fixed 226px thumbnails + the 16/24px gutter (border-box) at every width, so the
              // viewport sizing above holds; 3 fill the drawn 726px desktop row (audit L2: a 4th was
              // hard-cut at the arrow).
              <CarouselItem key={`${v.youtubeId}-${i}`} className="basis-[242px] pl-4 lg:basis-[250px] lg:pl-6">
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPlaying(false);
                  }}
                  aria-label={`Show video: ${v.title} (${v.name}, ${v.company})`}
                  aria-current={i === active ? "true" : undefined}
                  className={cn(
                    "img-zoom relative block aspect-[226/128] w-full cursor-pointer overflow-hidden rounded-md border border-transparent outline-none focus-visible:ring-3 focus-visible:ring-brand",
                    i === active && "border-brand",
                  )}
                >
                  <Image src={v.poster.src} alt="" fill sizes="226px" className="object-cover" />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(270deg,rgb(102_102_102/0.7)_0%,rgb(0_0_0/0.7)_100%)]"
                  />
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 flex size-[26px] -translate-1/2 items-center justify-center rounded-full bg-brand"
                  >
                    <PlayTriangleIcon className="ml-px size-3.5 text-white" />
                  </span>
                  {/* Figma: 10.56px name, 18.5x9.75 flag at left 8.45 / bottom ~10. The 5.28px company
                      line was dropped (unreadable, audit L2); it stays in the aria-label. */}
                  <span
                    aria-hidden
                    className="absolute bottom-2.5 left-2 flex w-[88px] flex-col gap-1 text-left text-white"
                  >
                    <span className="truncate text-[10.5px] leading-[13px] font-bold">{v.name}</span>
                    <Image
                      src={thumbFlag.src}
                      alt=""
                      width={19}
                      height={10}
                      className="h-[9.75px] w-[18.5px]"
                    />
                  </span>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext className="relative inset-auto size-10 shrink-0 translate-y-0 rounded-full border-0 bg-brand-50 text-brand before:absolute before:-inset-0.5 hover:bg-brand-100" />
      </Carousel>
    </div>
  );
}
