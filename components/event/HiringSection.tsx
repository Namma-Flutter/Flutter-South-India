import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { hiringStalls, participationPaths } from "@/data/event";
import styles from "./EventPage.module.css";

export default function HiringSection() {
  return (
    <section className={styles.hiring} id="hiring">
      <div className={`container ${styles.hiringHeader}`}>
        <SectionIntro
          eyebrow="Hiring stalls"
          title="Meet teams that are actively building with Flutter."
          copy="Company confirmations are still in progress. For now, the board shows how hiring partners, roles, and stall details will be presented on the live site."
        />
        <p className={styles.hiringNote} data-reveal>
          Bring a concise CV, a working portfolio, and questions for the engineers
          behind the roles.
        </p>
      </div>

      <div className={`container ${styles.hiringGrid}`}>
        {hiringStalls.map((stall) => (
          <article className={styles.hiringStall} data-reveal key={stall.id}>
            <div className={styles.hiringStallTop}>
              {stall.status === "confirmed" && stall.logo ? (
                <Image
                  className={styles.hiringLogo}
                  src={stall.logo.src}
                  alt={stall.logo.alt}
                  width={112}
                  height={48}
                />
              ) : (
                <span>{stall.id}</span>
              )}
              <p>
                {stall.status === "placeholder"
                  ? "Partner confirmation pending"
                  : "Confirmed hiring partner"}
              </p>
            </div>
            <p className={styles.hiringTeam}>{stall.teamType}</p>
            <h3>
              {stall.status === "confirmed"
                ? stall.company
                : "Company to be announced"}
            </h3>
            <ul>
              {stall.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            {stall.status === "confirmed" && stall.careersUrl ? (
              <a
                className={styles.hiringRolesLink}
                href={stall.careersUrl}
                target="_blank"
                rel="noreferrer"
              >
                View open roles
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <div className={`container ${styles.hiringFooter}`} data-reveal>
        <p>Hiring with Flutter? Reserve a focused space to meet the right people.</p>
        <a className="text-link" href={participationPaths[1].href}>
          Ask about a hiring stall
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>
    </section>
  );
}
