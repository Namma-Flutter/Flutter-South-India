import { contact, emailLink } from "./shared";

export const eventDetails = {
  name: "Flutter South India 2026",
  organizer: "Namma Flutter",
  dateISO: "2026-10-10T09:00:00+05:30",
  dateLabel: "10 October 2026",
  dayLabel: "Saturday",
  venue: "Venue TBA",
  city: "Chennai",
  address: "Details coming soon",
  contact,
  ticketLink: emailLink("Flutter South India 2026 | ticket updates"),
  ticketLabel: "Ticket opens on 15 August",
} as const;

export const eventNav = [
  { label: "About", href: "#about" },
  { label: "Programme", href: "#programme" },
  { label: "Speakers", href: "#speakers" },
  { label: "Partners", href: "#partners" },
  { label: "Hiring", href: "#hiring" },
  { label: "Venue", href: "#venue" },
] as const;

export const eventFacts = [
  { value: "1", label: "community-led day" },
  { value: "3", label: "parallel talk tracks" },
  { value: "TBA", label: "venue announcement coming soon" },
  { value: "Chennai", label: "built here, shared everywhere" },
] as const;

export const eventPrinciples = [
  {
    number: "01",
    title: "Useful talks, not sales decks",
    description:
      "Practical Flutter and Dart sessions shaped around the decisions developers make in real products.",
  },
  {
    number: "02",
    title: "People worth meeting",
    description:
      "A full day with engineers, maintainers, students, founders, and teams building across South India.",
  },
  {
    number: "03",
    title: "Room to participate",
    description:
      "Questions, demos, hallway conversations, hiring, and community-led moments are part of the programme.",
  },
] as const;

export const venueNotes = [
  "Venue announcement coming soon",
  "Accessibility details to follow",
  "Travel guidance will be shared",
  "Parking information will be confirmed",
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/namma-flutter" },
  { label: "Instagram", href: "https://instagram.com/nammaflutter" },
  { label: "X", href: "https://x.com/nammaflutter" },
  { label: "YouTube", href: "https://youtube.com/@nammaflutter" },
  { label: "GitHub", href: "https://github.com/nammaflutter" },
  { label: "Meetup", href: "https://meetup.com/namma-flutter" },
] as const;

