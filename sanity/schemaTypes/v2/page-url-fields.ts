/**
 * URL fields of the service, hire and industry page documents (user request 2026-10-28: change a
 * page's URL in Studio and have it change across the whole site). Relative imports only, so the
 * Sanity CLI resolves this file too.
 *
 * - `slug`: the live address. Editable; publishing a new one moves the page. The site reads it in
 *   sanity/lib/page-urls.ts, which also rewrites every link to the old address.
 * - `oldSlugs`: addresses that 301 to the live one. The publish action
 *   (sanity/actions/record-old-slug.ts) adds the previous slug automatically.
 */
import { defineArrayMember, defineField, type SlugValue, type ValidationContext } from "sanity";

export type PageUrlKind = "root" | "industry";

/** Lowercase words separated by single hyphens. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Root-level paths the site already uses (app/(website)/* and old-site redirects in
 * next.config.ts). Service, hire and article slugs are also checked against each other.
 */
export const RESERVED_ROOT_SLUGS = new Set([
  "about",
  "api",
  "blog",
  "case-studies",
  "contact",
  "contact-us",
  "hire-staff",
  "industries",
  "meeting",
  "robots.txt",
  "services",
  "sitemap.xml",
  "studio",
  "team",
]);

/** Document types sharing the root namespace (`/<slug>`). */
export const ROOT_SLUG_TYPES = ["servicePage", "hirePage", "seoArticle"];

const LABELS: Record<string, string> = {
  servicePage: "service page",
  hirePage: "hire page",
  seoArticle: "article",
  industryPage: "industry page",
};

/**
 * Error message when `slug` is badly formed or already used, live or as an old (redirecting)
 * URL, by another document in the same URL space; else true. Shared with the article slug.
 */
export async function slugAvailable(
  slug: string,
  kind: PageUrlKind,
  context: ValidationContext,
): Promise<string | true> {
  if (!SLUG_PATTERN.test(slug))
    return "Use lowercase letters, numbers and single hyphens only (e.g. virtual-cfo-services).";
  if (kind === "root" && RESERVED_ROOT_SLUGS.has(slug))
    return `/${slug} is already a page on the site. Choose another slug.`;
  const id = String(context.document?._id ?? "").replace(/^drafts\./, "");
  const clash = await context
    .getClient({ apiVersion: "2025-02-19" })
    .fetch<{ _type: string; live: boolean } | null>(
      `*[_type in $types && !(_id in [$id, "drafts." + $id]) && (slug.current == $slug || $slug in oldSlugs)][0]{
        _type, "live": slug.current == $slug
      }`,
      { slug, id, types: kind === "root" ? ROOT_SLUG_TYPES : ["industryPage"] },
    );
  if (!clash) return true;
  const what = LABELS[clash._type] ?? "page";
  return clash.live
    ? `Another ${what} already uses this URL. Choose another slug.`
    : `This was the old URL of another ${what} and still redirects there. Choose another slug, or remove it from that page's "Old URLs" first.`;
}

/** The `slug` + `oldSlugs` fields of a page document (Studio → the page → Page tab). */
export function pageUrlFields(kind: PageUrlKind, group = "page") {
  const prefix = kind === "industry" ? "xconcile.com/industries/" : "xconcile.com/";
  return [
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group,
      description: `The page address: ${prefix}<slug>. You can change it: after you publish, every menu, footer and in-page link on the site uses the new address, the sitemap and Google canonical update, and the old address redirects (301) here. Lowercase letters, numbers and hyphens.`,
      options: { source: "name", maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom(async (value: SlugValue | undefined, context) => {
          const slug = value?.current?.trim();
          return slug ? slugAvailable(slug, kind, context) : true;
        }),
    }),
    defineField({
      name: "oldSlugs",
      title: "Old URLs (redirect here)",
      type: "array",
      group,
      description: `Previous slugs of this page. Anyone opening ${prefix}<old slug> is sent (301) to the current address. Filled in automatically when you publish a new URL slug; remove an entry only if that old address should stop redirecting.`,
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) =>
            Rule.custom((v: string | undefined) =>
              !v || SLUG_PATTERN.test(v) ? true : "Slug only, e.g. old-page-name (no slashes).",
            ),
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ];
}
