import Image from "next/image";

import { CheckCircleFillIcon, CheckSmallIcon, StarFillIcon } from "@/components/icons/material-symbols";
import { ParallaxImageFrame } from "@/components/motion/parallax";
import { RevealList } from "@/components/motion/reveal-list";
import { SectionHeading } from "@/components/shared/section-heading";
import type { HiringStepsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B10 Hiring timeline (Hire "Hire your Dedicated Accounting Team in 5 Steps").
 * Desktop: white section, centred heading (H2 box 650px), then one #FAFAFA bordered panel
 * (padding 24, radius 8): left a 5-step list (40px #F3F8F2 markers with a green ring and
 * check_small, joined by a dashed green line; 20/28 titles, 16/24 copy, 32px apart); right
 * two 306×386 photos (radius 20, US-flag chip on the first), a white proof card (avatar
 * stack, "50+ Accounting Experts", amber "Avg match 48h" badge) and three trust checks.
 * The slate/amber hues are the Figma values (#0F172A, #64748B, #475569, #FFFBEB, #92400E…),
 * which are Tailwind's default slate/amber/sky steps.
 * No mobile design: the visual stacks under the list; the rows wrap.
 */
export function HiringSteps({ data, className }: { data: HiringStepsContent; className?: string }) {
  const [photoA, photoB] = data.photos;

  const id = sectionId(data, "hiringSteps");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn("section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          titleClassName="max-w-[650px]"
          subtitle={data.subtitle}
          subtitleClassName="max-w-[715px]"
        />

        <div className="grid gap-8 rounded-md border border-hairline bg-surface-soft p-4 lg:grid-cols-[minmax(0,570fr)_minmax(0,636fr)] lg:justify-between lg:gap-10 lg:p-6">
          {/* Each whole step (marker, text and its dashed connector) rises like the card sections
              around it (RevealList; whole-card motion since 2026-10-22). No overflow-hidden on
              the li: the dashed line runs past it on purpose. */}
          <RevealList as="ol" className="flex flex-col gap-8">
            {data.steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5">
                {i < data.steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-10 -bottom-8 left-5 w-px border-l border-dashed border-brand"
                  />
                ) : null}
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-brand bg-brand-50">
                  <CheckSmallIcon className="size-6 text-brand" />
                </span>
                <div className="flex flex-col gap-4 pt-1.5">
                  <h3 className="text-h5 text-heading">{step.title}</h3>
                  <p className="text-b1 text-body">{step.body}</p>
                </div>
              </li>
            ))}
          </RevealList>

          <div className="flex min-w-0 flex-col gap-5">
            <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
              {[photoA, photoB].map((photo) => (
                <ParallaxImageFrame
                  key={photo.src}
                  amount={3}
                  // Half the section: splash + zoom on hover (client request 2026-10-22).
                  className="img-splash img-zoom aspect-[306/386] rounded-[20px] border border-slate-200/80 bg-slate-100 shadow-xs"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1440px) 306px, (min-width: 1024px) 22vw, 50vw"
                    className="object-cover"
                  />
                </ParallaxImageFrame>
              ))}
              <p className="absolute bottom-6 left-2 flex max-w-[calc(100%-1rem)] items-center gap-3 rounded-full border border-sky-100 bg-white/95 py-1.5 pr-4 pl-1.5 text-b2 font-medium text-slate-900 backdrop-blur-sm lg:bottom-[38px] lg:left-3.5 lg:py-2.5 lg:pr-5 lg:pl-2.5 lg:text-b1">
                <Image
                  src={data.photoBadge.flag.src}
                  alt=""
                  width={data.photoBadge.flag.width}
                  height={data.photoBadge.flag.height}
                  className="size-7 shrink-0 rounded-full lg:size-[34px]"
                />
                {data.photoBadge.label}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-hairline bg-white px-5 pt-6 pb-5">
              <div className="flex min-w-0 items-center gap-3.5">
                {/* shrink-0: at 320px the stack used to shrink and slide under the label (audit L1). */}
                <div className="flex shrink-0 -space-x-3">
                  {data.proof.avatars.map((a) => (
                    <Image
                      key={a.src}
                      src={a.src}
                      alt={a.alt}
                      width={a.width}
                      height={a.height}
                      className="size-12 rounded-full object-cover ring-2 ring-white"
                    />
                  ))}
                </div>
                <p className="flex flex-col">
                  <span className="text-h3 leading-6 font-bold text-slate-900">{data.proof.value}</span>
                  <span className="text-b2 leading-6 font-medium text-slate-500">{data.proof.label}</span>
                </p>
              </div>
              <p className="flex items-center gap-2 rounded-[10px] border border-amber-200/70 bg-amber-50 px-3.5 py-1 text-b2 font-medium text-amber-800">
                <StarFillIcon className="size-5 text-amber-500" />
                {data.proof.badge}
              </p>
            </div>

            <ul className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-hairline pt-3.5">
              {data.trust.map((t) => (
                <li key={t} className="flex items-center gap-2 text-b2 leading-6 font-medium text-slate-600">
                  <CheckCircleFillIcon className="size-5 shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
