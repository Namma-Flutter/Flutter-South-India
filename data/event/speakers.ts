import type { ContentStatus, EventImage } from "./shared";

type SpeakerSlotBase = {
  id: string;
  format: string;
  focus: string;
  featured?: boolean;
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
    featured: true,
  },
  {
    id: "S02",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Sai Rajendran",
    role: "Software Developer",
    organization: "IBM",
    topic: "Topic to be announced",
    featured: false,
  },
  {
    id: "S03",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Surya",
    role: "Technical Lead",
    organization: "Sharpsell AI",
    topic: "Topic to be announced",
    featured: false,
  },
  {
    id: "S04",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Hari Prasanth",
    role: "Lead Engineer",
    topic: "Topic to be announced",
    featured: false,
  },
];
