import Image from "next/image";
import Link from "next/link";

import { ArrowForwardIcon } from "@/components/icons/material-symbols";
import { routes } from "@/lib/routes";
import type { CaseStudyCard as CaseStudyCardData } from "@/sanity/lib/case-studies";

/** Photo sizes in the 1 / 2 / 3-column grids (416px max on desktop). */
export const caseStudyCardSizes =
  "(min-width: 1440px) 416px, (min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw";

/**
 * Case study card (designs: Case study gallary + case study "Related Case Studies"): the photo
 * fills the 416×358 card under a dark wash that deepens towards the bottom; industry, title and
 * the link text sit over it, bottom-left, in white. The whole card is one link (stretched title
 * link); the link text with the green arrow is visual only. Photo zooms on hover.
 */
export function CaseStudyCard({
  item,
  linkLabel,
  sizes = caseStudyCardSizes,
}: {
  item: CaseStudyCardData;
  linkLabel: string;
  sizes?: string;
}) {
  return (
    <article className="img-zoom-trigger group/cs relative isolate flex aspect-[416/358] w-full flex-col overflow-hidden rounded-md bg-navy">
      <div className="absolute inset-0 -z-10 img-zoom">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : null}
      </div>
      {/* Wash: the whole photo dimmed, darkest behind the text (design). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.25)_0%,rgb(0_0_0/0.45)_45%,rgb(0_0_0/0.88)_100%)]"
      />
      <div className="mt-auto flex flex-col gap-2 p-6 text-white">
        {item.industry ? <p className="text-b1 font-medium">{item.industry}</p> : null}
        <h3 className="font-display text-h4-m font-medium text-white lg:text-h5">
          <Link
            href={routes.caseStudy(item.slug)}
            className="text-white outline-none after:absolute after:inset-0 after:rounded-md focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {item.title}
          </Link>
        </h3>
        <span aria-hidden className="mt-4 flex items-center gap-4 text-b1 font-medium">
          {linkLabel}
          <ArrowForwardIcon className="size-6 text-brand transition-transform group-hover/cs:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
