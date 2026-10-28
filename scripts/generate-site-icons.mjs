#!/usr/bin/env node
/**
 * Generates components/icons/site-icons.generated.ts: the icons editors can pick in Sanity
 * (every "Icon" field) and the website renders by name (components/icons/registry.tsx).
 *
 * Source: Material Symbols, Outlined, weight 400 (`@material-symbols/svg-400`, Apache License 2.0,
 * https://github.com/google/material-design-icons). Only the path data of the names below is
 * copied, so the site has no runtime dependency and pages only carry the icons they render.
 *
 * Add an icon: put its Material Symbols name (https://fonts.google.com/icons, e.g. "savings")
 * in a category below, then run `node scripts/generate-site-icons.mjs`. Never remove a name
 * that content already uses: Sanity stores the name, and an unknown name renders nothing.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PKG = "@material-symbols/svg-400";
const VERSION = "0.47.6";

/** Picker categories (Studio filter chips), in display order. A name is listed once. */
const CATEGORIES = {
  finance: {
    title: "Finance & money",
    icons: [
      "paid",
      "payments",
      "attach_money",
      "money",
      "account_balance",
      "account_balance_wallet",
      "wallet",
      "savings",
      "credit_card",
      "credit_score",
      "currency_exchange",
      "currency_rupee",
      "euro",
      "currency_pound",
      "universal_currency_alt",
      "money_range",
      "price_check",
      "price_change",
      "request_quote",
      "point_of_sale",
      "receipt",
      "sell",
      "toll",
      "shopping_cart",
      "local_atm",
      "finance_chip",
      "mintmark",
    ],
  },
  accounting: {
    title: "Accounting & tax",
    icons: [
      "calculate",
      "receipt_long",
      "request_page",
      "percent",
      "functions",
      "summarize",
      "table_chart",
      "table",
      "ballot",
      "inventory",
      "fact_check",
      "rule",
      "checklist",
      "assignment",
      "assignment_turned_in",
      "book_4",
      "dictionary",
      "menu_book",
      "library_books",
      "import_contacts",
      "account_tree",
      "balance",
      "gavel",
      "assured_workload",
      "approval",
      "contract",
      "contract_edit",
      "order_approve",
      "bucket_check",
      "data_check",
      "task",
    ],
  },
  growth: {
    title: "Charts & growth",
    icons: [
      "analytics",
      "add_chart",
      "bar_chart",
      "insert_chart",
      "leaderboard",
      "monitoring",
      "query_stats",
      "show_chart",
      "stacked_line_chart",
      "stacked_bar_chart",
      "area_chart",
      "pie_chart",
      "donut_large",
      "candlestick_chart",
      "trending_up",
      "trending_down",
      "trending_flat",
      "timeline",
      "data_usage",
      "search_insights",
      "finance_mode",
      "moving",
      "rocket_launch",
      "target",
      "track_changes",
      "speed",
      "9k_plus",
    ],
  },
  people: {
    title: "People & teams",
    icons: [
      "group",
      "groups",
      "groups_2",
      "groups_3",
      "group_add",
      "group_search",
      "person",
      "person_add",
      "person_check",
      "person_search",
      "how_to_reg",
      "account_circle",
      "badge",
      "supervisor_account",
      "manage_accounts",
      "support_agent",
      "diversity_3",
      "handshake",
      "partner_exchange",
      "contact_phone",
      "contacts",
      "engineering",
      "work",
      "business_center",
      "emoji_people",
      "deployed_code_account",
      "frame_person",
      "person_apron",
    ],
  },
  security: {
    title: "Security & compliance",
    icons: [
      "lock",
      "lock_open",
      "shield",
      "shield_lock",
      "shield_person_badge",
      "verified_user",
      "verified",
      "security",
      "admin_panel_settings",
      "encrypted",
      "key",
      "vpn_key",
      "fingerprint",
      "password",
      "policy",
      "privacy_tip",
      "health_and_safety",
      "safety_check",
      "local_police",
      "visibility",
      "visibility_off",
      "nest_cam_iq_outdoor",
      "door_open",
      "remove_moderator",
    ],
  },
  documents: {
    title: "Documents & data",
    icons: [
      "article",
      "description",
      "draft",
      "text_snippet",
      "page_info",
      "picture_as_pdf",
      "upload_file",
      "file_present",
      "file_copy",
      "note_stack",
      "folder",
      "folder_open",
      "folder_shared",
      "attach_file",
      "find_in_page",
      "plagiarism",
      "quick_reference_all",
      "archive",
      "inventory_2",
      "database",
      "storage",
      "dns",
      "backup",
      "cloud",
      "cloud_upload",
      "cloud_done",
      "cloud_sync",
    ],
  },
  time: {
    title: "Time & process",
    icons: [
      "schedule",
      "alarm",
      "history",
      "history_2",
      "update",
      "more_time",
      "timer",
      "hourglass_empty",
      "timelapse",
      "event",
      "event_available",
      "calendar_month",
      "calendar_today",
      "date_range",
      "pending_actions",
      "autorenew",
      "sync",
      "sync_alt",
      "cached",
      "repeat",
      "published_with_changes",
      "start",
      "task_alt",
      "done_all",
      "check_circle",
      "low_priority",
      "event_repeat",
    ],
  },
  tech: {
    title: "Tech & tools",
    icons: [
      "settings",
      "tune",
      "build",
      "construction",
      "integration_instructions",
      "api",
      "code",
      "terminal",
      "devices",
      "desktop_windows",
      "laptop_windows",
      "computer",
      "dvr",
      "mobile",
      "hub",
      "lan",
      "memory",
      "smart_toy",
      "neurology",
      "psychology",
      "wand_stars",
      "bolt",
      "electric_bolt",
      "deployed_code",
      "extension",
      "widgets",
      "dashboard",
      "space_dashboard",
      "manufacturing",
      "search",
      "search_check_2",
      "manage_search",
      "filter_alt",
      "contextual_token_add",
      "cleaning_services",
    ],
  },
  communication: {
    title: "Communication & help",
    icons: [
      "mail",
      "contact_mail",
      "call",
      "chat",
      "forum",
      "sms",
      "support",
      "headset_mic",
      "video_call",
      "campaign",
      "notifications",
      "send",
      "help",
      "live_help",
      "info",
      "lightbulb",
      "lightbulb_2",
      "thumb_up",
    ],
  },
  business: {
    title: "Business & industries",
    icons: [
      "home",
      "house",
      "home_work",
      "real_estate_agent",
      "apartment",
      "domain",
      "business_chip",
      "corporate_fare",
      "factory",
      "warehouse",
      "store",
      "storefront",
      "shopping_bag",
      "local_shipping",
      "flight",
      "directions_car",
      "restaurant",
      "hotel",
      "medical_services",
      "clinical_notes",
      "local_hospital",
      "stethoscope",
      "school",
      "agriculture",
      "eco",
      "public",
      "language",
      "travel_explore",
      "location_on",
      "map",
    ],
  },
  quality: {
    title: "Quality & rewards",
    icons: [
      "rewarded_ads",
      "workspace_premium",
      "military_tech",
      "trophy",
      "award_star",
      "star",
      "star_rate",
      "stars",
      "diamond",
      "recommend",
      "emoji_objects",
      "sentiment_satisfied",
      "favorite",
    ],
  },
  /**
   * Icons drawn in the page designs (page-updated/newShit/old-pages, audited 2026-10-27) that
   * none of the categories above had. The design icons already listed above stay where they are.
   */
  designs: {
    title: "From the page designs",
    icons: [
      "add_shopping_cart",
      "assignment_add",
      "assignment_late",
      "bar_chart_4_bars",
      "bath_bedrock",
      "beenhere",
      "book_5",
      "brightness_5",
      "browser_updated",
      "calendar_lock",
      "card_travel",
      "checkbook",
      "clarify",
      "clean_hands",
      "clear_all",
      "cognition",
      "compare_arrows",
      "dentistry",
      "dermatology",
      "developer_mode_tv",
      "dine_lamp",
      "edit_note",
      "enterprise",
      "flag",
      "hand_package",
      "help_clinic",
      "hourglass_top",
      "local_convenience_store",
      "meeting_room",
      "monitor_heart",
      "mop",
      "package_2",
      "percent_discount",
      "pill",
      "radar",
      "shield_person",
      "target_check",
    ],
  },
};

