export type AgendaSessionType =
  | "registration"
  | "ceremony"
  | "talk"
  | "break"
  | "panel"
  | "standup"
  | "devroom";

export type AgendaSession = {
  title: string;
  speaker?: string;
  company?: string;
  type: AgendaSessionType;
};

export type AgendaSlot = {
  time: string;
  /** When true, the session spans both tracks (full-width row). */
  fullWidth?: boolean;
  track1?: AgendaSession;
  track2?: AgendaSession;
};

export const agendaSlots: AgendaSlot[] = [
  {
    time: "08:00 – 10:00 AM",
    fullWidth: true,
    track1: {
      title: "Registrations",
      type: "registration",
    },
  },
  {
    time: "10:00 – 10:30 AM",
    fullWidth: true,
    track1: {
      title: "Opening Ceremony",
      type: "ceremony",
    },
  },
  {
    time: "10:30 – 11:05 AM",
    track1: {
      title: "Building Wearable Experiences with Flutter",
      speaker: "Kamal Shree & Gayathri",
      company: "Microsoft & Degreed",
      type: "talk",
    },
    track2: {
      title: "Ship Fast, Break Nothing: Building Apps at Scale with Almost Zero Manual Testing as a Lean Team with AI",
      speaker: "Gowtham M G",
      company: "CRED",
      type: "talk",
    },
  },
  {
    time: "11:05 – 11:40 AM",
    track1: {
      title: "Skipping the Store: Shipping Instant Flutter Updates with Shorebird",
      speaker: "Drishtant Ranjan Srivastava",
      company: "Landmark Group",
      type: "talk",
    },
    track2: {
      title: "Dependency Injection and Testability as a Design Principle",
      speaker: "Shubham Jain",
      company: "Tide",
      type: "talk",
    },
  },
  {
    time: "11:40 – 12:15 PM",
    track1: {
      title: "Level Up Your Flutter Apps with Flame",
      speaker: "Sai Rajendra Immadi",
      company: "IBM",
      type: "talk",
    },
    track2: {
      title: "Breaking & Hardening Flutter Apps: What VAPT Teaches Us About Mobile Security",
      speaker: "Hari Prasath G",
      company: "Tradelab Technologies",
      type: "talk",
    },
  },
  {
    time: "12:15 – 01:30 PM",
    fullWidth: true,
    track1: {
      title: "Lunch Break · Networking & sponsor booths",
      type: "break",
    },
  },
  {
    time: "01:30 – 02:05 PM",
    track1: {
      title: "Idea to App using SDD",
      speaker: "Dhrumil Shah",
      company: "Scapia, GDE for Flutter & Dart",
      type: "talk",
    },
    track2: {
      title: "From Screens to Intelligence: How AI Will Redefine Flutter Applications",
      speaker: "Sri Madhumitha Loga Vignesh",
      company: "RNTBCI",
      type: "talk",
    },
  },
  {
    time: "02:05 – 02:40 PM",
    track1: {
      title: "Flutter Doesn't Replace Native — It Joins It",
      speaker: "Surya Saravanakumar",
      company: "Sharpsell.ai",
      type: "talk",
    },
    track2: {
      title: "Server-Driven UI in Flutter (Stac): Building Dynamic Apps Without Releasing New Builds",
      speaker: "Prabhu Nath Tiwary",
      company: "SimplifyVMS",
      type: "talk",
    },
  },
  {
    time: "02:40 – 03:15 PM",
    track1: {
      title: "Trust, Sandbox, Verify: Hardening Flutter Codebases for Multi-Agent AI Development",
      speaker: "Vivek Yadav",
      company: "Ocean AI",
      type: "talk",
    },
    track2: {
      title: "Dev Room",
      type: "devroom",
    },
  },
  {
    time: "03:15 – 03:30 PM",
    fullWidth: true,
    track1: {
      title: "Tea Break",
      type: "break",
    },
  },
  {
    time: "03:30 – 04:00 PM",
    track1: {
      title: "Round Table Discussion",
      speaker: "5 panelists",
      type: "panel",
    },
    track2: {
      title: "Dev Room",
      type: "devroom",
    },
  },
  {
    time: "04:00 – 04:45 PM",
    fullWidth: true,
    track1: {
      title: "Flutter Standup",
      speaker: "Nithin (Rambo) Kamlesh",
      company: "Talentship",
      type: "standup",
    },
  },
  {
    time: "04:45 PM",
    fullWidth: true,
    track1: {
      title: "Closing Ceremony",
      type: "ceremony",
    },
  },
];
