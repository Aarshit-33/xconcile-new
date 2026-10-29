import "server-only";

import type {
  AudienceCardsContent,
  BlogContent,
  CardGridContent,
  CaseStudiesContent,
  ChallengesContent,
  CtaBandContent,
  EngagementModelsContent,
  ExperienceLevelsContent,
  FaqContent,
  FeatureCardsContent,
  FeatureStripContent,
  HeroContent,
  HiringStepsContent,
  ImageAsset,
  IndustriesContent,
  IntroContent,
  Link,
  ProcessContent,
  RichText,
  SecurityControlsContent,
  ServicesContent,
  StatsContent,
  SubIndustriesContent,
  TestimonialsContent,
  ToolsContent,
  ToolTabsContent,
  WhyChooseContent,
} from "@/content/types";
import { toHighlightString } from "@/lib/highlight";
import { routes } from "@/lib/routes";

/**
 * One mapper per v2 section type (sanity/schemaTypes/v2/sections): raw GROQ result → the shape
 * the section component accepts (content/types.ts). Every page document (Home, service, hire and
 * industry pages)
 * uses the same mapper for the same section type, so a section behaves the same everywhere.
 *
 * Fallback rule (same on every page): a section missing in Sanity uses the page's code content
 * (`f`); inside a section, any empty field falls back to the code value.
 */

/** Image → `{ url, width, height, alt }` from the asset metadata. */
export const IMG = `{ "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, alt }`;

/** GROQ projections for sections whose images/slugs need resolving (shared by every page query). */
export const SECTION_PROJECTION = {
  // Stat icons (RCM "HIPAA Compliant") need their asset URL.
  stats: `stats{ ..., items[]{ ..., "image": image${IMG} } }`,
  intro: `intro{ ..., "image": image${IMG} }`,
  caseStudies: `caseStudies{ ..., items[]{ ..., "id": id.current, "image": image${IMG}, "mobileImage": mobileImage${IMG}, "caseStudySlug": caseStudy->slug.current } }`,
  industries: `industries{ ..., items[]{ ..., "image": image${IMG} } }`,
  whyChoose: `whyChoose{ ..., "images": images[]${IMG} }`,
  tools: `tools{ ..., items[]{ name, "logo": logo${IMG} } }`,
  toolTabs: `tools{ ..., categories[]{ ..., "id": id.current, tools[]{ name, "logo": logo${IMG} } } }`,
  testimonials: `testimonials{ ..., videos[]{ ..., "poster": poster${IMG} } }`,
  ctaBand: `ctaBand{ ..., "image": image${IMG} }`,
  // Hire pages
  hiringSteps: `steps{ ..., "photos": photos[]${IMG}, photoBadge{ label, "flag": flag${IMG} }, proof{ ..., "avatars": avatars[]${IMG} } }`,
  audiences: `audiences{ ..., items[]{ ..., "image": image${IMG} } }`,
  security: `security{ ..., "shield": shield${IMG} }`,
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw GROQ result; mapped below
export type Raw = any;

type Img = { url?: string; width?: number; height?: number; alt?: string } | null | undefined;

export const img = (i: Img) =>
  i?.url && i.width && i.height
    ? { src: i.url, alt: i.alt ?? "", width: i.width, height: i.height }
    : undefined;

/**
 * Portable Text (paragraphs + link annotations) → `RichText` (`(string | { text, href })[]`).
 *
 * Line structure is kept exactly as typed in Studio (user request 2026-10-29), with no added
 * spacing: each new paragraph (Enter) starts on the next line, and each empty paragraph is one
 * empty line. Encoded as "\n" parts, which `<RichText>` renders as line breaks. (Before, all
 * paragraphs were merged into one with spaces.) Empty lines at the start/end are dropped.
 */
export function richText(blocks: Raw): RichText | undefined {
  if (!Array.isArray(blocks)) return undefined;
  const isBlank = (block: Raw) =>
    !(block?.children ?? []).some((span: Raw) => (span?.text ?? "").trim());
  let start = 0;
  let end = blocks.length;
  while (start < end && isBlank(blocks[start])) start++;
  while (end > start && isBlank(blocks[end - 1])) end--;
  if (start === end) return undefined;

  const out: RichText = [];
  blocks.slice(start, end).forEach((block: Raw, i: number) => {
    if (i > 0) out.push("\n");
    if (isBlank(block)) return; // the "\n" before the next paragraph makes the empty line
    for (const span of block.children ?? []) {
      const href = (block.markDefs ?? []).find((m: Raw) => span.marks?.includes(m._key))?.href;
      out.push(href ? { text: span.text ?? "", href } : (span.text ?? ""));
    }
  });
  return out;
}

export const link = (l: Raw) =>
  l?.label && l?.href ? { label: l.label, href: l.href } : undefined;
/**
 * Heading (`headingTitle`): one string with `*green*` markup (lib/highlight.ts). Documents saved
 * before 2026-10-24 may still hold the old `{ before, highlight, after }` object; it is converted
 * to the same string until scripts/migrate-heading-titles.ts has been run.
 */
export const heading = (t: Raw): string | undefined => toHighlightString(t);
/** Decorative image (flags, avatars, illustrations): alt is always empty. */
const decorative = (i: Img): ImageAsset | undefined => {
  const image = img(i);
  return image ? { ...image, alt: "" } : undefined;
};
/** Array item button: Sanity value, else the code item at the same position. */
const itemLink = (l: Raw, fallback: Link | undefined): Link =>
  link(l) ?? fallback ?? { label: l?.label ?? "", href: l?.href ?? "" };

/** SEO meta keywords (`seoMeta.keywords`): trimmed, de-duplicated Sanity list, else the code list. */
export function keywords(d: Raw, f: string[] | undefined): string[] | undefined {
  const list = Array.isArray(d)
    ? [
        ...new Set(
          d
            .filter((k: unknown): k is string => typeof k === "string")
            .map((k) => k.trim())
            .filter(Boolean),
        ),
      ]
    : [];
  return list.length ? list : f;
}

/* ------------------------------------------------------------------ sections */

export function mapHero(d: Raw, f: HeroContent): HeroContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: heading(d.title) ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        primaryCta: link(d.primaryCta) ?? f.primaryCta,
        // "Show second button" off = no button (not the code fallback); unset = shown.
        secondaryCta:
          d.showSecondaryCta === false ? undefined : (link(d.secondaryCta) ?? f.secondaryCta),
        // One "Show" switch per item, same on every screen size (user request 2026-10-26). The
        // old "Desktop only" value is ignored, so those items now show on phones/tablets too.
        checks:
          d.checks?.filter((c: Raw) => c.show !== false).map((c: Raw) => ({ label: c.label })) ??
          f.checks,
      }
    : f;
}