/** Not in Material Symbols: traced from the Hire design ("Restricted Client Access"). */
const CUSTOM = {
  shield_person_badge:
    "M722.4-297.6C734-309.2 740-323.2 740-340C740-356.8 734-370.8 722.4-382.4C710.8-394 696.8-400 680-400C663.2-400 649.2-394 637.6-382.4C626-370.8 620-356.8 620-340C620-323.2 626-309.2 637.6-297.6C649.2-286 663.2-280 680-280C696.8-280 710.8-286 722.4-297.6ZM680-160C700.8-160 719.6-164.8 737.2-174.4C754.4-184 768.4-196.8 779.2-212.8C764.4-221.6 748.8-228.4 732-232.8C715.2-237.6 698-240 680-240C662-240 644.8-237.6 628-232.8C611.2-228.4 595.6-221.6 581.2-212.8C591.6-196.8 605.6-184 622.8-174.4C640.4-164.8 659.2-160 680-160ZM480-80C387.3-103.2 310.8-156.4 250.5-239.6C190.2-322.4 160-414.8 160-516V-760L480-880L800-760V-532.8C787.2-538.4 774.4-543.2 761.2-547.6C747.6-552 734-555.2 720-557.2V-704L480-794L240-704V-516C240-484.8 244.2-453.2 252.5-422C260.8-390.8 272.5-360.8 287.5-332.4C302.5-304 320.7-278 342-254C363.3-230 387-210 413.2-194C420.4-172.8 430-152.4 442-132.8C454-113.6 467.6-96.4 482.8-80.8C482.4-80.8 482-80.8 481.6-80.4C481.2-80 480.8-80 480-80ZM680-80C624.8-80 577.6-99.6 538.4-138.4C499.6-177.6 480-224.8 480-280C480-335.2 499.6-382.4 538.4-421.6C577.6-460.4 624.8-480 680-480C735.2-480 782.4-460.4 821.6-421.6C860.4-382.4 880-335.2 880-280C880-224.8 860.4-177.6 821.6-138.4C782.4-99.6 735.2-80 680-80Z",
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "components/icons/site-icons.generated.ts");

