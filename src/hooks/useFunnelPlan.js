import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { SEED_TASKS, SEED_FEATURE, WORKSPACE, byOrder } from "@/lib/funnelPlan";

const dedupeSeeds = (list) => {
  const seen = new Set();
  return list.filter((row) => {
    if (!row.seed_key) return true;
    if (seen.has(row.seed_key)) return false;
    seen.add(row.seed_key);
    return true;
  });
};

const loadTasks = async () => {
  let list = dedupeSeeds(await base44.entities.FunnelTask.list());
  if (list.length === 0) {
    await base44.entities.FunnelTask.bulkCreate(
      SEED_TASKS.map((task, i) => ({
        ...task,
        owner: "Both",
        status: "not_started",
        order: i + 1,
        seed_key: `${task.phase}-${i}`,
        workspace: WORKSPACE,
      }))
    );
    list = dedupeSeeds(await base44.entities.FunnelTask.list());
  }
  return byOrder(list);
};

const loadFeatures = async () => {
  let list = byOrder(await base44.entities.FunnelFeature.list());
  if (list.length === 0) {
    await base44.entities.FunnelFeature.create({ ...SEED_FEATURE, order: 1, workspace: WORKSPACE });
    list = byOrder(await base44.entities.FunnelFeature.list());
  }
  return list;
};

