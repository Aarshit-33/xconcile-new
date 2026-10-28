import { SectionHeading } from "@/components/shared/section-heading";
import type { TestimonialsContent } from "@/content/types";

import { TestimonialVideos } from "./testimonial-videos";
import { sectionId } from "@/lib/section-ids";

/**
 * B14 Video testimonials. Mobile: #163142 section, 358px video. Desktop: dark gradient,
 * 856px video centred under the heading. VideoObject JSON-LD is emitted by the page.
 */
export function Testimonials({ data }: { data: TestimonialsContent }) {
  if (!data.videos.length) return null;

  return (
    <section
      id={sectionId(data, "testimonials")}
      aria-labelledby="testimonials-title"
      className="bg-navy-3 bg-dark-gradient section-y"
    >
      <div className="container-site flex flex-col items-center gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          eyebrowTone="glass"
          tone="dark"
          title={data.title}
          titleId="testimonials-title"
          subtitle={data.subtitle}
          className="max-w-[776px]"
          subtitleClassName="text-b1 text-white lg:text-b3"
        />
        <div className="w-full max-w-[856px]">
          <TestimonialVideos videos={data.videos} />
        </div>
      </div>
    </section>
  );
}
