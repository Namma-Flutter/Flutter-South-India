import { emailLink } from "./shared";

export type ParticipationPath = {
  number: string;
  title: string;
  description: string;
  action: string;
  href: string;
  secondaryAction?: string;
  secondaryHref?: string;
};

export const participationPaths = [
  {
    number: "01",
    title: "Share a talk",
    description:
      "Bring a lesson from production, an honest technical story, or a sharp idea the community can use.",
    action: "Ask about speaking",
    href: emailLink("Flutter South India 2026 | speaking"),
  },
  {
    number: "02",
    title: "Support the room",
    description:
      "Sponsor the event, host a product or hiring space, or help a community-led conference happen well.",
    action: "Discuss partnership",
    href: emailLink("Flutter South India 2026 | partnership"),
    secondaryAction: "View sponsorship prospectus",
    secondaryHref: "/assets/NammaFlutter%20South%20India%20Brochure.pdf",
  },
  {
    number: "03",
    title: "Volunteer with us",
    description:
      "Help welcome attendees, support sessions, and make the day feel thoughtful from start to finish.",
    action: "Join the volunteer crew",
    href: emailLink("Flutter South India 2026 | volunteering"),
  },
] satisfies ParticipationPath[];

