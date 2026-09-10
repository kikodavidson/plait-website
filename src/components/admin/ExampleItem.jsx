import React from "react";
import { Trash2, GripVertical, Image as ImageIcon, Play, Eye, Repeat } from "lucide-react";
import GlowingShadow from "@/components/ui/glowing-shadow";
import HorizontalScrollText from "@/components/library/HorizontalScrollText";

const tagsFor = (swipe) => {
  if (!swipe) return [];
  const tags = [];
  const fmt = (swipe.format || "").toLowerCase();
  if (swipe.hook_type) tags.push("Hook");
  if (fmt.includes("ugc") || swipe.talent === "creator" || swipe.talent === "customer") tags.push("UGC");
  if (swipe.angle_type === "offer or discount") tags.push("Offer");
  if (swipe.angle_type === "competitor callout") tags.push("Competitor");
  if (fmt.includes("testimonial")) tags.push("Testimonial");
  if ((swipe.tags || [])[0]) tags.push(String(swipe.tags[0]));
  return tags.slice(0, 3);
};

const hoverAction =
  "p-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors";

export default function ExampleItem({ example, api, swipe, selected, onSelect, innerRef, draggableProps, dragHandleProps }) {
  const isVideo = /\.(mp4|mov|webm|m4v)(\?|$)/i.test(example.file_url || "");
  const tags = tagsFor(swipe);
  const name = swipe?.source_brand || example.label || "Reference";

  return (
    <div ref={innerRef} {...draggableProps} className="shrink-0">
      <div
        onClick={() => onSelect(example.id)}
        className={`group/card cursor-pointer ${selected ? "ring-2 ring-purple-400/60 rounded-xl" : ""}`}
      >
        <GlowingShadow>
          <div className="rounded-xl overflow-hidden">
            <div className="relative aspect-[4/5] bg-black/60">
              {example.thumbnail_url ? (
                <img
                  src={example.thumbnail_url}
                  alt=""
                  draggable={false}
                  className={`w-full h-full object-cover transition-transform duration-500 ${selected ? "scale-[1.02]" : "group-hover/card:scale-[1.03]"}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}

              {isVideo && (
                <span className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                  <Play className="w-3.5 h-3.5 text-white" />
                </span>
              )}

              <span
                {...dragHandleProps}
                className="absolute top-1.5 left-1.5 cursor-grab active:cursor-grabbing p-1 rounded-md bg-black/50 text-white/70 opacity-0 group-hover/card:opacity-100 transition-opacity"
                title="Drag to reorder"
              >
                <GripVertical className="w-3.5 h-3.5" />
              </span>

              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 p-2 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 transition-opacity bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-6">
                <button
                  onClick={(e) => { e.stopPropagation(); if (example.file_url) window.open(example.file_url, "_blank"); }}
                  className={hoverAction}
                  title="View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); api.replaceExample(example); }}
                  className={hoverAction}
                  title="Replace"
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); api.deleteExample(example.id); }}
                  className={hoverAction}
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="px-2.5 py-2.5">
              <p className="font-bold text-sm text-white truncate">{name}</p>
              {example.label && (
                <HorizontalScrollText className="text-[10px] text-white/50 mt-0.5">
                  {example.label}
                </HorizontalScrollText>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 h-[42px] overflow-hidden">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold text-white/70 bg-white/10 rounded px-1.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {selected ? (
                <textarea
                  autoFocus
                  value={example.note || ""}
                  onChange={(e) => api.set("Example", example.id, { note: e.target.value })}
                  onBlur={(e) => api.commit("Example", example.id, { note: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Why this reference…"
                  rows={3}
                  className="mt-2 w-full text-[11px] leading-snug text-white/70 bg-white/[0.04] rounded-lg border border-purple-400/25 placeholder:text-white/25 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400/40 resize-none"
                />
              ) : (
                example.note && (
                  <p className="mt-1.5 text-[11px] leading-snug text-white/40 line-clamp-2">{example.note}</p>
                )
              )}
            </div>
          </div>
        </GlowingShadow>
      </div>
    </div>
  );
}