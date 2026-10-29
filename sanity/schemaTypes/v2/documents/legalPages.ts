import { ClipboardIcon } from "@sanity/icons/Clipboard";
import { LockIcon } from "@sanity/icons/Lock";
import { defineArrayMember, defineField, defineType } from "sanity";

import { articleTextBlock } from "../objects/articleBody";

/**
 * Legal pages (design pages/Privacy Policy.svg + pages/Terms of Use.svg, 2026-10-29). Two
 * singletons with the same fields (one shared definition):
 *  - `privacyPolicyPage` (`_id: "privacyPolicyPage"`) → /privacy-policy
 *  - `termsOfUsePage` (`_id: "termsOfUsePage"`) → /terms-of-use
 * Not named `privacyPolicy`: that is the old site's type, which may still sit in shared datasets.
 *
 * Page: dark hero ("Last Updated" pill, H1, intro), one light card with the Content (edited in
 * the blog editor, user request 2026-10-29), then the shared contact section (Studio → Home Page
 * → Contact) and the footer. Every field left empty falls back to content/legal.ts.
 */
function defineLegalPage({
  name,
  title,
  path,
  icon,
}: {
  name: string;
  title: string;
  path: string;
  icon: typeof LockIcon;
}) {
  return defineType({
    name,
    title,
    type: "document",
    icon,
    groups: [
      { name: "content", title: "Content", default: true },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({
        name: "title",
        title: "Page title (H1)",
        type: "string",
        group: "content",
        initialValue: title,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "lastUpdated",
        title: "Last updated",
        type: "date",
        group: "content",
        description:
          'Shown in the pill above the title ("Last Updated: October 29, 2026"). Change it whenever the policy changes.',
        options: { dateFormat: "MMMM D, YYYY" },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "intro",
        title: "Intro",
        type: "richText",
        group: "content",
        description:
          "Paragraph under the title. Select text and use the link button to add a link.",
      }),
      defineField({
        name: "body",
        title: "Content",
        type: "array",
        group: "content",
        description:
          'The page text, in the same editor as blog posts. Use "Heading 2" for each section heading and type its number ("1. Information We Collect"). Leave an empty line between sections: empty lines show on the page exactly as typed.',
        // Same blocks as the blog editor (objects/articleBody.ts); H2 isn't a Table of Contents entry here.
        of: [
          articleTextBlock("Heading 2 (section heading)"),
          defineArrayMember({ type: "articleImage" }),
          defineArrayMember({ type: "articleTable" }),
        ],
        validation: (Rule) => Rule.required().min(1),
      }),
      defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
    ],
    preview: {
      select: { heading: "title", date: "lastUpdated" },
      prepare: ({ heading, date }: { heading?: string; date?: string }) => ({
        title: heading || title,
        subtitle: date ? `${path} · updated ${date}` : path,
      }),
    },
  });
}

export const privacyPolicyPage = defineLegalPage({
  name: "privacyPolicyPage",
  title: "Privacy Policy",
  path: "/privacy-policy",
  icon: LockIcon,
});

export const termsOfUsePage = defineLegalPage({
  name: "termsOfUsePage",
  title: "Terms of Use",
  path: "/terms-of-use",
  icon: ClipboardIcon,
});
