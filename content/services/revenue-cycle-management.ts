import { routes } from "@/lib/routes";
/**
 * Revenue Cycle Management (`/revenue-cycle-management`, new page; no live URL yet).
 *
 * Sources (2026-10-25):
 *  - Copy: the Figma design `pages/services/revenue-cycle-management-services.svg` (RCM layout:
 *    hero, stats, intro, challenges, Medical Billing grid, why choose, Additional RCM Services,
 *    security, FAQ, CTA band). There is no dedicated RCM copy doc in docs/content.
 *  - Sections the design doesn't draw (services accordion, case studies, process, industries,
 *    tools, testimonials, blog) are left undefined.
 *
 * Every deviation from the drawn copy is marked `COPY FIX`; text that is not in the design at
 * all is marked `NOT IN DESIGN` and needs client confirmation.
 */
import { home } from "@/content/home";
import { SCHEDULE_HREF } from "@/content/types";
import type { ServicePageContent } from "@/content/services/types";

export const revenueCycleManagement: ServicePageContent = {
  slug: "revenue-cycle-management",
  name: "Revenue Cycle Management",

  seo: {
    // NOT IN DESIGN: derived from the hero and page copy; Sanity `seo` wins when present.
    title: "Revenue Cycle Management Services for Healthcare",
    description:
      "Outsourced revenue cycle management for healthcare providers: eligibility, coding, claims, denials, payment posting, A/R follow-up and patient billing.",
    // NOT IN DESIGN: meta keywords (fallback; Sanity SEO → Meta keywords wins when filled).
    keywords: [
      "revenue cycle management services",
      "outsourced revenue cycle management",
      "RCM outsourcing",
      "medical billing services",
      "claims and denial management",
      "accounts receivable follow-up",
      "payment posting services",
      "healthcare billing support",
    ],
  },

  hero: {
    badge: "For US CPA firms, SMEs & growing businesses",
    title: "Outsourcing Revenue Cycle Management Services",
    // COPY FIX: drawn as "... and accounts receivabl" (truncated word, no full stop).
    subtitle:
      "Streamline key healthcare revenue cycle activities with professional support for eligibility, billing, claims, denials, payment posting, and accounts receivable.",
    // No contact section on service pages: CTAs open the Calendly popup.
    primaryCta: { label: "Get Started", href: routes.contact() },
    secondaryCta: { label: "Talk to an RCM Expert", href: SCHEDULE_HREF },
    checks: [
      { label: "End-to-End RCM Support" },
      { label: "Business Growth Charts" },
      { label: "Financial Dashboard" },
    ],
  },

  stats: {
    items: [
      {
        // Caduceus icon drawn instead of a number (the label carries the meaning).
        value: "",
        // COPY FIX: drawn as "HIPPA Compliant".
        label: "HIPAA Compliant",
        image: {
          src: "/images/services/revenue-cycle-management/hipaa-caduceus-icon.png",
          alt: "",
          width: 144,
          height: 128,
        },
      },
      { value: "1M+", label: "Monthly Revenue collection" },
      { value: "300,000", label: "MIPS Coding Payments" },
      { value: "98%", label: "Claim Passing Ratio" },
    ],
    rating: { value: "4.3", source: "Google" },
  },

  intro: {
    title: "Why Xconcile Healthcare Solutions?",
    body: [
      "The healthcare industry is consistently moving. Old conventional reimbursement patterns have evolved to incorporate quality based healthcare. CMS along with many commercial payers gather data reported by providers, openly accessible through evaluations and physician compare portals. CMS and NCQA are two significant checking bodies that assume essential jobs, bringing about either a reward or penalty, in light of the nature of administration they give to their patients. These results directly affect the reimbursements that are issued to health care professionals.",
    ],
    // Fallback (design photo); the Sanity intro image wins when present. Same photo as the
    // virtual CFO intro (intro-reviewing-charts.jpg).
    image: {
      src: "/images/services/outsourced-virtual-cfo-and-fp-and-a/intro-reviewing-charts.jpg",
      alt: "Two finance professionals reviewing printed charts at a desk",
      width: 1480,
      height: 988,
    },
    checksTitle: "Promising Features",
    checks: [
      "Medical Billing Department Carries Experienced Billers & Coders",
      "Timely Filing of Clean Claims to Insurance Companies",
      "Accounts receivable management, old-age billing, and rigorous follow-up mechanism",
    ],
    checksStyle: "list",
    cta: { label: "Get Expert Billing Support Manager", href: SCHEDULE_HREF },
  },

  challenges: {
    badge: "Key Challenges",
    title: "Simplify Medical Billing. Focus on Better Patient Care.",
    body: "Streamline your healthcare billing operations with Xconcile. Reduce administrative burdens, improve reimbursement visibility, and spend more time delivering quality care.",
    cta: { label: "Let's Discuss Project", href: routes.contact() }, // COPY FIX: "Lets"
    items: [
      {
        tone: "rose",
        icon: "paid",
        title: "Faster Cash Flow",
        // As drawn (copied from the real estate page: property-level records). Confirm the copy.
        body: [
          "Managing income, expenses, assets, liabilities, and financial activity across individual properties requires organized property-level records",
        ],
      },
      {
        tone: "amber",
        icon: "trending_up",
        title: "Minimize Claim Denials",
        body: [
          "Review claims carefully before submission to catch common errors that can lead to denials.",
        ],
      },
      {
        tone: "blue",
        icon: "deployed_code_account",
        title: "Reduce Administrative Burden",
        body: [
          "Take care of routine billing and follow-up work so your staff has fewer tasks to manage.",
        ],
      },
      {
        tone: "purple",
        // Drawn: handshake glyph (no handshake icon in the registry).
        icon: "handshake",
        title: "Better Patient Experience",
        body: ["Give patients clear billing information so they know what they owe and why."],
      },
      {
        tone: "green",
        icon: "groups_3",
        title: "Staff Burnout Reduction",
        body: [
          "Take repetitive revenue cycle tasks off your staff’s plate and give them more time to focus on patients.",
        ],
      },
    ],
  },

  featureGrid: {
    badge: "Expertise",
    title: "Medical Billing Services",
    subtitle: "Get support across key stages of your healthcare revenue cycle.",
    items: [
      {
        icon: "verified_user",
        title: "Eligibility & Verification",
        // As drawn (copied from the real estate page: property-level transactions). Confirm the copy.
        body: "Maintain accurate property-level transactions, income, expenses, and ledgers for clear financial records.",
      },
      {
        icon: "fact_check",
        title: "Prior Authorization",
        body: "Support authorization workflows by coordinating required information based on payer requirements.",
      },
      {
        icon: "article",
        title: "Medical Coding",
        body: "Support accurate coding workflows using available clinical and billing documentation.",
      },
      {
        icon: "receipt_long",
        title: "Claims Management",
        body: "Prepare, submit, track, and follow up on claims throughout the revenue cycle process.",
      },
      {
        icon: "payments",
        title: "Payment Posting",
        body: "Record payments, adjustments, and related transactions within the billing workflow.",
      },
      {
        icon: "assignment_late",
        title: "Denial Management",
        body: "Review denied claims, identify issues, and support appropriate corrective actions.",
      },
      {
        // Drawn: phone handset glyph.
        icon: "call",
        title: "A/R Follow-Up",
        body: "Follow up on outstanding claims and receivables to support ongoing account resolution.",
      },
      {
        // Drawn: list-in-a-box glyph.
        icon: "request_quote",
        title: "Patient Billing",
        body: "Support recurring patient billing activities and help maintain consistent billing workflows.",
      },
    ],
  },

  whyChoose: {
    badge: "Why Choose Us",
    title: "Why Choose Xconcile for Revenue Cycle Management?",
    subtitle:
      "Get reliable support across billing, claims, denials, A/R, and payment follow-up, with a focus on keeping your revenue cycle organized and your team supported.",
    features: [
      {
        icon: "contextual_token_add",
        title: "End-to-End Support",
        body: "Support across key stages of the revenue cycle.",
      },
      {
        icon: "article",
        title: "Fewer Billing Issues",
        body: "Catch common issues before they create delays.",
      },
      {
        icon: "person",
        title: "Experienced RCM Team",
        body: "Get support from professionals who understand healthcare billing.",
      },
      {
        icon: "contact_phone",
        title: "Flexible Support",
        body: "Choose support that fits your organization and workload.",
      },
      {
        icon: "add_chart",
        title: "Clear Financial Reporting",
        body: "Stay informed about claims, payments, and outstanding accounts.",
      },
    ],
    // Same four photos as Home (pixel-identical sizes and content).
    images: home.whyChoose.images,
    stats: [
      { value: "8+", label: "RCM Clients" },
      { value: "US", label: "Healthcare Focus" },
      { value: "24/7", label: "Workflow Support" },
      { value: "100%", label: "Process Visibility" },
    ],
  },

  extraServices: {
    badge: "Supporting Services",
    title: "Additional RCM Services",
    subtitle: "Get support across key stages of your healthcare revenue cycle.",
    items: [
      {
        icon: "beenhere",
        title: "Credentialing",
        body: "Manage provider credentials and payer enrollment efficiently.",
      },
      {
        icon: "how_to_reg",
        title: "Patient Assistance",
        body: "Assist patients with free drugs enrollment with PAP as required",
      },
      {
        icon: "payments",
        title: "Treatment plans",
        body: "Provide estimates of treatment costs and insurance coverage.",
      },
      {
        icon: "add_chart",
        title: "Reporting",
        body: "Track claims, payments, denials, and revenue metrics.",
      },
      {
        icon: "event_available",
        title: "MIPS Billing",
        body: "Support MIPS reporting, quality measures, and documentation.",
      },
      {
        // Drawn: balance-scale glyph.
        icon: "account_balance",
        title: "Reconciliation", // COPY FIX: drawn as "Reconcillation"
        body: "Reconcile payments and resolve financial discrepancies.",
      },
      {
        // Drawn: phone handset glyph.
        icon: "contact_phone",
        title: "Patient Calling",
        body: "Follow up on patient balances and payment arrangements.",
      },
      {
        // Drawn: outlined star glyph.
        icon: "rewarded_ads",
        title: "Promotion and Reviews", // COPY FIX: drawn as "Pramotion and Reviews"
        body: "Promote services and manage patient reviews to build trust.",
      },
    ],
  },

  security: {
    badge: "Security & Data Protection",
    title: "Your Financial Data is Handled with Care",
    // COPY FIX: drawn as "Tax preparation involves sensitive financial and personal information.
    // Our professionals follow defined processes for handling tax documents, financial
    // information, and file exchanges." (copied from the tax page). Confirm the RCM wording.
    subtitle:
      "Revenue cycle management involves sensitive financial and patient information. Our professionals follow defined processes for handling billing documents, financial information, and file exchanges.",
    shield: { src: "/images/hire/security-shield.svg", alt: "", width: 112, height: 133 },
    groups: [
      {
        title: "Information Security",
        items: [
          { icon: "verified_user", title: "ISO/IEC 27001:2022", body: "Security compliance" },
          { icon: "lock", title: "Confidentiality", body: "Security compliance" },
          { icon: "database", title: "Secure Data Handling", body: "Protected information" },
        ],
      },
      {
        title: "Physical Security",
        items: [
          { icon: "door_open", title: "Controlled Office Access", body: "Building entry" },
          // As drawn: same sub-line as the ISO row. Confirm the copy.
          { icon: "nest_cam_iq_outdoor", title: "CCTV Monitoring", body: "Security compliance" },
          { icon: "desktop_windows", title: "PC & Workstation Locks", body: "Device security" },
        ],
      },
      {
        title: "Logical Access Control",
        items: [
          { icon: "how_to_reg", title: "User-Based Access", body: "Identity and permissions" },
          {
            icon: "shield_person_badge",
            title: "Restricted Client Access",
            body: "Limited permissions",
          },
          { icon: "settings", title: "System Access Controls", body: "System configuration" },
        ],
      },
    ],
  },

  faq: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: ["Still have Questions?", "Drop us a message and we’ll get back to you"],
    // NOT IN DESIGN: the design draws the questions collapsed, without answers, and there is no
    // RCM copy doc. Answers are written only from claims already made on this page; confirm.
    items: [
      {
        q: "What are Revenue Cycle Management (RCM) services?",
        a: [
          "Revenue Cycle Management services support the financial side of patient care, from eligibility and verification through billing, claims, denials, payment posting, and accounts receivable follow-up. Xconcile provides professional support across these key stages so your revenue cycle stays organized and your team can focus on patients.",
        ],
      },
      {
        q: "What services are included in Revenue Cycle Management?",
        a: [
          "Our medical billing services cover eligibility and verification, prior authorization, medical coding, claims management, payment posting, denial management, A/R follow-up, and patient billing. Additional RCM services include credentialing, patient assistance, treatment plan estimates, reporting, MIPS billing, reconciliation, patient calling, and promotion and reviews.",
        ],
      },
      {
        q: "How can outsourcing RCM services benefit healthcare providers?",
        a: [
          "Outsourcing helps minimize claim denials by reviewing claims before submission, reduces the administrative burden on your staff, gives patients clearer billing information, and takes repetitive revenue cycle tasks off your team’s plate so they have more time to focus on patients.",
        ],
      },
      {
        q: "Can your team work with our existing systems?",
        a: [
          "Yes. Our team supports your billing, claims, and follow-up work within your existing workflow, with support that fits your organization and workload.",
        ],
      },
      {
        q: "How does RCM outsourcing work?",
        a: [
          "We review your billing workflow and requirements, then provide support across the stages you need, from eligibility and claims to payment posting and A/R follow-up, with clear reporting on claims, payments, and outstanding accounts so you stay informed.",
        ],
      },
      {
        q: "How do you handle claims and denials?",
        a: [
          "We prepare, submit, track, and follow up on claims throughout the revenue cycle, reviewing them before submission to catch common errors. For denied claims, we review the denial, identify the issue, and support appropriate corrective actions.",
        ],
      },
      {
        q: "Can RCM support scale with our needs?",
        a: [
          "Yes. Support is flexible, so you can choose the services and level of help that fit your organization and workload, and adjust it as your needs change.",
        ],
      },
    ],
  },

  ctaBand: {
    // COPY FIX: drawn as "Get Expert Accounting Support for Your Real Estate Business" (copied
    // from the real estate page). Confirm the RCM wording.
    title: "Get Expert Revenue Cycle Support for Your Healthcare Practice",
    // COPY FIX: drawn as "From day-to-day bookkeeping to property-level reporting, get accounting
    // support designed around your real estate operations and financial needs." (real estate copy).
    body: "From eligibility and claims to denials and A/R follow-up, get revenue cycle support designed around your healthcare operations and financial needs.",
    cta: { label: "Talk to an Expert", href: routes.contact() },
    secondaryCta: { label: "Get Started", href: routes.contact() },
    // The design draws a plain dark band (no photo); the shared service CTA photo is the fallback.
    image: { src: "/images/services/cta-handshake.jpg", alt: "", width: 1500, height: 1000 },
  },
};
