import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import communityStyles from "./CommunityPartners.module.css";
import SectionIntro from "@/components/ui/SectionIntro";
import { communityPartnerSlots } from "@/data/event";
import styles from "./EventPage.module.css";

import SponsorsSection from "./SponsorsSection";

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

      <SponsorsSection />
    </>
  );
}
