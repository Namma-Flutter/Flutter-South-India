"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import {
  communityCollaborators,
  communityPhotos,
  communityStats,
} from "@/data/event/community";
import SectionIntro from "@/components/ui/SectionIntro";
import styles from "./CommunityStorySection.module.css";

export default function CommunityStorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  useEffect(() => {
    if (!isAutoPlayEnabled) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % communityPhotos.length);
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isAutoPlayEnabled]);

  const visiblePhotos = Array.from({ length: 3 }, (_, offset) => {
    return communityPhotos[(activeIndex + offset) % communityPhotos.length];
  });

  const showPrevious = () => {
    setActiveIndex(
      (index) =>
        (index - 1 + communityPhotos.length) % communityPhotos.length,
    );
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % communityPhotos.length);
  };

  return (
    <section className={styles.story} id="past-events">
      <div className={`container ${styles.intro}`}>
        <SectionIntro
          eyebrow="Our story so far"
          title="Built in Chennai. Growing across South India."
          copy="Namma Flutter started with a simple idea: create the Flutter community we wished Chennai already had. Every meetup, workshop, college visit, and community build since then has made that circle bigger."
          inverse
        />

        <div className={styles.collaboration} data-reveal>
          <p>Building this South India chapter together with</p>
          <div className={styles.collaboratorList}>
            {communityCollaborators.map((collaborator) => (
              <span key={collaborator}>{collaborator}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={`container ${styles.stats}`} data-reveal>
        {communityStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div
        className={`container ${styles.carousel}`}
        aria-label="Namma Flutter past event moments"
        aria-roledescription="carousel"
        data-reveal
      >
        <div className={styles.collage} aria-live="off">
          {visiblePhotos.map((photo, index) => (
            <figure
              className={`${styles.photo} ${
                index === 0 ? styles.photoLarge : styles.photoSmall
              }`}
              key={`${activeIndex}-${photo.src}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 608px) 100vw, 66vw"
                    : "(max-width: 608px) 50vw, 33vw"
                }
              />
              <figcaption>
                <span>{photo.label}</span>
                <strong>{photo.note}</strong>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.carouselControls}>
          <span aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {communityPhotos.length}
          </span>
          <div>
            <button type="button" onClick={showPrevious} aria-label="Previous event">
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsAutoPlayEnabled((enabled) => !enabled)}
              aria-label={isAutoPlayEnabled ? "Pause carousel" : "Play carousel"}
            >
              {isAutoPlayEnabled ? (
                <Pause aria-hidden="true" size={16} />
              ) : (
                <Play aria-hidden="true" size={16} />
              )}
            </button>
            <button type="button" onClick={showNext} aria-label="Next event">
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={`container ${styles.footnote}`} data-reveal>
        <p>
          Not my community. Not your community. <strong>Namma community.</strong>
        </p>
        <a href="https://nammaflutter.com/events/" target="_blank" rel="noreferrer">
          See our past events
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </div>
    </section>
  );
}
