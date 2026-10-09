"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  HeartHandshake,
  Lock,
  Mail,
  MessageSquare,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import styles from "./CodeOfConduct.module.css";

type ContactPerson = {
  name: string;
  role: string;
  email: string;
  initials: string;
};

const COC_LEADS: ContactPerson[] = [
  {
    name: "Justin Benito",
    role: "COC Wing Lead",
    email: "justinbenito1974@gmail.com",
    initials: "JB",
  },
  {
    name: "Vaishnavi",
    role: "COC Wing Lead",
    email: "vaishnavi55262@gmail.com",
    initials: "V",
  },
];

const PROHIBITED_BEHAVIORS = [
  {
    title: "Offensive Comments",
    desc: "Offensive verbal or non-verbal comments related to gender, identity, age, sexual orientation, disability, appearance, race, ethnicity, or religion.",
  },
  {
    title: "Inappropriate Imagery",
    desc: "Sexual images, provocative language, or suggestive materials in public venues, online talks, slide decks, or chats.",
  },
  {
    title: "Intimidation & Stalking",
    desc: "Deliberate intimidation, stalking, following, or unwelcome tracking of individuals online or in person.",
  },
  {
    title: "Harassing Media Capture",
    desc: "Harassing photography, video recording, or screenshots after an individual has asked you to stop.",
  },
  {
    title: "Sustained Disruption",
    desc: "Sustained disruption of talks, webinars, keynotes, workshops, or community discussions.",
  },
  {
    title: "Unwelcome Advances",
    desc: "Inappropriate physical contact, invasion of personal space, and unwelcome sexual or romantic attention.",
  },
];

