import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Plus, Trash2, ChevronDown, ChevronRight, ExternalLink, Calendar } from "lucide-react";
import { CHECKLIST, ALL_ITEM_IDS } from "@/components/checklistTemplate";

const STATUS_STYLES = {
  active: "bg-emerald-100 text-emerald-700",
  launched: "bg-blue-100 text-blue-700",
  paused: "bg-amber-100 text-amber-700",
};

function normalizeUrl(url) {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ShopifyChecklist() {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [draftName, setDraftName] = useState("");
  const [draftNotes, setDraftNotes] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const list = await base44.entities.BuildProject.list("-created_date");
        setProjects(list);
        if (list.length) setSelectedId(list[0].id);
        setError("");
      } catch (e) {
        setError("Projects did not load. Refresh the page to try again.");
      }
      setLoading(false);
    })();
  }, []);

  const selected = useMemo(
    () => projects.find((p) => p.id === selectedId) || null,
    [projects, selectedId]
  );

  // keep local drafts in sync when switching projects
  useEffect(() => {
    setDraftName(selected?.client_name || "");
    setDraftNotes(selected?.notes || "");
  }, [selectedId, selected]);

  const completed = useMemo(
    () => new Set(selected?.completed_items || []),
    [selected]
  );

  const overallProgress = useMemo(() => {
    if (!selected) return 0;
    return Math.round((completed.size / ALL_ITEM_IDS.length) * 100);
  }, [selected, completed]);

  const sectionProgress = (section) => {
    const done = section.items.filter((i) => completed.has(i.id)).length;
    return Math.round((done / section.items.length) * 100);
  };

  const createProject = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const created = await base44.entities.BuildProject.create({ client_name: newName.trim() });
      setProjects((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setNewName("");
      setError("");
    } catch (e) {
      setError("That project did not save. Try again.");
    }
    setCreating(false);
  };

  const toggleItem = async (itemId) => {
    if (!selected) return;
    const prevItems = selected.completed_items || [];
    const next = new Set(prevItems);
    if (next.has(itemId)) next.delete(itemId);
    else next.add(itemId);
    const arr = Array.from(next);
    // instant local update before the await
    setProjects((prev) => prev.map((p) => (p.id === selected.id ? { ...p, completed_items: arr } : p)));
    try {
      await base44.entities.BuildProject.update(selected.id, { completed_items: arr });
      setError("");
    } catch (e) {
      // rollback on failure
      setProjects((prev) => prev.map((p) => (p.id === selected.id ? { ...p, completed_items: prevItems } : p)));
      setError("That change did not save. Try again.");
    }
  };

  const updateField = async (field, value) => {
    if (!selected) return;
    const prev = selected[field];
    setProjects((prevP) => prevP.map((p) => (p.id === selected.id ? { ...p, [field]: value } : p)));
    try {
      await base44.entities.BuildProject.update(selected.id, { [field]: value });
      setError("");
    } catch (e) {
      setProjects((prevP) => prevP.map((p) => (p.id === selected.id ? { ...p, [field]: prev } : p)));
      setError("That change did not save. Try again.");
    }
  };

  const commitName = async () => {
    if (!selected) return;
    const value = draftName.trim();
    if (value === (selected.client_name || "")) return;
    const prev = selected.client_name;
    setProjects((prevP) => prevP.map((p) => (p.id === selected.id ? { ...p, client_name: value } : p)));
    try {
      await base44.entities.BuildProject.update(selected.id, { client_name: value });
      setError("");
    } catch (e) {
      setProjects((prevP) => prevP.map((p) => (p.id === selected.id ? { ...p, client_name: prev } : p)));
      setDraftName(prev || "");
      setError("Name did not save. Try again.");
    }
  };

  const commitNotes = async () => {
    if (!selected) return;
    const value = draftNotes;
    if (value === (selected.notes || "")) return;
    const prev = selected.notes || "";
    setProjects((prevP) => prevP.map((p) => (p.id === selected.id ? { ...p, notes: value } : p)));
    try {
      await base44.entities.BuildProject.update(selected.id, { notes: value });
      setError("");
    } catch (e) {
      setProjects((prevP) => prevP.map((p) => (p.id === selected.id ? { ...p, notes: prev } : p)));
      setDraftNotes(prev);
      setError("Notes did not save. Try again.");
    }
  };

  const deleteProject = async () => {
    if (!selected || !window.confirm(`Delete build project for "${selected.client_name}"? This cannot be undone.`)) return;
    try {
      await base44.entities.BuildProject.delete(selected.id);
      setProjects((prev) => prev.filter((p) => p.id !== selected.id));
      setSelectedId(null);
      setError("");
    } catch (e) {
      setError("That project did not delete. Try again.");
    }
  };

  const toggleSection = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    );
  }

  const storeHref = normalizeUrl(selected?.store_url);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-[#2d2d2d] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-30">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-50">Internal</p>
          <h1 className="text-xl font-bold">Shopify Build Process</h1>
        </div>
        <button onClick={() => base44.auth.logout()} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">
          Log out
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Projects</p>
            <div className="space-y-1">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    p.id === selectedId ? "bg-gray-100 font-semibold text-[#2d2d2d]" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="block truncate">{p.client_name}</span>
                  <span className={`inline-block text-[10px] mt-1 px-1.5 py-0.5 rounded-full ${STATUS_STYLES[p.status] || "bg-gray-100 text-gray-500"}`}>
                    {p.status || "active"}
                  </span>
                </button>
              ))}
              {projects.length === 0 && <p className="text-xs text-gray-400">No projects yet.</p>}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createProject()}
                placeholder="New project name"
                className="w-full text-sm rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
              />
              <button
                onClick={createProject}
                disabled={creating || !newName.trim()}
                className="w-full mt-2 inline-flex items-center justify-center gap-1 bg-[#2d2d2d] hover:bg-[#1a1a1a] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40"
              >
                <Plus className="w-4 h-4" /> New project
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          {error && (
            <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {error}
            </div>
          )}

          {!selected ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
              Select or create a project to start tracking.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <input
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      onBlur={commitName}
                      placeholder="Client name"
                      className="text-lg font-bold text-[#2d2d2d] bg-transparent focus:outline-none w-full"
                    />
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <input
                        value={selected.store_url || ""}
                        onChange={(e) => updateField("store_url", e.target.value)}
                        placeholder="store-url.com"
                        className="text-xs text-gray-500 bg-transparent border-b border-transparent focus:border-gray-200 focus:outline-none"
                      />
                      {storeHref && (
                        <a href={storeHref} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-gray-500">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <select
                        value={selected.status || "active"}
                        onChange={(e) => updateField("status", e.target.value)}
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 cursor-pointer ${STATUS_STYLES[selected.status] || "bg-gray-100 text-gray-500"}`}
                      >
                        <option value="active">active</option>
                        <option value="launched">launched</option>
                        <option value="paused">paused</option>
                      </select>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <input
                          type="date"
                          value={selected.target_launch || ""}
                          onChange={(e) => updateField("target_launch", e.target.value)}
                          className="bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={deleteProject} className="text-gray-300 hover:text-red-500 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Overall progress</span>
                    <span className="font-mono">{completed.size} / {ALL_ITEM_IDS.length}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
                  </div>
                  <div className="text-right text-xs text-emerald-700 font-mono mt-1">{overallProgress}%</div>
                </div>

                <div className="mt-4">
                  <textarea
                    value={draftNotes}
                    onChange={(e) => setDraftNotes(e.target.value)}
                    onBlur={commitNotes}
                    placeholder="Notes on this build…"
                    rows={2}
                    className="w-full text-sm text-gray-600 rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
                  />
                </div>
              </div>

              {CHECKLIST.map((section) => {
                const sp = sectionProgress(section);
                const isOpen = expanded[section.id] ?? true;
                return (
                  <div key={section.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
                    >
                      {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                      <span className="font-bold text-[#2d2d2d] flex-1 text-left">{section.title}</span>
                      {section.note && <span className="text-xs text-gray-400 hidden sm:block">{section.note}</span>}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sp}%` }} />
                        </div>
                        <span className="text-xs font-mono text-emerald-700 w-8 text-right">{sp}%</span>
                      </div>
                    </button>
                    {isOpen && (
                      <ul className="divide-y divide-gray-50">
                        {section.items.map((item) => {
                          const done = completed.has(item.id);
                          return (
                            <li key={item.id} className="flex items-start gap-3 px-5 py-2.5 hover:bg-gray-50/50">
                              <button
                                onClick={() => toggleItem(item.id)}
                                className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                  done ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-300 hover:border-emerald-400"
                                }`}
                              >
                                {done && <span className="text-xs">✓</span>}
                              </button>
                              <span className={`text-sm ${done ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}