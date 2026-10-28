/**
 * Seeds the case studies (user request 2026-10-27): the Case Studies Gallery singleton, 5 SAMPLE
 * case studies, the Resources menu link, and the "View Case Study" buttons on Home and the
 * service pages (Studio → … → Case Studies tab → Case study page).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-case-studies-sanity.ts
 *
 * The old site had no case studies, so these are SAMPLE records: anonymous clients and
 * placeholder figures, each flagged “Sample content” in Studio. Replace them before launch.
 * Re-running overwrites the 5 sample documents (ids `caseStudy-sample-*`); the gallery page,
 * menu link and tab buttons are only filled in when still empty, so Studio edits are kept.
 */
import { createReadStream } from "node:fs";
import path from "node:path";

import { caseStudiesGallery as g } from "@/content/case-studies";
import { routes } from "@/lib/routes";

import { client, dataset, imageRef, key, projectId } from "./lib/seed-helpers";

/* ------------------------------------------------------------ helpers */

async function uploadLocal(file: string) {
  const full = path.join(process.cwd(), "scripts/assets/case-studies", file);
  const asset = await client.assets.upload("image", createReadStream(full), { filename: file });
  console.log(`  ↑ ${file}`);
  return { asset: { _type: "reference", _ref: asset._id } };
}

type Part = string | { text: string; href: string } | { bold: string };

/** Paragraph (or heading) with optional links / bold runs. */
function block(parts: Part[] | string, style: "normal" | "h2" | "h3" = "normal") {
  const list = typeof parts === "string" ? [parts] : parts;
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children = list.map((p) => {
    if (typeof p === "string")
      return { _type: "span", _key: key("s"), text: p, marks: [] as string[] };
    if ("bold" in p) return { _type: "span", _key: key("s"), text: p.bold, marks: ["strong"] };
    const k = key("l");
    markDefs.push({ _key: k, _type: "link", href: p.href });
    return { _type: "span", _key: key("s"), text: p.text, marks: [k] };
  });
  return { _type: "block", _key: key("b"), style, markDefs, children };
}
const h2 = (text: string) => block(text, "h2");
const highlights = (style: "dots" | "checks", items: [string, string][]) => ({
  _type: "caseStudyHighlights",
  _key: key("hl"),
  style,
  items: items.map(([title, text]) => ({ _type: "highlightItem", _key: key("hi"), title, text })),
});
const stats = (items: [string, string][]) => ({
  _type: "caseStudyStats",
  _key: key("st"),
  items: items.map(([value, label]) => ({ _type: "statItem", _key: key("si"), value, label })),
});
const fact = (icon: string, label: string, title: string, text: string) => ({
  _type: "caseStudyFact",
  _key: key("f"),
  icon,
  label,
  title,
  text,
});

/* ------------------------------------------------------------ samples */

type Sample = {
  id: string;
  slug: string;
  title: string;
  cardTitle: string;
  industry: string;
  publishedAt: string;
  excerpt: string;
  image: () => Promise<{ asset: { _type: string; _ref: string } }>;
  alt: string;
  facts: ReturnType<typeof fact>[];
  body: unknown[];
  ctaBand?: { title: string; body: string; label: string; href: string };
};

const audit = routes.service("audit-outsourcing-services");
const bookkeeping = routes.service("outsourced-accounting-and-bookkeeping");
const salesTax = routes.service("multi-state-sales-and-use-tax-compliance");
const payroll = routes.service("outsourced-payroll-and-compliance-services");

