import { ErrorOutlineIcon } from "@sanity/icons/ErrorOutline";
import { defineField, defineType } from "sanity";

/**
 * New-site 404 page (singleton, `_id: "notFoundPage"`). Mirrors `content/not-found.ts`, which is
 * also the fallback for every empty field (sanity/lib/not-found.ts). Shown for unknown URLs and
 * for unknown slugs under /industries/… and /<service-or-hire-slug>.
 */
export default defineType({
  name: "notFoundPage",
  title: "404 Page",
  type: "document",
  icon: ErrorOutlineIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "illustration",
      title: "Illustration",
      type: "image",
      group: "content",
      description:
        "The picture above the heading (563×285 on desktop). SVG or PNG. Decorative, so no alt text. Empty = the default “404” illustration.",
      options: { accept: "image/svg+xml,image/png,image/webp,image/jpeg" },
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      group: "content",
      description: "e.g. 404 — Page Not Found",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "intro",
      title: "First line",
      type: "string",
      group: "content",
      description: "Short first sentence. On desktop the second line starts on a new line below it.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "detail",
      title: "Second line",
      type: "text",
      rows: 2,
      group: "content",
      description: "Kept on one line on desktop, so keep it under ~100 characters.",
      validation: (Rule) => [
        Rule.required(),
        Rule.max(110).warning("Longer text may not fit on one line on desktop."),
      ],
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaLink",
      group: "content",
      description: "The green button with the back arrow. Usually “Back to Home” → /.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      description: "Browser tab title and description. The page is always hidden from Google (noindex).",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "title",
          title: "Meta title",
          type: "string",
          description: "Shown as “<title> | Xconcile”.",
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: "description",
          title: "Meta description",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.required().max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "404 Page", subtitle: title }),
  },
});
