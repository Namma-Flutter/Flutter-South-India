"use client";

import { motion } from "framer-motion";
import sponsorsData from "@/data/sponsors.json";

interface SponsorTier { tier: string; color: string; sponsors: { name: string; abbr: string }[]; }

/* data/sponsors.json holds placeholders until the real sponsor list is confirmed */
const tiers = sponsorsData as SponsorTier[];

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-pad bg-[var(--surface-alt)] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Our Partners
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Sponsors & <span className="gradient-text">Partners</span>
          </motion.h2>
          <motion.div
            className="divider mx-auto mb-5 sm:mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          />
          <motion.p
            className="text-[color:var(--foreground)]/55 text-xs sm:text-sm max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Interested in sponsoring?{" "}
            <a href="#get-involved" className="text-[var(--flutter-cyan)] hover:underline">See how to become a sponsor</a>{" "}
            below.
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
                <div className="flex-1 h-px bg-[var(--separator)]" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {tier.sponsors.map((sp) => (
                  <div
                    key={sp.name}
                    className="glass rounded-2xl border border-[var(--card-border)] hover:border-[color:var(--foreground)]/20 transition-all duration-300 flex items-center justify-center gap-3 px-5 sm:px-8 py-4 sm:py-5 cursor-pointer group w-full sm:w-auto"
                    style={{
                      minWidth: "min(100%, " + (
                        tier.tier === "Title Sponsor" ? "260px"
                        : tier.tier === "Gold Sponsors" ? "190px"
                        : "150px"
                      ) + ")",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ background: `${tier.color}20`, color: tier.color }}
                    >
                      {sp.abbr}
                    </div>
                    <span className="text-[color:var(--foreground)]/70 group-hover:text-[var(--foreground)] font-semibold text-sm transition-colors">
                      {sp.name}
                    </span>
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
