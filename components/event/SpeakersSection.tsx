import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { participationPaths, speakerSlots } from "@/data/event";
import styles from "./EventPage.module.css";

export default function SpeakersSection() {
  return (
    <section className={styles.speakers} id="speakers">
      <div className={`container ${styles.speakersIntro}`}>
        <SectionIntro
          eyebrow="The people on stage"
          title="Speakers worth listening to, announced with care."
          copy="The line-up is still being curated. These slots show the shape of the speaker programme without inventing names before confirmations are complete."
        />
        <a className="text-link" href={participationPaths[0].href} data-reveal>
          Propose a session
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>

      <div className={`container ${styles.speakerGrid}`}>
        {speakerSlots.map((speaker) => {
          const isPlaceholder = speaker.status === "placeholder";
          const speakerLabel =
            speaker.status === "confirmed"
              ? [speaker.role, speaker.organization].filter(Boolean).join(" · ")
              : "";
          const photo = speaker.status === "confirmed" ? speaker.photo : undefined;

          return (
            <article
              className={`${styles.speakerSlot} ${
                speaker.featured ? styles.speakerSlotFeatured : ""
              }`}
              data-reveal
              key={speaker.id}
            >
              <div className={styles.speakerVisual} aria-hidden={isPlaceholder}>
                {photo ? (
                  <Image
                    className={styles.speakerPhoto}
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={speaker.featured ? "(max-width: 832px) 100vw, 58vw" : "30vw"}
                  />
                ) : (
                  <>
                    <span>{speaker.id}</span>
                    <i />
                  </>
                )}
              </div>
              <div className={styles.speakerDetails}>
                <p>
                  {isPlaceholder
                    ? "To be announced"
                    : speakerLabel || "Confirmed speaker"}
                </p>
                <h3>{isPlaceholder ? speaker.format : speaker.name}</h3>
                <span>{isPlaceholder ? speaker.focus : speaker.topic}</span>
                {speaker.status === "confirmed" && speaker.profileUrl ? (
                  <a href={speaker.profileUrl} target="_blank" rel="noreferrer">
                    Speaker profile
                    <ArrowUpRight aria-hidden="true" size={14} />
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
