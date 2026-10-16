import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const WORKSPACE = "partnership";
const byOrder = (list) => [...(list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

export default function usePartnership() {
  const [tabs, setTabs] = useState(null);
  const [notes, setNotes] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [pending, setPending] = useState(0);

  const loadTabs = useCallback(async () => setTabs(byOrder(await base44.entities.PartnershipTab.list())), []);
  const loadNotes = useCallback(async () => setNotes(byOrder(await base44.entities.PartnershipNote.list())), []);
  const loadTasks = useCallback(async () => setTasks(byOrder(await base44.entities.PartnershipTask.list())), []);
  const loadQuestions = useCallback(async () => setQuestions(byOrder(await base44.entities.PartnershipQuestion.list())), []);

  useEffect(() => {
    loadTabs().catch(() => setTabs([]));
    loadNotes().catch(() => setNotes([]));
    loadTasks().catch(() => setTasks([]));
    loadQuestions().catch(() => setQuestions([]));
    const subs = [
      base44.entities.PartnershipTab.subscribe(() => { loadTabs().catch(() => {}); }),
      base44.entities.PartnershipNote.subscribe(() => { loadNotes().catch(() => {}); }),
      base44.entities.PartnershipTask.subscribe(() => { loadTasks().catch(() => {}); }),
      base44.entities.PartnershipQuestion.subscribe(() => { loadQuestions().catch(() => {}); }),
    ];
    return () => subs.forEach((unsub) => unsub && unsub());
  }, [loadTabs, loadNotes, loadTasks, loadQuestions]);

  const run = useCallback(async (fn) => {
    setPending((n) => n + 1);
    try {
      return await fn();
    } finally {
      setPending((n) => n - 1);
    }
  }, []);

  const nextOrder = (list, tabId) =>
    (list || []).filter((r) => !tabId || r.tab_id === tabId).reduce((max, r) => Math.max(max, r.order || 0), 0) + 1;

  const addTab = useCallback((name) => run(async () => {
    const created = await base44.entities.PartnershipTab.create({ name, order: nextOrder(tabs), workspace: WORKSPACE });
    setTabs((prev) => byOrder([...(prev || []), created]));
    return created;
  }), [tabs, run]);

  const renameTab = useCallback((id, name) => run(async () => {
    setTabs((prev) => (prev || []).map((t) => (t.id === id ? { ...t, name } : t)));
    await base44.entities.PartnershipTab.update(id, { name });
  }), [run]);

  const moveTab = useCallback((id, dir) => run(async () => {
    const sorted = byOrder(tabs);
    const i = sorted.findIndex((t) => t.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= sorted.length) return;
    const a = sorted[i];
    const b = sorted[j];
    setTabs((prev) =>
      byOrder((prev || []).map((t) =>
        t.id === a.id ? { ...t, order: b.order } : t.id === b.id ? { ...t, order: a.order } : t
      ))
    );
    await base44.entities.PartnershipTab.bulkUpdate([
      { id: a.id, order: b.order },
      { id: b.id, order: a.order },
    ]);
  }), [tabs, run]);

  const deleteTab = useCallback((id) => run(async () => {
    await base44.entities.PartnershipNote.deleteMany({ tab_id: id });
    await base44.entities.PartnershipTask.deleteMany({ tab_id: id });
    await base44.entities.PartnershipQuestion.deleteMany({ tab_id: id });
    await base44.entities.PartnershipTab.delete(id);
    setTabs((prev) => (prev || []).filter((t) => t.id !== id));
    setNotes((prev) => (prev || []).filter((n) => n.tab_id !== id));
    setTasks((prev) => (prev || []).filter((t) => t.tab_id !== id));
    setQuestions((prev) => (prev || []).filter((q) => q.tab_id !== id));
  }), [run]);

  const addNote = useCallback((tabId, values) => run(async () => {
    const created = await base44.entities.PartnershipNote.create({
      tab_id: tabId, order: nextOrder(notes, tabId), workspace: WORKSPACE, ...values,
    });
    setNotes((prev) => byOrder([...(prev || []), created]));
    return created;
  }), [notes, run]);

  const updateNote = useCallback((id, patch) => run(async () => {
    setNotes((prev) => (prev || []).map((n) => (n.id === id ? { ...n, ...patch } : n)));
    await base44.entities.PartnershipNote.update(id, patch);
  }), [run]);

  const deleteNote = useCallback((id) => run(async () => {
    await base44.entities.PartnershipNote.delete(id);
    setNotes((prev) => (prev || []).filter((n) => n.id !== id));
  }), [run]);

  const addTask = useCallback((tabId, values) => run(async () => {
    const created = await base44.entities.PartnershipTask.create({
      tab_id: tabId, order: nextOrder(tasks, tabId), workspace: WORKSPACE, ...values,
    });
    setTasks((prev) => byOrder([...(prev || []), created]));
    return created;
  }), [tasks, run]);

  const updateTask = useCallback((id, patch) => run(async () => {
    setTasks((prev) => (prev || []).map((t) => (t.id === id ? { ...t, ...patch } : t)));
    await base44.entities.PartnershipTask.update(id, patch);
  }), [run]);

  const deleteTask = useCallback((id) => run(async () => {
    await base44.entities.PartnershipTask.delete(id);
    setTasks((prev) => (prev || []).filter((t) => t.id !== id));
  }), [run]);

  const addQuestion = useCallback((tabId, values) => run(async () => {
    const created = await base44.entities.PartnershipQuestion.create({
      tab_id: tabId, order: nextOrder(questions, tabId), workspace: WORKSPACE, ...values,
    });
    setQuestions((prev) => byOrder([...(prev || []), created]));
    return created;
  }), [questions, run]);

  const updateQuestion = useCallback((id, patch) => run(async () => {
    setQuestions((prev) => (prev || []).map((q) => (q.id === id ? { ...q, ...patch } : q)));
    await base44.entities.PartnershipQuestion.update(id, patch);
  }), [run]);

  const deleteQuestion = useCallback((id) => run(async () => {
    await base44.entities.PartnershipQuestion.delete(id);
    setQuestions((prev) => (prev || []).filter((q) => q.id !== id));
  }), [run]);

  const questionToNote = useCallback((question, author) => addNote(question.tab_id, {
    title: question.question,
    body: question.answer || "",
    status: "decided",
    author,
  }), [addNote]);

  return {
    tabs: tabs || [],
    notes: notes || [],
    tasks: tasks || [],
    questions: questions || [],
    loaded: tabs !== null && notes !== null && tasks !== null && questions !== null,
    saving: pending > 0,
    addTab, renameTab, moveTab, deleteTab,
    addNote, updateNote, deleteNote,
    addTask, updateTask, deleteTask,
    addQuestion, updateQuestion, deleteQuestion, questionToNote,
  };
}