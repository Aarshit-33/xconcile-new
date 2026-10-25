import Image from "next/image";

import { StarIcon } from "@/components/icons/brand-icons";
import { CountUp } from "@/components/motion/count-up";
import type { StatsContent } from "@/content/types";
import { hoverGreenAccent } from "@/lib/hover";
import { sectionId } from "@/lib/section-ids";
import { cn } from "@/lib/utils";

/**
 * B2 Stats + trust bar. Mobile: 2×2 grid then ISO | Google row. Desktop: 4 stat cells with
 * dividers + ISO | Google cell (cells 242px, gap 24, padding 24).
 * The 4 numbers count up from 0 on scroll-in (<CountUp>, client request 2026-10-17).
 */
export function StatsBar({ data }: { data: StatsContent }) {
  return (
    <section id={sectionId(data, "stats")} aria-label="Key figures" className="border-b border-hairline">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-[repeat(4,minmax(0,242fr))_minmax(0,238fr)]">
          {data.items.map((s, i) => (
            // Centred below xl to match the trust cards (client request 2026-10-17); xl = drawn left.
            <div
              key={s.label}
              className={cn(
                "flex flex-col items-center gap-4 p-4 text-center lg:border-r lg:border-hairline lg:px-5 lg:py-6 xl:items-start xl:text-left",
                hoverGreenAccent,
                // The 24px column gap sits between the previous cell's divider and this cell, so the
                // hover shade + bottom line started 24px after the divider (client report
                // 2026-10-22). A ::before fills that gap with the same hover paint (lg+, where the
                // dividers are; the first cell has no divider to its left). Layout is untouched.
                i > 0 &&
                  "lg:relative lg:before:pointer-events-none lg:before:absolute lg:before:inset-y-0 lg:before:right-full lg:before:w-6 lg:before:transition-[background-color,box-shadow] lg:before:duration-200 lg:hover:before:bg-brand-50 lg:hover:before:shadow-[inset_0_-2px_0_var(--color-brand)]",
              )}
            >
              {s.image ? (
                // Icon in place of the number (RCM design: caduceus over "HIPAA Compliant"); same
                // line height as the figures, so the labels stay on one row.
                <span className="flex h-10 items-center lg:h-14">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    className="h-10 w-auto object-contain lg:h-12"
                  />
                </span>
              ) : (
                <p className="text-[40px]/10 font-bold text-brand lg:text-stat">
                  <CountUp value={s.value} index={i} />
                </p>
              )}
              <p className="text-b1 font-medium text-body">{s.label}</p>
            </div>
          ))}

          {/*
            Trust cell. Below xl (mobile, tablet, small laptop; client request 2026-10-17): two
            equal cards, contents centred, lined up with the stat columns (px-4 + gap-4 puts card 2
            under the second stat column) and 24px from the bar's bottom edge. xl: the drawn
            single cell (ISO | divider | Google), no card chrome.
          */}
          <div className="col-span-2 grid grid-cols-2 gap-4 px-4 pt-2 pb-6 lg:col-span-4 lg:gap-6 lg:px-5 xl:col-span-1 xl:flex xl:items-center xl:gap-6 xl:p-0 xl:py-6">
            <div className="flex items-center justify-center rounded-md border border-hairline bg-white p-4 xl:block xl:shrink-0 xl:border-0 xl:bg-transparent xl:p-0">
              <Image
                src="/images/brand/iso-27001.png"
                alt="ISO/IEC 27001:2022 certified company"
                width={123}
                height={123}
                className="size-[89px] shrink-0 object-contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 rounded-md border border-hairline bg-white p-4 xl:items-start xl:rounded-none xl:border-0 xl:border-l xl:bg-transparent xl:p-0 xl:pl-6">
              <p className="flex items-center gap-2 text-h5 font-medium text-heading">
                <StarIcon className="size-[22px] text-star" />
                <span>
                  {data.rating.value}
                  <span className="sr-only"> out of 5 rating on {data.rating.source}</span>
                </span>
              </p>
              <Image
                src="/images/brand/google.png"
                alt="Google"
                width={188}
                height={60}
                className="h-[29px] w-[92px] object-contain xl:object-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
