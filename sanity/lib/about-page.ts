import "server-only";

import { about, type AboutPageContent } from "@/content/about";
import type { FounderContent, PersonProfile, TeamContent } from "@/content/types";

import { sanityFetch } from "./fetch";
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
  seo{ title, description, keywords, "ogImage": ogImage.asset->url },
  hero, values, expertise, contact,
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
    Array.isArray(v) ? v.filter((s: unknown): s is string => typeof s === "string" && s.trim() !== "") : undefined;
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
    ? (d.members.map((m: Raw, i: number) => mapPerson(m, f.members[i])).filter(Boolean) as PersonProfile[])
    : [];
  return {
    anchorId: d.anchorId || undefined,
    title: heading(d.title) ?? f.title,
    members: members.length ? members : f.members,
    certificationsLabel: d.certificationsLabel || f.certificationsLabel,
  };
}

/** Light (Figma) contact block: copy from Sanity; `required` rules always from code (server validation). */
function mapContact(d: Raw, f: AboutPageContent["contact"]): AboutPageContent["contact"] {
  if (!d) return f;
  const sf = d.form ?? {};
  const ff = f.form;
  const field = <K extends keyof typeof ff.fields>(k: K) => ({
    ...ff.fields[k],
    ...(sf.fields?.[k]?.label ? { label: sf.fields[k].label } : {}),
    ...(sf.fields?.[k]?.placeholder ? { placeholder: sf.fields[k].placeholder } : {}),
  });
  return {
    ...f,
    id: d.anchorId || f.id,
    title: heading(d.title) ?? f.title,
    body: d.body ?? f.body,
    checks: Array.isArray(d.checks) && d.checks.length ? d.checks : f.checks,
    form: {
      ...ff,
      fields: {
        name: field("name"),
        email: field("email"),
        company: field("company"),
        service: field("service"),
        message: field("message"),
      },
      submit: sf.submit ?? ff.submit,
      submitting: sf.submitting ?? ff.submitting,
      success: sf.success ?? ff.success,
      error: sf.error ?? ff.error,
    },
  };
}

/**
 * About page content (`/about`) from the `aboutPage` singleton (Studio → About Page), in the exact
 * shape of `AboutPageContent`. Same rules as every other page: any section or field left empty in
 * Sanity falls back to content/about.ts (also used when Sanity is not configured or the document
 * doesn't exist). Cache tag: `aboutPage` (revalidated by /api/revalidate on publish).
 */
export async function getAboutPage(): Promise<{ content: AboutPageContent; ogImage?: string }> {
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
      contact: mapContact(d.contact, f.contact),
    },
    ogImage: d.seo?.ogImage ?? undefined,
  };
}
