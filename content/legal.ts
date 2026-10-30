import type { RichText } from "./types";

/**
 * Legal pages (design pages/Privacy Policy.svg + pages/Terms of Use.svg, 2026-10-29): code
 * fallback for Studio → Privacy Policy / Terms of Use (sanity/lib/legal-page.ts), and the source
 * for scripts/seed-legal-pages-sanity.ts, removed 2026-10-30, in git history. Any field left empty in Studio shows this copy.
 *
 * Studio edits each page's text in one "Content" box, the same rich text editor as blog posts
 * (user request 2026-10-29): Heading 2 per section, paragraphs, bold, lists, links, images,
 * tables. The copy below is written as sections for readability and converted to that format
 * by `legalBody` (H2 "1. Title", its text, an empty line between sections). (The design
 * repeated numbers: Privacy had two "6." headings and Terms two "9."; numbered in sequence here.)
 *
 * Links: `{ text, href }` parts. The site URL links to "/" (same site), not the absolute URL, so
 * previews and local dev stay on the current host.
 */
export type LegalSection = {
  title: string;
  /** Paragraph text; "\n" = new paragraph, "\n\n" = empty line. */
  body: RichText;
};

export type LegalPageKind = "privacy" | "terms";

/** A Portable Text block in the blog editor's format (rendered by ArticleBody). */
export type LegalBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  markDefs: { _key: string; _type: "link"; href: string }[];
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
};

type LegalPageSource = {
  /** Page H1. */
  title: string;
  /** "Last Updated" date, ISO `YYYY-MM-DD`. */
  lastUpdated: string;
  /** Hero paragraph under the H1. */
  intro: RichText;
  sections: LegalSection[];
  seo: { title: string; description: string; keywords?: string[] };
};

export type LegalPageContent = Omit<LegalPageSource, "sections"> & {
  /** Page content in the blog editor's format (Studio → Content). */
  body: LegalBlock[];
};

const SITE = { text: "https://xconcile.com/", href: "/" };
const EMAIL = { text: "connect@xconcile.com", href: "mailto:connect@xconcile.com" };

const privacyPolicy: LegalPageSource = {
  title: "Privacy Policy",
  lastUpdated: "2026-10-29",
  intro: [
    "At Xconcile Global LLP (“Xconcile”), we respect your privacy and are committed to protecting your personal and business information when you visit ",
    SITE,
    " or contact us about our accounting and financial services.",
  ],
  sections: [
    {
      title: "Information We Collect",
      body: [
        "At Xconcile, accessible at ",
        SITE,
        ", we respect your privacy and are committed to protecting your personal and business information. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website or contact us about our accounting and financial services.",
      ],
    },
    {
      title: "How We Use Your Information",
      body: [
        "We use collected information to respond to inquiries, provide requested services, communicate with clients, manage business relationships, improve our website, and meet applicable legal and regulatory obligations.",
      ],
    },
    {
      title: "Cookies and Website Analytics",
      body: [
        "Our website may use cookies and similar technologies to improve website functionality, understand visitor activity, and enhance the user experience. You can manage cookies through your browser settings. Any analytics or tracking technologies used will be subject to applicable privacy requirements.",
      ],
    },
    {
      title: "Sharing of Information",
      body: [
        "We do not sell personal information to third parties. We may share information with authorized service providers, professional advisers, or relevant authorities when necessary to provide our services, comply with legal obligations, or protect our rights. We expect appropriate confidentiality and security safeguards when information is shared.",
      ],
    },
    {
      title: "Data Security and Retention",
      body: [
        "We take reasonable measures to protect personal and financial information against unauthorized access, loss, misuse, or disclosure. We retain information only for as long as necessary for business, contractual, legal, and regulatory purposes. However, no online system can be guaranteed completely secure.",
      ],
    },
    {
      // The design repeated "Data Security and Retention" here; the copy is about privacy rights.
      title: "Your Privacy Rights",
      body: [
        "Depending on applicable law, you may have the right to access, correct, delete, or request restrictions on the processing of your personal information. You may also withdraw consent where processing is based on consent. To submit a privacy request, contact us using the details below.",
      ],
    },
    {
      title: "Third-Party Links",
      body: [
        "Our website may contain links to third-party websites or services. Xconcile is not responsible for their privacy practices, and we encourage you to review their privacy policies separately.",
      ],
    },
    {
      title: "Changes to This Policy",
      body: [
        "We may update this Privacy Policy from time to time to reflect changes in our business, website, or legal requirements. Updates will be published on this page with a revised “Last Updated” date.",
      ],
    },
    {
      title: "Contact Us",
      body: [
        "If you have questions about this Privacy Policy or how your information is handled, please contact us: Email: ",
        EMAIL,
        " | Website: ",
        SITE,
      ],
    },
  ],
  seo: {
    title: "Privacy Policy",
    description:
      "How Xconcile collects, uses, shares and protects your personal and business information when you visit our website or contact us about our accounting services.",
  },
};

