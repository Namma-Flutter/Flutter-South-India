"use client";

import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

/* Namma Flutter mascot — hero centre focal point */
function HeroMascot() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Glow behind mascot */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(2,125,253,0.45) 0%, rgba(19,185,253,0.2) 50%, transparent 70%)" }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.15, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative rounded-2xl overflow-hidden w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ filter: "drop-shadow(0 0 18px rgba(2,125,253,0.55))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://nammaflutter.com/images/logo.png"
          alt="Namma Flutter Mascot"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

/* Background mascot — large decorative floating instance */
function BgMascot({ className, size, delay = 0, duration = 10, rotateRange = 6, opacityClass }: {
  className: string; size: number; delay?: number; duration?: number; rotateRange?: number; opacityClass: string;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className} ${opacityClass}`}
      animate={{ y: [0, -18, 0], rotate: [0, rotateRange, -rotateRange, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="rounded-3xl overflow-hidden" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://nammaflutter.com/images/logo.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-bg pt-20 px-4 sm:px-6">
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[300, 500, 700, 900].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              border: `1px solid rgba(2,125,253,${0.12 - i * 0.02})`,
            }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
        <div className="absolute w-80 h-80 rounded-full bg-[var(--flutter-blue)]/8 blur-3xl" />
      </div>

      {/* Background mascot — right side, large screens */}
      <BgMascot
        className="right-6 xl:right-16 top-1/2 -translate-y-1/2 hidden lg:block"
        size={140}
        opacityClass="opacity-[0.13]"
        delay={0}
        duration={8}
        rotateRange={5}
      />

      {/* Background mascot — left side, extra large screens */}
      <BgMascot
        className="left-4 xl:left-10 top-1/2 -translate-y-1/2 hidden xl:block"
        size={200}
        opacityClass="opacity-[0.06]"
        delay={2.5}
        duration={12}
        rotateRange={4}
      />

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        {/* Flutter mark + badge row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 sm:gap-5 mb-6 sm:mb-8"
        >
          <HeroMascot />
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-[var(--flutter-cyan)] font-medium border border-[var(--flutter-blue)]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--flutter-cyan)] animate-pulse" />
            Namma Flutter · South India 2026
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-5 sm:mb-6 leading-[1.05]"
        >
          <span className="text-[var(--foreground)]">Flutter</span>
          <br />
          <span className="gradient-text">South India</span>
          <br />
          <span className="text-[var(--foreground)]">2026</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-base sm:text-lg md:text-xl text-[color:var(--foreground)]/60 max-w-2xl mx-auto mb-5 leading-relaxed"
        >
          South India's premier Flutter developer conference — bringing together
          the brightest minds in Flutter, Dart, and cross-platform development.
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-sm text-[color:var(--foreground)]/50 mb-10 sm:mb-12"
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[var(--flutter-cyan)]" />
            October 10, 2026
          </span>
          <span className="w-1 h-1 rounded-full bg-[color:var(--foreground)]/20 hidden sm:block" />
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[var(--flutter-cyan)]" />
            Loyola College, Chennai
          </span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44 }}
          className="mb-10 sm:mb-12"
        >
          <Countdown targetDate="2026-10-10T09:30:00" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.54 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="https://lu.ma"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 group"
          >
            Register Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => {
              const el = document.getElementById("about");
              if (!el) return;
              const start = window.scrollY;
              const target = el.getBoundingClientRect().top + start - 72;
              const startTime = performance.now();
              const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
              const step = (now: number) => {
                const p = Math.min((now - startTime) / 600, 1);
                window.scrollTo(0, start + (target - start) * ease(p));
                if (p < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold border border-[color:var(--foreground)]/15 text-[color:var(--foreground)]/80 hover:text-[var(--foreground)] hover:border-[color:var(--foreground)]/30 transition-all duration-200"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[color:var(--foreground)]/30 text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[color:var(--foreground)]/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
