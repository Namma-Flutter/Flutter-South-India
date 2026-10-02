"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ImagePlus,
  LoaderCircle,
  Move,
  Share2,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { trackAttendingPosterExport } from "@/lib/analytics";
import {
  TEMPLATES,
  clampCropForSlot,
  isInPhotoSlot,
  type PosterTemplate,
  type PhotoCrop,
  type PosterFields,
} from "./templates";
import styles from "./PosterGenerator.module.css";

type PosterGeneratorProps = {
  fontClassName: string;
  fontFamily: string;
};

const PREVIEW_SCALE = 0.5;
const JPEG_QUALITY = 0.95;
const MAX_ZOOM = 3;
const MAX_PHOTO_BYTES = 25 * 1024 * 1024;
const DEFAULT_CROP: PhotoCrop = { zoom: 1, offsetX: 0, offsetY: 0 };
const EMPTY_FIELDS: PosterFields = {
  firstName: "",
  lastName: "",
  designation: "",
  company: "",
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    image.src = src;
  });
}

const subscribeToNothing = () => () => {};

function detectFileSharing() {
  try {
    const probe = new File([""], "poster.jpg", { type: "image/jpeg" });
    return (
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [probe] })
    );
  } catch {
    return false;
  }
}

function posterFileName(fields: PosterFields, templateId: string) {
  const nameSlug = [fields.firstName, fields.lastName]
    .join(" ")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `flutter-south-india-2026-${templateId}${nameSlug ? `-${nameSlug}` : ""}.jpg`;
}

