"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Countdown.module.css";

type CountdownUnit = {
  label: string;
  value: string;
};

function getCountdown(target: number): CountdownUnit[] {
  const remaining = Math.max(0, target - Date.now());
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1_000) % 60);

  return [
    { label: "days", value: String(days).padStart(2, "0") },
    { label: "hours", value: String(hours).padStart(2, "0") },
    { label: "mins", value: String(minutes).padStart(2, "0") },
    { label: "secs", value: String(seconds).padStart(2, "0") },
  ];
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [units, setUnits] = useState<CountdownUnit[]>([
    { label: "days", value: "--" },
    { label: "hours", value: "--" },
    { label: "mins", value: "--" },
    { label: "secs", value: "--" },
  ]);

  useEffect(() => {
    const update = () => setUnits(getCountdown(target));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <div className={styles.countdown} aria-label="Time until the event">
      {units.map((unit) => (
        <div className={styles.unit} key={unit.label}>
          <span
            className={`${styles.value} ${unit.label === "secs" ? styles.tick : ""}`}
            key={`${unit.label}-${unit.value}`}
          >
            {unit.value}
          </span>
          <span className={styles.label}>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
