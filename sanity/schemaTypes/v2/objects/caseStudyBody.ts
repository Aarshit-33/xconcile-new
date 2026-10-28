import { BarChartIcon } from "@sanity/icons/BarChart";
import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";
import { defineArrayMember, defineField, defineType } from "sanity";

import { articleTextBlock } from "./articleBody";

/**
 * Grey box with a list (design pages/case study/page.svg, under "The Challenge" with green dots
 * and under "The Solution" with green ticks). Each point: bold lead-in + text.
 */
export const caseStudyHighlights = defineType({
  name: "caseStudyHighlights",
  title: "Highlight list (grey box)",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "style",
      title: "Marker",
      type: "string",
      options: {
        list: [
          { title: "Green dots (e.g. challenges)", value: "dots" },
          { title: "Green ticks (e.g. what we did)", value: "checks" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "dots",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Points",
      type: "array",
      of: [
        defineArrayMember({
          name: "highlightItem",
          title: "Point",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Bold lead-in",
              type: "string",
              description: "Shown in bold, followed by a colon. e.g. Tight Deadlines",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { style: "style", items: "items" },
    prepare: ({ style, items }) => ({
      title: `Highlight list · ${Array.isArray(items) ? items.length : 0} points`,
      subtitle: style === "checks" ? "Green ticks" : "Green dots",
    }),
  },
});

/** Dark band of up to 4 results (design: "30% Faster Audit Turnaround"). Full content width. */
export const caseStudyStats = defineType({
  name: "caseStudyStats",
  title: "Results band (dark)",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "items",
      title: "Results",
      type: "array",
      description: "2–4 results. Never publish invented client figures.",
      of: [
        defineArrayMember({
          name: "statItem",
          title: "Result",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Number",
              type: "string",
              description: "e.g. 30%, 25+, 200+",
              validation: (Rule) => Rule.required().max(10),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. Faster Audit Turnaround",
              validation: (Rule) => Rule.required().max(60),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Results band",
      subtitle: Array.isArray(items)
        ? items
            .map((i: { value?: string }) => i.value)
            .filter(Boolean)
            .join(" · ")
        : "",
    }),
  },
});

/**
 * Case study content: the blog editor (paragraphs, headings, lists, quotes, links, images,
 * tables) plus the two blocks drawn in the design, in any order.
 */
export const caseStudyBody = defineType({
  name: "caseStudyBody",
  title: "Case study content",
  type: "array",
  of: [
    articleTextBlock("Heading 2 (section title)"),
    defineArrayMember({ type: "caseStudyHighlights" }),
    defineArrayMember({ type: "caseStudyStats" }),
    defineArrayMember({ type: "articleImage" }),
    defineArrayMember({ type: "articleTable" }),
  ],
});
