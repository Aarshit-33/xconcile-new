import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  TrustIconPickerInput,
  iconListOptions,
  iconPreview,
  trustIconSet,
} from "../../../components/icon-picker-input";
import { anchorIdField } from "../fields";

/** Label + placeholder for one form input. Required rules stay in code (lib/inquiry-schema.ts). */
const formInput = (name: string, title: string, withPlaceholder = true) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({
        name: "label",
        title: "Label",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      ...(withPlaceholder
        ? [defineField({ name: "placeholder", title: "Placeholder", type: "string" })]
        : []),
    ],
  });

/**
 * Contact section in the old site's look (components/sections/inquiry-section.tsx), anchor
 * #contact. Mirrors `home.inquiry` in content/home.ts. Editors can change all copy; the
 * fields themselves, the required rules and the service options are fixed in code because
 * the server validates them.
 */
export default defineType({
  name: "contactSection",
  title: "Contact Form",
  type: "object",
  icon: EnvelopeIcon,
  groups: [
    { name: "copy", title: "Left side", default: true },
    { name: "form", title: "Form" },
  ],
  fields: [
    { ...anchorIdField("contact"), group: "copy" },
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "copy",
      description: "e.g. START TODAY",
    }),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "headingTitle",
      group: "copy",
    }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3, group: "copy" }),
    defineField({
      name: "trust",
      title: "Trust signals",
      type: "array",
      group: "copy",
      of: [
        defineArrayMember({
          name: "trustSignal",
          title: "Trust signal",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              // Lightning bolt / Lock / Check circle (the original three) or any site icon.
              options: { list: iconListOptions(trustIconSet) },
              components: { input: TrustIconPickerInput },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "desc", title: "Text", type: "string" }),
          ],
          preview: iconPreview({ title: "label", subtitle: "desc" }, trustIconSet),
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({ name: "tagline", title: "Bottom line", type: "text", rows: 2, group: "copy" }),
    defineField({
      name: "form",
      title: "Form",
      type: "object",
      group: "form",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "title",
          title: "Card title",
          type: "string",
          description: "e.g. Send Us a Message",
        }),
        defineField({
          name: "note",
          title: "Card note",
          type: "string",
          description: "e.g. Fields marked * are required.",
        }),
        defineField({
          name: "fields",
          title: "Inputs",
          type: "object",
          options: { collapsible: false },
          fields: [
            formInput("name", "Full name"),
            formInput("email", "Email"),
            formInput("phone", "Phone"),
            formInput("company", "Company"),
            formInput("service", "Service of interest", false),
            formInput("message", "Message"),
          ],
        }),
        defineField({ name: "submit", title: "Button label", type: "string" }),
        defineField({ name: "submitting", title: "Button label while sending", type: "string" }),
        defineField({ name: "success", title: "Success message", type: "text", rows: 2 }),
        defineField({
          name: "error",
          title: "Error message",
          type: "text",
          rows: 2,
          description: "The contact email address is added after this text automatically.",
        }),
      ],
    }),
  ],
});
