"use client";

import { motion } from "framer-motion";
import { Clock, Users, Mic2, Coffee, Award } from "lucide-react";

type SlotType = "plenary" | "track" | "break" | "panel" | "closing";

interface AgendaSlot {
  time: string;
  title: string;
  type: SlotType;
  person?: string;
  tracks?: { t1: string; t2: string; t3: string };
}

const agenda: AgendaSlot[] = [
  { time: "08:30 – 10:00", title: "Registration & Welcome Desk", type: "plenary", person: "Volunteers Team" },
  { time: "10:00 – 10:30", title: "Welcome Note, Community Introduction & Opening Ceremony", type: "plenary", person: "Organising Committee" },
  { time: "10:30 – 10:45", title: "Sponsor Talk", type: "plenary", person: "Title Sponsor" },
  {
    time: "11:00 – 11:30", title: "Session Block 1", type: "track",
    tracks: { t1: "Beginner Track", t2: "Intermediate Track", t3: "Advanced Track" },
  },
  {
    time: "11:35 – 12:05", title: "Session Block 2", type: "track",
    tracks: { t1: "Beginner Track", t2: "Intermediate Track", t3: "Advanced Track" },
  },
  {
    time: "12:10 – 12:40", title: "Session Block 3", type: "track",
    tracks: { t1: "Beginner Track", t2: "Intermediate Track", t3: "Advanced Track" },
  },
  {
    time: "12:45 – 01:15", title: "Session Block 4", type: "track",
    tracks: { t1: "Beginner Track", t2: "Intermediate Track", t3: "Advanced Track" },
  },
  { time: "01:20 – 02:25", title: "Lunch Break", type: "break", person: "All Attendees" },
  {
    time: "02:30 – 03:00", title: "Session Block 5", type: "track",
    tracks: { t1: "Beginner Track", t2: "Intermediate Track", t3: "Advanced Track" },
  },
  {
    time: "03:05 – 03:35", title: "Session Block 6", type: "track",
    tracks: { t1: "Beginner Track", t2: "Intermediate Track", t3: "Advanced Track" },
  },
  { time: "03:45 – 04:30", title: "Panel Discussion", type: "panel", person: "Main Auditorium · 4–5 Panellists" },
  { time: "04:30 – 05:30", title: "Closing Ceremony & Group Photos", type: "closing", person: "All Attendees" },
];

const typeConfig: Record<SlotType, { color: string; bg: string; icon: typeof Clock }> = {
  plenary:  { color: "#027DFD", bg: "rgba(2,125,253,0.10)",  icon: Mic2    },
  track:    { color: "#13B9FD", bg: "rgba(19,185,253,0.08)", icon: Users   },
  break:    { color: "#22c55e", bg: "rgba(34,197,94,0.10)",  icon: Coffee  },
  panel:    { color: "#a855f7", bg: "rgba(168,85,247,0.10)", icon: Users   },
  closing:  { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", icon: Award   },
};

const trackColors = ["#027DFD", "#13B9FD", "#a855f7"] as const;
const trackLabels = ["Track 1 · Beginner", "Track 2 · Intermediate", "Track 3 · Advanced"];

export default function Agenda() {
  return (
    <section id="agenda" className="section-pad bg-[var(--background)] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <motion.p className="section-label mb-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Event Schedule
          </motion.p>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Event <span className="gradient-text">Agenda</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-5 sm:mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-[color:var(--foreground)]/55 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Flutter South India 2026 · <strong className="text-[var(--flutter-cyan)]">October 10, 2026</strong> · 09:30 AM – 5:30 PM · Loyola College, Chennai
          </motion.p>
        </div>

        {/* Track legend */}
        <motion.div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          {trackLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2 text-xs font-medium" style={{ color: trackColors[i] }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: trackColors[i] }} />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Slots */}
        <div className="space-y-3">
          {agenda.map((slot, i) => {
            const cfg = typeConfig[slot.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.005]"
                style={{ borderColor: `${cfg.color}22` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Time strip */}
                  <div
                    className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 sm:w-48 flex-shrink-0 sm:border-r border-b sm:border-b-0"
                    style={{ background: cfg.bg, borderColor: `${cfg.color}18` }}
                  >
                    <Icon size={14} style={{ color: cfg.color }} className="flex-shrink-0" />
                    <span className="text-xs font-bold tabular-nums" style={{ color: cfg.color }}>{slot.time}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-4 sm:px-5 py-3 sm:py-4">
                    {slot.type === "track" && slot.tracks ? (
                      <div>
                        <p className="text-[color:var(--foreground)]/50 text-[10px] uppercase tracking-widest font-semibold mb-2">Parallel Sessions</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[slot.tracks.t1, slot.tracks.t2, slot.tracks.t3].map((t, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs rounded-lg px-3 py-2"
                              style={{ background: `${trackColors[j]}12`, color: trackColors[j] }}>
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: trackColors[j] }} />
                              <span className="font-medium">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className="text-[var(--foreground)] font-semibold text-sm">{slot.title}</p>
                        {slot.person && (
                          <p className="text-[color:var(--foreground)]/45 text-xs italic">{slot.person}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