export default function PosterGenerator({
  fontClassName,
  fontFamily,
}: PosterGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const photoUrlRef = useRef<string | null>(null);
  const templateImageRef = useRef<HTMLImageElement | null>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<PosterTemplate>(
    TEMPLATES[0],
  );
  const [fontsReady, setFontsReady] = useState(false);
  const [loadedTemplateId, setLoadedTemplateId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [crop, setCrop] = useState<PhotoCrop>(DEFAULT_CROP);
  const [fields, setFields] = useState<PosterFields>(EMPTY_FIELDS);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState<"download" | "share" | null>(null);
  const canShareFiles = useSyncExternalStore(
    subscribeToNothing,
    detectFileSharing,
    () => false,
  );
  const [dragOver, setDragOver] = useState(false);
  const templateReady =
    !selectedTemplate.templateSrc ||
    loadedTemplateId === selectedTemplate.id;

  // Load fonts (extend weights to support bold headings in new templates)
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      [400, 500, 600, 700, 800, 900].map((weight) =>
        document.fonts.load(`${weight} 64px ${fontFamily}`),
      ),
    )
      .catch(() => undefined)
      .finally(() => !cancelled && setFontsReady(true));
    return () => {
      cancelled = true;
    };
  }, [fontFamily]);

  // Load template PNG when the selected template changes (PNG-backed only)
  useEffect(() => {
    let cancelled = false;
    templateImageRef.current = null;

    if (selectedTemplate.templateSrc) {
      loadImage(selectedTemplate.templateSrc)
        .then((img) => {
          if (!cancelled) {
            templateImageRef.current = img;
            setLoadedTemplateId(selectedTemplate.id);
          }
        })
        .catch(() => {
          if (!cancelled)
            setError(
              "The poster template failed to load. Please refresh the page.",
            );
        });
    }

    return () => {
      cancelled = true;
    };
  }, [selectedTemplate]);

  // Redraw canvas whenever anything visual changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !templateReady || !fontsReady) return;
    selectedTemplate.draw(
      ctx,
      {
        photo,
        crop,
        fields,
        fontFamily,
        showPlaceholders: true,
        assets: {
          templateImage: templateImageRef.current,
        },
      },
      PREVIEW_SCALE,
    );
  }, [selectedTemplate, templateReady, fontsReady, photo, crop, fields, fontFamily]);

  // Revoke blob URL on unmount
  useEffect(() => {
    return () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    };
  }, []);

  const loadPhotoFile = useCallback(async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or WebP).");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError("That photo is over 25 MB. Please choose a smaller one.");
      return;
    }
    const url = URL.createObjectURL(file);
    try {
      const image = await loadImage(url);
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
      photoUrlRef.current = url;
      setPhoto(image);
      setPhotoName(file.name);
      setCrop(DEFAULT_CROP);
      setError("");
    } catch {
      URL.revokeObjectURL(url);
      setError("We couldn't read that image. Try a JPG or PNG instead.");
    }
  }, []);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    void loadPhotoFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragOver(false);
    void loadPhotoFile(event.dataTransfer.files?.[0]);
  };

  const updateField =
    (key: keyof PosterFields) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFields((current) => ({ ...current, [key]: event.target.value }));
    };

  const photoSlot = selectedTemplate.photoSlot;

  const moveCrop = (dx: number, dy: number) => {
    if (!photo) return;
    setCrop((current) =>
      clampCropForSlot(photo, photoSlot, {
        ...current,
        offsetX: current.offsetX + dx,
        offsetY: current.offsetY + dy,
      }),
    );
  };

  const toTemplateUnits = (canvas: HTMLCanvasElement) =>
    selectedTemplate.width / canvas.getBoundingClientRect().width;

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!photo) return;
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const units = toTemplateUnits(canvas);
    const x = (event.clientX - rect.left) * units;
    const y = (event.clientY - rect.top) * units;
    if (!isInPhotoSlot(photoSlot, x, y)) return;
    canvas.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const last = dragRef.current;
    if (!last) return;
    const units = toTemplateUnits(event.currentTarget);
    moveCrop(
      (event.clientX - last.x) * units,
      (event.clientY - last.y) * units,
    );
    dragRef.current = { x: event.clientX, y: event.clientY };
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const handleCanvasKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    const step = event.shiftKey ? 40 : 10;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    moveCrop(...move);
  };

  const handleZoom = (event: ChangeEvent<HTMLInputElement>) => {
    if (!photo) return;
    const zoom = Number(event.target.value);
    setCrop((current) =>
      clampCropForSlot(photo, photoSlot, { ...current, zoom }),
    );
  };

  const selectTemplate = (template: PosterTemplate) => {
    setSelectedTemplate(template);
    setLoadedTemplateId(null);
    setCrop(DEFAULT_CROP);
    setError("");
  };

  const renderPosterBlob = async () => {
    if (!templateReady) throw new Error("Template not ready");
    const canvas = document.createElement("canvas");
    canvas.width = selectedTemplate.width;
    canvas.height = selectedTemplate.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    selectedTemplate.draw(
      ctx,
      {
        photo,
        crop,
        fields,
        fontFamily,
        showPlaceholders: false,
        assets: {
          templateImage: templateImageRef.current,
        },
      },
      1,
    );
    return new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("JPEG encoding failed")),
        "image/jpeg",
        JPEG_QUALITY,
      ),
    );
  };

  const validate = () => {
    if (!photo) {
      setError("Add your photo to create the poster.");
      return false;
    }
    if (!fields.firstName.trim()) {
      setError("Add your first name to create the poster.");
      return false;
    }
    setError("");
    return true;
  };

  const handleDownload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setExporting("download");
    try {
      const blob = await renderPosterBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = posterFileName(fields, selectedTemplate.id);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      trackAttendingPosterExport({ export_method: "download" });
    } catch {
      setError(
        "Something went wrong while creating your poster. Please try again.",
      );
    } finally {
      setExporting(null);
    }
  };

  const handleShare = async () => {
    if (!validate()) return;
    setExporting("share");
    try {
      const blob = await renderPosterBlob();
      const file = new File([blob], posterFileName(fields, selectedTemplate.id), {
        type: "image/jpeg",
      });
      await navigator.share({
        files: [file],
        title: "I'm attending Flutter South India 2026",
        text: "I'm attending Flutter South India 2026 in Chennai on 10 October! #FlutterSouthIndia",
      });
      trackAttendingPosterExport({ export_method: "share" });
    } catch (shareError) {
      if ((shareError as DOMException)?.name !== "AbortError") {
        setError(
          "Sharing isn't available right now. Download the poster instead.",
        );
      }
    } finally {
      setExporting(null);
    }
  };

  const ready = fontsReady && templateReady;

  return (
    <div className={styles.page}>
      <span className={`${fontClassName} ${styles.fontWarmup}`} aria-hidden="true">
        Poster
      </span>

      <header className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <Link
            className={styles.brand}
            href="/"
            aria-label="Flutter South India 2026 home"
          >
            <Image
              src="/assets/fsi-logo.png"
              alt="Flutter South India 2026"
              width={680}
              height={252}
              priority
            />
          </Link>
          <Link className={styles.backLink} href="/">
            <ArrowLeft aria-hidden="true" size={16} />
            Back to event
          </Link>
        </div>
      </header>

      <main className={`container ${styles.main}`}>
        <div className={styles.intro}>
          <p className="eyebrow">FSI / 26 · Attendee poster</p>
          <h1>
            Tell everyone
            <span> you&apos;re attending.</span>
          </h1>
          <p>
            Add your photo and details to make your own poster, then share it
            on LinkedIn, X or Instagram with #FlutterSouthIndia.
          </p>
        </div>

        <div className={styles.workspace}>
          <figure className={styles.preview}>
            <div className={styles.canvasFrame}>
              <canvas
                ref={canvasRef}
                className={`${styles.canvas} ${photo ? styles.canvasDraggable : ""}`}
                width={selectedTemplate.width * PREVIEW_SCALE}
                height={selectedTemplate.height * PREVIEW_SCALE}
                role="img"
                aria-label="Live preview of your attendee poster"
                tabIndex={photo ? 0 : -1}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onKeyDown={handleCanvasKeyDown}
              />
              {!ready && (
                <div className={styles.canvasLoading}>
                  <LoaderCircle aria-hidden="true" className={styles.spin} />
                  Loading template…
                </div>
              )}
            </div>
            <figcaption>
              {photo ? (
                <>
                  <Move aria-hidden="true" size={15} />
                  Drag the photo (or use arrow keys) to reposition it.
                </>
              ) : (
                "Your poster updates as you type."
              )}
            </figcaption>
          </figure>

          <form className={styles.form} onSubmit={handleDownload} noValidate>
            {/* ── Template picker ── */}
            <div className={styles.field}>
              <span className={styles.label}>Template</span>
              <div className={styles.templatePicker}>
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.templateTab} ${
                      selectedTemplate.id === t.id ? styles.templateTabActive : ""
                    }`}
                    onClick={() => selectTemplate(t)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Photo upload ── */}
            <div className={styles.field}>
              <span className={styles.label}>
                Photo <em>required</em>
              </span>
              <label
                className={`${styles.dropzone} ${dragOver ? styles.dropzoneActive : ""}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                />
                <ImagePlus aria-hidden="true" size={22} />
                <span>
                  <strong>{photo ? "Change photo" : "Upload a photo"}</strong>
                  <small>
                    {photo
                      ? photoName
                      : "A square, front-facing photo works best"}
                  </small>
                </span>
              </label>
            </div>

            {photo && (
              <label className={styles.field}>
                <span className={styles.label}>Zoom</span>
                <input
                  className={styles.range}
                  type="range"
                  min={1}
                  max={MAX_ZOOM}
                  step={0.01}
                  value={crop.zoom}
                  onChange={handleZoom}
                />
              </label>
            )}

            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span className={styles.label}>
                  First name <em>required</em>
                </span>
                <input
                  className={styles.input}
                  type="text"
                  autoComplete="given-name"
                  maxLength={40}
                  value={fields.firstName}
                  onChange={updateField("firstName")}
                  placeholder="Priya"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Last name</span>
                <input
                  className={styles.input}
                  type="text"
                  autoComplete="family-name"
                  maxLength={40}
                  value={fields.lastName}
                  onChange={updateField("lastName")}
                  placeholder="Raman"
                />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Designation</span>
              <input
                className={styles.input}
                type="text"
                autoComplete="organization-title"
                maxLength={60}
                value={fields.designation}
                onChange={updateField("designation")}
                placeholder="Senior Flutter Developer"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Company</span>
              <input
                className={styles.input}
                type="text"
                autoComplete="organization"
                maxLength={60}
                value={fields.company}
                onChange={updateField("company")}
                placeholder="Your company or college"
              />
            </label>

            <p className={styles.error} role="alert">
              {error}
            </p>

            <div className={styles.actions}>
              <button
                className="button button-primary"
                type="submit"
                disabled={!ready || exporting !== null}
              >
                {exporting === "download" ? (
                  <LoaderCircle
                    aria-hidden="true"
                    size={17}
                    className={styles.spin}
                  />
                ) : (
                  <Download aria-hidden="true" size={17} />
                )}
                Download JPEG
              </button>
              {canShareFiles && (
                <button
                  className={`button ${styles.shareButton}`}
                  type="button"
                  onClick={handleShare}
                  disabled={!ready || exporting !== null}
                >
                  {exporting === "share" ? (
                    <LoaderCircle
                      aria-hidden="true"
                      size={17}
                      className={styles.spin}
                    />
                  ) : (
                    <Share2 aria-hidden="true" size={17} />
                  )}
                  Share
                </button>
              )}
            </div>

            <p className={styles.privacy}>
              Your poster is made in your browser. Your photo and details are
              never uploaded.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
