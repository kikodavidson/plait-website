import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Loader2, Check } from "lucide-react";
import LibraryFilters from "@/components/library/LibraryFilters";

export default function ExamplePicker({ open, onClose, onAdd }) {
  const [swipes, setSwipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ platform: "", format: "", hook_type: "", vertical: "", angle_type: "" });
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true);
      try {
        setSwipes(await base44.entities.Swipe.list("-created_date", 500));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
    setSelected(new Set());
  }, [open]);

  if (!open) return null;

  const filtered = swipes.filter((s) => {
    if (search) {
      const hay = [s.source_brand, s.why_it_works, ...(s.tags || [])].join(" ").toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    for (const k of Object.keys(filters)) {
      if (filters[k] && s[k] !== filters[k]) return false;
    }
    return true;
  });

  const toggle = (id) => setSelected((prev) => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const clearFilters = () => {
    setSearch("");
    setFilters({ platform: "", format: "", hook_type: "", vertical: "", angle_type: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="font-bold text-[#2d2d2d]">Add examples from swipe library</p>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 border-b border-gray-100">
          <LibraryFilters search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} onClear={clearFilters} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-gray-300" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">No swipes match your filters.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map((s) => {
                const isSel = selected.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    className={`relative text-left rounded-lg overflow-hidden border-2 ${isSel ? "border-[#2d2d2d]" : "border-transparent"}`}
                  >
                    <div className="aspect-square bg-gray-100">
                      {s.thumbnail && <img src={s.thumbnail} alt="" className="w-full h-full object-cover" />}
                    </div>
                    {isSel && (
                      <span className="absolute top-1 right-1 bg-[#2d2d2d] text-white rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    <div className="p-1.5 bg-white">
                      <p className="text-xs font-semibold truncate">{s.source_brand || "Untitled"}</p>
                      <p className="text-[10px] text-gray-500 truncate">{s.format || ""}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">{selected.size} selected</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="text-sm text-gray-500 px-3 py-2">Cancel</button>
            <button
              disabled={!selected.size}
              onClick={() => onAdd(swipes.filter((s) => selected.has(s.id)))}
              className="btn-gradient text-sm px-5 py-2 rounded-full disabled:opacity-50"
            >
              Add {selected.size || ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}