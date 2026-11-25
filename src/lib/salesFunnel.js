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
    key: "lead_magnet",
    number: "02",
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
    key: "traffic",
    number: "03",
    title: "Traffic",
    description: "Cold outreach and organic content. No paid ads.",
    items: [
      "Lead list source and criteria",
      "First message",
      "Follow up messages",
      "Daily send target",
      "Organic posting plan for Luke and Max",
    ],
  },
  {
    key: "action_funnel",
    number: "04",
    title: "Action Funnel",
    description: "The steps from interest to booked call.",
    items: [
      "Opt in page",
      "Authority video script",
      "Application form questions",
      "Calendar booking setup",
      "Call script",
    ],
  },
  {
    key: "close",
    number: "05",
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
    number: "06",
    title: "Follow Up",
    description: "For people who opted in but didn't book.",
    items: ["Email flow outline", "Number of emails and timing"],
  },
  {
    key: "proof",
    number: "07",
    title: "Proof",
    description: "Results that back up what we say.",
    items: ["Extern case study", "Other case studies to write"],
  },
];

export const sectionByKey = (key) => SECTIONS.find((s) => s.key === key);

export const byOrder = (list) => [...(list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));