export default function useFunnelPlan() {
  const [tasks, setTasks] = useState(null);
  const [comments, setComments] = useState(null);
  const [features, setFeatures] = useState(null);
  const [names, setNames] = useState(null);
  const [stepNotes, setStepNotes] = useState(null);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    loadTasks().then(setTasks).catch(() => setTasks([]));
    base44.entities.FunnelTaskComment.list()
      .then((l) => setComments([...l].sort((a, b) => new Date(a.created_date) - new Date(b.created_date))))
      .catch(() => setComments([]));
    loadFeatures().then(setFeatures).catch(() => setFeatures([]));
    base44.entities.FunnelNameIdea.list().then((l) => setNames(byOrder(l))).catch(() => setNames([]));
    base44.entities.FunnelStepNote.list().then(setStepNotes).catch(() => setStepNotes([]));

    const subs = [
      base44.entities.FunnelTask.subscribe(() => loadTasks().then(setTasks).catch(() => {})),
      base44.entities.FunnelTaskComment.subscribe(() =>
        base44.entities.FunnelTaskComment.list()
          .then((l) => setComments([...l].sort((a, b) => new Date(a.created_date) - new Date(b.created_date))))
          .catch(() => {})
      ),
      base44.entities.FunnelFeature.subscribe(() => loadFeatures().then(setFeatures).catch(() => {})),
      base44.entities.FunnelNameIdea.subscribe(() =>
        base44.entities.FunnelNameIdea.list().then((l) => setNames(byOrder(l))).catch(() => {})
      ),
      base44.entities.FunnelStepNote.subscribe(() =>
        base44.entities.FunnelStepNote.list().then(setStepNotes).catch(() => {})
      ),
    ];
    return () => subs.forEach((unsub) => unsub && unsub());
  }, []);

  const run = useCallback(async (fn) => {
    setPending((n) => n + 1);
    try {
      return await fn();
    } finally {
      setPending((n) => n - 1);
    }
  }, []);

  // ----- tasks -----
  const addTask = useCallback((values) =>
    run(async () => {
      const siblings = (tasks || []).filter((t) => t.phase === values.phase);
      const order = siblings.reduce((max, t) => Math.max(max, t.order || 0), 0) + 1;
      const created = await base44.entities.FunnelTask.create({ ...values, order, workspace: WORKSPACE });
      setTasks((prev) => byOrder([...(prev || []), created]));
      return created;
    }), [tasks, run]);

  const updateTask = useCallback((id, patch) =>
    run(async () => {
      setTasks((prev) => (prev || []).map((t) => (t.id === id ? { ...t, ...patch } : t)));
      await base44.entities.FunnelTask.update(id, patch);
    }), [run]);

  const deleteTask = useCallback((id) =>
    run(async () => {
      await base44.entities.FunnelTaskComment.deleteMany({ task_id: id });
      await base44.entities.FunnelTask.delete(id);
      setTasks((prev) => (prev || []).filter((t) => t.id !== id));
      setComments((prev) => (prev || []).filter((c) => c.task_id !== id));
    }), [run]);

  const moveTask = useCallback((id, dir) =>
    run(async () => {
      const task = (tasks || []).find((t) => t.id === id);
      if (!task) return;
      const siblings = byOrder((tasks || []).filter((t) => t.phase === task.phase));
      const i = siblings.findIndex((t) => t.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= siblings.length) return;
      const reordered = [...siblings];
      [reordered[i], reordered[j]] = [reordered[j], reordered[i]];
      const patched = reordered.map((t, index) => ({ ...t, order: index + 1 }));
      setTasks((prev) =>
        byOrder((prev || []).map((t) => {
          const found = patched.find((p) => p.id === t.id);
          return found ? { ...t, order: found.order } : t;
        }))
      );
      await base44.entities.FunnelTask.bulkUpdate(patched.map((t) => ({ id: t.id, order: t.order })));
    }), [tasks, run]);

  const addComment = useCallback((taskId, body, author) =>
    run(async () => {
      const created = await base44.entities.FunnelTaskComment.create({
        task_id: taskId, body, author, workspace: WORKSPACE,
      });
      setComments((prev) => [...(prev || []), created]);
    }), [run]);

  // ----- feature / benefit -----
  const addFeature = useCallback(() =>
    run(async () => {
      const order = (features || []).reduce((max, f) => Math.max(max, f.order || 0), 0) + 1;
      const created = await base44.entities.FunnelFeature.create({
        what_we_do: "", what_they_get: "", why_they_care: "", order, workspace: WORKSPACE,
      });
      setFeatures((prev) => byOrder([...(prev || []), created]));
      return created;
    }), [features, run]);

  const updateFeature = useCallback((id, patch) =>
    run(async () => {
      setFeatures((prev) => (prev || []).map((f) => (f.id === id ? { ...f, ...patch } : f)));
      await base44.entities.FunnelFeature.update(id, patch);
    }), [run]);

  const deleteFeature = useCallback((id) =>
    run(async () => {
      await base44.entities.FunnelFeature.delete(id);
      setFeatures((prev) => (prev || []).filter((f) => f.id !== id));
    }), [run]);

  // ----- name ideas -----
  const addName = useCallback((formula, name) =>
    run(async () => {
      const order = (names || []).filter((n) => n.formula === formula)
        .reduce((max, n) => Math.max(max, n.order || 0), 0) + 1;
      const created = await base44.entities.FunnelNameIdea.create({
        formula, name, votes_luke: 0, votes_max: 0, order, workspace: WORKSPACE,
      });
      setNames((prev) => byOrder([...(prev || []), created]));
      return created;
    }), [names, run]);

  const updateName = useCallback((id, patch) =>
    run(async () => {
      setNames((prev) => (prev || []).map((n) => (n.id === id ? { ...n, ...patch } : n)));
      await base44.entities.FunnelNameIdea.update(id, patch);
    }), [run]);

  const deleteName = useCallback((id) =>
    run(async () => {
      await base44.entities.FunnelNameIdea.delete(id);
      setNames((prev) => (prev || []).filter((n) => n.id !== id));
    }), [run]);

  const voteName = useCallback((id, partner, delta) =>
    run(async () => {
      const idea = (names || []).find((n) => n.id === id);
      if (!idea) return;
      const key = partner === "Luke" ? "votes_luke" : "votes_max";
      const next = Math.max(0, (idea[key] || 0) + delta);
      setNames((prev) => (prev || []).map((n) => (n.id === id ? { ...n, [key]: next } : n)));
      await base44.entities.FunnelNameIdea.update(id, { [key]: next });
    }), [names, run]);

  // ----- funnel step notes -----
  const saveStepNotes = useCallback((step, notes) =>
    run(async () => {
      const existing = (stepNotes || []).find((s) => s.step === step);
      if (existing) {
        if ((existing.notes || "") === notes) return;
        setStepNotes((prev) => (prev || []).map((s) => (s.id === existing.id ? { ...s, notes } : s)));
        await base44.entities.FunnelStepNote.update(existing.id, { notes });
      } else {
        const created = await base44.entities.FunnelStepNote.create({ step, notes, workspace: WORKSPACE });
        setStepNotes((prev) => [...(prev || []), created]);
      }
    }), [stepNotes, run]);

  return {
    tasks: tasks || [],
    comments: comments || [],
    features: features || [],
    names: names || [],
    stepNotes: stepNotes || [],
    loaded: tasks !== null && comments !== null && features !== null && names !== null && stepNotes !== null,
    saving: pending > 0,
    addTask, updateTask, deleteTask, moveTask, addComment,
    addFeature, updateFeature, deleteFeature,
    addName, updateName, deleteName, voteName,
    saveStepNotes,
  };
}