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
        {session.type === "break" &&
          (session.highlight ? (
            <span className={`${styles.badge} ${styles.badgeProvided}`}>
              <span className={styles.badgeProvidedDot} />
              {session.highlight}
            </span>
          ) : (
            <span className={`${styles.badge} ${styles.badgeBreak}`}>Break</span>
          ))}
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
      {session.illustration === "lunch" && (
        <div className={styles.breakIllustrationBox}>
          <LunchSteamVector />
        </div>
      )}
      {session.illustration === "tea" && (
        <div className={styles.breakIllustrationBox}>
          <TeaSteamVector />
        </div>
      )}
      <h4 className={styles.sessionTitle}>{session.title}</h4>
      {session.description && (
        <p className={styles.sessionDescription}>{session.description}</p>
      )}
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

/* ── Lunch Animated Tech Vector Illustration ──────────────────────── */
function LunchSteamVector() {
  return (
    <div className={styles.breakVectorWrap} aria-hidden="true">
      <svg
        viewBox="0 0 160 100"
        className={styles.breakVectorSvg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="lunchGlow" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#ffb84d" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ff9800" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ff9800" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="clocheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc977" />
            <stop offset="45%" stopColor="#ff9f2e" />
            <stop offset="100%" stopColor="#e67e10" />
          </linearGradient>
          <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
          </linearGradient>
        </defs>

        {/* Ambient warm radial glow */}
        <ellipse cx="80" cy="56" rx="55" ry="38" fill="url(#lunchGlow)" />

        {/* Animated Rising Steam Wisps */}
        <g className={styles.steamGroup}>
          <path
            className={`${styles.steamPath} ${styles.steam1}`}
            d="M66 42 C 63 35, 69 29, 65 20 C 62 13, 67 8, 64 3"
            stroke="#ffc977"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            className={`${styles.steamPath} ${styles.steam2}`}
            d="M80 38 C 77 30, 83 23, 79 14 C 76 7, 81 3, 78 1"
            stroke="#ffdda8"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            className={`${styles.steamPath} ${styles.steam3}`}
            d="M94 42 C 97 35, 91 29, 95 20 C 98 13, 93 8, 96 3"
            stroke="#ffc977"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Serving Dome Handle Knob */}
        <circle cx="80" cy="46" r="4.2" fill="url(#clocheGrad)" />
        <ellipse cx="80" cy="49.5" rx="3" ry="1.2" fill="#b85a00" />

        {/* Cloche Dome */}
        <path
          d="M52 75 C 52 56, 63 48, 80 48 C 97 48, 108 56, 108 75 Z"
          fill="url(#clocheGrad)"
          opacity="0.95"
        />
        {/* Dome light sheen */}
        <path
          d="M57 73 C 59 60, 68 53, 80 52 C 73 55, 65 62, 63 73 Z"
          fill="white"
          opacity="0.32"
        />

        {/* Base rim */}
        <rect x="48" y="74" width="64" height="3" rx="1.5" fill="#ffe0a3" />

        {/* Base Platter */}
        <ellipse cx="80" cy="80.5" rx="44" ry="5.5" fill="#1b2a3a" stroke="url(#plateGrad)" strokeWidth="1.2" />
        <ellipse cx="80" cy="80" rx="36" ry="3" fill="none" stroke="rgba(255, 184, 77, 0.4)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

/* ── Tea & Refreshments Animated Tech Vector Illustration ─────────── */
function TeaSteamVector() {
  return (
    <div className={styles.breakVectorWrap} aria-hidden="true">
      <svg
        viewBox="0 0 160 100"
        className={styles.breakVectorSvg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="teaGlow" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#ffb84d" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ff9800" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ff9800" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc977" />
            <stop offset="45%" stopColor="#ff9f2e" />
            <stop offset="100%" stopColor="#d97106" />
          </linearGradient>
          <linearGradient id="teaSurfaceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8d4004" />
            <stop offset="100%" stopColor="#602900" />
          </linearGradient>
          <linearGradient id="saucerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
          </linearGradient>
        </defs>

        {/* Ambient warm radial glow */}
        <ellipse cx="80" cy="56" rx="55" ry="38" fill="url(#teaGlow)" />

        {/* Animated Rising Steam Wisps */}
        <g className={styles.steamGroup}>
          <path
            className={`${styles.steamPath} ${styles.steam1}`}
            d="M68 40 C 65 32, 71 26, 67 17 C 64 10, 69 5, 66 1"
            stroke="#ffc977"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            className={`${styles.steamPath} ${styles.steam2}`}
            d="M80 36 C 77 28, 83 21, 79 12 C 76 5, 81 2, 78 0"
            stroke="#ffdda8"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            className={`${styles.steamPath} ${styles.steam3}`}
            d="M92 40 C 95 32, 89 26, 93 17 C 96 10, 91 5, 94 1"
            stroke="#ffc977"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Cup Body */}
        <path
          d="M58 48 C 58 72, 67 78, 80 78 C 93 78, 102 72, 102 48 Z"
          fill="url(#cupGrad)"
          opacity="0.95"
        />
        {/* Cup sheen */}
        <path
          d="M62 48 C 62 67, 69 73, 76 75 C 72 73, 67 67, 67 48 Z"
          fill="white"
          opacity="0.32"
        />

        {/* Cup Rim & Tea Liquid */}
        <ellipse cx="80" cy="48" rx="22" ry="4" fill="url(#cupGrad)" />
        <ellipse cx="80" cy="48.5" rx="19.5" ry="3" fill="url(#teaSurfaceGrad)" />
        <ellipse cx="78" cy="48.2" rx="14" ry="1.6" fill="#a0520a" opacity="0.6" />

        {/* Cup Handle */}
        <path
          d="M101 52 C 114 52, 114 69, 100 70"
          stroke="url(#cupGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Saucer Base */}
        <ellipse cx="80" cy="80.5" rx="42" ry="5.5" fill="#1b2a3a" stroke="url(#saucerGrad)" strokeWidth="1.2" />
        <ellipse cx="80" cy="80" rx="34" ry="3" fill="none" stroke="rgba(255, 184, 77, 0.4)" strokeWidth="0.8" />
      </svg>
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
                    <span className={styles.venueHallName}>Geetham Hall</span>
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
                    <span className={styles.venueHallName}>Gallery Hall</span>
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
                      <span className={styles.venueHallName}>Geetham Hall</span>
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
                      <span className={styles.venueHallName}>Gallery Hall</span>
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
