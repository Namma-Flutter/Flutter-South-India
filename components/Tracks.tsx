"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu } from "lucide-react";

const tracks = [
  {
    icon: Sparkles,
    level: "Beginner",
    color: "#22c55e",
    tag: "Track 1",
    desc: "Perfect for those new to Flutter or mobile development. Build your foundation.",
    sessions: [
      { title: "Getting Started with Flutter & Dart", speaker: "Priya Anand", role: "GDE Flutter" },
      { title: "Building Your First App from Scratch", speaker: "Rahul Kumar", role: "Flutter Developer" },
      { title: "Flutter Widgets: The Complete Guide", speaker: "Meena Suresh", role: "Senior Dev" },
      { title: "State Management for Beginners", speaker: "Arjun Nair", role: "Mobile Lead" },
    ],
  },
  {
    icon: Layers,
    level: "Intermediate",
    color: "#027DFD",
    tag: "Track 2",
    desc: "Elevate your skills with architecture, performance, and real-world patterns.",
    sessions: [
      { title: "Clean Architecture in Flutter", speaker: "Karthik Raj", role: "Tech Lead" },
      { title: "Riverpod 3.0: State Management Mastery", speaker: "Divya Krishnan", role: "GDE Flutter" },
      { title: "Flutter + Firebase: Real-time Apps", speaker: "Sanjay Iyer", role: "Cloud Architect" },
      { title: "Testing Strategies for Production Apps", speaker: "Lakshmi Balan", role: "QA Lead" },
    ],
  },
  {
    icon: Cpu,
    level: "Advanced",
    color: "#a855f7",
    tag: "Track 3",
    desc: "Deep dives into internals, platform channels, rendering, and cutting-edge topics.",
    sessions: [
      { title: "Flutter Engine Internals & Rendering", speaker: "Vikram Sood", role: "Flutter Team" },
      { title: "Platform Channels & Native Interop", speaker: "Ananya Patel", role: "Platform Lead" },
      { title: "Impeller: GPU-Accelerated Rendering", speaker: "Rohan Mehta", role: "Graphics Eng" },
      { title: "Building Flutter DevTools Extensions", speaker: "Saanvi Rao", role: "DevTools Eng" },
    ],
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="section-pad bg-[var(--surface-alt)] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Conference Program
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            3 Technical <span className="gradient-text">Tracks</span>
          </motion.h2>
          <motion.div
            className="divider mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          />
          <motion.p
            className="text-[color:var(--foreground)]/55 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Something for every level — from your first Flutter app to advanced engine internals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <motion.div
              key={track.level}
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
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: `${track.color}20`, color: track.color }}
                  >
                    {track.tag}
                  </span>
                  <track.icon size={18} style={{ color: track.color }} />
                </div>
                <h3 className="text-[var(--foreground)] font-black text-2xl mb-2">{track.level}</h3>
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
