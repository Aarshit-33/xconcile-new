# Sanity content: old site vs new site

Compares where the content comes from on the 3 pages built so far in the new site: **Home**, **Audit Outsourcing Services** and **404**.

- Old site code: `../old-code/xconcile-website`
- New site code: `new-site/`
- Checked against the live Sanity `production` dataset (project `3fkk9bs9`) on 2026-10-13.

**Legend**

| Mark | Meaning |
|---|---|
| ✅ | Comes from Sanity (editable in `/studio`) |
| ❌ | Written in the code (repo). Needs a code change to edit |
| ⚠️ | Partly from Sanity, or the Sanity field is read but empty, so the text in the code is shown |
| — | The section doesn't exist on that site |

---

## 1. Summary

| Page | Old site | New site |
|---|---|---|
| **Home** | Almost everything from the Sanity `homePage` document, plus `post` documents for the blog | Only the blog cards (`post`). Everything else is the Figma copy in `content/home.ts` |
| **Audit Outsourcing Services** | Almost everything from the Sanity `service` document (slug `audit-outsourcing-services`) | SEO title/description, share image, intro image, services accordion and blog cards. The rest is the Figma copy in `content/services/audit-outsourcing-services.ts` |
| **404** | Static (in the code) | Static (in the code: `content/not-found.ts`) |
| **Header + footer** (on all 3 pages) | Header menu, footer link lists, footer description, social links and company name from Sanity | Footer description + social links from Sanity (`settings`). Header menu and footer link lists are in the code |

---

## 2. Header and footer (shown on every page)

| Element | Old site | Source (old) | New site | Source (new) |
|---|---|---|---|---|
| Header mega-menu (Services / Hire Staff / Industries) | ✅ | `service`, `hireStaff`, `industry` documents via client-side `/api/navigation` | ❌ | `content/navigation.ts` (`headerNav`). `sanity/lib/navigation.ts` exists but isn't used |
| Footer description | ✅ | `settings.footerDescription` | ✅ | `settings.footerDescription` (fallback: `siteConfig.footerBlurb`) |
| Footer social links | ✅ | `settings.socialLinks` (any platform, generic icon) | ✅ | `settings.socialLinks`, in Studio order. Only platforms with a design icon (no Twitter/X) |
| Footer link columns | ✅ | Lists of `service`, `industry`, `hireStaff` documents | ❌ | `content/navigation.ts` (`footerNav`) |
| Copyright name | ✅ | `settings.companyName` | ❌ | `siteConfig.legalName` ("Xconcile Inc.", same value as Sanity) |
| Email, phones, office addresses | ❌ | Code | ❌ | `lib/site-config.ts` |
| Certification badges | — | — | ❌ | `site-footer.tsx` |
| Organization JSON-LD `sameAs` (social profiles) | — | — | ❌ | `siteConfig.social` |

---

## 3. Home page

Old: `app/(website)/page.tsx` → `homePage` document + latest `post`s (the text in the code is only a fallback).
New: `app/(website)/page.tsx` → `content/home.ts`.

