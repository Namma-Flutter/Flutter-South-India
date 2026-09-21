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

const gtmId = (process.env.GTM_CONTAINER_ID || "").trim();
const isValidGtmId = Boolean(gtmId && /^[A-Za-z0-9_-]+$/.test(gtmId));

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {isValidGtmId && (
          /* eslint-disable-next-line @next/next/next-script-for-ga */
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body suppressHydrationWarning>
        {isValidGtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
