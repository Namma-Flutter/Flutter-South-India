import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
  MapPin,
} from "lucide-react";
import nammaFlutterMascot from "@/assets/brand/namma-flutter-mascot.webp";
import {
  eventDetails,
  eventFacts,
  eventNav,
  eventPrinciples,
  faqItems,
  isKonfhubExternal,
  participationPaths,
  programme,
  socialLinks,
  venueNotes,
} from "@/data/event";
import SectionIntro from "@/components/ui/SectionIntro";
import CommunityStorySection from "./CommunityStorySection";
import Countdown from "./Countdown";
import EventHeader from "./EventHeader";
import MotionEnhancer from "./MotionEnhancer";
import SpeakersSection from "./SpeakersSection";
import TicketsSection from "./TicketsSection";
import styles from "./EventPage.module.css";

const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${eventDetails.city}, Tamil Nadu`,
)}`;

const ticketLinkProps = isKonfhubExternal
  ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
  : {};

export default function EventPage() {
  return (
    <>
      <MotionEnhancer />
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <EventHeader
        organizer={eventDetails.organizer}
        nav={eventNav}
        ticketLabel={eventDetails.ticketLabel}
        ticketLink={eventDetails.ticketLink}
      />

      <main id="main-content">
        <section className={styles.hero} id="top">
          <div className={styles.heroLines} aria-hidden="true" />
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker} data-reveal>
                {eventDetails.organizer} presents · {eventDetails.dayLabel}
              </p>
              <h1>
                South India
                <span>builds with Flutter.</span>
              </h1>
              <p className={styles.heroLead} data-reveal>
                A community-led day for the people who learn, ship, teach, and
                care about Flutter and Dart.
              </p>
              <div className={styles.heroActions} data-reveal>
                <a
                  className="button button-light"
                  href={eventDetails.ticketLink}
                  {...ticketLinkProps}
                >
                  {eventDetails.ticketLabel}
                  <ArrowUpRight aria-hidden="true" size={17} />
                </a>
                <a className={styles.programLink} href="#programme">
                  See the day
                  <ArrowDown aria-hidden="true" size={16} />
                </a>
              </div>
            </div>

            <aside className={styles.eventPass} data-reveal>
              <div className={styles.passTopline}>
                <span>Community pass</span>
                <span>FSI / 26</span>
              </div>
              <div className={styles.passBrand}>
                <Image
                  src={nammaFlutterMascot}
                  alt="Namma Flutter mascot"
                  width={72}
                  height={72}
                  priority
                />
                <p>
                  Flutter
                  <br />
                  South India
                </p>
              </div>
              <div className={styles.passDate}>
                <strong>10</strong>
                <span>
                  Oct
                  <br />
                  2026
                </span>
              </div>
              <div className={styles.passMeta}>
                <span>
                  <CalendarDays aria-hidden="true" size={16} />
                  {eventDetails.dayLabel}
                </span>
                <span>
                  <MapPin aria-hidden="true" size={16} />
                  {eventDetails.venue}, {eventDetails.city}
                </span>
              </div>
              <Countdown targetDate={eventDetails.dateISO} />
            </aside>
          </div>

          <div className={styles.heroRail} aria-label="Event themes">
            <div>
              <span>Flutter</span>
              <i aria-hidden="true" />
              <span>Dart</span>
              <i aria-hidden="true" />
              <span>People</span>
              <i aria-hidden="true" />
              <span>Products</span>
              <i aria-hidden="true" />
              <span>Chennai</span>
            </div>
          </div>
        </section>

        <section className={styles.about} id="about">
          <div className={`container ${styles.aboutGrid}`}>
            <div className={styles.aboutIntro}>
              <SectionIntro
                eyebrow="Why this day"
                title="A conference that feels like the community behind it."
                copy="Flutter South India brings the region's builders into one room; not only to listen, but to compare notes, ask better questions, and leave with something useful."
              />
              <p className={styles.localNote} data-reveal>
                Organised in Chennai by Namma Flutter, for the wider South Indian
                developer community.
              </p>
            </div>

            <div className={styles.principles}>
              {eventPrinciples.map((principle) => (
                <article className={styles.principle} data-reveal key={principle.number}>
                  <span>{principle.number}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={`container ${styles.facts}`} data-reveal>
            {eventFacts.map((fact) => (
              <div key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <TicketsSection />

        <section className={styles.programme} id="programme">
          <div className={`container ${styles.programmeIntro}`}>
            <SectionIntro
              eyebrow="Programme preview"
              title="One day. A clear rhythm. Plenty of room to connect."
              copy="The detailed line-up is being curated now. This is the shape of the day; confirmed speakers, sessions, and exact timings will be published as they are ready."
              inverse
            />
            <p className={styles.programmeStatus} data-reveal>
              <span aria-hidden="true" /> Programme in curation
            </p>
          </div>

          <div className={`container ${styles.programmeList}`}>
            {programme.map((item, index) => (
              <article
                className={styles.programmeRow}
                data-reveal
                data-tone={item.tone}
                key={item.title}
              >
                <span className={styles.programmeNumber}>0{index + 1}</span>
                <p className={styles.programmeTime}>{item.time}</p>
                <h3>{item.title}</h3>
                <p className={styles.programmeDescription}>{item.description}</p>
              </article>
            ))}
          </div>

          <div className={`container ${styles.programmeFoot}`} data-reveal>
            <p>
              Speaker announcements and the full three-track agenda will appear
              here once confirmed.
            </p>
            <a className="text-link" href={participationPaths[0].href}>
              Interested in speaking?
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </section>

        <SpeakersSection />

        <section className={styles.between}>
          <div className={`container ${styles.betweenGrid}`}>
            <div className={styles.betweenStatement} data-reveal>
              <p className="eyebrow">Between the sessions</p>
              <h2>Good event days are made in the margins, too.</h2>
            </div>
            <div className={styles.betweenCopy} data-reveal>
              <p>
                Expect live demos, product conversations, career connections,
                community partners, and the unplanned hallway chats that often
                become the most useful part of a conference.
              </p>
              <div className={styles.topicLine} aria-label="Event experiences">
                <span>Live demos</span>
                <span>Hiring</span>
                <span>Community</span>
                <span>Products</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.takePart} id="take-part">
          <div className={`container ${styles.takePartIntro}`}>
            <SectionIntro
              eyebrow="Take part"
              title="Help make the room worth being in."
              copy="A great community event is built by the people who contribute to it. Choose the path that fits you and start a real conversation with the organising team."
            />
          </div>

          <div className={`container ${styles.participationList}`}>
            {participationPaths.map((item) => (
              <article className={styles.participationRow} data-reveal key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className={styles.participationActions}>
                  <a href={item.href} aria-label={`${item.action}: ${item.title}`}>
                    {item.action}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                  {item.secondaryAction && item.secondaryHref ? (
                    <a
                      href={item.secondaryHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${item.secondaryAction}: ${item.title}`}
                    >
                      {item.secondaryAction}
                      <FileText aria-hidden="true" size={17} />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <CommunityStorySection />

        <section className={styles.venue} id="venue">
          <div className={`container ${styles.venueGrid}`}>
            <div className={styles.venuePoster} data-reveal>
              <div className={styles.venueCoordinates}>
                <span>13.0607° N</span>
                <span>80.2255° E</span>
              </div>
              <div className={styles.venuePin}>
                <MapPin aria-hidden="true" size={28} strokeWidth={1.7} />
              </div>
              <div className={styles.venueWordmark}>
                <span>Meet us in</span>
                <strong>Chennai</strong>
              </div>
            </div>

            <div className={styles.venueCopy}>
              <SectionIntro
                eyebrow="The venue"
                title={`${eventDetails.venue}, ${eventDetails.city}`}
                copy="The Chennai venue will be announced soon. Access, travel, and arrival details will be shared once confirmed."
              />

              <div className={styles.venueAddress} data-reveal>
                <MapPin aria-hidden="true" size={19} />
                <p>
                  <strong>{eventDetails.venue}</strong>
                  <span>{eventDetails.address}</span>
                </p>
                <a href={mapLink} target="_blank" rel="noreferrer">
                  View Chennai
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </div>

              <ul className={styles.venueNotes} data-reveal>
                {venueNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.faq} id="faq">
          <div className={`container ${styles.faqGrid}`}>
            <div className={styles.faqIntro}>
              <SectionIntro
                eyebrow="Good to know"
                title="A few straight answers."
                copy={`Something else on your mind? Write to ${eventDetails.contact} and a human from the organising team will reply.`}
              />
            </div>

            <div className={styles.faqList}>
              {faqItems.map((item, index) => (
                <details data-reveal key={item.question} open={index === 0}>
                  <summary>
                    <span>0{index + 1}</span>
                    {item.question}
                    <i aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalCtaInner}`} data-reveal>
            <div>
              <p className="eyebrow">10 October · Chennai</p>
              <h2>Be there when South India meets around Flutter.</h2>
            </div>
            <a
              className="button button-light"
              href={eventDetails.ticketLink}
              {...ticketLinkProps}
            >
              {eventDetails.ticketLabel}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerTop}`}>
          <div className={styles.footerBrand}>
            <Image
              src={nammaFlutterMascot}
              alt="Namma Flutter mascot"
              width={54}
              height={54}
            />
            <div>
              <strong>{eventDetails.organizer}</strong>
              <span>Building Flutter community in Chennai.</span>
            </div>
          </div>
          <div className={styles.socials} aria-label="Namma Flutter social links">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
                <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className={`container ${styles.footerBottom}`}>
          <span>© 2026 Namma Flutter</span>
          <a href={`mailto:${eventDetails.contact}`}>{eventDetails.contact}</a>
          <span>Made with care for the community.</span>
        </div>
      </footer>
    </>
  );
}
