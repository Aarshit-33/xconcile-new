/**
 * Studio sidebar. Singletons (one fixed document, e.g. Home) open their form directly
 * instead of an empty document list; every other type is listed as before.
 */
import { BookIcon } from "@sanity/icons/Book";
import { CaseIcon } from "@sanity/icons/Case";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { ErrorOutlineIcon } from "@sanity/icons/ErrorOutline";
import { HomeIcon } from "@sanity/icons/Home";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { UsersIcon } from "@sanity/icons/Users";
import type { StructureResolver } from "sanity/structure";

/** One fixed document per type. `id` is the document _id. */
export const singletons = [
  { type: "home", id: "home", title: "Home Page", icon: HomeIcon },
  { type: "aboutPage", id: "aboutPage", title: "About Page", icon: InfoOutlineIcon },
  {
    type: "industriesPage",
    id: "industriesPage",
    title: "Industries Gallery",
    icon: EarthGlobeIcon,
  },
  { type: "blogPage", id: "blogPage", title: "Blog Gallery", icon: BookIcon },
  { type: "caseStudiesPage", id: "caseStudiesPage", title: "Case Studies Gallery", icon: CaseIcon },
  { type: "siteSettings", id: "siteSettings", title: "Site Settings", icon: CogIcon },
  { type: "notFoundPage", id: "notFoundPage", title: "404 Page", icon: ErrorOutlineIcon },
  { type: "contactPage", id: "contactPage", title: "Contact Page", icon: EnvelopeIcon },
];

export const singletonTypes = new Set(singletons.map((s) => s.type));

/** New-site page types with one document per page (listed right under the singletons). */
const pageLists = [
  { type: "servicePage", title: "Service Pages", icon: DocumentsIcon },
  { type: "hirePage", title: "Hire Pages", icon: UsersIcon },
  { type: "industryPage", title: "Industry Pages", icon: EarthGlobeIcon },
  { type: "blogPost", title: "Blog Posts", icon: DocumentTextIcon },
  { type: "author", title: "Authors", icon: UsersIcon },
  { type: "caseStudy", title: "Case Studies", icon: CaseIcon },
  { type: "seoArticle", title: "Articles (SEO pages)", icon: DocumentTextIcon },
  { type: "newsletterSubscription", title: "Newsletter Subscribers", icon: EnvelopeIcon },
];

const pinnedTypes = new Set([...singletonTypes, ...pageLists.map((p) => p.type)]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...singletons.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .icon(s.icon)
          .child(S.document().schemaType(s.type).documentId(s.id).title(s.title)),
      ),
      ...pageLists.map((p) => S.documentTypeListItem(p.type).title(p.title).icon(p.icon)),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !pinnedTypes.has(item.getId() ?? "")),
    ]);
