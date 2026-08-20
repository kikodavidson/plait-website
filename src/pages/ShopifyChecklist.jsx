import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { CHECKLIST_SECTIONS, ALL_ITEM_IDS, TOTAL_ITEMS } from "@/components/checklistTemplate";

const STATUS_OPTIONS = [
  { id: "active", label: "Active" },
  { id: "launched", label: "Launched" },
  { id: "paused", label: "Paused" },
];

const STATUS_STYLES = {
  active: "bg-green-600 text-white",
  launched: "bg-[#2d2d2d] text-white",
  paused: "bg-gray-200 text-gray-600",
};

export default function ShopifyChecklist() {
  const [builds, setBuilds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newClient, setNewClient] = useState("");
  const [busy, setBusy] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [collapsed, setCollapsed] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const list = await base44.entities.BuildProject.list("-created_date");
      setBuilds(list);
      setSelectedId((prev) => (prev && list.find((b) => b.id === prev) ? prev : list[0]?.id || null));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const selected = useMemo(() => builds.find((b) => b.id === selectedId) || null, [builds, selectedId]);

  useEffect(() => {
    setNotesDraft(selected?.notes || "");
  }, [selectedId, selected?.notes]);

  const addBuild = async () => {
    const name = newClient.trim();
    if (!name) return;
    setBusy(true);
    try {
      const created = await base44.entities.BuildProject.create({
        client_name: name,
        status: "active",
        completed_items: [],
        notes: "",
      });
      setBuilds((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setNewClient("");
    } catch (e) {
      console.error(e);
    }
    setBusy(false);
  };

  const setStatus = async (status) => {
    if (!selected) return;
    setBuilds((prev) => prev.map((b) => (b.id === selected.id ? { ...b, status } : b)));
    try {
      await base44.entities.BuildProject.update(selected.id, { status });
    } catch (e) {
      console.error(e);
    }
  };

  const toggleItem = async (itemId) => {
    if (!selected) return;
    const current = selected.completed_items || [];
    const next = current.includes(itemId) ? current.filter((x) => x !== itemId) : [...current, itemId];
    setBuilds((prev) => prev.map((b) => (b.id === selected.id ? { ...b, completed_items: next } : b)));
    try {
      await base44.entities.BuildProject.update(selected.id, { completed_items: next });
    } catch (e) {
      console.error(e);
    }
  };

  const saveNotes = async () => {
    if (!selected) return;
    if ((selected.notes || "") === notesDraft) return;
    setBuilds((prev) => prev.map((b) => (b.id === selected.id ? { ...b, notes: notesDraft } : b)));
    try {
      await base44.entities.BuildProject.update(selected.id, { notes: notesDraft });
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = useMemo(() => {
    if (!selected) return 0;
    const set = new Set(selected.completed_items || []);
    return ALL_ITEM_IDS.filter((id) => set.has(id)).length;
  }, [selected]);

  const sectionCount = (section) => {
    if (!selected) return 0;
    const set = new Set(selected.completed_items || []);
    return section.items.filter((i) => set.has(i.id)).length;
  };

  const toggleSection = (id) => setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#222222]">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <header className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-gray-400 mb-1">Internal</p>
          <h1 className="text-2xl font-bold tracking-tight">Shopify Build Process</h1>
        </header>

        {/* Build switcher + add */}
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <select
            value={selectedId || ""}
            onChange={(e) => setSelectedId(e.target.value)}
            className="flex-1 min-w-0 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
          >
            <option value="">Select a build…</option>
            {builds.map((b) => (
              <option key={b.id} value={b.id}>{b.client_name}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addBuild()}
              placeholder="New client name"
              className="flex-1 min-w-0 sm:w-48 border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
            />
            <button
              onClick={addBuild}
              disabled={busy || !newClient.trim()}
              className="inline-flex items-center gap-1.5 bg-[#2d2d2d] hover:bg-[#1a1a1a] text-white text-sm font-medium px-4 py-2.5 rounded-lg disabled:opacity-40"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {selected ? (
          <>
            {/* Status buttons */}
            <div className="flex gap-2 mb-6">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatus(s.id)}
                  className={`flex-1 text-sm font-medium py-2 rounded-lg border transition-colors ${
                    selected.status === s.id
                      ? `${STATUS_STYLES[s.id]} border-transparent`
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400">Overall progress</span>
                <span className="font-mono text-sm text-[#222222]">{completedCount} / {TOTAL_ITEMS}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all duration-300"
                  style={{ width: `${TOTAL_ITEMS ? (completedCount / TOTAL_ITEMS) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 mb-8">
              {CHECKLIST_SECTIONS.map((section) => {
                const done = sectionCount(section);
                const total = section.items.length;
                const isCollapsed = collapsed[section.id];
                return (
                  <div key={section.id} className="border border-gray-200 bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50"
                    >
                      {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      <span className="font-medium text-sm flex-1">{section.title}</span>
                      <span className={`font-mono text-xs ${done === total ? "text-green-600" : "text-gray-400"}`}>{done}/{total}</span>
                    </button>
                    {!isCollapsed && (
                      <div className="divide-y divide-gray-100">
                        {section.items.map((item) => {
                          const checked = (selected.completed_items || []).includes(item.id);
                          return (
                            <label key={item.id} className="flex items-start gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleItem(item.id)}
                                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0"
                              />
                              <span className={`text-sm ${checked ? "text-gray-400 line-through" : "text-[#222222]"}`}>{item.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Notes */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400">Notes</span>
                <span className="font-mono text-[11px] text-gray-300">saves on blur</span>
              </div>
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                onBlur={saveNotes}
                rows={5}
                placeholder="Anything worth remembering for this build…"
                className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
              />
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400 text-sm">
            {builds.length === 0 ? "Add your first build above to get started." : "Select a build to view its checklist."}
          </div>
        )}
      </div>
    </div>
  );
}