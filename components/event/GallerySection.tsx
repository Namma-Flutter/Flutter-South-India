"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  galleryCategories,
  galleryPhotos,
  type GalleryCategory,
  type GalleryPhoto,
} from "@/data/event/gallery";
import SectionIntro from "@/components/ui/SectionIntro";
import styles from "./GallerySection.module.css";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return galleryPhotos;
    return galleryPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((curr) =>
          curr !== null
            ? (curr - 1 + filteredPhotos.length) % filteredPhotos.length
            : null
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((curr) =>
          curr !== null ? (curr + 1) % filteredPhotos.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filteredPhotos.length]);

  const activeLightboxPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const openLightboxForPhoto = (photo: GalleryPhoto) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  return (
    <section className={styles.gallery} id="gallery">
      <div className="container">
        {/* Intro */}
        <div className={styles.intro}>
          <SectionIntro
            eyebrow="Event Gallery"
            title="Flutter South India 2026 in Frames."
            copy={`Captured moments from Chennai — the energy on stage, deep technical discussions in the Dev Room, lively audience questions, and the vibrant South India Flutter community coming together.`}
            inverse
          />

          {/* Filter Pills */}
          <div className={styles.filterBar} role="tablist" aria-label="Photo categories">
            {galleryCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterPill} ${
                    isActive ? styles.filterPillActive : ""
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.id === "all" ? (
                    <Camera size={15} aria-hidden="true" />
                  ) : cat.id === "group" ? (
                    <Users size={15} aria-hidden="true" />
                  ) : (
                    <Sparkles size={15} aria-hidden="true" />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Regular Masonry / Grid */}
        <div className={styles.photoGrid}>
          {filteredPhotos.map((photo) => (
              <article
                key={photo.id}
                className={styles.photoCard}
                onClick={() => openLightboxForPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightboxForPhoto(photo);
                  }
                }}
                aria-label={`View photo: ${photo.title}`}
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={
                      photo.thumb ||
                      photo.src.replace(
                        "/assets/events-photos/",
                        "/assets/events-photos/thumbs/"
                      )
                    }
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.cardImage}
                    style={
                      photo.objectPosition
                        ? { objectPosition: photo.objectPosition }
                        : undefined
                    }
                    loading="lazy"
                  />
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>
                    {photo.category === "stage"
                      ? "Main Stage (Track 1)"
                      : photo.category === "devroom"
                      ? "Dev Room (Track 2)"
                      : photo.category === "moments"
                      ? "Moments & Felicitation"
                      : "Group & Team"}
                  </span>
                  <h4 className={styles.cardTitle}>{photo.title}</h4>
                  <p className={styles.cardCaption}>{photo.caption}</p>
                </div>
              </article>
            ))}
        </div>

        {/* Community Callout */}
        <div className={styles.galleryFootnote} data-reveal>
          <div className={styles.footnoteContent}>
            <h3>Have more photos or videos from the day?</h3>
            <p>
              Tag us on LinkedIn and X with <span className={styles.tagPill}>#FlutterSouthIndia</span> or share them with{" "}
              <strong>@nammaflutter</strong> so we can add them to our community album.
            </p>
          </div>
          <a
            className="button button-light"
            href="https://instagram.com/nammaflutter"
            target="_blank"
            rel="noreferrer"
          >
            Tag @nammaflutter
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxPhoto && lightboxIndex !== null && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxPhoto.title}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightboxIndex(null)}
              aria-label="Close fullscreen photo viewer"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className={`${styles.lightboxNavButton} ${styles.lightboxPrev}`}
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredPhotos.length) %
                    filteredPhotos.length
                )
              }
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              className={`${styles.lightboxNavButton} ${styles.lightboxNext}`}
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
              }
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            <div className={styles.lightboxImageWrapper}>
              <Image
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                className={styles.lightboxImage}
                style={
                  activeLightboxPhoto.objectPosition
                    ? { objectPosition: activeLightboxPhoto.objectPosition }
                    : undefined
                }
                priority
              />
            </div>

            <div className={styles.lightboxDetails}>
              <div className={styles.lightboxText}>
                <h3 className={styles.lightboxTitle}>{activeLightboxPhoto.title}</h3>
                <p className={styles.lightboxCaption}>
                  {activeLightboxPhoto.caption}
                </p>
              </div>
              <div className={styles.lightboxCounter}>
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredPhotos.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
