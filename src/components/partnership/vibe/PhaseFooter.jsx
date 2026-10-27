import React from "react";
import { phaseDone } from "./vibeMeta";

/** Both partners check off at the bottom of a phase to unlock the next one. */
export default function PhaseFooter({ phase, data }) {
  const toggle = (who) => {
    const field = who === "Luke" ? "luke_done" : "max_done";
    data.updateVibePhase(phase.id, { [field]: !phase[field] });
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-[#f0eeea] pt-4">
      <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#1a1a1a]">
        <input
          type="checkbox"
          checked={!!phase.luke_done}
          onChange={() => toggle("Luke")}
          className="h-4 w-4 accent-[#619e80]"
        />
        Luke is done with this phase
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#1a1a1a]">
        <input
          type="checkbox"
          checked={!!phase.max_done}
          onChange={() => toggle("Max")}
          className="h-4 w-4 accent-[#619e80]"
        />
        Max is done with this phase
      </label>
      <span className="ml-auto text-[12.5px] text-[#9a9a9a]">
        {phaseDone(phase) ? "Phase complete — next phase unlocked" : "Both check off to unlock the next phase"}
      </span>
    </div>
  );
}