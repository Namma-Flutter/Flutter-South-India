"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Ticket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Agenda", href: "#agenda" },
  { label: "Speakers", href: "#speakers" },
  { label: "Tracks", href: "#tracks" },
  { label: "Stalls", href: "#stalls" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faq" },
];

function NammaLogo({ size = 44 }: { size?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden flex-shrink-0 shadow-lg" style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://nammaflutter.com/images/logo.png"
        alt="Namma Flutter"
        width={size}
        height={size}
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { theme, toggle } = useTheme();

  /* rAF-throttled scroll detection */
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 40); ticking = false; });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* Body scroll lock on mobile menu */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.getElementById(href.replace("#", ""));
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
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-[var(--glass-border)] shadow-[0_4px_40px_rgba(0,0,0,0.15)] py-2"
            : "bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/30 to-transparent backdrop-blur-[6px] py-3.5"
        )}
      >
        <div className="mx-auto px-4 sm:px-5 lg:px-8 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}
            className="flex items-center gap-3 group flex-shrink-0 min-w-0"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: -4 }}
              transition={{ type: "spring", stiffness: 380, damping: 14 }}
            >
              <NammaLogo size={70} />
            </motion.div>
            <div className="leading-snug min-w-0">
              <div className="text-[var(--foreground)] font-black text-[20px] sm:text-lg tracking-tight group-hover:text-[var(--flutter-cyan)] transition-colors duration-300 truncate">
                Namma Flutter
              </div>
              <div className="text-[13px] text-[var(--flutter-cyan)] font-bold tracking-[0.2em] uppercase opacity-75 truncate">
                South India 2026
              </div>
            </div>
          </a>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="relative px-3 xl:px-4 py-2 rounded-xl text-[14px] xl:text-[15px] font-semibold whitespace-nowrap group transition-colors duration-150"
                  style={{
                    color: isActive
                      ? "var(--flutter-cyan)"
                      : "color-mix(in srgb, var(--foreground) 60%, transparent)",
                  }}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(2,125,253,0.10)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {/* Hover pill */}
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ background: "rgba(2,125,253,0.07)" }} />

                  <span className="relative">{link.label}</span>

                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute bottom-[5px] left-3 xl:left-4 right-3 xl:right-4 h-[2px] rounded-full"
                      style={{ background: "linear-gradient(90deg, var(--flutter-blue), var(--flutter-cyan))" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {/* Hover underline (non-active) */}
                  {!isActive && (
                    <span className="absolute bottom-[5px] left-3 xl:left-4 right-3 xl:right-4 h-[1.5px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                      style={{ background: "rgba(19,185,253,0.45)" }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center glass border border-[var(--glass-border)] hover:border-[var(--flutter-blue)]/50 text-[color:var(--foreground)]/50 hover:text-[var(--flutter-cyan)] transition-all duration-200 hover:shadow-[0_0_12px_rgba(2,125,253,0.2)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ scale: 0.3, opacity: 0, rotate: -120 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.3, opacity: 0, rotate: 120 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* ── Get Tickets CTA ── */}
            <a
              href="https://lu.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block group"
            >
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold text-white overflow-hidden cursor-pointer select-none whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, var(--flutter-blue) 0%, var(--flutter-cyan) 100%)",
                  boxShadow: "0 0 20px rgba(2,125,253,0.4), 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(19,185,253,0.4)",
                }}
              >
                <Ticket size={16} className="flex-shrink-0" />
                <span>Get Tickets</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={15} />
                </motion.span>
                {/* Shimmer sweep on hover */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }}
                />
              </motion.span>
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl glass border border-[var(--glass-border)] text-[color:var(--foreground)]/70 hover:text-[var(--foreground)] hover:border-[var(--flutter-blue)]/40 transition-all"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ scale: 0.5, opacity: 0, rotate: open ? -90 : 90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X size={17} /> : <Menu size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[var(--background)]/65 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(300px,88vw)] glass border-l border-[var(--glass-border)] flex flex-col shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-3">
                  <NammaLogo size={38} />
                  <div className="leading-snug">
                    <div className="text-[var(--foreground)] font-black text-[15px]">Namma Flutter</div>
                    <div className="text-[10px] text-[var(--flutter-cyan)] font-bold tracking-[0.15em] uppercase opacity-80">
                      South India 2026
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center glass border border-[var(--glass-border)] text-[color:var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const id = link.href.replace("#", "");
                    const isActive = activeSection === id;
                    return (
                      <motion.button
                        key={link.label}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.035, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => handleNav(link.href)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[15px] font-semibold transition-all duration-200",
                          isActive
                            ? "bg-[var(--flutter-blue)]/12 text-[var(--flutter-cyan)] border border-[var(--flutter-blue)]/25"
                            : "text-[color:var(--foreground)]/65 hover:bg-[var(--flutter-blue)]/7 hover:text-[var(--foreground)] border border-transparent"
                        )}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--flutter-cyan)] flex-shrink-0"
                            style={{ boxShadow: "0 0 6px var(--flutter-cyan)" }} />
                        )}
                        {link.label}
                      </motion.button>
                    );
                  })}
                </div>
              </nav>

              {/* Panel footer */}
              <div className="px-4 py-5 border-t border-[var(--glass-border)] space-y-2.5">
                <a
                  href="https://lu.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black text-white transition-all hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, var(--flutter-blue), var(--flutter-cyan))",
                    boxShadow: "0 0 18px rgba(2,125,253,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                    border: "1.5px solid rgba(19,185,253,0.4)",
                  }}
                >
                  <Ticket size={14} className="flex-shrink-0" />
                  Get Tickets
                </a>
                <button
                  onClick={toggle}
                  className="w-full py-3 rounded-xl border border-[var(--glass-border)] text-sm text-[color:var(--foreground)]/55 hover:text-[var(--foreground)] flex items-center justify-center gap-2 transition-colors glass"
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                  Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
