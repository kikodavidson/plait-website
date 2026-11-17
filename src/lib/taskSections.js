// Page sections, and which action-plan task each one is the content for.
// A task with a `task` title gets a jump link to that section; the section
// shows the checklist item and its status right in its header.
export const SECTIONS = [
  { id: "action-plan", label: "Action plan" },
  { id: "services", label: "Services", task: "List every service and deliverable we offer" },
  { id: "feature-benefit", label: "Feature to benefit", task: "Rewrite each one as the outcome the client gets" },
  { id: "name-tester", label: "Name tester", task: "Write name options for each formula" },
  { id: "funnel-map", label: "Funnel map", task: "Traffic source plan" },
  { id: "rules", label: "Rules" },
];

export const sectionForTask = (title) => SECTIONS.find((s) => s.task === title);

export const nextStatus = { not_started: "in_progress", in_progress: "done", done: "not_started" };

export const jumpToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};