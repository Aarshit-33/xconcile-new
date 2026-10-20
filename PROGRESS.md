# Xconcile new site: build progress

_Last updated: 2026-10-14_

Stack: Next.js 16 (App Router, Cache Components) · React 19 · Tailwind v4 · shadcn/ui · Sanity v6 · GSAP.
See [AGENTS.md](./AGENTS.md) for conventions and rules.

---

## 1. Pages

### Done

| Page | Route | Status |
|---|---|---|
| **Home** | `/` | ✅ Mobile-first (390 design) + desktop (1440 design), responsive 320–1920px, SEO + JSON-LD, animations |
| **404** | any unknown URL | ✅ Desktop matches the 1440 design. Mobile-first adaptation (no mobile design). Returns a 404 status with `noindex, follow` |
| **Audit Outsourcing Services** | `/audit-outsourcing-services` | ✅ Service template reference page. Figma copy; Sanity supplies SEO, intro image and the services accordion. Responsive 320–1920px (mobile follows the Home mobile patterns) |
| **Hire Dedicated Accounting Professionals** | `/hire-bookkeeper-accountant` (live slug) | ✅ Hire template reference page. Copy from the Figma SVG, editable in Sanity (`hirePage` document, Studio → Hire Pages; code is the fallback). Responsive 320–1920px (no mobile design: Home mobile patterns, card rails) |
| **Real Estate Accounting Services** | `/industries/real-estate-construction` (live slug) | ✅ Industry template reference page. Copy from the Figma SVG, editable in Sanity (`industryPage` document, Studio → Industry Pages; code is the fallback, seed: `scripts/seed-industry-sanity.ts`). Sub-Industries is an accordion; no Security section. Responsive 320–1920px |
| Sanity Studio | `/studio` | ✅ CMS admin (not a public page) |

Technical routes:

| Route | Purpose |
|---|---|
| `/robots.txt` | Disallows crawlers unless `NEXT_PUBLIC_SITE_ENV=production` |
| `/sitemap.xml` | Generated sitemap |
| `/api/revalidate` | Sanity webhook → cache revalidation |
| `app/actions/submit-lead.ts` | Contact form server action (Sanity + MS Graph email) |

### To do (designs available in `../pages svg, css & png/`)

Pages in the same group share one layout, so they need **3 templates**, not 18 separate builds.

| Template | Pages | Status |
|---|---|---|
| **Service** | Accounting & Bookkeeping, ~~Audit Outsourcing~~ ✅, Tax Preparation, Payroll, Virtual CFO, Multi-State Sales Tax, RCM | 🟨 Template done; 6 pages to add (one content file each) |
| **Hire** | ~~Dedicated Accounting Professionals~~ ✅, Audit & Assurance Staff, Tax Preparation Staff, Payroll Staff, Virtual CFO | 🟨 Template done; 4 pages to add (one content file each) |
| **Industry** | ~~Real Estate~~ ✅, Healthcare, E-commerce, Hospitality, IT / Technology, Professional Services | 🟨 Template done; 5 pages to add (one content file each) |

### No design yet (waiting on client)

About · Contact · Blog (index + post) · Team · Privacy Policy · Industries index

---

## 2. Components

### Site-wide (used on every page)