const samples: Sample[] = [
  {
    // The design's case study, copy as drawn (two repeated lines rewritten).
    id: "caseStudy-sample-cpa-audit-support",
    slug: "outsourced-audit-support-cpa-firm",
    title: "How Outsourced Audit Support Helped a CPA Firm Manage More Client Accounts",
    cardTitle: "Audit Support Helped a CPA Firm",
    industry: "CPA Firm",
    publishedAt: "2026-10-20",
    excerpt:
      "A U.S.-based CPA firm used Xconcile's outsourced audit support to handle more audit engagements without hiring more full-time staff.",
    image: () => uploadLocal("cpa-audit-team-meeting.jpg"),
    alt: "Audit team reviewing documents together in a meeting room",
    facts: [
      fact(
        "home_work",
        "Client",
        "U.S.-Based CPA Firm",
        "A public accounting firm managing multiple audit engagements.",
      ),
      fact(
        "package_2",
        "Service",
        "Outsourced Audit Support",
        "Audit documentation, working papers, account testing support, and related tasks.",
      ),
      fact(
        "target_check",
        "Project Goal",
        "Increase Audit Capacity",
        "Handle more work while the internal team focuses on reviews and client communication.",
      ),
    ],
    body: [
      h2("Client Overview"),
      block(
        "A U.S.-based CPA firm was handling multiple audit engagements and needed extra support to manage its workload and complete assignments on schedule; the internal team had limited time for audit documentation, working papers, and other assigned procedures.",
      ),
      block([
        "Xconcile provided ",
        { text: "outsourced audit support", href: audit },
        " to help the firm manage its workload, organize audit documentation, and give its internal team more time for review and client responsibilities.",
      ]),
      h2("The Challenge"),
      block(
        "As the firm's audit workload increased, managing multiple assignments with the existing team became more difficult. The firm needed additional capacity without immediately hiring more full-time employees.",
      ),
      highlights("dots", [
        [
          "Increasing Audit Workload",
          "More assignments created additional pressure on the existing team.",
        ],
        [
          "Time-Consuming Documentation",
          "Working papers and supporting evidence took hours away from review work.",
        ],
        [
          "Tight Deadlines",
          "The team needed to complete assigned audit tasks while keeping engagements on schedule.",
        ],
        [
          "Limited Staff Capacity",
          "Existing professionals had to balance audit work, reviews, and client communication.",
        ],
        [
          "Hiring Constraints",
          "Recruiting and training additional employees was not always suitable for changing workloads.",
        ],
      ]),
      h2("The Solution"),
      block([
        "Xconcile provided ",
        { text: "outsourced audit support", href: audit },
        " based on the firm's workload, existing processes, and deadlines. The team helped with assigned audit procedures, documentation, and working paper preparation across ongoing engagements.",
      ]),
      highlights("checks", [
        [
          "Audit Working Papers",
          "Preparing and organizing working papers based on the firm's requirements.",
        ],
        [
          "Audit Testing Support",
          "Assisting with assigned testing procedures and documenting supporting evidence.",
        ],
        [
          "Financial Documentation",
          "Reviewing assigned financial records and organizing relevant schedules and documents.",
        ],
        [
          "Audit File Preparation",
          "Arranging documentation to support the firm's internal review process.",
        ],
        [
          "Review Follow-Ups",
          "Addressing reviewer comments and updating assigned work as required.",
        ],
      ]),
      h2("Results and Business Impact"),
      block(
        "Xconcile handled selected audit tasks and working paper preparation for the firm. This allowed its in-house team to spend more time reviewing audit work, communicating with clients, and managing other engagements.",
      ),
      stats([
        ["30%", "Faster Audit Turnaround"],
        ["25+", "Audit Assignments Supported"],
        ["200+", "Staff Hours Saved"],
        ["40%", "Increase in Work Capacity"],
      ]),
    ],
    // The design's CTA band (audit wording).
    ctaBand: {
      title: "Need Additional Support for Your Audit Workload?",
      body: "Explore Xconcile's audit outsourcing services to help your firm manage additional assignments and balance workloads.",
      label: "Explore Audit Outsourcing Services",
      href: audit,
    },
  },
  {
    id: "caseStudy-sample-cpa-bookkeeping-backlog",
    slug: "cpa-firm-bookkeeping-backlog-before-tax-season",
    title: "How a CPA Firm Cleared Its Bookkeeping Backlog Before Tax Season",
    cardTitle: "CPA Firm Bookkeeping Success",
    industry: "CPA Firm",
    publishedAt: "2026-10-12",
    excerpt:
      "A growing CPA firm used Xconcile's bookkeeping team to bring client books up to date before tax season and keep monthly work on schedule.",
    image: () => uploadLocal("tax-documents-calculator.jpg"),
    alt: "Tax forms, a calculator and a phone on a desk",
    facts: [
      fact(
        "home_work",
        "Client",
        "Growing U.S. CPA Firm",
        "A firm serving small businesses with monthly bookkeeping and annual tax returns.",
      ),
      fact(
        "package_2",
        "Service",
        "Outsourced Bookkeeping",
        "Catch-up bookkeeping, bank and card reconciliations, and month-end close support.",
      ),
      fact(
        "target_check",
        "Project Goal",
        "Tax-Ready Client Books",
        "Bring every client's books up to date before the tax season deadline.",
      ),
    ],
    body: [
      h2("Client Overview"),
      block(
        "A growing U.S. CPA firm provided monthly bookkeeping and tax preparation for small business clients. As the client base grew, several clients' books fell months behind, and the firm's accountants were spending tax season catching up instead of preparing returns.",
      ),
      h2("The Challenge"),
      block(
        "The firm needed the backlog cleared quickly, without pulling senior staff off advisory and tax work.",
      ),
      highlights("dots", [
        [
          "Months of Unreconciled Accounts",
          "Bank and credit card accounts for several clients had not been reconciled.",
        ],
        [
          "Inconsistent Client Records",
          "Each client used a different chart of accounts and document process.",
        ],
        ["Approaching Deadlines", "Books had to be closed before returns could be prepared."],
        [
          "Stretched Senior Staff",
          "Experienced accountants were doing data entry instead of reviews.",
        ],
      ]),
      h2("The Solution"),
      block([
        "Xconcile set up a dedicated ",
        { text: "outsourced bookkeeping", href: bookkeeping },
        " team that worked in the firm's own accounting software, followed its checklists, and reported progress every week.",
      ]),
      highlights("checks", [
        [
          "Catch-Up Bookkeeping",
          "Recording missing transactions and clearing uncategorized items, client by client.",
        ],
        ["Reconciliations", "Reconciling bank, credit card, and loan accounts to statements."],
        ["Standard Close Checklist", "One month-end checklist applied across every client file."],
        [
          "Review-Ready Files",
          "Open questions listed for the firm's reviewers instead of left in the books.",
        ],
      ]),
      h2("Results and Business Impact"),
      block(
        "The backlog was cleared before tax season, and the same team now handles the firm's monthly bookkeeping, so its accountants can focus on returns, reviews, and client advice.",
      ),
      stats([
        ["35+", "Client Files Brought Up to Date"],
        ["6 wks", "Backlog Cleared Before Tax Season"],
        ["50%", "Less Partner Time on Bookkeeping"],
      ]),
    ],
  },
  {
    id: "caseStudy-sample-real-estate-month-end",
    slug: "real-estate-company-faster-month-end-close",
    title: "How a Multi-Property Real Estate Company Sped Up Its Month-End Close",
    cardTitle: "Faster Month-End Close for Real Estate",
    industry: "Real Estate",
    publishedAt: "2026-10-05",
    excerpt:
      "A real estate company managing several properties used Xconcile's accounting team to close each month faster with property-level reporting.",
    image: async () => imageRef("/images/industries/real-estate-intro.jpg"),
    alt: "Accountant working on a laptop with model houses in the background",
    facts: [
      fact(
        "home",
        "Client",
        "U.S. Real Estate Company",
        "A company owning and managing multiple residential and commercial properties.",
      ),
      fact(
        "package_2",
        "Service",
        "Accounting & Bookkeeping",
        "Property-level bookkeeping, reconciliations, and monthly financial reporting.",
      ),
      fact(
        "target_check",
        "Project Goal",
        "Faster, Clearer Reporting",
        "Close each month sooner with reports owners can compare property by property.",
      ),
    ],
    body: [
      h2("Client Overview"),
      block(
        "A U.S. real estate company managed residential and commercial properties, each with its own rent roll, expenses, and bank accounts. Month-end close took most of the following month, and owners waited weeks for property reports.",
      ),
      h2("The Challenge"),
      highlights("dots", [
        [
          "Many Entities and Accounts",
          "Each property had separate bank accounts and books to reconcile.",
        ],
        [
          "Manual Rent Reconciliation",
          "Rent collections were matched to tenants by hand every month.",
        ],
        ["Late Owner Reports", "Property-level reports arrived too late to support decisions."],
      ]),
      h2("The Solution"),
      block([
        "Xconcile took over day-to-day ",
        { text: "accounting and bookkeeping", href: bookkeeping },
        " for every property, working in the company's property management and accounting systems.",
      ]),
      highlights("checks", [
        ["Property-Level Bookkeeping", "Recording income and expenses by property and unit."],
        [
          "Rent and Bank Reconciliations",
          "Matching collections to the rent roll and reconciling every account.",
        ],
        [
          "Monthly Close Calendar",
          "Fixed dates for each close task, shared with the company's team.",
        ],
        [
          "Owner Reporting Pack",
          "A consistent monthly report for each property and a portfolio summary.",
        ],
      ]),
      h2("Results and Business Impact"),
      block(
        "The company now closes its books in the first part of each month and shares property reports with owners on a fixed schedule.",
      ),
      stats([
        ["12", "Properties Supported"],
        ["10 days", "Faster Month-End Close"],
        ["100%", "Accounts Reconciled Monthly"],
      ]),
    ],
  },
  {
    id: "caseStudy-sample-ecommerce-sales-tax",
    slug: "ecommerce-brand-multi-state-sales-tax-compliance",
    title: "How a Growing E-commerce Brand Stayed on Top of Multi-State Sales Tax",
    cardTitle: "Multi-State Sales Tax for E-commerce",
    industry: "E-commerce",
    publishedAt: "2026-09-28",
    excerpt:
      "An online retailer selling across the U.S. used Xconcile to track nexus, register in new states, and file sales tax returns on time.",
    image: async () => imageRef("/images/industries/ecommerce-intro.jpg"),
    alt: "Laptop, notebook and plant on an office desk",
    facts: [
      fact(
        "home_work",
        "Client",
        "U.S. E-commerce Brand",
        "An online retailer selling through its own store and online marketplaces.",
      ),
      fact(
        "package_2",
        "Service",
        "Multi-State Sales Tax Compliance",
        "Nexus tracking, state registrations, and recurring sales tax filings.",
      ),
      fact(
        "target_check",
        "Project Goal",
        "On-Time Filings in Every State",
        "Stay compliant as sales grow into new states.",
      ),
    ],
    body: [
      h2("Client Overview"),
      block(
        "A U.S. e-commerce brand sold through its own online store and two marketplaces. Fast growth meant it crossed economic nexus thresholds in new states, and nobody on the team owned sales tax.",
      ),
      h2("The Challenge"),
      highlights("dots", [
        ["Changing Nexus", "Sales passed state thresholds without anyone noticing."],
        [
          "Marketplace vs. Direct Sales",
          "Marketplace-collected tax had to be separated from the brand's own sales.",
        ],
        ["Different Filing Calendars", "Each state had its own due dates and filing frequency."],
      ]),
      h2("The Solution"),
      block([
        "Xconcile's ",
        { text: "multi-state sales and use tax compliance", href: salesTax },
        " team reviewed past sales by state, set up a monthly nexus check, and took over registrations and filings.",
      ]),
      highlights("checks", [
        ["Nexus Review", "Monthly review of sales by state against each state's thresholds."],
        ["State Registrations", "Registering in new states before collection was required."],
        ["Return Preparation", "Preparing and filing returns on each state's schedule."],
        ["Filing Calendar", "One shared calendar of every due date and payment."],
      ]),
      h2("Results and Business Impact"),
      block(
        "The brand now knows where it has to collect tax and files every return on time, so the team can focus on growing sales.",
      ),
      stats([
        ["18", "States Filed Monthly or Quarterly"],
        ["0", "Late Filings Since Onboarding"],
        ["15+", "Hours Saved Each Month"],
      ]),
    ],
  },
  {
    id: "caseStudy-sample-healthcare-payroll",
    slug: "healthcare-practice-outsourced-payroll",
    title: "How a Multi-Location Healthcare Practice Simplified Payroll",
    cardTitle: "Payroll Support for a Healthcare Practice",
    industry: "Healthcare",
    publishedAt: "2026-09-18",
    excerpt:
      "A healthcare practice with several clinics used Xconcile's payroll team to run accurate payroll across locations and stay on top of payroll tax filings.",
    image: async () => imageRef("/images/home/industry-healthcare.jpg"),
    alt: "Doctor with a stethoscope checking a phone",
    facts: [
      fact(
        "health_and_safety",
        "Client",
        "Multi-Location Healthcare Practice",
        "A practice with clinical and front-office staff across several clinics.",
      ),
      fact(
        "package_2",
        "Service",
        "Payroll & Compliance",
        "Payroll processing, timesheet review, and payroll tax filings.",
      ),
      fact(
        "target_check",
        "Project Goal",
        "Accurate, On-Time Payroll",
        "Pay every employee correctly while keeping payroll filings current.",
      ),
    ],
    body: [
      h2("Client Overview"),
      block(
        "A healthcare practice with several clinics paid hourly, salaried, and per-visit staff. Payroll was run by the office manager on top of daily operations, and corrections after payday were common.",
      ),
      h2("The Challenge"),
      highlights("dots", [
        ["Mixed Pay Types", "Hourly, salaried, and per-visit pay in one payroll."],
        ["Several Locations", "Timesheets and approvals came from each clinic separately."],
        ["Payroll Tax Filings", "Quarterly and annual filings had to stay accurate and on time."],
      ]),
      h2("The Solution"),
      block([
        "Xconcile's ",
        { text: "payroll and compliance", href: payroll },
        " team took over each pay run in the practice's payroll system, with a fixed review step before approval.",
      ]),
      highlights("checks", [
        ["Timesheet Review", "Checking hours and visits from each clinic before every pay run."],
        ["Payroll Processing", "Running payroll and sending a summary for approval."],
        ["Payroll Tax Filings", "Preparing quarterly and year-end payroll filings."],
        ["Employee Changes", "Updating new hires, rate changes, and terminations on time."],
      ]),
      h2("Results and Business Impact"),
      block(
        "Payroll now runs on a fixed schedule with fewer corrections, and the office manager has time back for patients and the clinics.",
      ),
      stats([
        ["4", "Clinics on One Payroll Process"],
        ["90%", "Fewer Payroll Corrections"],
        ["20+", "Hours Saved Each Month"],
      ]),
    ],
  },
];

