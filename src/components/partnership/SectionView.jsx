import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronRight,
  History,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";
import StagePill from "./StagePill";
import SectionContent from "./SectionContent";
import ReopenControl from "./ReopenControl";
import VersionHistory from "./VersionHistory";

function Avatar({ name, approved }) {
  return (
    <span className="relative inline-flex">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
          approved ? "bg-[#619e80] text-white" : "border border-[#dcd5c9] bg-white text-[#9a9a9a]"
        }`}
      >
        {name[0]}
      </span>
      {approved && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#3d6b52] text-white">
          <Check className="h-2 w-2" />
        </span>
      )}
    </span>
  );
}

/**
 * Docs-style single-section page: breadcrumb, big title, meta row (stage,
 * approval avatars, history link), editable content and the approve controls.
 */
export default function SectionView({ section, tabName, data, userName, onDeleted }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState("");

  const locked = section.stage === "locked";
  const myKey = userName === "Luke" ? "approved_luke" : userName === "Max" ? "approved_max" : null;
  const myApproved = myKey ? !!section[myKey] : false;
  const otherKey = myKey === "approved_luke" ? "approved_max" : "approved_luke";
  const otherApproved = !!section[otherKey];
  const waitingOnMe = !locked && myKey && !myApproved && otherApproved;

  const partners = [
    { name: "Luke", approved: !!section.approved_luke },
    { name: "Max", approved: !!section.approved_max },
  ];
  const status = locked
    ? "Locked by both"
    : partners.some((p) => p.approved)
      ? `Waiting on ${partners.find((p) => !p.approved).name}`
      : "No approvals yet";

  const commitRename = () => {
    const v = draft.trim();
    if (v && v !== section.name) data.renameSection(section.id, v);
    setRenaming(false);
  };

  return (
    <div>
      <p className="flex items-center gap-1 text-[13px] text-[#9a9a9a]">
        <span>{tabName}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#6b6b6b]">{section.name}</span>
      </p>

      <div className="mt-2 flex items-start justify-between gap-3">
        {renaming ? (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            onBlur={commitRename}
            autoFocus
            className="w-full rounded-lg border border-[#dcd5c9] px-3 py-1.5 text-[28px] leading-tight outline-none focus:border-[#619e80]"
          />
        ) : (
          <h1 className="text-[30px] leading-tight sm:text-[34px]">{section.name}</h1>
        )}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full p-1.5 text-[#9a9a9a] transition-colors hover:bg-[#f4f2ef] hover:text-[#1a1a1a]"
            aria-label="Section options"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-1 w-48 rounded-xl border border-[#e5e2dc] bg-white p-1.5 shadow-lg">
                <button
                  onClick={() => {
                    setDraft(section.name);
                    setRenaming(true);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[14px] hover:bg-[#faf9f7]"
                >
                  <Pencil className="h-3.5 w-3.5" /> Rename
                </button>
                <button
                  onClick={() => {
                    data.moveSection(section.id, -1);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[14px] hover:bg-[#faf9f7]"
                >
                  <ArrowUp className="h-3.5 w-3.5" /> Move up
                </button>
                <button
                  onClick={() => {
                    data.moveSection(section.id, 1);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[14px] hover:bg-[#faf9f7]"
                >
                  <ArrowDown className="h-3.5 w-3.5" /> Move down
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${section.name}" and everything in it?`)) {
                      setMenuOpen(false);
                      data.deleteSection(section.id);
                      if (onDeleted) onDeleted();
                    }
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[14px] text-[#b0532f] hover:bg-[#fdece8]"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 border-b border-[#efece8] pb-4">
        <StagePill section={section} onSet={(st) => data.setStage(section.id, st)} />
        <div className="flex items-center gap-3">
          {partners.map((p) => (
            <span key={p.name} className="flex items-center gap-1" title={p.name}>
              <Avatar name={p.name} approved={p.approved} />
              <span className={`text-[12px] ${p.approved ? "text-[#3d6b52]" : "text-[#9a9a9a]"}`}>
                {p.name}
              </span>
            </span>
          ))}
        </div>
        <span
          className={`text-[12px] ${
            locked ? "font-semibold text-[#3d6b52]" : waitingOnMe ? "text-[#8a6100]" : "text-[#9a9a9a]"
          }`}
        >
          {status}
        </span>
        <button
          onClick={() => setHistoryOpen((h) => !h)}
          className="ml-auto inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
        >
          <History className="h-3.5 w-3.5" /> History
        </button>
      </div>

      <SectionContent section={section} data={data} />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {locked && <ReopenControl section={section} data={data} />}
        {!locked && myKey && !myApproved && (
          <button
            onClick={() => data.approve(section.id, userName)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#619e80] px-4 py-2 text-[14px] font-semibold text-white hover:opacity-90"
          >
            <Check className="h-4 w-4" /> {waitingOnMe ? "Approve and lock" : "Approve"}
          </button>
        )}
        {!locked && myKey && myApproved && (
          <button
            onClick={() => data.unapprove(section.id, userName)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] transition-colors hover:border-[#b0532f] hover:text-[#b0532f]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Withdraw approval
          </button>
        )}
      </div>

      {historyOpen && (
        <div className="mt-4">
          <VersionHistory versions={data.versions.filter((v) => v.section_id === section.id)} />
        </div>
      )}
    </div>
  );
}