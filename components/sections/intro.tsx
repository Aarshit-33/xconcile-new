import Image from "next/image";

import { Icon } from "@/components/icons/registry";
import { ParallaxImageFrame } from "@/components/motion/parallax";
import { RevealText } from "@/components/motion/reveal-text";
import { CheckItem } from "@/components/shared/check-item";
import { CtaLink } from "@/components/shared/cta";
import { RichText } from "@/components/shared/rich-text";
import type { IntroContent } from "@/content/types";
import { hoverGreen } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B4 Intro split.
 *
 * Home (`checksStyle: "pill"`): image (square on mobile) → copy → 2+1 feature cards → stacked
 * pills (one bordered row on desktop) → CTA (full-width solid on mobile, outline on desktop).
 * Desktop: image 416×576 | copy.
 *
 * Inner pages (`checksStyle: "list"`, audit design): image 635×609 | H2, two paragraphs, a
 * vertical check list closed by a hairline, outline CTA. No mobile design: Home's mobile
 * pattern is used (square image, full-width solid CTA).
 */
export function Intro({
  data,
  className,
  imageClassName,
}: {
  data: IntroContent;
  className?: string;
  /** Overrides the desktop photo aspect, e.g. `lg:aspect-[636/657]` (Hire design). */
  imageClassName?: string;
}) {
  const list = data.checksStyle === "list";
  const paragraph = data.bodyMoreLayout === "paragraph";

  return (
    <section id={sectionId(data, "intro")} aria-labelledby="intro-title" className={cn("relative overflow-hidden section-y", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-surface-soft lg:block"
      />
      <div
        className={cn(
          "relative container-site grid gap-8 lg:gap-6",
          list ? "lg:grid-cols-2 lg:items-start" : "lg:grid-cols-[416fr_855fr]",
        )}
      >
        <ParallaxImageFrame
          amount={3}
          className={cn(
            "aspect-square rounded-md md:aspect-[3/2]",
            list ? "lg:aspect-[635/609]" : "lg:aspect-auto lg:h-[576px]",
            // Half the section is this photo: splash + zoom on hover, on every page (client
            // request 2026-10-22; was Home-only). Both utilities live in globals.css.
            "img-splash img-zoom",
            imageClassName,
          )}
        >
          <Image
            src={data.image.src}
            alt={data.image.alt}
            fill
            sizes={
              list
                ? "(min-width: 1440px) 636px, (min-width: 1024px) 46vw, 100vw"
                : "(min-width: 1440px) 416px, (min-width: 1024px) 30vw, 100vw"
            }
            className="object-cover"
          />
        </ParallaxImageFrame>

        <div className={cn("flex flex-col gap-8", !list && "lg:gap-10")}>
          <div className={cn("flex flex-col", list ? "gap-8" : "gap-6")}>
            <div className={cn("flex flex-col", list ? "gap-8" : "gap-6")}>
              <RevealText as="h2" id="intro-title" className="text-h2-m text-heading lg:text-h2">
                {data.title}
              </RevealText>
              {paragraph ? (
                <div className="flex flex-col gap-6 text-b1 text-body">
                  <p>
                    <RichText value={data.body} />
                  </p>
                  {data.bodyMore ? (
                    <p>
                      <RichText value={data.bodyMore} />
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="text-b1 text-body">
                  <RichText value={data.body} />
                  {data.bodyMore ? (
                    <>
                      {" "}
                      <span className="mt-6 block lg:mt-0 lg:inline">
                        <RichText value={data.bodyMore} />
                      </span>
                    </>
                  ) : null}
                </p>
              )}
            </div>

            {data.features?.length ? (
              <ul className="grid grid-cols-2 gap-4 max-[360px]:grid-cols-1 lg:grid-cols-3 lg:gap-6">
                {data.features.map((f, i) => (
                  <li
                    key={f.label}
                    className={cn(
                      "flex flex-col gap-4 rounded-md border border-hairline p-6",
                      hoverGreen,
                      i === 2 && "col-span-2 max-[360px]:col-span-1 lg:col-span-1",
                    )}
                  >
                    <span className="flex size-10 items-center justify-center rounded-md border border-brand-border bg-brand-100">
                      <Icon name={f.icon} className="size-6 text-brand" />
                    </span>
                    <span className="text-b1 font-medium text-heading">{f.label}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Inner-page bullet list follows the copy weight (400); the Home chips are labels and
                keep 500 now that body copy is 400 (2026-10-22). */}
            {list ? (
              <ul className="flex flex-col gap-6 border-b border-hairline pb-8 text-b1 text-body">
                {data.checks.map((c) => (
                  <CheckItem key={c} className="gap-4" iconClassName="size-6">
                    {c}
                  </CheckItem>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-4 text-b1 font-medium text-heading lg:mt-4 lg:flex-row lg:flex-wrap lg:gap-x-[30px] lg:gap-y-2 lg:rounded-[37px] lg:border lg:border-hairline lg:px-4 lg:py-2">
                {data.checks.map((c) => (
                  <CheckItem
                    key={c}
                    variant="chip"
                    className="gap-4 rounded-[37px] bg-brand-50 px-4 py-2 lg:rounded-none lg:bg-transparent lg:p-0"
                  >
                    {c}
                  </CheckItem>
                ))}
              </ul>
            )}
          </div>

          <div>
            <CtaLink href={data.cta.href} variant="outline" mobileSolid>
              {data.cta.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
