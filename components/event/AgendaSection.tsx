"use client";

import { useState } from "react";
import { agendaSlots, type AgendaSlot, type AgendaSession } from "@/data/event/agenda";
import SectionIntro from "@/components/ui/SectionIntro";
import styles from "./AgendaSection.module.css";

/* ── Track toggle filter ─────────────────────────────────────────── */
type TrackFilter = "all" | "track1" | "track2";

function TrackPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`${styles.pill} ${active ? styles.pillActive : ""}`}
      onClick={onClick}
      aria-pressed={active}
      type="button"
    >
      {label}
    </button>
  );
}

/* ── Session card ─────────────────────────────────────────────────── */
function SessionCard({
  session,
  index,
  trackNumber,
  align = "left",
}: {
  session: AgendaSession;
  index: number;
  trackNumber?: 1 | 2;
  align?: "left" | "center";
}) {
  const isSpecial = ["registration", "ceremony", "break", "standup"].includes(session.type);
  const isDevRoom = session.type === "devroom";
  const isPanel = session.type === "panel";

  const renderBadge = () => {
    return (
      <div className={styles.badgeGroup}>
        {trackNumber && (
          <span
            className={`${styles.badge} ${
              trackNumber === 1 ? styles.badgeTrack1 : styles.badgeTrack2
            }`}
          >
            Track {trackNumber}
          </span>
        )}
        {session.type === "registration" && (
          <span className={`${styles.badge} ${styles.badgeSpecial}`}>Check-in</span>
        )}
        {session.type === "ceremony" && (
          <span className={`${styles.badge} ${styles.badgeSpecial}`}>Main Stage</span>
        )}
        {session.type === "break" && (
          <span className={`${styles.badge} ${styles.badgeBreak}`}>Break</span>
        )}
        {session.type === "standup" && (
          <span className={`${styles.badge} ${styles.badgeSpecial}`}>Community</span>
        )}
        {isPanel && (
          <span className={`${styles.badge} ${styles.badgeSpecial}`}>Panel</span>
        )}
        {isDevRoom && (
          <span className={`${styles.badge} ${styles.badgeDevRoom}`}>Dev Room</span>
        )}
      </div>
    );
  };

  const cardClasses = [
    styles.sessionCard,
    styles[`type_${session.type}`],
    align === "center" ? styles.cardCentered : styles.cardLeft,
    trackNumber === 2 ? styles.cardTrack2 : "",
  ].filter(Boolean).join(" ");

  const renderSpeaker = () => {
    if (session.speakers && session.speakers.length > 0) {
      return (
        <p className={styles.sessionSpeaker}>
          {session.speakers.map((sp, idx) => (
            <span key={sp.name}>
              {idx > 0 && <span className={styles.speakerAmp}>&</span>}
              {sp.profileUrl ? (
                <a
                  href={sp.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.speakerLink}
                  title={`${sp.name} on LinkedIn`}
                >
                  <span>{sp.name}</span>
                  <svg
                    className={styles.speakerLinkIcon}
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              ) : (
                <span>{sp.name}</span>
              )}
            </span>
          ))}
        </p>
      );
    }

    if (!session.speaker) return null;

    return <p className={styles.sessionSpeaker}>{session.speaker}</p>;
  };

  return (
    <div
      className={cardClasses}
      style={{ "--card-index": index } as React.CSSProperties}
    >
      {align === "left" && !isSpecial && (
        <div className={styles.sessionAccent} aria-hidden="true" />
      )}
      <div className={styles.cardHeader}>
        {renderBadge()}
      </div>
      <h4 className={styles.sessionTitle}>{session.title}</h4>
      {renderSpeaker()}
      {session.company && (
        <p className={styles.sessionCompany}>{session.company}</p>
      )}
      {isDevRoom && (
        <p className={styles.sessionCompany}>Open group discussion on open topics</p>
      )}
    </div>
  );
}

/* ── Timeline dot with pulse ──────────────────────────────────────── */
function TimelineDot({ isSpecial }: { isSpecial: boolean }) {
  return (
    <div className={`${styles.timelineDot} ${isSpecial ? styles.timelineDotSpecial : ""}`}>
      <span className={styles.dotInner} />
      <span className={styles.dotPulse} aria-hidden="true" />
    </div>
  );
}

