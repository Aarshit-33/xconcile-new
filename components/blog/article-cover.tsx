import Image from "next/image";

import type { BlogArticle } from "@/sanity/lib/blog-post";

const sizes = "(min-width: 1440px) 856px, (min-width: 1024px) 60vw, 100vw";

/**
 * Article cover (design pages/blog/page.svg). With "Text on the cover image" filled in (Studio),
 * a dark banner: the photo under a navy gradient (solid on the left where the text sits, fading
 * to the right), the white Xconcile logo top-left, the heading and a short line. Mobile first: a
 * taller box with smaller type on phones, the drawn 856×400 proportions from md. The banner's
 * heading is decorative (the H1 is in the hero), so it is not a heading element.
 * Without overlay text, the plain cover image.
 */
export function ArticleCover({ article }: { article: BlogArticle }) {
  const { cover, coverOverlay } = article;
  if (!cover) return null;

  if (!coverOverlay) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width ?? 1600}
        height={cover.height ?? 900}
        priority
        sizes={sizes}
        className="mb-8 h-auto w-full rounded-md lg:mb-12"
      />
    );
  }

  return (
    // Height follows the content with a minimum per screen (design: 856×400 on desktop). A fixed
    // aspect ratio clipped the text where the article column is narrow (1024–1200px).
    <figure className="relative mb-8 flex min-h-[300px] flex-col justify-between gap-6 overflow-hidden rounded-md bg-dark-gradient p-5 sm:min-h-[340px] sm:p-7 lg:mb-12 xl:min-h-[400px]">
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        priority
        sizes={sizes}
        className="object-cover object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(19_33_44/0.96)_0%,rgb(19_33_44/0.88)_40%,rgb(19_33_44/0.45)_75%,rgb(19_33_44/0.25)_100%)]"
      />
      {coverOverlay.showLogo ? (
        <Image
          src="/images/brand/logo-white.png"
          alt=""
          width={256}
          height={88}
          className="relative h-8 w-auto self-start sm:h-10"
        />
      ) : (
        <span />
      )}
      <figcaption className="relative flex max-w-[400px] flex-col gap-3 sm:gap-6 xl:pb-[46px]">
        <span className="text-h4-m text-white sm:text-[28px] sm:leading-9 sm:font-semibold">
          {coverOverlay.title}
        </span>
        {coverOverlay.text ? (
          <p className="text-b2 text-white/85 sm:text-b3 sm:leading-6">{coverOverlay.text}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
