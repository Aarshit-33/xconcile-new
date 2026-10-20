import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

/**
 * Button / link. Mirrors `Link` in content/types.ts: `{ label, href }`.
 * `href` accepts internal paths (/about), in-page anchors (#contact), the Calendly
 * trigger (#schedule) and full URLs.
 */
export default defineType({
  name: "ctaLink",
  title: "Button / Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "e.g. /about, #contact, #schedule or https://…",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          !value || /^(\/|#|https?:\/\/|mailto:|tel:)/.test(value)
            ? true
            : "Must start with /, #, http(s)://, mailto: or tel:",
        ),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
