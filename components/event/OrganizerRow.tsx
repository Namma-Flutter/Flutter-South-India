import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { organizers } from "@/data/event";
import styles from "./EventPage.module.css";

export default function OrganizerRow() {
  return (
    <div className={`container ${styles.aboutOrganizers}`} id="organizers">
      <div className={styles.organizerRowHeading} data-reveal>
        <h3>Meet your organizers</h3>
        <p>The people bringing Flutter South India together.</p>
      </div>
      <div className={styles.organizerRow}>
        {organizers.map((organizer) => (
          <a className={styles.organizerCompact} href={organizer.href} target="_blank" rel="noreferrer" data-reveal key={organizer.id}>
            <span className={styles.organizerLogoPanel}>
              <Image src={organizer.logo} alt={`${organizer.name} logo`} fill sizes="(max-width: 608px) 80vw, 25vw" />
            </span>
            <span className={styles.organizerCompactName}>
              <small>{organizer.label}</small>
              <strong>{organizer.name}</strong>
            </span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}
