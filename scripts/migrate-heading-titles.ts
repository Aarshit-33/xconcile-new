/**
 * One-off migration (2026-10-24): converts every heading still stored in the old shape
 * `{ before, highlight, after, inline? }` (hero, contact form and `headingTitle` fields) into the
 * single-string form, e.g.
 *
 *   { before: "Why Businesses Choose Xconcile for", highlight: "Outsourced Accounting" }
 *   → "Why Businesses Choose Xconcile for *Outsourced Accounting*"
 *
 * Literal asterisks in the old parts are escaped as `\*` (lib/highlight.ts). Published documents
 * and drafts are both migrated. Re-runnable: already-converted headings are skipped.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/migrate-heading-titles.ts [--dry-run]
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (see scripts/lib/seed-helpers.ts).
 */
import { toHighlightString } from "../lib/highlight";
import { client, dataset, projectId } from "./lib/seed-helpers";

const DOC_TYPES = ["home", "servicePage", "hirePage", "industryPage"];
const LEGACY_KEYS = new Set(["_type", "_key", "before", "highlight", "after", "inline"]);
const dryRun = process.argv.includes("--dry-run");

type Json = unknown;
type Change = { path: string; from: Json; to: string };

/** An object made only of the old heading fields (and at least one of them filled). */
function isLegacyHeading(value: Json): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return (
    keys.every((k) => LEGACY_KEYS.has(k)) &&
    keys.some((k) => k === "before" || k === "highlight" || k === "after")
  );
}

/** Walks the document and collects every `title` that still holds a legacy heading object. */
function collect(value: Json, path: string, out: Change[]) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const key = item && typeof item === "object" ? (item as { _key?: string })._key : undefined;
      collect(item, key ? `${path}[_key=="${key}"]` : `${path}[${i}]`, out);
    });
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [k, v] of Object.entries(value)) {
    if (k.startsWith("_")) continue;
    const childPath = path ? `${path}.${k}` : k;
    if (k === "title" && isLegacyHeading(v)) {
      const to = toHighlightString(v);
      if (to) out.push({ path: childPath, from: v, to });
      continue;
    }
    collect(v, childPath, out);
  }
}

async function main() {
  console.log(`Migrating headings → ${projectId}/${dataset}${dryRun ? " (dry run)" : ""}`);
  const docs: { _id: string; _type: string }[] = await client.fetch(
    `*[_type in $types]`,
    { types: DOC_TYPES },
    { perspective: "raw" },
  );

  let total = 0;
  const tx = client.transaction();
  for (const doc of docs) {
    const changes: Change[] = [];
    collect(doc, "", changes);
    if (!changes.length) continue;
    total += changes.length;
    console.log(`\n${doc._id} (${doc._type})`);
    for (const c of changes) console.log(`  ${c.path}: ${JSON.stringify(c.from)}\n    → ${JSON.stringify(c.to)}`);
    tx.patch(doc._id, (p) => p.set(Object.fromEntries(changes.map((c) => [c.path, c.to]))));
  }

  if (!total) {
    console.log("\nNothing to migrate: every heading is already a single string.");
    return;
  }
  if (dryRun) {
    console.log(`\n${total} heading(s) would be converted. Run again without --dry-run to apply.`);
    return;
  }
  await tx.commit();
  console.log(`\n✔ ${total} heading(s) converted. Refresh /studio.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
