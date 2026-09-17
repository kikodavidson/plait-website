import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, ExternalLink, Download, AlertTriangle, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import TaskSection from "@/components/attribution/TaskSection";
import { BUSINESS_TYPES, sectionsFor, totalTasksFor } from "@/lib/attributionTasks";

const TYPE_BADGE = {
  shopify: "bg-emerald-100 text-emerald-800",
  custom: "bg-blue-100 text-blue-800",
  leadgen: "bg-purple-100 text-purple-800",
  app: "bg-amber-100 text-amber-800",
};

const escapeCSV = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export default function AttributionProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [openTitles, setOpenTitles] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const p = await base44.entities.Project.get(projectId);
        if (cancelled) return;
        setProject(p);
        setNotes(p.notes || "");
        setOpenTitles(new Set(sectionsFor(p.business_type).map((s) => s.title)));
        const tp = await base44.entities.TaskProgress.filter({ project_id: projectId });
        if (!cancelled) setProgressList(tp);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const progressByTask = useMemo(() => {
    const m = {};
    progressList.forEach((p) => {
      m[p.task_id] = p;
    });
    return m;
  }, [progressList]);

  const sections = useMemo(
    () => (project ? sectionsFor(project.business_type) : []),
    [project]
  );

  const total = project ? totalTasksFor(project.business_type) : 0;
  const done = sections.reduce(
    (n, s) => n + s.tasks.filter((t) => progressByTask[t.id]?.completed).length,
    0
  );
  const pct = total ? Math.round((done / total) * 100) : 0;

  const toggleTask = async (taskId, checked) => {
    const patch = {
      completed: checked,
      completed_at: checked ? format(new Date(), "yyyy-MM-dd") : null,
    };
    const existing = progressByTask[taskId];
    if (existing) {
      await base44.entities.TaskProgress.update(existing.id, patch);
      setProgressList((prev) =>
        prev.map((p) => (p.id === existing.id ? { ...p, ...patch } : p))
      );
    } else {
      const rec = await base44.entities.TaskProgress.create({
        project_id: projectId,
        task_id: taskId,
        ...patch,
      });
      setProgressList((prev) => [...prev, rec]);
    }
  };

  const saveNote = async (taskId, note) => {
    const existing = progressByTask[taskId];
    if (existing) {
      await base44.entities.TaskProgress.update(existing.id, { note });
      setProgressList((prev) =>
        prev.map((p) => (p.id === existing.id ? { ...p, note } : p))
      );
    } else if (note) {
      const rec = await base44.entities.TaskProgress.create({
        project_id: projectId,
        task_id: taskId,
        completed: false,
        completed_at: null,
        note,
      });
      setProgressList((prev) => [...prev, rec]);
    }
  };

  const saveNotes = async () => {
    if (!project || project.notes === notes) return;
    await base44.entities.Project.update(project.id, { notes });
    setProject((p) => ({ ...p, notes }));
  };

  const exportCSV = () => {
    const rows = [["Section", "Task", "Done", "Completed", "Note"]];
    sections.forEach((s) =>
      s.tasks.forEach((t) => {
        const p = progressByTask[t.id];
        rows.push([
          s.title,
          t.task,
          p?.completed ? "Yes" : "No",
          p?.completed_at || "",
          p?.note || "",
        ]);
      })
    );
    const csv = rows.map((r) => r.map(escapeCSV).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${project.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-attribution.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-gray-500">Project not found.</p>
        <Link to="/attribution" className="text-sm text-orange-600 hover:underline">
          Back to projects
        </Link>
      </div>
    );
  }

  const typeInfo = BUSINESS_TYPES[project.business_type];
  const isOpen = (title) => openTitles?.has(title);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/attribution"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All projects
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <span
                className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${TYPE_BADGE[project.business_type] || ""}`}
              >
                {typeInfo?.label || project.business_type}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1.5">
              {project.client_name || "No client"}
              {project.url && (
                <>
                  {" · "}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 hover:underline inline-flex items-center gap-1"
                  >
                    {project.url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </p>
          </div>
          <Button variant="outline" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-1.5" /> Export
          </Button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-bold text-gray-900">
              {pct}% <span className="text-gray-400 font-normal">· {done} of {total} done</span>
            </span>
          </div>
          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mt-6">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">{typeInfo?.top_note}</p>
        </div>

        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Notes</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            placeholder="Project notes…"
            className="mt-1.5 bg-white"
            rows={3}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-8 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Switch checked={showOnlyIncomplete} onCheckedChange={setShowOnlyIncomplete} />
            <span>Show only incomplete</span>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenTitles(new Set(sections.map((s) => s.title)))}
            >
              Expand all
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpenTitles(new Set())}>
              Collapse all
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {sections.map((s) => (
            <TaskSection
              key={s.title}
              section={s}
              open={!!isOpen(s.title)}
              onToggleOpen={() =>
                setOpenTitles((prev) => {
                  const next = new Set(prev || []);
                  if (next.has(s.title)) next.delete(s.title);
                  else next.add(s.title);
                  return next;
                })
              }
              progressByTask={progressByTask}
              onToggleTask={toggleTask}
              onNote={saveNote}
              showOnlyIncomplete={showOnlyIncomplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}