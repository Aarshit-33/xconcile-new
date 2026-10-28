import { LeadForm } from "@/components/forms/lead-form";
import { RevealText } from "@/components/motion/reveal-text";
import { HighlightText } from "@/components/shared/highlight-text";
import { CheckItem } from "@/components/shared/check-item";
import type { home } from "@/content/home";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B20 Contact ("Ready to Simplify Your Accounting?") on #F5F7F8. Mobile: copy, checks, then
 * the form card (fields stacked). Desktop: copy left (652px), form right (636px).
 * Anchor: #contact (hero / challenges CTAs).
 */
export function ContactSection({
  data,
  className,
}: {
  data: typeof home.contact;
  className?: string;
}) {
  return (
    <section
      id={sectionId(data, "contact")}
      aria-labelledby="contact-title"
      className={cn("bg-surface-alt section-y", className)}
    >
      <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,652fr)_minmax(0,636fr)] lg:items-start lg:justify-between lg:gap-8 xl:gap-3">
        <div className="flex flex-col gap-[55px]">
          <div className="flex flex-col gap-4">
            <RevealText
              as="h2"
              id="contact-title"
              className="text-[24px] leading-8 font-bold text-heading lg:text-[48px] lg:leading-[58px]"
            >
              <HighlightText text={data.title} />
            </RevealText>
            <p className="text-b1 font-medium text-body lg:max-w-[619px] lg:text-b3-tight">
              {data.body}
            </p>
          </div>
          <ul className="flex flex-col gap-[23px] text-b3 font-medium text-heading">
            {data.checks.map((check) => (
              <CheckItem key={check} className="gap-4" iconClassName="size-6">
                {check}
              </CheckItem>
            ))}
          </ul>
        </div>

        <LeadForm copy={data.form} />
      </div>
    </section>
  );
}
