/**
 * Seeds 3 SAMPLE SEO articles (Studio → Articles, served at xconcile.com/<slug>; design
 * pages/article/page.svg), user request 2026-10-27. The first is the design's own article,
 * copy as drawn (repeated FAQ and duplicated table header fixed); the other two are placeholder
 * guides. Each is flagged “Sample content” in Studio. Author: Pranav Jani (seeded by
 * scripts/seed-blog-sanity.ts). Re-running overwrites the 3 documents (ids `seoArticle-sample-*`).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-seo-articles-sanity.ts
 */
import { createReadStream } from "node:fs";
import path from "node:path";

import { routes } from "@/lib/routes";

import { client, dataset, imageRef, key, projectId } from "./lib/seed-helpers";

const AUTHOR = { _type: "reference", _ref: "author-pranav-jani" };

/* ------------------------------------------------------------ helpers */

type Part = string | { text: string; href: string } | { bold: string };

function block(parts: Part[] | string, style = "normal", list?: "bullet" | "number") {
  const items = typeof parts === "string" ? [parts] : parts;
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children = items.map((p) => {
    if (typeof p === "string")
      return { _type: "span", _key: key("s"), text: p, marks: [] as string[] };
    if ("bold" in p) return { _type: "span", _key: key("s"), text: p.bold, marks: ["strong"] };
    const k = key("l");
    markDefs.push({ _key: k, _type: "link", href: p.href });
    return { _type: "span", _key: key("s"), text: p.text, marks: [k] };
  });
  return {
    _type: "block",
    _key: key("b"),
    style,
    markDefs,
    children,
    ...(list ? { listItem: list, level: 1 } : {}),
  };
}
const p = (parts: Part[] | string) => block(parts);
const h2 = (text: string) => block(text, "h2");
const h3 = (text: string) => block(text, "h3");
/** "**Lead:** text" list items. */
const list = (kind: "bullet" | "number", items: [string, Part[] | string][]) =>
  items.map(([lead, rest]) =>
    block(
      [{ bold: `${lead}:` }, " ", ...(typeof rest === "string" ? [rest] : rest)],
      "normal",
      kind,
    ),
  );
const table = (rows: string[][]) => ({
  _type: "articleTable",
  _key: key("t"),
  hasHeaderRow: true,
  rows: rows.map((cells) => ({ _type: "tableRow", _key: key("r"), cells })),
});
const faqs = (items: [string, string][]) =>
  items.map(([question, answer]) => ({ _type: "blogFaq", _key: key("q"), question, answer }));

async function uploadLocal(file: string) {
  const asset = await client.assets.upload(
    "image",
    createReadStream(path.join(process.cwd(), file)),
    { filename: path.basename(file) },
  );
  console.log(`  ↑ ${file}`);
  return { asset: { _type: "reference", _ref: asset._id } };
}

const bookkeeping = routes.service("outsourced-accounting-and-bookkeeping");
const tax = routes.service("outsourced-tax-preparation");
const payroll = routes.service("outsourced-payroll-and-compliance-services");

/* ------------------------------------------------------------ articles */

type Article = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  readTime: number;
  excerpt: string;
  seo: { title: string; description: string; keywords: string[] };
  cover: () => Promise<{ asset: { _type: string; _ref: string } }>;
  alt: string;
  overlay?: { title: string; text?: string };
  body: unknown[];
  faqTitle: string;
  faqs: ReturnType<typeof faqs>;
};

