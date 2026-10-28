/**
 * Applies the client's URL changes of 2026-10-28 to Sanity (the Studio slug wins over the code
 * default, so the documents must carry the new slugs):
 *
 * 1. Sets each renamed page's `slug` (document IDs never change) and adds the old slug to its
 *    `oldSlugs`, so the old URL 301s to the new one (sanity/lib/page-urls.ts).
 * 2. Rewrites every stored link to an old URL (menus, footer, cards, blog/article bodies…) to the
 *    new one, keeping any ?query/#hash. Only link-like keys are touched, never body text. The
 *    site also resolves old links at render time; this keeps what editors see in Studio current.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/rename-page-slugs-sanity.ts [--dry-run]
 *
 * Future URL changes need no script: edit the page's "URL slug" in Studio and publish.
 * Safe to re-run: documents with nothing to change are skipped. Uses `ifRevisionId`, so an edit
 * made in Studio in the meantime is never overwritten (the script fails for that document).
 */
import { client, dataset, projectId } from "./lib/seed-helpers";

const dryRun = process.argv.includes("--dry-run");

/** [document _id, old slug, new slug, URL prefix]. */
const RENAMES: [string, string, string, "/" | "/industries/"][] = [
  [
    "industryPage-tech-ecommerce",
    "tech-ecommerce",
    "ecommerce-accounting-services",
    "/industries/",
  ],
  [
    "industryPage-professional-services",
    "professional-services",
    "accounting-outsourcing-professional-services",
    "/industries/",
  ],
  [
    "industryPage-hospitality-retail",
    "hospitality-retail",
    "hospitality-accounting-services",
    "/industries/",
  ],
  [
    "industryPage-medical-health",
    "medical-health",
    "healthcare-accounting-services",
    "/industries/",
  ],
  [
    "industryPage-real-estate-construction",
    "real-estate-construction",
    "real-estate-accounting-services",
    "/industries/",
  ],
  [
    "hirePage-hire-virtual-cfo-and-fp-and-a",
    "hire-virtual-cfo-and-fp-and-a",
    "hire-virtual-cfo",
    "/",
  ],
  // The client's list says hire-tax-preparation-staff, which is another page's URL; the Figma
  // page name for this page is hire-payroll-staff.
  [
    "hirePage-hire-payroll-and-compliance",
    "hire-payroll-and-compliance",
    "hire-payroll-staff",
    "/",
  ],
  [
    "hirePage-hire-audit-and-assurance",
    "hire-audit-and-assurance",
    "hire-audit-assurance-staff",
    "/",
  ],
  [
    "servicePage-revenue-cycle-management",
    "revenue-cycle-management",
    "revenue-cycle-management-services",
    "/",
  ],
  [
    "servicePage-outsourced-virtual-cfo-and-fp-and-a",
    "outsourced-virtual-cfo-and-fp-and-a",
    "virtual-cfo-services",
    "/",
  ],
  [
    "servicePage-outsourced-payroll-and-compliance-services",
    "outsourced-payroll-and-compliance-services",
    "outsourced-payroll-compliance-services",
    "/",
  ],
  [
    "servicePage-multi-state-sales-and-use-tax-compliance",
    "multi-state-sales-and-use-tax-compliance",
    "multi-state-sales-tax-compliance",
    "/",
  ],
];

const PATHS = new Map(
  RENAMES.map(([, from, to, prefix]) => [`${prefix}${from}`, `${prefix}${to}`]),
);
const LINK_KEYS = new Set(["href", "url", "link"]);
const OWN_LINK = /^(https?:\/\/[^/]*xconcile[^/]*)?(\/[^?#]*?)\/?([?#].*)?$/;

function fixHref(value: string): string {
  const m = OWN_LINK.exec(value.trim());
  const to = m && PATHS.get(m[2]);
  return to ? `${m[1] ?? ""}${to}${m[3] ?? ""}` : value;
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

type PageDoc = { _id: string; _rev: string; slug?: string; oldSlugs?: string[] };

async function main() {
  console.log(`${dryRun ? "[dry run] " : ""}Renaming page URLs in ${projectId}/${dataset}`);

  // 1. Slugs (published + drafts).
  let renamed = 0;
  for (const [id, from, to, prefix] of RENAMES) {
    const docs: PageDoc[] = await client.fetch(
      `*[_id in [$id, "drafts." + $id]]{ _id, _rev, "slug": slug.current, oldSlugs }`,
      { id },
    );
    if (!docs.length) console.log(`\n${id}: not found (seed it first)`);
    for (const d of docs) {
      const oldSlugs = [...new Set([...(d.oldSlugs ?? []), from])].filter((s) => s !== to);
      const sameOld = JSON.stringify(oldSlugs) === JSON.stringify(d.oldSlugs ?? []);
      if (d.slug === to && sameOld) continue;
      if (d.slug !== from && d.slug !== to) {
        console.log(`\n${d._id}: slug is "${d.slug}" (changed in Studio?), skipped`);
        continue;
      }
      renamed++;
      console.log(
        `\n${d._id}: ${prefix}${d.slug} → ${prefix}${to} (old URLs: ${oldSlugs.join(", ")})`,
      );
      if (!dryRun)
        await client
          .patch(d._id)
          .ifRevisionId(d._rev)
          .set({ slug: { _type: "slug", current: to }, oldSlugs })
          .commit();
    }
  }

  // 2. Links to the old URLs anywhere in the dataset.
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
    `\n${dryRun ? "Would update" : "Updated"} ${renamed} slug(s) and links in ${touched} document(s).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
