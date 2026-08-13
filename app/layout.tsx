import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://southindia.nammaflutter.com"),
  title: "Flutter South India 2026 | Chennai",
  description:
    "A community-led day for Flutter and Dart developers, happening 10 October 2026 in Chennai.",
  keywords: [
    "Flutter conference",
    "Dart",
    "Chennai",
    "South India",
    "Namma Flutter",
  ],
  openGraph: {
    title: "Flutter South India 2026 | Chennai",
    description:
      "One community-led day for Flutter and Dart developers in South India.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Flutter South India 2026 | Chennai",
    description:
      "One community-led day for Flutter and Dart developers in South India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
