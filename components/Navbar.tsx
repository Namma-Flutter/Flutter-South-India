"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Agenda",   href: "#agenda"   },
  { label: "Speakers", href: "#speakers" },
  { label: "Tracks",   href: "#tracks"   },
  { label: "Stalls",   href: "#stalls"   },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Venue",    href: "#venue"    },
  { label: "FAQ",      href: "#faq"      },
];

/* Flutter-F SVG logo mark */
function FlutterMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#027DFD" />
          <stop offset="100%" stopColor="#13B9FD" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#fm-grad)" />
      {/* Flutter F diamond shapes */}
      <polygon points="8,7 24,7 16,15" fill="rgba(255,255,255,0.95)" />
      <polygon points="8,13 20,13 12,21" fill="rgba(255,255,255,0.75)" />
      <polygon points="8,19 20,19 12,27" fill="rgba(255,255,255,0.95)" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { theme, toggle } = useTheme();
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-[var(--glass-border)] py-3 shadow-lg"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="group-hover:scale-105 transition-transform duration-200">
              <FlutterMark size={32} />
            </div>
            <div className="leading-tight">
              <div className="text-[var(--foreground)] font-bold text-sm">Namma Flutter</div>
              <div className="text-[10px] text-[var(--flutter-cyan)] font-semibold tracking-widest">SOUTH INDIA 2026</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="relative text-sm font-medium whitespace-nowrap transition-colors duration-200 group"
                  style={{
                    color: isActive
                      ? "var(--foreground)"
                      : "color-mix(in srgb, var(--foreground) 55%, transparent)",
                  }}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(to right, var(--flutter-blue), var(--flutter-cyan))" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover indicator (when not active) */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[var(--flutter-cyan)]/0 group-hover:bg-[var(--flutter-cyan)]/40 transition-colors duration-200" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--glass-border)] hover:border-[var(--flutter-blue)]/50 transition-all duration-200 text-[color:var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--flutter-blue)]/5"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme}
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}>
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* CTA - hidden on small */}
            <a
              href="https://lu.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-glow px-5 py-2 rounded-full text-sm font-semibold"
            >
              Get Tickets
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[var(--glass-border)] text-[color:var(--foreground)]/80 hover:text-[var(--foreground)] hover:border-[var(--flutter-blue)]/40 transition-all"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open ? "x" : "menu"}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[var(--background)]/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            {/* Slide-in panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] glass border-l border-[var(--glass-border)] flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-2.5">
                  <FlutterMark size={28} />
                  <div className="leading-tight">
                    <div className="text-[var(--foreground)] font-bold text-sm">Namma Flutter</div>
                    <div className="text-[10px] text-[var(--flutter-cyan)] font-semibold tracking-wider">SOUTH INDIA 2026</div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--glass-border)] text-[color:var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => {
                    const id = link.href.replace("#", "");
                    const isActive = activeSection === id;
                    return (
                      <motion.button
                        key={link.label}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => handleNav(link.href)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-medium text-sm transition-all duration-200",
                          isActive
                            ? "bg-[var(--flutter-blue)]/10 text-[var(--flutter-cyan)] border border-[var(--flutter-blue)]/25"
                            : "text-[color:var(--foreground)]/70 hover:bg-[var(--glass-bg)] hover:text-[var(--foreground)] border border-transparent"
                        )}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--flutter-cyan)] flex-shrink-0" />
                        )}
                        {link.label}
                      </motion.button>
                    );
                  })}
                </div>
              </nav>

              {/* Panel footer */}
              <div className="px-6 py-6 border-t border-[var(--glass-border)] space-y-3">
                <a
                  href="https://lu.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow w-full py-3.5 rounded-xl text-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Get Tickets
                </a>
                <button
                  onClick={() => { toggle(); }}
                  className="w-full py-3 rounded-xl border border-[var(--glass-border)] text-sm text-[color:var(--foreground)]/60 hover:text-[var(--foreground)] flex items-center justify-center gap-2 transition-colors"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
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
