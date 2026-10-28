import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

import { OptionalIconPickerInput } from "../../../components/icon-picker-input";
import { anchorIdField, badgeField, iconOptions, subtitleField, titleField } from "../fields";

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
              description:
                "The small white card over the photo. Leave Label or Value empty to hide it.",
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
                  components: { input: OptionalIconPickerInput },
                  initialValue: "trending_down",
                }),
                // One switch for every screen size (user request 2026-10-26); replaces the
                // per-device "Show on" list. A legacy list with nothing ticked still hides the
                // card until this switch is set (sanity/lib/sections.ts → mapCaseStudies).
                defineField({
                  name: "show",
                  title: "Show impact card",
                  type: "boolean",
                  description:
                    "Off = hidden on every screen size. On = shown on every screen size.",
                  initialValue: true,
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
            defineField({
              name: "caseStudy",
              title: "Case study page",
              type: "reference",
              to: [{ type: "caseStudy" }],
              options: { disableNew: true },
              description:
                "The page the button opens (Studio → Case Studies). Overrides the Button's Link. Empty = the Button's Link.",
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