export function mapStats(d: Raw, f: StatsContent): StatsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        items:
          d.items?.map((s: Raw) => {
            // Icon instead of the number (decorative: the label beside it carries the meaning).
            const image = decorative(s.image);
            return { value: s.value ?? "", label: s.label, ...(image ? { image } : {}) };
          }) ?? f.items,
        rating: d.rating?.value ? d.rating : f.rating,
      }
    : f;
}

export function mapIntro(d: Raw, f: IntroContent): IntroContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        title: d.title ?? f.title,
        body: richText(d.body) ?? f.body,
        bodyMore: richText(d.bodyMore) ?? f.bodyMore,
        bodyExtra: richText(d.bodyExtra) ?? f.bodyExtra,
        ...(d.bodyMoreLayout ? { bodyMoreLayout: d.bodyMoreLayout } : {}),
        image: img(d.image) ?? f.image,
        features: d.features?.map((x: Raw) => ({ icon: x.icon, label: x.label })) ?? f.features,
        checks: d.checks ?? f.checks,
        ...(d.checksStyle ? { checksStyle: d.checksStyle } : {}),
        checksTitle: d.checksTitle || f.checksTitle,
        cta: link(d.cta) ?? f.cta,
      }
    : f;
}

export function mapChallenges(d: Raw, f: ChallengesContent): ChallengesContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        body: d.body ?? f.body,
        cta: link(d.cta) ?? f.cta,
        items:
          d.items?.map((x: Raw) => ({
            tone: x.tone,
            icon: x.icon,
            title: x.title,
            body: richText(x.body) ?? [],
          })) ?? f.items,
      }
    : f;
}

