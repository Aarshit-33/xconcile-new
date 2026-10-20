import { defineField, defineType } from "sanity";

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
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "Optional. 1200×630 recommended.",
    }),
  ],
});
