import { contact } from "./shared";
import { ticketCtaHref } from "./tickets";

export const eventDetails = {
  name: "Flutter South India 2026",
  organizer: "Flutter South India",
  dateISO: "2026-10-10T09:00:00+05:30",
  dateLabel: "10 October 2026",
  dayLabel: "Saturday",
  venue: "SRM IST Ramapuram",
  city: "Chennai",
  address: "Bharathi Salai, Ramapuram, Chennai, Tamil Nadu 600089",
  venueWebsite: "https://srmrmp.edu.in/",
  venueMapLink: "https://maps.app.goo.gl/TcjDzLXkZ8xofRMc8?g_st=ac",
  venuePartnerLogo:
    "https://i0.wp.com/srmrmp.edu.in/wp-content/uploads/2025/02/New-Logo-SRM-02-1-1024x446.png",
  contact,
  ticketLink: ticketCtaHref,
  ticketLabel: "Get tickets",
} as const;

export const eventNav = [
  { label: "About", href: "#about" },
  { label: "Tickets", href: "#tickets" },
  { label: "Programme", href: "#programme" },
  { label: "Speakers", href: "#speakers" },
  { label: "Partners", href: "#community-partners" },
  { label: "Past events", href: "#past-events" },
  { label: "Venue", href: "#venue" },
] as const;

export const eventFacts = [
  { value: "1", label: "community-led day" },
  { value: "3", label: "communities organising together" },
  { value: "SRM IST RMP", label: "Venue partner" },
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
  "Travel guidance will be shared",
] as const;

export const socialLinks = [
  { label: "Website", href: "https://nammaflutter.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/company/namma-flutter" },
  { label: "Instagram", href: "https://instagram.com/nammaflutter" },
  { label: "X", href: "https://x.com/nammaflutter" },
  { label: "YouTube", href: "https://youtube.com/@nammaflutter" },
  { label: "GitHub", href: "https://github.com/nammaflutter" },
  { label: "Meetup", href: "https://meetup.com/namma-flutter" },
] as const;
