import React, { useState } from "react";
import { Plus } from "lucide-react";
import DirectionCard from "./DirectionCard";

/** Phase 3 — shape two or three named directions and vote on them. */
export default function DirectionsPhase({ items, data, userName }) {
  const directions = items.filter((it) => it.phase === "directions" && it.item_type === "direction");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const add = async () => {
    const title = name.trim();
    if (!title) return;
    await data.addVibeItem({
      phase: "directions",
      item_type: "direction",
      title,
      body: desc.trim(),
      added_by: userName,
    });
    setName("");
    setDesc("");
  };

  return (
    <div>
      <p className="mb-4 text-[14px] text-[#6b6b6b]">
        Aim for 2–3 directions, each with a name and a short description of the world it lives in.
        Both of you vote Love / Maybe / No on each.
      </p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {directions.map((d) => (
          <DirectionCard key={d.id} item={d} data={data} userName={userName} />
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-[#dcd5c9] p-3">
        <div className="flex flex-wrap gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Direction name, e.g. 'Quiet Luxury Lab'"
            className="w-56 rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
          />
          <button
            onClick={add}
            disabled={!name.trim()}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#00E676] px-2.5 text-[12px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" /> Add direction
          </button>
        </div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={2}
          placeholder="Short description (optional)"
          className="mt-2 w-full resize-none rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
        />
      </div>
    </div>
  );
}