export function mapServices(d: Raw, f: ServicesContent): ServicesContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        id: f.id,
        badge: d.badge ?? f.badge,
        title: heading(d.title) ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        initiallyVisible: d.initiallyVisible ?? f.initiallyVisible,
        items:
          d.items?.map((x: Raw) => ({
            icon: x.icon,
            title: x.title,
            description: x.description,
            keyLabel: x.keyLabel ?? undefined,
            keyItems: x.keyItems ?? undefined,
            // Grouped lists (service pages; the field is hidden on Home).
            groups: x.groups?.length
              ? x.groups
                  .map((g: Raw) => ({
                    title: g.title ?? "",
                    items: (g.items ?? []).filter(Boolean),
                    // Card colour (Key Challenges tint or transparent); empty = default cycle.
                    ...(g.tone ? { tone: g.tone } : {}),
                  }))
                  .filter((g: { title: string; items: string[] }) => g.title && g.items.length)
              : undefined,
            cta: link(x.cta),
          })) ?? f.items,
      }
    : f;
}

/**
 * Impact card switch ("Show impact card", one setting for every screen size since 2026-10-26).
 * Unset: documents saved with the old per-device "Show on" list keep a fully unticked list as
 * hidden; any ticked device now means every screen.
 */
const impactShown = (impact: Raw) =>
  impact.show === true ||
  (impact.show !== false && !(Array.isArray(impact.devices) && impact.devices.length === 0));

export function mapCaseStudies(d: Raw, f: CaseStudiesContent): CaseStudiesContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        items:
          d.items
            ?.filter((x: Raw) => img(x.image))
            .map((x: Raw) => {
              const mobile = img(x.mobileImage);
              return {
                id: x.id ?? x._key,
                label: x.label,
                title: x.title,
                challenge: x.challenge,
                solution: x.solution,
                result: x.result,
                impact:
                  x.impact?.label && x.impact?.value && impactShown(x.impact)
                    ? {
                        label: x.impact.label,
                        value: x.impact.value,
                        icon: x.impact.icon || undefined,
                      }
                    : undefined,
                image: {
                  ...img(x.image)!,
                  ...(mobile
                    ? { mobile: { src: mobile.src, width: mobile.width, height: mobile.height } }
                    : {}),
                },
                // A picked case study page wins over the typed Link (user request 2026-10-27).
                cta: {
                  label: x.cta?.label || "View Case Study",
                  href: x.caseStudySlug
                    ? routes.caseStudy(x.caseStudySlug)
                    : (x.cta?.href ?? undefined),
                },
              };
            }) ?? f.items,
      }
    : f;
}

export function mapProcess(d: Raw, f: ProcessContent): ProcessContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        steps:
          d.steps?.map((x: Raw) => ({ icon: x.icon, title: x.title, body: x.body })) ?? f.steps,
      }
    : f;
}

export function mapIndustries(d: Raw, f: IndustriesContent): IndustriesContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        cta: d.cta?.label ? { label: d.cta.label, href: d.cta.href ?? undefined } : f.cta,
        items:
          d.items
            ?.filter((x: Raw) => img(x.image))
            .map((x: Raw) => ({
              title: x.title,
              body: x.body,
              href: x.href ?? undefined,
              image: img(x.image)!,
            })) ?? f.items,
      }
    : f;
}

export function mapWhyChoose(d: Raw, f: WhyChooseContent): WhyChooseContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: heading(d.title) ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        features:
          d.features?.map((x: Raw) => ({
            icon: x.icon,
            title: x.title,
            body: x.body,
          })) ?? f.features,
        images: (() => {
          const images = (d.images ?? []).map(img).filter(Boolean);
          return images.length === 4 ? images : f.images; // collage needs exactly 4
        })(),
        stats: d.stats?.map((s: Raw) => ({ value: s.value, label: s.label })) ?? f.stats,
      }
    : f;
}

export function mapTools(d: Raw, f: ToolsContent): ToolsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        items:
          d.items
            ?.filter((x: Raw) => img(x.logo))
            .map((x: Raw) => {
              const logo = img(x.logo)!;
              return { name: x.name, logo: logo.src, width: logo.width, height: logo.height };
            }) ?? f.items,
      }
    : f;
}