| Section | Old site | Old content (live Sanity) | New site | New content / source |
|---|---|---|---|---|
| SEO: meta title, description, keywords, share image | ✅ | `homePage.seo`: "Outsourced Finance & Accounting Services - Xconcile" | ❌ | `content/home.ts` (different wording) |
| Hero: title, highlight, description, images, stats | ✅ | "Outsourced Accounting Services for US Business"; stats 1,000+ / $50M+ / 99.9% | ❌ | Figma copy |
| Trust stats / Stats bar | ✅ | 1,000+ / 15+ Years / 24/7 | ❌ | Static `StatsBar` |
| Introduction: title, body, image, button | ✅ | "Empowering US Businesses with Outsourced Accounting Services" | ❌ | Static `Intro` |
| Features (4 items) | ✅ | Extended Team, Complete Partnership, Clarity, Room to Grow | — | Not in the new design (replaced by Challenges + Services) |
| Challenges | — | — | ❌ | Static |
| Services accordion | — | — | ❌ | Static (`docs/content/Home page (1).txt`, 7 items) |
| Case studies | — | — | ❌ | Static |
| Process | — | — | ❌ | Static |
| Industries | — | — | ❌ | Static |
| Why choose | — | — | ❌ | Static |
| Testimonials (quotes) | ✅ | 3 quotes, all signed "CPA firm" | ❌ | Figma testimonials |
| Success-story videos | ✅ | YouTube `Mu0O-qTK1jo` (stored twice) | ❌ | Static, inside the Testimonials section |
| Partners / Tools logos | ✅ | 10 logos (ADP, Zoho, Xero, Paychex, UltraTax, Drake, QuickBooks, ProSeries, …) | ❌ | Static `Tools` section with the Figma logos |
| Blog heading | ✅ | "Explore Our Latest Resources" | ❌ | Static |
| Blog cards | ✅ | Latest 3 `post` documents | ✅ | `getLatestPosts(3)` in `blog-teaser.tsx` |
| FAQ | ✅ | `homePage` FAQ title + 10 questions | ❌ | Static, from `docs/content/Home page (1).txt`. Only 2 questions overlap with Sanity |
| Contact form | ❌ | Form in the code. Submissions saved to Sanity `contactSubmission` | ❌ | Form in the code. Submissions saved to Sanity `contactSubmission` (server action `submit-lead.ts`) |

---

## 4. Audit Outsourcing Services (`/audit-outsourcing-services`)

Old: `app/(website)/[slug]/page.tsx` → `services/[slug]/page.tsx` → `service` document.
New: `app/(website)/[slug]/page.tsx` → `content/services/audit-outsourcing-services.ts`, merged with a few Sanity fields by `lib/service-page.ts`.

