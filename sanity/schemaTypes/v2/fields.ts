/**
 * Shared field helpers for the v2 schema. Relative import (not "@/") so the Sanity CLI
 * (schema validate / typegen) resolves it too.
 */
import { defineField, type PreviewValue } from "sanity";

import { iconRegistry } from "../../../components/icons/registry";
import { plainTitle } from "../../../lib/highlight";
import { SECTION_ID_PATTERN, SECTION_IDS, type SectionKey } from "../../../lib/section-ids";
import { IconPickerInput } from "../../components/icon-picker-input";

/** "Hide this section" switch, first field of a section object. Off by default. */
export const hiddenField = () =>
  defineField({
    name: "hidden",
    title: "Hide this section",
    type: "boolean",
    description:
      "On = the section is not shown on the page. Its content is kept, so you can show it again later.",
    initialValue: false,
  });

/**
 * Studio preview for a section object: its heading as plain text (`*green*` markers removed),
 * with the section type underneath (+ "Hidden" when the switch is on). `select` overrides the
 * paths, e.g. `{ title: "label" }` for sections without a heading or `{ media: "image" }`.
 */
export const sectionPreview = (label: string, select: { title?: string; media?: string } = {}) => ({
  select: {
    title: select.title ?? "title",
    hidden: "hidden",
    ...(select.media ? { media: select.media } : {}),
  },
  prepare: ({
    title,
    hidden,
    media,
  }: {
    title?: unknown;
    hidden?: boolean;
    media?: PreviewValue["media"];
  }) => ({
    title: (typeof title === "string" && plainTitle(title)) || label,
    subtitle: hidden ? `${label} · Hidden` : label,
    ...(media ? { media } : {}),
  }),
});

/**
 * "Section ID": the section's `id` on the page, so it can be linked to (`/#faq`) or targeted by
 * a CTA (`#services`). Defaults to the section type's id from lib/section-ids.ts (the same default
 * the site uses when the field is empty). Must be unique among this document's sections.
 */
export const anchorIdField = (key: SectionKey) =>
  defineField({
    name: "anchorId",
    title: "Section ID",
    type: "string",
    description: `Link to this section with #${SECTION_IDS[key]} (or /page#${SECTION_IDS[key]} from another page). Change it only if you need a different link name. Lowercase letters, numbers and hyphens; must be unique on this page. Default: "${SECTION_IDS[key]}".`,
    initialValue: SECTION_IDS[key],
    validation: (Rule) =>
      Rule.required().custom((value, context) => {
        if (typeof value !== "string") return true;
        if (!SECTION_ID_PATTERN.test(value)) {
          return "Use lowercase letters, numbers and hyphens, starting with a letter (e.g. our-process).";
        }
        const own = context.path?.[0];
        const doc = (context.document ?? {}) as Record<string, unknown>;
        const clash = Object.entries(doc).find(
          ([field, section]) =>
            field !== own &&
            !!section &&
            typeof section === "object" &&
            (section as { anchorId?: unknown }).anchorId === value,
        );
        return clash
          ? `Already used by the "${clash[0]}" section. Section IDs must be unique on a page.`
          : true;
      }),
  });

/** Every icon the site can render (components/icons/registry.tsx, generated set): allowed values. */
export const iconOptions = Object.keys(iconRegistry)
  .sort()
  .map((value) => ({ title: value.replace(/_/g, " "), value }));

const HREF = /^(\/|#|https?:\/\/|mailto:|tel:)/;

/** Internal path (/about), anchor (#contact), Calendly trigger (#schedule) or full URL. */
export const hrefRule = (value: unknown) =>
  typeof value !== "string" || value === "" || HREF.test(value)
    ? true
    : "Must start with /, #, http(s)://, mailto: or tel:";

/** Icon field: visual grid of the site's icons (sanity/components/icon-picker-input.tsx). */
export const iconField = (name = "icon", title = "Icon") =>
  defineField({
    name,
    title,
    type: "string",
    options: { list: iconOptions },
    components: { input: IconPickerInput },
    validation: (Rule) => Rule.required(),
  });

export const badgeField = () =>
  defineField({
    name: "badge",
    title: "Badge",
    type: "string",
    description: "Small pill above the heading.",
    validation: (Rule) => Rule.required().max(40),
  });

/** Section heading: one string, `*green*` markup (see objects/headingTitle.ts). */
export const titleField = (title = "Heading (H2)") =>
  defineField({ name: "title", title, type: "headingTitle" });

export const subtitleField = () =>
  defineField({
    name: "subtitle",
    title: "Subtitle",
    type: "text",
    rows: 3,
    validation: (Rule) => Rule.required(),
  });
