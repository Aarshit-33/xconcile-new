import { getImageProps } from "next/image";

import { TrendingDownIcon } from "@/components/icons/material-symbols";
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
 * Only tabs that have content are rendered, and every panel is in the HTML (forceMount).
 */
export function CaseStudies({ data }: { data: CaseStudiesContent }) {
  const [first] = data.items;
  if (!first) return null;

  return (
    <section id={sectionId(data, "caseStudies")} aria-labelledby="case-studies-title" className="section-y">
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
            className="no-scrollbar h-14 w-full justify-start gap-6 overflow-x-auto rounded-[35px] border border-hairline bg-brand-50 px-4 py-0 group-data-horizontal/tabs:h-14 max-[360px]:gap-2 lg:w-fit lg:justify-center"
          >
            {data.items.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                // before:*: invisible 44px-tall tap area around the 36px pill (no visual change).
                className="h-9 flex-none rounded-[32px] border-line bg-white px-6 py-2.5 text-b1 font-medium text-body before:absolute before:inset-x-0 before:-inset-y-1 hover:text-heading data-active:border-brand data-active:bg-brand data-active:text-white group-data-[variant=default]/tabs-list:data-active:shadow-none max-[360px]:px-4"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {data.items.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            forceMount
            className="grid gap-8 data-[state=inactive]:hidden lg:grid-cols-[minmax(0,588fr)_minmax(0,539fr)] lg:grid-rows-[auto_auto_1fr] lg:gap-x-12 lg:gap-y-0 lg:rounded-b-md lg:border lg:border-hairline lg:p-6 xl:gap-x-[123px]"
          >
            <h3 className="text-h3 text-heading-alt">{item.title}</h3>

            <div className="relative lg:col-start-2 lg:row-span-3 lg:row-start-1">
              <CaseStudyImage image={item.image} />
              {item.impact ? (
                <div className="absolute inset-x-3.5 bottom-2 flex items-center gap-4 rounded-md bg-white px-4 py-2 lg:hidden">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                    <TrendingDownIcon className="size-6 text-brand" />
                  </span>
                  <p className="flex flex-col gap-[5px] text-b1">
                    <span className="font-semibold text-body">{item.impact.label}</span>
                    <span className="font-bold text-brand">{item.impact.value}</span>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-6 font-display text-b3 font-normal text-body lg:mt-8">
              <p>
                <strong className="font-semibold text-heading-alt">Challenge:</strong> {item.challenge}
              </p>
              <p>
                <strong className="font-semibold text-heading-alt">Solution:</strong> {item.solution}
              </p>
              <p>
                <strong className="font-semibold text-heading-alt">Result:</strong> {item.result}
              </p>
            </div>

            {item.cta.href ? (
              <div className="mt-4 lg:mt-10">
                <CtaLink href={item.cta.href} variant="outline" mobileSolid>
                  {item.cta.label}
                </CtaLink>
              </div>
            ) : null}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

/** Art direction: the mobile design uses a different photo and crop than desktop. */
function CaseStudyImage({ image }: { image: CaseStudy["image"] }) {
  const common = { alt: image.alt, sizes: "(min-width: 1440px) 539px, (min-width: 1024px) 42vw, 100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: image.src, width: image.width, height: image.height });
  const mobile = image.mobile ?? image;
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height });

  return (
    // Zoom only on hover (client request 2026-10-22); the <picture> is the clipping frame.
    <picture className="img-zoom block overflow-hidden lg:rounded-md">
      <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes={imgProps.sizes} />
      <source srcSet={mobileSrcSet} sizes={imgProps.sizes} />
      {/* Art direction needs <picture>; the <img> props come from getImageProps */}
      <img
        {...imgProps}
        alt={image.alt}
        className="aspect-[358/265] w-full object-cover lg:aspect-[539/380]"
      />
    </picture>
  );
}