/* ------------------------------------------------------------ run */

async function main() {
  console.log(`Seeding case studies → ${projectId}/${dataset}`);
  const handshake = await imageRef("/images/services/cta-handshake.jpg");

  // 1. Gallery singleton (only if missing, so Studio edits are kept).
  await client.createIfNotExists({
    _id: "caseStudiesPage",
    _type: "caseStudiesPage",
    hero: {
      _type: "heroSection",
      anchorId: "hero",
      badge: g.hero.badge,
      title: g.hero.title,
      subtitle: g.hero.subtitle,
      primaryCta: { _type: "ctaLink", ...g.hero.primaryCta },
      showSecondaryCta: false,
      checks: [],
    },
    list: {
      anchorId: "case-studies",
      badge: g.list.badge,
      title: g.list.title,
      subtitle: g.list.subtitle,
      perPage: g.list.perPage,
      loadMoreLabel: g.list.loadMoreLabel,
      allLabel: g.list.allLabel,
      cardLinkLabel: g.list.cardLinkLabel,
      emptyText: g.list.emptyText,
    },
    ctaBand: {
      _type: "ctaBandSection",
      anchorId: "get-started",
      title: g.ctaBand.title,
      body: g.ctaBand.body,
      showCta: true,
      cta: { _type: "ctaLink", ...g.ctaBand.cta },
      showSecondaryCta: false,
      image: handshake,
    },
    detail: { badge: g.detail.badge, related: { ...g.detail.related } },
    seo: {
      _type: "seoMeta",
      title: g.seo.title,
      description: g.seo.description,
      keywords: g.seo.keywords,
    },
  });
  console.log("  ✓ Case Studies Gallery");

  // 2. Sample case studies (overwritten on every run).
  for (const s of samples) {
    await client.createOrReplace({
      _id: s.id,
      _type: "caseStudy",
      sample: true,
      title: s.title,
      cardTitle: s.cardTitle,
      slug: { _type: "slug", current: s.slug },
      industry: s.industry,
      publishedAt: s.publishedAt,
      excerpt: s.excerpt,
      mainImage: { _type: "image", ...(await s.image()), alt: s.alt },
      facts: s.facts,
      body: s.body,
      ...(s.ctaBand
        ? {
            ctaBand: {
              _type: "ctaBandSection",
              anchorId: "get-started",
              title: s.ctaBand.title,
              body: s.ctaBand.body,
              showCta: true,
              cta: { _type: "ctaLink", label: s.ctaBand.label, href: s.ctaBand.href },
              showSecondaryCta: false,
              image: handshake,
            },
          }
        : {}),
    });
    console.log(`  ✓ ${s.slug}`);
  }

  // 3. "View Case Study" buttons: Home's CPA Firms / Real Estate tabs and each service page's
  //    tab, only where no case study is picked yet.
  const pick: Record<string, (label: string) => string | undefined> = {
    home: (l) =>
      /real estate/i.test(l)
        ? "caseStudy-sample-real-estate-month-end"
        : /cpa/i.test(l)
          ? "caseStudy-sample-cpa-audit-support"
          : undefined,
    "servicePage-audit-outsourcing-services": () => "caseStudy-sample-cpa-audit-support",
    "servicePage-multi-state-sales-and-use-tax-compliance": () =>
      "caseStudy-sample-ecommerce-sales-tax",
    "servicePage-outsourced-payroll-and-compliance-services": () =>
      "caseStudy-sample-healthcare-payroll",
  };
  const pages: { _id: string; tabs?: { _key: string; label?: string; caseStudy?: unknown }[] }[] =
    await client.fetch(
      `*[_id == "home" || _type == "servicePage"]{ _id, "tabs": caseStudies.items[]{ _key, label, caseStudy } }`,
    );
  for (const p of pages) {
    const set: Record<string, unknown> = {};
    for (const t of p.tabs ?? []) {
      if (t.caseStudy) continue;
      const ref = (pick[p._id] ?? (() => "caseStudy-sample-cpa-bookkeeping-backlog"))(
        t.label ?? "",
      );
      if (ref)
        set[`caseStudies.items[_key=="${t._key}"].caseStudy`] = { _type: "reference", _ref: ref };
    }
    if (Object.keys(set).length) {
      await client.patch(p._id).set(set).commit();
      console.log(`  ✓ ${p._id}: ${Object.keys(set).length} tab button(s) → case study`);
    }
  }

  // 4. Resources menu → Case Studies (if not there yet).
  const menu: { _key: string; items?: { href?: string }[] } | null = await client.fetch(
    `*[_id == "siteSettings"][0].header.menus[label == "Resources"][0]{ _key, items[]{ href } }`,
  );
  if (menu && !menu.items?.some((i) => i.href === routes.caseStudies())) {
    await client
      .patch("siteSettings")
      .insert("after", `header.menus[_key=="${menu._key}"].items[-1]`, [
        {
          _type: "navMenuLink",
          _key: key("navMenuLink"),
          label: "Case Studies",
          href: routes.caseStudies(),
          icon: "briefcase",
          description:
            "See how Xconcile helps CPA firms and U.S. businesses with real accounting challenges.",
        },
      ])
      .commit();
    console.log("  ✓ Resources menu → Case Studies");
  }

  console.log("Done. Studio → Case Studies (5 samples, marked SAMPLE) and Case Studies Gallery.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
