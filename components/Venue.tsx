"use client";

import { motion } from "framer-motion";
import { MapPin, Train, Car, Clock } from "lucide-react";

const logistics = [
  { icon: Train, title: "By Metro", desc: "Take the Chennai Metro to Loyola College Station (Purple Line). 2-min walk." },
  { icon: Car, title: "By Road", desc: "Address: Loyola College, Nungambakkam, Chennai — 600034." },
  { icon: Clock, title: "Doors Open", desc: "Registration begins at 8:00 AM. Please arrive early for smooth check-in." },
];

const facilities = ["Main Auditorium (800 seats)", "3 Seminar Halls", "High-speed Wi-Fi", "Ample Parking", "Food Court", "Prayer Room"];

export default function Venue() {
  return (
    <section id="venue" className="section-pad mesh-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
            Event Venue
          </motion.p>
          <motion.h2 className="text-4xl md:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.08 }}>
            Loyola College, <span className="gradient-text">Chennai</span>
          </motion.h2>
          <motion.div className="divider mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.12 }} />
          <motion.p className="text-white/55 max-w-xl mx-auto text-sm leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.16 }}>
            One of India's most prestigious institutions — Loyola College hosts our grand conference
            in its state-of-the-art auditorium and seminar halls in the heart of Chennai.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-2xl border border-white/8 overflow-hidden aspect-video relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5!2d80.2255!3d13.0607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da6a7bde33%3A0x7a5debb8b0b8b7e3!2sLoyola+College%2C+Chennai!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-70"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Loyola College Chennai"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050810]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <MapPin size={13} className="text-[#13B9FD] flex-shrink-0" />
                <span className="text-white text-sm font-medium">Loyola College, Nungambakkam, Chennai</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {logistics.map((item) => (
              <div
                key={item.title}
                className="glass rounded-2xl p-5 border border-white/8 flex items-start gap-4 hover:border-[#027DFD]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#027DFD]/15 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[#13B9FD]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="glass rounded-2xl p-5 border border-[#027DFD]/20">
              <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#13B9FD]" />
                Venue Facilities
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {facilities.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-white/50 text-xs">
                    <div className="w-1 h-1 rounded-full bg-[#027DFD] flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
