import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, ShieldAlert, LogOut } from "lucide-react";
import LibraryFilters from "@/components/library/LibraryFilters";
import SwipeGrid from "@/components/library/SwipeGrid";
import SwipeDetailPanel from "@/components/library/SwipeDetailPanel";
import BulkIntake from "@/components/library/BulkIntake";

export default function Library() {
  const [user, setUser] = useState(null);
  const [swipes, setSwipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ platform: "", format: "", hook_type: "", vertical: "", angle_type: "" });
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("library");

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me.role === "admin") await loadSwipes();
        else setLoading(false);
      } catch {
        setLoading(false);
      }
    })();
  }, []);

  const loadSwipes = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Swipe.list("-created_date", 500);
      setSwipes(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

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

  const clearFilters = () => {
    setSearch("");
    setFilters({ platform: "", format: "", hook_type: "", vertical: "", angle_type: "" });
  };

  const handleUpdate = async (id, payload) => {
    await base44.entities.Swipe.update(id, payload);
    setSwipes((prev) => prev.map((s) => (s.id === id ? { ...s, ...payload } : s)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, ...payload } : prev));
  };

  const handleDelete = async (id) => {
    await base44.entities.Swipe.delete(id);
    setSwipes((prev) => prev.filter((s) => s.id !== id));
  };

  if (user && user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-gray-50">
        <ShieldAlert className="w-10 h-10 text-gray-400" />
        <p className="text-lg font-medium text-[#2d2d2d]">Admins only.</p>
        <p className="text-sm text-gray-500">You don't have access to the swipe library.</p>
        <button onClick={() => base44.auth.logout()} className="text-sm text-gray-500 underline inline-flex items-center gap-1">
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#2d2d2d] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-30">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-50">Admin</p>
          <h1 className="text-xl font-bold">Swipe Library</h1>
        </div>
        <div className="flex items-center gap-3">
          {mode === "intake" ? (
            <button onClick={() => setMode("library")} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">View library</button>
          ) : (
            <button onClick={() => setMode("intake")} className="inline-flex items-center gap-2 bg-white text-[#2d2d2d] text-sm font-bold px-4 py-2 rounded-full hover:bg-gray-100">
              <Upload className="w-4 h-4" /> Upload
            </button>
          )}
          <button onClick={() => base44.auth.logout()} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">Log out</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {mode === "intake" ? (
          <BulkIntake
            existingSwipes={swipes}
            onSaved={() => { setMode("library"); loadSwipes(); }}
            onCancel={() => setMode("library")}
          />
        ) : (
          <div className="space-y-6">
            <LibraryFilters search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} onClear={clearFilters} />
            <SwipeGrid swipes={filtered} loading={loading} onSelect={setSelected} />
          </div>
        )}
      </main>

      {selected && (
        <SwipeDetailPanel swipe={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
}