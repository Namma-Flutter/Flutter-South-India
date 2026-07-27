"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Attendees Expected" },
  { value: 30, suffix: "+", label: "Expert Speakers" },
  { value: 3, suffix: "", label: "Parallel Tracks" },
  { value: 20, suffix: "+", label: "Sponsors & Partners" },
  { value: 1000, suffix: "+", label: "Community Members" },
  { value: 8, suffix: "+", label: "Workshops" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Stats() {
  return (
    <section className="section-pad bg-[#030710] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#027DFD]/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#027DFD]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.p className="section-label mb-4" {...fadeUp()}>By the Numbers</motion.p>
          <motion.h2 className="text-4xl md:text-5xl font-black text-white" {...fadeUp(0.08)}>
            Our <span className="gradient-text">Community</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(i * 0.07)}
              className="glass rounded-2xl p-6 text-center border border-white/6 hover:border-[#027DFD]/30 transition-all duration-300 group"
            >
              <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/50 text-xs leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
