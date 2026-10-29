import { InquiryForm } from "@/components/forms/inquiry-form";
import { CheckCircleIcon, ElectricBoltIcon, LockIcon } from "@/components/icons/material-symbols";
import { Icon as SiteIcon, isIconName } from "@/components/icons/registry";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";
import { HighlightText } from "@/components/shared/highlight-text";
import type { home } from "@/content/home";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/** The original three trust icons; any other name from Sanity is a site icon (registry). */
const trustIcons = { bolt: ElectricBoltIcon, lock: LockIcon, check: CheckCircleIcon };

/**
 * Home contact section in the OLD SITE's look (client request 2026-10-15): dark teal gradient,
 * copy + trust signals left, white "Send Us a Message" card right. Port of
 * old-code/xconcile-website/components/services/ServiceInquiryForm.tsx.
 * Colors are the old site's Tailwind values (primary-950/900/800/700/500/300/200,
 * secondary-500/400), not Figma tokens, except that the old teal-blue text (#a4c6ce / #76a9b5),
 * glow (#1c7185) and light green accents (#8dc573: eyebrow, title highlight, trust icons) became
 * brand green (client request 2026-10-22). The running text (body, trust descriptions, tagline)
 * read as "too much green", so it's translucent white now (body 80%, trust 70%, tagline 60%);
 * green stays on the accents only. Anchor: #contact (hero / challenges CTAs).
 */
export function InquirySection({
  data,
  contactEmail,
  titleAs = "h2",
  className,
}: {
  data: typeof home.inquiry;
  /** Shown in the form's error message (Site Settings → Contact). */
  contactEmail?: string;
  /** "h1" on the Contact page, where this section is the page's main heading. */
  titleAs?: "h1" | "h2";
  className?: string;
}) {
  return (
    <section
      id={sectionId(data, "contact")}
      aria-labelledby="inquiry-title"
      className={cn(
        // md:py-12: 48px on tablets like the other sections; 96px from lg (audit L7c).
        "relative overflow-hidden bg-gradient-to-br from-[#020b0d] via-[#05161a] to-[#0b2d35] py-8 md:py-12 lg:py-24",
        className,
      )}
    >
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 size-[32rem] rounded-full bg-[#71b751]/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 size-[32rem] rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[20rem] w-[60rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#10434f]/10 blur-3xl" />
      </div>

      <div className="relative z-10 container-site grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy & trust signals */}
        <div className="text-white">
          {/* Same entrance as every other section (2026-10-18): eyebrow + body fade up, the H2
              reveals line by line. */}
          <FadeUp className="mb-6">
            <span className="inline-block text-xs font-bold tracking-[0.2em] text-brand uppercase">
              {data.eyebrow}
            </span>
          </FadeUp>

          <RevealText
            as={titleAs}
            id="inquiry-title"
            className={cn(
              "mb-6 tracking-tight text-white md:text-5xl",
              titleAs === "h1" ? "text-h1-m" : "text-[28px] leading-[1.1] font-bold",
            )}
          >
            <HighlightText text={data.title} />
          </RevealText>

          <FadeUp
            as="p"
            delay={0.12}
            className="mb-12 text-lg leading-relaxed font-medium text-white/80"
          >
            {data.body}
          </FadeUp>

          <ul className="space-y-6">
            {data.trust.map((item) => {
              const name: string = item.icon;
              const Legacy = Object.hasOwn(trustIcons, name)
                ? trustIcons[name as keyof typeof trustIcons]
                : undefined;
              return (
                <li key={item.label} className="flex items-start gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-brand">
                    {Legacy ? (
                      <Legacy className="size-5" />
                    ) : isIconName(name) ? (
                      <SiteIcon name={name} className="size-5" />
                    ) : null}
                  </span>
                  <div>
                    {/* Titles in white (client request 2026-10-24; was brand green); descriptions stay white/70. */}
                    <p className="text-base font-bold text-white">{item.label}</p>
                    <p className="mt-0.5 text-sm text-white/70">{item.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 border-t border-white/10 pt-10">
            <p className="text-sm text-white/60">{data.tagline}</p>
          </div>
        </div>

        {/* Right: form card */}
        <InquiryForm copy={data.form} contactEmail={contactEmail} />
      </div>
    </section>
  );
}
