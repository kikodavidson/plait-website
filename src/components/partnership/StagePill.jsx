import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { STAGES, STAGE_ORDER } from "./stageMeta";

export default function StagePill({ section, onSet }) {
  const [open, setOpen] = useState(false);
  const meta = STAGES[section.stage] || STAGES.not_started;
  const locked = section.stage === "locked";

  if (locked) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold ${meta.pill}`}>
        {meta.label}
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold ${meta.pill} hover:opacity-80`}
      >
        {meta.label}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1.5 w-52 rounded-xl border border-[#e5e2dc] bg-white p-1.5 shadow-lg">
            {STAGE_ORDER.map((st) => {
              const isLocked = st === "locked";
              return (
                <button
                  key={st}
                  disabled={isLocked}
                  onClick={() => { onSet(st); setOpen(false); }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[14px] ${
                    st === section.stage ? "bg-[#f4f2ef] font-semibold" : "hover:bg-[#faf9f7]"
                  } ${isLocked ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${STAGES[st].pill.includes("#e8f2ec") ? "bg-[#619e80]" : ""}`}
                    style={{
                      backgroundColor: {
                        not_started: "#9a9a9a", exploring: "#2c5aa8", in_discussion: "#d9a400",
                        draft: "#6a4bab", locked: "#619e80",
                      }[st],
                    }}
                  />
                  {STAGES[st].label}
                </button>
              );
            })}
            <p className="px-2.5 py-1.5 text-[12px] leading-snug text-[#9a9a9a]">
              Locked needs both approvals.
            </p>
          </div>
        </>
      )}
    </div>
  );
}