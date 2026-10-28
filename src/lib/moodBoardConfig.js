/** Mood board structure: the four stacked sections and vote-status helpers. */
export const SECTIONS = [
  {
    level: "mood",
    title: "MOOD",
    desc: "How it feels — imagery, filters, textures, lighting.",
    sub: "Imagery",
  },
  {
    level: "identity",
    title: "IDENTITY",
    desc: "How it looks — fonts, colors, logos.",
    sub: "Fonts",
  },
  {
    level: "brands",
    title: "BRANDS WE ADMIRE",
    desc: "Who we want to learn from — and what we are NOT.",
    sub: "Brands We Love",
  },
  {
    level: "tech",
    title: "TECH",
    desc: "How we show our work — dashboards, reporting, site UI.",
    sub: "Dashboards and Reporting",
  },
];

/** Sub section used for the NOT US row inside BRANDS WE ADMIRE. */
export const ANTI_SUB = "Anti Board";

/** Sample text rendered when a font name is set on an identity image. */
export const SAMPLE_TEXT = "Riptide / Milestone / Click Together";

/** Vote status: both (both love), cut (both cut — hidden from the board), split, none. */
export function voteStatus(item) {
  const l = item.vote_luke;
  const m = item.vote_max;
  if (l === "love" && m === "love") return "both";
  if (l === "cut" && m === "cut") return "cut";
  if (!l && !m) return "none";
  return "split";
}