# Xconcile Website Redesign: Discovery Report

**Stack:** Next.js (App Router) · React · Sanity Studio · Tailwind CSS · shadcn/ui · mobile-first · SEO-first
**Sources:**
- New Figma exports in [pages svg, css & png](file:///usr/local/google/home/arshitj/Documents/xconcile/pages%20svg,%20css%20&%20png)
- The old repo [xconcile-website](https://github.com/xconcileinc-dot/xconcile-website), cloned to scratch
- Live [xconcile.com/sitemap.xml](https://xconcile.com/sitemap.xml), checked 2026-10-13

> [!IMPORTANT]
> No project code has been written yet. This report covers discovery and planning only. Section 9 lists the decisions you need to make before scaffolding.

---

## 1. Design Package Inventory

| Group | Pages | Desktop | Mobile |
|---|---|---|---|
| Global | Home, 404, System Theme Variables | 1440px | **Home only** (390px) |
| Services (7) | audit-outsourcing-services, outsourced-accounting-bookkeeping, outsourced-payroll-services, outsourced-tax-preparation, multi-state-sales-tax-compliance, outsourced-virtual-cfo-services, RCM | 1440px | none |
| Hire (5) | hire-dedicated-accounting-professionals *(main)*, hire-audit-assurance-staff, hire-payroll-staff, hire-tax-preparation-staff, hire-virtual-cfo | 1440px | none |
| Industries (6) | real-estate-accounting-services *(main)*, ecommerce-, healthcare-, hospitality-, it-technology-, professional-services-accounting-services | 1440px | none |
| Docs | `BASIC INSTRUCTION FOR THE WEBSITE.docx`, `Home/Home page (1).docx` | n/a | n/a |

**Requirements from the instruction docx**
- Blog content stays the same as the existing site.
- Contact page content will be supplied by the client.
- "Schedule a Meeting" opens Calendly **as a popup modal**, not as a separate URL.
- Add a **cookie consent** banner and a **back-to-top** arrow.
- "Explore our services" on every page scrolls to **that page's own services section** (anchor link), not to a services page.
- Service list items turn **green on hover**.
- Home docx: full copy for the 7 service accordion items (description, 6 key services, CTA) and 8 FAQ Q&As.

**Pages with no design yet:**
- About, Contact, Blog listing, Blog post, Team, Privacy Policy
- Services, Hire and Industries index pages
- Mobile layouts for every inner page

````carousel
![Home desktop: hero, stats, intro, challenges](/usr/local/google/home/arshitj/.gemini/jetski/brain/87fb37e2-7827-4b6a-9248-73257b019624/scratch/slices/Home/image_00.jpg)
<!-- slide -->
![Home desktop: services accordion, case-study tabs, process](/usr/local/google/home/arshitj/.gemini/jetski/brain/87fb37e2-7827-4b6a-9248-73257b019624/scratch/slices/Home/image_01.jpg)
<!-- slide -->
![Home desktop: industries, why choose, tools, video testimonials](/usr/local/google/home/arshitj/.gemini/jetski/brain/87fb37e2-7827-4b6a-9248-73257b019624/scratch/slices/Home/image_02.jpg)
<!-- slide -->
![Home mobile: services accordion expanded with key services](/usr/local/google/home/arshitj/.gemini/jetski/brain/87fb37e2-7827-4b6a-9248-73257b019624/scratch/slices/Home/mobile_02.jpg)
<!-- slide -->
![System theme: typography and colors](/usr/local/google/home/arshitj/.gemini/jetski/brain/87fb37e2-7827-4b6a-9248-73257b019624/scratch/slices/System-Theme-Variables/theme_00.jpg)
````

---

## 2. Design Tokens (from the theme board and Figma CSS)

### Colors
| Token | Value | Notes |
|---|---|---|
| primary | `#6ABE52` | buttons, accents, numbers |
| primary-light | `#F3F8F2` | badges, active tab background |
| primary-md | `#E7F6E2` / icon tile `#E9F5E3` | icon chips |
| primary-border | `rgba(106,190,82,.2)` | badge border |
| heading | `#28272A` | drift: `#2A2D31` and `#000` also appear |
| body | `#54515C` | drift: `#4D5560` also appears |
| border | `#D5D4D8` | drift: `#D2D5DA` |
| hairline | `rgba(14,23,20,.078)` | card borders and dividers |
| surface-muted | `#FAFAFA` | grey section background |
| dark-gradient | `linear-gradient(270deg,#13212C,#173345)` | hero, Why Choose, videos, Home services |
| teal | `#165A6A` | CTA band |
| footer | `#012B35` | footer background |
| danger set | `#E11D48` / `#FF4B55` / `#FFE4E6` / `#FFF9FA` | Security section |
| challenge tints | rose `#FFF9FA`, amber `#FFFDF7`, blue `#F9FBFF`, purple `#FDFBFF` | challenge cards |
| status | Danger, Success, Warning, Info, Extra (purple) | from the theme board |

> [!WARNING]
> **Accessibility.** The brand green `#6ABE52` against white has a contrast ratio of **2.3:1**. That fails WCAG AA for both normal text (4.5:1) and large text (3:1). It affects the white labels on green buttons and the green text links and numbers. Lighthouse accessibility scores will drop. Options:
> - Use a darker "text green" around `#3A7D27` (5.1:1) for text and links.
> - Or put dark text `#13212C` on green buttons (about 7:1).
>
> This needs the designer's sign-off.

### Typography
**Fonts used in the files:**
- **Manrope** is the primary font.
- **Outfit** appears in the footer, process card titles and blog titles.
- Hanken Grotesk appears only on the theme board.
- Inter shows up occasionally on the hire pages. Figtree appears once.
- Recommendation: load only **Manrope (plus Outfit if approved)** with `next/font`, for performance.

| Style | Desktop | Mobile |
|---|---|---|
| H1 | 56/72 · 700 | 36/42 |
| H2 | 40/48 · 700 (the theme board says 40/56) | 28/36 |
| H3 / Extra 1 | 24/32 · 600 (the theme board says H3 20/28) | 18/28 |
| H4 | 24/32 · 700 | n/a |
| H5 (card title) | 20/28 · 600 | n/a |
| H6 / lead | 18/28 · 500 | n/a |
| Body B3 / B1 / B2 | 18/28 · 16/24 · 14/20 (500) | n/a |

### Spacing and radius
- **Spacing scale:** 2, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 80px.
- **Layout:** 1440 canvas with a content container of about 1296–1304px (72px gutters). Sections are about 80px apart.
- **Radius:** cards and images 8px; pill buttons, badges and tabs 30–35px; nav dropdown 16px.

---

## 3. Reusable Component Library

### 3.1 Global / layout
| Component | Purpose | shadcn base |
|---|---|---|
| `SiteHeader` | Desktop: floating dark pill nav with mega dropdowns (Services, Hire Experts, Industries, Resources, Company) and a "Schedule a Meeting" CTA. Mobile: white bar with the colored logo and a hamburger. | NavigationMenu, Sheet |
| `SiteFooter` | Brand blurb, email/phones, certification badges, 4 link columns, social icons, India/USA office cards, copyright | Separator |
| `CalendlyModal` | Popup scheduler triggered by every "Schedule a Meeting" CTA (lazy-loaded) | Dialog |
| `CookieConsent` | Consent banner linked to GTM Consent Mode v2 | Sheet/Card |
| `BackToTop` | Floating scroll-to-top arrow | Button |
| `Section` + `Container` | Background tone (white / muted / dark / teal / image) and spacing | cva |
| `SectionHeading` | Badge + H2 (with optional green highlight span) + subtitle; `align=center\|left`, `tone=light\|dark` | n/a |

### 3.2 Section blocks (become Sanity page-builder blocks)
| # | Block | Variants / props |
|---|---|---|
| B1 | `Hero` | Dark gradient with X watermark. Fields: badge, H1 with highlight, subtitle, 1–2 CTAs, 2–3 trust checks |
| B2 | `StatsTrustBar` | 4 stats plus ISO seal and Google rating |
| B3 | `FeatureStrip` | 4 small icon cards under the hero |
| B4 | `IntroSplit` | Image + rich text + optional mini feature cards + checklist (`vertical\|row\|2col`, `plain\|pill`) + CTA |
| B5 | `ChallengesSplit` | Sticky left heading + stacked cards. Card styles: `tinted` (rose/amber/blue/purple) or `white`; titles optional (RCM has none); becomes a snap carousel on mobile |
| B6 | `NumberedAccordion` | Number + icon + title + subtitle + "+" toggle. `tone=light\|dark`, `showMore` count. Expanded state holds description, key services and CTA (Home mobile shows this) |
| B7 | `CardGrid` | Hire "expertise" / Industry "services". Variants: `light-3col`, `light-4col`, `dark-tile-3col` |
| B8 | `CaseStudyTabs` | Pill tab bar → challenge/solution/result + image. The mobile design adds a stat overlay ("Workload Impact 42% Reduced") |
| B9 | `ProcessSteps` | 5 horizontal cards (icon + big faded number + title + text) |
| B10 | `HiringTimeline` | Vertical 5-step timeline + photos + avatar-stack proof card + 3 trust checks |
| B11 | `IndustriesGrid` | Cards with title, arrow, description and image. `count=4\|8`, optional "Explore More" |
| B12 | `WhyChooseUs` | Feature grid (2 columns) + 4-photo mosaic + 4-stat panel. `tone=dark\|light` |
| B13 | `ToolsShowcase` | `grid` (Home logo tiles) or `tabs` (vertical category tabs + logo chips) |
| B14 | `VideoTestimonials` | Main player + thumbnail carousel with prev/next |
| B15 | `BlogTeaser` | 3 latest/selected posts + "Explore all blogs" |
| B16 | `FAQSplit` | Left heading + right accordion (FAQPage JSON-LD) |
| B17 | `ContactFormSection` | "Ready to Simplify Your Accounting?" + 3 checks + lead form |
| B18 | `CTABand` | `teal` / `image-overlay`, 1–2 buttons |
| B19 | `SecurityGrid` | Large feature card + 2×2 numbered cards, optional ISO seal |
| B20 | `EngagementModels` | 3 pricing-style cards, featured middle card with "Most Popular" |
| B21 | `ExperienceLevels` | Junior / Mid / Senior role cards with responsibilities |
| B22 | `AudienceCards` | 3 image cards with a "Get Started" button |
| B23 | `NotFound` | Illustration + message + "Back to Home" |

### 3.3 Where each block is used
| Block | Home | Services (7) | Hire (5) | Industries (6) |
|---|:-:|:-:|:-:|:-:|
| Hero | ✓ | ✓ | ✓ | ✓ |
| StatsTrustBar | ✓ | ✓ | n/a | n/a |
| FeatureStrip | n/a | n/a | ✓ | ✓ |
| IntroSplit | ✓ (mini cards + pill checks) | ✓ | ✓ (CFO: row) | ✓ (Healthcare: 2col) |
| ChallengesSplit | ✓ tinted | ✓ tinted (RCM: no titles) | ✓ white "Benefits" | ✓ white "Challenges" |
| NumberedAccordion | ✓ dark + show more | ✓ light (Audit: dark) | n/a | ✓ sub-industries (Healthcare: show more) |
| CardGrid | n/a | n/a | ✓ light-3col (main: dark) | ✓ light-4col / dark-tile |
| CaseStudyTabs | ✓ | ✓ | n/a | n/a |
| ProcessSteps | ✓ | ✓ | n/a | n/a |
| HiringTimeline | n/a | n/a | ✓ | n/a |
| IndustriesGrid | ✓ (4) | ✓ (8) | n/a | n/a |
| WhyChooseUs | ✓ dark | ✓ dark | ✓ dark | ✓ dark (IT: light) |
| ToolsShowcase | ✓ grid | ✓ tabs (not on CFO, RCM) | ✓ tabs | n/a |
| VideoTestimonials | ✓ | ✓ | n/a | n/a |
| BlogTeaser | ✓ | ✓ | n/a | n/a |
| SecurityGrid | n/a | n/a | ✓ | ✓ (Real Estate: ISO) |
| EngagementModels / ExperienceLevels / AudienceCards | n/a | n/a | ✓ | n/a |
| FAQSplit | ✓ | ✓ | ✓ | ✓ |
| ContactFormSection | ✓ | n/a | n/a | n/a |
| CTABand | n/a | ✓ teal (Audit: image) | ✓ teal (main: image) | ✓ teal (Real Estate: image) |

**Result:**
- **23 blocks cover all 22 designs.**
- Each page family follows one fixed section order, so we need **4 templates**: Home, Service, Hire, Industry.
- Every template is a configurable list of the shared blocks.

### 3.4 Atomic components
| Atom | Variants |
|---|---|
| `Button` | `primary-arrow` (pill, 48h, white circle with ↗), `primary`, `outline`, `outline-full`, `ghost-pill` ("Show more (3) ⌄"), `link-arrow` ("Read more →"), size `sm` (nav) |
| `Badge` (eyebrow) | `light`, `dark` (translucent), `danger` |
| `Tag` / `Chip` | level (Junior/Mid/Senior), "★ Most Popular", rating chip, number chip "01", logo chip, floating label |
| `IconTile` | green, tinted (rose/amber/blue/purple), dark, red circle |
| `Card` | feature-sm, list, service, dark tile, pricing, role, image, security, blog, industry, case-study |
| `CheckItem` | plain, pill (Home), bold-lead, on-dark |
| `StatItem` | number + label, with dividers |
| `AccordionRow` | FAQ, numbered |
| `Tabs` | horizontal pill, vertical |
| Others | `StepItem`, `AvatarStack`, `ImageMosaic`, `LogoTile`, `CarouselNav`, `SocialIconButton`, `OfficeCard`, `CertBadge`, form `Input` / `Select` / `Textarea` / `Label` |

> [!NOTE]
> **Breadcrumbs:** no design includes them. I recommend adding a small breadcrumb row to inner page heroes, with BreadcrumbList JSON-LD, for SEO.

### 3.5 Mobile-first patterns (from the Home mobile design, applied to every page)
- Hero:
  - H1 drops from 56 to 36px.
  - CTAs become full-width pills with the arrow.
  - Trust checks wrap.
- Stats go to a 2×2 grid with a badge row underneath.
- Challenges become a horizontal snap carousel with a progress bar.
- The services accordion opens inline with "Key services" and a full-width CTA.
- Tab bars scroll horizontally. Vertical tool tabs turn into an accordion or chip scroller.
- Grids collapse: 4 columns go to 2, then to 1.
- Process steps and blog cards become snap carousels.
- The Why Choose mosaic is simplified.
- Footer columns stack.

> [!CAUTION]
> **Content parity.** On the Home page, the desktop and mobile designs use **different copy**: the intro H2 is "Your Accounting Team, Without the Overhead" on desktop and "Accounting Support for Growing U.S. Businesses" on mobile, and the case-study image differs. Google indexes the mobile version first, and the site must render **one DOM** for all breakpoints. Pick one copy set per section.

---

## 4. Design Issues to Raise with the Designer / Content Team

| Area | Issue |
|---|---|
| Hire main | The `hire-dedicated-accounting-professionals` PNG is a **copy of the audit page**. The CSS has the real copy, but its dark grid is titled "Hospitality Accounting & Bookkeeping Services" |
| Hire | Payroll benefits use audit copy. Middle engagement card numbered "01". "MID LEVEL" tag appears twice. "Developers hired last week" left over |
| Services | **Tax** page hero and challenges use audit copy. **Payroll** has sales-tax copy and an "Audit Expert" CTA. **RCM** is mostly vCFO copy, with "IOGO", "HIPPA" and "Majojr" typos. Bookkeeping FAQ 7 duplicates FAQ 6 |
| Industries | Real Estate says "Why Healthcare Businesses Choose **Conxicle**". IT hero badge says E-commerce. Ecommerce sub-industries use professional-services copy. Numbering runs 01, 02, 03, 04, 04 |
| Home | Case-study body contains a designer note ("If this section is meant to showcase multiple case studies…"). The "CPA & Accounting Firms" industry card has manufacturing copy and photo. The Testimonials subtitle is copied from the tools section. The form textarea is labelled "Company" with placeholder "Your name". The mobile footer shows `hello@yourbrand.com` |
| Data | Conflicting claims: "Trusted by 1,000+ U.S. Accounting Firms", "500+", "1K+ Businesses", "98% Client Satisfaction" vs "98% Reconciliation Accuracy". The Why Choose stats are identical on every page |
| Tokens | Two heading colors, two body colors and two border colors. Inline links show in default blue/purple (illegible on dark backgrounds) |
| Layout | Large gaps above the CTA (Payroll, Sales Tax, CFO, RCM). Tax and Professional Services footers are offset. RCM accordion item 06 has no toggle |
| States | No designs for: accordion open state, hover states, nav dropdown content, form validation/success, cookie banner, Calendly modal |
| Copy | "Lets Discuss Project" is missing its apostrophe. "Navesink **Tex**" should be "Tax". "Tax  Expertise" has a double space |

---

## 5. Old Repo Audit: Sanity Integration and APIs

### 5.1 Stack (old)
- Next `^16.1.1`, React `^19.2.3`, TypeScript 5.9.
- Sanity `^5.3.0`, next-sanity `^12.0.12`, `@sanity/image-url`, `@portabletext/react`.
- **Tailwind v3**. No shadcn.
- Embla carousel, `react-calendly`, `@vercel/speed-insights`.
- Microsoft Graph email via Azure.
- `next lint` script (removed in Next 16, so it is broken).

### 5.2 Sanity setup
- **Environment variable names:**
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` (default `2024-01-01`)
  - `SANITY_API_TOKEN` (write)
  - `NEXT_PUBLIC_SITE_URL`
  - `ADMIN_EMAIL`, `GRAPH_MAILBOX`, `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`
  - `NEXT_PUBLIC_CALENDLY_URL`
- Studio is embedded at **`/studio`**. Plugins: `structureTool` (default structure) and `visionTool`.
- The read client uses `useCdn: false` and `perspective: 'published'`. There is no token, no `sanityFetch`, and no cache tags.
- **Not used:**
  - The image URL builder (queries return raw `asset->url`, so hotspot/crop, LQIP and dimensions are lost)
  - Draft mode, Presentation / Visual Editing, Live, webhook revalidation

### 5.3 Schemas
| Type | Kind | Notes |
|---|---|---|
| `homePage`, `aboutPage`, `contactPage`, `blogPage`, `privacyPolicy`, `settings` | intended singletons, **not enforced** | queried with `[0]` |
| `service`, `industry`, `hireStaff` | collections | 30+ flat fields each, mostly duplicated across the three |
| `post` | collection | `author` is a string, `publishedAt` is a date, body is blocks only (no images or embeds), FAQs inline |
| `teamMember` | collection | ordered |
| `contactSubmission`, `newsletterSubscription` | written by the API | **keep, so existing leads are preserved** |
| Objects | n/a | `seo` (no canonical or noindex), `cta` (link is a string), `faq` (plain-text answer), `stat`, `feature` (no icon), `processStep`, `testimonial` (no photo), `finalCtaSection` |

**Schema problems:**
- **No `reference` fields at all.** Testimonials and FAQs are copied onto every page.
- No slug uniqueness across `service` and `hireStaff`, even though both live at `/:slug`.

### 5.4 GROQ queries ([queries.ts](file:///usr/local/google/home/arshitj/.gemini/jetski/brain/87fb37e2-7827-4b6a-9248-73257b019624/scratch/old-repo/lib/sanity/queries.ts))
**Active queries:**
- Posts: `getAllPosts`, `getPostBySlug`, `getAllPostSlugs`
- Services: `getAllServices`, `getServiceBySlug`, `getAllServiceSlugs`
- Industries: `getAllIndustries`, `getIndustryBySlug`, `getAllIndustrySlugs`
- Hire staff: `getAllHireStaff`, `getHireStaffBySlug`, `getAllHireStaffSlugs`
- Pages: `getHomePage`, `getAboutPage`, `getContactPage`, `getBlogPage`, `getSettings`
- Team ([teamQueries.ts](file:///usr/local/google/home/arshitj/.gemini/jetski/brain/87fb37e2-7827-4b6a-9248-73257b019624/scratch/old-repo/lib/sanity/teamQueries.ts)): `getAllTeamMembers`
- Inline: privacy policy, sitemap, newsletter

**Dead queries:**
- `getServicesPage`, `getIndustriesPage`, `getHireStaffPage` query schema types that don't exist.
- `getAllCategories` uses the legacy category field.
- `features` and `testimonial` are projected on list queries but don't exist in the schema.

**Querying and caching:**
- No `defineQuery` and no typegen, so most types are `any`.
- Caching is route-level `revalidate = 60` everywhere.

### 5.5 API endpoints
| Endpoint | Method | Does | Issues |
|---|---|---|---|
| `/api/contact` | POST `{name,email,phone,company,service,message,pageUrl}` | Saves a `contactSubmission` to Sanity, then emails the admin via MS Graph | No rate limit, captcha or honeypot. **HTML injection** (only `message` is escaped). A bad `pageUrl` returns a 500 after the save, so users resubmit and create duplicates. Service options don't match between schema and email |
| `/api/newsletter` | POST `{email}` | Creates or reactivates a `newsletterSubscription` | No rate limit. Reveals whether an email is subscribed. No double opt-in or unsubscribe |
| `/api/navigation` | GET | Supplies mega-menu data to the client | `revalidate = 0` + no CDN, so **every page view calls Sanity**. Nav links only appear after JS runs, and `/api/` is blocked in robots.txt |
| `/sitemap.xml` | n/a | `sitemap.ts` built from Sanity slugs | `/contact` missing. `lastModified = now()` |
| `/robots.txt` | n/a | static file in `public/` | n/a |
| `/llms.txt` | n/a | route, live but only a 2-line stub | n/a |

### 5.6 SEO state (old)
- Only an **Organization** JSON-LD, with **fake data** (phone `+1-555-0123-4567`, a New York placeholder address).
- Breadcrumb and Article schema helpers exist but are never used.
- No FAQPage, Service, BlogPosting, LocalBusiness or WebSite schema.
- Generic root description ("Strategic B2B partnerships… consulting"). Google verification is duplicated. `/meeting` has no metadata.
- The `/solutions` placeholder page links to `/services`, which returns a 404.
- **Keep:** GTM `GTM-WRRFT9ZZ`, Google site verification, Zoho SalesIQ, Calendly, Speed Insights.

### 5.7 Old components
| Decision | Components |
|---|---|
| Port the logic | Footer data, PortableText (extend it), video slider (YouTube parsing), ReadingProgress |
| Replace with shadcn | Header / MobileMenu (NavigationMenu + Sheet), Button, Card, FAQ / accordions, Breadcrumb, TestimonialSlider (Carousel), ExperienceTabs |
| Rebuild with react-hook-form + zod + server action | ContactForm, ServiceInquiryForm (merge into one LeadForm) |
| Delete (dead code) | `lib/services.ts`, `industries.ts`, `hire-staff.ts`, `theme.ts`, `mailer.ts`, `customerEmail.ts` |

---

## 6. URL Inventory and Redirect Map

**Live sitemap:**
- 88 URLs: 1 home, 6 services, 5 hire pages, 6 industries, about, team, privacy, blog index and **about 66 blog posts**.
- `/contact` and `/meeting` exist but are missing from the sitemap.

| New design page | Current live URL | Status |
|---|---|---|
| Home | `/` | same |
| audit-outsourcing-services | `/audit-outsourcing-services` | **exact match** |
| outsourced-tax-preparation | `/outsourced-tax-preparation` | **exact match** |
| outsourced-accounting-bookkeeping | `/outsourced-accounting-and-bookkeeping` | slug differs |
| outsourced-payroll-services | `/outsourced-payroll-and-compliance-services` | slug differs |
| multi-state-sales-tax-compliance | `/multi-state-sales-and-use-tax-compliance` | slug differs |
| outsourced-virtual-cfo-services | `/outsourced-virtual-cfo-and-fp-and-a` | slug differs |
| RCM | none | **new** |
| hire-tax-preparation-staff | `/hire-tax-preparation-staff` | **exact match** |
| hire-dedicated-accounting-professionals | `/hire-bookkeeper-accountant` | slug differs |
| hire-audit-assurance-staff | `/hire-audit-and-assurance` | slug differs |
| hire-payroll-staff | `/hire-payroll-and-compliance` | slug differs |
| hire-virtual-cfo | `/hire-virtual-cfo-and-fp-and-a` | slug differs |
| real-estate-accounting-services | `/industries/real-estate-construction` | slug and prefix differ |
| healthcare-accounting-services | `/industries/medical-health` | slug and prefix differ |
| hospitality-accounting-services | `/industries/hospitality-retail` | slug and prefix differ |
| professional-services-accounting-services | `/industries/professional-services` | prefix differs |
| ecommerce-accounting-services | `/industries/tech-ecommerce` | split |
| it-technology-accounting-services | `/industries/tech-ecommerce` | split (**new**) |
| none in the design | `/industries/industrial-niche` | needs a redirect target |
| none in the design | `/about`, `/team`, `/blog/*`, `/privacy-policy`, `/contact`, `/meeting` | keep (designs pending) |

> [!TIP]
> **SEO recommendation:** keep the existing live slugs wherever a page already exists, because they hold the current rankings and backlinks. The Figma folder names look like working labels.
> - If you do adopt the new slugs, every change needs a **single-hop 301**.
> - Collapse the existing `/services/*` and `/hire-staff/*` → `/:slug` rules so they don't chain.
> - Manage redirects as a Sanity `redirect` document.

---

## 7. Proposed Sanity Architecture (new)

**Content model**
- **Singletons**, enforced with fixed IDs, a custom desk structure and restricted actions:
  - `homePage`, `siteSettings` (NAP, socials, certifications, offices, default SEO), `navigation`
  - `contactPage`, `blogPage`, `privacyPolicy`
- **Page documents:** `servicePage`, `hirePage`, `industryPage`, plus a generic `page` for About and similar.
  - Each has `slug` (unique across all types), `seo`, and `sections[]` built from blocks B1–B23.
- **Reusable referenced documents:**
  - `testimonial` (with video), `faq`, `caseStudy`, `tool` (logo + category)
  - `teamMember` (also serves as blog author, with credentials for E-E-A-T)
  - `post`, `redirect`
- **Upgraded objects:**
  - `seo`: title, description, OG image, canonical, noindex
  - `link`: internal reference or external URL
  - `image`: required alt, hotspot
  - `richText`: blocks + images + callouts; author h1 is rendered as h2

**Data layer**
- `defineQuery` + `sanity typegen` for fully typed results.
- `defineLive` / `sanityFetch` with cache tags.
- Image pipeline: `@sanity/image-url` + `next/image` + LQIP.
- Draft Mode + Presentation tool + Visual Editing for editors.

**New endpoints**
| Endpoint | Purpose |
|---|---|
| `/api/revalidate` | Sanity webhook, verified with `parseBody` + a secret, then `revalidateTag` |
| `/api/draft-mode/enable`, `/disable` | preview |
| Server actions | `submitLead`, `subscribeNewsletter`. Add zod validation, honeypot, Turnstile, rate limiting and escaped email HTML. Return success once Sanity has saved, even if the email fails |
| `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt` | generated from Sanity, using `_updatedAt` |
| `opengraph-image.tsx` | branded OG images per route |

**Migration**
- Write a `defineMigration` script that maps the old flat fields into `sections[]`.
- Plain-text FAQs and features need to become rich text.
- De-duplicate testimonials into their own documents.
- Change `post.author` from a string to a reference.
- Keep the existing `contactSubmission` data.
- New copy is needed for RCM, Multi-state Sales Tax (redesigned) and IT/Technology.

---

## 8. SEO: Agent Skills, MCP Servers and Checklist

All repos below were **verified via the GitHub API on 2026-10-13**: they exist, have the stated stars and were pushed recently. Skill folder names come from each repo's `SKILL.md` files.

### 8.1 Recommended skills
| Tier | Repo (★) | Skills to use | Install |
|---|---|---|---|
| 1 | [sanity-io/agent-toolkit](https://github.com/sanity-io/agent-toolkit) (188) | `seo-aeo-best-practices`, `sanity-best-practices`, `content-modeling-best-practices`, `sanity-singletons`, `sanity-migration`, `portable-text-serialization`, `sanity-studio-upgrade` | `npx skills add sanity-io/agent-toolkit` |
| 1 | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) (2.9k) | `seo`, `core-web-vitals`, `performance`, `accessibility`, `best-practices`, `web-quality-audit` | `npx skills add addyosmani/web-quality-skills` |
| 1 | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (54k) | `seo-audit`, `schema`, `site-architecture`, `ai-seo`, `programmatic-seo`, `copywriting`, `content-strategy` | `npx skills add coreyhaines31/marketingskills --skill seo-audit` (repeat per skill) |
| 1 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (32k) | `react-best-practices`, `composition-patterns`, `web-design-guidelines` | `npx skills add vercel-labs/agent-skills` |
| 1 | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) (125k) | `shadcn` | `npx skills add shadcn-ui/ui --skill shadcn` |
| 2 | [vercel/next.js `skills/`](https://github.com/vercel/next.js/tree/canary/skills) | `next-cache-components-adoption`, `next-cache-components-optimizer`, `next-bundle-optimizer`, `next-partial-prefetching-*`, `next-dev-loop` | `npx skills add vercel/next.js` |
| 2 | [anthropics/skills](https://github.com/anthropics/skills) (181k) | `frontend-design`, `webapp-testing` | `npx skills add anthropics/skills --skill frontend-design` |
| 3 | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) (18.8k) | `seo-technical`, `seo-schema`, `seo-local`, `seo-geo`, `seo-sitemap`, `seo-images` | Install selectively. It overlaps heavily with Tier 1 |

> [!NOTE]
> `vercel-labs/next-skills` (`next-best-practices`) is **deprecated**. Since Next.js 16.3+, that guidance ships inside the framework's bundled docs and the `AGENTS.md` / `CLAUDE.md` files that `next dev` generates. The skills CLI itself is [vercel-labs/skills](https://github.com/vercel-labs/skills) (34k★).

### 8.2 MCP servers
| MCP | Use | Status |
|---|---|---|
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) (53k) | Real LCP/INP/CLS traces, rendered metadata checks | verified |
| [upstash/context7](https://github.com/upstash/context7) (63k) | Current docs for Next 16, Tailwind v4, next-sanity, shadcn | verified |
| [vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp) (828) | Next.js routes, errors, docs | verified |
| shadcn MCP (`npx shadcn@latest mcp init`) | Component and block registry | ships with the shadcn CLI |
| Sanity MCP (`npx sanity@latest mcp configure`) | Schema and document operations, GROQ | **command not verified**. Confirm in the Sanity docs |

**Latest public npm versions (2026-10-13):**
- next 16.4.0, sanity 6.18.0, next-sanity 13.3.4, tailwindcss 4.3.3, shadcn 4.21.4
- The local npm registry returns **outdated versions** (next 15.4, sanity 3.97). Point installs at `registry.npmjs.org` or update the mirror.

### 8.3 Technical SEO checklist for this build
**Rendering**
- [ ] All marketing pages are SSG (`generateStaticParams`), refreshed by tag-based on-demand revalidation.
- [ ] Nav and footer are rendered on the server (drop the client `/api/navigation` fetch).
- [ ] Accordion, tab and carousel content is always in the HTML, never fetched on interaction.

**Metadata**
- [ ] Set `metadataBase`, a `%s | Xconcile` title template, and `generateMetadata` driven by the Sanity `seo` field.
- [ ] Self-referencing canonical, one host, one trailing-slash policy.
- [ ] `lang="en-US"`.
- [ ] Preview/staging deployments are `noindex`.

**Headings**
- [ ] One H1 per page.
- [ ] Badges and eyebrows are `<p>`, not headings. Faded step numbers are decorative.
- [ ] H2 per section, H3 per card.

**Structured data**
- [ ] `Organization` + `ProfessionalService`/`AccountingService` with the real NAP for the India and USA offices.
- [ ] `WebSite`.
- [ ] `Service` on service pages, `FAQPage` wherever FAQs appear, `BreadcrumbList` on inner pages.
- [ ] `BlogPosting` with a `Person` author and credentials.
- [ ] `VideoObject` for testimonials.

**Crawl files and redirects**
- [ ] `sitemap.ts` from Sanity using `_updatedAt` (add `/contact`).
- [ ] `robots.ts` disallowing `/studio` and `/api`, with an explicit AI-crawler policy.
- [ ] Full `llms.txt`.
- [ ] Single-hop 301 map. A real 404 status from `not-found.tsx`.

**Performance (mobile p75)**
- [ ] Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1, Lighthouse ≥ 90.
- [ ] Fonts: `next/font` with Manrope (+ Outfit), subset to Latin.
- [ ] Images: `next/image` + Sanity loader + LQIP. Only the hero image gets `priority`.
- [ ] Video: facade/lite embed. Never autoload the player.
- [ ] Third-party scripts: Calendly, Zoho SalesIQ and GTM load lazily or after consent.

**E-E-A-T (finance is a "Your Money or Your Life" topic for Google)**
- [ ] Author/reviewer bios with CPA/EA credentials. "Reviewed by" and "last updated" dates on posts.
- [ ] Real certifications: ISO 27001, Intuit, Xero.
- [ ] Remove all fake contact data.

**AI search (GEO / AEO)**
- [ ] Answer-first paragraphs under question-style H2s.
- [ ] Consistent company facts across pages and schema.
- [ ] Keep FAQ copy current.

**Accessibility**
- [ ] Fix green contrast.
- [ ] Visible focus states, keyboard support for tabs and accordions, labelled form fields.

---

## 9. Open Decisions (needed before scaffolding)

1. **URL strategy.**
   - Keep the live slugs (recommended), or move to the Figma slugs with 301s?
   - Keep or drop the `/industries/` prefix?
2. **Brand green contrast.** Approve a darker text/button green, or dark text on green buttons?
3. **Missing designs.**
   - About, Contact, Blog listing/post, Team, Privacy, index pages.
   - Mobile layouts for inner pages. Should we derive them from the Home mobile patterns?
4. **Copy fixes.** Who corrects the copy-paste errors in section 4: the designer or the content team in Sanity?
5. **Sanity.**
   - Reuse the existing project/dataset, or create a new dataset for the redesign?
   - Migrate old content with a script, or re-enter it?
6. **Fonts.** Manrope only, or Manrope + Outfit?
