declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type TicketCtaLocation =
  | "header"
  | "mobile_nav"
  | "hero"
  | "tickets_tier"
  | "final_cta";

export type TicketTierId =
  | "early-bird-student"
  | "early-bird-professional"
  | "student"
  | "professional"
  | "super-supporter"
  | "unspecified";

export type TicketIntentClickEvent = {
  event: "ticket_intent_click";
  cta_location: TicketCtaLocation;
  ticket_tier: TicketTierId | string;
  ticket_price?: number;
  link_url: string;
};

export type BrochureDownloadEvent = {
  event: "brochure_download";
  file_name: string;
  file_extension: string;
  link_url: string;
};

export type SpeakerInquiryEvent = {
  event: "speaker_inquiry";
  cta_location: "programme" | "speakers" | "take_part" | string;
  inquiry_type: "speaking";
};

export type PartnerInquiryEvent = {
  event: "partner_inquiry";
  cta_location: "take_part";
  inquiry_type: "partnership";
};

export type VolunteerInquiryEvent = {
  event: "volunteer_inquiry";
  cta_location: "take_part";
  inquiry_type: "volunteering";
};

export type TrackSelectEvent = {
  event: "track_select";
  track_id: string;
  track_title: string;
};

export type SpeakerProfileClickEvent = {
  event: "speaker_profile_click";
  speaker_name: string;
  speaker_role: string;
  speaker_org: string;
};

export type VenueMapClickEvent = {
  event: "venue_map_click";
  cta_location: "hero_pass" | "venue_section";
  destination_domain: "maps.app.goo.gl";
};

export type AnalyticsEvent =
  | TicketIntentClickEvent
  | BrochureDownloadEvent
  | SpeakerInquiryEvent
  | PartnerInquiryEvent
  | VolunteerInquiryEvent
  | TrackSelectEvent
  | SpeakerProfileClickEvent
  | VenueMapClickEvent;

/**
 * Pushes an event payload to window.dataLayer.
 *
 * Safe for SSR, build-time prerendering, environments without window/GTM,
 * and handles any unexpected browser exceptions gracefully without breaking UI.
 */
export function pushAnalyticsEvent(payload: AnalyticsEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to push analytics event to dataLayer:", error);
    }
  }
}

export function trackTicketIntentClick(
  params: Omit<TicketIntentClickEvent, "event">,
): void {
  pushAnalyticsEvent({
    event: "ticket_intent_click",
    ...params,
  });
}

export function trackBrochureDownload(): void {
  pushAnalyticsEvent({
    event: "brochure_download",
    file_name: "NammaFlutter South India Brochure.pdf",
    file_extension: "pdf",
    link_url: "/assets/NammaFlutter%20South%20India%20Brochure.pdf",
  });
}

export function trackSpeakerInquiry(
  params: Omit<SpeakerInquiryEvent, "event">,
): void {
  pushAnalyticsEvent({
    event: "speaker_inquiry",
    ...params,
  });
}

export function trackPartnerInquiry(
  params: Omit<PartnerInquiryEvent, "event">,
): void {
  pushAnalyticsEvent({
    event: "partner_inquiry",
    ...params,
  });
}

export function trackVolunteerInquiry(
  params: Omit<VolunteerInquiryEvent, "event">,
): void {
  pushAnalyticsEvent({
    event: "volunteer_inquiry",
    ...params,
  });
}

export function trackTrackSelect(
  params: Omit<TrackSelectEvent, "event">,
): void {
  pushAnalyticsEvent({
    event: "track_select",
    ...params,
  });
}

export function trackSpeakerProfileClick(
  params: Omit<SpeakerProfileClickEvent, "event">,
): void {
  pushAnalyticsEvent({
    event: "speaker_profile_click",
    ...params,
  });
}

export function trackVenueMapClick(
  params: Omit<VenueMapClickEvent, "event">,
): void {
  pushAnalyticsEvent({
    event: "venue_map_click",
    ...params,
  });
}
