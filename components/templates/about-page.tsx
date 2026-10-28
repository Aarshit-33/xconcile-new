import { AudienceCards } from "@/components/sections/audience-cards";
import { CardGrid } from "@/components/sections/card-grid";
import { FeatureCards } from "@/components/sections/feature-cards";
import { FounderProfile } from "@/components/sections/founder-profile";
import { Hero } from "@/components/sections/hero";
import { InquirySection } from "@/components/sections/inquiry-section";
import { Intro } from "@/components/sections/intro";
import { SecurityControls } from "@/components/sections/security-controls";
import { StatsBar } from "@/components/sections/stats-bar";
import { TeamMembers } from "@/components/sections/team-members";
import type { AboutPageContent } from "@/content/about";
import type { home } from "@/content/home";

/**
 * About page template (design pages/ABOUT US/page.svg). One DOM for every breakpoint; there is
 * no mobile design, so blocks keep their Home/Hire mobile patterns.
 * Order: centred hero, stats, intro (image left, three paragraphs, no list/button), Businesses
 * We Work With, Founder & CEO, Meet Our Team, Our Core Values (grey), Security, Our Expertise
 * (dark tiles), then the Home contact section (#contact, target of the hero button).
 * The contact section is the same as Home's (InquirySection, copy from Studio → Home Page →
 * Contact), at user request 2026-10-26. It used to be the light Figma ContactSection.
 */
export function AboutPageTemplate({
  content,
  inquiry,
  contactEmail,
}: {
  content: AboutPageContent;
  /** Home page contact block (`getHome().inquiry`). */
  inquiry: typeof home.inquiry;
  /** Site Settings → Contact email, shown in the form's error message. */
  contactEmail?: string;
}) {
  return (
    <>
      <Hero data={content.hero} variant="inner" align="center" />
      <StatsBar data={content.stats} />
      {/* pt-6: 48px from the stats badges (their 24px + 24px) on mobile (client note 2026-10-28). */}
      <Intro
        data={content.intro}
        className="pt-6 lg:pt-section"
        imageClassName="lg:min-h-[547px]"
      />
      <AudienceCards data={content.audiences} />
      <FounderProfile data={content.founder} />
      <TeamMembers data={content.team} />
      <FeatureCards data={content.values} className="bg-surface-muted" />
      <SecurityControls data={content.security} />
      <CardGrid data={content.expertise} />
      <InquirySection data={inquiry} contactEmail={contactEmail} />
    </>
  );
}
