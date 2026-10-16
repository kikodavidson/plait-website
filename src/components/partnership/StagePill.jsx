import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SheenPill from "./SheenPill";
import { STAGES, STAGE_ORDER, STAGE_DOTS } from "./stageMeta";

export default function StagePill({ section, onSet }) {
  const [open, setOpen] = useState(false);
  const meta = STAGES[section.stage] || STAGES.not_started;
  const locked = section.stage === "locked";

  if (locked) {
    return (
      <SheenPill tint={meta.tint} text={meta.text}>
        {meta.label}
      </SheenPill>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="inline-flex">
        <SheenPill tint={meta.tint} text={meta.text} className="transition-transform duration-150 hover:scale-[1.03]">
          {meta.label}
          <ChevronDown className="h-3 w-3" />
        </SheenPill>
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
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: STAGE_DOTS[st] }}
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