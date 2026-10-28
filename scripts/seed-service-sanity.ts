/**
 * Seeds a new-site service page document (`_type: "servicePage"`, `_id: "servicePage-<slug>"`) in
 * Sanity from its code content (content/services/<slug>.ts), uploading every image/logo/poster
 * from public/. Same approach as scripts/seed-home-sanity.ts.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-service-sanity.ts <slug> [--only=a,b]
 *
 * `slug` defaults to audit-outsourcing-services; it must be a key of content/services/index.ts
 * (or `all` to seed every service page that has no document yet; existing documents are skipped).
 * Default: replaces the whole document (and drops a stale draft so the Studio shows the seeded
 * version), which overwrites Studio edits.
 * `--only=caseStudies,industries`: patches just those top-level fields of the published document
 * (and of a draft, if one exists), leaving every other Studio edit alone. Use it to push a design
 * update into a page that editors already work on.
 * Sections a page's design doesn't draw (undefined in its code content) are not written.
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { servicePages } from "@/content/services";
import type { ServicePageContent } from "@/content/services/types";
import type { FeatureCardsContent } from "@/content/types";
// Same resolver as the site, so Studio starts with the ids the page already renders.
import { sectionId } from "../lib/section-ids";
import {
  altImage,
  client,
  dataset,
  imageRef,
  keyed,
  link,
  pageDocId,
  pageUrlFields,
  projectId,
  richText,
  uploads,
} from "./lib/seed-helpers";

const args = process.argv.slice(2);
const only = args
  .find((a) => a.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const slugArg = args.find((a) => !a.startsWith("--")) ?? "audit-outsourcing-services";

const image = async (src: string) => ({ _type: "image", ...(await imageRef(src)) });

/* ---------------------------------------------------------------- sections */

/** Both grids use the feature-cards block; defaults match the template (#services, #additional-services). */
const featureCards = (s: FeatureCardsContent, defaultAnchor: string) => ({
  _type: "featureCardsSection",
  anchorId: s.anchorId || defaultAnchor,
  badge: s.badge,
  title: s.title,
  subtitle: s.subtitle,
  items: keyed(s.items, "iconCard"),
});

