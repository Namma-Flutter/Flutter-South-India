"use client";

import { motion } from "framer-motion";
import { Zap, Users, Globe, Award } from "lucide-react";

const highlights = [
  { icon: Zap, title: "Expert Talks", desc: "Deep-dive sessions from Flutter engineers, GDEs, and industry leaders." },
  { icon: Users, title: "Community First", desc: "Built by the Namma Flutter community, for every Flutter developer." },
  { icon: Globe, title: "3 Tracks", desc: "Beginner, Intermediate, and Advanced tracks running in parallel." },
  { icon: Award, title: "Hands-On", desc: "Workshops, hackathons, hiring stalls, and a startup expo." },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <section id="about" className="section-pad mesh-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p className="section-label mb-3" {...fadeUp()}>
            About the Conference
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6 leading-tight"
            {...fadeUp(0.08)}
          >
            Where Flutter Developers<br />
            <span className="gradient-text">Come Together</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-5 sm:mb-6" {...fadeUp(0.12)} />
          <motion.p
            className="text-[color:var(--foreground)]/55 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            {...fadeUp(0.16)}
          >
            Flutter South India 2026 is the largest Flutter conference in South India — a full-day
            celebration of cross-platform development, open-source innovation, and developer community.
            Organised by Namma Flutter, Chennai's thriving Flutter meetup group.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.1)}
              className="glass rounded-2xl p-6 border border-[var(--card-border)] group hover:border-[var(--flutter-blue)]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--flutter-blue)]/15 flex items-center justify-center mb-4 group-hover:bg-[var(--flutter-blue)]/25 transition-colors">
                <item.icon size={22} className="text-[var(--flutter-cyan)]" />
              </div>
              <h3 className="text-[var(--foreground)] font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-[color:var(--foreground)]/55 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
