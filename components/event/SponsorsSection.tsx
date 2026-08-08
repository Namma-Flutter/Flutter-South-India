import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { participationPaths, sponsorSlots } from "@/data/event";
import styles from "./EventPage.module.css";

export default function SponsorsSection() {
  return (
    <section className={styles.partners} id="partners">
      <div className={`container ${styles.partnersIntro}`}>
        <SectionIntro
          eyebrow="Partners"
          title="The teams helping this community day happen."
          copy="Partner announcements will appear here as agreements are confirmed. The layout is ready for real brand marks, tier labels, and partner links."
          inverse
        />
        <a className="button button-light" href={participationPaths[1].href} data-reveal>
          Partner with the event
          <ArrowUpRight aria-hidden="true" size={17} />
        </a>
      </div>

      <div className={`container ${styles.partnerWall}`}>
        {sponsorSlots.map((sponsor) => (
          <article
            className={`${styles.partnerSlot} ${
              sponsor.featured ? styles.partnerSlotFeatured : ""
            }`}
            data-reveal
            key={sponsor.id}
          >
            <div className={styles.partnerMonogram} aria-hidden="true">
              {sponsor.status === "confirmed" ? (
                <Image
                  src={sponsor.logo.src}
                  alt=""
                  width={120}
                  height={60}
                />
              ) : (
                sponsor.id
              )}
            </div>
            <div>
              <p>{sponsor.tier}</p>
              <h3>
                {sponsor.status === "placeholder"
                  ? "To be announced"
                  : sponsor.name}
              </h3>
            </div>
            {sponsor.status === "confirmed" && sponsor.href ? (
              <a
                className={styles.partnerLink}
                href={sponsor.href}
                target="_blank"
                rel="noreferrer"
              >
                Visit partner
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ) : (
              <span className={styles.partnerState}>Reserved partner space</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
