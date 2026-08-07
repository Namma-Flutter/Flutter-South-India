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
        role: string;
        organization?: string;
        topic: string;
        photo?: EventImage;
        profileUrl?: string;
      }
  );

export const speakerSlots: SpeakerSlot[] = [
  {
    id: "S01",
    format: "Opening voice",
    focus: "A shared idea to set the tone for the day.",
    status: "placeholder",
    featured: true,
  },
  {
    id: "S02",
    format: "Product engineering",
    focus: "Lessons from building and operating real Flutter products.",
    status: "placeholder",
    featured: false,
  },
  {
    id: "S03",
    format: "Platform craft",
    focus: "Deep technical thinking across performance, tooling, and architecture.",
    status: "placeholder",
    featured: false,
  },
  {
    id: "S04",
    format: "Dart ecosystem",
    focus: "Ideas and practice from the wider Dart and open-source community.",
    status: "placeholder",
    featured: false,
  },
];