async function buildServicePage(page: ServicePageContent) {
  const { hero, stats, intro, challenges, featureGrid, services, caseStudies, process: steps } = page;
  const { industries, whyChoose, extraServices, security, tools, testimonials, blog, faq, ctaBand, seo } = page;

  return {
    _id: pageDocId("servicePage", page),
    _type: "servicePage",
    name: page.name,
    ...(await pageUrlFields(pageDocId("servicePage", page), page.slug)),

    hero: {
      _type: "heroSection",
      anchorId: sectionId(hero, "hero"),
      badge: hero.badge,
      title: hero.title,
      subtitle: hero.subtitle,
      primaryCta: link(hero.primaryCta),
      ...(hero.secondaryCta ? { secondaryCta: link(hero.secondaryCta) } : {}),
      checks: keyed(
        hero.checks.map((c) => ({ label: c.label, show: true })),
        "heroCheck",
      ),
    },

    stats: {
      _type: "statsSection",
      anchorId: sectionId(stats, "stats"),
      items: keyed(
        await Promise.all(
          stats.items.map(async (s) => ({
            value: s.value,
            label: s.label,
            ...(s.image ? { image: await image(s.image.src) } : {}),
          })),
        ),
        "statItem",
      ),
      rating: stats.rating,
    },

    intro: {
      _type: "introSection",
      anchorId: sectionId(intro, "intro"),
      title: intro.title,
      body: richText(intro.body),
      ...(intro.bodyMore ? { bodyMore: richText(intro.bodyMore) } : {}),
      ...(intro.bodyExtra ? { bodyExtra: richText(intro.bodyExtra) } : {}),
      bodyMoreLayout: intro.bodyMoreLayout ?? "inline-desktop",
      image: await altImage(intro.image),
      ...(intro.features?.length ? { features: keyed(intro.features, "introFeature") } : {}),
      checks: intro.checks,
      checksStyle: intro.checksStyle ?? "pill",
      ...(intro.checksTitle ? { checksTitle: intro.checksTitle } : {}),
      ...(intro.cta ? { cta: link(intro.cta) } : {}),
    },

    challenges: {
      _type: "challengesSection",
      anchorId: sectionId(challenges, "challenges"),
      badge: challenges.badge,
      title: challenges.title,
      body: challenges.body,
      ...(challenges.cta ? { cta: link(challenges.cta) } : {}),
      items: keyed(
        challenges.items.map((c) => ({ tone: c.tone, icon: c.icon, title: c.title, body: richText(c.body) })),
        "challengeCard",
      ),
    },

    ...(featureGrid ? { featureGrid: featureCards(featureGrid, "services") } : {}),

    ...(services
      ? {
          services: {
            _type: "servicesSection",
            anchorId: sectionId(services, "services"),
            badge: services.badge,
            title: services.title,
            subtitle: services.subtitle,
            initiallyVisible: services.initiallyVisible,
            items: keyed(
              services.items.map((s) => ({
                icon: s.icon,
                title: s.title,
                description: s.description,
                ...(s.keyLabel ? { keyLabel: s.keyLabel } : {}),
                ...(s.keyItems?.length ? { keyItems: s.keyItems } : {}),
                ...(s.groups?.length ? { groups: keyed(s.groups, "serviceGroup") } : {}),
                ...(s.cta ? { cta: link(s.cta) } : {}),
              })),
              "serviceCard",
            ),
          },
        }
      : {}),

    ...(caseStudies
      ? {
          caseStudies: {
            _type: "caseStudiesSection",
            anchorId: sectionId(caseStudies, "caseStudies"),
            badge: caseStudies.badge,
            title: caseStudies.title,
            subtitle: caseStudies.subtitle,
            items: keyed(
              await Promise.all(
                caseStudies.items.map(async (c) => ({
                  label: c.label,
                  id: { _type: "slug", current: c.id },
                  title: c.title,
                  challenge: c.challenge,
                  solution: c.solution,
                  result: c.result,
                  ...(c.impact ? { impact: c.impact } : {}),
                  image: await altImage(c.image),
                  ...(c.image.mobile
                    ? { mobileImage: { _type: "image", ...(await imageRef(c.image.mobile.src)) } }
                    : {}),
                  cta: link(c.cta, "optionalLink"),
                })),
              ),
              "caseStudy",
            ),
          },
        }
      : {}),

    ...(steps
      ? {
          process: {
            _type: "processSection",
            anchorId: sectionId(steps, "process"),
            badge: steps.badge,
            title: steps.title,
            subtitle: steps.subtitle,
            steps: keyed(steps.steps, "iconCard"),
          },
        }
      : {}),

    ...(industries
      ? {
          industries: {
            _type: "industriesSection",
            anchorId: sectionId(industries, "industries"),
            badge: industries.badge,
            title: industries.title,
            subtitle: industries.subtitle,
            cta: link(industries.cta, "optionalLink"),
            items: keyed(
              await Promise.all(
                industries.items.map(async (i) => ({
                  title: i.title,
                  body: i.body,
                  ...(i.href ? { href: i.href } : {}),
                  image: await altImage(i.image),
                })),
              ),
              "industryCard",
            ),
          },
        }
      : {}),

    whyChoose: {
      _type: "whyChooseSection",
      anchorId: sectionId(whyChoose, "whyChoose"),
      badge: whyChoose.badge,
      title: whyChoose.title,
      subtitle: whyChoose.subtitle,
      features: keyed(whyChoose.features, "iconCard"),
      images: keyed(await Promise.all(whyChoose.images.map(altImage))),
      stats: keyed(whyChoose.stats, "statItem"),
    },

    ...(extraServices ? { extraServices: featureCards(extraServices, "additional-services") } : {}),

    ...(security
      ? {
          security: {
            _type: "securityControlsSection",
            anchorId: sectionId(security, "security"),
            badge: security.badge,
            title: security.title,
            subtitle: security.subtitle,
            shield: await image(security.shield.src),
            groups: keyed(
              security.groups.map((g) => ({ title: g.title, items: keyed(g.items, "securityControl") })),
              "securityGroup",
            ),
          },
        }
      : {}),

    ...(tools
      ? {
          tools: {
            _type: "toolTabsSection",
            anchorId: sectionId(tools, "tools"),
            badge: tools.badge,
            title: tools.title,
            subtitle: tools.subtitle,
            categories: keyed(
              await Promise.all(
                tools.categories.map(async (c) => ({
                  label: c.label,
                  id: { _type: "slug", current: c.id },
                  icon: c.icon,
                  tools: keyed(
                    await Promise.all(
                      c.tools.map(async (t) => ({
                        name: t.name,
                        ...(t.logo ? { logo: { _type: "image", ...(await imageRef(t.logo)) } } : {}),
                      })),
                    ),
                    "toolChip",
                  ),
                })),
              ),
              "toolCategory",
            ),
          },
        }
      : {}),

    ...(testimonials
      ? {
          testimonials: {
            _type: "testimonialsSection",
            anchorId: sectionId(testimonials, "testimonials"),
            badge: testimonials.badge,
            title: testimonials.title,
            subtitle: testimonials.subtitle,
            videos: keyed(
              await Promise.all(
                testimonials.videos.map(async (v) => ({
                  youtubeId: v.youtubeId,
                  title: v.title,
                  name: v.name,
                  company: v.company,
                  country: v.country,
                  uploadDate: new Date(v.uploadDate).toISOString(),
                  duration: v.duration,
                  poster: { _type: "image", ...(await imageRef(v.poster.src)) },
                })),
              ),
              "testimonialVideo",
            ),
          },
        }
      : {}),

    ...(blog
      ? {
          blog: {
            _type: "blogSection",
            anchorId: sectionId(blog, "blog"),
            badge: blog.badge,
            title: blog.title,
            subtitle: blog.subtitle,
            cta: link(blog.cta),
          },
        }
      : {}),

    faq: {
      _type: "faqSection",
      anchorId: sectionId(faq, "faq"),
      badge: faq.badge,
      title: faq.title,
      intro: typeof faq.intro === "string" ? [faq.intro] : faq.intro,
      items: keyed(
        faq.items.map((f) => ({ question: f.q, answer: richText(f.a) })),
        "faqEntry",
      ),
    },

    ctaBand: {
      _type: "ctaBandSection",
      anchorId: sectionId(ctaBand, "ctaBand"),
      title: ctaBand.title,
      body: ctaBand.body,
      ...(ctaBand.cta ? { cta: link(ctaBand.cta) } : {}),
      ...(ctaBand.secondaryCta ? { secondaryCta: link(ctaBand.secondaryCta) } : {}),
      image: { _type: "image", ...(await imageRef(ctaBand.image.src)) },
    },

    seo: { _type: "seoMeta", title: seo.title, description: seo.description, keywords: seo.keywords ?? [] },
  };
}

