"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TimeUnit {
  label: string;
  value: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date): TimeUnit[] {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return [
    { label: "Days",    value: days    },
    { label: "Hours",   value: hours   },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
}

const ZERO: TimeUnit[] = [
  { label: "Days",    value: 0 },
  { label: "Hours",   value: 0 },
  { label: "Minutes", value: 0 },
  { label: "Seconds", value: 0 },
];

function FlipNumber({ value }: { value: string }) {
  const prevRef = useRef<string>(value);
  const changed = prevRef.current !== value;
  if (changed) prevRef.current = value;

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={changed ? { y: -20, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="block tabular-nums text-[var(--foreground)] font-black
          text-2xl sm:text-3xl md:text-4xl"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [units, setUnits] = useState<TimeUnit[]>(ZERO);

  useEffect(() => {
    const target = new Date(targetDate);
    setUnits(getTimeLeft(target));
    const id = setInterval(() => setUnits(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2.5 sm:gap-4 md:gap-5">

          {/* Card + label */}
          <div className="flex flex-col items-center">
            <div
              className="glass border border-[var(--card-border)] rounded-xl sm:rounded-2xl
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                flex items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--flutter-blue)]/10 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FlipNumber value={pad(unit.value)} />
            </div>
            <span className="mt-2 text-[9px] sm:text-[10px] md:text-xs
              text-[color:var(--foreground)]/40 uppercase tracking-widest font-medium">
              {unit.label}
            </span>
          </div>

          {/* Separator — nudged up to align with box centre, not label centre */}
          {i < units.length - 1 && (
            <span className="text-[color:var(--foreground)]/20 text-xl sm:text-2xl md:text-3xl
              font-light flex-shrink-0 -mt-5 sm:-mt-6 md:-mt-7">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
