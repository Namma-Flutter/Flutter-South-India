"use client";

import { motion } from "framer-motion";
import { Mic2, Handshake, Store, Users, Megaphone, ExternalLink } from "lucide-react";

/* Single consolidated "apply" hub — replaces the scattered CTAs that used to live
   at the bottom of Speakers / Sponsors / Hiring / Stalls. Every href below is a
   placeholder; swap in the real form links once they're provided. */
const items = [
  {
    icon: Mic2,
    title: "Speakers",
    desc: "Submit a session proposal across any of the three tracks.",
    cta: "Apply to Speak",
    href: "https://forms.google.com",
    color: "#22c55e",
  },
  {
    icon: Handshake,
    title: "Sponsors",
    desc: "Get brand visibility, hiring access, and community goodwill.",
    cta: "Become a Sponsor",
    href: "https://forms.google.com",
    color: "#FFD700",
  },
  {
    icon: Store,
    title: "Stalls",
    desc: "Exhibitor booths, the Flutter Games showcase, and hiring stalls.",
    cta: "Apply for a Stall",
    href: "https://forms.google.com",
    color: "#027DFD",
  },
  {
    icon: Users,
    title: "Community Partners",
    desc: "Partner your meetup, GDG chapter, or community with us.",
    cta: "Partner with Us",
    href: "https://forms.google.com",
    color: "#13B9FD",
  },
  {
    icon: Megaphone,
    title: "Product Promotion",
    desc: "Showcase your Flutter-powered product to 400+ developers.",
    cta: "Promote Your Product",
    href: "https://forms.google.com",
    color: "#a855f7",
  },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="section-pad bg-[var(--surface-alt)] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p className="section-label mb-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Take Part
          </motion.p>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Get <span className="gradient-text">Involved</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-5 sm:mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-[color:var(--foreground)]/55 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            One place for every way to be part of Flutter South India 2026.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 border border-[var(--card-border)] hover:border-[var(--flutter-blue)]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col text-center items-center"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <h3 className="text-[var(--foreground)] font-bold text-base mb-2">{item.title}</h3>
              <p className="text-[color:var(--foreground)]/50 text-xs leading-relaxed mb-5 flex-1">{item.desc}</p>
              {/* TODO: replace with the real form link once provided */}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold flex items-center gap-1.5 px-4 py-2 rounded-full border transition-colors"
                style={{ color: item.color, borderColor: `${item.color}40` }}
              >
                {item.cta}
                <ExternalLink size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