| Component | File | Notes |
|---|---|---|
| Header | `components/layout/site-header.tsx` | Mobile sticky white bar / desktop fixed pill (white logo on every page) |
| Desktop nav | `components/layout/desktop-nav.tsx` | Dropdown menus (shadcn NavigationMenu) |
| CTA pills | `components/shared/cta-pill.tsx` (`<CtaPill>`) + `cta-styles.tsx` | Solid arrow pills: hover swap (arrow slides left, #FFFFFF pill, green circle) |
| Mobile menu | `components/layout/mobile-menu.tsx` | Slide-out drawer (shadcn Sheet) |
| Footer | `components/layout/site-footer.tsx` | Links, contact, socials, auto copyright year |
| Cookie consent | `components/layout/cookie-consent.tsx` | Drives GTM Consent Mode |
| Back to top | `components/layout/back-to-top.tsx` | Client requirement |
| Calendly popup | `components/calendly/*` | "Schedule a Meeting" opens a modal, loads on demand |
| Lead form | `components/forms/lead-form.tsx` | react-hook-form + zod, honeypot, live status |

### Shared building blocks (reuse on inner pages)

| Component | File | Notes |
|---|---|---|
| Contact section | `components/shared/contact-section.tsx` | "Ready to Simplify…" + form |
| Section heading | `components/shared/section-heading.tsx` | Eyebrow + title + subtitle |
| CTA buttons | `components/shared/cta.tsx` | Solid / outline / outline-dark pills |
| Rail | `components/shared/rail.tsx` | Mobile card slider with green progress bar |
| Check item | `components/shared/check-item.tsx` | Green check list item / chip |
| Eyebrow | `components/shared/eyebrow.tsx` | Badge label above titles |
| Rich text | `components/shared/rich-text.tsx` | Inline links / bold in content strings |

### 404 page

| Part | File | Notes |
|---|---|---|
| Page | `app/not-found.tsx` | Server component, no client JS. Built on the shadcn Button |
| Copy | `content/not-found.ts` | From the 404 design |
| Illustration | `public/images/404/illustration.svg` | Extracted from the design SVG and optimised with svgo (17KB) |

### Service template

| Part | File | Notes |
|---|---|---|
| Route | `app/(website)/[slug]/page.tsx` | Live root-level slugs; unknown slugs return a real 404 |
| Template | `components/templates/service-page.tsx` | Section order from the design spec |
| Content | `content/services/*.ts` | One file per page + registry (`index.ts`) |
| Sanity merge | `lib/service-page.ts`, `getServicePageCms()` | SEO, intro image, `serviceAreas` → accordion |
| New sections | `components/sections/tool-tabs.tsx`, `cta-band.tsx` | Tools with category tabs; photo CTA band |
| Calendly CTAs | `components/calendly/schedule-cta.tsx` | Any CTA with `SCHEDULE_HREF` opens the popup |

### Hire template

| Part | File | Notes |
|---|---|---|
| Route | `app/(website)/[slug]/page.tsx` | Same root-level route as service pages; Service + Breadcrumb + FAQPage JSON-LD |
| Template | `components/templates/hire-page.tsx` | Spec §(2) order; 80px rhythm as in the Figma auto-layout |
| Content | `content/hire/*.ts` | One file per page + registry (`index.ts`), copy from the Figma SVG |
| New sections | `feature-strip.tsx` (B3), `card-grid.tsx` (B7 dark tiles), `engagement-models.tsx` (B20), `hiring-steps.tsx` (B10), `experience-levels.tsx` (B21), `audience-cards.tsx` (B22), `security-grid.tsx` (B19) | Built for reuse by the other Hire pages and the Industry template |
| Reused | Hero (`wide`), Intro, Challenges (`white` tone), WhyChoose, ToolTabs, Faq, CtaBand | New props have defaults, so Home/audit are unchanged |

### Industry template

| Part | File | Notes |
|---|---|---|
| Route | `app/(website)/industries/[slug]/page.tsx` | Live `/industries/:slug` URLs; unknown slugs 404; Service + Breadcrumb + FAQPage JSON-LD |
| Template | `components/templates/industry-page.tsx` | Spec §(3) order; the design's ~700px blank band above the CTA is treated as a placeholder |
| Content | `content/industries/*.ts` | One file per page + registry (`index.ts`), copy from the Figma SVG |
| New section | `sub-industries.tsx` | Numbered full-width rows (static: the design has no expanded content) |
| Reused | Hero, FeatureStrip, Intro, Challenges, CardGrid (green highlight title), WhyChoose, SecurityGrid (+ ISO `seal`), Faq, CtaBand | |

### Shared sections (`components/sections/`, used by Home and the templates)

| # | Section | File |
|---|---|---|
| 1 | Hero | `hero.tsx` |
| 2 | Stats bar (+ ISO / Google rating) | `stats-bar.tsx` |
| 3 | Intro ("Your Accounting Team…") | `intro.tsx` |
| 4 | Challenges | `challenges.tsx` |
| 5 | Services accordion | `services.tsx`, `services-accordion-list.tsx` (desktop: no item highlighted until the user interacts; client request 2026-10-14) |
| 6 | Case studies (tabs) | `case-studies.tsx` |
| 7 | Process (5 steps) | `process.tsx` |
| 8 | Industries | `industries.tsx` |
| 9 | Why choose us | `why-choose.tsx` |
| 10 | Tools | `tools.tsx` |
| 11 | Testimonials (+ video facade) | `testimonials.tsx`, `testimonial-videos.tsx` |
| 12 | Blog teaser (latest 3 from Sanity) | `blog-teaser.tsx` |
| 13 | FAQ | `faq.tsx`, `faq-accordion.tsx` |
| 14 | Contact | `components/shared/contact-section.tsx` |

### Motion, SEO, icons

| Component | File | Notes |
|---|---|---|
| RevealText | `components/motion/reveal-text.tsx` | Line-by-line heading reveal |
| Parallax | `components/motion/parallax.tsx` | Subtle scroll parallax (+ image frame) |
| useLazyGsap | `components/motion/use-lazy-gsap.ts` | Loads GSAP on demand, near viewport |
| JsonLd | `components/seo/json-ld.tsx` | Structured data output |
| Icons | `components/icons/*` | Material Symbols, brand icons, icon registry |

JSON-LD on Home: Organization, WebSite, FAQPage, VideoObject, AccountingService.

### shadcn/ui primitives (`components/ui/`)

Accordion · Aspect Ratio · Avatar · Badge · Breadcrumb · Button · Card · Carousel · Checkbox · Collapsible · Dialog · Field · Input · Label · Navigation Menu · Scroll Area · Select · Separator · Sheet · Skeleton · Sonner · Tabs · Textarea · Tooltip

---

## 3. Content & data

| File | Purpose |
|---|---|
| `content/home.ts` | All Home copy (deviations marked `COPY FIX`) |
| `content/navigation.ts` | Header/footer nav, form service options |
| `lib/site-config.ts` | Name, contacts, socials, GTM, Calendly |
| `lib/seo.ts` | `buildMetadata()` + JSON-LD builders |
| `sanity/lib/queries.ts` | `getLatestPosts()` etc. |

---

## 4. Quality status (Home)

| Check | Result |
|---|---|
| Typecheck / lint / build | ✅ Pass, `/` prerendered static |
| Responsive 320–1920px | ✅ No horizontal overflow (19 widths tested) |
| Lighthouse desktop | Performance **100**, LCP 0.8s, CLS 0 |
| Lighthouse mobile | Performance **~80**, LCP 3.6s (simulated), CLS 0 |
| Accessibility | 97 (only brand-green contrast flagged) |

---

## 5. Open questions for the client

1. **Brand green contrast**: `#6ABE52` on white is 2.3:1. Is a darker text green, or dark text on green buttons, approved?
2. **GTM**: Can it load later (saves about 200ms of main-thread time)? Page views would be recorded slightly later.
3. **Content**:
   - "View Case Study" and Industries "Explore More" are hidden until those pages exist.
   - The RCM services copy needs confirmation.
   - Pinterest URL is missing.
4. **Lead delivery**: needs `SANITY_API_TOKEN` and the MS Graph env vars (`AZURE_*`, `GRAPH_MAILBOX`, `ADMIN_EMAIL`).
5. **Missing designs**: About, Contact, Blog, Team, Privacy, and the mobile layouts for inner pages.
6. **Audit page content** (all marked in `content/services/audit-outsourcing-services.ts`):
   - FAQ answers are drafted from the page's own copy; the design has questions only.
   - Tools tabs: only "Audit Software" is drawn with tools. "Data Analytics & Testing" and "Confirmation & Documentation" use tool names from the audit copy doc. "Research & Reference" is hidden until tools are supplied. A CaseWare logo is also needed.
   - Services subtitle is a Home placeholder in the design ("our outsourced accounting services…").
   - The intro photo comes from Sanity (tax-forms photo), not the calculator photo in the design.
   - CTAs open Calendly because service pages have no contact form. Should they go to `/contact` once that page exists?
   - Education and Pharmaceutical industry cards have no industry page, so they aren't links.
7. **Hire page content** (all marked in `content/hire/hire-bookkeeper-accountant.ts`):
   - The design's `image.png` is a copy of the audit-staff page; the SVG was used. There is no mobile design.
   - FAQ answers are drafted from the page's own copy; the design has questions only.
   - Tools: only the first tab has tools in the design, and its panel is titled "Audit Software" (shown as "Accounting Software"). The other tabs (Audit Software ×2, Data Analytics & Testing, Confirmation & Documentation) are audit-page leftovers and stay hidden until tool lists are supplied.
   - "Dedicated Accountant" card repeats the Hourly card's description.
   - Security subtitle talks about tax preparation (copied from the tax page).
   - "dedicated accounting team" link has no target in the design: it points at the Hiring Models section.
   - All CTAs open Calendly (no contact form on this page).
   - Expertise tiles show a one-line description under each title: **placeholder copy** added for the scroll animation (not in the design). Needs approved text (same on the Real Estate services tiles).
8. **Real Estate page content** (all marked in `content/industries/real-estate-construction.ts`):
   - Why Choose title is drawn as "Why **Healthcare** Businesses Choose **Conxicle**…"; shown as "Why Real Estate Businesses Choose Xconcile…".
   - Key Challenges intro stops mid-sentence ("…can work within"); completed with "your existing systems."
   - Intro says "help with **our** recurring accounting tasks"; shown as "your".
   - Sub-Industries rows have "+" buttons but no expanded content in the design: the accordion details are drafted from `docs/content/industries/real-estate-construction.md` and are editable in Sanity. They need approval.
   - FAQ answers are drafted from the page's own copy; the design has questions only.
   - "Hire Accounting Staff" links to `/hire-bookkeeper-accountant`; other CTAs open Calendly.

---

## 6. Useful commands

```bash
npm run dev            # dev server on :3000
npm run build && npm start
npm run typecheck && npm run lint
npm run share          # public ngrok URL for :3000 (needs NGROK_AUTHTOKEN in .env.local)
npm run share -- 3100  # share another port
```
