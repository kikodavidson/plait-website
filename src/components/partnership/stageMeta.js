export const STAGES = {
  not_started: { label: "Not Started", tint: "rgba(107,107,107,0.10)", text: "#6b6b6b" },
  exploring: { label: "Exploring", tint: "rgba(44,90,168,0.12)", text: "#2c5aa8" },
  in_discussion: { label: "In Discussion", tint: "rgba(217,164,0,0.15)", text: "#8a6100" },
  draft: { label: "Draft", tint: "rgba(106,75,171,0.12)", text: "#6a4bab" },
  locked: { label: "Locked", tint: "rgba(97,158,128,0.18)", text: "#3d6b52" },
};

export const STAGE_DOTS = {
  not_started: "#9a9a9a",
  exploring: "#2c5aa8",
  in_discussion: "#d9a400",
  draft: "#6a4bab",
  locked: "#619e80",
};

export const STAGE_ORDER = ["not_started", "exploring", "in_discussion", "draft", "locked"];

export const TASK_STATUS = { todo: "To Do", in_progress: "In Progress", done: "Done" };

export const PARTNERS = ["Luke", "Max"];