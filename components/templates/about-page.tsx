import { AudienceCards } from "@/components/sections/audience-cards";
import { CardGrid } from "@/components/sections/card-grid";
import { FeatureCards } from "@/components/sections/feature-cards";
import { FounderProfile } from "@/components/sections/founder-profile";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { SecurityControls } from "@/components/sections/security-controls";
import { StatsBar } from "@/components/sections/stats-bar";
import { TeamMembers } from "@/components/sections/team-members";
import { ContactSection } from "@/components/shared/contact-section";
import type { AboutPageContent } from "@/content/about";

/** Two tinted sections in a row are separated by a white band (80px desktop, 48px mobile). */
const band = "mt-12 lg:mt-20";

/**
 * About page template (design pages/ABOUT US/page.svg). One DOM for every breakpoint; there is
 * no mobile design, so blocks keep their Home/Hire mobile patterns.
 * Order: centred hero, stats, intro (image left, three paragraphs, no list/button), Businesses
 * We Work With, Founder & CEO, Meet Our Team, Our Core Values (grey), Security, Our Expertise
 * (dark tiles), the Figma contact form (#contact, target of the hero button).
 */
export function AboutPageTemplate({ content }: { content: AboutPageContent }) {
  return (
    <>
      <Hero data={content.hero} variant="inner" align="center" />
      <StatsBar data={content.stats} />
      <Intro data={content.intro} imageClassName="lg:min-h-[547px]" />
      <AudienceCards data={content.audiences} />
      {/* Grey founder band after the grey audience band: white gap between them, as drawn. */}
      <FounderProfile data={content.founder} className={band} />
      <TeamMembers data={content.team} />
      <FeatureCards data={content.values} className="bg-surface-muted" />
      <SecurityControls data={content.security} />
      <CardGrid data={content.expertise} />
      <ContactSection data={content.contact} className={band} />
    </>
  );
}
