import React from "react";
import { Check } from "lucide-react";

/** Phase 4 — review the votes and commit to one direction. */
export default function PickPhase({ items, data }) {
  const directions = items.filter((it) => it.phase === "directions" && it.item_type === "direction");
  const chosen = directions.find((d) => d.chosen);

  const count = (d, v) => [d.vote_luke, d.vote_max].filter((x) => x === v).length;

  const choose = async (d) => {
    if (d.chosen) return;
    const msg = chosen
      ? `Switch the chosen direction to "${d.title}"?`
      : `Commit to "${d.title}" as our direction?`;
    if (!window.confirm(msg)) return;
    for (const x of directions) {
      if (x.chosen !== (x.id === d.id)) {
        await data.updateVibeItem(x.id, { chosen: x.id === d.id });
      }
    }
  };

  if (directions.length === 0) {
    return (
      <p className="text-[14px] text-[#9a9a9a]">
        No directions yet — shape them in the Directions phase first.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-4 text-[14px] text-[#6b6b6b]">
        Look at the votes together, then commit to the one that feels right. Both of you check off
        below once the decision's made.
      </p>

      {chosen && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eef5f1] px-3 py-1.5 text-[13px] font-semibold text-[#3d6b52]">
          <Check className="h-4 w-4" /> Chosen: {chosen.title}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {directions.map((d) => (
          <div
            key={d.id}
            className={`rounded-xl border p-4 transition-colors ${
              d.chosen ? "border-[#619e80] bg-[#eef5f1]" : "border-[#e5e2dc] bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-[15.5px] font-semibold text-[#1a1a1a]">{d.title}</h4>
                {d.body && <p className="mt-1 text-[13.5px] text-[#6b6b6b]">{d.body}</p>}
              </div>
              <button
                onClick={() => choose(d)}
                disabled={d.chosen}
                className={`h-8 shrink-0 rounded-full px-3 text-[12px] font-semibold transition-opacity ${
                  d.chosen
                    ? "bg-[#619e80] text-white"
                    : "bg-[#00E676] text-[#0c130e] hover:opacity-90"
                }`}
              >
                {d.chosen ? "Chosen" : "Choose"}
              </button>
            </div>
            <div className="mt-3 flex gap-2 border-t border-[#f0eeea] pt-3 text-[12px]">
              <span className="rounded-full bg-[#f0eeea] px-2 py-0.5 text-[#6b6b6b]">
                Love {count(d, "love")} · Maybe {count(d, "maybe")} · No {count(d, "no")}
              </span>
              <span className="text-[#9a9a9a]">
                Luke: {d.vote_luke || "—"} · Max: {d.vote_max || "—"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}