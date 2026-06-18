// The Studio - content model. Ported verbatim from the prototype's data.jsx.
// Drives the landing + each case study. Images live in src/assets/images and
// are emitted as resized WebP at build time; img() maps the prototype's
// "/images/<p>" paths (and "/sound-room.png") to the optimised URLs.
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const sources = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/**/*.{jpg,jpeg,png}",
  { eager: true },
);

const lookup = (p: string): ImageMetadata => {
  const mod = sources[`../assets/images${p.replace(/^\/images/, "")}`];
  if (!mod) throw new Error(`studio.ts: missing image ${p}`);
  return mod.default;
};

// WebP quality. Astro's default (~80) shows visible compression on the
// gradients and skin tones that fill most of these frames, brutal on a large
// 4K display; 88 is clean at a modest size cost - worth it for a photography
// portfolio.
const QUALITY = 88;

// Width ladder for responsive srcsets. Each entry below a source's native
// width is emitted; the source width caps it - we never upscale past the plate.
const LADDER = [640, 960, 1280, 1600, 1920, 2560, 3840];

// Render-time only (component/page frontmatter) - the image service isn't
// available during module evaluation, so these must not run at top level.

// Single optimised URL - for small or heavily-filtered decorative uses where a
// full srcset is overkill.
export const img = async (p: string, width = 1600): Promise<string> => {
  const src = lookup(p);
  return (
    await getImage({
      src,
      width: Math.min(width, src.width),
      format: "webp",
      quality: QUALITY,
    })
  ).src;
};

export interface ResponsiveImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

// Responsive variant - emits a srcset capped at the source width so 4K / hi-DPI
// displays pull the sharpest frame the plate allows and smaller screens don't
// overpay. Pair with a `sizes` attribute at the call site (the components
// default to full-bleed).
export const imgSet = async (p: string): Promise<ResponsiveImage> => {
  const src = lookup(p);
  const cap = src.width;
  const widths = [...new Set([...LADDER.filter((w) => w < cap), cap])].sort(
    (a, b) => a - b,
  );
  const r = await getImage({ src, widths, format: "webp", quality: QUALITY });
  return {
    src: r.src,
    srcset: r.srcSet.attribute,
    width: cap,
    height: Math.round((cap * src.height) / src.width),
  };
};

// Visual filter constants - simulate "log/ungraded" via CSS so we can show
// before/after without real raw plates. Replace with real log frames in
// production.
export const BEFORE_FILTER =
  "contrast(0.78) saturate(0.42) brightness(1.04) hue-rotate(-2deg)";
export const AFTER_FILTER = "brightness(0.92)";

export interface Film {
  slug: string;
  title: string;
  year: string;
  kind: string;
  director: string;
  studioRole: string;
  studioMeta: string;
  /** Internal case-study route. */
  href: string;
  hero: string;
  stills: string[];
  capture: string;
  deliverables: string[];
  days: string;
  note: string;
}

