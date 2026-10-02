// Geometry matches the supplied 3840 × 2160 blank-pass artwork.
import {
  drawPhotoInSlot,
  drawTemplateBackground,
  type DrawInput,
  type PhotoSlot,
} from "./types";

export const AGENDA_PHOTO_SLOT: PhotoSlot = {
  kind: "circle",
  cx: 2784,
  cy: 982,
  r: 197,
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

function wrapName(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontFamily: string,
): FittedText[] {
  ctx.font = `700 82px ${fontFamily}`;
  const lines: FittedText[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(fitText(ctx, line, maxWidth, fontFamily, 700, 82));
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(fitText(ctx, line, maxWidth, fontFamily, 700, 82));
  return lines;
}

export function drawAgendaStyle(
  ctx: CanvasRenderingContext2D,
  input: DrawInput,
  scale: number,
): void {
  const { photo, crop, fields, fontFamily, showPlaceholders, assets } = input;
  if (!assets.templateImage) return;

  drawTemplateBackground(ctx, assets.templateImage, WIDTH, HEIGHT, scale);
  if (photo) drawPhotoInSlot(ctx, photo, crop, AGENDA_PHOTO_SLOT);

  const firstName = fields.firstName.trim();
  const lastName = fields.lastName.trim();
  const firstLines = wrapName(
    ctx,
    firstName || (showPlaceholders ? "Your First Name" : ""),
    540,
    fontFamily,
  );
  const lastLines = wrapName(
    ctx,
    lastName || (showPlaceholders ? "Last Name" : ""),
    540,
    fontFamily,
  );
  const nameLines = [...firstLines, ...lastLines];
  ctx.fillStyle = "#10212b";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  nameLines.forEach(({ text, size }, index) => {
    ctx.font = `700 ${size}px ${fontFamily}`;
    ctx.fillText(
      text,
      3052,
      982 + (index - (nameLines.length - 1) / 2) * 94,
    );
  });

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const designation =
    fields.designation.trim() || (showPlaceholders ? "Designation" : "");
  if (designation) {
    ctx.fillStyle = "#087dfd";
    const fitted = fitText(ctx, designation, 920, fontFamily, 600, 42);
    ctx.font = `600 ${fitted.size}px ${fontFamily}`;
    ctx.fillText(fitted.text, 2622, 1310);
  }

  const company =
    fields.company.trim() || (showPlaceholders ? "Company Name" : "");
  if (company) {
    ctx.fillStyle = "#536175";
    const fitted = fitText(ctx, company, 920, fontFamily, 400, 40);
    ctx.font = `400 ${fitted.size}px ${fontFamily}`;
    ctx.fillText(fitted.text, 2622, 1370);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
