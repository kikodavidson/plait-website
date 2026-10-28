import React from "react";
import { X } from "lucide-react";
import { stackFor } from "@/lib/vibeFonts";

/** Live preview of the board's chosen heading + body font pairing. */
export default function FontPairCard({ board, onClear }) {
  if (!board.heading_font && !board.body_font) return null;

  return (
    <div className="relative col-span-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] p-6">
      <button
        onClick={onClear}
        aria-label="Clear font pairing"
        className="absolute right-2 top-2 rounded-md bg-black/70 p-1.5 text-white/80 transition-colors hover:bg-black hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9a9a9a]">
        Font pairing
      </p>
      <p className="mt-3 text-[32px] font-bold leading-tight text-white" style={{ fontFamily: stackFor(board.heading_font) }}>
        {board.heading_font || "No heading font yet"}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-white/70" style={{ fontFamily: stackFor(board.body_font) }}>
        {board.body_font ? `The quick brown fox jumps over the lazy dog — set in ${board.body_font}.` : "No body font selected yet."}
      </p>
    </div>
  );
}