const articles: Article[] = [
  {
    id: "seoArticle-sample-how-to-outsource-accounting",
    slug: "how-to-outsource-accounting",
    title: "How to Outsource Accounting: A Complete Guide for U.S. Businesses",
    publishedAt: "2026-10-20",
    readTime: 6,
    excerpt:
      "What accounting outsourcing is, which tasks to outsource, what it costs, how it compares with an in-house team, and how to choose a provider, step by step.",
    seo: {
      title: "How to Outsource Accounting: A Complete Guide for U.S. Businesses",
      description:
        "Learn how accounting outsourcing works, which tasks to outsource, what affects the cost, and how to choose the right provider for your U.S. business.",
      keywords: [
        "how to outsource accounting",
        "outsourced accounting services",
        "accounting outsourcing",
        "outsource bookkeeping",
      ],
    },
    cover: async () => imageRef("/images/industries/professional-services-intro.jpg"),
    alt: "Business team reviewing financial charts together",
    overlay: { title: "How to Outsource Accounting: A Complete Guide for U.S. Businesses" },
    body: [
      p(
        "Keeping business finances organized takes time and effort. From recording sales and expenses to handling payroll and taxes, there's a lot to keep track of. Accounting support can help you manage these tasks while giving you more time to focus on your business.",
      ),
      p(
        "Accounting outsourcing allows businesses to work with an external accounting firm to manage their financial tasks. These services can include bookkeeping, preparing monthly financial reports, payroll processing, and financial planning, without hiring a full-time accounting team.",
      ),
      p(
        "Before outsourcing your bookkeeping, take some time to understand what your business needs. This means deciding which tasks to delegate, setting a budget, and choosing a provider who can fit into your existing workflows and handle your reporting needs.",
      ),
      p(
        "This guide explains how accounting outsourcing works, which services you can outsource, and what to consider before choosing a provider.",
      ),

      h2("What is Accounting Outsourcing?"),
      p(
        "Accounting outsourcing is the practice of hiring an external accounting firm or service provider to manage, track, or report your financial records without handling all accounting tasks in-house.",
      ),
      p(
        "Some businesses outsource bookkeeping and bank reconciliations, while others may need ongoing support with accounts payable, payroll, reporting, and budgeting. The right services depend on your business needs, goals, and available resources.",
      ),
      p(["Common ", { text: "outsourced accounting services", href: bookkeeping }, " include:"]),
      ...list("bullet", [
        ["Bookkeeping", "Recording transactions, categorizing expenses, and reconciling accounts."],
        [
          "Accounts payable and receivable",
          "Tracking supplier payments, customer invoices, and outstanding balances.",
        ],
        [
          "Financial reporting",
          "Preparing income statements, balance sheets, and other management reports.",
        ],
        ["Payroll support", "Recording payroll expenses and reconciling payroll accounts."],
        [
          "Tax preparation support",
          "Organizing financial records and preparing information for tax returns.",
        ],
        [
          "Financial planning",
          "Preparing budgets, cash flow forecasts, and profitability reports.",
        ],
      ]),
      p(
        "The services you outsource depend on your business needs and the provider's expertise. You can outsource a few routine tasks or get support with most of your accounting work.",
      ),

      h2("Why Do Businesses Outsource Accounting?"),
      p([
        "Businesses ",
        { text: "outsource accounting", href: bookkeeping },
        " to save time, access professional expertise, and manage financial tasks without hiring a full in-house team. Some outsource day-to-day bookkeeping, while others need ongoing support with financial reporting, payroll, and tax preparation.",
      ]),
      ...list("number", [
        [
          "Cost Savings",
          "Hiring an in-house accounting team requires spending on salaries, employee benefits, office space, software, and training. Outsourcing, especially to offshore regions like India, helps businesses reduce these costs.",
        ],
        [
          "Access to Specialized Expertise",
          "Outsourcing connects businesses with qualified accounting professionals, including CPAs and chartered accountants, with tax compliance knowledge and financial advisory expertise.",
        ],
        [
          "Scalability and Flexibility",
          "Businesses can increase or reduce accounting support based on workload, project demands, or peak-season requirements, while keeping costs under control.",
        ],
        [
          "Focus on Core Business Activities",
          "Outsourcing data entry, reconciliations, and payroll saves time and allows founders to focus on product development, sales, strategy, and growth.",
        ],
        [
          "Risk Reduction and Fraud Prevention",
          "External accounting firms help identify financial discrepancies, strengthen internal controls, and maintain accurate records while keeping up with tax laws and regulations.",
        ],
      ]),

      h2("What Accounting Tasks Should You Outsource?"),
      p(
        "You do not need to outsource every financial responsibility. Start with the work that takes up significant time, follows a repeatable process, or requires skills your current team does not have.",
      ),
      ...list("number", [
        [
          "Bookkeeping",
          "Recording daily transactions, reconciling bank statements, tracking expenses, and maintaining accurate financial records.",
        ],
        [
          "Accounts Payable and Receivable (AP/AR)",
          "Managing vendor payments, processing invoices, tracking customer payments, and maintaining healthy cash flow.",
        ],
        [
          "Payroll Processing",
          [
            { text: "Calculating employee salaries", href: payroll },
            ", managing deductions, preparing payslips, and ensuring timely payroll processing.",
          ],
        ],
        [
          "Tax Preparation and Compliance",
          [
            { text: "Preparing tax returns", href: tax },
            ", managing sales tax filings, maintaining tax records, and meeting statutory deadlines.",
          ],
        ],
        [
          "Financial Reporting",
          "Preparing balance sheets, profit-and-loss statements, cash flow reports, and monthly financial summaries.",
        ],
        [
          "Audit Support",
          "Organizing financial documents, preparing account reconciliations, and assisting with audit requirements.",
        ],
        [
          "Budgeting and Forecasting",
          "Preparing budgets, analyzing expenses, forecasting revenue, and supporting better financial decisions.",
        ],
      ]),

      h2("How Much Does It Cost to Outsource Accounting?"),
      p(
        "The cost of accounting outsourcing depends on several factors, including transaction volume, the number of accounts, the scope of services required, reporting frequency, and the condition of existing financial records.",
      ),
      p("The main factors affecting cost include:"),
      ...list("bullet", [
        ["Transaction volume", "More transactions usually mean more processing and review."],
        [
          "Service scope",
          [
            "Costs vary depending on whether the package includes services like payroll, ",
            { text: "tax preparation", href: tax },
            ", or financial planning.",
          ],
        ],
        [
          "Number of accounts and entities",
          "Managing multiple bank accounts, locations, and business entities adds complexity to your bookkeeping.",
        ],
        ["Bookkeeping cleanup", "Correcting old records may require a separate project."],
        [
          "Reporting requirements",
          "Custom reports and frequent forecasts may require additional time and specialized support.",
        ],
        [
          "Software and onboarding",
          "Setup, migration, and software subscriptions may carry extra charges.",
        ],
      ]),

      h2("Outsourced Accounting vs. In-House Accounting"),
      p(
        "Both models can be effective, and the right choice depends on your business's accounting needs, the volume of work involved, and the level of day-to-day coordination required with operations.",
      ),
      table([
        ["Factor", "Outsourced accounting", "In-house accounting"],
        [
          "Cost structure",
          "Service fee based on the agreed scope",
          "Salary and employment-related expenses",
        ],
        ["Staffing", "Access to the provider's assigned team", "Employees hired directly"],
        ["Flexibility", "Scope can change by agreement", "More capacity may require another hire"],
        [
          "Daily involvement",
          "Requires scheduled communication",
          "Direct involvement in business operations",
        ],
        ["Oversight", "Requires review and provider management", "Direct employee supervision"],
        ["Business knowledge", "Develops through ongoing work", "Builds through daily involvement"],
      ]),

      h2("How to Choose an Accounting Outsourcing Provider"),
      p(
        "Look beyond the price. Evaluate the team's expertise, quality assurance process, and approach to resolving issues before choosing a provider.",
      ),
      h3("1. Assess Industry Experience and Expertise"),
      ...list("bullet", [
        [
          "Industry Knowledge",
          "Choose a provider with industry experience who understands your business operations, accounting needs, and reporting requirements.",
        ],
        [
          "Professional Qualifications",
          "Choose a provider with qualified accountants who have the knowledge and experience to handle your accounting needs.",
        ],
        [
          "Regulatory Compliance",
          "Choose a provider who understands the accounting standards, tax rules, and compliance requirements that apply to your business.",
        ],
      ]),
      h3("2. Confirm Software Compatibility and Technology"),
      ...list("bullet", [
        [
          "Software Compatibility",
          "Choose a provider who is familiar with your accounting software, whether you use QuickBooks, Xero, Sage, or another system.",
        ],
        [
          "Workflow Integration",
          "Make sure the provider fits into your processes for sharing documents, reconciling accounts, approving transactions, and preparing reports.",
        ],
        [
          "Automation Capabilities",
          "Choose a provider that uses automation to save time, reduce manual errors, and keep your financial information up to date.",
        ],
      ]),
      h3("3. Verify Data Security and Confidentiality"),
      ...list("bullet", [
        [
          "Security Standards",
          "Ask about the provider's security practices and certifications, such as ISO 27001 or SOC 2.",
        ],
        [
          "Access Controls",
          "Make sure the provider uses multifactor authentication, encrypted data transfers, and role-based access.",
        ],
        [
          "Confidentiality Policies",
          "Check that the provider has clear policies for protecting your records and responding to security incidents.",
        ],
      ]),
      h3("4. Review Pricing and Service Scope"),
      ...list("bullet", [
        [
          "Transparent Pricing",
          "Check how the provider charges: monthly fees, hourly rates, or transaction-based costs.",
        ],
        [
          "Defined Deliverables",
          "Know which services are included, such as bookkeeping, payroll, invoice management, reconciliations, and reporting.",
        ],
        [
          "Additional Costs",
          "Ask about extra charges for setup, additional services, or increased workloads.",
        ],
      ]),
      h3("5. Evaluate Communication and Quality Control"),
      ...list("bullet", [
        [
          "Dedicated Support",
          "Check whether you'll have a dedicated account manager or a consistent team.",
        ],
        [
          "Review Procedures",
          "Ask how the provider checks records, reconciliations, and reports before delivery.",
        ],
        [
          "Deadlines and Response Times",
          "Make sure the provider sets clear deadlines and responds to your queries on time.",
        ],
      ]),
      h3("6. Check Scalability and Service Continuity"),
      ...list("bullet", [
        [
          "Business Growth",
          "Choose a provider who can keep up as your business grows and your needs change.",
        ],
        [
          "Backup Support",
          "Check whether the provider has a backup team when staff are unavailable.",
        ],
        [
          "Consistent Service",
          "Make sure the provider has clear processes and backup plans to maintain consistent service.",
        ],
      ]),
      h3("7. Review Contract Terms and Responsibilities"),
      ...list("bullet", [
        [
          "Service Agreement",
          "Make sure the contract outlines the services, fees, deadlines, responsibilities, and how your information is protected.",
        ],
        [
          "Data Ownership",
          "Make sure you can access and retain your financial records whenever you need them.",
        ],
        [
          "Exit Procedures",
          "Understand how to end the agreement, access your records, and move your work to another provider.",
        ],
      ]),

      h2("How to Outsource Accounting: A Step-by-Step Process"),
      p(
        "Outsourcing accounting helps businesses save time and manage their finances more efficiently. By choosing the right provider and setting clear expectations, you can simplify accounting tasks and focus on growth.",
      ),
      h3("Step 1: Identify Your Accounting Needs"),
      p(
        "Identify which accounting tasks you want to outsource, such as bookkeeping, bank reconciliations, payroll, or financial reporting, and decide which tasks your team will continue to handle in-house.",
      ),
      h3("Step 2: Choose the Right Accounting Provider"),
      p(
        "Look for providers with relevant experience, positive client reviews, and experience with your accounting software. Compare their services, pricing, and data security practices.",
      ),
      h3("Step 3: Set Clear Expectations"),
      p(
        "Make sure the contract explains the services, fees, responsibilities, and reporting deadlines, including extra charges and how your financial information will be protected.",
      ),
      h3("Step 4: Prepare Your Financial Records"),
      p(
        "Gather your bank statements, invoices, receipts, and past financial reports. Let the provider know about any missing documents or unresolved accounting issues before they start.",
      ),
      h3("Step 5: Set Up Secure Access and Workflows"),
      p(
        "Give the provider secure access to the necessary accounting software and records. Agree on how to share documents, approve payments, and stay in touch.",
      ),
      h3("Step 6: Review Performance Regularly"),
      p(
        "Review financial reports for errors and make sure tasks are completed on time. Stay in regular contact with your provider and resolve issues quickly.",
      ),

      h2("Final Thoughts"),
      p(
        "As your business grows, keeping up with bookkeeping, payroll, and financial reporting can become challenging. Outsourced accounting services help U.S. businesses manage these tasks efficiently without expanding their in-house team.",
      ),
      p(
        "Choose a provider with the right experience, transparent pricing, and strong data security practices. The right partner can simplify accounting processes, keep financial records accurate, and give you more time to focus on business growth.",
      ),
    ],
    faqTitle: "FAQs: Outsourced Accounting Services",
    faqs: faqs([
      [
        "What are outsourced accounting services?",
        "Outsourced accounting services involve hiring a third-party accounting firm to manage financial tasks such as bookkeeping, payroll, tax preparation, accounts payable, accounts receivable, financial reporting, and strategic CFO support.",
      ],
      [
        "What services are included in outsourced accounting?",
        "Services typically include bookkeeping, payroll processing, accounts payable and receivable management, financial reporting, tax compliance, controller services, and virtual CFO support.",
      ],
      [
        "How much do outsourced accounting services cost?",
        "The cost varies with business size, transaction volume, reporting requirements, payroll complexity, and the level of support required. Most providers offer customized pricing based on specific business needs.",
      ],
      [
        "Can small businesses benefit from outsourced accounting?",
        "Absolutely. Small businesses can reduce overhead costs, improve financial accuracy, gain access to experienced professionals, and focus on growth without hiring a full-time accounting team.",
      ],
      [
        "Is my financial data safe with an outsourced accounting firm?",
        "A reliable provider protects your data with access controls, encrypted file sharing, confidentiality agreements, and recognized security standards such as ISO 27001. Ask about these before you sign.",
      ],
    ]),
  },
  {
    id: "seoArticle-sample-bookkeeping-vs-accounting",
    slug: "bookkeeping-vs-accounting",
    title: "Bookkeeping vs. Accounting: Key Differences for U.S. Small Businesses",
    publishedAt: "2026-10-14",
    readTime: 5,
    excerpt:
      "Bookkeeping records what happened; accounting explains what it means. Here is how the two differ, and when your business needs each.",
    seo: {
      title: "Bookkeeping vs. Accounting: Key Differences for Small Businesses",
      description:
        "Understand the difference between bookkeeping and accounting, what each one covers, and when a U.S. small business needs a bookkeeper, an accountant, or both.",
      keywords: [
        "bookkeeping vs accounting",
        "difference between bookkeeping and accounting",
        "small business bookkeeping",
      ],
    },
    cover: async () => imageRef("/images/industries/healthcare-intro.jpg"),
    alt: "Calculator, laptop and financial charts on a desk",
    body: [
      p(
        "Bookkeeping and accounting are often used as if they mean the same thing, but they cover different parts of your finances. Knowing the difference helps you decide what kind of help your business needs and when.",
      ),
      h2("What is Bookkeeping?"),
      p(
        "Bookkeeping is the day-to-day recording of financial transactions. A bookkeeper makes sure every sale, purchase, payment, and receipt is recorded correctly and on time.",
      ),
      ...list("bullet", [
        [
          "Recording transactions",
          "Entering sales, expenses, and payments in your accounting software.",
        ],
        [
          "Reconciling accounts",
          "Matching bank and credit card statements to your books every month.",
        ],
        ["Managing payables and receivables", "Tracking bills to pay and invoices to collect."],
        [
          "Keeping records organized",
          "Filing receipts and documents so they are ready for tax time.",
        ],
      ]),
      h2("What is Accounting?"),
      p(
        "Accounting uses the records a bookkeeper keeps to explain how the business is doing and to make decisions. An accountant analyzes, reports, and plans.",
      ),
      ...list("bullet", [
        [
          "Financial statements",
          "Preparing profit and loss statements, balance sheets, and cash flow reports.",
        ],
        [
          "Tax planning and preparation",
          "Planning for taxes during the year and preparing returns.",
        ],
        [
          "Analysis and advice",
          "Explaining margins, costs, and trends, and advising on decisions.",
        ],
        ["Compliance", "Applying U.S. GAAP and tax rules correctly."],
      ]),
      h2("Bookkeeping vs. Accounting at a Glance"),
      table([
        ["", "Bookkeeping", "Accounting"],
        ["Focus", "Recording transactions", "Analyzing and reporting results"],
        ["Frequency", "Daily to weekly", "Monthly, quarterly, yearly"],
        ["Output", "Accurate, reconciled books", "Financial statements, tax returns, advice"],
        ["Typical role", "Bookkeeper", "Accountant or CPA"],
      ]),
      h2("When Does Your Business Need Each?"),
      p([
        "Most small businesses need bookkeeping from day one, and accounting support as they grow, borrow, or hire. Many choose ",
        { text: "outsourced bookkeeping and accounting", href: bookkeeping },
        " so one team keeps the books current and prepares reports and tax information from them.",
      ]),
      h2("Final Thoughts"),
      p(
        "Good accounting depends on good bookkeeping. Keep your books accurate every month, and use accounting support to understand the numbers and plan ahead.",
      ),
    ],
    faqTitle: "FAQs: Bookkeeping and Accounting",
    faqs: faqs([
      [
        "Can a bookkeeper do my taxes?",
        "A bookkeeper keeps the records your taxes are based on. Preparing and filing returns is usually done by an accountant, CPA, or enrolled agent.",
      ],
      [
        "Do I need both a bookkeeper and an accountant?",
        "Many small businesses do. An outsourced team can cover both: monthly bookkeeping plus reporting and tax preparation.",
      ],
      [
        "How often should my books be updated?",
        "At least monthly, with bank and credit card accounts reconciled each month. Businesses with many transactions often update them weekly.",
      ],
    ]),
  },
  {
    id: "seoArticle-sample-small-business-tax-checklist",
    slug: "small-business-tax-preparation-checklist",
    title: "Small Business Tax Preparation Checklist: What to Gather Before You File",
    publishedAt: "2026-10-08",
    readTime: 5,
    excerpt:
      "A practical checklist of the records, forms, and decisions a U.S. small business should have ready before tax season.",
    seo: {
      title: "Small Business Tax Preparation Checklist for U.S. Businesses",
      description:
        "Use this small business tax preparation checklist to gather income records, expenses, payroll forms, and prior returns before you file.",
      keywords: [
        "small business tax checklist",
        "tax preparation checklist",
        "business tax documents",
      ],
    },
    cover: () => uploadLocal("scripts/assets/case-studies/tax-documents-calculator.jpg"),
    alt: "Tax forms and a calculator on a desk",
    body: [
      p(
        "Tax season is easier when your records are ready before you or your accountant start the return. Use this checklist to gather what you need and avoid last-minute delays.",
      ),
      h2("1. Income Records"),
      ...list("bullet", [
        ["Sales and revenue reports", "From your accounting software, POS, or online store."],
        ["1099-NEC and 1099-K forms", "Forms received from clients and payment platforms."],
        ["Bank statements", "For every business account, for the full year."],
      ]),
      h2("2. Expense Records"),
      ...list("bullet", [
        ["Receipts and invoices", "For purchases, subscriptions, travel, and supplies."],
        [
          "Vehicle and home office records",
          "Mileage logs and home office measurements, if you claim them.",
        ],
        ["Asset purchases", "Invoices for equipment and other assets bought during the year."],
      ]),
      h2("3. Payroll and Contractor Records"),
      p([
        "Have your W-2s, 1099s issued, and quarterly payroll filings ready. If payroll takes too much time, ",
        { text: "outsourced payroll support", href: payroll },
        " can keep these records current all year.",
      ]),
      h2("4. Prior Returns and Notices"),
      p(
        "Keep last year's return, any IRS or state notices, and records of estimated tax payments made during the year.",
      ),
      h2("5. Reconciled Books"),
      p([
        "Reconcile every bank and credit card account and review your profit and loss statement before filing. Clean books make ",
        { text: "tax preparation", href: tax },
        " faster and reduce the risk of errors.",
      ]),
      h2("Final Thoughts"),
      p(
        "Working through this checklist a few weeks before your deadline gives you time to find missing documents and plan with your accountant, instead of rushing at the end.",
      ),
    ],
    faqTitle: "FAQs: Small Business Tax Preparation",
    faqs: faqs([
      [
        "When should I start preparing my business taxes?",
        "Start gathering documents at the beginning of the year, as soon as year-end statements and forms arrive, and keep your books reconciled monthly.",
      ],
      [
        "What if I'm missing receipts?",
        "Use bank and card statements to rebuild the record, and ask vendors for copies. Talk to your accountant about how to handle anything you can't document.",
      ],
      [
        "Do I need an accountant to file business taxes?",
        "Not always, but an accountant or CPA can help you claim the right deductions, stay compliant, and plan ahead, especially as your business grows.",
      ],
    ]),
  },
];

