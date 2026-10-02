// Geometry matches the supplied 3840 × 2160 blank-pass artwork.
import {
  drawPhotoInSlot,
  drawTemplateBackground,
  type DrawInput,
  type PhotoSlot,
} from "./types";

export const SWISS_PHOTO_SLOT: PhotoSlot = {
  kind: "rect",
  x: 2316,
  y: 495,
  w: 696,
  h: 599,
};

const WIDTH = 3840;
const HEIGHT = 2160;

type FittedText = { text: string; size: number };

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontFamily: string,
  weight: number,
  size: number,
): FittedText {
  let fitted = text;
  ctx.font = `${weight} ${size}px ${fontFamily}`;
  while (ctx.measureText(fitted).width > maxWidth && size > 30) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${fontFamily}`;
  }
  while (fitted.length > 1 && ctx.measureText(fitted).width > maxWidth) {
    fitted = fitted.slice(0, -1);
  }
  return {
    text: fitted === text ? fitted : `${fitted.trimEnd()}…`,
    size,
  };
}

export function drawSwissMinimal(
  ctx: CanvasRenderingContext2D,
  input: DrawInput,
  scale: number,
): void {
  const { photo, crop, fields, fontFamily, showPlaceholders, assets } = input;
  if (!assets.templateImage) return;

  drawTemplateBackground(ctx, assets.templateImage, WIDTH, HEIGHT, scale);
  if (photo) drawPhotoInSlot(ctx, photo, crop, SWISS_PHOTO_SLOT);

  const firstName =
    fields.firstName.trim() || (showPlaceholders ? "Your First Name" : "");
  const lastName =
    fields.lastName.trim() || (showPlaceholders ? "Last Name" : "");
  ctx.fillStyle = "#10212b";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  if (firstName) {
    const fitted = fitText(ctx, firstName, 700, fontFamily, 700, 76);
    ctx.font = `700 ${fitted.size}px ${fontFamily}`;
    ctx.fillText(fitted.text, 2320, 1232);
  }
  if (lastName) {
    const fitted = fitText(ctx, lastName, 700, fontFamily, 700, 76);
    ctx.font = `700 ${fitted.size}px ${fontFamily}`;
    ctx.fillText(fitted.text, 2320, 1320);
  }

  const designation =
    fields.designation.trim() || (showPlaceholders ? "Designation" : "");
  if (designation) {
    const fitted = fitText(ctx, designation, 700, fontFamily, 600, 39);
    ctx.fillStyle = "#027dfd";
    ctx.font = `600 ${fitted.size}px ${fontFamily}`;
    ctx.fillText(fitted.text, 2320, 1400);
  }

  const company =
    fields.company.trim() || (showPlaceholders ? "Company Name" : "");
  if (company) {
    const fitted = fitText(ctx, company, 700, fontFamily, 400, 34);
    ctx.fillStyle = "#5c686d";
    ctx.font = `400 ${fitted.size}px ${fontFamily}`;
    ctx.fillText(fitted.text, 2320, 1454);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
