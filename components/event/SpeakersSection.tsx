import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { participationPaths, speakerSlots } from "@/data/event";
import {
  trackSpeakerInquiry,
  trackSpeakerProfileClick,
} from "@/lib/analytics";
import styles from "./EventPage.module.css";

function SpeakerCard({ speaker }: { speaker: (typeof speakerSlots)[number] }) {
  const isPlaceholder = speaker.status === "placeholder";
  const role = speaker.status === "confirmed" ? speaker.role : "";
  const organization =
    speaker.status === "confirmed" ? speaker.organization : undefined;
  const photo = speaker.status === "confirmed" ? speaker.photo : undefined;

  return (
    <article className={styles.speakerCard}>
      <div className={styles.speakerCardVisual} aria-hidden={!photo}>
        {photo ? (
          <Image
            className={styles.speakerPhoto}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 38rem) 100vw, (max-width: 64rem) 50vw, 33vw"
          />
        ) : (
          <>
            <span>{speaker.id}</span>
            <i />
          </>
        )}
      </div>
      <div className={styles.speakerCardBody}>
        <p className={styles.speakerRole}>
          {isPlaceholder ? "To be announced" : role || "Confirmed speaker"}
        </p>
        <div className={styles.speakerIdentity}>
          <h4>{isPlaceholder ? speaker.format : speaker.name}</h4>
          {organization ? (
            <p className={styles.speakerOrganization}>{organization}</p>
          ) : null}
        </div>
        <span className={styles.speakerTopic}>
          {isPlaceholder ? speaker.focus : speaker.topic}
        </span>
        {speaker.status === "confirmed" && speaker.profileUrl ? (
          <a
            href={speaker.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackSpeakerProfileClick({
                speaker_name: speaker.name,
                speaker_role: speaker.role || "",
                speaker_org: speaker.organization || "",
              })
            }
          >
            LinkedIn
            <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function SpeakersSection() {
  return (
    <section className={styles.speakers} id="speakers">
      <div className={`container ${styles.speakersIntro}`}>
        <SectionIntro
          eyebrow="The people on stage"
          title="Meet the first confirmed speakers."
          copy="Session topics and full speaker profiles will be added as they are finalised."
        />
        <a
          className="text-link"
          href={participationPaths[0].href}
          onClick={() =>
            trackSpeakerInquiry({
              cta_location: "speakers",
              inquiry_type: "speaking",
            })
          }
          data-reveal
        >
          Propose a session
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>

      <div className={`container ${styles.speakerTrackPanel}`}>
        <div className={styles.speakerTrackGrid} aria-label="Confirmed speakers">
          {speakerSlots.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}
