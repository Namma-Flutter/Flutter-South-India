"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import speakersData from "@/data/speakers.json";

interface Speaker {
  name: string;
  role: string;
  topic: string;
  bio: string;
  initials: string;
  color: string;
  track: string;
  profileUrl: string;
  pdfUrl: string;
}

/* Speaker line-up is being confirmed — data/speakers.json holds placeholders until announced */
const speakers = speakersData as Speaker[];

export default function Speakers() {
  return (
    <section id="speakers" className="section-pad mesh-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p className="section-label mb-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Confirmed Speakers
          </motion.p>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Meet the <span className="gradient-text">Speakers</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-5 sm:mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-[color:var(--foreground)]/55 max-w-2xl mx-auto text-xs sm:text-sm"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Flutter engineers, GDEs, and industry leaders sharing expertise across all three tracks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[var(--card-border)] group hover:border-[var(--flutter-blue)]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Avatar — white initials on colored gradient bg is intentional & correct */}
              <div
                className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-xl sm:text-2xl mb-4 sm:mb-5 shadow-lg relative"
                style={{
                  background: `linear-gradient(135deg, ${speaker.color}40, ${speaker.color}18)`,
                  border: `2px solid ${speaker.color}40`,
                }}
              >
                {speaker.initials}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 24px ${speaker.color}40` }} />
              </div>

              {/* Track badge */}
              <span
                className="text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4"
                style={{ background: `${speaker.color}18`, color: speaker.color }}
              >
                {speaker.track}
              </span>

              <h3 className="text-[var(--foreground)] font-black text-lg sm:text-xl mb-1">{speaker.name}</h3>
              <p className="text-[var(--flutter-cyan)] text-[10px] sm:text-xs mb-3 sm:mb-4 font-semibold">{speaker.role}</p>

              <p className="text-[color:var(--foreground)]/70 text-xs sm:text-sm font-semibold leading-snug mb-2">
                {speaker.topic}
              </p>
              <p className="text-[color:var(--foreground)]/45 text-[10px] sm:text-xs leading-relaxed flex-1">{speaker.bio}</p>

              <div className="mt-5 pt-4 border-t border-[var(--card-border)] w-full flex items-center justify-center gap-4">
                <a href={speaker.profileUrl}
                  className="flex items-center gap-1.5 text-[color:var(--foreground)]/35 hover:text-[var(--flutter-cyan)] text-xs transition-colors">
                  <ExternalLink size={11} />
                  Profile
                </a>
                <a href={speaker.pdfUrl}
                  className="flex items-center gap-1.5 text-[color:var(--foreground)]/35 hover:text-[var(--flutter-cyan)] text-xs transition-colors">
                  <FileText size={11} />
                  Details PDF
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
          <p className="text-[color:var(--foreground)]/40 text-sm">
            More speakers being announced soon —{" "}
            <a href="#get-involved" className="text-[var(--flutter-cyan)] hover:underline">apply to speak</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
