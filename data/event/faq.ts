import { contact } from "./shared";

export const faqItems = [
  {
    question: "Who is the day for?",
    answer:
      "Flutter South India is for people learning, using, teaching, or leading with Flutter and Dart. Students, independent developers, product teams, founders, and experienced engineers are all welcome.",
  },
  {
    question: "How do I get a ticket?",
    answer:
      "Tickets are sold on KonfHub. Use Get tickets on this site to open the event page, then choose Early Bird Student (₹399), Early Bird Professional (₹899), Student (₹799), Professional (₹1,899), or Super Supporter (₹5,000 + ₹600 GST, includes a T-shirt). Student passes are for current students; professional passes are for working developers and teams.",
  },
  {
    question: "What is the refund policy?",
    answer:
      `Refund and transfer rules follow KonfHub’s checkout terms for this event. If you need help with an existing order, email ${contact} and the organising team will point you to the right next step.`,
  },
  {
    question: "Is the speaker line-up final?",
    answer:
      "Not yet. The programme is being curated now. Confirmed speakers and detailed session timings will replace the speaker placeholders once they are ready.",
  },
  {
    question: "Can my company sponsor, exhibit, or hire at the event?",
    answer:
      "Yes. We are planning a small number of useful partner, product, and hiring spaces. Email the team through the partnership link to discuss the right format.",
  },
  {
    question: "Will the venue be accessible?",
    answer:
      `Accessible routes will be part of the venue plan. If you have a specific access requirement, email ${contact} before the event so the team can support you properly.`,
  },
  {
    question: "Where can I follow Namma Flutter?",
    answer:
      "Namma Flutter runs community meetups in Chennai throughout the year. Visit the official website or find the community on LinkedIn, Instagram, X, YouTube, GitHub, and Meetup using the links below.",
  },
] as const;
