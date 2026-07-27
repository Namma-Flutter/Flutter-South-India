"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";

const companies = [
  { name: "Zoho Corp", roles: ["Flutter Developer", "Mobile Lead", "Platform Engineer"], size: "10,000+" },
  { name: "Freshworks", roles: ["Sr. Flutter Dev", "React Native Dev"], size: "5,000+" },
  { name: "PhonePe", roles: ["Mobile Engineer", "Flutter Specialist"], size: "3,000+" },
  { name: "Swiggy", roles: ["Android/Flutter Dev", "Tech Lead Mobile"], size: "6,000+" },
  { name: "TCS Digital", roles: ["Flutter Developer", "Full-Stack Mobile"], size: "600,000+" },
  { name: "Startup Hub", roles: ["Flutter Generalist", "Founding Engineer"], size: "Startup" },
];

export default function Hiring() {
  return (
    <section className="section-pad mesh-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Career Opportunities
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Hiring <span className="gradient-text">Stalls</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-white/55 max-w-xl mx-auto text-sm leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Top companies are actively looking for Flutter talent. Walk up, talk to engineers,
            and get hired on the spot. Bring your CV and portfolio!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6 border border-white/8 hover:border-[#027DFD]/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#027DFD]/20 to-[#13B9FD]/10 flex items-center justify-center border border-[#027DFD]/20">
                  <Briefcase size={20} className="text-[#13B9FD]" />
                </div>
                <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                  {company.size} employees
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{company.name}</h3>
              <div className="space-y-1.5 mb-4">
                {company.roles.map((role) => (
                  <div key={role} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#13B9FD] flex-shrink-0" />
                    <span className="text-white/60 text-sm">{role}</span>
                  </div>
                ))}
              </div>
              <button className="text-[#13B9FD] text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                View open roles <ArrowRight size={11} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <p className="text-white/40 text-sm">
            Are you a company looking to hire?{" "}
            <a href="mailto:nammaflutter@gmail.com" className="text-[#13B9FD] hover:underline">
              Reserve a hiring stall →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
