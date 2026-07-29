"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu } from "lucide-react";
import tracksData from "@/data/tracks.json";

interface Session { title: string; speaker: string; role: string; }
interface TrackInfo { tag: string; color: string; desc: string; sessions: Session[]; }

/* Icons assigned by position — track topics/levels aren't finalised yet, so we don't label them by skill */
const trackIcons = [Sparkles, Layers, Cpu];
const tracks = (tracksData as TrackInfo[]).map((t, i) => ({ ...t, icon: trackIcons[i] ?? Sparkles }));

export default function Tracks() {
  return (
    <section id="tracks" className="section-pad bg-[var(--surface-alt)] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Conference Program
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            3 Technical <span className="gradient-text">Tracks</span>
          </motion.h2>
          <motion.div
            className="divider mx-auto mb-5 sm:mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          />
          <motion.p
            className="text-[color:var(--foreground)]/55 text-sm sm:text-base max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Three parallel tracks running throughout the day — full lineup announced soon.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <motion.div
              key={track.tag}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl border overflow-hidden hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: `${track.color}30` }}
            >
              {/* Track header */}
              <div className="p-6 border-b border-[var(--card-border)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${track.color}18` }}>
                    <track.icon size={18} style={{ color: track.color }} />
                  </div>
                </div>
                <h3 className="text-[var(--foreground)] font-black text-2xl mb-2">{track.tag}</h3>
                <p className="text-[color:var(--foreground)]/55 text-sm leading-relaxed">{track.desc}</p>
              </div>

              {/* Sessions */}
              <div className="p-4 space-y-2">
                {track.sessions.map((session, j) => (
                  <div
                    key={j}
                    className="rounded-xl p-3 bg-[var(--glass-bg)] border border-[var(--card-border)] hover:border-[var(--flutter-blue)]/25 transition-all duration-200"
                  >
                    <p className="text-[color:var(--foreground)]/90 text-sm font-semibold leading-snug mb-0.5">{session.title}</p>
                    <p className="text-[color:var(--foreground)]/40 text-xs">
                      {session.speaker} · <span style={{ color: track.color }}>{session.role}</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
