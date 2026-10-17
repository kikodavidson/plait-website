import React from "react";
import { STAGE_ORDER, STAGES } from "./stageMeta";
import { ACCENT } from "./accent";

/** Horizontal five-stage stepper on light backgrounds. */
export default function SectionStepper({ section, onSet }) {
  const locked = section.stage === "locked";
  const current = STAGE_ORDER.indexOf(section.stage);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-y-3">
        {STAGE_ORDER.map((st, i) => {
          const isCurrent = st === section.stage;
          const done = i < current;
          const clickable = !locked && st !== "locked";
          return (
            <React.Fragment key={st}>
              {i > 0 && (
                <span
                  className="mx-2 h-px w-5 sm:w-8"
                  style={{ backgroundColor: i <= current ? ACCENT : "#e5e2dc" }}
                />
              )}
              <button
                disabled={!clickable}
                onClick={() => clickable && onSet(st)}
                title={clickable ? `Move to ${STAGES[st].label}` : "Locked needs both approvals"}
                className="inline-flex items-center gap-1.5 disabled:cursor-default"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: done || isCurrent ? ACCENT : "#dcd5c9",
                    boxShadow: isCurrent ? `0 0 0 3px ${ACCENT}33` : "none",
                  }}
                />
                <span
                  className={`text-[13px] ${isCurrent ? "font-semibold" : ""}`}
                  style={{
                    color: isCurrent ? "#1a1a1a" : done ? "#3a3a3a" : "#9a9a9a",
                  }}
                >
                  {STAGES[st].label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <p className="mt-2 text-[12px] text-[#9a9a9a]">
        {locked
          ? "Locked — reopen to change the stage."
          : "Click a stage to move there. Locked needs both approvals."}
      </p>
    </div>
  );
}