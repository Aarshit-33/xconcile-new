import { BookIcon } from "@sanity/icons/Book";
import { defineField, defineType } from "sanity";

/**
 * Sections in the same order as components/templates/blog-gallery.tsx; each mirrors the matching
 * block of `BlogGalleryContent` (content/blog-gallery.ts). Field names match the content keys, so
 * the mapper (sanity/lib/blog-gallery.ts) stays 1:1.
 */
const sections: { name: string; title: string; type: string; required?: boolean }[] = [
  { name: "hero", title: "Hero", type: "heroSection", required: true },
  { name: "posts", title: "Blog Posts", type: "blogPostsSection" },
  { name: "ctaBand", title: "CTA Band", type: "ctaBandSection" },
];

/**
 * Blog Gallery page (`/blog`, singleton `_id: "blogPage"`). The post cards are the Blog Post
 * documents; this document holds the page copy around them, plus the copy every article page
 * shares (Related Blog heading, "Stay Updated" newsletter band).
 */
export default defineType({
  name: "blogPage",
  title: "Blog Gallery",
  type: "document",
  icon: BookIcon,
  groups: [
    ...sections.map((s, i) => ({ name: s.name, title: s.title, default: i === 0 })),
    { name: "article", title: "Article pages" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    ...sections.map((s) =>
      defineField({
        name: s.name,
        title: s.title,
        type: s.type,
        group: s.name,
        validation: s.required ? (Rule) => Rule.required() : undefined,
      }),
    ),
    defineField({
      name: "related",
      title: "Related Blog (every article)",
      type: "object",
      group: "article",
      options: { collapsible: false },
      description: "Heading over the related posts at the end of each article.",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({ name: "ctaLabel", title: "Button label", type: "string", description: "Links to /blog." }),
      ],
    }),
    defineField({
      name: "newsletter",
      title: "Stay Updated (every article)",
      type: "object",
      group: "article",
      options: { collapsible: false },
      description: "Newsletter band at the end of each article. Sign-ups are saved under Newsletter Subscribers.",
      fields: [
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Text", type: "text", rows: 2 }),
        defineField({ name: "placeholder", title: "Email placeholder", type: "string" }),
        defineField({ name: "button", title: "Button label", type: "string" }),
        defineField({ name: "success", title: "Thank-you message", type: "string" }),
        defineField({ name: "already", title: "Already subscribed message", type: "string" }),
        defineField({ name: "error", title: "Error message", type: "string" }),
        defineField({
          name: "image",
          title: "Background photo",
          type: "image",
          description: "Shown under the dark overlay, like the CTA bands. Empty = the CTA Band photo. Upload: 2400×800 px (3:1), JPG, max 2560 px wide; cropped from the centre and barely visible under the overlay.",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Blog Gallery", subtitle: "/blog" }) },
});
