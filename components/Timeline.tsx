"use client";

import { motion } from "framer-motion";
import agendaData from "@/data/agenda.json";

type SlotType = "plenary" | "track" | "break" | "panel" | "closing";
interface AgendaSlot {
  time: string;
  title: string;
  type: SlotType;
  person?: string;
  tracks?: { t1: string; t2: string; t3: string };
}

/* Derived directly from data/agenda.json so the journey view and the detailed
   agenda table can never drift out of sync with each other. */
const events = (agendaData as AgendaSlot[]).map((slot) => ({
  time: slot.time,
  title: slot.type === "track" ? "Track Sessions" : slot.title,
  desc: slot.type === "track"
    ? "Parallel sessions across Track 1, Track 2, and Track 3."
    : slot.person ?? "",
}));

export default function Timeline() {
  return (
    <section className="section-pad">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Event Journey
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Day <span className="gradient-text">Schedule</span>
          </motion.h2>
          <motion.div
            className="divider mx-auto"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          />
        </div>

        <div className="relative">
          {/* Vertical spine — left on mobile, centre on desktop */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-2 bottom-2 w-0.5 bg-gradient-to-b from-[var(--flutter-blue)] via-[var(--flutter-cyan)]/40 to-transparent" />

          <div className="space-y-6 md:space-y-8">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 md:pl-0 flex md:items-center"
                >
                  {/* Dot — anchored to spine */}
                  <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-5 md:top-1/2 md:-translate-y-1/2 z-10 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-[var(--flutter-blue)] shadow-[0_0_14px_rgba(2,125,253,0.7)]" />

                  {/* Card — right of dot on mobile; alternating on desktop */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] ${
                    isLeft
                      ? "md:mr-auto md:pr-6 md:text-right"
                      : "md:ml-auto md:pl-6 md:text-left"
                  }`}>
                    <div className="glass rounded-2xl p-5 border border-[var(--card-border)] hover:border-[var(--flutter-blue)]/35 transition-all duration-300">
                      <span className="text-[11px] font-bold text-[var(--flutter-cyan)] tracking-widest uppercase mb-1 block">
                        {event.time}
                      </span>
                      <h3 className="text-[var(--foreground)] font-bold text-base mb-1">{event.title}</h3>
                      <p className="text-[color:var(--foreground)]/50 text-sm leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
