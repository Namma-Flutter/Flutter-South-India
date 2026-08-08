import type { ContentStatus, EventImage } from "./shared";

type SponsorSlotBase = {
  id: string;
  tier: string;
  featured?: boolean;
};

export type SponsorSlot = SponsorSlotBase &
  (
    | { status: Extract<ContentStatus, "placeholder"> }
    | {
        status: Extract<ContentStatus, "confirmed">;
        name: string;
        logo: EventImage;
        href?: string;
      }
  );

export const sponsorSlots: SponsorSlot[] = [
  {
    id: "P01",
    tier: "Title partner",
    status: "placeholder",
    featured: true,
  },
  { id: "P02", tier: "Gold partner", status: "placeholder", featured: false },
  { id: "P03", tier: "Gold partner", status: "placeholder", featured: false },
  { id: "P04", tier: "Community partner", status: "placeholder", featured: false },
  { id: "P05", tier: "Community partner", status: "placeholder", featured: false },
];
