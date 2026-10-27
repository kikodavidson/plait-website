import React from "react";
import { Check } from "lucide-react";
import { phaseDone } from "./vibeMeta";

function RecapRow({ label, children }) {
  return (
    <div className="border-b border-[#f0eeea] py-3 last:border-b-0">
      <p className="mb-1 text-[11.5px] font-semibold uppercase tracking-wide text-[#9a9a9a]">
        {label}
      </p>
      <div className="text-[14px] text-[#1a1a1a]">{children}</div>
    </div>
  );
}

/** Phase 6 — the full recap. Both partners check off to lock the identity. */
export default function LockPhase({ phases, items }) {
  const foundation = phases.find((p) => p.phase === "foundation");
  const chosen = items.find((it) => it.phase === "directions" && it.item_type === "direction" && it.chosen);
  const colors = items.filter((it) => it.phase === "build" && it.item_type === "color");
  const fonts = items.filter((it) => it.phase === "build" && it.item_type === "font");
  const locked = phaseDone(phases[phases.length - 1]);

  return (
    <div>
      {locked && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eef5f1] px-3.5 py-2 text-[13.5px] font-semibold text-[#3d6b52]">
          <Check className="h-4 w-4" strokeWidth={3} /> Brand identity locked — this is us.
        </p>
      )}
      <div className="rounded-xl border border-[#e5e2dc] bg-white px-5 py-1">
        <RecapRow label="The feeling">
          {foundation?.content ? (
            <p className="whitespace-pre-wrap">{foundation.content}</p>
          ) : (
            <span className="text-[#9a9a9a]">No notes yet — add them in Foundation.</span>
          )}
        </RecapRow>
        <RecapRow label="Direction">
          {chosen ? (
            <p>
              <span className="font-semibold">{chosen.title}</span>
              {chosen.body ? ` — ${chosen.body}` : ""}
            </p>
          ) : (
            <span className="text-[#9a9a9a]">Not chosen yet — commit to one in Pick.</span>
          )}
        </RecapRow>
        <RecapRow label="Colors">
          {colors.length ? (
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#f0eeea] px-2 py-1"
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-[#e5e2dc]"
                    style={{ backgroundColor: c.color_hex }}
                  />
                  {c.title}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[#9a9a9a]">No colors yet — add them in Build Out.</span>
          )}
        </RecapRow>
        <RecapRow label="Fonts">
          {fonts.length ? (
            <p>{fonts.map((f) => f.title).join(" · ")}</p>
          ) : (
            <span className="text-[#9a9a9a]">No fonts yet — add them in Build Out.</span>
          )}
        </RecapRow>
      </div>
    </div>
  );
}