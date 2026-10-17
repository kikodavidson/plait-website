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
import SectionStepper from "./SectionStepper";
import PartnerAvatars from "./PartnerAvatars";
import FinalVersionBlock from "./FinalVersionBlock";
import GuidedEmptyState from "./GuidedEmptyState";
import IdeaBoard from "./IdeaBoard";
import SectionPanel from "./SectionPanel";
import ReopenControl from "./ReopenControl";
import VersionHistory from "./VersionHistory";
import { ACCENT, ACCENT_TEXT } from "./accent";

/**
 * Section page inside the rounded panel: main column (breadcrumb, title,
 * stepper, approvals, final version, ideas) plus a side panel with the
 * section's Log, Tasks and Questions.
 */
export default function SectionView({ section, tabName, data, userName, user, onDeleted }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);

  const locked = section.stage === "locked";
  const hasContent = !!(section.content || "").trim();
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
  const ideas = data.ideas.filter((i) => i.section_id === section.id);

  const commitRename = () => {
    const v = draft.trim();
    if (v && v !== section.name) data.renameSection(section.id, v);
    setRenaming(false);
  };

  return (
    <div key={section.id} className="fade-in flex flex-col gap-8 xl:flex-row">
      <div className="min-w-0 flex-1">
        {/* Breadcrumb + section options */}
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-1 text-[13px] text-[#9a9a9a]">
            <span>{tabName}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#6b6b6b]">{section.name}</span>
          </p>
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

        {/* Title */}
        {renaming ? (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            onBlur={commitRename}
            autoFocus
            className="mt-2 w-full rounded-lg border border-[#dcd5c9] px-3 py-1.5 text-[28px] leading-tight outline-none focus:border-[#2d6a4f]"
          />
        ) : (
          <h1 className="mt-2 text-[30px] leading-tight sm:text-[34px]">{section.name}</h1>
        )}

        {/* Stage stepper */}
        <div className="mt-4">
          <SectionStepper section={section} onSet={(st) => data.setStage(section.id, st)} />
        </div>

        {/* Approvals row */}
        <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-[#efece8] pb-4">
          <PartnerAvatars section={section} userName={userName} user={user} />
          <span
            className={`text-[12px] ${
              locked ? "font-semibold text-[#2d6a4f]" : waitingOnMe ? "text-[#8a6100]" : "text-[#9a9a9a]"
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

        {/* Final version or guiding question */}
        <div className="mt-6">
          {hasContent ? (
            <FinalVersionBlock section={section} data={data} />
          ) : (
            <GuidedEmptyState
              section={section}
              data={data}
              onAddIdea={() => setComposerOpen(true)}
            />
          )}
        </div>

        {/* Approve / withdraw */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {locked && <ReopenControl section={section} data={data} />}
          {!locked && myKey && !myApproved && hasContent && (
            <button
              onClick={() => data.approve(section.id, userName)}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold hover:opacity-90"
              style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
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
          {!locked && !hasContent && (
            <p className="text-[12px] text-[#9a9a9a]">
              Approve appears once there's a final version.
            </p>
          )}
        </div>

        {/* Idea board */}
        <IdeaBoard
          section={section}
          data={data}
          userName={userName}
          ideas={ideas}
          composerOpen={composerOpen}
          onComposerClose={() => setComposerOpen(false)}
        />

        {historyOpen && (
          <div className="mt-6">
            <VersionHistory versions={data.versions.filter((v) => v.section_id === section.id)} />
          </div>
        )}
      </div>

      {/* Side panel: Log, Tasks, Questions for this section */}
      <aside className="w-full shrink-0 border-t border-[#efece8] pt-6 xl:w-[300px] xl:border-t-0 xl:border-l xl:pt-0 xl:pl-8">
        <div className="xl:sticky xl:top-0">
          <SectionPanel section={section} data={data} userName={userName} />
        </div>
      </aside>
    </div>
  );
}