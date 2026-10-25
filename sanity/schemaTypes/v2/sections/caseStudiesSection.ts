import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, iconOptions, subtitleField, titleField } from "../fields";

/** Screen sizes for the impact card (same breakpoints as the site: <768 / 768–1023 / ≥1024px). */
const deviceOptions = [
  { title: "Mobile (phones)", value: "mobile" },
  { title: "Tablet", value: "tablet" },
  { title: "Laptop / desktop", value: "laptop" },
];

/** "Trusted by Businesses & CPA Firms" tabbed case studies (mirrors `CaseStudiesContent`). */
export default defineType({
  name: "caseStudiesSection",
  title: "Case Studies",
  type: "object",
  icon: CaseIcon,
  fields: [
    anchorIdField("caseStudies"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "items",
      title: "Case studies",
      type: "array",
      description: "Each case study is one tab. Never invent client results.",
      of: [
        defineArrayMember({
          name: "caseStudy",
          title: "Case study",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Tab label",
              type: "string",
              description: "e.g. CPA Firms",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "id",
              title: "Tab ID",
              type: "slug",
              options: {
                source: (_doc, { parent }) => (parent as { label?: string })?.label ?? "",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "challenge",
              title: "Challenge",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "solution",
              title: "Solution",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "result",
              title: "Result",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "impact",
              title: "Impact card",
              type: "object",
              description: "The small white card over the photo. Leave Label or Value empty to hide it.",
              options: { collapsible: false },
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  description: "e.g. Workload Impact",
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  description: "e.g. 42% Reduced",
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  description: "Round icon on the left of the card. Empty = trending down.",
                  options: { list: iconOptions },
                  initialValue: "trending_down",
                }),
                defineField({
                  name: "devices",
                  title: "Show on",
                  type: "array",
                  description: "Screens the card appears on. Untick all to hide it everywhere.",
                  of: [{ type: "string" }],
                  options: { list: deviceOptions, layout: "grid" },
                  initialValue: ["mobile", "tablet", "laptop"],
                }),
              ],
            }),
            defineField({
              name: "image",
              title: "Image (desktop)",
              type: "altImage",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "mobileImage",
              title: "Image (mobile)",
              type: "image",
              description: "Optional different photo for mobile. Uses the desktop alt text.",
              options: { hotspot: true },
            }),
            defineField({ name: "cta", title: "Button", type: "optionalLink" }),
          ],
          preview: { select: { title: "label", subtitle: "title", media: "image" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
