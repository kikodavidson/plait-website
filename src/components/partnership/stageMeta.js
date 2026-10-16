export const STAGES = {
  not_started: { label: "Not Started", pill: "bg-[#f0efec] text-[#6b6b6b]" },
  exploring: { label: "Exploring", pill: "bg-[#e7eefb] text-[#2c5aa8]" },
  in_discussion: { label: "In Discussion", pill: "bg-[#fdf3d7] text-[#8a6100]" },
  draft: { label: "Draft", pill: "bg-[#eee9f7] text-[#6a4bab]" },
  locked: { label: "Locked", pill: "bg-[#e8f2ec] text-[#3d6b52]" },
};

export const STAGE_ORDER = ["not_started", "exploring", "in_discussion", "draft", "locked"];

export const TASK_STATUS = { todo: "To Do", in_progress: "In Progress", done: "Done" };

export const PARTNERS = ["Luke", "Max"];