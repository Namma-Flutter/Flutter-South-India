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
        photo?: EventImage & { objectPosition?: string };
        profileUrl?: string;
      }
  );

export const speakerSlots: SpeakerSlot[] = [
  {
    id: "S01",
    format: "Confirmed speaker",
    focus: "Idea to App using SDD",
    status: "confirmed",
    name: "Dhrumil Shah",
    role: "Engineering Manager; Google Developer Expert for Flutter & Dart",
    organization: "Scapia",
    topic: "Idea to App using SDD",
    photo: {
      src: "/assets/speakers/dhrumil-shah.jpg",
      alt: "Portrait of Dhrumil Shah"
    },
    profileUrl: "https://www.linkedin.com/in/dhuma1981/"
  },
  {
    id: "S02",
    format: "Confirmed speaker",
    focus: "Skipping the Store: Shipping Instant Flutter Updates with Shorebird",
    status: "confirmed",
    name: "Drishtant Ranjan Srivastava",
    role: "Software Engineer; Organizer, Flutter Kanpur",
    organization: "Landmark Group",
    topic: "Skipping the Store: Shipping Instant Flutter Updates with Shorebird",
    photo: {
      src: "/assets/speakers/drishtant-ranjan-srivastava.jpg",
      alt: "Portrait of Drishtant Ranjan Srivastava"
    },
    profileUrl: "https://www.linkedin.com/in/drishtant-ranjan/"
  },
  {
    id: "S07",
    format: "Confirmed speaker",
    focus: "Building Wearable Experiences with Flutter",
    status: "confirmed",
    name: "Kamal Shree",
    role: "Senior Developer Advocate",
    organization: "Microsoft",
    topic: "Building Wearable Experiences with Flutter",
    photo: {
      src: "/assets/speakers/kamal-shree.jpeg",
      alt: "Portrait of Kamal Shree"
    },
    profileUrl: "https://www.linkedin.com/in/kamalshree/"
  },
  {
    id: "S12",
    format: "Confirmed speaker",
    focus: "Building Wearable Experiences with Flutter (co-speaker with Kamal Shree)",
    status: "confirmed",
    name: "Gayathri",
    role: "Mobile Engineer (Flutter Developer)",
    organization: "Degreed",
    topic: "Building Wearable Experiences with Flutter (co-speaker with Kamal Shree)",
    photo: {
      src: "/assets/speakers/gayathri.png",
      alt: "Portrait of Gayathri"
    },
    profileUrl: "https://www.linkedin.com/in/gayathri-devi-srinivasan-961bbb147/"
  },
  {
    id: "S03",
    format: "Confirmed speaker",
    focus: "Flutter Doesn't Replace Native — It Joins It",
    status: "confirmed",
    name: "Surya Saravanakumar",
    role: "Tech Lead",
    organization: "Sharpsell.ai",
    topic: "Flutter Doesn't Replace Native — It Joins It",
    photo: {
      src: "/assets/speakers/surya-saravanakumar.jpeg",
      alt: "Portrait of Surya Saravanakumar"
    },
    profileUrl: "https://www.linkedin.com/in/suryasaravanakumar/"
  },
  {
    id: "S04",
    format: "Confirmed speaker",
    focus: "Ship Fast, Break Nothing: Building Apps at Scale with Almost Zero Manual Testing as a Lean Team with AI",
    status: "confirmed",
    name: "Gowtham M G",
    role: "Builder",
    organization: "CRED",
    topic: "Ship Fast, Break Nothing: Building Apps at Scale with Almost Zero Manual Testing as a Lean Team with AI",
    photo: {
      src: "/assets/speakers/gowtham-m-g.jpeg",
      alt: "Portrait of Gowtham M G"
    },
    profileUrl: "https://www.linkedin.com/in/gowtham-m-g-139951179/"
  },
  {
    id: "S06",
    format: "Confirmed speaker",
    focus: "Breaking & Hardening Flutter Apps: What VAPT Teaches Us About Mobile Security",
    status: "confirmed",
    name: "Hari Prasath G",
    role: "Principal Software Engineer, Flutter",
    organization: "Tradelab Technologies",
    topic: "Breaking & Hardening Flutter Apps: What VAPT Teaches Us About Mobile Security",
    photo: {
      src: "/assets/speakers/hari-prasath.jpg",
      alt: "Portrait of Hari Prasath G",
      objectPosition: "50% 0%"
    },
    profileUrl: "https://www.linkedin.com/in/hari-prasath-ganesan/"
  },
  {
    id: "S05",
    format: "Confirmed speaker",
    focus: "From Screens to Intelligence: How AI Will Redefine Flutter Applications",
    status: "confirmed",
    name: "Sri Madhumitha Loga Vignesh",
    role: "Engineer, Mobile Application Developer",
    organization: "Renault Nissan Technology & Business Centre India",
    topic: "From Screens to Intelligence: How AI Will Redefine Flutter Applications",
    photo: {
      src: "/assets/speakers/sri-madhumitha.jpg",
      alt: "Portrait of Sri Madhumitha Loga Vignesh"
    },
    profileUrl: "https://www.linkedin.com/in/sri-madhumitha-k-815a2283/"
  },
  {
    id: "S08",
    format: "Confirmed speaker",
    focus: "Server-Driven UI in Flutter (Stac): Building Dynamic Apps Without Releasing New Builds",
    status: "confirmed",
    name: "Prabhu Nath Tiwary",
    role: "Associate Lead Software Engineer",
    organization: "SimplifyVMS",
    topic: "Server-Driven UI in Flutter (Stac): Building Dynamic Apps Without Releasing New Builds",
    photo: {
      src: "/assets/speakers/prabhu.jpg",
      alt: "Portrait of Prabhu Nath Tiwary"
    },
    profileUrl: "https://www.linkedin.com/in/prabhu-india/"
  },
  {
    id: "S09",
    format: "Confirmed speaker",
    focus: "Level Up Your Flutter Apps with Flame",
    status: "confirmed",
    name: "Sai Rajendra Immadi",
    role: "Software Developer",
    organization: "IBM",
    topic: "Level Up Your Flutter Apps with Flame",
    photo: {
      src: "/assets/speakers/sai-rajendran.jpg",
      alt: "Portrait of Sai Rajendra Immadi"
    },
    profileUrl: "https://www.linkedin.com/in/immadisairaj/"
  },
  {
    id: "S10",
    format: "Confirmed speaker",
    focus: "Dependency Injection and Testability as a Design Principle",
    status: "confirmed",
    name: "Shubham Jain",
    role: "SDE 4",
    organization: "Tide",
    topic: "Dependency Injection and Testability as a Design Principle",
    photo: {
      src: "/assets/speakers/shubham.jpg",
      alt: "Portrait of Shubham Jain"
    },
    profileUrl: "https://www.linkedin.com/in/someshubham/"
  },
  {
    id: "S11",
    format: "Confirmed speaker",
    focus: "Trust, Sandbox, Verify: Hardening Flutter Codebases for Multi-Agent AI Development",
    status: "confirmed",
    name: "Vivek Yadhav",
    role: "Founder",
    organization: "Ocean AI",
    topic: "Trust, Sandbox, Verify: Hardening Flutter Codebases for Multi-Agent AI Development",
    photo: {
      src: "/assets/speakers/vivek.png",
      alt: "Portrait of Vivek Yadhav"
    },
    profileUrl: "https://www.linkedin.com/in/viveky259/"
  }
];
