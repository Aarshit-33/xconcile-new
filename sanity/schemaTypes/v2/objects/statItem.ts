import { defineField, defineType } from "sanity";

import { contextualDescription } from "../../../components/contextual-description";

/**
 * Number + label pair (stats bar, Why Choose stats). On the stats bar a stat can show an icon
 * instead of the number (RCM page: caduceus over "HIPAA Compliant"); then the value may be empty.
 */
export default defineType({
  name: "statItem",
  title: "Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g. 10+, 1K+, 98%. Can be empty when an icon is set (stats bar only).",
      validation: (Rule) =>
        Rule.max(10).custom((value, context) => {
          const parent = context.parent as { image?: unknown } | undefined;
          return value || parent?.image ? true : "Add a value or an icon";
        }),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "image",
      title: "Icon instead of the value (optional)",
      type: "image",
      description:
        "Stats bar only (ignored in Why Choose): shown in place of the number, e.g. a HIPAA caduceus. Decorative: the label carries the meaning.",
      // Stats bar and Why Choose share this type: show only what applies where it's used.
      components: {
        field: contextualDescription(({ path }) =>
          path[0] === "whyChoose"
            ? "Not shown in Why Choose (only the Stats bar shows icons). Leave empty here."
            : "Shown in place of the number, e.g. a HIPAA caduceus. Decorative: the label carries the meaning. Upload: SVG, or a transparent PNG about 96px tall (roughly square); shown 48px tall, so keep the file small.",
        ),
      },
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || subtitle,
      subtitle: title ? subtitle : "Icon",
      media,
    }),
  },
});
