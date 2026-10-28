import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType, type ValidationContext } from "sanity";

/**
 * Root-level paths the site already uses (app/(website)/* and old-site redirects in
 * next.config.ts). Service and hire page slugs are checked against their documents.
 */
const RESERVED = new Set([
  "about",
  "api",
  "blog",
  "case-studies",
  "contact",
  "hire-staff",
  "industries",
  "meeting",
  "privacy-policy",
  "robots.txt",
  "services",
  "sitemap.xml",
  "studio",
  "team",
]);

/** The article's URL must not clash with another page or article. */
async function freeSlug(value: { current?: string } | undefined, context: ValidationContext) {
  const slug = value?.current?.trim();
  if (!slug) return true;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    return "Use lowercase letters, numbers and hyphens only (e.g. how-to-outsource-accounting).";
  if (RESERVED.has(slug)) return `/${slug} is already a page on the site. Choose another slug.`;
  const client = context.getClient({ apiVersion: "2025-02-19" });
  const id = String(context.document?._id ?? "").replace(/^drafts\./, "");
  const taken = await client.fetch<string | null>(
    `*[slug.current == $slug && (
      _type in ["servicePage", "hirePage"] ||
      (_type == "seoArticle" && !(_id in [$id, "drafts." + $id]))
    )][0]._type`,
    { slug, id },
  );
  if (taken === "seoArticle") return "Another article already uses this slug.";
  if (taken)
    return `/${slug} is already a ${taken === "hirePage" ? "hire" : "service"} page. Choose another slug.`;
  return true;
}

/**
 * SEO article (`/<slug>`, served by app/(website)/[slug]/page.tsx after the service and hire
 * pages; design pages/article/page.svg). No gallery: each article is reached by its own URL
 * (and the sitemap). Same editor as blog posts; Related Posts are other articles.
 */
export default defineType({
  name: "seoArticle",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "faq", title: "FAQs" },
    { name: "related", title: "Related posts" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "sample",
      title: "Sample content",
      type: "boolean",
      group: "content",
      description:
        "ON = placeholder written for the build. Replace the text, then switch it off. Only shown here in Studio.",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Page URL",
      type: "slug",
      group: "content",
      description:
        "The page address: xconcile.com/<slug> (no folder), e.g. how-to-outsource-accounting. Use the search phrase you want to rank for. Don't change it after publishing.",
      options: { source: "title", maxLength: 80 },
      validation: (Rule) => Rule.required().custom(freeSlug),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      description: "Pick an author, or create one (name, title, photo) with “+ Create”.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
      group: "content",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      group: "content",
      description: "Empty = estimated from the length of the article.",
      validation: (Rule) => Rule.integer().min(1).max(120),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Shown on the Related Posts cards and used as the Google description if SEO → Description is empty.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      group: "content",
      description: "Top of the article and the Related Posts cards. 16:9 works best.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverOverlay",
      title: "Text on the cover image",
      type: "object",
      group: "content",
      description:
        "Optional (as drawn): the cover as a dark banner with this text over the photo. Leave the heading empty for the plain image.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Heading on the image",
          type: "string",
          validation: (Rule) => Rule.max(90),
        }),
        defineField({
          name: "text",
          title: "Line under the heading",
          type: "string",
          validation: (Rule) => Rule.max(140),
        }),
        defineField({
          name: "showLogo",
          title: "Show the Xconcile logo",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "articleBody",
      group: "content",
      description:
        "Paragraphs, headings, bullet or numbered lists, quotes, links, images and tables in any order.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "conclusion",
      title: "Closing section (after the FAQs)",
      type: "articleBody",
      group: "content",
      description:
        "Optional, e.g. a “Final Thoughts” heading and a paragraph. Shown after the FAQs, as in the design.",
    }),

    defineField({
      name: "faqTitle",
      title: "FAQ heading",
      type: "string",
      group: "faq",
      description:
        "e.g. FAQs: Outsourced Accounting Services. Empty = “Frequently Asked Questions”.",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      description:
        "Shown after the article (and added to Google's FAQ data). Leave empty for no FAQ section.",
      of: [
        defineArrayMember({
          name: "blogFaq",
          title: "Question",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    defineField({
      name: "related",
      title: "Related posts",
      type: "array",
      group: "related",
      description:
        "Up to 3 other articles for the right-hand column, in this order. Empty = the 3 newest articles.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "seoArticle" }],
          options: {
            disableNew: true,
            filter: ({ document }) => ({
              filter: "_id != $id && !(_id in path('drafts.**'))",
              params: { id: String(document._id).replace(/^drafts\./, "") },
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.max(3).unique(),
    }),

    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", slug: "slug.current", media: "mainImage", sample: "sample" },
    prepare: ({ title, slug, media, sample }) => ({
      title,
      subtitle: [sample ? "SAMPLE" : null, slug ? `/${slug}` : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
