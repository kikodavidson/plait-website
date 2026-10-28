/** Mood board structure: levels, their sub sections, and vote-status helpers. */
export const LEVELS = {
  mood: {
    label: "Mood",
    question: "How it feels",
    subs: ["Imagery", "Filters and Color Grading", "Textures", "Lighting"],
  },
  identity: {
    label: "Identity",
    question: "How it looks",
    subs: ["Fonts", "Color Palettes", "Logos and Wordmarks"],
  },
  brands: {
    label: "Brands We Admire",
    question: "Who we want to be like (and not)",
    subs: ["Brands We Love", "Anti Board"],
  },
  tech: {
    label: "Tech",
    question: "How we show our work",
    subs: ["Dashboards and Reporting", "Website UI", "Product and App Interfaces"],
  },
};

export const LEVEL_ORDER = ["mood", "identity", "brands", "tech"];

export const ALL_SUBS = LEVEL_ORDER.flatMap((id) => LEVELS[id].subs);

/** Vote status: both (both love), cut (both cut), split (disagree or partial), none. */
export function voteStatus(item) {
  const l = item.vote_luke;
  const m = item.vote_max;
  if (l === "love" && m === "love") return "both";
  if (l === "cut" && m === "cut") return "cut";
  if (!l && !m) return "none";
  return "split";
}

export const STATUS_LABEL = {
  both: "Both Love",
  cut: "Cut",
  split: "Split",
  none: "No votes yet",
};