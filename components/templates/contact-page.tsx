import { InquirySection } from "@/components/sections/inquiry-section";
import type { ContactPageContent } from "@/sanity/lib/contact-page";

/**
 * Contact page (`/contact`, design page-updated/newShit/contact.svg): the dark "Send Us a Message"
 * section (same component as Home's contact section, its heading is the page H1), then the site
 * footer (layout). The "Stay Updated" subscribe band was removed (user request 2026-10-27). The
 * design's simplified top bar (logo + email pill) is not used: the site navbar stays as on every
 * page (user request 2026-10-27).
 *
 * Desktop: the navbar floats (fixed, 32px from the top, 68px tall), so the section starts 168px
 * down, putting the form card 68px under the navbar as drawn (card 68px under the 80px bar).
 * Mobile/tablet: the navbar is in the flow; the section keeps its own padding.
 */
export function ContactPageTemplate({
  content,
  contactEmail,
}: {
  content: ContactPageContent;
  contactEmail?: string;
}) {
  return (
    <InquirySection
      data={content.inquiry}
      contactEmail={contactEmail}
      titleAs="h1"
      className="lg:pt-[168px] lg:pb-[78px]"
    />
  );
}
