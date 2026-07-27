"use client";

import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

/* Animated Dart logo mark */
function DartLogo() {
  return (
    <motion.svg
      width="120" height="120" viewBox="0 0 120 120" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: [0, 6, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow ring */}
      <motion.circle cx="60" cy="60" r="55" stroke="#027DFD" strokeWidth="1"
        strokeDasharray="8 6" opacity={0.25}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
      {/* Dart bird shape - the stylized Dart logo */}
      {/* Left wing (dark blue) */}
      <motion.polygon
        points="14,106 52,68 38,54 14,106"
        fill="#0553B1"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right body */}
      <motion.polygon
        points="52,68 106,14 106,58 70,82 52,68"
        fill="#027DFD"
        animate={{ opacity: [1, 0.85, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Top triangle / head */}
      <motion.polygon
        points="64,14 106,14 84,36"
        fill="#13B9FD"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      {/* Bottom tail */}
      <motion.polygon
        points="38,54 52,68 14,106 38,106"
        fill="#54C5F8"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      />
      {/* Dart label */}
      <text x="60" y="115" textAnchor="middle" fontSize="9" fill="#13B9FD" fontFamily="system-ui" fontWeight="700" letterSpacing="3" opacity="0.6">DART</text>
    </motion.svg>
  );
}

/* Flutter F mark for hero */
function HeroFlutterMark() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <motion.svg width="72" height="72" viewBox="0 0 72 72" fill="none"
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <defs>
          <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#027DFD" />
            <stop offset="100%" stopColor="#13B9FD" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="72" height="72" rx="18" fill="url(#hero-grad)" filter="url(#glow)" opacity="0.9" />
        <polygon points="18,15 54,15 36,33" fill="white" opacity="0.95" />
        <polygon points="18,29 45,29 27,47" fill="white" opacity="0.75" />
        <polygon points="18,43 45,43 27,61" fill="white" opacity="0.95" />
      </motion.svg>
      {/* Halo */}
      <motion.div
        className="absolute inset-0 rounded-[18px]"
        style={{ background: "radial-gradient(circle, rgba(2,125,253,0.4) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-bg pt-20 px-4">
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
        <div className="absolute w-80 h-80 rounded-full bg-[#027DFD]/8 blur-3xl" />
      </div>

      {/* Dart logo — right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden xl:block">
        <DartLogo />
      </div>

      {/* Large BG F */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none text-[28rem] font-black text-[#027DFD] leading-none hidden xl:block">
        F
      </div>

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        {/* Flutter mark + badge row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-5 mb-8"
        >
          <HeroFlutterMark />
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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
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
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-[color:var(--foreground)]/50 mb-12"
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[var(--flutter-cyan)]" />
            October 10, 2026
          </span>
          <span className="w-1 h-1 rounded-full bg-[color:var(--foreground)]/20" />
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
          className="mb-12"
        >
          <Countdown targetDate="2026-10-10T09:30:00" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.54 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://lu.ma"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 group"
          >
            Register Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full text-base font-semibold border border-[color:var(--foreground)]/15 text-[color:var(--foreground)]/80 hover:text-[var(--foreground)] hover:border-[color:var(--foreground)]/30 transition-all duration-200"
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
