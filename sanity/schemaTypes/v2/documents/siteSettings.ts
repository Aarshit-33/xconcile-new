import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  NavIconPickerInput,
  iconListOptions,
  iconPreview,
  navIconSet,
} from "../../../components/icon-picker-input";
import { hrefRule } from "../fields";

const linkFields = () => [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "href",
    title: "Link",
    type: "string",
    description: "e.g. /about, /audit-outsourcing-services or https://…",
    validation: (Rule) => Rule.required().custom(hrefRule),
  }),
];

/** Header: mega menus, the dark promo card inside them and the navbar button. */
const header = defineField({
  name: "header",
  title: "Header",
  type: "object",
  group: "header",
  options: { collapsible: false },
  fields: [
    defineField({
      name: "ctaLabel",
      title: "Navbar button label",
      type: "string",
      description:
        "The green button in the navbar and the mobile menu. It opens the meeting scheduler (Booking tab).",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "menus",
      title: "Menus",
      type: "array",
      description:
        "Navbar dropdowns, left to right. The mobile menu shows the same entries as an accordion.",
      of: [
        defineArrayMember({
          name: "navMenu",
          title: "Menu",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Menu label",
              type: "string",
              description: "e.g. Services",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "showPromo",
              title: "Show the promo card",
              type: "boolean",
              description: "The dark “Ready to scale?” card on the right of the dropdown.",
              initialValue: true,
            }),
            defineField({
              name: "items",
              title: "Links",
              type: "array",
              of: [
                defineArrayMember({
                  name: "navMenuLink",
                  title: "Link",
                  type: "object",
                  fields: [
                    ...linkFields(),
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      // Old-site outline menu icons or any site icon (desktop-nav.tsx renders both).
                      options: { list: iconListOptions(navIconSet) },
                      components: { input: NavIconPickerInput },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                      description: "One line under the label (cut after 2 lines).",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: iconPreview({ title: "label", subtitle: "href" }, navIconSet),
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "label", items: "items" },
            prepare: ({ title, items }) => ({ title, subtitle: `${items?.length ?? 0} links` }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "promo",
      title: "Menu promo card",
      type: "object",
      options: { collapsible: true, collapsed: true },
      description:
        "Shown in menus with “Show the promo card” on. Its button opens the meeting scheduler.",
      fields: [
        defineField({
          name: "badge",
          title: "Badge",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "title",
          title: "Title",
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
          name: "buttonLabel",
          title: "Button label",
          type: "string",
          validation: (Rule) => Rule.required().max(30),
        }),
      ],
    }),
  ],
});

/** Footer: blurb, link columns, certification badges and the copyright line. */
const footer = defineField({
  name: "footer",
  title: "Footer",
  type: "object",
  group: "footer",
  options: { collapsible: false },
  fields: [
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short text under the footer logo.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "showPhones",
      title: "Show phone numbers",
      type: "boolean",
      description:
        "Off = hide the phone numbers (Contact & Offices → Phone numbers) under the footer logo. On = shown on every screen size.",
      initialValue: true,
    }),
    defineField({
      name: "columns",
      title: "Link columns",
      type: "array",
      of: [
        defineArrayMember({
          name: "footerColumn",
          title: "Column",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                defineArrayMember({
                  name: "footerLink",
                  title: "Link",
                  type: "object",
                  fields: linkFields(),
                  preview: { select: { title: "label", subtitle: "href" } },
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({ title, links }) => ({ title, subtitle: `${links?.length ?? 0} links` }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: "badges",
      title: "Certification badges",
      type: "array",
      description: "Shown under the footer email on every screen size.",
      of: [
        defineArrayMember({
          name: "footerBadge",
          title: "Badge",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "altImage",
              description:
                "Upload a square SVG or transparent PNG at 2× the display size below (200×200 px for 100). Shown whole.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "size",
              title: "Display size (px)",
              type: "number",
              description: "Shown as a square of this size, e.g. 100.",
              initialValue: 100,
              validation: (Rule) => Rule.required().integer().min(24).max(200),
            }),
          ],
          preview: { select: { title: "image.alt", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "copyrightName",
      title: "Copyright name",
      type: "string",
      description: "Rendered as “© <year> <name> All rights reserved.”",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

/** Contact details: footer email/phones, office cards and the Organization structured data. */
const contact = defineField({
  name: "contact",
  title: "Contact & Offices",
  type: "object",
  group: "contact",
  options: { collapsible: false },
  description:
    "Also used in the Organization / LocalBusiness data Google reads, so keep it accurate.",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Footer, contact form messages and structured data.",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      description:
        "Shown in the footer and the desktop side panel. Hide them with Footer → Show phone numbers and Side panel → Show phone number.",
      of: [
        defineArrayMember({
          name: "contactPhone",
          title: "Phone",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. Sales",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "display",
              title: "Number as shown",
              type: "string",
              description: "e.g. +91 798 494-9224",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "tel",
              title: "Number to dial",
              type: "string",
              description: "International format without spaces, e.g. +917984949224",
              validation: (Rule) =>
                Rule.required().regex(/^\+\d{6,15}$/, { name: "international number" }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "display" } },
        }),
      ],
    }),
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        defineArrayMember({
          name: "officeAddress",
          title: "Office",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: "e.g. India",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "country",
              title: "Flag",
              type: "string",
              options: {
                list: [
                  { title: "India", value: "in" },
                  { title: "United States", value: "us" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "lines",
              title: "Address (as shown)",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "streetAddress",
              title: "Street (for Google)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "addressLocality",
              title: "City (for Google)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "addressRegion",
              title: "State / region (for Google)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "postalCode",
              title: "Postal code (for Google)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "addressCountry",
              title: "Country code (for Google)",
              type: "string",
              description: "Two letters, e.g. IN or US.",
              validation: (Rule) => Rule.required().regex(/^[A-Z]{2}$/, { name: "country code" }),
            }),
          ],
          preview: { select: { title: "name", subtitle: "lines" } },
        }),
      ],
    }),
  ],
});

const social = defineField({
  name: "social",
  title: "Social media",
  type: "array",
  group: "social",
  description:
    "Footer “Follow us” icons, in this order. Also listed as the company's profiles for Google (sameAs).",
  of: [
    defineArrayMember({
      name: "socialLink",
      title: "Profile",
      type: "object",
      fields: [
        defineField({
          name: "platform",
          title: "Platform",
          type: "string",
          options: {
            list: [
              { title: "Facebook", value: "facebook" },
              { title: "Instagram", value: "instagram" },
              { title: "LinkedIn", value: "linkedin" },
              { title: "Pinterest", value: "pinterest" },
              { title: "YouTube", value: "youtube" },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "url",
          title: "Profile URL",
          type: "url",
          validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
        }),
      ],
      preview: { select: { title: "platform", subtitle: "url" } },
    }),
  ],
});

const booking = defineField({
  name: "booking",
  title: "Booking",
  type: "object",
  group: "booking",
  options: { collapsible: false },
  fields: [
    defineField({
      name: "calendlyUrl",
      title: "Calendly page",
      type: "url",
      description:
        "Every “Schedule a Meeting” / “Free Consultation” button opens this page in a popup.",
      validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
    }),
  ],
});

/**
 * Desktop side panel (hamburger at the right of the navbar pill, from xl where the nav links are
 * visible; client request 2026-10-22, design: pages svg/Home/home-sidepanel.svg). Below xl the
 * hamburger keeps opening the navigation menu. The phone, email, address and social icons come
 * from the Contact & Offices and Social media tabs, so they are only edited once.
 */
const sidePanel = defineField({
  name: "sidePanel",
  title: "Side panel",
  type: "object",
  group: "sidePanel",
  options: { collapsible: false },
  description:
    "Opens from the ☰ icon at the right of the desktop navbar. Phone, email, address and social icons come from the Contact & Offices and Social media tabs.",
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      initialValue: "About Us",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "object",
      options: { collapsible: false },
      fields: linkFields(),
    }),
    defineField({
      name: "showPhone",
      title: "Show phone number",
      type: "boolean",
      description: "Off = no phone line in the side panel (email and address still show).",
      initialValue: true,
    }),
    defineField({
      name: "phoneLabel",
      title: "Phone to show",
      type: "string",
      description:
        "Label of a number from Contact & Offices → Phone numbers, e.g. Sales. Empty = the first number.",
      hidden: ({ parent }) => parent?.showPhone === false,
    }),
    defineField({
      name: "office",
      title: "Address to show",
      type: "string",
      description: "Which office address from Contact & Offices is shown.",
      options: {
        list: [
          { title: "United States", value: "us" },
          { title: "India", value: "in" },
        ],
        layout: "radio",
      },
      initialValue: "us",
    }),
  ],
});

/**
 * New-site Site Settings (singleton, _id "siteSettings"): everything shared by every page,
 * i.e. header menus, footer, contact details, social profiles and the booking link. Named
 * `siteSettings` (not `settings`) so it never clashes with the legacy `settings` type that is
 * still registered in this Studio. One field + one Studio tab per area, like the Home document.
 */
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact & Offices" },
    { name: "social", title: "Social media" },
    { name: "booking", title: "Booking" },
    { name: "sidePanel", title: "Side panel" },
  ],
  fields: [header, footer, contact, social, booking, sidePanel],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
