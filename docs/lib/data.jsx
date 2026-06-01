// Films + studio data. One file, drives the landing + each case study.

// Visual filter constants — simulate "log/ungraded" via CSS so we can show
// before/after without real raw plates. Replace src with real log frames
// in production.
window.BEFORE_FILTER = "contrast(0.78) saturate(0.42) brightness(1.04) hue-rotate(-2deg)";
window.AFTER_FILTER  = "brightness(0.92)";

// Each project carries: identity, the studio's role, and case-study copy.
// Stills referenced relative to /studio/, so images/... walks up one level.
window.FILMS = [
  {
    slug: "skin",
    title: "SKIN",
    year: "2025",
    kind: "Short film",
    director: "Sarah Grant",
    studioRole: "Colour, DI",
    studioMeta: "ACES · Rec.709 + HDR",
    href: "skin.html",
    hero: "images/skin/3.jpg",
    stills: [
      "images/skin/1.jpg",
      "images/skin/2.jpg",
      "images/skin/5.jpg",
      "images/skin/6.jpg",
    ],
    // Camera/lens context — borrowed from the DoP page, framed differently
    capture: "Sony Venice · Vespid Primes · Mir-1V 37mm",
    deliverables: ["DCP master (festivals)", "Rec.709 1080p", "HDR10 1000-nit"],
    days: "Graded over 4 days",
    note: "Sarah wanted SKIN to feel skin-warm but never bronzed — honest about light direction, never decorative. The grade leans into warm shadows and cool highlights with very little saturation push. We built a base look in CDL space and rode it from there, frame-by-frame on the close-ups.",
  },
  {
    slug: "feeble",
    title: "FEEBLE",
    year: "2025",
    kind: "Music video",
    director: "Michael Kearney",
    studioRole: "Colour, Online",
    studioMeta: "Custom LUT · 2 days",
    href: "#",
    hero: "images/feeble/1.jpg",
    stills: [
      "images/feeble/2.jpg",
      "images/feeble/4.jpg",
      "images/feeble/5.jpg",
    ],
    capture: "Sony Venice · DZO Vespid + Helios 44-2",
    deliverables: ["YouTube master", "Instagram cuts"],
    days: "Graded over 2 days",
    note: "Heavy saturation pull on the reds, lifted blacks, and a film-emulation soft-clip on highlights. The look references late-70s rock photography — dense, slightly degraded, never clean.",
  },
  {
    slug: "downtown",
    title: "Downtown Lights",
    year: "2023",
    kind: "Live set",
    director: "Michael Roddy",
    studioRole: "Edit, Colour",
    studioMeta: "6 reels · DCP master",
    href: "#",
    hero: "images/downtown/1.hd.jpg",
    stills: [
      "images/downtown/3.hd.jpg",
      "images/downtown/5.hd.jpg",
      "images/downtown/6.hd.jpg",
    ],
    capture: "Sony Venice + Ursa Mini · Kowa B&H 2x Anamorphic",
    deliverables: ["DCP master", "Stereo + 5.1 stems"],
    days: "Edit + colour over 12 days",
    note: "Two cameras, live performance, no second takes. The grade had to match between Venice and Ursa, anamorphic to spherical, and hold the stage lighting without crushing the band.",
  },
  {
    slug: "sneaker",
    title: "SNEAKER",
    year: "2024",
    kind: "Short film",
    director: "Christopher Dudley",
    studioRole: "Colour, DI",
    studioMeta: "Anamorphic · 4K finish",
    href: "#",
    hero: "images/sneaker/1.hd.jpg",
    stills: [
      "images/sneaker/3.hd.jpg",
      "images/sneaker/5.hd.jpg",
      "images/sneaker/8.hd.jpg",
    ],
    capture: "Sony Venice · Kowa B&H Anamorphic + Vespid 75/100mm",
    deliverables: ["4K DCP", "Rec.709 1080p"],
    days: "Graded over 5 days",
    note: "Anamorphic flares are doing most of the work — the grade stays underneath them, lifting only what needs to read. Cool shadow rolloff, warm midtones, a single ungraded reference still pinned to the desktop for every session.",
  },
];

window.getFilm = (slug) => window.FILMS.find(f => f.slug === slug);

// Sound credits — separate from the per-film case studies because the
// studio also mixes work it didn't shoot.
window.SOUND_RECENT = {
  mix: ["FEEBLE (2025)", "Downtown Lights (2023)", "The Party Line (2022)"],
  dialogue: ["SKIN (2025)", "By Now (2023)"],
};

// Tools — short list for the landing footer block.
window.TOOLS = [
  {
    slug: "dailies-pipeline",
    name: "The dailies pipeline",
    status: "In development",
    desc: "Raw footage in, a searchable library out. Transcripts, slate metadata, face occurrences, focus timelines, visual tags — across six years of accumulated shoots.",
    link: null,
  },
  {
    slug: "h4n-timesync",
    name: "h4n-timesync",
    status: "Released",
    desc: "Sync a Deity TC-1-locked Zoom H4N to LTC via the mic input. A weekend's worth of code that fixed a recurring on-set problem.",
    link: "https://github.com/imlach/h4n-timesync",
  },
];
