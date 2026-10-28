import React from "react";
import { Heart, Link2, Scissors, Trash2 } from "lucide-react";
import { STATUS_LABEL, voteStatus } from "@/lib/moodBoardConfig";

const badgeCls = {
  both: "bg-[#00E676]/15 text-[#00854a]",
  cut: "bg-[#e5e2dc] text-[#8a857c]",
  split: "bg-amber-100 text-amber-700",
  none: "bg-[#e5e2dc] text-[#8a857c]",
};

/** One reference card: image, tags, why note, and both partners' votes. */
export default function MoodCard({ item, userName, onVote, onDelete }) {
  const status = voteStatus(item);
  const mine = userName === "Luke";
  const myVote = mine ? item.vote_luke : item.vote_max;
  const partnerName = mine ? "Max" : "Luke";
  const partnerVote = mine ? item.vote_max : item.vote_luke;

  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[#e5e2dc] bg-white">
      <div className="relative">
        <img src={item.image_url} alt="" className="w-full object-cover" loading="lazy" />
        {item.source_link && (
          <a
            href={item.source_link}
            target="_blank"
            rel="noreferrer"
            aria-label="Open source link"
            className="absolute right-2 top-2 rounded-md bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
          >
            <Link2 className="h-3.5 w-3.5" />
          </a>
        )}
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badgeCls[status]}`}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-[#8a857c]">
          <span>{item.sub_section}</span>
          <span>Added by {item.added_by}</span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#1a1a1a]">{item.note}</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onVote("love")}
            className={`inline-flex h-7 items-center gap-1 rounded-full border px-2.5 text-[12px] font-medium transition-colors ${
              myVote === "love"
                ? "border-[#00E676] bg-[#00E676] text-black"
                : "border-[#e5e2dc] text-[#525252] hover:bg-[#f7f5f2]"
            }`}
          >
            <Heart className="h-3.5 w-3.5" /> Love
          </button>
          <button
            onClick={() => onVote("cut")}
            className={`inline-flex h-7 items-center gap-1 rounded-full border px-2.5 text-[12px] font-medium transition-colors ${
              myVote === "cut"
                ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                : "border-[#e5e2dc] text-[#525252] hover:bg-[#f7f5f2]"
            }`}
          >
            <Scissors className="h-3.5 w-3.5" /> Cut
          </button>
          {partnerVote && (
            <span className="text-[11.5px] text-[#8a857c]">
              {partnerName}: {partnerVote === "love" ? "Love" : "Cut"}
            </span>
          )}
          {item.added_by === userName && (
            <button
              onClick={() => onDelete(item.id)}
              aria-label="Delete reference"
              className="ml-auto rounded-md p-1.5 text-[#8a857c] transition-colors hover:bg-[#f7f5f2] hover:text-[#b91c1c]"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}