export type SponsorTier = "Community Sponsor" | "Super Dash Sponsor" | "Dashling Sponsor";

export type SponsorItem = {
  id: string;
  name: string;
  tier: SponsorTier;
  href: string;
  logo: string;
  tagline: string;
  description: string;
  darkLogoBg?: boolean;
};

export type SponsorTierGroup = {
  name: SponsorTier;
  label: string;
  sponsors: SponsorItem[];
};

export const sponsorTierGroups: SponsorTierGroup[] = [
  {
    name: "Community Sponsor",
    label: "Community Sponsor",
    sponsors: [
      {
        id: "startups-dil-se",
        name: "Startups Dil Se",
        tier: "Community Sponsor",
        href: "https://startupsdilse.com/",
        logo: "/assets/sponsors/startups-dil-se-logo.png",
        tagline: "Founder Stories & Startup Ecosystem",
        description:
          "India's premier startup storytelling platform and founder community, bringing candid conversations, builder journeys, and grassroots entrepreneurial energy to the ecosystem.",
        darkLogoBg: true,
      },
    ],
  },
  {
    name: "Super Dash Sponsor",
    label: "Super Dash Sponsor",
    sponsors: [
      {
        id: "revenuecat",
        name: "RevenueCat",
        tier: "Super Dash Sponsor",
        href: "https://www.revenuecat.com/",
        logo: "/assets/sponsors/revenuecat.svg",
        tagline: "In-App Subscriptions Made Easy",
        description:
          "The complete in-app subscription and revenue platform for Flutter and mobile developers, handling receipts, billing, paywalls, and cross-platform analytics with zero headaches.",
      },
      {
        id: "mahathaan",
        name: "Mahathaan",
        tier: "Super Dash Sponsor",
        href: "https://mahathaan.com/",
        logo: "/assets/sponsors/mahathaan.svg",
        tagline: "Building Digital Dreams Together",
        description:
          "A global technology and design company providing end-to-end software engineering, product innovation, and creative services for businesses dreaming big.",
      },
    ],
  },
  {
    name: "Dashling Sponsor",
    label: "Dashling Sponsor",
    sponsors: [
      {
        id: "kaboom",
        name: "Kaboom",
        tier: "Dashling Sponsor",
        href: "https://kaboom.ai/",
        logo: "/assets/sponsors/kaboom.png",
        tagline: "Enterprise AI That Actually Ships",
        description:
          "The unified AI platform and embedded engineering team that deploys trustworthy, production-grade AI into active enterprise workflows on work you can't get wrong.",
      },
      {
        id: "emerger-tech",
        name: "Emergere Tech",
        tier: "Dashling Sponsor",
        href: "https://emergertech.com/",
        logo: "/assets/sponsors/emerger-tech.svg",
        tagline: "Digital Engineering & Tech Transformation",
        description:
          "A modern technology solutions and digital engineering partner helping companies design, build, and scale high-performance software applications.",
      },
    ],
  },
];

export const allSponsors: SponsorItem[] = sponsorTierGroups.flatMap((g) => g.sponsors);

// For backwards compatibility
export const sponsorSlots = allSponsors.map((s) => ({
  id: s.id,
  tier: s.tier,
  name: s.name,
  href: s.href,
  status: "confirmed" as const,
  featured: s.tier === "Community Sponsor" || s.tier === "Super Dash Sponsor",
  logo: {
    src: s.logo,
    alt: `${s.name} logo`,
    width: 160,
    height: 60,
  },
}));
