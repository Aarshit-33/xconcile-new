import { CreditCardIcon } from "@sanity/icons/CreditCard";
import { defineArrayMember, defineField, defineType } from "sanity";

import { OptionalIconPickerInput, iconMedia } from "../../../components/icon-picker-input";
import { anchorIdField, badgeField, hiddenField, iconOptions, sectionPreview, subtitleField, titleField } from "../fields";

/**
 * "Choose Accounting Support That Fits Your Workload": three pricing-style cards; the featured
 * one is the dark "Most Popular" card (mirrors `EngagementModelsContent`).
 */
export default defineType({
  name: "engagementModelsSection",
  title: "Hiring Models",
  type: "object",
  icon: CreditCardIcon,
  fields: [
    hiddenField(),
    anchorIdField("engagementModels"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "featuredLabel",
      title: "Featured pill label",
      type: "string",
      description: "Pill on the featured card, e.g. “Most Popular”.",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "items",
      title: "Models",
      type: "array",
      of: [
        defineArrayMember({
          name: "engagementModel",
          title: "Model",
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              description: "e.g. 01",
              validation: (Rule) => Rule.required().max(4),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: iconOptions },
              components: { input: OptionalIconPickerInput },
              description: "Top-right glyph on light cards. The featured card shows the pill instead.",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "tagline",
              title: "Tagline",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Text",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "cta",
              title: "Button",
              type: "ctaLink",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "featured",
              title: "Featured (dark card)",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { number: "number", title: "title", featured: "featured", icon: "icon" },
            prepare: ({ number, title, featured, icon }) => ({
              title: [number, title].filter(Boolean).join(" · "),
              subtitle: featured ? "Featured" : undefined,
              media: iconMedia(icon),
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
  preview: sectionPreview("Hiring Models"),
});