/** Outlined SVG folder of the pinned package; downloaded once with `npm pack` into the OS temp dir. */
function sourceDir() {
  const base = join(tmpdir(), `material-symbols-svg-400-${VERSION}`);
  const dir = join(base, "package/outlined");
  if (existsSync(dir)) return dir;
  mkdirSync(base, { recursive: true });
  console.log(`Downloading ${PKG}@${VERSION}…`);
  const tgz = execFileSync("npm", ["pack", `${PKG}@${VERSION}`, "--silent"], {
    cwd: base,
    encoding: "utf8",
  }).trim();
  execFileSync("tar", ["-xzf", tgz], { cwd: base });
  return dir;
}

const dir = sourceDir();
const seen = new Set();
const paths = {};
const missing = [];

for (const [id, { icons }] of Object.entries(CATEGORIES)) {
  for (const name of icons) {
    if (seen.has(name)) throw new Error(`"${name}" is listed twice (second time in "${id}").`);
    seen.add(name);
    if (CUSTOM[name]) {
      paths[name] = CUSTOM[name];
      continue;
    }
    const file = join(dir, `${name}.svg`);
    if (!existsSync(file)) {
      missing.push(`${id}/${name}`);
      continue;
    }
    const svg = readFileSync(file, "utf8");
    if (
      !svg.includes('viewBox="0 -960 960 960"') ||
      /<(circle|rect|ellipse|polygon|line|g)\b/.test(svg)
    ) {
      throw new Error(`${name}.svg is not a single-path 960 grid icon.`);
    }
    paths[name] = [...svg.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]).join("");
  }
}

if (missing.length) {
  console.error(
    `Not in ${PKG}@${VERSION} outlined (fix the name or remove it):\n  ${missing.join("\n  ")}`,
  );
  process.exit(1);
}

const categories = Object.entries(CATEGORIES).map(([id, { title, icons }]) => ({
  id,
  title,
  icons,
}));
const body = `
// GENERATED by scripts/generate-site-icons.mjs from ${PKG}@${VERSION} (outlined, Apache License 2.0).
// Do not edit by hand: change the name lists in the script and re-run it.

/** Material Symbols name → SVG path (viewBox "0 -960 960 960"). ${Object.keys(paths).length} icons. */
export const siteIconPaths = ${JSON.stringify(paths, null, 2)} as const;

export type SiteIconName = keyof typeof siteIconPaths;

/** Studio picker categories, in display order. */
export const siteIconCategories: readonly { id: string; title: string; icons: readonly SiteIconName[] }[] = ${JSON.stringify(categories, null, 2)};
`;

writeFileSync(out, body);
try {
  execFileSync("npx", ["prettier", "--write", out], { cwd: root, stdio: "ignore" });
} catch {
  console.warn("prettier failed; the file is still valid, just unformatted.");
}
console.log(
  `Wrote ${Object.keys(paths).length} icons in ${categories.length} categories → ${out.replace(root + "/", "")}`,
);
