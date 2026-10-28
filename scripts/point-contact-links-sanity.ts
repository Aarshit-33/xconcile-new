/**
 * Points stored "Contact" links at the new Contact page (2026-10-27, design
 * page-updated/newShit/contact.svg):  "/#contact" → "/contact".
 * The 2026-10-27 audit had rewritten the old site's /contact links to Home's contact section
 * (scripts/fix-dead-links-sanity.ts); /contact is a real page again, so they go back. The Home
 * document is skipped (its own "#contact" buttons scroll to the section on the same page).
 * Also creates the `contactPage` singleton (SEO only; contact copy falls back to Home's) if missing.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/point-contact-links-sanity.ts [--dry-run]
 *
 * Safe to re-run. Uses `ifRevisionId`, so an edit made in Studio meanwhile is never overwritten.
 */
import { client, dataset, projectId } from "./lib/seed-helpers";

const dryRun = process.argv.includes("--dry-run");
const LINK_KEYS = new Set(["href", "url", "link"]);
const SKIP_IDS = new Set(["home", "drafts.home"]);

type Change = { path: string; from: string; to: string };

function walk(node: unknown, path: string, changes: Change[]): unknown {
  if (Array.isArray(node)) return node.map((v, i) => walk(v, `${path}[${i}]`, changes));
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === "string" && LINK_KEYS.has(k) && v.trim() === "/#contact") {
        changes.push({ path: `${path}.${k}`, from: v, to: "/contact" });
        out[k] = "/contact";
      } else {
        out[k] = walk(v, `${path}.${k}`, changes);
      }
    }
    return out;
  }
  return node;
}

async function main() {
  console.log(`${dryRun ? "[dry run] " : ""}"/#contact" → "/contact" in ${projectId}/${dataset}`);
  const docs: Record<string, unknown>[] = await client.fetch(
    `*[!(_type match "sanity.*") && !(_type match "system.*")]`,
  );
  let touched = 0;
  for (const doc of docs) {
    if (SKIP_IDS.has(String(doc._id))) continue;
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
    console.log(`${doc._id} (${doc._type}): ${changes.map((c) => c.path).join(", ")}`);
    if (!dryRun)
      await client.patch(String(doc._id)).ifRevisionId(String(doc._rev)).set(set).commit();
  }
  console.log(`${dryRun ? "Would update" : "Updated"} ${touched} document(s).`);

  const exists = await client.fetch(`defined(*[_id == "contactPage"][0]._id)`);
  if (!exists) {
    console.log(
      `${dryRun ? "Would create" : "Creating"} contactPage (SEO; contact copy = Home's).`,
    );
    if (!dryRun) {
      await client.create({
        _id: "contactPage",
        _type: "contactPage",
        // NOT IN DESIGN (the design has no SEO fields).
        seo: {
          _type: "seoMeta",
          title: "Contact Us",
          description:
            "Contact Xconcile about outsourced accounting, bookkeeping, tax, payroll and audit support for U.S. businesses and CPA firms. We reply within one business day.",
          keywords: [
            "contact xconcile",
            "outsourced accounting contact",
            "accounting services inquiry",
          ],
        },
      });
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