/** Service pages' tool tabs. Optional section: `undefined` when neither Sanity nor code has it. */
export function mapToolTabs(d: Raw, f: ToolTabsContent | undefined): ToolTabsContent | undefined {
  if (!d) return f;
  return {
    anchorId: d.anchorId || undefined,
    badge: d.badge ?? f?.badge ?? "",
    title: d.title ?? f?.title ?? "",
    subtitle: d.subtitle ?? f?.subtitle ?? "",
    categories:
      d.categories?.map((c: Raw) => ({
        id: c.id ?? c._key,
        icon: c.icon,
        label: c.label,
        tools: (c.tools ?? []).map((t: Raw) => {
          const logo = img(t.logo);
          return logo
            ? { name: t.name, logo: logo.src, width: logo.width, height: logo.height }
            : { name: t.name };
        }),
      })) ??
      f?.categories ??
      [],
  };
}

export function mapTestimonials(d: Raw, f: TestimonialsContent): TestimonialsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        videos:
          d.videos
            ?.filter((v: Raw) => img(v.poster))
            .map((v: Raw) => {
              const poster = img(v.poster)!;
              return {
                youtubeId: v.youtubeId,
                title: v.title,
                name: v.name,
                company: v.company,
                country: "us" as const,
                uploadDate: v.uploadDate,
                duration: v.duration,
                poster: { src: poster.src, width: poster.width, height: poster.height },
              };
            }) ?? f.videos,
      }
    : f;
}

export function mapBlog(d: Raw, f: BlogContent): BlogContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        cta: link(d.cta) ?? f.cta,
      }
    : f;
}

export function mapFaq(d: Raw, f: FaqContent): FaqContent {
  if (!d) return f;
  const intro: string | string[] = d.intro?.length ? d.intro : f.intro;
  return {
    anchorId: d.anchorId || undefined,
    badge: d.badge ?? f.badge,
    title: d.title ?? f.title,
    // One line renders as plain text (same markup as a single-line intro in code).
    intro: Array.isArray(intro) && intro.length === 1 ? intro[0] : intro,
    items: d.items?.map((x: Raw) => ({ q: x.question, a: richText(x.answer) ?? [] })) ?? f.items,
  };
}

/** Closing CTA band (service pages). The photo is decorative, so its alt stays empty. */
export function mapCtaBand(d: Raw, f: CtaBandContent): CtaBandContent {
  if (!d) return f;
  const image = img(d.image);
  return {
    anchorId: d.anchorId || undefined,
    title: d.title ?? f.title,
    body: d.body ?? f.body,
    // "Show … button" switches off = no button (not the code fallback). Unset (documents saved
    // before the switches existed) = shown.
    cta: d.showCta === false ? undefined : (link(d.cta) ?? f.cta),
    // Optional second button (RCM design); a half-filled Studio link falls back to the code one.
    secondaryCta:
      d.showSecondaryCta === false ? undefined : (link(d.secondaryCta) ?? f.secondaryCta),
    image: image ? { ...image, alt: "" } : f.image,
  };
}

/** Industries gallery "Industries We Serve" icon cards (featureCardsSection). */
export function mapFeatureCards(d: Raw, f: FeatureCardsContent): FeatureCardsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: heading(d.title) ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        items:
          d.items?.map((x: Raw) => ({ icon: x.icon, title: x.title, body: x.body })) ?? f.items,
      }
    : f;
}

/* ------------------------------------------------------- hire-page sections */

export function mapFeatureStrip(d: Raw, f: FeatureStripContent): FeatureStripContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        label: d.label ?? f.label,
        items:
          d.items?.map((x: Raw) => ({ icon: x.icon, title: x.title, body: x.body })) ?? f.items,
      }
    : f;
}

export function mapCardGrid(d: Raw, f: CardGridContent): CardGridContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        id: f.id,
        badge: d.badge ?? f.badge,
        title: heading(d.title) ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        items:
          d.items?.map((x: Raw) => ({ icon: x.icon, title: x.title, body: x.body || undefined })) ??
          f.items,
      }
    : f;
}

