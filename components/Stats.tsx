"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 400, suffix: "+", label: "Attendees Expected" },
  { value: 25, suffix: "+", label: "Expert Speakers" },
  { value: 3, suffix: "", label: "Parallel Tracks" },
  { value: 10, suffix: "+", label: "Sponsors & Partners" },
  { value: 10, suffix: "+", label: "Community Members" },
  { value: 5, suffix: "+", label: "Lightning Talks" },
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
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Stats() {
  return (
    <section className="section-pad bg-[var(--surface-alt)] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p className="section-label mb-3" {...fadeUp()}>By the Numbers</motion.p>
          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6" {...fadeUp(0.08)}>
            Our <span className="gradient-text">Community</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(i * 0.07)}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-[var(--card-border)] hover:border-[var(--flutter-blue)]/30 transition-all duration-300 group"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-black gradient-text mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[color:var(--foreground)]/50 text-[10px] sm:text-xs leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
