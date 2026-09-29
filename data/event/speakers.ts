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
      src: "/assets/speakers/surya-saravanakumar.jpeg",
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
      src: "/assets/speakers/gowtham-m-g.jpeg",
      alt: "Portrait of Gowtham M G",
    },
    profileUrl: "https://www.linkedin.com/in/gowtham-m-g-139951179",
  },
  {
    id: "S05",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Sri Madhumitha",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/sri-madhumitha.jpg",
      alt: "Portrait of Sri Madhumitha",
    },
  },
  {
    id: "S06",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Hari Prasath Ganesan",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/hari-prasath.jpg",
      alt: "Portrait of Hari Prasath Ganesan",
      objectPosition: "50% 0%",
    },
    profileUrl: "https://www.linkedin.com/in/hari-prasath-ganesan/",
  },
  {
    id: "S07",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Kamal Shree",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/kamal-shree.jpeg",
      alt: "Portrait of Kamal Shree",
    },
    profileUrl: "https://www.linkedin.com/in/kamalshree/",
  },
  {
    id: "S08",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Prabhu",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/prabhu.jpg",
      alt: "Portrait of Prabhu",
    },
  },
  {
    id: "S09",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Sai Rajendran",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/sai-rajendran.jpg",
      alt: "Portrait of Sai Rajendran",
    },
  },
  {
    id: "S10",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Shubham",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/shubham.jpg",
      alt: "Portrait of Shubham",
    },
  },
  {
    id: "S11",
    format: "Confirmed speaker",
    focus: "Topic to be announced",
    status: "confirmed",
    name: "Vivek",
    topic: "Topic to be announced",
    photo: {
      src: "/assets/speakers/vivek.png",
      alt: "Portrait of Vivek",
    },
  },
];
