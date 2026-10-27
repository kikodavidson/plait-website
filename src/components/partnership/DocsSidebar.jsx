import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Clock,
  Folder,
  HelpCircle,
  Home,
  ListTodo,
  Palette,
  Pencil,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { STAGES } from "./stageMeta";
import { notContacted } from "./leads/leadMeta";

const DOT = {
  not_started: "#9a9a9a",
  exploring: "#2c5aa8",
  in_discussion: "#d9a400",
  draft: "#6a4bab",
  locked: "#619e80",
};

function NavItem({ icon: Icon, label, active, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[14px] transition-colors ${
        active
          ? "bg-[#eef5f1] font-semibold text-[#3d6b52]"
          : "text-[#3a3a3a] hover:bg-[#f5f3f0]"
      }`}
    >
      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#619e80]" : "text-[#9a9a9a]"}`} />
      <span className="flex-1 text-left">{label}</span>
      {count > 0 && (
        <span className="rounded-full bg-[#e8f2ec] px-1.5 py-0.5 text-[11px] font-semibold text-[#3d6b52]">
          {count}
        </span>
      )}
    </button>
  );
}

function TabsManager({ open, onClose, data }) {
  const [name, setName] = useState("");
  if (!open) return null;

  const add = async () => {
    const n = name.trim();
    if (!n) return;
    await data.addTab(n);
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px]">Edit tabs</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#9a9a9a] hover:bg-[#f4f2ef] hover:text-[#1a1a1a]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 space-y-1.5">
          {data.tabs.map((t, i) => (
            <div key={t.id} className="flex items-center gap-1.5">
              <button
                disabled={i === 0}
                onClick={() => data.moveTab(t.id, -1)}
                className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
                aria-label="Move tab up"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                disabled={i === data.tabs.length - 1}
                onClick={() => data.moveTab(t.id, 1)}
                className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
                aria-label="Move tab down"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <input
                defaultValue={t.name}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v && v !== t.name) data.renameTab(t.id, v);
                }}
                className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] px-3 py-1.5 text-[14px] outline-none focus:border-[#619e80]"
              />
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${t.name}" and everything in it?`)) data.deleteTab(t.id);
                }}
                className="rounded-md p-1.5 text-[#9a9a9a] hover:bg-[#fdece8] hover:text-[#b0532f]"
                aria-label="Delete tab"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="New tab name"
            className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] px-3 py-1.5 text-[14px] outline-none focus:border-[#619e80]"
          />
          <button
            onClick={add}
            className="rounded-full bg-[#619e80] px-4 py-1.5 text-[13px] font-semibold text-white hover:opacity-90"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Docs-style sidebar for Partnership HQ: overview and timeline up top, each
 * tab as a collapsible group listing its sections (stage dot + open-question
 * badge), and open questions / files / tab management at the bottom.
 */
export default function DocsSidebar({
  data,
  view,
  activeSectionId,
  onSelectView,
  onSelectSection,
  onClose,
}) {
  const [collapsed, setCollapsed] = useState({});
  const [manageOpen, setManageOpen] = useState(false);

  const openQuestions = (sectionId) =>
    data.questions.filter((q) => q.section_id === sectionId && !q.resolved).length;
  const totalOpen = data.questions.filter((q) => !q.resolved).length;
  const openTasks = data.tasks.filter((t) => t.status !== "done").length;

  const pickView = (v) => {
    onSelectView(v);
    if (onClose) onClose();
  };
  const pickSection = (id) => {
    onSelectSection(id);
    if (onClose) onClose();
  };
  const addSection = async (tab) => {
    const created = await data.addSection(tab.id, "New section");
    if (created) pickSection(created.id);
  };

  return (
    <div className="text-[#1a1a1a]">
      <nav className="space-y-0.5">
        <NavItem icon={Home} label="Overview" active={view === "overview"} onClick={() => pickView("overview")} />
        <NavItem icon={Clock} label="Timeline" active={view === "timeline"} onClick={() => pickView("timeline")} />
        <NavItem
          icon={Users}
          label="Leads"
          count={data.leads.filter(notContacted).length}
          active={view === "leads"}
          onClick={() => pickView("leads")}
        />
        <NavItem
          icon={Palette}
          label="Brand Vibe Board"
          active={view === "vibe"}
          onClick={() => pickView("vibe")}
        />
      </nav>

      <div className="my-3 border-t border-[#efece8]" />

      <nav className="space-y-0.5">
        {data.tabs.map((tab) => {
          const secs = data.sections.filter((s) => s.tab_id === tab.id);
          const isCollapsed = !!collapsed[tab.id];
          return (
            <div key={tab.id}>
              <button
                onClick={() => setCollapsed((c) => ({ ...c, [tab.id]: !c[tab.id] }))}
                className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[14px] font-semibold text-[#3a3a3a] transition-colors hover:bg-[#f5f3f0]"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#9a9a9a]" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#9a9a9a]" />
                )}
                <span className="truncate">{tab.name}</span>
              </button>
              {!isCollapsed && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#efece8] pl-2">
                  {secs.map((s) => {
                    const qn = openQuestions(s.id);
                    const active = view === "section" && activeSectionId === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => pickSection(s.id)}
                        title={`${s.name} · ${STAGES[s.stage]?.label || ""}`}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13.5px] transition-colors ${
                          active
                            ? "bg-[#eef5f1] font-semibold text-[#3d6b52]"
                            : "text-[#3a3a3a] hover:bg-[#f5f3f0]"
                        }`}
                      >
                        <span
                          className="h-[7px] w-[7px] shrink-0 rounded-full"
                          style={{ backgroundColor: DOT[s.stage] || DOT.not_started }}
                        />
                        <span className="flex-1 truncate text-left">{s.name}</span>
                        {qn > 0 && (
                          <span className="rounded-full bg-[#fdf3d7] px-1.5 py-0.5 text-[11px] font-semibold text-[#8a6100]">
                            {qn}
                          </span>
                        )}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => addSection(tab)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] text-[#9a9a9a] transition-colors hover:bg-[#f5f3f0] hover:text-[#6b6b6b]"
                  >
                    <Plus className="h-3.5 w-3.5" /> New section
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="my-3 border-t border-[#efece8]" />

      <nav className="space-y-0.5">
        <NavItem
          icon={HelpCircle}
          label="Open questions"
          count={totalOpen}
          active={view === "agenda"}
          onClick={() => pickView("agenda")}
        />
        <NavItem icon={Folder} label="Files" active={view === "files"} onClick={() => pickView("files")} />
        <NavItem
          icon={ListTodo}
          label="Outstanding tasks"
          count={openTasks}
          active={view === "tasks"}
          onClick={() => pickView("tasks")}
        />
        <button
          onClick={() => setManageOpen(true)}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] text-[#9a9a9a] transition-colors hover:bg-[#f5f3f0] hover:text-[#6b6b6b]"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit tabs
        </button>
      </nav>

      <TabsManager open={manageOpen} onClose={() => setManageOpen(false)} data={data} />
    </div>
  );
}