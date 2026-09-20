import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import communityStyles from "./CommunityPartners.module.css";
import SectionIntro from "@/components/ui/SectionIntro";
import { communityPartnerSlots, participationPaths } from "@/data/event";
import styles from "./EventPage.module.css";

export default function PartnersSection() {
  return (
    <>
      <section className={styles.communityPartners} id="community-partners">
        <div className="container">
          <SectionIntro eyebrow="Community partners" title="Many communities. More possibilities." copy="Meet the communities bringing their people, ideas, and energy to Flutter South India. Find your next connection here." inverse />
        </div>
        <div className={`container ${communityStyles.grid}`}>
          {communityPartnerSlots.map((partner) => (
            <a className={communityStyles.card} href={partner.href} target="_blank" rel="noopener noreferrer" key={partner.id} aria-label={`Explore ${partner.name} (opens in a new tab)`}>
              <div className={communityStyles.logo}>
                <Image src={`/assets/community-partners/${encodeURIComponent(partner.logo)}`} alt={`${partner.name} logo`} fill sizes="(max-width: 608px) 80vw, (max-width: 1024px) 40vw, 22vw" />
              </div>
              <div className={communityStyles.body}>
                <span className={communityStyles.label}>{partner.label}</span>
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
                <span className={communityStyles.link}>Explore community <ArrowUpRight size={16} aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.sponsors} id="sponsors">
        <div className={`container ${styles.sponsorsIntro}`}>
          <SectionIntro eyebrow="Sponsors" title="Make space for the community to grow." copy="Sponsor announcements will be shared here as they are confirmed." />
          <a className="button button-primary" href={participationPaths[1].href}>Become a sponsor<ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
        <div className={`container ${styles.sponsorGrid}`}>
          {['Title sponsor', 'Gold sponsor', 'Community sponsor'].map((tier, index) => (
            <article className={styles.sponsorCard} data-reveal key={tier}><span>0{index + 1}</span><p>{tier}</p><strong>To be announced</strong></article>
          ))}
        </div>
      </section>
    </>
  );
}
