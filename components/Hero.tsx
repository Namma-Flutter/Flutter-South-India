"use client";

import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

/* Centre focal mascot */
function HeroMascot() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Radial glow behind */}
      <motion.div
        className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(2,125,253,0.40) 0%, rgba(19,185,253,0.15) 55%, transparent 75%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.55, 0.12, 0.55] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative rounded-2xl overflow-hidden w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
        animate={{ rotate: [0, 1.5, -1.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ filter: "drop-shadow(0 4px 20px rgba(2,125,253,0.50))" }}
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

/* Single floating Dart-language shape, spun in pseudo-3D via perspective + rotateX/Y */
function DartShape({
  size,
  top,
  left,
  duration,
  delay = 0,
  opacity = 0.16,
  reverse = false,
}: {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay?: number;
  opacity?: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ top, left, width: size, height: size, perspective: 700 }}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: duration * 0.6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, var(--flutter-blue) 0%, var(--flutter-cyan) 100%)",
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          opacity,
          boxShadow: "0 0 30px rgba(2,125,253,0.35)",
        }}
        animate={{
          rotateY: reverse ? [360, 0] : [0, 360],
          rotateX: [0, 18, -18, 0],
        }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      />
    </motion.div>
  );
}

/* Full-screen 3D-ish Dart field — floating, spinning Dart-language shapes across the whole hero */
function DartBackgroundField() {
  const darts = [
    { size: 46, top: "14%", left: "8%",  duration: 16, delay: 0,   opacity: 0.14 },
    { size: 30, top: "22%", left: "88%", duration: 12, delay: 1.2, opacity: 0.18, reverse: true },
    { size: 56, top: "68%", left: "12%", duration: 20, delay: 0.6, opacity: 0.12, reverse: true },
    { size: 34, top: "78%", left: "84%", duration: 14, delay: 2,   opacity: 0.16 },
    { size: 26, top: "42%", left: "6%",  duration: 11, delay: 0.4, opacity: 0.10 },
    { size: 38, top: "8%",  left: "62%", duration: 18, delay: 1.6, opacity: 0.13, reverse: true },
    { size: 24, top: "88%", left: "48%", duration: 13, delay: 0.9, opacity: 0.15 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      {darts.map((d, i) => <DartShape key={i} {...d} />)}
    </div>
  );
}

/* Decorative background mascot — symmetric pair */
function BgMascot({
  side,
  size = 148,
  opacity = 0.09,
  delay = 0,
  duration = 11,
}: {
  side: "left" | "right";
  size?: number;
  opacity?: number;
  delay?: number;
  duration?: number;
}) {
  const pos = side === "left"
    ? "left-6 xl:left-14 hidden xl:block"
    : "right-6 xl:right-14 hidden lg:block";

  return (
    <motion.div
      className={`absolute pointer-events-none select-none top-[58%] -translate-y-1/2 ${pos}`}
      style={{ opacity }}
      /* Only float downward so it never drifts into the navbar zone */
      animate={{ y: [0, 14, 0], rotate: side === "left" ? [0, -3, 3, 0] : [0, 3, -3, 0] }}
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
    <section className="relative min-h-screen flex flex-col overflow-hidden mesh-bg">

      {/* ── Animated rings – centred in section ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[280, 480, 660, 860].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: `1px solid rgba(2,125,253,${0.11 - i * 0.02})`,
            }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
        <div className="absolute w-72 h-72 rounded-full bg-[var(--flutter-blue)]/[0.07] blur-3xl" />
      </div>

      {/* ── Symmetric background mascots ── */}
      <BgMascot side="left"  delay={2} duration={13} opacity={0.08} />
      <BgMascot side="right" delay={0} duration={10} opacity={0.11} />

      {/* ── Full-screen animated 3D Dart field ── */}
      <DartBackgroundField />

      {/* ── Hero content — starts below fixed navbar ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-4">
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto">

          {/* Mascot + badge */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <HeroMascot />
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 border border-[var(--flutter-blue)]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--flutter-cyan)] animate-pulse flex-shrink-0" />
              <span className="text-sm text-[var(--flutter-cyan)] font-medium whitespace-nowrap">
                Namma Flutter · South India 2026
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="font-black tracking-tight leading-[1.08] mb-5 sm:mb-6
              text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            <span className="block text-[var(--foreground)]">Flutter</span>
            <span className="block gradient-text">South India</span>
            <span className="block text-[var(--foreground)]">2026</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.27 }}
            className="text-sm sm:text-base md:text-lg text-[color:var(--foreground)]/60
              max-w-2xl mx-auto mb-8 sm:mb-9 leading-relaxed"
          >
            South India&rsquo;s premier Flutter developer conference — bringing together
            the brightest minds in Flutter, Dart, and cross-platform development.
          </motion.p>

          {/* Date & Venue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.37 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-5
              text-xs sm:text-sm text-[color:var(--foreground)]/55 mb-7 sm:mb-9"
          >
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-[var(--flutter-cyan)] flex-shrink-0" />
              October 10, 2026
            </span>
            <span className="hidden sm:block w-px h-4 bg-[color:var(--foreground)]/15" />
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-[var(--flutter-cyan)] flex-shrink-0" />
              Loyola College, Chennai
            </span>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mb-10 sm:mb-12"
          >
            <Countdown targetDate="2026-10-10T09:30:00" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.54 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3"
          >
            <a
              href="https://lu.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base
                font-semibold flex items-center justify-center gap-2 group"
            >
              Register Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("about");
                if (!el) return;
                const start = window.scrollY;
                const target = el.getBoundingClientRect().top + start - 80;
                const t0 = performance.now();
                const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const step = (now: number) => {
                  const p = Math.min((now - t0) / 600, 1);
                  window.scrollTo(0, start + (target - start) * ease(p));
                  if (p < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold
                border border-[color:var(--foreground)]/20
                text-[color:var(--foreground)]/70
                hover:text-[var(--foreground)] hover:border-[color:var(--foreground)]/40
                transition-all duration-200"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator — normal flex flow so it reserves its own space and never overlaps the CTAs above ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative mx-auto mb-6 shrink-0
          flex flex-col items-center gap-2 text-[color:var(--foreground)]/30 text-[11px] tracking-widest uppercase"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-[color:var(--foreground)]/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
