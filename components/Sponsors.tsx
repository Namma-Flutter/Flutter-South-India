"use client";

import { motion } from "framer-motion";

const tiers = [
  { tier: "Title Sponsor", color: "#FFD700", sponsors: [{ name: "Innovate Corp", abbr: "IC" }] },
  { tier: "Gold Sponsors", color: "#027DFD", sponsors: [{ name: "TechStream", abbr: "TS" }, { name: "DevHub India", abbr: "DH" }] },
  { tier: "Silver Sponsors", color: "#94a3b8", sponsors: [{ name: "Flutter Labs", abbr: "FL" }, { name: "AppWorks", abbr: "AW" }, { name: "CloudStar", abbr: "CS" }] },
  { tier: "Community Partners", color: "#13B9FD", sponsors: [{ name: "GDG Chennai", abbr: "GC" }, { name: "WTM Chennai", abbr: "WC" }, { name: "FOSS United", abbr: "FU" }, { name: "HasGeek", abbr: "HG" }] },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-pad bg-[#030710] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#027DFD]/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Our Partners
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Sponsors & <span className="gradient-text">Partners</span>
          </motion.h2>
          <motion.div
            className="divider mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          />
          <motion.p
            className="text-white/55 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Interested in sponsoring?{" "}
            <a href="mailto:nammaflutter@gmail.com" className="text-[#13B9FD] hover:underline">Contact us</a>{" "}
            for sponsorship packages.
          </motion.p>
        </div>

        <div className="space-y-10">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <p className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full flex-shrink-0"
                  style={{ color: tier.color, background: `${tier.color}15` }}>
                  {tier.tier}
                </p>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {tier.sponsors.map((sp) => (
                  <div
                    key={sp.name}
                    className="glass rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 px-8 py-5 cursor-pointer group"
                    style={{
                      minWidth: tier.tier === "Title Sponsor" ? 260
                        : tier.tier === "Gold Sponsors" ? 200 : 160,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ background: `${tier.color}20`, color: tier.color }}
                    >
                      {sp.abbr}
                    </div>
                    <span className="text-white/70 group-hover:text-white font-semibold text-sm transition-colors">
                      {sp.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 glass rounded-2xl p-8 border border-[#027DFD]/20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-white font-bold text-xl mb-2">Become a Sponsor</h3>
          <p className="text-white/55 text-sm mb-6 max-w-md mx-auto">
            Reach 500+ Flutter developers from South India. Get brand visibility, hiring access, and community goodwill.
          </p>
          <a href="mailto:nammaflutter@gmail.com" className="btn-glow px-6 py-3 rounded-full text-sm font-semibold inline-block">
            Download Sponsorship Deck
          </a>
        </motion.div>
      </div>
    </section>
  );
}
