import { ArticleBody } from "@/components/blog/article-body";
import { Hero } from "@/components/sections/hero";
import { routes } from "@/lib/routes";
import type { PrivacyPageContent } from "@/sanity/lib/privacy-page";

const formatDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Privacy Policy (`/privacy-policy`). NOT IN DESIGN: no Figma page, so it reuses the About
 * page's centred hero (shorter on desktop, one button to the contact section) and the blog
 * article's body styles (components/blog/article-body.tsx) in an 856px reading column.
 */
export function PrivacyPageTemplate({ content }: { content: PrivacyPageContent }) {
  const subtitle = content.lastUpdated
    ? `${content.intro} Last updated: ${formatDate(content.lastUpdated)}.`
    : content.intro;

  return (
    <>
      <Hero
        data={{
          badge: "Legal",
          title: content.title,
          subtitle,
          primaryCta: { label: "Questions? Contact us", href: routes.contact() },
          checks: [],
        }}
        variant="inner"
        align="center"
        className="lg:pt-[160px] lg:pb-[96px]"
      />
      <section aria-label={content.title} className="bg-white section-y">
        <div className="container-site">
          <div className="mx-auto max-w-[856px]">
            <ArticleBody body={content.body} headingIds={{}} />
          </div>
        </div>
      </section>
    </>
  );
}
