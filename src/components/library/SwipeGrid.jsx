import React from "react";
import { Loader2, Film } from "lucide-react";
import { needsRequiredTags } from "@/lib/swipeOptions";

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
        <button
          key={s.id}
          onClick={() => onSelect(s)}
          className="group text-left rounded-xl border border-gray-100 bg-white p-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
            {s.thumbnail ? (
              <img src={s.thumbnail} alt={s.source_brand || ""} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Film className="w-8 h-8 text-gray-300" />
              </div>
            )}
            {needsRequiredTags(s) && (
              <span className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                Needs tags
              </span>
            )}
          </div>
          <div className="mt-2 px-1">
            <p className="font-semibold text-sm text-[#2d2d2d] truncate">{s.source_brand || "Untitled"}</p>
            <p className="text-xs text-gray-500 truncate">
              {[s.creative_format, Array.isArray(s.concept) ? s.concept[0] : s.concept].filter(Boolean).join(" · ") || "—"}
            </p>
            {Array.isArray(s.platform) && s.platform.length > 0 && (
              <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wide text-gray-500 bg-gray-100 rounded px-1 py-0.5">
                {s.platform.join(" / ")}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}