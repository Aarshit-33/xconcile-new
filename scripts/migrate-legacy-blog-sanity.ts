/**
 * One-time migration (user request 2026-10-27): copies EVERY blog post from the old site's
 * dataset (`production`, type `post`) into this site's dataset as `blogPost` documents, so the
 * old dataset can be deleted. Nothing in the old dataset is changed.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/migrate-legacy-blog-sanity.ts --dry-run
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/migrate-legacy-blog-sanity.ts
 *
 * Mapping (old → new):
 * - Same slug (URLs and rankings unchanged), title, date, excerpt (if any), FAQs, SEO
 *   (metaTitle/metaDescription/metaKeywords → seo title/description/keywords).
 * - Cover + any SEO image: downloaded from the old dataset and uploaded into this one (the old
 *   dataset's images disappear when it is deleted).
 * - Body: same blocks; H1 → H2 (one H1 per page), H5/H6 → H4 (styles the new schema has).
 *   Links to https://xconcile.com/... become site-relative paths.
 * - "5 min read" → read time 5. Author "Pranav Jani, CPA" → the Pranav Jani author document.
 * Deterministic ids (`blogPost-legacy-<old id>`): re-running replaces the copies. A post whose
 * slug already belongs to a post written in this Studio is skipped.
 */
import { createClient } from "@sanity/client";

import { client, dataset, key, keyed, projectId } from "./lib/seed-helpers";

const OLD_DATASET = "production";
const AUTHOR_ID = "author-pranav-jani";
const dryRun = process.argv.includes("--dry-run");

const token = process.env.SANITY_AUTH_TOKEN ?? process.env.SANITY_API_TOKEN;
const oldClient = createClient({ projectId, dataset: OLD_DATASET, token, apiVersion: "2025-02-19", useCdn: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw documents from the old schema
type Raw = any;

const OLD_POSTS = /* groq */ `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt, readTime, author, content, faqs,
  mainImage{ alt, hotspot, crop, "url": asset->url, "ext": asset->extension, "name": asset->originalFilename },
  seo{ metaTitle, metaDescription, metaKeywords, openGraphImage{ "url": asset->url, "name": asset->originalFilename } }
}`;

/* ------------------------------------------------------------------------- images */

const uploaded = new Map<string, Promise<string>>();
function copyImage(url: string, name?: string): Promise<string> {
  if (!uploaded.has(url)) {
    uploaded.set(
      url,
      (async () => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Image download failed (${res.status}): ${url}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        const asset = await client.assets.upload("image", buffer, { filename: name || url.split("/").pop() });
        console.log(`  ↑ ${name || url.split("/").pop()}`);
        return asset._id;
      })(),
    );
  }
  return uploaded.get(url)!;
}

/* --------------------------------------------------------------------------- body */

const SITE = /^https?:\/\/(www\.)?xconcile\.com(?=\/|$|\?|#)/i;
const relative = (href: string) => {
  if (!SITE.test(href)) return href;
  const path = href.replace(SITE, "");
  return path === "" ? "/" : path;
};
const STYLE: Record<string, string> = { h1: "h2", h5: "h4", h6: "h4" };
const ALLOWED_STYLES = new Set(["normal", "h2", "h3", "h4", "blockquote"]);

function mapBody(content: Raw[] | null | undefined) {
  return (content ?? [])
    .filter((b) => b?._type === "block")
    .map((b) => {
      const mapped = STYLE[b.style] ?? b.style ?? "normal";
      return {
        ...b,
        _key: b._key ?? key("b"),
        style: ALLOWED_STYLES.has(mapped) ? mapped : "normal",
        markDefs: (b.markDefs ?? []).map((m: Raw) =>
          m._type === "link" ? { _key: m._key, _type: "link", href: relative(String(m.href ?? "")), blank: false } : m,
        ),
        children: (b.children ?? []).map((c: Raw) => ({ ...c, _key: c._key ?? key("s") })),
      };
    });
}

const minutes = (raw: unknown) => {
  const n = typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  return n > 0 ? n : undefined;
};

/* ---------------------------------------------------------------------- documents */

async function toBlogPost(p: Raw) {
  const coverId = await copyImage(p.mainImage.url, p.mainImage.name);
  const ogId = p.seo?.openGraphImage?.url ? await copyImage(p.seo.openGraphImage.url, p.seo.openGraphImage.name) : null;
  const keywords = Array.isArray(p.seo?.metaKeywords)
    ? [...new Set(p.seo.metaKeywords.map((k: unknown) => String(k).trim()).filter(Boolean))]
    : [];
  const faqs = (p.faqs ?? []).filter((f: Raw) => f?.question && f?.answer).map((f: Raw) => ({ question: f.question, answer: f.answer }));

  return {
    _id: `blogPost-legacy-${String(p._id).replace(/[^a-zA-Z0-9_-]/g, "-")}`,
    _type: "blogPost",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    ...(typeof p.author === "string" && /pranav/i.test(p.author) ? { author: { _type: "reference", _ref: AUTHOR_ID } } : {}),
    publishedAt: String(p.publishedAt).slice(0, 10),
    ...(minutes(p.readTime) ? { readTime: minutes(p.readTime) } : {}),
    ...(p.excerpt?.trim() ? { excerpt: p.excerpt.trim() } : {}),
    mainImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverId },
      alt: p.mainImage.alt?.trim() || p.title,
      ...(p.mainImage.hotspot ? { hotspot: p.mainImage.hotspot } : {}),
      ...(p.mainImage.crop ? { crop: p.mainImage.crop } : {}),
    },
    body: mapBody(p.content),
    ...(faqs.length ? { faqs: keyed(faqs, "blogFaq") } : {}),
    relatedPosts: [],
    seo: {
      _type: "seoMeta",
      ...(p.seo?.metaTitle?.trim() ? { title: p.seo.metaTitle.trim() } : {}),
      ...(p.seo?.metaDescription?.trim() ? { description: p.seo.metaDescription.trim() } : {}),
      ...(keywords.length ? { keywords } : {}),
      ...(ogId ? { ogImage: { _type: "image", asset: { _type: "reference", _ref: ogId } } } : {}),
    },
  };
}

