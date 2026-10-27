export const PHASES = [
  {
    key: "foundation",
    label: "Foundation",
    blurb: "Start from the feeling — what our agency should be, in words.",
  },
  {
    key: "collect",
    label: "Collect",
    blurb: "Gather links, images, and references that carry the vibe.",
  },
  {
    key: "directions",
    label: "Directions",
    blurb: "Shape two or three named directions from the collection.",
  },
  {
    key: "pick",
    label: "Pick",
    blurb: "Vote, then commit to one direction together.",
  },
  {
    key: "build",
    label: "Build Out",
    blurb: "Turn the direction into colors and fonts.",
  },
  {
    key: "lock",
    label: "Lock",
    blurb: "Review everything and lock the identity in.",
  },
];

export const PHASE_MAP = Object.fromEntries(PHASES.map((p, i) => [p.key, { ...p, index: i }]));

/** A phase is complete when both partners have checked off. */
export const phaseDone = (p) => !!(p && p.luke_done && p.max_done);

export const VOTE_OPTIONS = [
  { value: "love", label: "Love", icon: "heart" },
  { value: "maybe", label: "Maybe", icon: "minus" },
  { value: "no", label: "No", icon: "x" },
];