import { ArticleBody } from "@/components/blog/article-body";
import { CheckIcon } from "@/components/icons/material-symbols";
import type { ArticleBlock } from "@/sanity/lib/blog-post";

type Highlights = {
  style?: "dots" | "checks";
  items?: { _key?: string; title?: string; text?: string }[];
};
type Stats = { items?: { _key?: string; value?: string; label?: string }[] };

/** Grey box with green dots or ticks; each point "**Lead-in:** text" (design). */
function HighlightList({ value }: { value: Highlights }) {
  const items = (value?.items ?? []).filter((i) => i.text?.trim());
  if (!items.length) return null;
  const checks = value.style === "checks";
  return (
    <ul className="my-2 flex flex-col gap-5 rounded-md border border-hairline bg-surface-muted p-5 md:p-6 lg:my-6 lg:gap-6">
      {items.map((item, i) => (
        <li key={item._key ?? i} className="flex gap-3 text-b1 text-body lg:gap-4">
          {checks ? (
            <span
              aria-hidden
              className="mt-px flex size-[22px] shrink-0 items-center justify-center rounded-full bg-brand-100"
            >
              <CheckIcon className="size-4 text-brand" />
            </span>
          ) : (
            <span aria-hidden className="mt-1.5 size-3 shrink-0 rounded-full bg-brand" />
          )}
          <span className="min-w-0">
            {item.title?.trim() ? (
              <strong className="font-semibold text-heading">{item.title.trim()}:</strong>
            ) : null}
            {item.title?.trim() ? " " : null}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Dark results band (design: 4 results, 56px green numbers, white labels, thin dividers). Full
 * content width on desktop (wider than the text column, as drawn); 2×2 on phones.
 */
function ResultsBand({ value }: { value: Stats }) {
  const items = (value?.items ?? []).filter((i) => i.value && i.label);
  if (!items.length) return null;
  return (
    <div data-wide className="my-2 rounded-md bg-navy-2 px-5 py-6 md:px-6 lg:my-6">
      <dl
        className={`grid grid-cols-2 gap-y-6 ${["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"][items.length] ?? "lg:grid-cols-4"}`}
      >
        {items.map((s, i) => (
          <div
            key={s._key ?? i}
            className="flex flex-col-reverse gap-2 px-3 max-lg:odd:pl-0 max-lg:even:border-l max-lg:even:border-white/10 lg:gap-3 lg:border-l lg:border-white/10 lg:px-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <dt className="text-b1 text-white">{s.label}</dt>
            <dd className="text-[36px] leading-[44px] font-bold text-brand lg:text-[56px] lg:leading-[64px]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Case study content (Studio → Case Study → Content): the blog article styles plus the two
 * design blocks, in the order the editor placed them. Desktop: text runs in the photo's column
 * (857 of 1297px); the results band uses the full content width, as drawn.
 */
export function CaseStudyContent({ body }: { body: ArticleBlock[] }) {
  if (!body.length) return null;
  return (
    <ArticleBody
      body={body}
      headingIds={{}}
      types={{ caseStudyHighlights: HighlightList, caseStudyStats: ResultsBand }}
      className="flex flex-col gap-4 lg:gap-6 lg:[&>*:not([data-wide])]:max-w-[calc((100%-1.5rem)*0.6732)] lg:[&>h2]:mt-8 lg:[&>h2:first-child]:mt-0"
    />
  );
}
