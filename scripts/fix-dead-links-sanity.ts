/**
 * Rewrites links stored in Sanity that point at old-site pages the new site doesn't have
 * (found in the 2026-10-27 audit; mostly inside the migrated blog posts and Site Settings →
 * Footer):
 *   /contact-us → /contact       (the Contact page; /contact itself is a page again since 2026-10-27)
 *   /team     → /about#team      (About → Meet Our Team)
 *   /meeting  → Calendly         (the old /meeting page only embedded Calendly)
 *   "…slug "  → "…slug"          (stray trailing spaces broke two blog links)
 * next.config.ts also redirects these old URLs, for links from other websites.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/fix-dead-links-sanity.ts [--dry-run]
 *
 * Safe to re-run: documents with nothing to change are skipped. Uses `ifRevisionId`, so an edit
 * made in Studio in the meantime is never overwritten (the script fails for that document).
 */
import { siteConfig } from "@/lib/site-config";

import { client, dataset, projectId } from "./lib/seed-helpers";

const dryRun = process.argv.includes("--dry-run");

const MAP: Record<string, string> = {
  // /contact is a real page again since 2026-10-27 (scripts/point-contact-links-sanity.ts).
  "/contact-us": "/contact",
  "/team": "/about#team",
  "/meeting": siteConfig.calendlyUrl,
};

/** Only link-like keys are touched, never body text. */
const LINK_KEYS = new Set(["href", "url", "link"]);

function fixHref(value: string): string {
  const trimmed = value.trim();
  const [path, hash] = trimmed.split("#");
  const target = MAP[path.replace(/\/$/, "")];
  if (target && !hash) return target;
  return trimmed;
}

type Change = { path: string; from: string; to: string };

function walk(node: unknown, path: string, changes: Change[]): unknown {
  if (Array.isArray(node)) return node.map((v, i) => walk(v, `${path}[${i}]`, changes));
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === "string" && LINK_KEYS.has(k) && (v.startsWith("/") || v !== v.trim())) {
        const to = fixHref(v);
        if (to !== v) changes.push({ path: `${path}.${k}`, from: v, to });
        out[k] = to;
      } else {
        out[k] = walk(v, `${path}.${k}`, changes);
      }
    }
    return out;
  }
  return node;
}

async function main() {
  console.log(`${dryRun ? "[dry run] " : ""}Fixing dead links in ${projectId}/${dataset}`);
  const docs: Record<string, unknown>[] = await client.fetch(
    `*[!(_type match "sanity.*") && !(_type match "system.*")]`,
  );
  let touched = 0;
  for (const doc of docs) {
    const changes: Change[] = [];
    const set: Record<string, unknown> = {};
    for (const [field, value] of Object.entries(doc)) {
      if (field.startsWith("_")) continue;
      const before = changes.length;
      const fixed = walk(value, field, changes);
      if (changes.length > before) set[field] = fixed;
    }
    if (!changes.length) continue;
    touched++;
    console.log(`\n${doc._id} (${doc._type})`);
    for (const c of changes)
      console.log(`  ${c.path}: ${JSON.stringify(c.from)} → ${JSON.stringify(c.to)}`);
    if (!dryRun)
      await client.patch(String(doc._id)).ifRevisionId(String(doc._rev)).set(set).commit();
  }
  console.log(`\n${dryRun ? "Would update" : "Updated"} ${touched} document(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
