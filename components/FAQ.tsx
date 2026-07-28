"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who should attend Flutter South India 2026?",
    a: "Anyone passionate about Flutter! Whether you're a beginner building your first app or a seasoned engineer working on production apps — there's a track and sessions designed specifically for you.",
  },
  {
    q: "How do I register for the conference?",
    a: "Click any 'Register Now' or 'Get Tickets' button on this site. You'll be redirected to our Luma event page to complete your registration. Early-bird tickets are limited, so register soon!",
  },
  {
    q: "Is there a Code of Conduct?",
    a: "Yes. Flutter South India 2026 is a harassment-free conference. We follow the Namma Flutter Community Code of Conduct. All attendees, speakers, and volunteers are expected to uphold it.",
  },
  {
    q: "Will sessions be recorded?",
    a: "Yes! All track sessions will be recorded and uploaded to the Namma Flutter YouTube channel after the event. Speaker slides will also be published on this website post-conference.",
  },
  {
    q: "Can I apply to speak at the conference?",
    a: "Absolutely! We have a Call for Speakers open. Submit your proposal via the Apply to Speak link in the Speakers section. We welcome talks across all levels.",
  },
  {
    q: "Is the venue accessible?",
    a: "Loyola College is fully wheelchair accessible. If you have any specific accessibility requirements, please reach out to us at nammaflutter@gmail.com and we will accommodate you.",
  },
  {
    q: "Are meals included with registration?",
    a: "Yes. Lunch, tea breaks, and refreshments throughout the day are included in your conference ticket. Dietary requirements can be noted during registration.",
  },
  {
    q: "How can I connect with the Namma Flutter community?",
    a: "Join our WhatsApp/Telegram groups, follow us on LinkedIn, Instagram, X, and YouTube. Links are available in the footer. We host monthly meetups year-round.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass rounded-2xl border border-[var(--card-border)] overflow-hidden hover:border-[var(--flutter-blue)]/25 transition-colors duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-[var(--foreground)] font-semibold text-sm leading-snug">{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--flutter-blue)]/15 flex items-center justify-center border border-[var(--flutter-blue)]/20 transition-colors">
          {open ? <Minus size={12} className="text-[var(--flutter-cyan)]" /> : <Plus size={12} className="text-[var(--flutter-cyan)]" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-[color:var(--foreground)]/55 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="section-pad bg-[var(--surface-alt)] relative" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--flutter-blue)]/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Got Questions?</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-5 sm:mb-6">
            Frequently Asked<br />
            <span className="gradient-text">Questions</span>
          </h2>
          <div className="divider mx-auto" />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-[color:var(--foreground)]/40 text-sm mt-10"
        >
          Still have questions?{" "}
          <a href="mailto:nammaflutter@gmail.com" className="text-[var(--flutter-cyan)] hover:underline">
            Email us at nammaflutter@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
