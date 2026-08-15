"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import nammaFlutterMascot from "@/assets/brand/namma-flutter-mascot.webp";
import styles from "./EventPage.module.css";

type EventHeaderProps = {
  organizer: string;
  nav: ReadonlyArray<{ label: string; href: string }>;
  ticketLabel: string;
  ticketLink: string;
};

export default function EventHeader({
  organizer,
  nav,
  ticketLabel,
  ticketLink,
}: EventHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const ticketLinkProps = ticketLink.startsWith("http")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const pageRegions = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    pageRegions.forEach((region) => {
      region.inert = open;
    });

    if (!open) {
      if (wasOpenRef.current) menuButtonRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    const panel = panelRef.current;
    const trigger = menuButtonRef.current;
    const panelFocusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];
    const focusables = trigger ? [trigger, ...panelFocusables] : panelFocusables;

    window.requestAnimationFrame(() => panel?.focus({ preventScroll: true }));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      pageRegions.forEach((region) => {
        region.inert = false;
      });
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 833px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <>
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <a
          className={styles.brand}
          href="#top"
          onClick={() => setOpen(false)}
        >
          <span className={styles.brandMark}>
            <Image
              src={nammaFlutterMascot}
              alt=""
              width={38}
              height={38}
              priority
            />
          </span>
          <span>
            <strong>{organizer}</strong>
            <small>South India · 2026</small>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className={`button button-primary ${styles.headerCta}`}
          href={ticketLink}
          {...ticketLinkProps}
        >
          {ticketLabel}
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.2} />
        </a>

        <button
          className={styles.menuButton}
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>

      <div
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        id="mobile-navigation"
        ref={panelRef}
        tabIndex={-1}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a
            className={`button button-primary ${styles.mobileCta}`}
            href={ticketLink}
            onClick={() => setOpen(false)}
            {...ticketLinkProps}
          >
            {ticketLabel}
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </nav>
      </div>
    </>
  );
}
