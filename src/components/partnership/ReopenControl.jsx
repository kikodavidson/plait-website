import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

export default function ReopenControl({ section, data }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  if (open) {
    return (
      <div className="w-full rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-3 sm:max-w-md">
        <p className="mb-2 text-[14px] font-semibold">Why reopen {section.name}?</p>
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          autoFocus
          placeholder="Short reason…"
          className="w-full rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#619e80]"
        />
        <div className="mt-2 flex gap-2">
          <button
            disabled={!reason.trim()}
            onClick={() => { data.reopen(section.id, reason.trim()); setOpen(false); setReason(""); }}
            className="rounded-full bg-[#619e80] px-4 py-2 text-[14px] text-white hover:opacity-90 disabled:opacity-40"
          >
            Reopen
          </button>
          <button
            onClick={() => { setOpen(false); setReason(""); }}
            className="rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px]"
          >
            Cancel
          </button>
        </div>
        <p className="mt-1.5 text-[12px] text-[#9a9a9a]">Moves back to In Discussion and clears both approvals.</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] hover:border-[#b0532f] hover:text-[#b0532f]"
    >
      <RotateCcw className="h-4 w-4" /> Reopen
    </button>
  );
}