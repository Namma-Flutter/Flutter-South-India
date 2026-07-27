"use client";

import { useState, useEffect } from "react";

interface TimeUnit {
  label: string;
  value: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date): TimeUnit[] {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
}

const ZERO: TimeUnit[] = [
  { label: "Days", value: 0 },
  { label: "Hours", value: 0 },
  { label: "Minutes", value: 0 },
  { label: "Seconds", value: 0 },
];

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [units, setUnits] = useState<TimeUnit[]>(ZERO);

  useEffect(() => {
    const target = new Date(targetDate);
    // Set immediately on mount, then tick every second
    setUnits(getTimeLeft(target));
    const id = setInterval(() => setUnits(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col items-center">
            <div className="glass border border-white/10 rounded-2xl w-16 h-16 md:w-24 md:h-24 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#027DFD]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-2xl md:text-4xl font-black text-white tabular-nums">
                {pad(unit.value)}
              </span>
            </div>
            <span className="mt-2 text-[10px] md:text-xs text-white/40 uppercase tracking-widest font-medium">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-white/20 text-2xl md:text-3xl font-light mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
