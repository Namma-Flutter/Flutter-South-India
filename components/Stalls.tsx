"use client";

import { motion } from "framer-motion";
import { Store, Gamepad2 } from "lucide-react";
import stallsData from "@/data/stalls.json";

interface Stall {
  name: string;
  category: string;
  desc: string;
  url: string;
  color: string;
  type: "exhibitor" | "games";
}

/* Exhibitor line-up is being finalised — data/stalls.json holds placeholders until confirmed */
const stalls = stallsData as Stall[];
const iconForType = { exhibitor: Store, games: Gamepad2 } as const;

export default function Stalls() {
  return (
    <section id="stalls" className="section-pad bg-[var(--background)] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p className="section-label mb-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Exhibition Floor
          </motion.p>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Conference <span className="gradient-text">Stalls</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-5 sm:mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-[color:var(--foreground)]/55 text-xs sm:text-sm max-w-2xl mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Explore exhibitors, talk to teams, and discover tools that will level up your Flutter development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stalls.map((stall, i) => {
            const Icon = iconForType[stall.type];
            return (
              <motion.div
                key={stall.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-5 border border-[var(--card-border)] flex flex-col gap-3 group hover:border-[var(--flutter-blue)]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${stall.color}18`, border: `1px solid ${stall.color}30` }}>
                  <Icon size={18} style={{ color: stall.color }} />
                </div>

                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${stall.color}15`, color: stall.color }}>
                    {stall.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-[var(--foreground)] font-bold text-sm mb-1 group-hover:text-[var(--flutter-cyan)] transition-colors">{stall.name}</h3>
                  <p className="text-[color:var(--foreground)]/45 text-xs leading-relaxed">{stall.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="text-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <p className="text-[color:var(--foreground)]/40 text-sm">
            Want an exhibition stall?{" "}
            <a href="#get-involved" className="text-[var(--flutter-cyan)] hover:underline">Apply below</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
