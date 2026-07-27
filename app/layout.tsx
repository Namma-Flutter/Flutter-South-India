import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Flutter South India 2026 | Namma Flutter",
  description:
    "The premier Flutter developer conference in South India. October 10, 2026 · Loyola College, Chennai. Join us for expert talks, 3 tracks, community networking and more.",
  keywords: ["Flutter", "South India", "Conference", "Chennai", "Dart", "Mobile Development", "2026", "Namma Flutter"],
  openGraph: {
    title: "Flutter South India 2026 | Namma Flutter",
    description: "The premier Flutter developer conference in South India. October 10, 2026 · Loyola College, Chennai.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
