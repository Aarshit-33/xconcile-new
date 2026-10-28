/**
 * Sets item icons to the ones drawn in the page designs (page-updated/newShit/old-pages, audit of
 * 2026-10-27). Input: a plan JSON [{ path, sec, label, from, to }] where `label` is the item's
 * visible text (title first). Updates BOTH:
 *  - the Sanity page document (published + draft), matching the object whose title/label starts
 *    the item text and whose icon is `from`;
 *  - the code fallback in content/ (same title, nearest `icon: "<from>"`).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/apply-design-icons-sanity.ts <plan.json> [--dry-run]
 *
 * Safe to re-run (items already on the target icon are skipped). Uses `ifRevisionId`.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { client, dataset, projectId } from "./lib/seed-helpers";

type Step = { path: string; sec: string; label: string; from: string; to: string };
const [planFile] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const dryRun = process.argv.includes("--dry-run");
const plan: Step[] = JSON.parse(readFileSync(planFile, "utf8"));
const root = join(__dirname, "..");

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/^\d+\s*/, "")
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();
const TITLE_KEYS = ["title", "label", "name", "heading"];

async function docFor(
  path: string,
): Promise<{ _id: string; _rev: string; [k: string]: unknown }[]> {
  const q = (filter: string, params: Record<string, string> = {}) =>
    client.fetch(`*[${filter}]`, params) as Promise<{ _id: string; _rev: string }[]>;
  if (path === "/") return q(`_id in ["home", "drafts.home"]`);
  if (path === "/about") return q(`_id in ["aboutPage", "drafts.aboutPage"]`);
  if (path === "/industries") return q(`_id in ["industriesPage", "drafts.industriesPage"]`);
  let m = path.match(/^\/industries\/(.+)$/);
  if (m) return q(`_type == "industryPage" && slug.current == $s`, { s: m[1] });
  m = path.match(/^\/case-studies\/(.+)$/);
  if (m) return q(`_type == "caseStudy" && slug.current == $s`, { s: m[1] });
  return q(`_type in ["servicePage", "hirePage"] && slug.current == $s`, { s: path.slice(1) });
}

function contentFile(path: string): string | null {
  const industryFiles: Record<string, string> = {
    "it-technology-accounting-services": "it-technology",
  };
  let rel: string;
  if (path === "/") rel = "content/home.ts";
  else if (path === "/about") rel = "content/about.ts";
  else if (path === "/industries") rel = "content/industries/gallery.ts";
  else if (path.startsWith("/industries/")) {
    const s = path.slice("/industries/".length);
    rel = `content/industries/${industryFiles[s] ?? s}.ts`;
  } else if (path.startsWith("/case-studies/")) rel = "content/case-studies.ts";
  else if (existsSync(join(root, `content/services${path}.ts`))) rel = `content/services${path}.ts`;
  else rel = `content/hire${path}.ts`;
  const f = join(root, rel);
  return existsSync(f) ? f : null;
}

type Hit = { setPath: string; titles: string[]; icon: string; top: string };
/** Objects with a string `icon` and a title-like field, with a Sanity patch path to their icon. */
function collect(node: unknown, path: string, top: string, out: Hit[]) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => {
      const key =
        v && typeof v === "object" && "_key" in v
          ? `[_key=="${(v as { _key: string })._key}"]`
          : `[${i}]`;
      collect(v, `${path}${key}`, top, out);
    });
    return;
  }
  if (!node || typeof node !== "object") return;
  const o = node as Record<string, unknown>;
  if (typeof o.icon === "string") {
    const titles = TITLE_KEYS.map((k) => o[k]).filter(
      (v): v is string => typeof v === "string" && v.trim().length >= 3,
    );
    // Case-study facts show "label title" (e.g. "Service Outsourced Audit Support").
    if (typeof o.label === "string" && typeof o.title === "string")
      titles.push(`${o.label} ${o.title}`);
    if (titles.length)
      out.push({ setPath: `${path}.icon`.replace(/^\./, ""), titles, icon: o.icon, top });
  }
  for (const [k, v] of Object.entries(o))
    if (!k.startsWith("_")) collect(v, `${path}.${k}`, top || k, out);
}

