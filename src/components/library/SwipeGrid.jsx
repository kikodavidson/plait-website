import React from "react";
import { Loader2, Film } from "lucide-react";
import { needsRequiredTags } from "@/lib/swipeOptions";
import GlowingShadow from "@/components/ui/glowing-shadow";

export default function SwipeGrid({ swipes, loading, onSelect }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    );
  }
  if (!swipes.length) {
    return (
      <div className="text-center py-20 text-gray-400 text-sm">
        No swipes match your filters. Use Upload to add creative to your library.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {swipes.map((s) => (
        <button key={s.id} onClick={() => onSelect(s)} className="group text-left rounded-xl">
          <GlowingShadow>
            <div className="p-2 rounded-xl overflow-hidden">
              <div className="aspect-square rounded-lg overflow-hidden bg-black relative">
                {s.thumbnail ? (
                  <img src={s.thumbnail} alt={s.source_brand || ""} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Film className="w-8 h-8 text-white/20" />
                  </div>
                )}
                {needsRequiredTags(s) && (
                  <span className="absolute top-2 left-2 bg-amber-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Needs tags
                  </span>
                )}
              </div>
              <div className="mt-2 px-1 pb-1">
                <p className="font-bold text-sm text-white truncate">{s.source_brand || "Untitled"}</p>
                <p className="text-xs text-white/50 truncate mt-0.5">
                  {[s.creative_format, Array.isArray(s.concept) ? s.concept.join(" · ") : s.concept]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </p>
                <div className="flex flex-wrap gap-1 mt-2 h-[42px] overflow-hidden">
                  {Array.isArray(s.platform) &&
                    s.platform.map((p) => (
                      <span key={p} className="text-[10px] font-bold uppercase tracking-wide text-white/70 bg-white/10 rounded px-1.5 py-0.5">
                        {p}
                      </span>
                    ))}
                  {s.hook && (
                    <span className="text-[10px] font-semibold text-white/70 bg-white/10 rounded px-1.5 py-0.5">{s.hook}</span>
                  )}
                  {(Array.isArray(s.angle_type) ? s.angle_type : s.angle_type ? [s.angle_type] : []).map((a) => (
                    <span key={a} className="text-[10px] font-semibold text-white/70 bg-white/10 rounded px-1.5 py-0.5">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlowingShadow>
        </button>
      ))}
    </div>
  );
}