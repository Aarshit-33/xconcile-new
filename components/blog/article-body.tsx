import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import type { ArticleBlock } from "@/sanity/lib/blog-post";

type Table = {
  caption?: string;
  hasHeaderRow?: boolean;
  /** First cell of each row is the row's name (`<th scope="row">`). */
  hasHeaderColumn?: boolean;
  rows?: { _key?: string; cells?: string[] }[];
};
type BodyImage = { src?: string; alt?: string; caption?: string; width?: number; height?: number };

/**
 * Renders the article body (Portable Text) in the design's type (pages/blog/page.svg): 16/24
 * body copy, 32px section headings, 20px sub-headings, green round bullets, empty-box
 * checklists. Any mix and order of blocks works:
 * paragraphs, H2–H4, bullet / numbered / checklist lists, quotes, links, images (with caption)
 * and tables (scroll sideways on phones). Older posts' H1s render as H2 so the page keeps a
 * single H1. `headingIds` (block key → id) gives each Table of Contents heading its anchor.
 * `types`: extra custom blocks (e.g. the case study's highlight box and results band).
 * `tableTone`: "dark" (blog design: rounded table, row lines) or "light" (SEO articles: every
 * cell bordered). Header row and header column (Studio "First column is the header") are the
 * same light green on both tones (user request 2026-10-28): opaque `brand-100`, not a transparent
 * green, so the header column doesn't pick up the alternating row colours underneath.
 */
export function ArticleBody({
  body,
  headingIds,
  types,
  className,
  tableTone = "dark",
}: {
  body: ArticleBlock[];
  headingIds: Record<string, string>;
  types?: PortableTextComponents["types"];
  className?: string;
  tableTone?: "dark" | "light";
}) {
  const light = tableTone === "light";
  const sectionHeading = (key: string | undefined, children: React.ReactNode) => (
    <h2
      id={key ? headingIds[key] : undefined}
      className="mt-10 text-h2-m font-semibold text-heading first:mt-0 lg:mt-16 lg:text-[32px] lg:leading-10"
    >
      {children}
    </h2>
  );

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="text-b1 text-body">{children}</p>,
      h1: ({ children, value }) => sectionHeading(value._key, children),
      h2: ({ children, value }) => sectionHeading(value._key, children),
      h3: ({ children }) => (
        <h3 className="mt-4 text-h4-m text-heading lg:mt-6 lg:text-h5">{children}</h3>
      ),
      h4: ({ children }) => <h4 className="mt-2 text-b1 font-semibold text-heading">{children}</h4>,
      h5: ({ children }) => <h5 className="mt-2 text-b1 font-semibold text-heading">{children}</h5>,
      h6: ({ children }) => <h6 className="mt-2 text-b1 font-semibold text-heading">{children}</h6>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-brand bg-brand-50 py-4 pr-4 pl-5 text-b1 text-heading italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="flex flex-col gap-4">{children}</ul>,
      check: ({ children }) => <ul className="flex flex-col gap-4">{children}</ul>,
      number: ({ children }) => (
        <ol className="flex list-decimal flex-col gap-4 pl-6 text-b1 text-body marker:font-semibold marker:text-brand">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex gap-3 text-b1 text-body">
          <span aria-hidden className="mt-1.5 size-3 shrink-0 rounded-full bg-brand" />
          <span className="min-w-0">{children}</span>
        </li>
      ),
      // Checklist: an empty box per item (a printable to-do list, not a form control).
      check: ({ children }) => (
        <li className="flex gap-3 text-b1 text-body">
          <span
            aria-hidden
            className="mt-1 size-4 shrink-0 rounded-[3px] border border-line bg-white"
          />
          <span className="min-w-0">{children}</span>
        </li>
      ),
      number: ({ children }) => <li className="pl-1">{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-heading">{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      underline: ({ children }) => <span className="underline">{children}</span>,
      link: ({ children, value }) => {
        const href: string = value?.href ?? "#";
        const external = /^https?:\/\//.test(href);
        const cls = "font-medium text-brand underline underline-offset-2 hover:text-heading";
        return external || value?.blank ? (
          <a
            href={href}
            className={cls}
            target={value?.blank || external ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ) : (
          <Link href={href} className={cls}>
            {children}
          </Link>
        );
      },
    },
    types: {
      articleImage: ({ value }: { value: BodyImage }) =>
        value?.src ? (
          <figure className="flex flex-col gap-2">
            <Image
              src={value.src}
              alt={value.alt ?? ""}
              width={value.width ?? 1200}
              height={value.height ?? 675}
              sizes="(min-width: 1440px) 856px, (min-width: 1024px) 60vw, 100vw"
              className="h-auto w-full rounded-md"
            />
            {value.caption ? (
              <figcaption className="text-center text-b2 text-meta">{value.caption}</figcaption>
            ) : null}
          </figure>
        ) : null,
      articleTable: ({ value }: { value: Table }) => {
        const rows = (value?.rows ?? []).filter((r) => r.cells?.length);
        if (!rows.length) return null;
        const head = value.hasHeaderRow === false ? null : rows[0];
        const rest = head ? rows.slice(1) : rows;
        return (
          // Scrolls sideways on phones instead of squeezing the columns.
          <div
            className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0"
            tabIndex={0}
            role="region"
            aria-label={value.caption || "Table"}
          >
            <table
              className={
                light
                  ? "w-full min-w-[560px] border-collapse text-left text-b2 lg:text-b1"
                  : "w-full min-w-[560px] border-collapse overflow-hidden rounded-md text-left text-b2 lg:text-b1"
              }
            >
              {value.caption ? (
                <caption className="mb-3 text-left text-b1 font-semibold text-heading">
                  {value.caption}
                </caption>
              ) : null}
              {head ? (
                <thead>
                  <tr className="bg-brand-100 text-heading">
                    {head.cells!.map((c, i) => (
                      <th
                        key={i}
                        scope="col"
                        className={
                          light
                            ? "border border-brand/30 px-4 py-3 font-semibold"
                            : "px-4 py-3 font-semibold"
                        }
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
              ) : null}
              <tbody>
                {rest.map((r, ri) => (
                  <tr
                    key={r._key ?? ri}
                    className={
                      light
                        ? "odd:bg-white even:bg-surface-alt"
                        : "border-b border-line/60 odd:bg-white even:bg-brand-50"
                    }
                  >
                    {r.cells!.map((c, ci) =>
                      value.hasHeaderColumn && ci === 0 ? (
                        <th
                          key={ci}
                          scope="row"
                          className={
                            light
                              ? "border border-brand/30 bg-brand-100 px-4 py-2.5 align-top font-semibold text-heading"
                              : "bg-brand-100 px-4 py-3 align-top font-semibold text-heading"
                          }
                        >
                          {c}
                        </th>
                      ) : (
                        <td
                          key={ci}
                          className={
                            light
                              ? "border border-line/60 px-4 py-2.5 align-top text-body"
                              : "px-4 py-3 align-top text-body"
                          }
                        >
                          {c}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
      ...types,
    },
    // Unknown custom blocks (e.g. added in Studio later) are skipped instead of erroring.
    unknownType: () => null,
  };

  return (
    <div className={className ?? "flex flex-col gap-4 lg:gap-6"}>
      <PortableText value={body} components={components} />
    </div>
  );
}