export function mapEngagementModels(d: Raw, f: EngagementModelsContent): EngagementModelsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        id: f.id,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        featuredLabel: d.featuredLabel ?? f.featuredLabel,
        items:
          d.items?.map((x: Raw, i: number) => ({
            number: x.number ?? "",
            icon: x.icon || undefined,
            title: x.title,
            tagline: x.tagline ?? "",
            body: x.body ?? "",
            features: x.features ?? [],
            cta: itemLink(x.cta, f.items[i]?.cta),
            featured: x.featured || undefined,
          })) ?? f.items,
      }
    : f;
}

export function mapHiringSteps(d: Raw, f: HiringStepsContent): HiringStepsContent {
  if (!d) return f;
  const photos = (d.photos ?? []).map(img).filter(Boolean) as ImageAsset[];
  const flag = decorative(d.photoBadge?.flag);
  const avatars = (d.proof?.avatars ?? []).map(decorative).filter(Boolean) as ImageAsset[];
  return {
    anchorId: d.anchorId || undefined,
    badge: d.badge ?? f.badge,
    title: d.title ?? f.title,
    subtitle: d.subtitle ?? f.subtitle,
    steps: d.steps?.map((x: Raw) => ({ title: x.title, body: x.body })) ?? f.steps,
    photos: photos.length === 2 ? [photos[0], photos[1]] : f.photos, // layout needs exactly 2
    photoBadge: {
      label: d.photoBadge?.label ?? f.photoBadge.label,
      flag: flag ?? f.photoBadge.flag,
    },
    proof: {
      value: d.proof?.value ?? f.proof.value,
      label: d.proof?.label ?? f.proof.label,
      avatars: d.proof?.avatars ? avatars : f.proof.avatars,
      badge: d.proof?.badge ?? f.proof.badge,
    },
    trust: d.trust ?? f.trust,
  };
}

export function mapExperienceLevels(d: Raw, f: ExperienceLevelsContent): ExperienceLevelsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        listLabel: d.listLabel ?? f.listLabel,
        featuredLabel: d.featuredLabel ?? f.featuredLabel,
        items:
          d.items?.map((x: Raw, i: number) => ({
            level: x.level ?? "",
            title: x.title,
            experience: x.experience ?? "",
            responsibilities: (x.responsibilities ?? []).map((r: Raw) => ({
              label: r.label,
              text: r.text,
            })),
            cta: itemLink(x.cta, f.items[i]?.cta),
            featured: x.featured || undefined,
          })) ?? f.items,
      }
    : f;
}

export function mapAudienceCards(d: Raw, f: AudienceCardsContent): AudienceCardsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        items:
          d.items
            ?.filter((x: Raw) => img(x.image))
            .map((x: Raw, i: number) => ({
              title: x.title,
              body: x.body,
              image: img(x.image)!,
              cta: itemLink(x.cta, f.items[i]?.cta),
            })) ?? f.items,
      }
    : f;
}

export function mapSecurityControls(d: Raw, f: SecurityControlsContent): SecurityControlsContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        shield: decorative(d.shield) ?? f.shield,
        groups:
          d.groups?.map((g: Raw) => ({
            title: g.title,
            items: (g.items ?? []).map((x: Raw) => ({
              icon: x.icon,
              title: x.title,
              body: x.body,
            })),
          })) ?? f.groups,
      }
    : f;
}

/* --------------------------------------------------- industry-page sections */

export function mapSubIndustries(d: Raw, f: SubIndustriesContent): SubIndustriesContent {
  return d
    ? {
        anchorId: d.anchorId || undefined,
        badge: d.badge ?? f.badge,
        title: d.title ?? f.title,
        subtitle: d.subtitle ?? f.subtitle,
        items:
          d.items?.map((x: Raw) => {
            const groups = (x.groups ?? [])
              .map((g: Raw) => ({ title: g.title ?? "", items: (g.items ?? []).filter(Boolean) }))
              .filter((g: { title: string; items: string[] }) => g.title && g.items.length);
            return {
              icon: x.icon,
              title: x.title,
              body: x.body,
              ...(groups.length ? { groups } : {}),
            };
          }) ?? f.items,
      }
    : f;
}