const termsOfUse: LegalPageSource = {
  title: "Terms of Use",
  lastUpdated: "2026-10-29",
  intro: [
    "Welcome to Xconcile Global LLP (“Xconcile,” “we,” “our,” or “us”). These Terms of Use govern your access to and use of our website, ",
    SITE,
    ". By using our website, you agree to these terms.",
  ],
  sections: [
    {
      title: "Use of Our Website",
      body: [
        "You agree to use our website for lawful purposes only. You must not engage in activities that may damage, disrupt, or interfere with our website or attempt unauthorized access to our systems.",
      ],
    },
    {
      title: "Our Services",
      body: [
        "Xconcile Global LLP provides accounting, bookkeeping, payroll, tax compliance, financial reporting, and related business support services. Specific services, deliverables, fees, and responsibilities may be governed by separate agreements between Xconcile and its clients.",
      ],
    },
    {
      title: "Intellectual Property",
      body: [
        "All content on this website, including text, graphics, logos, images, and designs, is owned by or licensed to Xconcile Global LLP and is protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or use this content commercially without prior written permission.",
      ],
    },
    {
      title: "Professional Disclaimer",
      body: [
        "Information on this website is provided for general informational purposes only and does not constitute professional accounting, tax, legal, or financial advice. Please consult a qualified professional regarding your specific circumstances.",
      ],
    },
    {
      title: "Limitation of Liability",
      body: [
        "To the maximum extent permitted by applicable law, Xconcile Global LLP shall not be liable for indirect, incidental, or consequential damages arising from your use of, or inability to use, this website. Nothing in these terms excludes liability that cannot legally be excluded.",
      ],
    },
    {
      title: "Third-Party Links",
      body: [
        "Our website may contain links to third-party websites or services for your convenience. Xconcile Global LLP does not control these websites and is not responsible for their content, availability, or privacy practices.",
      ],
    },
    {
      title: "Privacy",
      body: [
        "Your use of our website is also subject to our ",
        { text: "Privacy Policy", href: "/privacy-policy" },
        ", which explains how we collect, use, and protect personal information.",
      ],
    },
    {
      title: "Website Availability",
      body: [
        "We aim to keep our website accessible and accurate but do not guarantee uninterrupted access or that all information will always be complete, current, or error-free. We reserve the right to modify, suspend, or discontinue website features when necessary.",
      ],
    },
    {
      title: "Changes to These Terms",
      body: [
        "Xconcile Global LLP may update these Terms of Use periodically. Changes will be published on this page with an updated revision date. Your continued use of the website after changes take effect constitutes acceptance of the revised terms, where permitted by law.",
      ],
    },
    {
      title: "Governing Law",
      body: [
        "These Terms of Use shall be governed by the applicable laws of the jurisdiction in which Xconcile Global LLP is legally established, subject to any mandatory legal requirements that apply.",
      ],
    },
    {
      title: "Contact Us",
      body: [
        "If you have any questions regarding these Terms of Use, please contact us: Email: ",
        EMAIL,
        " | Website: ",
        SITE,
      ],
    },
  ],
  seo: {
    title: "Terms of Use",
    description:
      "The terms that govern your use of the Xconcile website, including intellectual property, disclaimers, limitation of liability and governing law.",
  },
};

/** One Portable Text block from `RichText` parts (links become `link` annotations). */
function textBlock(key: string, style: LegalBlock["style"], parts: RichText): LegalBlock {
  const markDefs: LegalBlock["markDefs"] = [];
  const children = parts.map((part, i) => {
    if (typeof part === "string")
      return { _type: "span" as const, _key: `${key}s${i}`, text: part, marks: [] };
    const markKey = `${key}l${i}`;
    markDefs.push({ _key: markKey, _type: "link", href: part.href });
    return { _type: "span" as const, _key: `${key}s${i}`, text: part.text, marks: [markKey] };
  });
  return { _type: "block", _key: key, style, markDefs, children };
}

/**
 * Sections → the blog editor's blocks: an empty line before every section but the first, an H2
 * "1. Title", then the text (one paragraph per "\n"-separated line; "\n\n" leaves an empty line).
 * Keys are stable (`p3h`, `p3t0` …) so a reseed doesn't reshuffle anything.
 */
export function legalBody(sections: LegalSection[]): LegalBlock[] {
  return sections.flatMap((section, i) => {
    const lines: RichText[] = [[]];
    for (const part of section.body) {
      if (typeof part !== "string") {
        lines[lines.length - 1].push(part);
        continue;
      }
      part.split("\n").forEach((text, j) => {
        if (j > 0) lines.push([]);
        if (text) lines[lines.length - 1].push(text);
      });
    }
    return [
      ...(i > 0 ? [textBlock(`p${i}b`, "normal", [""])] : []),
      textBlock(`p${i}h`, "h2", [`${i + 1}. ${section.title}`]),
      ...lines.map((line, j) => textBlock(`p${i}t${j}`, "normal", line.length ? line : [""])),
    ];
  });
}

const toContent = ({ sections, ...page }: LegalPageSource): LegalPageContent => ({
  ...page,
  body: legalBody(sections),
});

export const legalPages: Record<LegalPageKind, LegalPageContent> = {
  privacy: toContent(privacyPolicy),
  terms: toContent(termsOfUse),
};
