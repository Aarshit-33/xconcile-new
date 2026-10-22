import { CheckIcon, StarFillIcon } from "@/components/icons/material-symbols";
import { Icon } from "@/components/icons/registry";
import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { EngagementModelsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B20 Engagement models (Hire "Choose Accounting Support That Fits Your Workload").
 * Desktop: #FAFAFA, padding 80/71, three equal-height 416px cards (padding 24, radius 8): number
 * chip + glyph row, H4 title over a green 14/20 tagline and a hairline, 16/24 copy, check list
 * (20px #E7F6E2 discs, 14/20), full-width 48px button. The featured card (spec `featured-card`)
 * is #13212C with white copy, filled green discs, a green "Most Popular" pill and a solid button.
 * No mobile design: the cards become the Home-style snap rail (300px cards, progress bar).
 */
export function EngagementModels({ data, className }: { data: EngagementModelsContent; className?: string }) {
  const titleId = `${data.id ?? "engagement-models"}-title`;

  return (
    <section id={sectionId(data, "engagementModels")}
      aria-labelledby={titleId}
      className={cn("bg-white section-y", className)}
    >
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
          subtitleClassName="max-w-[715px]"
        />

        <Rail label={data.title} listClassName="lg:grid lg:grid-cols-3 lg:gap-6" reveal>
          {data.items.map((m) => {
            const featured = m.featured === true;
            return (
              <li
                key={m.title}
                className={cn(
                  "flex w-[300px] shrink-0 snap-start flex-col gap-8 overflow-hidden rounded-md border border-hairline p-6 lg:w-auto",
                  // No hover background on these cards (client request 2026-10-22).
                  featured ? "bg-navy" : "bg-white",
                )}
              >
                <div className="flex items-center justify-between gap-4 p-2.5">
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-sm border text-b1 font-medium",
                      featured ? "border-transparent bg-white text-brand" : "border-hairline text-black",
                    )}
                  >
                    {m.number}
                  </span>
                  {featured ? (
                    <span className="flex h-8 items-center gap-2.5 rounded-[23px] bg-brand px-4 text-b2 font-medium text-white">
                      <StarFillIcon className="size-4" />
                      {data.featuredLabel}
                    </span>
                  ) : m.icon ? (
                    <Icon name={m.icon} className="size-8 text-heading" />
                  ) : null}
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <div
                      className={cn(
                        "flex flex-col gap-2 border-b pb-6",
                        featured ? "border-white/8" : "border-hairline",
                      )}
                    >
                      {/* 1024–1439: one title wraps ("Hourly Accounting Support"), so all reserve
                          two lines and the taglines line up (audit L3). One line from 1440. */}
                      <h3
                        className={cn(
                          "text-h3 font-bold lg:max-[1439.98px]:min-h-[2lh]",
                          featured ? "text-white" : "text-heading",
                        )}
                      >
                        {m.title}
                      </h3>
                      <p className="text-b2 font-medium text-brand">{m.tagline}</p>
                    </div>
                    <p className={cn("text-b1", featured ? "text-white" : "text-body")}>{m.body}</p>
                  </div>

                  <ul className="flex flex-col gap-4">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-b2">
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full",
                            featured ? "bg-brand text-white" : "bg-brand-100 text-brand",
                          )}
                        >
                          <CheckIcon className="size-4" />
                        </span>
                        <span className={featured ? "text-on-dark" : "text-body"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <CtaLink
                    href={m.cta.href}
                    variant={featured ? "solid" : "outline"}
                    block="always"
                    arrow={false}
                    className="justify-center px-6 text-center"
                  >
                    {m.cta.label}
                  </CtaLink>
                </div>
              </li>
            );
          })}
        </Rail>
      </div>
    </section>
  );
}