async function seed(slug: string, { skipExisting }: { skipExisting: boolean }) {
  const page = servicePages[slug];
  if (!page) {
    throw new Error(`Unknown service page "${slug}". Known: ${Object.keys(servicePages).join(", ")}`);
  }
  const docId = pageDocId("servicePage", page);
  const existing = await client.fetch<{ published: boolean; draft: boolean }>(
    `{ "published": defined(*[_id == $id][0]._id), "draft": defined(*[_id == $draft][0]._id) }`,
    { id: docId, draft: `drafts.${docId}` },
  );

  if (skipExisting && (existing.published || existing.draft)) {
    console.log(`• ${docId} already exists → skipped (use the slug, or --only=…, to update it)`);
    return;
  }

  console.log(`Seeding service page "${slug}" → ${projectId}/${dataset}`);
  const doc = await buildServicePage(page);

  if (only?.length) {
    if (!existing.published) throw new Error(`--only needs an existing published ${docId}`);
    const fields = Object.fromEntries(
      only.map((name) => {
        if (!(name in doc)) throw new Error(`"${name}" is not a field of this page's document`);
        return [name, doc[name as keyof typeof doc]];
      }),
    );
    const tx = client.transaction().patch(docId, (p) => p.set(fields));
    if (existing.draft) tx.patch(`drafts.${docId}`, (p) => p.set(fields));
    await tx.commit();
    console.log(`  ${uploads.size} images uploaded/reused`);
    console.log(`✔ ${docId}: patched ${only.join(", ")}${existing.draft ? " (published + draft)" : ""}.`);
    return;
  }

  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${docId}`).commit();
  console.log(`✔ ${docId} replaced (published). Refresh /studio → Service Pages.`);
}

async function main() {
  if (slugArg === "all") {
    for (const slug of Object.keys(servicePages)) await seed(slug, { skipExisting: true });
  } else {
    await seed(slugArg, { skipExisting: false });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