async function main() {
  console.log(
    `${dryRun ? "[dry run] " : ""}Design icons → ${projectId}/${dataset} + content/ (${plan.length} items)`,
  );
  const byPath = new Map<string, Step[]>();
  for (const s of plan) byPath.set(s.path, [...(byPath.get(s.path) ?? []), s]);

  let sanityCount = 0;
  let codeCount = 0;
  const misses: string[] = [];
  for (const [path, steps] of byPath) {
    // --- Sanity
    const docs = await docFor(path);
    for (const doc of docs) {
      const hits: Hit[] = [];
      for (const [k, v] of Object.entries(doc)) if (!k.startsWith("_")) collect(v, k, k, hits);
      const set: Record<string, string> = {};
      for (const s of steps) {
        const cands = hits.filter((h) => h.titles.some((t) => norm(s.label).startsWith(norm(t))));
        const pick =
          cands.find(
            (h) => h.icon === s.from && h.top.toLowerCase().includes(s.sec.split("-")[0]),
          ) ??
          cands.find((h) => h.icon === s.from) ??
          (cands.length === 1 ? cands[0] : undefined);
        if (!pick) {
          if (!cands.some((h) => h.icon === s.to))
            misses.push(`${doc._id}: "${s.label.slice(0, 50)}" (${s.from}→${s.to})`);
          continue;
        }
        if (pick.icon !== s.to) set[pick.setPath] = s.to;
      }
      if (Object.keys(set).length) {
        sanityCount += Object.keys(set).length;
        console.log(`${doc._id}: ${Object.keys(set).length} icon(s)`);
        if (!dryRun) await client.patch(doc._id).ifRevisionId(doc._rev).set(set).commit();
      }
    }

    // --- Code fallback
    const file = contentFile(path);
    if (!file) continue;
    let src = readFileSync(file, "utf8");
    let changed = 0;
    for (const s of steps) {
      // Longest title-like string literal in the file that starts the item text.
      const lits = [...src.matchAll(/(?:title|label|name):\s*"((?:[^"\\]|\\.)+)"/g)]
        .filter((m) => norm(s.label).startsWith(norm(m[1])) && m[1].length >= 3)
        .sort((a, b) => b[1].length - a[1].length);
      let done = false;
      for (const m of lits) {
        const at = m.index!;
        const win = 700;
        const re = new RegExp(`icon:\\s*"${s.from}"`, "g");
        let best: { i: number; d: number } | null = null;
        for (const im of src.slice(Math.max(0, at - win), at + win).matchAll(re)) {
          const i = Math.max(0, at - win) + im.index!;
          const between = src.slice(Math.min(i, at), Math.max(i, at));
          // Same object: no other item title between the icon and this title.
          if (/(?:title|label|name):\s*"/.test(between.replace(m[0], ""))) continue;
          const d = Math.abs(i - at);
          if (!best || d < best.d) best = { i, d };
        }
        if (best) {
          src =
            src.slice(0, best.i) +
            src.slice(best.i).replace(new RegExp(`icon:\\s*"${s.from}"`), `icon: "${s.to}"`);
          changed++;
          done = true;
          break;
        }
      }
      if (!done && !new RegExp(`icon:\\s*"${s.to}"`).test(src))
        misses.push(
          `${file.replace(root + "/", "")}: "${s.label.slice(0, 50)}" (${s.from}→${s.to})`,
        );
    }
    if (changed) {
      codeCount += changed;
      console.log(`${file.replace(root + "/", "")}: ${changed} icon(s)`);
      if (!dryRun) writeFileSync(file, src);
    }
  }
  console.log(
    `\n${dryRun ? "Would set" : "Set"} ${sanityCount} Sanity icon(s) and ${codeCount} code icon(s).`,
  );
  if (misses.length) console.log(`Not matched (${misses.length}):\n  ${misses.join("\n  ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
