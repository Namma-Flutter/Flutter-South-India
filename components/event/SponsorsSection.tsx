import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { participationPaths, sponsorTierGroups } from "@/data/event";
import styles from "./SponsorsSection.module.css";

function getTierPillClass(tierName: string) {
  if (tierName === "Community Sponsor") return styles.tierPillCommunity;
  if (tierName === "Super Dash Sponsor") return styles.tierPillSuperDash;
  return styles.tierPillDashling;
}

function getCardTierClass(tierName: string) {
  if (tierName === "Community Sponsor") return styles.sponsorCardCommunity;
  if (tierName === "Super Dash Sponsor") return styles.sponsorCardSuperDash;
  return styles.sponsorCardDashling;
}

function getDomainFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function SponsorsSection() {
  return (
    <section className={styles.sponsors} id="sponsors">
      <div className="container">
        {/* Intro header with CTA */}
        <div className={styles.introRow}>
          <SectionIntro
            eyebrow="Sponsors"
            title="Make space for the community to grow."
            copy="Proudly supported by visionary partners powering Flutter, mobile innovation, and community builders across South India."
          />
          <a
            className="button button-primary"
            href={participationPaths[1].href}
            data-reveal
          >
            Become a sponsor
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>

        {/* Tier hierarchy: Community Sponsor > Super Dash > Dashling Sponsor */}
        <div className={styles.tierList}>
          {sponsorTierGroups.map((group) => {
            const isCommunity = group.name === "Community Sponsor";

            return (
              <div
                key={group.name}
                className={styles.tierGroup}
                data-reveal
              >
                {/* Tier Group Header */}
                <div className={styles.tierHeader}>
                  <div className={styles.tierBadgeWrapper}>
                    <span className={`${styles.tierPill} ${getTierPillClass(group.name)}`}>
                      <span className={styles.tierDot} />
                      {group.label}
                    </span>
                  </div>
                </div>

                {/* Sponsor Cards Grid */}
                <div
                  className={
                    isCommunity
                      ? styles.sponsorGridCommunity
                      : styles.sponsorGridTwoCol
                  }
                >
                  {group.sponsors.map((sponsor) => (
                    <a
                      key={sponsor.id}
                      className={`${styles.sponsorCard} ${getCardTierClass(sponsor.tier)}`}
                      href={sponsor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${sponsor.name} (${sponsor.tier})`}
                    >
                      {/* Logo Showcase */}
                      <div
                        className={`${styles.logoWrapper} ${
                          sponsor.darkLogoBg ? styles.logoWrapperDark : ""
                        }`}
                      >
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          width={260}
                          height={90}
                          className={styles.sponsorLogo}
                        />
                      </div>

                      {/* Content */}
                      <div className={styles.cardContent}>
                        <h3 className={styles.sponsorName}>{sponsor.name}</h3>
                        <span className={styles.sponsorTagline}>
                          {sponsor.tagline}
                        </span>
                        <p className={styles.sponsorDescription}>
                          {sponsor.description}
                        </p>
                      </div>

                      {/* Action footer */}
                      <div className={styles.cardFooter}>
                        <span>Visit {getDomainFromUrl(sponsor.href)}</span>
                        <ArrowUpRight
                          className={styles.linkIcon}
                          size={15}
                          aria-hidden="true"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