export default function CodeOfConductPage() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail((curr) => (curr === email ? null : curr));
    }, 2400);
  };

  return (
    <div className={styles.page}>
      {/* Top Header */}
      <header className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <div className={styles.brandGroup}>
            <Link
              className={styles.brandLogo}
              href="/"
              aria-label="Flutter South India 2026 Home"
            >
              <Image
                src="/assets/fsi-logo.png"
                alt="Flutter South India 2026"
                width={680}
                height={252}
                priority
              />
            </Link>
            <div className={styles.communityBadge}>
              <Image
                className={styles.communityLogoMark}
                src="/assets/organizers/namma-flutter.png"
                alt="Namma Flutter Logo"
                width={36}
                height={36}
              />
              <span>Namma Flutter</span>
            </div>
          </div>

          <nav className={styles.navActions} aria-label="Page navigation">
            <Link className={styles.backLink} href="/">
              <ArrowLeft aria-hidden="true" size={16} />
              <span>Back to Event</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            <ShieldCheck aria-hidden="true" size={15} />
            <span>Community Standards & Safety</span>
          </div>

          <h1 className={styles.heroTitle}>
            Code of <span className={styles.heroTitleGradient}>Conduct</span>
          </h1>

          <p className={styles.heroLead}>
            Namma Flutter is dedicated to providing a safe, welcoming, and
            respectful environment for everyone who learns, builds, and connects
            with us.
          </p>

          <div className={styles.highlightsBar}>
            <div className={styles.highlightPill}>
              <Shield aria-hidden="true" size={15} />
              <span>Zero-tolerance harassment policy</span>
            </div>
            <div className={styles.highlightPill}>
              <Users aria-hidden="true" size={15} />
              <span>Covers in-person & online spaces</span>
            </div>
            <div className={styles.highlightPill}>
              <Lock aria-hidden="true" size={15} />
              <span>100% Anonymous reporting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump Bar */}
      <nav className={styles.jumpBar} aria-label="Table of contents">
        <div className={styles.jumpList}>
          <a className={styles.jumpItem} href="#organisers-message">
            Message from Organisers
          </a>
          <a className={styles.jumpItem} href="#short-version">
            The Short Version
          </a>
          <a className={styles.jumpItem} href="#detailed-version">
            Detailed Guidelines
          </a>
          <a className={styles.jumpItem} href="#reporting">
            Reporting Violations
          </a>
          <a className={styles.jumpItem} href="#emergency-contacts">
            COC Wing Contacts
          </a>
          <a className={styles.jumpItem} href="#credits">
            Credits & Attribution
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`container ${styles.contentGrid}`} id="main-content">
        {/* Organizer Message Highlight Box */}
        <section
          id="organisers-message"
          className={styles.organizersMessageCard}
        >
          <div className={styles.messageHeader}>
            <div className={styles.messageIconBadge}>
              <Sparkles aria-hidden="true" size={20} />
            </div>
            <div>
              <p className={styles.messageSubtitle}>Welcoming Community</p>
              <h2 className={styles.messageTitle}>Message from the Organisers</h2>
            </div>
          </div>
          <p className={styles.messageBody}>
            &ldquo;We invite you to join events organized by{" "}
            <strong>Namma Flutter Community</strong>, our Discord servers, and
            other community gatherings in a spirit of{" "}
            <strong>curiosity, friendliness, open-mindedness, and respect</strong>
            .&rdquo;
          </p>
        </section>

        {/* Scope and Purpose */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <HeartHandshake aria-hidden="true" size={20} />
            </div>
            <h2 className={styles.sectionTitle}>Our Community & Expectations</h2>
          </div>
          <div className={styles.prose}>
            <p>
              Namma Flutter is a community for collaboration, for building free
              and open events and conferences on Flutter and mobile/cross-platform
              technologies. To ensure the quality of such conversations and the
              safety of all participants, there are certain rules that we, and
              you, are expected to follow.
            </p>
            <p>
              All attendees, speakers, sponsors, and volunteers at our events
              are required to agree with the following code of conduct. We
              expect cooperation from all participants to help ensure a safe
              and inclusive environment for everybody.
            </p>
          </div>
        </section>

        {/* The Short Version */}
        <section id="short-version" className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <ShieldCheck aria-hidden="true" size={20} />
            </div>
            <h2 className={styles.sectionTitle}>The Short Version</h2>
          </div>
          <div className={styles.prose}>
            <p>
              Namma Flutter is dedicated to providing a harassment-free
              experience for everyone, regardless of gender, gender identity and
              expression, age, sexual orientation, disability, physical
              appearance, body size, race, ethnicity, religion (or lack
              thereof), or technology choices.
            </p>
            <p>
              We do not tolerate harassment of participants, volunteers,
              sponsors, or anyone else associated with the community in any
              form. Sexual language and imagery is not appropriate for any of
              our events, including talks, workshops, webinars, and other online
              media.
            </p>
            <p>
              Participants violating these rules may be sanctioned or expelled
              at the discretion of the organizers. If you feel uncomfortable or
              harassed at any of our events or communication channels, please
              report it to the community team using the procedures outlined
              below.
            </p>
          </div>

          <div className={styles.principlesGrid}>
            <div className={styles.principleCard}>
              <span className={styles.principleNumber}>01</span>
              <h3>Universal Inclusivity</h3>
              <p>
                Everyone is welcomed and respected, across all backgrounds,
                identities, and skill levels.
              </p>
            </div>
            <div className={styles.principleCard}>
              <span className={styles.principleNumber}>02</span>
              <h3>Zero Tolerance</h3>
              <p>
                No sexualized content, intimidation, or derogatory behavior in
                any talks, stalls, or chats.
              </p>
            </div>
            <div className={styles.principleCard}>
              <span className={styles.principleNumber}>03</span>
              <h3>Decisive Action</h3>
              <p>
                Immediate sanctions or removal from events without refund or
                recourse if rules are breached.
              </p>
            </div>
          </div>
        </section>

        {/* The Not So Short Version */}
        <section id="detailed-version" className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Scale aria-hidden="true" size={20} />
            </div>
            <h2 className={styles.sectionTitle}>The Not So Short Version</h2>
          </div>
          <div className={styles.prose}>
            <p>
              Harassment includes, but is not limited to, the following unacceptable
              behaviors:
            </p>
          </div>

          <div className={styles.harassmentList}>
            {PROHIBITED_BEHAVIORS.map((item) => (
              <div key={item.title} className={styles.harassmentItem}>
                <ShieldAlert aria-hidden="true" size={18} />
                <div>
                  <strong>{item.title}:</strong> {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.prose}>
            <p>
              <strong>Immediate Compliance:</strong> Participants asked to stop
              any harassing behavior are expected to comply immediately without
              argument.
            </p>
            <p>
              <strong>Organizer Remedies:</strong> If a participant engages in
              harassing behaviour, the Namma Flutter team may take any action
              they deem appropriate, including warning the offender or
              immediate expulsion from the event.
            </p>
            <p>
              <strong>Universal Scope:</strong> The code of conduct and
              anti-harassment policies apply to everyone participating in the
              event including attendees, sponsors, judges, mentors, volunteers,
              organisers, and Namma Flutter team staff. Regardless of whether an
              event is virtual or in-person, we expect participants to adhere to
              these rules across all avenues—online and offline alike.
            </p>
          </div>

          <div className={styles.warningBox}>
            <ShieldAlert aria-hidden="true" size={20} />
            <div>
              <strong>Policy Scope:</strong> Applies to the main stage, workshops,
              networking halls, sponsor booths, Discord, WhatsApp groups,
              GitHub repositories, social media channels, and adjacent after-hours
              gatherings.
            </div>
          </div>
        </section>

        {/* Reporting Code of Conduct Violations */}
        <section id="reporting" className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <MessageSquare aria-hidden="true" size={20} />
            </div>
            <h2 className={styles.sectionTitle}>
              Reporting Code of Conduct Violations
            </h2>
          </div>
          <div className={styles.prose}>
            <p>
              If you are being harassed, notice that someone else is being
              harassed, or come across a violation of the code of conduct,
              please contact a volunteer or organiser immediately. Our staff
              can be identified by event badges and organizer shirts on-site.
            </p>
          </div>

          <div className={styles.reportingBox}>
            <div className={styles.emailActionRow}>
              <div className={styles.emailAddressBlock}>
                <Mail aria-hidden="true" size={22} />
                <div>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "var(--color-on-dark-subtle)" }}>
                    Official Community Incident Desk
                  </span>
                  <a
                    className={styles.emailText}
                    href="mailto:nammaflutter@gmail.com?subject=%5BCOC%20Incident%20Report%5D%20Flutter%20South%20India"
                  >
                    nammaflutter@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.emailButtonActions}>
                <button
                  type="button"
                  className={`${styles.copyButton} ${copiedEmail === "nammaflutter@gmail.com" ? styles.copiedActive : ""}`}
                  onClick={() => handleCopy("nammaflutter@gmail.com")}
                  aria-label="Copy reporting email address"
                >
                  {copiedEmail === "nammaflutter@gmail.com" ? (
                    <>
                      <Check aria-hidden="true" size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" size={14} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  className="button button-primary"
                  style={{ minHeight: "2.5rem", padding: "0.45rem 1rem", fontSize: "0.85rem" }}
                  href="mailto:nammaflutter@gmail.com?subject=%5BCOC%20Incident%20Report%5D%20Flutter%20South%20India"
                >
                  <span>Compose Report</span>
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </div>
            </div>

            <div className={styles.anonymousBadge}>
              <Lock aria-hidden="true" size={16} />
              <span>All reporters will remain strictly anonymous.</span>
            </div>
          </div>
        </section>

        {/* Special Incidents - COC Wing Contacts */}
        <section id="emergency-contacts" className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Shield aria-hidden="true" size={20} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Special Incidents & Direct Contacts</h2>
            </div>
          </div>
          <div className={styles.prose}>
            <p>
              If you are uncomfortable reporting your situation to volunteers or
              general team members at the community directly, or in case of an
              urgent emergency, direct contact details for our dedicated{" "}
              <strong>Code of Conduct (COC) Wing</strong> are listed below:
            </p>
          </div>

          <div className={styles.contactsGrid}>
            {COC_LEADS.map((contact) => (
              <div key={contact.email} className={styles.contactCard}>
                <div className={styles.contactProfile}>
                  <div className={styles.avatar}>{contact.initials}</div>
                  <div className={styles.contactInfo}>
                    <strong>{contact.name}</strong>
                    <span className={styles.contactRole}>{contact.role}</span>
                  </div>
                </div>

                <div className={styles.contactActions}>
                  <a
                    className={styles.contactEmailLink}
                    href={`mailto:${contact.email}?subject=%5BCOC%20Direct%20Inquiry%5D%20Confidential`}
                    title={`Email ${contact.name}`}
                  >
                    <Mail aria-hidden="true" size={14} />
                    <span>{contact.email}</span>
                  </a>

                  <button
                    type="button"
                    className={`${styles.copyButton} ${copiedEmail === contact.email ? styles.copiedActive : ""}`}
                    onClick={() => handleCopy(contact.email)}
                    aria-label={`Copy email address for ${contact.name}`}
                  >
                    {copiedEmail === contact.email ? (
                      <>
                        <Check aria-hidden="true" size={13} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Action Card */}
        <section className={styles.ctaBox}>
          <h2>Join Us in Building a Better Community</h2>
          <p>
            Namma Flutter is powered by passionate technologists who care about
            inclusivity, open source, and learning together.
          </p>
          <div className={styles.ctaActions}>
            <a
              className="button button-primary"
              href="https://nammaflutter.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Visit Namma Flutter Community</span>
              <ExternalLink aria-hidden="true" size={16} />
            </a>
            <Link className="button button-quiet" style={{ color: "var(--color-white)", borderColor: "var(--color-line-light)" }} href="/">
              <ArrowLeft aria-hidden="true" size={16} />
              <span>Flutter South India 2026 Home</span>
            </Link>
          </div>
        </section>

        {/* Credit & Attribution */}
        <section id="credits" className={styles.creditBox}>
          <h4>Credit & Attribution</h4>
          <p>
            Portions of this Code of Conduct are based on the example code of
            conduct from the{" "}
            <a
              href="https://mlh.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MLH policies
            </a>
            , created by Major League Hacking, under a Creative Commons
            Attribution-ShareAlike 4.0 International Public License &amp; the
            code of conduct of{" "}
            <a
              href="https://fossunited.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              FOSS United
            </a>
            .
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className={`container ${styles.footer}`}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span>&copy; 2026 Namma Flutter Community. All rights reserved.</span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/">Event Home</Link>
            <a
              href="https://nammaflutter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Namma Flutter
            </a>
            <a
              href="https://github.com/nammaflutter"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="mailto:nammaflutter@gmail.com"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
