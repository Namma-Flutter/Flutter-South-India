import type { ContentStatus, EventImage } from "./shared";

type SpeakerSlotBase = {
  id: string;
  format: string;
  focus: string;
};

export type SpeakerSlot = SpeakerSlotBase &
  (
    | { status: Extract<ContentStatus, "placeholder"> }
    | {
        status: Extract<ContentStatus, "confirmed">;
        name: string;
        role?: string;
        organization?: string;
        topic: string;
        photo?: EventImage;
        profileUrl?: string;
      }
  );

export const speakerSlots: SpeakerSlot[] = [
  {
    id: "S01",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Dhrumil Shah",
    role: "Engineering at Scapia",
    organization: "Google Developer Expert for Flutter & Dart",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/dhrumil-shah.jpg",
      alt: "Portrait of Dhrumil Shah",
    },
    profileUrl: "https://www.linkedin.com/in/dhuma1981/",
  },
  {
    id: "S02",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Drishtant Ranjan Srivastava",
    role: "Software Engineer at Landmark Group",
    organization: "Organizer of Flutter Kanpur",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/drishtant-ranjan-srivastava.jpg",
      alt: "Portrait of Drishtant Ranjan Srivastava",
    },
    profileUrl: "https://www.linkedin.com/in/drishtant-ranjan/",
  },
  {
    id: "S03",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Surya Saravanakumar",
    role: "Tech Lead at Sharpsell.ai",
    organization: "Flutter Enthusiast",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/surya-saravanakumar.png",
      alt: "Portrait of Surya Saravanakumar",
    },
    profileUrl: "https://www.linkedin.com/in/suryasaravanakumar/",
  },
  {
    id: "S04",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Gowtham M G",
    role: "Mobile Engineer at CRED",
    organization: "Flutter Enthusiast",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/gowtham-m-g.png",
      alt: "Portrait of Gowtham M G",
    },
    profileUrl: "https://www.linkedin.com/in/gowtham-m-g-139951179",
  },
];
