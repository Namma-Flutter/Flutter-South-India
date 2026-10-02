/** A circular photo slot positioned at (cx, cy) with radius r. */
export type PhotoSlotCircle = { kind: "circle"; cx: number; cy: number; r: number };
/** A rectangular photo slot at (x, y) with width w and height h. */
export type PhotoSlotRect = { kind: "rect"; x: number; y: number; w: number; h: number };
export type PhotoSlot = PhotoSlotCircle | PhotoSlotRect;

export type PhotoCrop = {
  zoom: number;
  offsetX: number;
  offsetY: number;
};

export type PosterFields = {
  firstName: string;
  lastName: string;
  designation: string;
  company: string;
};

export type DrawAssets = {
  /** Pre-baked PNG artwork used as a template background. */
  templateImage: HTMLImageElement | null;
};

export type DrawInput = {
  photo: HTMLImageElement | null;
  crop: PhotoCrop;
  fields: PosterFields;
  fontFamily: string;
  showPlaceholders: boolean;
  assets: DrawAssets;
};

export type PosterTemplate = {
  id: string;
  label: string;
  width: number;
  height: number;
  photoSlot: PhotoSlot;
  /**
   * Path to a pre-baked PNG template image, or null for templates drawn
   * entirely in canvas code.
   */
  templateSrc: string | null;
  draw: (ctx: CanvasRenderingContext2D, input: DrawInput, scale: number) => void;
};

// ─── Geometry helpers ────────────────────────────────────────────────────────

/** Cover-fit photo dimensions for the given slot at the given zoom level. */
export function photoDrawSizeForSlot(
  photo: HTMLImageElement,
  slotW: number,
  slotH: number,
  zoom: number,
): { width: number; height: number } {
  const base = Math.max(slotW / photo.naturalWidth, slotH / photo.naturalHeight);
  return {
    width: photo.naturalWidth * base * zoom,
    height: photo.naturalHeight * base * zoom,
  };
}

export function drawTemplateBackground(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  scale: number,
): void {
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
}

export function drawPhotoInSlot(
  ctx: CanvasRenderingContext2D,
  photo: HTMLImageElement,
  crop: PhotoCrop,
  slot: PhotoSlot,
): void {
  const slotW = slot.kind === "circle" ? slot.r * 2 : slot.w;
  const slotH = slot.kind === "circle" ? slot.r * 2 : slot.h;
  const { width, height } = photoDrawSizeForSlot(photo, slotW, slotH, crop.zoom);

  ctx.save();
  ctx.beginPath();
  if (slot.kind === "circle") {
    ctx.arc(slot.cx, slot.cy, slot.r, 0, Math.PI * 2);
  } else {
    ctx.rect(slot.x, slot.y, slot.w, slot.h);
  }
  ctx.clip();
  ctx.imageSmoothingQuality = "high";
  const x = slot.kind === "circle" ? slot.cx - slot.r : slot.x;
  const y = slot.kind === "circle" ? slot.cy - slot.r : slot.y;
  ctx.drawImage(
    photo,
    x + slotW / 2 - width / 2 + crop.offsetX,
    y + slotH / 2 - height / 2 + crop.offsetY,
    width,
    height,
  );
  ctx.restore();
}

/** Clamps crop offsets so the photo always fully covers the slot. */
export function clampCropForSlot(
  photo: HTMLImageElement,
  slot: PhotoSlot,
  crop: PhotoCrop,
): PhotoCrop {
  const slotW = slot.kind === "circle" ? slot.r * 2 : slot.w;
  const slotH = slot.kind === "circle" ? slot.r * 2 : slot.h;
  const { width, height } = photoDrawSizeForSlot(photo, slotW, slotH, crop.zoom);
  const maxX = (width - slotW) / 2;
  const maxY = (height - slotH) / 2;
  return {
    zoom: crop.zoom,
    offsetX: Math.max(-maxX, Math.min(maxX, crop.offsetX)),
    offsetY: Math.max(-maxY, Math.min(maxY, crop.offsetY)),
  };
}

/** Returns true if the template-space coordinate (x, y) is inside the photo slot. */
export function isInPhotoSlot(slot: PhotoSlot, x: number, y: number): boolean {
  if (slot.kind === "circle") {
    return Math.hypot(x - slot.cx, y - slot.cy) <= slot.r;
  }
  return x >= slot.x && x <= slot.x + slot.w && y >= slot.y && y <= slot.y + slot.h;
}
