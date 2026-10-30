import "server-only";

import type { MetaTag } from "@/lib/seo";

import { about, type AboutPageContent } from "@/content/about";
import type { FounderContent, PersonProfile, TeamContent } from "@/content/types";

import { sanityFetch } from "./fetch";
import { withResolvedLinks } from "./page-urls";
import {
  IMG,
  heading,
  img,
  keywords,
  mapAudienceCards,
  mapCardGrid,
  mapFeatureCards,
  mapHero,
  mapIntro,
  mapSecurityControls,
  mapStats,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

const ABOUT_PAGE_QUERY = /* groq */ `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) },
  hero, values, expertise,
  ${P.stats},
  ${P.intro},
  ${P.audiences},
  ${P.security},
  founder{ ..., person{ ..., "image": image${IMG} } },
  team{ ..., members[]{ ..., "image": image${IMG} } }
}`;

/** One person: Sanity values, each empty field falling back to the code person `f`. */
function mapPerson(d: Raw, f: PersonProfile | undefined): PersonProfile | undefined {
  if (!d) return f;
  const image = img(d.image) ?? f?.image;
  if (!d.name || !image) return f;
  const strings = (v: Raw) =>
    Array.isArray(v)
      ? v.filter((s: unknown): s is string => typeof s === "string" && s.trim() !== "")
      : undefined;
  return {
    name: d.name,
    role: d.role ?? f?.role ?? "",
    image,
    bio: strings(d.bio)?.length ? strings(d.bio)! : (f?.bio ?? []),
    certifications: strings(d.certifications) ?? f?.certifications ?? [],
    linkedin: d.linkedin || undefined,
  };
}

function mapFounder(d: Raw, f: FounderContent): FounderContent {
  if (!d) return f;
  return {
    anchorId: d.anchorId || undefined,
    person: mapPerson(d.person, f.person) ?? f.person,
    certificationsLabel: d.certificationsLabel || f.certificationsLabel,
  };
}

function mapTeam(d: Raw, f: TeamContent): TeamContent {
  if (!d) return f;
  const members = Array.isArray(d.members)
    ? (d.members
        .map((m: Raw, i: number) => mapPerson(m, f.members[i]))
        .filter(Boolean) as PersonProfile[])
    : [];
  return {
    anchorId: d.anchorId || undefined,
    title: heading(d.title) ?? f.title,
    members: members.length ? members : f.members,
    certificationsLabel: d.certificationsLabel || f.certificationsLabel,
  };
}

/**
 * About page content (`/about`) from the `aboutPage` singleton (Studio → About Page), in the exact
 * shape of `AboutPageContent`. Same rules as every other page: any section or field left empty in
 * Sanity falls back to content/about.ts (also used when Sanity is not configured or the document
 * doesn't exist). Cache tag: `aboutPage` (revalidated by /api/revalidate on publish).
 */
async function loadAboutPage(): Promise<{
  content: AboutPageContent;
  ogImage?: string;
  metaTags?: MetaTag[];
}> {
  const f = about;
  const d: Raw = await sanityFetch({ query: ABOUT_PAGE_QUERY, tags: ["aboutPage"] });
  if (!d) return { content: f };

  return {
    content: {
      seo: {
        title: d.seo?.title ?? f.seo.title,
        description: d.seo?.description ?? f.seo.description,
        keywords: keywords(d.seo?.keywords, f.seo.keywords),
      },
      hero: mapHero(d.hero, f.hero),
      stats: mapStats(d.stats, f.stats),
      intro: mapIntro(d.intro, f.intro),
      audiences: mapAudienceCards(d.audiences, f.audiences),
      founder: mapFounder(d.founder, f.founder),
      team: mapTeam(d.team, f.team),
      values: mapFeatureCards(d.values, f.values),
      security: mapSecurityControls(d.security, f.security),
      expertise: mapCardGrid(d.expertise, f.expertise),
    },
    ogImage: d.seo?.ogImage ?? undefined,
    metaTags: d.seo?.metaTags ?? undefined,
  };
}

/** `loadAboutPage` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getAboutPage = withResolvedLinks(loadAboutPage);