| Section | Old site | Old content (live Sanity) | New site | New content / source |
|---|---|---|---|---|
| Meta title | ✅ | `seo.metaTitle`: "Outsourced Audit & Assurance Support Services - Xconcile" | ✅ | Same field. The "- Xconcile" suffix is removed, then the template adds "\| Xconcile" |
| Meta description | ✅ | `seo.metaDescription`: "Audit outsourcing support for CPA firms, including workpaper preparation…" | ✅ | Same field |
| Meta keywords | ✅ | `seo.metaKeywords` (7 keywords) | ❌ | Not output (search engines ignore it) |
| Share (OG) image | ⚠️ | `seo.openGraphImage`: **empty**, so the default image is used | ⚠️ | Same field, also empty, so the default `/og-image.png` is used |
| Hero title | ✅ | `title`: "Audit Outsourcing Services" | ❌ | Figma copy: "Audit Outsourcing Services for CPA Firms & Businesses" |
| Hero description | ✅ | `longDescription`: "Strengthen your audit practice with expert audit outsourcing…" | ❌ | Figma copy |
| Hero badge + check items | — | — | ❌ | Static ("Trusted by 500+ USA Accounting Firms", …) |
| Hero button | ⚠️ | `heroCTA`: **empty**, so the code fallback "Schedule Free Consultation" → `/contact` is used | ❌ | Static: "Get expert audit support" (Calendly popup) + "Explore Our Services" (scrolls to `#services`) |
| Hero images | ✅ | `heroBackgroundImage`, `heroImage` (both set) | ❌ | No photo in the new design: decorative SVG (`/images/home/hero-x.svg`) in `hero.tsx` |
| Stats | ✅ | `introStats`: 40-50% Cost Reduction / 100% GAAS Compliant / First Time Review Ready | ❌ | Static `StatsBar` |
| Intro title + text | ✅ | `introTitle`: "Comprehensive Audit & Assurance Support Services" + `introContent` | ❌ | Figma copy |
| Intro image | ✅ | `image` (alt "Audit & Assurance") | ✅ | Same field (`image` + alt + size). Fallback: repo image |
| Challenges | — | — | ❌ | Static |
| Services accordion: area names, subtitles, task lists | ✅ | `serviceAreas` (5 areas: Audit Planning & Risk Assessment, Substantive Testing & Execution, Internal Control & Compliance Testing, Financial Statement Preparation & Finalization, Specialized Audit Support) | ✅ | Same field: `name` → title, `focus` → subtitle, `sections[].tasks` → task groups. Icons are in the code |
| Services section heading | ❌ | "Comprehensive Service Delivery" in the code | ❌ | Static |
| Mid-page CTA | ⚠️ | `introCTA`: **empty**, so the code fallback "Ready to Get Started?" / "Request a Quote" is used | — | Not in the new design |
| Case studies | — | — | ❌ | Static |
| Process steps | ✅ | `process`: 4 steps (Engagement Setup & Planning, Substantive Testing, Control Testing & Documentation, Finalization & Delivery) | ❌ | Static Figma steps |
| Industries | — | — | ❌ | Static |
| Why choose: items | ✅ | `whyChooseUs`: 5 items (40–50% Reduction in Labor Costs, Reclaimed Staff Efficiency, …) | ❌ | Static |
| Why choose: image | ✅ | `whyPartnerImage` (set) | ❌ | Static |
| Why choose: image label + tagline | ⚠️ | **Empty**, so the code fallbacks "Innovation Partner" / "Driving performance through…" are used | — | Not in the new design |
| Why choose: button | ⚠️ | `whyChooseCTA`: **empty**, so the code fallback "Talk to an Expert" is used | — | Not in the new design |
| Tools tabs | — | — | ❌ | Static |
| Testimonials | ✅ | `testimonials`: 4 quotes, all signed "CPA firm", no company | ❌ | Static (shared with Home) + videos |
| Blog cards | — | — | ✅ | Latest 3 `post` documents |
| FAQ | ✅ | `faqs`: 6 questions ("What audit software do you support?", "Are you GAAS and PCAOB compliant?", …) | ❌ | Static, 5 different questions ("What are audit outsourcing services?", …). None overlap with Sanity |
| Final CTA band | ⚠️ | `finalCTA` is fetched but not shown on the old page | ❌ | Static `CtaBand` |
| Inquiry form | ❌ | Form in the code. Submissions saved to Sanity `contactSubmission` via `/api/contact` | — | No form on service pages (client decision). Buttons open the Calendly popup |
| JSON-LD (Service, Breadcrumb, FAQ, Video) | — | — | ❌ | Built from the repo content (the Service description uses the Sanity meta description) |

---

## 5. 404 page

| Element | Old site | Old source | New site | New source |
|---|---|---|---|---|
| Heading, text, button | ❌ | "404 / Page Not Found / The page you're looking for doesn't exist…" in `not-found.tsx` | ❌ | `content/not-found.ts` (Figma copy + illustration) |
| Meta title | ❌ | "Page Not Found" in the code | ❌ | `content/not-found.ts` |
| Header + footer | ✅ | See §2 (Sanity menu, footer lists, settings) | ⚠️ | See §2 (only footer description + social links from Sanity) |

---

## 6. Sanity fields that the new site doesn't show

These can still be edited in `/studio`, but changes won't appear on the new site (they still affect the live old site, which reads the same dataset):

| Document | Fields not used by the new site |
|---|---|
| `homePage` | All fields: SEO, hero, trust stats, intro, features, testimonials, videos, partners, blog heading, FAQ |
| `service` (audit) | `title`, `longDescription`, hero images, `heroCTA`, `introTitle`, `introContent`, `introStats`, `introCTA`, `process`, `whyChooseUs`, `whyPartnerImage` + label/tagline, `whyChooseCTA`, `testimonials`, `faqs`, `finalCTA`, `seo.metaKeywords` |
| `settings` | `companyName` (the copyright uses the same value from the code) |
| `service` / `hireStaff` / `industry` lists | Header mega-menu and footer link columns (the new site uses `content/navigation.ts`) |

> **Note:** The new site reads Sanity through a cache. Studio edits only show after the Sanity webhook calls `/api/revalidate`, or after a redeploy.
