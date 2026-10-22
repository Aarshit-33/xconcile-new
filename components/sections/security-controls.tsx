import Image from "next/image";

import { Icon } from "@/components/icons/registry";
import { RevealList } from "@/components/motion/reveal-list";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";
import { Eyebrow } from "@/components/shared/eyebrow";
import type { SecurityControlsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B19b Security controls (Hire main page.svg, redrawn 2026-10-17). Desktop: white section,
 * padding 80; rose eyebrow (#FF4B55 text) over the centred 896px subtitle; 48px below, a
 * 1296×182 #FFF9FA banner (110px shield at 91px from the edge, 40px gap, 40/48 bold H2); 24px
 * below, three 416px white cards (24px padding, 20/28 medium title, 32px to the list) with
 * three rows each (48px #FFE4E6 rounded tile + 24px #FF4B55 icon, 16px gap, 16/24 title over
 * 14/20 body, rows 24px apart).
 * No mobile design: the banner keeps its row with a smaller shield; the cards stack below `lg`.
 */
export function SecurityControls({
  data,
  className,
}: {
  data: SecurityControlsContent;
  className?: string;
}) {
  return (
    <section
      id={sectionId(data, "security")}
      aria-labelledby="security-title"
      className={cn("bg-white section-y", className)}
    >
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Eyebrow + subtitle fade up like every section heading (2026-10-18). */}
          <FadeUp className="flex">
            <Eyebrow tone="rose" className="text-tint-rose-accent">
              {data.badge}
            </Eyebrow>
          </FadeUp>
          <FadeUp as="p" delay={0.12} className="max-w-[896px] text-b1 font-normal text-body lg:text-b3">
            {data.subtitle}
          </FadeUp>
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex items-center gap-4 rounded-md border border-hairline bg-tint-rose p-4 sm:gap-6 sm:p-6 lg:h-[182px] lg:gap-[39px] lg:py-0 lg:pr-6 lg:pl-[89px]">
            <Image
              src={data.shield.src}
              alt={data.shield.alt}
              width={data.shield.width}
              height={data.shield.height}
              unoptimized
              className="h-auto w-16 shrink-0 sm:w-20 lg:w-[112px]"
            />
            <RevealText as="h2" id="security-title" className="text-h2-m text-heading lg:text-h2">
              {data.title}
            </RevealText>
          </div>

          <RevealList className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {data.groups.map((group) => (
              <li
                key={group.title}
                className="flex flex-col gap-6 overflow-hidden rounded-md border border-hairline bg-white p-6 lg:gap-8"
              >
                <h3 className="text-h5 font-medium text-heading">{group.title}</h3>
                <ul className="flex flex-col gap-6">
                  {group.items.map((item) => (
                    <li key={item.title} className="flex items-center gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-tint-rose-line">
                        <Icon name={item.icon} className="size-6 text-tint-rose-accent" />
                      </span>
                      <div className="flex min-w-0 flex-col gap-1">
                        <p className="text-b1 font-medium text-heading">{item.title}</p>
                        <p className="text-b2 text-body">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </RevealList>
        </div>
      </div>
    </section>
  );
}
