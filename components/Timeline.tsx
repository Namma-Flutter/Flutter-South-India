"use client";

import { motion } from "framer-motion";

const events = [
  { time: "8:00 AM", title: "Registration & Welcome Kit", desc: "Check-in, collect swag, and grab coffee. Get your badge and explore the venue." },
  { time: "9:00 AM", title: "Opening Keynote", desc: "A grand welcome address and exciting announcements about the Flutter ecosystem." },
  { time: "10:00 AM", title: "Track Sessions Begin", desc: "All three parallel tracks kick off — Beginner, Intermediate, and Advanced." },
  { time: "1:00 PM", title: "Lunch & Networking", desc: "Connect with fellow developers over lunch. Visit hiring stalls and the startup expo." },
  { time: "2:30 PM", title: "Workshops & Deep Dives", desc: "Hands-on workshops, live coding, and interactive sessions across all tracks." },
  { time: "4:30 PM", title: "Lightning Talks", desc: "5-minute power talks from community members. Apply to present your side project!" },
  { time: "5:30 PM", title: "Games & Activities", desc: "Flutter quiz, trivia, and fun activities with exciting prizes." },
  { time: "6:30 PM", title: "Closing Ceremony", desc: "Awards, recognition, speaker gifts, and the big announcement for next year." },
];

export default function Timeline() {
  return (
    <section className="section-pad">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Event Journey
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
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
          {/* Vertical spine */}
          <div className="absolute left-[11px] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#027DFD] via-[#13B9FD]/40 to-transparent" />

          <div className="space-y-8">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-start md:items-center gap-6 md:gap-0"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-[#050810] border-2 border-[#027DFD] shadow-[0_0_14px_rgba(2,125,253,0.7)]" />

                  {/* Card — mobile: always right of dot; desktop: alternating */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] ${
                    isLeft
                      ? "md:mr-auto md:pr-6 md:text-right"
                      : "md:ml-auto md:pl-6 md:text-left"
                  }`}>
                    <div className="glass rounded-2xl p-5 border border-white/8 hover:border-[#027DFD]/35 transition-all duration-300">
                      <span className="text-[11px] font-bold text-[#13B9FD] tracking-widest uppercase mb-1 block">
                        {event.time}
                      </span>
                      <h3 className="text-white font-bold text-base mb-1">{event.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{event.desc}</p>
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
