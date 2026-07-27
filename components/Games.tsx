"use client";

import { motion } from "framer-motion";
import { Gamepad2, Brain, Gift, Shuffle } from "lucide-react";

const activities = [
  { icon: Brain, title: "Flutter Quiz", desc: "Test your Flutter & Dart knowledge in a live quiz with exciting prizes for top performers." },
  { icon: Gamepad2, title: "Widget Bingo", desc: "Build a UI with mystery widgets — first one to complete the layout wins!" },
  { icon: Shuffle, title: "Hackathon Sprint", desc: "2-hour mini hackathon. Build something creative with Flutter. Judges pick the best." },
  { icon: Gift, title: "Swag & Raffles", desc: "Hourly prize draws throughout the day. Speaker merchandise and exclusive conference swag." },
];

export default function Games() {
  return (
    <section id="games" className="section-pad mesh-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.p className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Fun & Learning
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Games & <span className="gradient-text">Activities</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-[color:var(--foreground)]/55 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Because great conferences aren't just talks — they're experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 border border-[var(--card-border)] hover:border-[var(--flutter-blue)]/30 hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--flutter-blue)]/20 to-[var(--flutter-cyan)]/10 flex items-center justify-center mx-auto mb-4 border border-[var(--flutter-blue)]/20 group-hover:scale-110 transition-transform duration-300">
                <activity.icon size={24} className="text-[var(--flutter-cyan)]" />
              </div>
              <h3 className="text-[var(--foreground)] font-bold text-lg mb-2">{activity.title}</h3>
              <p className="text-[color:var(--foreground)]/50 text-sm leading-relaxed">{activity.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
