import type { ContentStatus, EventImage } from "./shared";

type HiringStallBase = {
  id: string;
  teamType: string;
  roles: string[];
};

export type HiringStall = HiringStallBase &
  (
    | { status: Extract<ContentStatus, "placeholder"> }
    | {
        status: Extract<ContentStatus, "confirmed">;
        company: string;
        logo?: EventImage;
        careersUrl?: string;
      }
  );

export const hiringStalls: HiringStall[] = [
  {
    id: "H01",
    status: "placeholder",
    teamType: "Product engineering team",
    roles: ["Flutter Engineer", "Mobile Tech Lead"],
  },
  {
    id: "H02",
    status: "placeholder",
    teamType: "Digital product studio",
    roles: ["Senior Flutter Developer", "Platform Engineer"],
  },
  {
    id: "H03",
    status: "placeholder",
    teamType: "Early-stage product team",
    roles: ["Founding Mobile Engineer", "Flutter Generalist"],
  },
];
