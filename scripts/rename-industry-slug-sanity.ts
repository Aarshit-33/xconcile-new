/**
 * Renames an industry page URL in Sanity (client note 2026-10-27, page-updated/newShit/27-10-2026.svg:
 * "use the Figma page name in the URL"):
 *   /industries/it-technology → /industries/it-technology-accounting-services
 *
 * 1. Sets the industry page's `slug` (the document ID stays `industryPage-it-technology`).
 * 2. Rewrites every stored link to the old URL (menus, footer, cards, blog bodies…), keeping
 *    any #hash. Only link-like keys are touched, never body text.
 * next.config.ts also redirects the old URL (301), and content/ uses the new slug.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/rename-industry-slug-sanity.ts [--dry-run]
 *
 * Safe to re-run: documents with nothing to change are skipped. Uses `ifRevisionId`, so an edit
 * made in Studio in the meantime is never overwritten (the script fails for that document).
 */
import { client, dataset, projectId } from "./lib/seed-helpers";

const dryRun = process.argv.includes("--dry-run");

const OLD_SLUG = "it-technology";
const NEW_SLUG = "it-technology-accounting-services";
const OLD_PATH = `/industries/${OLD_SLUG}`;
const NEW_PATH = `/industries/${NEW_SLUG}`;

const LINK_KEYS = new Set(["href", "url", "link"]);

/** "/industries/it-technology", ".../" or "...#x" (also absolute xconcile URLs) → new path. */
function fixHref(value: string): string {
  const m = value
    .trim()
    .match(/^(https?:\/\/[^/]*xconcile[^/]*)?(\/industries\/[^/?#]+)\/?([?#].*)?$/);
  if (!m || m[2] !== OLD_PATH) return value;
  return `${m[1] ?? ""}${NEW_PATH}${m[3] ?? ""}`;
}

type Change = { path: string; from: string; to: string };

function walk(node: unknown, path: string, changes: Change[]): unknown {
  if (Array.isArray(node)) return node.map((v, i) => walk(v, `${path}[${i}]`, changes));
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === "string" && LINK_KEYS.has(k)) {
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
  console.log(`${dryRun ? "[dry run] " : ""}${OLD_PATH} → ${NEW_PATH} in ${projectId}/${dataset}`);

  // 1. The page's own slug (published + draft).
  const pages: { _id: string; _rev: string }[] = await client.fetch(
    `*[_type == "industryPage" && slug.current == $old]{ _id, _rev }`,
    { old: OLD_SLUG },
  );
  for (const p of pages) {
    console.log(`\n${p._id}: slug "${OLD_SLUG}" → "${NEW_SLUG}"`);
    if (!dryRun)
      await client.patch(p._id).ifRevisionId(p._rev).set({ "slug.current": NEW_SLUG }).commit();
  }
  const clash = await client.fetch(`count(*[_type == "industryPage" && slug.current == $new])`, {
    new: NEW_SLUG,
  });
  if (!pages.length)
    console.log(
      `\nNo industry page with slug "${OLD_SLUG}" (already renamed? pages with the new slug: ${clash}).`,
    );

  // 2. Links to the old URL anywhere in the dataset.
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
  console.log(
    `\n${dryRun ? "Would update" : "Updated"} ${pages.length} slug(s) and links in ${touched} document(s).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
