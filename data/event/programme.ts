export type ProgramMoment = {
  time: string;
  title: string;
  description: string;
  tone: "opening" | "tracks" | "community" | "closing";
};

export const programme = [
  {
    time: "Morning",
    title: "Doors, welcome & opening session",
    description:
      "An easy start: check in, meet the community, and settle in before the first shared session.",
    tone: "opening",
  },
  {
    time: "Late morning",
    title: "Three focused Flutter tracks",
    description:
      "Parallel sessions spanning product engineering, platform craft, and the wider Dart ecosystem.",
    tone: "tracks",
  },
  {
    time: "Afternoon",
    title: "Talks, demos & conversations",
    description:
      "More technical sessions alongside product demos, community spaces, careers, and time to connect.",
    tone: "community",
  },
  {
    time: "Closing",
    title: "Panel, takeaways & group photo",
    description:
      "Bring the tracks back together, share what mattered, and close the day as one community.",
    tone: "closing",
  },
] satisfies ProgramMoment[];

