/**
 * Seeds the blog in Sanity (this site's dataset):
 * - Author "Pranav Jani" (Founder & CEO, photo).
 * - The Blog Post from the design pages/blog/page.svg ("How CPA Firms Can Prepare for the 2027
 *   Tax Season: A Practical Checklist"): cover photo + overlay text, the full article, FAQs.
 * - The Blog Gallery singleton (`blogPage`, `/blog` + the copy every article shares) from
 *   content/blog-gallery.ts.
 * Re-runnable: replaces these documents (and drops stale drafts).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-blog-sanity.ts
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Article copy transcribed from the design; COPY FIX notes mark repeated design text dropped.
 */
import { createReadStream } from "node:fs";
import path from "node:path";

import { blogGallery as page } from "@/content/blog-gallery";

import { sectionId } from "../lib/section-ids";
import { client, dataset, imageRef, key, keyed, link, projectId } from "./lib/seed-helpers";

const AUTHOR_ID = "author-pranav-jani";
const POST_ID = "blogPost-cpa-firms-2027-tax-season";
const POST_SLUG = "how-cpa-firms-can-prepare-for-the-2027-tax-season";

async function uploadLocal(file: string) {
  const full = path.join(process.cwd(), "scripts/assets/blog", file);
  const asset = await client.assets.upload("image", createReadStream(full), { filename: file });
  console.log(`  ↑ ${file}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

/* ------------------------------------------------------------ Portable Text helpers */

/** "**Bold** rest" → spans (only a leading **bold** run is needed in this article). */
function spans(text: string) {
  const m = text.match(/^\*\*([\s\S]+?)\*\*([\s\S]*)$/);
  if (!m) return [{ _type: "span", _key: key("s"), text, marks: [] }];
  return [
    { _type: "span", _key: key("s"), text: m[1], marks: ["strong"] },
    { _type: "span", _key: key("s"), text: m[2], marks: [] },
  ];
}
const block = (style: string, text: string) => ({ _type: "block", _key: key("b"), style, markDefs: [], children: spans(text) });
const p = (text: string) => block("normal", text);
const h2 = (text: string) => block("h2", text);
const h3 = (text: string) => block("h3", text);
const list = (kind: "bullet" | "check", items: string[]) =>
  items.map((text) => ({ ...block("normal", text), listItem: kind, level: 1 }));
const bullets = (items: string[]) => list("bullet", items);
const checks = (items: string[]) => list("check", items);

/* ------------------------------------------------------------------- the article */

const body = [
  p("Tax season can be a demanding time for CPA firms. Client documents arrive late, tax returns pile up, and reviewers have less time to check completed work. Even experienced teams can face delays when tax preparation, return reviews, and client follow-ups all need attention at the same time."),
  p("Getting ready for the 2027 tax season? CPA firms need to prepare for more than the number of tax returns they expect to handle. Staff schedules, client documents, and tax software all need attention before the busy season begins. If these things are left until work starts piling up, keeping up with tax preparation and client deadlines can become much harder."),
  p("Getting these tasks done early gives your team more time to deal with problems before the busy season starts."),
  p("Whether you run a small accounting firm or a larger CPA firm, these seven steps can help you get ready for the 2027 tax season and make it easier to manage the extra work."),

  h2("1. Review your 2026 Tax Season Performance"),
  p("Before planning for 2027, review how your firm handled the previous tax season. Look at where delays happened, which tasks put pressure on your team, and what made it difficult to meet deadlines. This review will help you decide what needs to change before the next tax season begins."),
  p("Start with a review of the following areas:"),
  ...bullets([
    "Total number of tax returns completed during the previous season.",
    "Average time required to prepare and review returns.",
    "Returns delayed due to missing client documents.",
    "Common preparation errors and repeated review comments.",
    "Staff overtime and periods of heavy workload.",
    "Returns that remained incomplete as filing deadlines approached.",
  ]),
  p("Ask your preparers, reviewers, and managers where the process gets difficult. Their answers can show problems that production reports miss."),
  p("Say your preparers finish returns on schedule, but those returns regularly wait several days for manager review. Hiring more preparers would raise the number of completed files, but the wait for review would stay the same. The fix is more likely to be spreading review assignments across more people or setting aside more time for quality control."),
  p("Use what you hear to set your priorities for 2027. Fixing recurring problems before busy season starts is easier than changing procedures once deadlines are close."),

  h2("2. Build a Realistic Staffing and Workload Plan"),
  p("Base your staffing plan on the work you expect to handle and how complex it will be, not on last year's team size. Client growth, new services, more complex returns, employee leave, and shifts in client behavior can all change your firm's capacity."),
  p("Start with a workload forecast. Go through your active client list, note new engagements, and estimate how much preparation and review time each return type usually takes."),
  p("Then compare the forecast with your team's available hours. Subtract time for administrative work, client meetings, training, leave, and resolving review comments."),
  p("Once you know the capacity gap, assign work by experience and availability."),
  ...bullets([
    "Which preparers will handle each category of return.",
    "Who will review completed work.",
    "How complex returns will be assigned.",
    "Who will monitor outstanding client information.",
    "How managers will track progress and resolve delays.",
  ]),
  p("If your expected workload is higher than your capacity, you can redistribute assignments, hire seasonal tax professionals, or outsource preparation for selected returns."),
  p("Don't make overtime the answer to every workload problem. A realistic plan lets managers spot capacity gaps early and leaves the firm room to absorb unexpected work."),

  h2("3. Collect Client Documents and Clean Up Books Early"),
  p("Missing client information is a common reason for tax preparation delays. A tax preparer may complete most of a return but be unable to finish it because a tax form, financial statement, expense record, or client response is missing."),
  p("To reduce these delays, start collecting and organizing client documents before the tax season gets busy."),
  h3("Send client-specific document requests"),
  p("Prepare customized document request lists based on each client's tax filing requirements, income sources, and applicable ITR form."),
  p("For individual clients, the documents required may include wage statements, interest and dividend statements, and records supporting eligible deductions. Business clients may need to provide financial statements, payroll records, general ledger details, and supporting schedules. These documents help verify the information reported in tax returns and support applicable deduction claims."),
  p("Customising document requests to the needs of each engagement helps clients understand what information they need to provide and reduces the need for repeated follow-ups."),
  h3("Track missing information"),
  p("Use practice management software, a client portal, or another approved system to track the progress of each engagement."),
  p("At a minimum, separate the following categories:"),
  ...bullets([
    "Clients who have not submitted their documents.",
    "Clients with incomplete information.",
    "Returns ready for preparation.",
    "Returns awaiting clarification or additional records.",
    "Returns ready for review.",
  ]),
  p("Assign team members to follow up with clients and set internal deadlines to review pending requests."),
  // COPY FIX: the design repeats this heading as the first paragraph; the repeat is dropped.
  h3("Identify bookkeeping problems before tax preparation begins"),
  p("Tax preparation may be delayed if a client's books contain unreconciled accounts, uncategorised transactions, missing depreciation schedules, or inconsistent balances."),
  p("Before the busy season begins, identify clients whose records required significant cleanup in the previous year."),
  p("Where appropriate, request outstanding bank and credit card statements, review fixed asset records, and confirm that payroll and other relevant balances have been reconciled."),
  p("If your internal team cannot complete the cleanup on time, consider whether additional bookkeeping support is appropriate."),
  p("Starting with organized financial records gives preparers a more reliable foundation and reduces the risk of discovering avoidable problems late in the process."),

  h2("4. Review Tax Software and 2027 Filing Requirements"),
  p("Software issues and unfamiliar filing procedures can slow down tax preparation, especially when deadlines are approaching."),
  p("Before the tax season begins, check that your systems are working properly, staff have the required access, and your team is familiar with the procedures needed to manage the expected workload."),
  h3("Check your tax preparation software"),
  p("Review software updates, user access, system integrations, and document-sharing arrangements before the tax season begins. Ensure that staff can access the applications and client records required for their work."),
  p("Review the filing procedures for the relevant tax return types, including Forms 1040, 1065, 1120-S, and 1120, based on your client base."),
  p("Update internal checklists when verified software or filing requirements change."),
  h3("Monitor IRS and state tax updates"),
  p("Federal and state tax requirements may vary for clients operating across multiple jurisdictions."),
  p("Review official guidance for updates to tax forms, filing deadlines, electronic filing procedures, and reporting requirements. Verify the rules for the relevant tax year before using prior-year checklists."),
  // COPY FIX: the design shows this sub-section twice with near-identical text; merged into one.
  h3("Prepare for the FIRE-to-IRIS transition"),
  p("Information-return filing deserves particular attention for firms that prepare Forms 1099 and other covered information returns."),
  p("The IRS has announced changes involving the retirement of the Filing Information Returns Electronically (FIRE) system and the use of the Information Returns Intake System (IRIS) for affected filings. Firms should verify the current IRS transition guidance and identify which filing procedures apply to their reporting obligations for the 2027 filing season."),
  p("Before January, determine whether your firm or its clients will need changes to system access, filing procedures, staff training, or internal responsibilities."),
  p("Do not assume that every information-return workflow used in the previous year will remain appropriate."),
  p("**Practical tip**: Assign one person to monitor relevant IRS and state announcements and communicate verified changes to the team. This creates a clear point of responsibility for compliance updates."),

  h2("5. Improve Tax Return Preparation and Review Workflows"),
  p("More preparation capacity does not automatically mean more filed returns. If completed work sits in a review queue or repeatedly returns to preparers for corrections, the entire process can slow down."),
  p("A consistent workflow helps your team identify incomplete files, resolve review comments, and move returns toward approval."),
  h3("Set clear preparation standards"),
  p("Before a return reaches a reviewer, define what the preparer must complete."),
  p("Depending on the engagement, this may include:"),
  ...bullets([
    "Required workpapers and supporting schedules.",
    "Reconciliations and explanations for material items.",
    "Documentation for unusual transactions or tax positions.",
    "Resolution of identified discrepancies.",
    "Completion of the appropriate preparation checklist.",
  ]),
  p("Clear submission standards reduce avoidable review questions and help reviewers focus on areas that require professional judgment."),
  h3("Standardize review and correction procedures"),
  p("Use checklists appropriate to each return type. Establish a consistent method for recording review comments, assigning corrections, and tracking resubmissions."),
  p("Each outstanding issue should have a clear owner and next step. This prevents files from becoming stuck between preparation and review."),
  h3("Monitor reviewer capacity"),
  p("Track the number of returns awaiting review, how long they have been waiting, and how often returns require additional corrections."),
  p("If the review queue grows, examine whether assignments need to be redistributed or whether preparation quality needs improvement."),
  p("Complex returns should be assigned to reviewers with appropriate experience. Review schedules should also reflect the expected volume and complexity of incoming work."),
  p("Finally, monitor recurring errors. If the same problems appear across multiple engagements, targeted staff guidance or improved checklists may help reduce rework."),

  h2("6. Plan for Tax Preparation Outsourcing Before You Need It"),
  p("Even a well-organized CPA firm can experience workload spikes during tax season. Client growth, staff absences, complex returns, and late document submissions can create more work than the existing team can comfortably handle."),
  p("Waiting until deadlines approach to find additional help leaves less time to evaluate providers and establish working procedures."),
  p("Planning for overflow work in advance gives your firm more flexibility."),
  h3("Identify work that may need additional support"),
  p("Review your workload forecast and determine which tasks could be handled by an external preparation team."),
  p("Depending on the provider's capabilities and your engagement requirements, this may include:"),
  ...bullets([
    "Individual and business tax return preparation.",
    "Supporting schedules and workpaper preparation.",
    "Tax document organization.",
    "Preparation of returns for internal review.",
    "Other agreed-upon tax workflow support.",
  ]),
  p("Define the scope of work carefully. The arrangement should fit your firm's software, review procedures, client requirements, and internal responsibilities."),
  h3("Evaluate outsourcing providers carefully"),
  p("Before selecting a provider, assess the following factors:"),
  p("**U.S. tax experience**: Confirm experience with the return types and workflows your firm handles."),
  p("**Software compatibility:** Determine whether the provider can work within your approved tax preparation software and document-sharing systems."),
  p("**Quality control:** Ask how workpapers and returns are checked before delivery and how review comments are resolved."),
  p("**Turnaround expectations:** Agree on delivery dates, assignment priorities, escalation procedures, and communication methods."),
  p("**Data security:** Review access controls, confidentiality arrangements, information protection procedures, and relevant compliance obligations."),
  p("**Responsibility and oversight:** Define who prepares the work, who reviews it, who communicates with clients, and who authorizes filing."),
  p("During the busy season, tax firms may need extra help preparing returns. Outsourcing can help manage the additional workload without the need to hire permanent staff. The firm must still review the work, protect client information, and meet all applicable professional and legal requirements."),
  p("Xconcile offers outsourced tax preparation services for firms that need additional support. Before choosing a provider, check which services are included and whether the working arrangements suit your firm's needs."),
  p("With the right support, your team can spend less time dealing with a heavy preparation workload and more time reviewing returns and helping clients."),

  h2("7. Strengthen Client Communication and Data Security"),
  p("Clear communication and secure information handling are essential to an organized tax season."),
  p("Without consistent procedures, staff may spend valuable time searching for documents, answering repeated questions, and resolving access problems."),
  h3("Establish a consistent client communication process"),
  p("Before client requests begin to increase, explain how clients should submit documents, where they should direct questions, and how your team will provide updates."),
  p("Use standard templates for document requests, missing information, outstanding questions, and return status updates. Set reasonable expectations for response times and explain that incomplete records or delayed client responses may affect turnaround."),
  p("A consistent process helps clients understand what is required while reducing the administrative burden on your team."),
  h3("Review access controls and security procedures"),
  p("Tax returns contain sensitive personal and financial information. Your firm should establish clear procedures for accessing, sharing, storing, and removing access to these records."),
  p("Before the season begins:"),
  ...bullets([
    "Review user permissions and remove access that is no longer needed.",
    "Use approved systems for transferring sensitive documents.",
    "Confirm appropriate access restrictions for temporary staff and external providers.",
    "Maintain procedures for reporting suspicious messages and potential security incidents.",
    "Review relevant confidentiality, information security, and professional requirements.",
  ]),
  p("If your firm uses an external preparation team, establish how client information will be shared, who can access it, and how access will be removed when the engagement ends."),
  p("For offshore tax preparation arrangements, review applicable taxpayer consent and disclosure requirements with your compliance advisor before sharing tax return information."),
  p("Security should be part of the workflow from the beginning, not a task left until a new employee or provider needs access."),

  h2("Your 2027 Tax Season Preparation Timeline"),
  p("Use the following timeline to turn your preparation plan into specific actions. Adjust it to your firm's client mix, staffing, and filing obligations."),
  h3("October–November 2026: Assess and plan"),
  ...bullets([
    "Review delays, recurring errors, and review bottlenecks from the previous season.",
    "Forecast expected return volume and complexity.",
    "Estimate preparation and reviewer capacity.",
    "Identify clients whose books need cleanup.",
    "Review software access and relevant IRS announcements.",
    "Identify potential staffing gaps and evaluate additional support.",
  ]),
  h3("December 2026: Organize and test"),
  ...bullets([
    "Send client-specific document request lists.",
    "Follow up on missing information and outstanding records.",
    "Finalize preparation and review assignments.",
    "Test software access and secure document-sharing procedures.",
    "Confirm external support arrangements and responsibilities.",
    "Update internal checklists using verified filing requirements.",
  ]),
  h3("January 2027 and throughout the filing season: Monitor and adjust"),
  ...bullets([
    "Track document collection and return status.",
    "Monitor preparation and review queues.",
    "Rebalance assignments when workloads change.",
    "Resolve recurring errors and outstanding review comments.",
    "Verify applicable filing deadlines and current agency guidance.",
    "Arrange additional capacity when demand exceeds available resources.",
  ]),
  p("This is an operational planning framework, not an official filing calendar. Actual deadlines depend on return type, tax year, jurisdiction, extensions, and applicable IRS or state requirements. Confirm dates using official sources."),

  h2("2027 Tax Season Checklist for CPA Firms"),
  p("Use this checklist to review your firm's readiness before workloads increase."),
  h3("Workload and staffing"),
  ...checks([
    "Review the previous season's delays and bottlenecks.",
    "Forecast expected return volume and complexity.",
    "Assign preparation and review responsibilities.",
    "Identify capacity gaps and plan additional support if necessary.",
  ]),
  h3("Client documents and bookkeeping"),
  ...checks([
    "Prepare client-specific document request lists.",
    "Contact clients before the busy season.",
    "Track missing information and outstanding responses.",
    "Identify clients who need bookkeeping cleanup.",
    "Assign responsibility for client follow-ups.",
  ]),
  h3("Software and filing requirements"),
  ...checks([
    "Review software updates, integrations, and user permissions.",
    "Confirm procedures for the return types your firm prepares.",
    "Review current IRS and state guidance.",
    "Assess whether the FIRE-to-IRIS transition affects your information-return filings.",
    "Update internal procedures when verified requirements change.",
  ]),
  h3("Preparation and review"),
  ...checks([
    "Establish clear preparation and workpaper standards.",
    "Confirm reviewer availability.",
    "Monitor returns waiting for review or correction.",
    "Track recurring errors and provide targeted staff guidance.",
  ]),
  h3("Outsourcing and data security"),
  ...checks([
    "Identify work that may require external support.",
    "Evaluate providers before deadlines become urgent.",
    "Confirm software compatibility and turnaround expectations.",
    "Review confidentiality and information security procedures.",
    "Define preparation, review, communication, and filing responsibilities.",
  ]),

  h2("Prepare Your CPA Firm for a More Manageable 2027 Tax Season"),
  p("Tax season can put pressure on your team, especially when client documents arrive late and filing deadlines get closer. Preparing in advance gives your firm more time to organize returns and address problems before the workload increases."),
  p("Start by reviewing last year's tax season. Identify where delays occurred, whether your team had enough time to review returns, and which tasks took longer than expected. These details can help you decide what needs to change for 2027."),
  p("Reach out to clients ahead of tax season to request the documents needed to prepare their returns. Review your team's workload, assign responsibilities, and check the filing requirements that apply to your clients."),
  p("If your current team may not be able to handle the expected volume of returns, consider additional preparation support before deadlines become difficult to manage."),
  // COPY FIX: the design repeats this closing paragraph twice; kept once.
  p("Taking care of these tasks before the busy season begins can help your team avoid unnecessary delays and spend more time reviewing returns and helping clients."),
];

// COPY FIX: the design repeats "Can small businesses benefit from outsourced accounting?" three
// times; kept once. NOTE: these FAQs are about outsourced accounting in general (as drawn).
const faqs = [
  {
    question: "What are outsourced accounting services?",
    answer:
      "Outsourced accounting services involve hiring a third-party accounting firm to manage financial tasks such as bookkeeping, payroll, tax preparation, accounts payable, accounts receivable, financial reporting, and strategic CFO support.",
  },
  {
    question: "What services are included in outsourced accounting?",
    answer:
      "Services typically include bookkeeping, payroll processing, accounts payable management, accounts receivable management, financial reporting, tax compliance, controller services, and virtual CFO support.",
  },
  {
    question: "How much do outsourced accounting services cost?",
    answer:
      "The cost varies depending on business size, transaction volume, reporting requirements, payroll complexity, and the level of support required. Most providers offer customized pricing based on specific business needs.",
  },
  {
    question: "Can small businesses benefit from outsourced accounting?",
    answer:
      "Absolutely. Small businesses can reduce overhead costs, improve financial accuracy, gain access to experienced professionals, and focus on growth without hiring a full-time accounting team.",
  },
];

/* ----------------------------------------------------------------------- documents */

async function buildAuthor() {
  return {
    _id: AUTHOR_ID,
    _type: "author",
    name: "Pranav Jani",
    title: "Founder & CEO",
    photo: { ...(await uploadLocal("pranav-jani.jpg")), hotspot: { x: 0.5, y: 0.35, width: 0.6, height: 0.6 } },
  };
}

async function buildPost() {
  return {
    _id: POST_ID,
    _type: "blogPost",
    title: "How CPA Firms Can Prepare for the 2027 Tax Season: A Practical Checklist",
    slug: { _type: "slug", current: POST_SLUG },
    author: { _type: "reference", _ref: AUTHOR_ID },
    // The design shows "October 28, 2024" (placeholder year); set to the publishing date.
    publishedAt: "2026-10-26",
    excerpt:
      "Seven practical steps to get your CPA firm ready for the 2027 tax season: staffing, client documents, software, review workflows, outsourcing and data security, with a timeline and checklist.",
    mainImage: {
      ...(await uploadLocal("cpa-tax-season-2027-cover.jpg")),
      alt: "Two accountants reviewing a document together in an office",
    },
    coverOverlay: {
      title: "How CPA Firms Can Prepare for the 2027 Tax Season",
      text: "Plan ahead. Manage workloads. Get ready for tax season.",
      showLogo: true,
    },
    body,
    faqTitle: "FAQs: Outsourced Accounting Services",
    faqs: keyed(faqs, "blogFaq"),
    relatedPosts: [],
    seo: {
      _type: "seoMeta",
      title: "How CPA Firms Can Prepare for the 2027 Tax Season",
      description:
        "A practical 2027 tax season checklist for CPA firms: review last season, plan staffing, collect documents early, check software and IRS updates, streamline reviews and plan outsourcing.",
      keywords: ["2027 tax season", "CPA firm tax season checklist", "tax preparation outsourcing", "FIRE to IRIS"],
    },
  };
}

async function buildBlogPage() {
  const { hero, posts, ctaBand, article, seo } = page;
  return {
    _id: "blogPage",
    _type: "blogPage",
    hero: {
      _type: "heroSection",
      anchorId: sectionId(hero, "hero"),
      badge: hero.badge,
      title: hero.title,
      subtitle: hero.subtitle,
      primaryCta: link(hero.primaryCta),
      showSecondaryCta: false,
      checks: [],
    },
    posts: {
      _type: "blogPostsSection",
      anchorId: sectionId(posts, "blog"),
      badge: posts.badge,
      title: posts.title,
      subtitle: posts.subtitle,
      perPage: posts.perPage,
      loadMoreLabel: posts.loadMoreLabel,
      emptyText: posts.emptyText,
    },
    ctaBand: {
      _type: "ctaBandSection",
      anchorId: sectionId(ctaBand, "ctaBand"),
      title: ctaBand.title,
      body: ctaBand.body,
      showCta: true,
      ...(ctaBand.cta ? { cta: link(ctaBand.cta) } : {}),
      showSecondaryCta: false,
      image: await imageRef(ctaBand.image.src),
    },
    related: { ...article.related },
    newsletter: {
      title: article.newsletter.title,
      body: article.newsletter.body,
      placeholder: article.newsletter.placeholder,
      button: article.newsletter.button,
      success: article.newsletter.success,
      already: article.newsletter.already,
      error: article.newsletter.error,
      image: await imageRef(article.newsletter.image.src),
    },
    seo: { _type: "seoMeta", title: seo.title, description: seo.description, keywords: seo.keywords },
  };
}

async function main() {
  console.log(`Seeding blog into ${projectId}/${dataset}…`);
  const docs: { _id: string; _type: string; [field: string]: unknown }[] = [
    await buildAuthor(),
    await buildPost(),
    await buildBlogPage(),
  ];
  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc);
    tx.delete(`drafts.${doc._id}`);
  }
  await tx.commit();
  for (const doc of docs) console.log(`✓ ${doc._type} ${doc._id}`);
  console.log(`\nArticle: /blog/${POST_SLUG}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
