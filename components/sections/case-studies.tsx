import { getImageProps } from "next/image";

import { Icon } from "@/components/icons/registry";
import { CtaLink } from "@/components/shared/cta";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CaseStudiesContent, CaseStudy } from "@/content/types";
import { sectionId } from "@/lib/section-ids";

/**
 * B7 Case-study tabs ("Trusted by Businesses & CPA Firms").
 * Mobile: centred heading, scrollable pill tab bar, then title → photo (with the
 * "Workload Impact" card) → Challenge / Solution / Result → full-width solid CTA.
 * Desktop: centred tab bar, bordered card (radius 0 0 8 8) with copy left, photo right.
 * The impact card was drawn on mobile only; it now shows on every screen size, with one Studio
 * switch ("Show impact card", user request 2026-10-26; was a per-device list) and an editable icon.
 * Only tabs that have content are rendered, and every panel is in the HTML (forceMount).
 * All panels share one grid cell and inactive ones are only `invisible` (not removed), so the card
 * is always as tall as the longest case study and the page doesn't jump when switching tabs
 * (user request 2026-10-25).
 */
export function CaseStudies({ data }: { data: CaseStudiesContent }) {
  const [first] = data.items;
  if (!first) return null;

  return (
    <section
      id={sectionId(data, "caseStudies")}
      aria-labelledby="case-studies-title"
      className="section-y"
    >
      <Tabs defaultValue={first.id} className="container-site gap-12">
        <div className="flex flex-col items-center gap-6 lg:gap-8">
          <SectionHeading
            eyebrow={data.badge}
            title={data.title}
            titleId="case-studies-title"
            subtitle={data.subtitle}
            className="max-w-[776px]"
          />
          <TabsList
            aria-label="Case studies by industry"
            // max-[360px]: tighter gap + pill padding so all tabs fit on 320px phones (audit L2).
            // Bar hugs its pills and is centred on every screen (user requests 2026-10-24); it only
            // reaches full width, and then scrolls from the first tab, when the pills don't fit.
            className="no-scrollbar h-14 w-fit max-w-full justify-start gap-6 overflow-x-auto rounded-[35px] border border-hairline bg-brand-50 px-4 py-0 group-data-horizontal/tabs:h-14 max-[360px]:gap-2"
          >
            {data.items.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                // before:*: invisible 44px-tall tap area around the 36px pill (no visual change).
                className="h-9 flex-none rounded-[32px] border-line bg-white px-6 py-2.5 text-b1 font-medium text-body before:absolute before:inset-x-0 before:-inset-y-1 hover:text-heading max-[360px]:px-4 data-active:border-brand data-active:bg-brand data-active:text-white group-data-[variant=default]/tabs-list:data-active:shadow-none"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="grid">
          {data.items.map((item) => (
            <TabsContent
              key={item.id}
              value={item.id}
              forceMount
              className="grid grid-rows-[auto_auto_auto_1fr] gap-8 [grid-area:1/1] data-[state=inactive]:invisible max-lg:data-[state=inactive]:hidden lg:grid-cols-[minmax(0,588fr)_minmax(0,539fr)] lg:grid-rows-[auto_auto_1fr] lg:gap-x-12 lg:gap-y-0 lg:rounded-b-md lg:border lg:border-hairline lg:p-6 xl:gap-x-[123px]"
            >
              <h3 className="text-h3 text-heading-alt">{item.title}</h3>

              {/* lg: the photo column spans the whole card height (min 380px = the drawn 539:380
                box) and the photo covers it, zoomed/cropped when the copy is taller (user
                request 2026-10-25: images always cover their area). */}
              <div className="relative lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:min-h-[380px]">
                <CaseStudyImage image={item.image} />
                {item.impact ? (
                  <div
                    // Laptop: a compact card in the photo's bottom-left corner (not drawn on desktop).
                    className="absolute inset-x-3.5 bottom-2 flex items-center gap-4 rounded-md bg-white px-4 py-2 lg:right-auto lg:bottom-6 lg:left-6 lg:pr-8 lg:shadow-md"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                      <Icon
                        name={item.impact.icon ?? "trending_down"}
                        className="size-6 text-brand"
                      />
                    </span>
                    <p className="flex flex-col gap-[5px] text-b1">
                      <span className="font-semibold text-body">{item.impact.label}</span>
                      <span className="font-bold text-brand">{item.impact.value}</span>
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-6 font-display text-b1 font-medium text-body lg:mt-8 lg:text-b3">
                <p>
                  <strong className="font-semibold text-heading-alt">Challenge:</strong>{" "}
                  {item.challenge}
                </p>
                <p>
                  <strong className="font-semibold text-heading-alt">Solution:</strong>{" "}
                  {item.solution}
                </p>
                <p>
                  <strong className="font-semibold text-heading-alt">Result:</strong> {item.result}
                </p>
              </div>

              {item.cta.href ? (
                // lg: the last grid row is 1fr, so self-end keeps the button on the card's bottom edge
                // whatever the copy length (user requests 2026-10-25); lg:mt-10 = minimum gap. Mobile
                // (client note 2026-10-28, 28-10-2026.svg): inactive panels are display:none so the
                // card is only as tall as its own copy, and the button sits 32px (gap-8) below it.
                <div className="self-end lg:mt-10">
                  {/* aria-label: a descriptive name for screen readers and crawlers (audit N-SEO9:
                      several identical "View Case Study" links); starts with the visible text. */}
                  <CtaLink
                    href={item.cta.href}
                    variant="outline"
                    mobileSolid
                    aria-label={`${item.cta.label}: ${item.title}`}
                  >
                    {item.cta.label}
                  </CtaLink>
                </div>
              ) : null}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
}

/** Art direction: the mobile design uses a different photo and crop than desktop. */
function CaseStudyImage({ image }: { image: CaseStudy["image"] }) {
  const common = {
    alt: image.alt,
    sizes: "(min-width: 1440px) 539px, (min-width: 1024px) 42vw, 100vw",
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: image.src, width: image.width, height: image.height });
  const mobile = image.mobile ?? image;
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height });

  return (
    // Zoom only on hover (client request 2026-10-22); the <picture> is the clipping frame.
    <picture className="block img-zoom overflow-hidden lg:absolute lg:inset-0 lg:rounded-md">
      <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes={imgProps.sizes} />
      <source srcSet={mobileSrcSet} sizes={imgProps.sizes} />
      {/* Art direction needs <picture>; the <img> props come from getImageProps */}
      <img
        {...imgProps}
        alt={image.alt}
        className="aspect-[358/265] w-full object-cover lg:aspect-auto lg:h-full"
      />
    </picture>
  );
}
