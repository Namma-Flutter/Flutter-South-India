import type { PosterTemplate } from "./types";
import { AGENDA_PHOTO_SLOT, drawAgendaStyle } from "./agendaStyle";
import { SWISS_PHOTO_SLOT, drawSwissMinimal } from "./swissMinimal";
import {
  POSTER_WIDTH,
  POSTER_HEIGHT,
  POSTER_TEMPLATE_SRC,
  PHOTO_SLOT,
  drawPoster,
} from "../drawPoster";

/** Original "I'm Attending" template — PNG-backed. */
const iAmAttending: PosterTemplate = {
  id: "i-am-attending",
  label: "I'm Attending",
  width: POSTER_WIDTH,
  height: POSTER_HEIGHT,
  photoSlot: { kind: "circle", cx: PHOTO_SLOT.cx, cy: PHOTO_SLOT.cy, r: PHOTO_SLOT.r },
  templateSrc: POSTER_TEMPLATE_SRC,
  draw(ctx, input, scale) {
    const { photo, crop, fields, fontFamily, showPlaceholders, assets } = input;
    if (!assets.templateImage) return;
    drawPoster(
      ctx,
      { template: assets.templateImage, photo, crop, fields, fontFamily, showPlaceholders },
      scale,
    );
  },
};

const agendaStyle: PosterTemplate = {
  id: "agenda-style",
  label: "Agenda Style",
  width: 3840,
  height: 2160,
  photoSlot: AGENDA_PHOTO_SLOT,
  templateSrc: "/assets/poster/agenda-style-blank.png",
  draw: drawAgendaStyle,
};

const swissMinimal: PosterTemplate = {
  id: "swiss-minimal",
  label: "Swiss Minimal",
  width: 3840,
  height: 2160,
  photoSlot: SWISS_PHOTO_SLOT,
  templateSrc: "/assets/poster/swiss-minimal-blank.png",
  draw: drawSwissMinimal,
};

export const TEMPLATES: readonly PosterTemplate[] = [
  iAmAttending,
  agendaStyle,
  swissMinimal,
];

export type { PosterTemplate };
export type {
  PhotoSlot,
  PhotoCrop,
  PosterFields,
  DrawInput,
  DrawAssets,
} from "./types";
export { clampCropForSlot, isInPhotoSlot } from "./types";
