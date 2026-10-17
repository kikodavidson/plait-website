import React from "react";
import { STAGE_ORDER, STAGES } from "./stageMeta";
import { ACCENT } from "./accent";

/** Horizontal five-stage stepper: filled past, highlighted present, gray future. */
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
                  style={{ backgroundColor: i <= current ? ACCENT : "rgba(255,255,255,0.14)" }}
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
                    backgroundColor: done || isCurrent ? ACCENT : "rgba(255,255,255,0.16)",
                    boxShadow: isCurrent ? `0 0 0 3px ${ACCENT}44` : "none",
                  }}
                />
                <span
                  className={`text-[13px] ${isCurrent ? "font-semibold" : ""}`}
                  style={{
                    color: done ? "rgba(255,255,255,0.75)" : isCurrent ? "#ffffff" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {STAGES[st].label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <p className="mt-3 text-[12px] text-white/35">
        {locked
          ? "Locked — reopen to change the stage."
          : "Click a stage to move there. Locked needs both approvals."}
      </p>
    </div>
  );
}