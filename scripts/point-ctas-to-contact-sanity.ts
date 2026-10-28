/**
 * Points the main call-to-action buttons at the Contact page (client request 2026-10-27):
 *  1. Every hero's first button.
 *  2. "Let's discuss project" links, site-wide.
 *  3. "Talk to an expert" links, site-wide (CTA bands' first button included).
 *  4. "Get started" links, site-wide.
 *  5. Hire pages: every link in the Hiring Models and Experience Levels sections.
 *  6. Industry pages: the intro's "Hire accounting staff" link.
 * Sets `href` to "/contact" on the matching link objects in Sanity (published + drafts).
 * The code fallbacks in content/ are updated separately (same rules).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/point-ctas-to-contact-sanity.ts [--dry-run]
 *
 * Safe to re-run. Uses `ifRevisionId`, so an edit made in Studio meanwhile is never overwritten.
 */
import { client, dataset, projectId } from "./lib/seed-helpers";

const dryRun = process.argv.includes("--dry-run");
const CONTACT = "/contact";
const TYPES = ["home", "aboutPage", "servicePage", "hirePage", "industryPage", "industriesPage", "caseStudiesPage", "caseStudy", "blogPage", "notFoundPage", "privacyPage", "contactPage", "seoArticle", "siteSettings"];

const LABEL_KEYS = ["label", "text", "title"];
const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
const RULES: { why: string; test: (label: string, path: string, type: string) => boolean }[] = [
  { why: "hero first button", test: (_l, p) => /(^|\.)hero\.primaryCta$/.test(p) },
  { why: "let's discuss project", test: (l) => /^let'?s discuss (your |a )?project/.test(l) },
  { why: "talk to an expert", test: (l) => /^talk to an expert/.test(l) },
  { why: "get started", test: (l) => /^get started/.test(l) },
  { why: "hire: hiring models", test: (_l, p, t) => t === "hirePage" && /^(models|engagementModels)\b/.test(p) },
  { why: "hire: experience levels", test: (_l, p, t) => t === "hirePage" && /^(levels|experienceLevels)\b/.test(p) },
  { why: "industry intro: hire accounting staff", test: (l, p, t) => t === "industryPage" && /^intro\b/.test(p) && /^hire accounting staff/.test(l) },
];

type Change = { path: string; label: string; from: string; why: string };

function walk(node: unknown, path: string, type: string, changes: Change[], set: Record<string, string>) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => {
      const key = v && typeof v === "object" && "_key" in v ? `[_key=="${(v as { _key: string })._key}"]` : `[${i}]`;
      walk(v, `${path}${key}`, type, changes, set);
    });
    return;
  }
  if (!node || typeof node !== "object") return;
  const o = node as Record<string, unknown>;
  if (typeof o.href === "string") {
    const label = LABEL_KEYS.map((k) => o[k]).find((v): v is string => typeof v === "string") ?? "";
    const plain = path.replace(/\[[^\]]*\]/g, "");
    const rule = RULES.find((r) => r.test(norm(label), plain, type));
    if (rule && o.href !== CONTACT) {
      changes.push({ path, label, from: o.href, why: rule.why });
      set[`${path}.href`] = CONTACT;
    }
  }
  for (const [k, v] of Object.entries(o)) if (!k.startsWith("_")) walk(v, path ? `${path}.${k}` : k, type, changes, set);
}

async function main() {
  console.log(`${dryRun ? "[dry run] " : ""}CTAs → ${CONTACT} in ${projectId}/${dataset}`);
  const docs: Record<string, unknown>[] = await client.fetch(`*[_type in $types]`, { types: TYPES });
  let total = 0;
  for (const doc of docs) {
    const changes: Change[] = [];
    const set: Record<string, string> = {};
    for (const [k, v] of Object.entries(doc)) if (!k.startsWith("_")) walk(v, k, String(doc._type), changes, set);
    if (!changes.length) continue;
    total += changes.length;
    console.log(`\n${doc._id}`);
    for (const c of changes) console.log(`  [${c.why}] "${c.label}"  ${c.from} → ${CONTACT}   (${c.path.replace(/\[_key=="[^"]+"\]/g, "[]")})`);
    if (!dryRun) await client.patch(String(doc._id)).ifRevisionId(String(doc._rev)).set(set).commit();
  }
  console.log(`\n${dryRun ? "Would update" : "Updated"} ${total} link(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
