"use client";

import { motion } from "framer-motion";
import { Rocket, Lightbulb, Star, Trophy } from "lucide-react";

const features = [
  { icon: Rocket, title: "Startup Demos", desc: "10+ startups demo their Flutter-powered products live." },
  { icon: Lightbulb, title: "Product Showcase", desc: "Indie developers showcase apps available on the stores." },
  { icon: Star, title: "Community Vote", desc: "Attendees vote for their favourite product. Top 3 win prizes." },
  { icon: Trophy, title: "Best App Award", desc: "Best Flutter App of the Year — awarded at the closing ceremony." },
];

export default function Expo() {
  return (
    <section className="section-pad bg-[#030710] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#027DFD]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label mb-4">Beyond the Stage</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Product & Startup<br /><span className="gradient-text">Expo</span>
            </h2>
            <div className="divider mb-6" />
            <p className="text-white/60 text-base leading-relaxed mb-8">
              The expo floor runs all day alongside the main tracks. Explore innovative Flutter-powered
              products, meet the founders, and discover what the community is building.
              If you have a product to show, apply for an expo booth.
            </p>
            <a href="mailto:nammaflutter@gmail.com" className="btn-glow px-6 py-3 rounded-full text-sm font-semibold inline-block">
              Apply for Expo Booth
            </a>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-5 border border-white/8 hover:border-[#027DFD]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#027DFD]/15 flex items-center justify-center mb-3">
                  <item.icon size={18} className="text-[#13B9FD]" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
