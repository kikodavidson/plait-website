import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { CHECKLIST, ALL_ITEM_IDS } from "@/components/checklistTemplate";

export default function ShopifyChecklist() {
  const [projects, setProjects] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(CHECKLIST.map((s) => [s.id, true]))
  );

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const list = await base44.entities.BuildProject.list();
      const sorted = [...list].sort((a, b) =>
        (a.client_name || "").localeCompare(b.client_name || "")
      );
      setProjects(sorted);
      setActiveId((current) => current || (sorted[0] ? sorted[0].id : null));
      setMessage("");
    } catch (err) {
      setMessage("Projects did not load. Refresh the page to try again.");
    }
    setLoading(false);
  }

  const active = useMemo(
    () => projects.find((p) => p.id === activeId) || null,
    [projects, activeId]
  );

  const done = active?.completed_items || [];

  const overall = Math.round((done.length / ALL_ITEM_IDS.length) * 100) || 0;

  function sectionProgress(section) {
    const total = section.items.length;
    const complete = section.items.filter((i) => done.includes(i.id)).length;
    return { total, complete, pct: Math.round((complete / total) * 100) };
  }

  async function addProject() {
    const name = newName.trim();
    if (!name) return;
    try {
      const created = await base44.entities.BuildProject.create({
        client_name: name,
        status: "active",
        completed_items: []
      });
      setProjects((prev) =>
        [...prev, created].sort((a, b) =>
          (a.client_name || "").localeCompare(b.client_name || "")
        )
      );
      setActiveId(created.id);
      setNewName("");
      setMessage("");
    } catch (err) {
      setMessage("That build did not save. Try again.");
    }
  }

  async function toggleItem(itemId) {
    if (!active) return;
    const next = done.includes(itemId)
      ? done.filter((id) => id !== itemId)
      : [...done, itemId];

    setProjects((prev) =>
      prev.map((p) => (p.id === active.id ? { ...p, completed_items: next } : p))
    );

    try {
      await base44.entities.BuildProject.update(active.id, {
        completed_items: next
      });
    } catch (err) {
      setMessage("That change did not save. Check the item again.");
      loadProjects();
    }
  }

  async function setStatus(status) {
    if (!active) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === active.id ? { ...p, status } : p))
    );
    try {
      await base44.entities.BuildProject.update(active.id, { status });
    } catch (err) {
      setMessage("Status did not save.");
      loadProjects();
    }
  }

  async function saveNotes(value) {
    if (!active) return;
    try {
      await base44.entities.BuildProject.update(active.id, { notes: value });
    } catch (err) {
      setMessage("Notes did not save.");
    }
  }

  function toggleSection(id) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
            Plait build system
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Shopify build checklist
          </h1>
        </header>

        {message ? (
          <div className="mb-6 rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {message}
          </div>
        ) : null}

        <section className="mb-8 rounded-lg border border-stone-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <label className="block font-mono text-xs uppercase tracking-widest text-stone-500">
                Build
              </label>
              {projects.length ? (
                <select
                  value={activeId || ""}
                  onChange={(e) => setActiveId(e.target.value)}
                  className="mt-2 w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.client_name}
                      {p.status && p.status !== "active" ? ` (${p.status})` : ""}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-2 text-sm text-stone-500">
                  {loading ? "Loading." : "No builds yet. Add one to start."}
                </p>
              )}
            </div>

            <div className="flex items-end gap-2">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-stone-500">
                  New build
                </label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addProject();
                  }}
                  placeholder="Client name"
                  className="mt-2 rounded border border-stone-300 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
                />
              </div>
              <button
                onClick={addProject}
                className="rounded bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
              >
                Add build
              </button>
            </div>
          </div>

          {active ? (
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
                  Overall
                </span>
                <span className="font-mono text-sm tabular-nums">
                  {done.length} of {ALL_ITEM_IDS.length} · {overall}%
                </span>
              </div>
              <div className="mt-2 h-1 w-full bg-stone-200">
                <div
                  className="h-1 bg-emerald-700 transition-all duration-300"
                  style={{ width: `${overall}%` }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["active", "launched", "paused"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`rounded-full border px-3 py-1 text-xs capitalize ${
                      active.status === s
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-300 text-stone-600 hover:border-stone-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {active ? (
          <>
            <div className="space-y-4">
              {CHECKLIST.map((section) => {
                const { total, complete, pct } = sectionProgress(section);
                const open = openSections[section.id];
                return (
                  <section
                    key={section.id}
                    className="overflow-hidden rounded-lg border border-stone-200 bg-white"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-900"
                    >
                      <span
                        className={`h-8 w-1 rounded ${
                          pct === 100 ? "bg-emerald-700" : "bg-stone-200"
                        }`}
                      />
                      <span className="flex-1">
                        <span className="block text-base font-medium tracking-tight">
                          {section.title}
                        </span>
                        {section.note ? (
                          <span className="block text-sm text-stone-500">
                            {section.note}
                          </span>
                        ) : null}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-stone-500">
                        {complete}/{total}
                      </span>
                      <span className="text-stone-400">{open ? "−" : "+"}</span>
                    </button>

                    {open ? (
                      <ul className="border-t border-stone-100 px-5 py-2">
                        {section.items.map((item) => {
                          const checked = done.includes(item.id);
                          return (
                            <li key={item.id}>
                              <label className="flex cursor-pointer items-start gap-3 py-2">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleItem(item.id)}
                                  className="mt-1 h-4 w-4 accent-emerald-700"
                                />
                                <span
                                  className={`text-sm ${
                                    checked
                                      ? "text-stone-400 line-through"
                                      : "text-stone-800"
                                  }`}
                                >
                                  {item.text}
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </section>
                );
              })}
            </div>

            <section className="mt-8 rounded-lg border border-stone-200 bg-white p-5">
              <label className="block font-mono text-xs uppercase tracking-widest text-stone-500">
                Notes
              </label>
              <textarea
                defaultValue={active.notes || ""}
                onBlur={(e) => saveNotes(e.target.value)}
                rows={4}
                placeholder="What is blocking this build"
                className="mt-2 w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
              />
              <p className="mt-2 text-xs text-stone-500">Saves when you click away.</p>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}