"use client";

import { motion } from "framer-motion";
import { Heart, Star, Coffee, Shield } from "lucide-react";

const roles = [
  { icon: Shield, title: "Registration Desk", desc: "Help attendees check in, collect swag kits, and navigate the venue." },
  { icon: Coffee, title: "Session Support", desc: "Manage AV, room logistics, and speaker assistance across all tracks." },
  { icon: Star, title: "Social Media Team", desc: "Live-post updates, capture moments, and keep the community engaged online." },
  { icon: Heart, title: "Community Greeter", desc: "Welcome first-timers, answer questions, and ensure everyone feels included." },
];

const perks = ["Free conference ticket", "Volunteer T-shirt & badge", "Meals & refreshments", "Certificate of appreciation"];

export default function Volunteers() {
  return (
    <section id="volunteers" className="section-pad bg-[var(--surface-alt)] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 md:order-1">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-5 border border-[var(--card-border)] hover:border-[var(--flutter-blue)]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--flutter-blue)]/15 flex items-center justify-center mb-3">
                  <role.icon size={18} className="text-[var(--flutter-cyan)]" />
                </div>
                <h3 className="text-[var(--foreground)] font-bold text-sm mb-1">{role.title}</h3>
                <p className="text-[color:var(--foreground)]/45 text-xs leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2"
          >
            <p className="section-label mb-4">Volunteer with Us</p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-6">
              Be Part of the<br /><span className="gradient-text">Organizing Team</span>
            </h2>
            <div className="divider mb-6" />
            <p className="text-[color:var(--foreground)]/60 text-base leading-relaxed mb-6">
              Volunteers are the heartbeat of Flutter South India. You get exclusive access, conference swag,
              a volunteer certificate, and the satisfaction of making it all happen.
            </p>
            <ul className="space-y-2.5 mb-8">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-[color:var(--foreground)]/65 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--flutter-cyan)] flex-shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow px-6 py-3 rounded-full text-sm font-semibold inline-block"
            >
              Apply to Volunteer
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