async function main() {
  console.log(`${dryRun ? "[dry run] " : ""}Copying blog posts ${projectId}/${OLD_DATASET} → ${projectId}/${dataset}`);
  if (dataset === OLD_DATASET) throw new Error("Target dataset is the old dataset; check NEXT_PUBLIC_SANITY_DATASET.");

  const [old, existing] = await Promise.all([
    oldClient.fetch<Raw[]>(OLD_POSTS),
    client.fetch<{ _id: string; slug: string }[]>(`*[_type == "blogPost" && defined(slug.current)]{ _id, "slug": slug.current }`),
  ]);
  // Slugs owned by posts written in this Studio (not earlier copies) are left alone.
  const taken = new Set(existing.filter((e) => !e._id.replace(/^drafts\./, "").startsWith("blogPost-legacy-")).map((e) => e.slug));
  const todo = old.filter((p) => !taken.has(p.slug));
  const skipped = old.filter((p) => taken.has(p.slug));

  console.log(`Old posts: ${old.length} | to copy: ${todo.length} | skipped (slug already used here): ${skipped.length}`);
  skipped.forEach((p) => console.log(`  skip ${p.slug}`));
  const links = todo.flatMap((p) => (p.content ?? []).flatMap((b: Raw) => b.markDefs ?? [])).filter((m: Raw) => m._type === "link");
  console.log(`Links: ${links.length} (${links.filter((m: Raw) => SITE.test(String(m.href))).length} to xconcile.com → site-relative)`);
  if (dryRun) {
    console.log("Dry run: nothing written.");
    return;
  }

  let done = 0;
  for (let i = 0; i < todo.length; i += 8) {
    const batch = await Promise.all(todo.slice(i, i + 8).map(toBlogPost));
    const tx = client.transaction();
    batch.forEach((doc) => tx.createOrReplace(doc).delete(`drafts.${doc._id}`));
    await tx.commit();
    done += batch.length;
    console.log(`✓ ${done}/${todo.length}`);
  }
  const total = await client.fetch<number>(`count(*[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))])`);
  console.log(`\nDone. Blog posts in ${dataset}: ${total}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
