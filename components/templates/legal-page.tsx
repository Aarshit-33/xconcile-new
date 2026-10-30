import { ArticleBody } from "@/components/blog/article-body";
import { Eyebrow } from "@/components/shared/eyebrow";
import { RichText } from "@/components/shared/rich-text";
import { InquirySection } from "@/components/sections/inquiry-section";
import type { home } from "@/content/home";
import type { LegalPageData } from "@/sanity/lib/legal-page";

/** `2026-10-29` → `October 29, 2026` (UTC, so the day never shifts with the server's zone). */
function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Privacy Policy / Terms of Use (design pages/Privacy Policy.svg + pages/Terms of Use.svg,
 * 2026-10-29). Mobile first; one DOM for every breakpoint. Order as drawn:
 *  1. Dark hero, centred: "Last Updated" pill, H1, intro (520px tall on desktop: content at 195px,
 *     113px under the intro). Same gradient, glow and entrance as the other inner-page heroes.
 *  2. One light card (#FAFAFA, hairline border, 8px radius) holding the Content. The Content is
 *     edited in the blog editor and rendered by the blog's ArticleBody (user request 2026-10-29):
 *     same headings, lists, quotes, images, tables and spacing as a blog post, including empty
 *     lines exactly as typed in Studio. Card padding 32px; the first heading's own 16px top
 *     spacing is absorbed by a smaller top padding so it still starts 32px in.
 *  3. The shared contact section (Studio → Home Page → Contact), then the footer (layout).
 * Inline links in the intro use the site-wide `link-inline` style (green, underlined, darker
 * green on hover; client request 2026-10-30).
 */
export function LegalPageTemplate({
  content,
  inquiry,
  contactEmail,
}: {
  content: LegalPageData;
  inquiry: typeof home.inquiry;
  contactEmail?: string;
}) {
  const rise = (delay: number) => ({ animationDelay: `${delay}ms` });

  return (
    <>
      <section aria-labelledby="legal-title" className="relative overflow-hidden bg-dark-gradient">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_300px_at_100%_84%,var(--color-brand-glow),transparent_72%)] md:bg-[radial-gradient(520px_360px_at_100%_84%,var(--color-brand-glow),transparent_72%)] lg:bg-[radial-gradient(640px_420px_at_100%_100%,var(--color-brand-glow),transparent_72%)]"
        />
        <div className="relative container-site pt-[47px] pb-[41px] lg:pt-[195px] lg:pb-[113px]">
          <div className="mx-auto flex max-w-[359px] flex-col items-center gap-4 text-center md:max-w-[560px] lg:max-w-[753px]">
            <Eyebrow tone="hero" className="animate-hero-rise max-[360px]:px-3">
              Last Updated:{" "}
              <time dateTime={content.lastUpdated}>{formatDate(content.lastUpdated)}</time>
            </Eyebrow>
            {/* LCP element: transform-only entrance (no opacity fade), as in the shared Hero. */}
            <h1 id="legal-title" className="animate-hero-lift text-h1-m text-white lg:text-h1">
              {content.title}
            </h1>
            <p
              className="animate-hero-rise text-b1 font-medium text-on-dark lg:text-b3-tight"
              style={rise(120)}
            >
              <RichText value={content.intro} />
            </p>
          </div>
        </div>
      </section>

      <div className="container-site py-12 lg:pt-[93px] lg:pb-20">
        <article
          aria-labelledby="legal-title"
          className="rounded-md border border-hairline bg-surface-muted px-4 pt-2 pb-6 md:px-8 md:pt-4 md:pb-8 [&_h2]:scroll-mt-6 lg:[&_h2]:scroll-mt-header-offset"
        >
          <ArticleBody body={content.body} headingIds={content.headingIds} tableTone="light" />
        </article>
      </div>

      <InquirySection data={inquiry} contactEmail={contactEmail} />
    </>
  );
}
