import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NewProjectDialog from "@/components/attribution/NewProjectDialog";
import ProjectCard from "@/components/attribution/ProjectCard";
import { BUSINESS_TYPES, totalTasksFor } from "@/lib/attributionTasks";

const TYPE_BADGE = {
  shopify: "bg-emerald-100 text-emerald-800",
  custom: "bg-blue-100 text-blue-800",
  leadgen: "bg-purple-100 text-purple-800",
  app: "bg-amber-100 text-amber-800",
};

export default function AttributionDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [allProgress, setAllProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [newOpen, setNewOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [ps, tp] = await Promise.all([
      base44.entities.Project.list("-created_date"),
      base44.entities.TaskProgress.list(),
    ]);
    setProjects(ps);
    setAllProgress(tp);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const doneByProject = useMemo(() => {
    const m = {};
    allProgress.forEach((t) => {
      if (t.completed && t.project_id) m[t.project_id] = (m[t.project_id] || 0) + 1;
    });
    return m;
  }, [allProgress]);

  const filtered = projects.filter(
    (p) =>
      (typeFilter === "all" || p.business_type === typeFilter) &&
      (statusFilter === "all" || p.status === statusFilter) &&
      (!search.trim() ||
        `${p.name} ${p.client_name || ""}`.toLowerCase().includes(search.trim().toLowerCase()))
  );

  const duplicate = async (p) => {
    const copy = await base44.entities.Project.create({
      name: `${p.name} (copy)`,
      client_name: p.client_name,
      business_type: p.business_type,
      url: p.url,
      status: "active",
      notes: p.notes,
    });
    const tp = allProgress.filter((t) => t.project_id === p.id);
    if (tp.length) {
      await base44.entities.TaskProgress.bulkCreate(
        tp.map((t) => ({
          project_id: copy.id,
          task_id: t.task_id,
          completed: t.completed,
          completed_at: t.completed_at,
          note: t.note,
        }))
      );
    }
    await load();
  };

  const toggleArchive = async (p) => {
    await base44.entities.Project.update(p.id, {
      status: p.status === "archived" ? "active" : "archived",
    });
    await load();
  };

  const confirmDelete = async () => {
    const p = deleteTarget;
    if (!p) return;
    setDeleting(true);
    await base44.entities.TaskProgress.deleteMany({ project_id: p.id });
    await base44.entities.Project.delete(p.id);
    setDeleting(false);
    setDeleteTarget(null);
    await load();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attribution Tracker</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tracking and attribution setup, one project at a time.
            </p>
          </div>
          <Button onClick={() => setNewOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-1.5" /> New project
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or client"
              className="pl-9 bg-white"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-md px-3 py-2"
          >
            <option value="all">All business types</option>
            {Object.entries(BUSINESS_TYPES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-md px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="all">All statuses</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-sm text-gray-400">
            {projects.length === 0
              ? "No projects yet. Create your first one."
              : "No projects match your filters."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                done={doneByProject[p.id] || 0}
                total={totalTasksFor(p.business_type)}
                badgeClass={TYPE_BADGE[p.business_type] || ""}
                onOpen={() => navigate(`/attribution/${p.id}`)}
                onDuplicate={() => duplicate(p)}
                onArchive={() => toggleArchive(p)}
                onDelete={() => setDeleteTarget(p)}
              />
            ))}
          </div>
        )}
      </div>

      <NewProjectDialog open={newOpen} onOpenChange={setNewOpen} onCreated={load} />

      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete project?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mt-1">
            "{deleteTarget?.name}" and all its task progress will be permanently deleted. This can't be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleting}
              onClick={confirmDelete}
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}