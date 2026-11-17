export const ACCENT = "#C8FF3D";

export const PHASES = [
  { key: "finish_line", number: "01", label: "Finish line language" },
  { key: "pick_offer", number: "02", label: "Pick the free offer" },
  { key: "name_it", number: "03", label: "Name it" },
  { key: "build_funnel", number: "04", label: "Build the funnel" },
  { key: "close_follow_up", number: "05", label: "Close and follow up" },
];

export const STEPS = [
  { key: "traffic", label: "Traffic", blurb: "Where qualified attention comes from." },
  { key: "opt_in", label: "Opt in", blurb: "The page that trades the free offer for a lead." },
  { key: "authority", label: "Authority amplifier", blurb: "Proof the work is real before they apply." },
  { key: "application", label: "Application", blurb: "Qualifying questions that filter the room." },
  { key: "booking", label: "Calendar booking", blurb: "A time on the calendar, not a maybe." },
  { key: "call", label: "The call", blurb: "A warm conversation, not a pitch." },
];

export const STATUS = {
  not_started: { label: "Not started", dot: "#5A5C55", text: "#A9ACA2" },
  in_progress: { label: "In progress", dot: "#F0C64A", text: "#F0C64A" },
  done: { label: "Done", dot: ACCENT, text: ACCENT },
};

export const OWNERS = ["Luke", "Max", "Both"];

export const RULES = [
  "If they give us time now, they're more likely to give us money later.",
  "Only give the free offer to qualified leads.",
  "Don't solve the problem our paid offer solves. Solve the problem that leads to it.",
  "Sell the outcome, not the vehicle.",
];

export const FORMULAS = [
  { key: "A", title: "Number + outcome + time frame", hint: "3x booked calls in 30 days" },
  { key: "B", title: "How to (good thing) without (bad thing) even if (insecurity)", hint: "How to scale ads without burning cash even if you've never run Meta" },
  { key: "C", title: "The (adjective) (type) that (benefit)", hint: "The quiet audit that finds your leak" },
  { key: "D", title: "X mistakes that prevent (good thing)", hint: "7 mistakes that prevent profitable scaling" },
];

export const SEED_TASKS = [
  { phase: "finish_line", title: "List every service and deliverable we offer" },
  { phase: "finish_line", title: "Rewrite each one as the outcome the client gets" },
  { phase: "finish_line", title: "Write our core promise: steady conversions, consistent growth, peace of mind" },
  { phase: "finish_line", title: "Answer: how is our ideal client's life different after working with us?" },
  { phase: "pick_offer", title: "Decide the lead magnet: free ad account audit for qualified leads" },
  { phase: "pick_offer", title: "Decide the backup for unqualified leads: video teardown or checklist" },
  { phase: "pick_offer", title: "Define what the audit reveals and what it does NOT fix" },
  { phase: "pick_offer", title: "Write qualification rules (monthly ad spend, decision maker, timeline)" },
  { phase: "name_it", title: "Write name options for each formula" },
  { phase: "name_it", title: "Text options to 20 ideal clients or run a small ad test" },
  { phase: "name_it", title: "Pick the winner" },
  { phase: "build_funnel", title: "Traffic source plan", funnel_step: "traffic" },
  { phase: "build_funnel", title: "Opt in page", funnel_step: "opt_in" },
  { phase: "build_funnel", title: "Authority amplifier (case study or results page)", funnel_step: "authority" },
  { phase: "build_funnel", title: "Application form with qualifying questions", funnel_step: "application" },
  { phase: "build_funnel", title: "Calendar booking", funnel_step: "booking" },
  { phase: "build_funnel", title: "Call script for a warm conversation", funnel_step: "call" },
  { phase: "close_follow_up", title: "Write CTAs: clear CTA, exact next action, reason to act now" },
  { phase: "close_follow_up", title: "Set capacity scarcity line (new clients per month)" },
  { phase: "close_follow_up", title: "Build follow up email sequence after the free offer is delivered" },
];

export const SEED_FEATURE = {
  what_we_do: "Ad account audit",
  what_they_get: "You know exactly where your money is leaking",
  why_they_care: "You stop wasting budget and know what to fix first.",
};

export const WORKSPACE = "partnership";

export const byOrder = (list) => [...(list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

export const scoreOf = (idea) => (idea.votes_luke || 0) + (idea.votes_max || 0);