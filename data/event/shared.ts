export const contact = "nammaflutter@gmail.com";

export const emailLink = (subject: string) =>
  `mailto:${contact}?subject=${encodeURIComponent(subject)}`;

export type ContentStatus = "placeholder" | "confirmed";

export type EventImage = {
  src: string;
  alt: string;
};
