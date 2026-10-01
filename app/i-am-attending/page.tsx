import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import PosterGenerator from "@/components/poster/PosterGenerator";

const posterFont = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "I'm Attending Poster | Flutter South India 2026",
  description:
    "Create your personalised I'm Attending poster for Flutter South India 2026 and share it with your network.",
  openGraph: {
    title: "I'm Attending Poster | Flutter South India 2026",
    description:
      "Add your photo and name to make a personalised Flutter South India 2026 poster.",
    type: "website",
    locale: "en_IN",
  },
};

export default function IAmAttendingPage() {
  return (
    <PosterGenerator
      fontClassName={posterFont.className}
      fontFamily={posterFont.style.fontFamily}
    />
  );
}
