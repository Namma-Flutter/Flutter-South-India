import { contact, emailLink } from "./shared";

export const eventDetails = {
  name: "Flutter South India 2026",
  organizer: "Namma Flutter",
  dateISO: "2026-10-10T09:00:00+05:30",
  dateLabel: "10 October 2026",
  dayLabel: "Saturday",
  venue: "Loyola College",
  city: "Chennai",
  address: "Nungambakkam, Chennai 600034",
  contact,
  ticketLink: emailLink("Flutter South India 2026 | ticket updates"),
  ticketLabel: "Get ticket updates",
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
  { value: "400", label: "seat main auditorium" },
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
  "Main auditorium with 400+ seats",
  "Three seminar halls for parallel tracks",
  "Central Chennai location in Nungambakkam",
  "On-site parking and accessible event spaces",
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/namma-flutter" },
  { label: "Instagram", href: "https://instagram.com/nammaflutter" },
  { label: "X", href: "https://x.com/nammaflutter" },
  { label: "YouTube", href: "https://youtube.com/@nammaflutter" },
  { label: "GitHub", href: "https://github.com/nammaflutter" },
  { label: "Meetup", href: "https://meetup.com/namma-flutter" },
] as const;

