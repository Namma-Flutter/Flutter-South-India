"use client";

import { motion } from "framer-motion";
import { ExternalLink, Store } from "lucide-react";

interface Stall {
  name: string;
  category: string;
  desc: string;
  url: string;
  color: string;
}

const stalls: Stall[] = [
  { name: "Google Developer Groups", category: "Community", desc: "The official GDG stall — connect with local chapters, learn about programs, and pick up goodies.", url: "https://gdg.community.dev", color: "#027DFD" },
  { name: "FlutterFlow", category: "Dev Tools", desc: "Build Flutter apps visually. See live demos and get hands-on with no-code + code hybrid development.", url: "https://flutterflow.io", color: "#13B9FD" },
  { name: "Namma Flutter Community", category: "Community", desc: "The host community — learn how to get involved, contribute, and attend monthly meetups.", url: "https://nammaflutter.dev", color: "#22c55e" },
  { name: "Shorebird", category: "Dev Tools", desc: "Code-push for Flutter. Update your app in production without going through the app store.", url: "https://shorebird.dev", color: "#a855f7" },
  { name: "Serverpod", category: "Backend", desc: "The open-source backend framework built for Flutter. See full-stack Dart in action.", url: "https://serverpod.dev", color: "#f59e0b" },
  { name: "Invertase", category: "Open Source", desc: "Maintainers of FlutterFire and Zapp. Meet the team and discover their Flutter tooling ecosystem.", url: "https://invertase.io", color: "#027DFD" },
  { name: "LeanCode", category: "Agency", desc: "Flutter consultancy working on enterprise-scale apps. Explore career opportunities and see case studies.", url: "https://leancode.co", color: "#13B9FD" },
  { name: "Codemagic CI/CD", category: "Dev Tools", desc: "The fastest CI/CD built for Flutter. Set up automated pipelines and ship apps faster.", url: "https://codemagic.io", color: "#22c55e" },
];

export default function Stalls() {
  return (
    <section id="stalls" className="section-pad bg-[var(--background)] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#027DFD]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <motion.p className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Exhibition Floor
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Conference <span className="gradient-text">Stalls</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-[color:var(--foreground)]/55 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            Explore exhibitors, talk to teams, and discover tools that will level up your Flutter development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stalls.map((stall, i) => (
            <motion.a
              key={stall.name}
              href={stall.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-5 border border-white/8 flex flex-col gap-3 group hover:border-[#027DFD]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${stall.color}18`, border: `1px solid ${stall.color}30` }}>
                  <Store size={18} style={{ color: stall.color }} />
                </div>
                <ExternalLink size={13} className="text-[color:var(--foreground)]/20 group-hover:text-[#13B9FD] transition-colors mt-1" />
              </div>

              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${stall.color}15`, color: stall.color }}>
                  {stall.category}
                </span>
              </div>

              <div>
                <h3 className="text-[var(--foreground)] font-bold text-sm mb-1 group-hover:text-white transition-colors">{stall.name}</h3>
                <p className="text-[color:var(--foreground)]/45 text-xs leading-relaxed">{stall.desc}</p>
              </div>

              <div className="mt-auto pt-2 border-t border-white/5 flex items-center gap-1.5">
                <span className="text-[10px] text-[#13B9FD] font-medium truncate">{stall.url.replace("https://", "")}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div className="text-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <p className="text-[color:var(--foreground)]/40 text-sm">
            Want an exhibition stall?{" "}
            <a href="mailto:nammaflutter@gmail.com" className="text-[#13B9FD] hover:underline">Contact us to apply</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
