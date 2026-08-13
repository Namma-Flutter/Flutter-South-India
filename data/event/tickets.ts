const rawMode = process.env.NEXT_PUBLIC_TICKETING_MODE?.trim().toLowerCase();
const rawEventUrl = process.env.NEXT_PUBLIC_KONFHUB_EVENT_URL?.trim();
const rawWidgetSrc = process.env.NEXT_PUBLIC_KONFHUB_WIDGET_SRC?.trim();

export const ticketingMode: "redirect" | "embed" =
  rawMode === "embed" ? "embed" : "redirect";

if (!rawEventUrl) {
  throw new Error("NEXT_PUBLIC_KONFHUB_EVENT_URL is required");
}

if (ticketingMode === "embed" && !rawWidgetSrc) {
  throw new Error("NEXT_PUBLIC_KONFHUB_WIDGET_SRC is required in embed mode");
}

export const konfhubEventUrl = rawEventUrl;

export const konfhubWidgetSrc = rawWidgetSrc || "";

export const isTicketingEmbed =
  ticketingMode === "embed" && konfhubWidgetSrc.length > 0;

/** Header / hero CTA: scroll to widget in embed mode, else open KonfHub. */
export const ticketCtaHref = isTicketingEmbed ? "#tickets" : konfhubEventUrl;

export const isKonfhubExternal = ticketCtaHref.startsWith("http");

export type TicketAudience = "student" | "professional" | "supporter";

export type TicketTier = {
  id: string;
  name: string;
  priceInr: number;
  audience: TicketAudience;
  badge?: string;
  note?: string;
};

export const ticketTiers: readonly TicketTier[] = [
  {
    id: "early-bird-student",
    name: "Early Bird Student",
    priceInr: 399,
    audience: "student",
    badge: "Early Bird",
  },
  {
    id: "early-bird-professional",
    name: "Early Bird Professional",
    priceInr: 899,
    audience: "professional",
    badge: "Early Bird",
  },
  {
    id: "student",
    name: "Student",
    priceInr: 799,
    audience: "student",
  },
  {
    id: "professional",
    name: "Professional",
    priceInr: 1899,
    audience: "professional",
  },
  {
    id: "super-supporter",
    name: "Super Supporter",
    priceInr: 5000,
    audience: "supporter",
    note: "Includes T-shirt · + ₹600 GST",
  },
] as const;

export const formatTicketPrice = (priceInr: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInr);
