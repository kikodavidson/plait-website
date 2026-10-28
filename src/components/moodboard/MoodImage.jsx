import React, { useState } from "react";
import { Check, Heart, X } from "lucide-react";
import { SAMPLE_TEXT } from "@/lib/moodBoardConfig";

const inputCls =
  "w-full border-b border-[#d5d1c8] bg-transparent py-1 text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#b5b0a6] focus:border-[#1a1a1a]";

/** One image tile: bare image, hover/tap overlay with note + votes, optional meta underneath. */
export default function MoodImage({ item, userName, fresh, faded, onVote, onMetaSave, onMetaDone }) {
  const [tapped, setTapped] = useState(false);
  const [why, setWhy] = useState(item.note || "");
  const [hexText, setHexText] = useState((item.hex_codes || []).join(" "));
  const [font, setFont] = useState(item.font_name || "");

  const myVote = userName === "Luke" ? item.vote_luke : item.vote_max;
  const bothLove = item.vote_luke === "love" && item.vote_max === "love";
  const hexes = (item.hex_codes || []).filter((h) => /^#?[0-9a-fA-F]{3,8}$/.test(h));
  const isIdentity = item.level === "identity";

  const vote = (e, v) => {
    e.stopPropagation();
    onVote(v);
  };

  const commit = () => {
    onMetaSave({
      note: why.trim() || undefined,
      hex_codes: hexText.trim()
        ? hexText
            .trim()
            .split(/[\s,]+/)
            .map((h) => (h.startsWith("#") ? h : `#${h}`))
        : undefined,
      font_name: font.trim() || undefined,
    });
    onMetaDone();
  };

  return (
    <div className="mb-2 break-inside-avoid">
      <div className="group relative cursor-pointer" onClick={() => setTapped((t) => !t)}>
        <img
          src={item.image_url}
          alt={item.note || "Mood board image"}
          loading="lazy"
          className={`w-full object-cover ${faded ? "opacity-50" : ""}`}
        />
        <div
          className={`absolute inset-0 flex flex-col justify-between bg-black/60 p-3 text-white transition-opacity duration-150 ${
            tapped ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-black">
              {item.added_by === "Luke" ? "L" : "M"}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={(e) => vote(e, "love")}
                aria-label="Love"
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  myVote === "love"
                    ? "bg-white text-[#e0245e]"
                    : "bg-white/20 text-white hover:bg-white/40"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${myVote === "love" ? "fill-[#e0245e]" : ""}`} />
              </button>
              <button
                onClick={(e) => vote(e, "cut")}
                aria-label="Cut"
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  myVote === "cut"
                    ? "bg-white text-[#1a1a1a]"
                    : "bg-white/20 text-white hover:bg-white/40"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {item.note && <p className="text-[13px] leading-snug">{item.note}</p>}
        </div>
        {bothLove && (
          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/95">
            <Heart className="h-3 w-3 fill-[#e0245e] text-[#e0245e]" />
          </span>
        )}
      </div>

      {hexes.length > 0 && (
        <div className="mt-1.5 flex h-4 overflow-hidden rounded-[2px]">
          {hexes.map((h, idx) => (
            <span key={idx} className="flex-1" style={{ backgroundColor: h.startsWith("#") ? h : `#${h}` }} />
          ))}
        </div>
      )}

      {item.font_name && (
        <p
          className="mt-1.5 truncate text-[clamp(20px,2.5vw,28px)] font-semibold leading-tight text-[#1a1a1a]"
          style={{ fontFamily: `'${item.font_name}', sans-serif` }}
        >
          {SAMPLE_TEXT}
        </p>
      )}

      {fresh && (
        <div className="mt-2 space-y-1.5">
          <input
            autoFocus
            placeholder="Why? (optional)"
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            className={inputCls}
          />
          {isIdentity && (
            <>
              <input
                placeholder="Hex codes, e.g. #619E80 #1a1a1a (optional)"
                value={hexText}
                onChange={(e) => setHexText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commit()}
                className={inputCls}
              />
              <input
                placeholder="Font name (optional)"
                value={font}
                onChange={(e) => setFont(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commit()}
                className={inputCls}
              />
            </>
          )}
          <button
            onClick={commit}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#8a857c] transition-colors hover:text-[#1a1a1a]"
          >
            <Check className="h-3.5 w-3.5" /> Done
          </button>
        </div>
      )}
    </div>
  );
}