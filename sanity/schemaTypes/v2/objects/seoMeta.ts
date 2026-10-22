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
      name: "keywords",
      title: "Meta keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        "Search phrases this page should rank for, e.g. “outsourced bookkeeping services”. Type one and press Enter. Output as <meta name=\"keywords\">. 5–10 focused phrases work best.",
      validation: (Rule) => [
        Rule.unique(),
        Rule.max(15).warning("Keep it focused: 5–10 phrases is plenty."),
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
