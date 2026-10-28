import { getImageProps } from "next/image";

import type { BlogArticleSettings } from "@/content/blog-gallery";

import { NewsletterForm } from "./newsletter-form";

/**
 * "Stay Updated" (design pages/blog/page.svg): the site's CTA band look (photo under the 90%
 * navy overlay, centred white heading + copy, see components/sections/cta-band.tsx) with the
 * newsletter form in place of the button. Copy: Studio → Blog Gallery → Article pages.
 */
export function NewsletterBand({ data }: { data: BlogArticleSettings["newsletter"] }) {
  const {
    props: { src },
  } = getImageProps({ src: data.image.src, alt: "", width: 1440, height: 960, quality: 70 });

  return (
    <section
      id="stay-updated"
      aria-labelledby="stay-updated-title"
      className="bg-cta-overlay py-16 lg:flex lg:min-h-[463px] lg:items-center lg:py-20"
      style={{ "--cta-image": `url(${src})` } as React.CSSProperties}
    >
      <div className="container-site flex flex-col items-center gap-8 text-center lg:gap-10">
        <div className="flex max-w-[640px] flex-col items-center gap-4 lg:gap-6">
          <h2 id="stay-updated-title" className="text-h2-m text-white lg:text-h2">
            {data.title}
          </h2>
          <p className="text-b1 font-medium text-on-dark lg:text-b3">{data.body}</p>
        </div>
        <NewsletterForm copy={data} />
      </div>
    </section>
  );
}
