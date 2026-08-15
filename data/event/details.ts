import { contact } from "./shared";
import { ticketCtaHref } from "./tickets";

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
  ticketLink: ticketCtaHref,
  ticketLabel: "Get tickets",
} as const;

export const eventNav = [
  { label: "About", href: "#about" },
  { label: "Tickets", href: "#tickets" },
  { label: "Programme", href: "#programme" },
  { label: "Speakers", href: "#speakers" },
  { label: "Past events", href: "#past-events" },
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
  { label: "Website", href: "https://nammaflutter.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nammaflutter/" },
  { label: "Instagram", href: "https://www.instagram.com/nammaflutter/" },
  { label: "X", href: "https://x.com/nammaflutter" },
  { label: "YouTube", href: "https://youtube.com/@nammaflutter" },
  { label: "GitHub", href: "https://github.com/Namma-Flutter" },
  { label: "Meetup", href: "https://www.meetup.com/nammaflutter/" },
] as const;
