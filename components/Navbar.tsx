"use client";

import { useState, useEffect } from "react";
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
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
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
          <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="group-hover:scale-105 transition-transform duration-200">
              <FlutterMark size={32} />
            </div>
            <div className="leading-tight">
              <div className="text-[var(--foreground)] font-bold text-sm">Namma Flutter</div>
              <div className="text-[10px] text-[var(--flutter-cyan)] font-semibold tracking-widest">SOUTH INDIA 2026</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-sm text-[color:var(--foreground)]/65 hover:text-[var(--foreground)] transition-colors duration-200 font-medium whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--glass-border)] hover:border-[var(--flutter-blue)]/50 transition-all duration-200 text-[color:var(--foreground)]/60 hover:text-[var(--foreground)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme}
                  initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}>
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
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
              className="lg:hidden text-[color:var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-20 glass overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-5 py-10 px-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-xl text-[color:var(--foreground)]/80 hover:text-[var(--foreground)] font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://lu.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow mt-4 px-8 py-3 rounded-full text-base font-semibold"
                onClick={() => setOpen(false)}
              >
                Get Tickets
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
