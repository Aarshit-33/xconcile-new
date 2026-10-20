import Image from "next/image";

import { StarIcon } from "@/components/icons/brand-icons";
import { CountUp } from "@/components/motion/count-up";
import type { StatsContent } from "@/content/types";
import { sectionId } from "@/lib/section-ids";

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
              className="flex flex-col items-center gap-4 p-4 text-center lg:border-r lg:border-hairline lg:px-5 lg:py-6 xl:items-start xl:text-left"
            >
              <p className="text-[40px]/10 font-bold text-brand lg:text-stat">
                <CountUp value={s.value} index={i} />
              </p>
              <p className="text-b1 text-body">{s.label}</p>
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
