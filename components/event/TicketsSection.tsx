import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import {
  formatTicketPrice,
  isKonfhubExternal,
  konfhubEventUrl,
  ticketTiers,
} from "@/data/event";
import styles from "./TicketsSection.module.css";

const externalLinkProps = isKonfhubExternal
  ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
  : {};

export default function TicketsSection() {
  return (
    <section className={styles.tickets} id="tickets">
      <div className={`container ${styles.intro}`}>
        <SectionIntro
          eyebrow="Tickets"
          title="Choose your pass for the day."
          copy="Secure your seat on KonfHub. Early bird rates are limited; student and professional passes cover the full conference programme."
        />
        <p className={styles.note} data-reveal>
          Checkout is handled securely on KonfHub. Pick a tier below, then complete
          payment on the event page.
        </p>
      </div>

      <div className={`container ${styles.list}`}>
        {ticketTiers.map((tier, index) => (
          <article className={styles.row} data-reveal key={tier.id}>
            <span className={styles.index}>0{index + 1}</span>
            <div className={styles.meta}>
              {tier.badge ? <span className={styles.badge}>{tier.badge}</span> : null}
              <h3>{tier.name}</h3>
              {tier.note ? <p className={styles.tierNote}>{tier.note}</p> : null}
            </div>
            <p className={styles.price}>{formatTicketPrice(tier.priceInr)}</p>
            <a
              className={`button button-quiet ${styles.cta}`}
              href={konfhubEventUrl}
              aria-label={`Get ${tier.name} ticket`}
              {...externalLinkProps}
            >
              Get tickets
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
