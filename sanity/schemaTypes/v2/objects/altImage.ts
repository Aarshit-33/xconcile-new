import { defineField, defineType } from "sanity";

/**
 * Image with required alt text and hotspot. Width/height come from the asset metadata,
 * so editors never type dimensions (replaces `ImageAsset` in content/types.ts).
 */
export default defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for screen readers and SEO.",
      validation: (Rule) =>
        Rule.custom((alt, context) =>
          (context.parent as { asset?: unknown } | undefined)?.asset && !alt
            ? "Alt text is required"
            : true,
        ),
    }),
  ],
});