// Each project carries: identity, the studio's role, and case-study copy.
export const FILMS: Film[] = [
  {
    slug: "skin",
    title: "SKIN",
    year: "2025",
    kind: "Short film",
    director: "Sarah Grant",
    studioRole: "Colour, DI",
    studioMeta: "ACES · Rec.709",
    href: "/skin",
    hero: "/images/skin/3.jpg",
    stills: [
      "/images/skin/1.jpg",
      "/images/skin/2.jpg",
      "/images/skin/5.jpg",
      "/images/skin/6.jpg",
    ],
    // Camera/lens context - borrowed from the DoP page, framed differently
    capture: "Sony Venice · Vespid Primes · Mir-1V 37mm",
    deliverables: ["DCP master (festivals)", "Rec.709 4K"],
    days: "Graded over 4 days",
    note: "Sarah wanted SKIN to feel warm and nostalgic - a stark contrast towards the themes of the film. The grade leans into warm shadows and cool highlights with very little saturation push. We built a base look and rode it from there, frame-by-frame on the close-ups.",
  },
  {
    slug: "feeble",
    title: "FEEBLE",
    year: "2025",
    kind: "Music video",
    director: "Michael Kearney",
    studioRole: "Colour, Online",
    studioMeta: "Custom LUT · 2 days",
    href: "/feeble",
    hero: "/images/feeble/1.jpg",
    stills: ["/images/feeble/2.jpg", "/images/feeble/4.jpg", "/images/feeble/5.jpg"],
    capture: "Sony Venice · DZO Vespid + Helios 44-2",
    deliverables: ["YouTube master", "Instagram cuts"],
    days: "Graded over 2 days",
    note: "Heavy saturation pull on the reds, lifted blacks, and a film-emulation soft-clip on highlights. The look references late-70s rock photography - dense, slightly degraded, never clean.",
  },
  {
    slug: "downtown",
    title: "Downtown Lights",
    year: "2023",
    kind: "Live set",
    director: "Michael Roddy",
    studioRole: "Edit, Colour",
    studioMeta: "Online Master, Social cuts",
    href: "/downtown",
    hero: "/images/downtown/1.hd.jpg",
    stills: [
      "/images/downtown/3.hd.jpg",
      "/images/downtown/5.hd.jpg",
      "/images/downtown/6.hd.jpg",
    ],
    capture: "Sony Venice + Ursa Mini · Kowa B&H 2x Anamorphic",
    deliverables: ["Online master", "Social Cuts"],
    days: "Edit + colour",
    note: "Two cameras, live performance, no second takes. The grade had to match between Venice and Ursa, anamorphic to spherical, and hold the stage lighting without crushing the band.",
  },
  {
    slug: "sneaker",
    title: "SNEAKER",
    year: "2026",
    kind: "Short film",
    director: "Christopher Dudley",
    studioRole: "Colour, DI, Dub",
    studioMeta: "Anamorphic · 4K finish",
    href: "/sneaker",
    hero: "/images/sneaker/1.hd.jpg",
    stills: [
      "/images/sneaker/3.hd.jpg",
      "/images/sneaker/5.hd.jpg",
      "/images/sneaker/8.hd.jpg",
    ],
    capture: "Sony Venice · Kowa B&H Anamorphic + Vespid 75/100mm",
    deliverables: ["4K DCP", "Rec.709 1080p"],
    days: "Graded over 5 days",
    note: "Anamorphic flares are doing most of the work - the grade stays underneath them, lifting only what needs to read. Cool shadow rolloff, warm midtones, online and a bit of corrupted card recovery along the way",
  },
];

export const getFilm = (slug: string): Film | undefined =>
  FILMS.find((f) => f.slug === slug);

// Sound credits - separate from the per-film case studies because the
// studio also mixes work it didn't shoot.
export const SOUND_RECENT = {
  mix: ["SNEAKER (2026)",  "The Party Line (2022)"]
};

export interface Tool {
  slug: string;
  name: string;
  status: string;
  desc: string;
  /** External source link (GitHub), shown with a ↗. Null when private. */
  link: string | null;
  /** Internal detail page on this site, if the tool has one. */
  href?: string | null;
}

// Tools - short list for the landing footer block.
export const TOOLS: Tool[] = [
  {
    slug: "dailies-pipeline",
    name: "The dailies pipeline",
    status: "In development",
    desc: "Raw footage in, a searchable library out. Transcripts, slate metadata, face occurrences, focus timelines, visual tags - across six years of accumulated shoots.",
    link: null,
    href: "/tools/dailies-pipeline",
  },
  {
    slug: "h4n-timesync",
    name: "h4n-timesync",
    status: "Released",
    desc: "Sync a Deity TC-1-locked Zoom H4N to LTC via the mic input. A weekend's worth of code that fixed a recurring on-set problem.",
    link: "https://github.com/imlach/h4n-timesync",
  },
];
