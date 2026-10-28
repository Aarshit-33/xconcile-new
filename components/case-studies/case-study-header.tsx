import Image from "next/image";

import { Icon, isIconName, type IconName } from "@/components/icons/registry";
import { Eyebrow } from "@/components/shared/eyebrow";
import type { CaseStudyPage } from "@/sanity/lib/case-studies";

const iconName = (name: string): IconName => (isIconName(name) ? name : "verified_user");

/**
 * Case study hero (design pages/case study/page.svg): dark band, "Case study" pill and the H1,
 * left-aligned, no button. Desktop: pill at 203px from the top (under the floating navbar),
 * 106px below the title.
 */
export function CaseStudyHero({ title, badge }: { title: string; badge: string }) {
  return (
    <section
      aria-labelledby="case-study-title"
      className="relative overflow-hidden bg-dark-gradient"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_300px_at_100%_90%,var(--color-brand-glow),transparent_72%)] lg:bg-[radial-gradient(640px_420px_at_100%_100%,var(--color-brand-glow),transparent_72%)]"
      />
      <div className="relative container-site flex flex-col items-start gap-4 pt-10 pb-12 md:pt-14 md:pb-16 lg:gap-6 lg:pt-[203px] lg:pb-[106px]">
        <Eyebrow tone="hero">{badge}</Eyebrow>
        <h1
          id="case-study-title"
          className="max-w-[1060px] text-h2-m text-white md:text-h2 lg:text-[52px] lg:leading-[68px]"
        >
          {title}
        </h1>
      </div>
    </section>
  );
}

/**
 * Photo + the Client / Service / Project Goal card (design: 857×400 photo, 416px card beside
 * it, top-aligned). Phones and tablets: photo, then the card under it.
 */
export function CaseStudyOverview({ study }: { study: CaseStudyPage }) {
  if (!study.image && !study.facts.length) return null;
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,857fr)_minmax(0,416fr)] lg:items-start">
      {study.image ? (
        <div className="relative aspect-[358/240] overflow-hidden rounded-md md:aspect-[857/400]">
          <Image
            src={study.image.src}
            alt={study.image.alt}
            fill
            priority
            sizes="(min-width: 1440px) 857px, (min-width: 1024px) 66vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      {study.facts.length ? (
        <dl className="flex flex-col rounded-md border border-hairline bg-surface-muted px-6 py-2">
          {study.facts.map((f, i) => (
            <div
              key={i}
              className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-4 border-b border-hairline py-6 last:border-b-0"
            >
              <Icon name={iconName(f.icon)} aria-hidden className="size-6 text-brand" />
              <dt className="text-b2 text-body">{f.label}</dt>
              <dd className="col-start-2 mt-2 flex flex-col gap-2">
                <span className="font-display text-h5 font-medium text-heading-alt">{f.title}</span>
                {f.text ? <span className="text-b1 text-body">{f.text}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
