import React, { useState } from "react";
import { Check, ExternalLink, Heart, X } from "lucide-react";
import { SAMPLE_TEXT } from "@/lib/moodBoardConfig";

const inputCls =
  "w-full border-b border-[#d5d1c8] bg-transparent py-1 text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#b5b0a6] focus:border-[#1a1a1a]";

/** One tile: image, pulsing loading state, failed-domain state, hover overlay with votes. */
export default function MoodImage({ item, userName, fresh, faded, onVote, onDelete, onMetaSave, onMetaDone }) {
  const [tapped, setTapped] = useState(false);
  const [why, setWhy] = useState(item.note || "");
  const [hexText, setHexText] = useState((item.hex_codes || []).join(" "));
  const [font, setFont] = useState(item.font_name || "");

  const myVote = userName === "Luke" ? item.vote_luke : item.vote_max;
  const bothLove = item.vote_luke === "love" && item.vote_max === "love";
  const hexes = (item.hex_codes || []).filter((h) => /^#?[0-9a-fA-F]{3,8}$/.test(h));
  const isIdentity = item.level === "identity";
  const isLink = !!item.link_url;
  const pending = isLink && !item.image_url && item.fetch_status !== "failed";
  const failed = isLink && !item.image_url && item.fetch_status === "failed";

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

  const overlay = (
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
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Remove"
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
      <div className="space-y-1">
        {item.domain && <p className="text-[12px] font-medium text-white/85">{item.domain}</p>}
        {item.note && <p className="text-[13px] leading-snug">{item.note}</p>}
        {item.link_url && (
          <a
            href={item.link_url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[12px] font-medium underline"
          >
            Visit <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-2 break-inside-avoid">
      {item.image_url ? (
        <div className="group relative cursor-pointer" onClick={() => setTapped((t) => !t)}>
          <img
            src={item.image_url}
            alt={item.note || "Mood board image"}
            loading="lazy"
            className={`w-full object-cover ${faded ? "opacity-50" : ""}`}
          />
          {overlay}
          {bothLove && (
            <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/95">
              <Heart className="h-3 w-3 fill-[#e0245e] text-[#e0245e]" />
            </span>
          )}
        </div>
      ) : pending ? (
        <div className="flex aspect-video w-full items-center justify-center bg-[#e9e6df]">
          <span className="animate-pulse text-[13px] font-medium text-[#8a857c]">
            {item.domain || item.link_url}
          </span>
        </div>
      ) : failed ? (
        <div
          className="group relative aspect-video w-full cursor-pointer bg-[#ece9e3]"
          onClick={() => setTapped((t) => !t)}
        >
          <span className="absolute inset-0 flex items-center justify-center break-words p-4 text-center text-[clamp(16px,2vw,22px)] font-bold text-[#8a857c]">
            {item.domain || item.link_url}
          </span>
          {overlay}
        </div>
      ) : null}

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