export const ACCENT = "#619e80";
export const WORKSPACE = "partnership";

export const STATUS = {
  not_started: { label: "Not Started", dot: "#c9c4bb", text: "#9a9a9a" },
  in_progress: { label: "In Progress", dot: "#e0a92e", text: "#a3781a" },
  done: { label: "Done", dot: ACCENT, text: "#3d6b52" },
};

export const OWNERS = ["Luke", "Max", "Both"];

export const SECTIONS = [
  {
    key: "our_message",
    number: "01",
    title: "Our Message",
    description: "If this is weak, everything after it is weak.",
    items: [
      "Finish line",
      "Feature to benefit list",
      "Ideal client and spend floor",
    ],
  },
  {
    key: "traffic",
    number: "02",
    title: "Traffic",
    description: "How we get in front of people.",
    items: ["Ways to get traffic"],
  },
  {
    key: "lead_magnet",
    number: "03",
    title: "Lead Magnet",
    description: "What we give away for free to start the conversation.",
    items: [
      "Type",
      "How we deliver it",
      "What we show vs what we hold back",
      "Name options",
      "Winning name",
      "Who qualifies for the teardown",
    ],
  },
  {
    key: "close",
    number: "04",
    title: "The Close",
    description: "Clear ask, exact next step, reason to act now.",
    items: [
      "Main CTA",
      "Next step wording",
      "Reason to act now",
      "Where CTAs appear",
    ],
  },
  {
    key: "follow_up",
    number: "05",
    title: "Follow Up",
    description: "For people who opted in but didn't book.",
    items: ["Email flow and timing"],
  },
  {
    key: "proof",
    number: "06",
    title: "Proof",
    description: "Results that back up what we say.",
    items: [],
  },
];

export const sectionByKey = (key) => SECTIONS.find((s) => s.key === key);

export const byOrder = (list) => [...(list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));