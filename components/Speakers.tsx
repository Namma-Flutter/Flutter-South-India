"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Speaker {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  track: string;
  profileUrl: string;
}

const speakers: Speaker[] = [
  {
    name: "Speaker 1",
    role: "Flutter GDE · Google",
    track: "Beginner",
    initials: "S1",
    color: "#22c55e",
    bio: "Google Developer Expert in Flutter. Expert in building production-grade Flutter applications and community education.",
    profileUrl: "#",
  },
  {
    name: "Speaker 2",
    role: "Tech Lead · Industry",
    track: "Intermediate",
    initials: "S2",
    color: "#027DFD",
    bio: "Clean Architecture advocate. Building scalable Flutter solutions for millions of users. Speaker at multiple Flutter events.",
    profileUrl: "#",
  },
  {
    name: "Speaker 3",
    role: "Flutter Team · Google",
    track: "Advanced",
    initials: "S3",
    color: "#a855f7",
    bio: "Core contributor to the Flutter engine. Speaker at Flutter Forward and Google I/O. Expert in rendering and performance.",
    profileUrl: "#",
  },
];

const trackColor: Record<string, string> = {
  Beginner:     "#22c55e",
  Intermediate: "#027DFD",
  Advanced:     "#a855f7",
};

export default function Speakers() {
  return (
    <section id="speakers" className="section-pad mesh-bg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <motion.p className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Confirmed Speakers
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Meet the <span className="gradient-text">Speakers</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-[color:var(--foreground)]/55 max-w-xl mx-auto text-sm"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Flutter engineers, GDEs, and industry leaders sharing expertise across all three tracks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-7 border border-[var(--card-border)] group hover:border-[var(--flutter-blue)]/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-5 shadow-lg relative"
                style={{
                  background: `linear-gradient(135deg, ${speaker.color}40, ${speaker.color}18)`,
                  border: `2px solid ${speaker.color}40`,
                }}
              >
                {speaker.initials}
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 24px ${speaker.color}40` }} />
              </div>

              {/* Track badge */}
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full mb-4"
                style={{ background: `${trackColor[speaker.track]}18`, color: trackColor[speaker.track] }}
              >
                {speaker.track} Track
              </span>

              <h3 className="text-[var(--foreground)] font-black text-xl mb-1">{speaker.name}</h3>
              <p className="text-[var(--flutter-cyan)] text-xs mb-4 font-semibold">{speaker.role}</p>
              <p className="text-[color:var(--foreground)]/45 text-xs leading-relaxed flex-1">{speaker.bio}</p>

              <a href={speaker.profileUrl}
                className="mt-5 pt-4 border-t border-[var(--card-border)] w-full flex items-center justify-center gap-1.5 text-[color:var(--foreground)]/35 hover:text-[var(--flutter-cyan)] text-xs transition-colors">
                <ExternalLink size={11} />
                View Profile
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
          <p className="text-[color:var(--foreground)]/40 text-sm">
            More speakers being announced soon —{" "}
            <a href="mailto:nammaflutter@gmail.com" className="text-[var(--flutter-cyan)] hover:underline">apply to speak</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
