import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

import { contextualDescription } from "../../../components/contextual-description";
import { iconPreview } from "../../../components/icon-picker-input";
import { anchorIdField, hiddenField, iconField, sectionPreview } from "../fields";

const MOVES =
  "Cropped from the centre and moves slightly on scroll: keep the subject centred and away from the top/bottom edges.";
const INNER = (height: number) =>
  `Upload: 1300×1300 px (1:1), JPG. Shown about 636×${height} on desktop (taller with long text), square on phones. ${MOVES}`;

/** Intro photo guidance per page type (image guide, 2026-10-29): only the current page's line shows. */
const INTRO_IMAGE_HINTS: Record<string, string> = {
  home: `Upload: 900×1200 px (3:4 portrait), JPG. Shown 416×576 on desktop, square on phones. ${MOVES}`,
  servicePage: INNER(609),
  hirePage: INNER(657),
  industryPage: INNER(585),
  aboutPage: INNER(547),
};

/** "Your Accounting Team, Without the Overhead" (mirrors `IntroContent`). */
export default defineType({
  name: "introSection",
  title: "Intro",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    hiddenField(),
    anchorIdField("intro"),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "headingTitle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Paragraph",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bodyMore",
      title: "Second paragraph",
      type: "richText",
      description: "Optional.",
    }),
    defineField({
      name: "bodyMoreLayout",
      title: "Second paragraph layout",
      type: "string",
      options: {
        list: [
          {
            title: "New paragraph on mobile, same paragraph on desktop (Home)",
            value: "inline-desktop",
          },
          { title: "Always its own paragraph", value: "paragraph" },
        ],
        layout: "radio",
      },
      initialValue: "inline-desktop",
    }),
    defineField({
      name: "bodyExtra",
      title: "Third paragraph",
      type: "richText",
      description: 'Optional. Only with "Always its own paragraph" (e.g. the bookkeeping page).',
      hidden: ({ parent }) => parent?.bodyMoreLayout !== "paragraph",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "altImage",
      // Fallback text; Studio shows only the current page's line (INTRO_IMAGE_HINTS).
      description:
        "Upload a JPG cropped to this page's shape. Cropped from the centre and moves slightly on scroll: keep the subject centred and away from the top/bottom edges.",
      components: {
        field: contextualDescription(({ docType }) =>
          docType ? INTRO_IMAGE_HINTS[docType] : undefined,
        ),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Feature cards",
      type: "array",
      description: "Small icon cards under the text.",
      of: [
        defineArrayMember({
          name: "introFeature",
          title: "Feature",
          type: "object",
          fields: [
            iconField(),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: iconPreview({ title: "label" }),
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "checks",
      title: "Check items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "checksStyle",
      title: "Check items style",
      type: "string",
      options: {
        list: [
          { title: "Pills (Home)", value: "pill" },
          { title: "Vertical list", value: "list" },
        ],
        layout: "radio",
      },
      initialValue: "pill",
    }),
    defineField({
      name: "checksTitle",
      title: "Label above the check items (optional)",
      type: "string",
      description:
        'Vertical list only, e.g. "Promising Features" (RCM page). Leave empty for none.',
      hidden: ({ parent }) => parent?.checksStyle !== "list",
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaLink",
      description: "Optional: leave empty for no button (e.g. the About page).",
    }),
  ],
  preview: sectionPreview("Intro", { media: "image" }),
});
