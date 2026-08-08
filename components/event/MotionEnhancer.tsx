"use client";

import { useEffect } from "react";

export default function MotionEnhancer() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const revealBoundary = window.innerHeight * 0.94;
    const pendingElements = elements.filter((element) => {
      const alreadyVisible = element.getBoundingClientRect().top < revealBoundary;
      if (alreadyVisible) element.classList.add("is-revealed");
      return !alreadyVisible;
    });

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    pendingElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
