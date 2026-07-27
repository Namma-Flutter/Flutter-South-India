"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/namma-flutter" },
  { label: "X / Twitter", href: "https://x.com/nammaflutter" },
  { label: "Instagram", href: "https://instagram.com/nammaflutter" },
  { label: "YouTube", href: "https://youtube.com/@nammaflutter" },
  { label: "GitHub", href: "https://github.com/nammaflutter" },
  { label: "Meetup", href: "https://meetup.com/namma-flutter" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "Schedule", href: "#timeline" },
  { label: "Tracks", href: "#tracks" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="bg-[#020510] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#027DFD]/40 to-transparent" />

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-10 md:p-14 border border-[#027DFD]/20 text-center mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#027DFD]/8 via-transparent to-[#13B9FD]/5 pointer-events-none" />
          <p className="section-label mb-4">Limited Seats Available</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Ready to Join<br />
            <span className="gradient-text">Flutter South India?</span>
          </h2>
          <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto">
            Secure your spot at South India's largest Flutter conference.
            Early-bird tickets are selling fast.
          </p>
          <a
            href="https://lu.ma"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow px-10 py-4 rounded-full text-base font-bold inline-flex items-center gap-2 group"
          >
            Get Your Ticket Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#027DFD] to-[#13B9FD] flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-black text-sm">F</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-sm">Namma Flutter</div>
                <div className="text-[10px] text-[#13B9FD] font-medium tracking-wider">SOUTH INDIA 2026</div>
              </div>
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-4">
              South India's premier Flutter developer conference. Organised by the Namma Flutter community, Chennai.
            </p>
            <a
              href="mailto:nammaflutter@gmail.com"
              className="text-[#13B9FD] text-xs hover:underline"
            >
              nammaflutter@gmail.com
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white text-xs transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Community</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-xs transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Join */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Join the Community</h4>
            <p className="text-white/40 text-xs leading-relaxed mb-4">
              Namma Flutter hosts monthly meetups in Chennai. Join 1000+ developers in the community.
            </p>
            <a
              href="https://meetup.com/namma-flutter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs border border-[#027DFD]/40 text-[#13B9FD] px-4 py-2 rounded-full hover:bg-[#027DFD]/10 transition-colors duration-200 inline-block"
            >
              Join on Meetup
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-xs">
          <p>© 2026 Namma Flutter. All rights reserved.</p>
          <p>
            Built with ❤️ by the Flutter South India team ·{" "}
            <span className="gradient-text font-semibold">Flutter South India 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