/** Body up to the "Final Thoughts" heading, and the closing section from it. */
function splitClosing(body: unknown[]): { body: unknown[]; conclusion?: unknown[] } {
  const i = body.findIndex(
    (b) =>
      (b as { style?: string }).style === "h2" &&
      (b as { children?: { text?: string }[] }).children?.[0]?.text === "Final Thoughts",
  );
  return i < 0 ? { body } : { body: body.slice(0, i), conclusion: body.slice(i) };
}

/* ------------------------------------------------------------ run */

async function main() {
  console.log(`Seeding SEO articles → ${projectId}/${dataset}`);
  for (const a of articles) {
    await client.createOrReplace({
      _id: a.id,
      _type: "seoArticle",
      sample: true,
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      author: AUTHOR,
      publishedAt: a.publishedAt,
      readTime: a.readTime,
      excerpt: a.excerpt,
      mainImage: { _type: "image", ...(await a.cover()), alt: a.alt },
      ...(a.overlay
        ? { coverOverlay: { title: a.overlay.title, text: a.overlay.text, showLogo: true } }
        : {}),
      // "Final Thoughts" onwards is the closing section (shown after the FAQs, as drawn).
      ...splitClosing(a.body),
      faqTitle: a.faqTitle,
      faqs: a.faqs,
      seo: { _type: "seoMeta", ...a.seo },
    });
    console.log(`  ✓ /${a.slug}`);
  }
  console.log("Done. Studio → Articles (SEO pages); 3 samples, marked SAMPLE.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
