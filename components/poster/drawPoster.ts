// Geometry is measured in pixels of the 4000×2250 template image.
export const POSTER_WIDTH = 4000;
export const POSTER_HEIGHT = 2250;
export const POSTER_TEMPLATE_SRC = "/assets/poster/attending-template.png";

export const PHOTO_SLOT = { cx: 2615, cy: 779, r: 258 };

// "✓ ATTENDING" pill that overlaps the bottom of the photo circle.
const ATTENDING_PILL = { x: 2424, y: 1022, w: 381, h: 81 };

const TEXT_CENTER_X = 2615;
const TEXT_MAX_WIDTH = 610;
const PHOTO_BACKDROP = "#081640";

type TextSlot = {
  y: number;
  weight: number;
  size: number;
  minSize: number;
  color: string;
  placeholder: string;
};

const TEXT_SLOTS = {
  firstName: {
    y: 1214,
    weight: 600,
    size: 88,
    minSize: 54,
    color: "#ffffff",
    placeholder: "Your First Name",
  },
  lastName: {
    y: 1330,
    weight: 600,
    size: 88,
    minSize: 54,
    color: "#ffffff",
    placeholder: "Last Name",
  },
  designation: {
    y: 1489,
    weight: 500,
    size: 50,
    minSize: 34,
    color: "#40f0a6",
    placeholder: "Designation",
  },
  company: {
    y: 1580,
    weight: 400,
    size: 46,
    minSize: 32,
    color: "#9dc3fe",
    placeholder: "Company Name",
  },
} satisfies Record<string, TextSlot>;

// When only one name is given it sits centred in the space of both lines.
const SINGLE_NAME_Y = 1272;

export type PosterFields = Record<keyof typeof TEXT_SLOTS, string>;

export type PhotoCrop = {
  zoom: number;
  offsetX: number;
  offsetY: number;
};

export type PosterInput = {
  template: HTMLImageElement;
  photo: HTMLImageElement | null;
  crop: PhotoCrop;
  fields: PosterFields;
  fontFamily: string;
  showPlaceholders: boolean;
};

/** Size of the photo once it covers the circle at the given zoom. */
export function photoDrawSize(photo: HTMLImageElement, zoom: number) {
  const diameter = PHOTO_SLOT.r * 2;
  const base =
    diameter / Math.min(photo.naturalWidth, photo.naturalHeight);
  return {
    width: photo.naturalWidth * base * zoom,
    height: photo.naturalHeight * base * zoom,
  };
}

/** Keeps the photo covering the whole circle after a drag or zoom. */
export function clampCrop(photo: HTMLImageElement, crop: PhotoCrop): PhotoCrop {
  const { width, height } = photoDrawSize(photo, crop.zoom);
  const maxX = (width - PHOTO_SLOT.r * 2) / 2;
  const maxY = (height - PHOTO_SLOT.r * 2) / 2;
  return {
    zoom: crop.zoom,
    offsetX: Math.max(-maxX, Math.min(maxX, crop.offsetX)),
    offsetY: Math.max(-maxY, Math.min(maxY, crop.offsetY)),
  };
}

function setFont(
  ctx: CanvasRenderingContext2D,
  weight: number,
  size: number,
  fontFamily: string,
) {
  ctx.font = `${weight} ${size}px ${fontFamily}`;
}

function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  slot: TextSlot,
  y: number,
  fontFamily: string,
) {
  let size = slot.size;
  setFont(ctx, slot.weight, size, fontFamily);
  while (ctx.measureText(text).width > TEXT_MAX_WIDTH && size > slot.minSize) {
    size -= 2;
    setFont(ctx, slot.weight, size, fontFamily);
  }

  let output = text;
  if (ctx.measureText(output).width > TEXT_MAX_WIDTH) {
    while (
      output.length > 1 &&
      ctx.measureText(`${output}…`).width > TEXT_MAX_WIDTH
    ) {
      output = output.slice(0, -1);
    }
    output = `${output.trimEnd()}…`;
  }

  ctx.fillText(output, TEXT_CENTER_X, y);
}

function drawPhoto(
  ctx: CanvasRenderingContext2D,
  photo: HTMLImageElement,
  crop: PhotoCrop,
) {
  const { cx, cy, r } = PHOTO_SLOT;
  const pill = ATTENDING_PILL;
  const { width, height } = photoDrawSize(photo, crop.zoom);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  // Cut the pill out so it stays on top of the photo.
  ctx.beginPath();
  ctx.rect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);
  ctx.roundRect(pill.x, pill.y, pill.w, pill.h, pill.h / 2);
  ctx.clip("evenodd");

  ctx.fillStyle = PHOTO_BACKDROP;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    photo,
    cx - width / 2 + crop.offsetX,
    cy - height / 2 + crop.offsetY,
    width,
    height,
  );
  ctx.restore();
}

/**
 * Renders the poster in template coordinates. `scale` lets the preview draw
 * at a lower resolution than the exported image.
 */
export function drawPoster(
  ctx: CanvasRenderingContext2D,
  input: PosterInput,
  scale = 1,
) {
  const { template, photo, crop, fields, fontFamily, showPlaceholders } =
    input;

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);
  ctx.drawImage(template, 0, 0, POSTER_WIDTH, POSTER_HEIGHT);

  if (photo) drawPhoto(ctx, photo, crop);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const firstName = fields.firstName.trim();
  const lastName = fields.lastName.trim();
  const singleName = Boolean(firstName) !== Boolean(lastName);

  (Object.keys(TEXT_SLOTS) as Array<keyof typeof TEXT_SLOTS>).forEach(
    (key) => {
      const slot = TEXT_SLOTS[key];
      const value = fields[key].trim();
      const isNameLine = key === "firstName" || key === "lastName";
      if (!value && (!showPlaceholders || (isNameLine && singleName))) return;

      const y = value && isNameLine && singleName ? SINGLE_NAME_Y : slot.y;

      ctx.save();
      ctx.fillStyle = slot.color;
      if (!value) ctx.globalAlpha = 0.35;
      drawFittedText(ctx, value || slot.placeholder, slot, y, fontFamily);
      ctx.restore();
    },
  );

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
