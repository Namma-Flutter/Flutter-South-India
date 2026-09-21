"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
  MapPin,
} from "lucide-react";
import {
  eventDetails,
  eventFacts,
  eventNav,
  eventPrinciples,
  faqItems,
  isKonfhubExternal,
  participationPaths,
  socialLinks,
  venueNotes,
} from "@/data/event";
import SectionIntro from "@/components/ui/SectionIntro";
import {
  trackBrochureDownload,
  trackPartnerInquiry,
  trackSpeakerInquiry,
  trackTicketIntentClick,
  trackVenueMapClick,
  trackVolunteerInquiry,
} from "@/lib/analytics";
import CommunityStorySection from "./CommunityStorySection";
import Countdown from "./Countdown";
import EventHeader from "./EventHeader";
import MotionEnhancer from "./MotionEnhancer";
import PartnersSection from "./PartnersSection";
import OrganizerRow from "./OrganizerRow";
import SpeakersSection from "./SpeakersSection";
import TicketsSection from "./TicketsSection";
import styles from "./EventPage.module.css";

const mapLink = eventDetails.venueMapLink;

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
                FSI / 26 · {eventDetails.dayLabel}
              </p>
              <h1 data-reveal>
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
                  onClick={() =>
                    trackTicketIntentClick({
                      cta_location: "hero",
                      ticket_tier: "unspecified",
                      link_url: eventDetails.ticketLink,
                    })
                  }
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
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open SRM IST Ramapuram in Google Maps"
                  onClick={() =>
                    trackVenueMapClick({
                      cta_location: "hero_pass",
                      destination_domain: "maps.app.goo.gl",
                    })
                  }
                >
                  <MapPin aria-hidden="true" size={16} />
                  {eventDetails.venue}, {eventDetails.city}
                </a>
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
                eyebrow="Built by the community"
                title="Local roots. Shared ideas. One Flutter community."
                copy="A day in Chennai to meet the people building with Flutter, exchange practical ideas, and leave with new connections. Three communities coming together to make it happen."
              />
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

          <OrganizerRow />

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
          <div className={`container ${styles.agendaAnnouncement}`}>
            <p className={styles.agendaBadge} data-reveal>Agenda · TBA</p>
            <SectionIntro
              eyebrow="Something worth gathering for"
              title="Great conversations are on the way."
              copy="We’re putting together a day of Flutter, fresh ideas, and community connections in Chennai. The full agenda will be announced soon."
              inverse
            />
          </div>
        </section>

        <SpeakersSection />

        <PartnersSection />

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
                  <a
                    href={item.href}
                    aria-label={`${item.action}: ${item.title}`}
                    onClick={() => {
                      if (item.number === "01") {
                        trackSpeakerInquiry({
                          cta_location: "take_part",
                          inquiry_type: "speaking",
                        });
                      } else if (item.number === "02") {
                        trackPartnerInquiry({
                          cta_location: "take_part",
                          inquiry_type: "partnership",
                        });
                      } else if (item.number === "03") {
                        trackVolunteerInquiry({
                          cta_location: "take_part",
                          inquiry_type: "volunteering",
                        });
                      }
                    }}
                  >
                    {item.action}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                  {item.secondaryAction && item.secondaryHref ? (
                    <a
                      href={item.secondaryHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${item.secondaryAction}: ${item.title}`}
                      onClick={() => trackBrochureDownload()}
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
                <span>13.0323° N</span>
                <span>80.1800° E</span>
              </div>
              <div className={styles.venuePartner}>
                <span>Venue partner</span>
                <a
                  className={styles.venuePartnerLogo}
                  href={eventDetails.venueWebsite}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit the SRM IST Ramapuram website"
                >
                  <Image
                    src={eventDetails.venuePartnerLogo}
                    alt="SRM Institute of Science and Technology, Ramapuram"
                    width={1024}
                    height={446}
                    sizes="(max-width: 720px) 70vw, 22rem"
                  />
                </a>
              </div>
              <div className={styles.venueWordmark}>
                <span>Meet us in</span>
                <strong>Chennai</strong>
              </div>
            </div>

            <div className={styles.venueCopy}>
              <SectionIntro
                eyebrow="Venue partner"
                title={`${eventDetails.venue}, ${eventDetails.city}`}
                copy="Flutter South India 2026 is hosted in partnership with SRM Institute of Science and Technology at its Ramapuram campus."
              />

              <div className={styles.venueAddress} data-reveal>
                <MapPin aria-hidden="true" size={19} />
                <p>
                  <strong>{eventDetails.venue}</strong>
                  <span>{eventDetails.address}</span>
                </p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackVenueMapClick({
                      cta_location: "venue_section",
                      destination_domain: "maps.app.goo.gl",
                    })
                  }
                >
                  Open in Maps
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
              onClick={() =>
                trackTicketIntentClick({
                  cta_location: "final_cta",
                  ticket_tier: "unspecified",
                  link_url: eventDetails.ticketLink,
                })
              }
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
              className={styles.footerEventLogo}
              src="/assets/fsi-logo.png"
              alt="Flutter South India 2026"
              width={680}
              height={252}
            />
            <span>Made together by three Flutter communities.</span>
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
          <span>© 2026 Flutter South India</span>
          <a href={`mailto:${eventDetails.contact}`}>{eventDetails.contact}</a>
          <span>Made with care for the community.</span>
        </div>
      </footer>
    </>
  );
}
