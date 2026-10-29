import { defineArrayMember, defineField, defineType } from "sanity";

/** Page SEO. Named `seoMeta` so it never clashes with the legacy `seo` object. */
export default defineType({
  name: "seoMeta",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description: "Shown as “<title> | Xconcile”. Keep under ~60 characters.",
      validation: (Rule) => [
        Rule.required(),
        Rule.max(60).warning("Longer titles get cut off in Google."),
      ],
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => [
        Rule.required(),
        Rule.max(160).warning("Longer descriptions get cut off in Google."),
      ],
    }),
    defineField({
      name: "keywords",
      title: "Meta keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        'Search phrases this page should rank for, e.g. “outsourced bookkeeping services”. Type one and press Enter. Output as <meta name="keywords">. 5–10 focused phrases work best.',
      validation: (Rule) => [
        Rule.unique(),
        Rule.max(15).warning("Keep it focused: 5–10 phrases is plenty."),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description:
        "Optional. Upload exactly 1200×630 px (1.91:1), JPG or PNG under ~300 KB. Used in link previews (LinkedIn, WhatsApp, X), not on the page.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "string",
      description:
        "Leave empty (recommended): the page's own address is used. Fill in only when this page duplicates another page and Google should index that one instead, e.g. https://xconcile.com/outsourced-tax-preparation or /outsourced-tax-preparation.",
      validation: (Rule) => [
        Rule.custom((v: string | undefined) => {
          const value = v?.trim();
          if (!value) return true;
          return /^(https?:\/\/[^\s]+|\/[^\s]*)$/.test(value)
            ? true
            : "Use a full URL (https://…) or a site path starting with /.";
        }),
        // 2026-10-29: 14 pages had canonicals pointing at URLs that didn't exist (404) or ended in
        // "/" (this site's URLs never do), telling Google to index a missing page instead.
        Rule.custom((v: string | undefined) => {
          const value = v?.trim();
          if (!value) return true;
          const path = value.replace(/^https?:\/\/[^/]+/, "");
          if (path.length > 1 && path.endsWith("/")) {
            return "Remove the trailing “/”: this site's addresses never end with one, so Google would see a different page.";
          }
          return "Google will index the address above INSTEAD of this page. Open it in a browser first: if it isn't a live page, clear this field.";
        }).warning(),
      ],
    }),
    defineField({
      name: "metaTags",
      title: "Custom meta / Open Graph tags",
      type: "array",
      description:
        'Optional key/value tags for this page (user request 2026-10-28). Open Graph and Twitter keys override what the site generates from the fields above, e.g. og:title, og:description, og:image (full image URL), og:type, twitter:card, twitter:site. Any other key is added as <meta name="key" content="value">.',
      of: [
        defineArrayMember({
          name: "metaTag",
          title: "Tag",
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Key",
              type: "string",
              description: "e.g. og:title, og:image, twitter:site, author",
              validation: (Rule) =>
                Rule.required().custom((v: string | undefined) =>
                  !v || /^[a-zA-Z][\w:.-]*$/.test(v.trim())
                    ? true
                    : "Letters, numbers, : . - and _ only (e.g. og:title).",
                ),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required().max(500),
            }),
          ],
          preview: { select: { title: "key", subtitle: "value" } },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((tags: { key?: string }[] | undefined) => {
          const keys = (tags ?? []).map((t) => t?.key?.trim()).filter(Boolean);
          return new Set(keys).size === keys.length ? true : "Each key can only be used once.";
        }),
    }),
  ],
});