/* ── Main AgendaSection ──────────────────────────────────────────── */
export default function AgendaSection() {
  const [filter, setFilter] = useState<TrackFilter>("all");

  const shouldShow = (slot: AgendaSlot) => {
    if (filter === "all" || slot.fullWidth) return true;
    if (filter === "track1") return Boolean(slot.track1);
    return Boolean(slot.track2);
  };

  return (
    <section className={styles.agenda} id="agenda">
      <div className={`container ${styles.agendaInner}`}>
        {/* header */}
        <div className={styles.agendaHeader}>
          <SectionIntro
            eyebrow="Event Agenda"
            title="A full day of Flutter, Dart, and community."
            copy="Saturday, 10 October 2026 · SRM IST Ramapuram, Chennai. Two parallel tracks of talks, panels, and discussions."
            inverse
          />
          <div className={styles.filterBar} data-reveal>
            <TrackPill
              active={filter === "all"}
              label="All sessions"
              onClick={() => setFilter("all")}
            />
            <TrackPill
              active={filter === "track1"}
              label="Track 1"
              onClick={() => setFilter("track1")}
            />
            <TrackPill
              active={filter === "track2"}
              label="Track 2"
              onClick={() => setFilter("track2")}
            />
          </div>
        </div>

        {/* Track Venues Bar */}
        <div className={styles.trackHeaderBar} aria-label="Venues by track">
          <div className={styles.trackHeaderTimeSpacer} aria-hidden="true" />
          <div className={styles.trackHeaderSpineSpacer} aria-hidden="true" />
          <div className={styles.trackHeaderContent}>
            {filter === "all" ? (
              <div className={styles.trackVenueCols}>
                <div className={`${styles.venueCard} ${styles.venueCardTrack1}`}>
                  <div className={styles.venueBadge}>
                    <span className={styles.venueDot1} />
                    <span className={styles.venueTrackLabel1}>Track 1</span>
                  </div>
                  <span className={styles.venueDivider}>•</span>
                  <div className={styles.venueLocation}>
                    <svg
                      className={styles.venuePin}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className={styles.venueHallName}>Main Hall</span>
                  </div>
                </div>

                <div className={`${styles.venueCard} ${styles.venueCardTrack2}`}>
                  <div className={styles.venueBadge}>
                    <span className={styles.venueDot2} />
                    <span className={styles.venueTrackLabel2}>Track 2</span>
                  </div>
                  <span className={styles.venueDivider}>•</span>
                  <div className={styles.venueLocation}>
                    <svg
                      className={styles.venuePin}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className={styles.venueHallName}>Workshop Room</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.trackVenueSingle}>
                {filter === "track1" ? (
                  <div className={`${styles.venueCard} ${styles.venueCardTrack1} ${styles.venueCardSingleFit}`}>
                    <div className={styles.venueBadge}>
                      <span className={styles.venueDot1} />
                      <span className={styles.venueTrackLabel1}>Track 1</span>
                    </div>
                    <span className={styles.venueDivider}>•</span>
                    <div className={styles.venueLocation}>
                      <svg
                        className={styles.venuePin}
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className={styles.venueHallName}>Main Hall</span>
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.venueCard} ${styles.venueCardTrack2} ${styles.venueCardSingleFit}`}>
                    <div className={styles.venueBadge}>
                      <span className={styles.venueDot2} />
                      <span className={styles.venueTrackLabel2}>Track 2</span>
                    </div>
                    <span className={styles.venueDivider}>•</span>
                    <div className={styles.venueLocation}>
                      <svg
                        className={styles.venuePin}
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className={styles.venueHallName}>Workshop Room</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} aria-hidden="true" />

          {agendaSlots.map((slot, i) => {
            if (!shouldShow(slot)) return null;
            const isSpecialRow = slot.fullWidth === true;

            const rowClasses = [
              styles.timelineRow,
              isSpecialRow ? styles.timelineRowFull : "",
            ].filter(Boolean).join(" ");

            return (
              <div
                key={i}
                className={rowClasses}
              >
                {/* 1. Time Column */}
                <div className={styles.timeCell}>
                  <span className={`${styles.timeLabel} ${isSpecialRow ? styles.timeLabelSpecial : ""}`}>
                    {slot.time}
                  </span>
                </div>

                {/* 2. Timeline Spine with Dot */}
                <div className={styles.spineCell}>
                  <TimelineDot isSpecial={isSpecialRow} />
                </div>

                {/* 3. Cards Column */}
                <div className={styles.cardsCol}>
                  {isSpecialRow && slot.track1 ? (
                    <div className={styles.fullWidthSession}>
                      <SessionCard
                        session={slot.track1}
                        index={0}
                        align="center"
                      />
                    </div>
                  ) : (
                    <div className={`${styles.trackColumns} ${filter !== "all" ? styles.trackColumnsSingle : ""}`}>
                      {(filter === "all" || filter === "track1") && slot.track1 && (
                        <SessionCard
                          session={slot.track1}
                          index={0}
                          trackNumber={1}
                          align={filter === "all" ? "left" : "center"}
                        />
                      )}
                      {(filter === "all" || filter === "track2") && slot.track2 && (
                        <SessionCard
                          session={slot.track2}
                          index={1}
                          trackNumber={2}
                          align={filter === "all" ? "left" : "center"}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* footer note */}
        <p className={styles.agendaNote} data-reveal>
          Schedule subject to change.
        </p>
      </div>
    </section>
  );
}
