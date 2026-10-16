import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const WORKSPACE = "partnership";
const byOrder = (list) => [...(list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
const byNewest = (list) =>
  [...(list || [])].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

export default function usePartnership() {
  const [tabs, setTabs] = useState(null);
  const [sections, setSections] = useState(null);
  const [notes, setNotes] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [versions, setVersions] = useState(null);
  const [pending, setPending] = useState(0);

  const loadTabs = useCallback(async () => setTabs(byOrder(await base44.entities.PartnershipTab.list())), []);
  const loadSections = useCallback(async () => setSections(byOrder(await base44.entities.PartnershipSection.list())), []);
  const loadNotes = useCallback(async () => setNotes(await base44.entities.PartnershipNote.list()), []);
  const loadTasks = useCallback(async () => setTasks(byOrder(await base44.entities.PartnershipTask.list())), []);
  const loadQuestions = useCallback(async () => setQuestions(byOrder(await base44.entities.PartnershipQuestion.list())), []);
  const loadVersions = useCallback(async () => setVersions(byNewest(await base44.entities.PartnershipVersion.list())), []);

  useEffect(() => {
    loadTabs().catch(() => setTabs([]));
    loadSections().catch(() => setSections([]));
    loadNotes().catch(() => setNotes([]));
    loadTasks().catch(() => setTasks([]));
    loadQuestions().catch(() => setQuestions([]));
    loadVersions().catch(() => setVersions([]));
    const subs = [
      base44.entities.PartnershipTab.subscribe(() => { loadTabs().catch(() => {}); }),
      base44.entities.PartnershipSection.subscribe(() => { loadSections().catch(() => {}); }),
      base44.entities.PartnershipNote.subscribe(() => { loadNotes().catch(() => {}); }),
      base44.entities.PartnershipTask.subscribe(() => { loadTasks().catch(() => {}); }),
      base44.entities.PartnershipQuestion.subscribe(() => { loadQuestions().catch(() => {}); }),
      base44.entities.PartnershipVersion.subscribe(() => { loadVersions().catch(() => {}); }),
    ];
    return () => subs.forEach((unsub) => unsub && unsub());
  }, [loadTabs, loadSections, loadNotes, loadTasks, loadQuestions, loadVersions]);

  const run = useCallback(async (fn) => {
    setPending((n) => n + 1);
    try {
      return await fn();
    } finally {
      setPending((n) => n - 1);
    }
  }, []);

  const nextOrder = (list, key, val) =>
    (list || []).filter((r) => r[key] === val).reduce((max, r) => Math.max(max, r.order || 0), 0) + 1;

  const replaceIn = (setter, id, patch) =>
    setter((prev) => (prev || []).map((r) => (r.id === id ? { ...r, ...patch } : r)));

  // ----- tabs -----
  const addTab = useCallback((name) => run(async () => {
    const created = await base44.entities.PartnershipTab.create({ name, order: nextOrder(tabs, "tab", null), workspace: WORKSPACE });
    setTabs((prev) => byOrder([...(prev || []), created]));
    return created;
  }), [tabs, run]);

  const renameTab = useCallback((id, name) => run(async () => {
    replaceIn(setTabs, id, { name });
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
    await base44.entities.PartnershipVersion.deleteMany({ tab_id: id });
    await base44.entities.PartnershipSection.deleteMany({ tab_id: id });
    await base44.entities.PartnershipTab.delete(id);
    setTabs((prev) => (prev || []).filter((t) => t.id !== id));
    setSections((prev) => (prev || []).filter((s) => s.tab_id !== id));
    setNotes((prev) => (prev || []).filter((n) => n.tab_id !== id));
    setTasks((prev) => (prev || []).filter((t) => t.tab_id !== id));
    setQuestions((prev) => (prev || []).filter((q) => q.tab_id !== id));
    setVersions((prev) => (prev || []).filter((v) => v.tab_id !== id));
  }), [run]);

  // ----- sections -----
  const addSection = useCallback((tabId, name) => run(async () => {
    const created = await base44.entities.PartnershipSection.create({
      tab_id: tabId, name, order: nextOrder(sections, "tab_id", tabId),
      stage: "not_started", content: "", approved_luke: false, approved_max: false, workspace: WORKSPACE,
    });
    setSections((prev) => byOrder([...(prev || []), created]));
    return created;
  }), [sections, run]);

  const renameSection = useCallback((id, name) => run(async () => {
    replaceIn(setSections, id, { name });
    await base44.entities.PartnershipSection.update(id, { name });
  }), [run]);

  const moveSection = useCallback((id, dir) => run(async () => {
    const target = (sections || []).find((s) => s.id === id);
    if (!target) return;
    const sorted = byOrder((sections || []).filter((s) => s.tab_id === target.tab_id));
    const i = sorted.findIndex((s) => s.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= sorted.length) return;
    const a = sorted[i];
    const b = sorted[j];
    setSections((prev) =>
      byOrder((prev || []).map((s) =>
        s.id === a.id ? { ...s, order: b.order } : s.id === b.id ? { ...s, order: a.order } : s
      ))
    );
    await base44.entities.PartnershipSection.bulkUpdate([
      { id: a.id, order: b.order },
      { id: b.id, order: a.order },
    ]);
  }), [sections, run]);

  const deleteSection = useCallback((id) => run(async () => {
    await base44.entities.PartnershipNote.deleteMany({ section_id: id });
    await base44.entities.PartnershipTask.deleteMany({ section_id: id });
    await base44.entities.PartnershipQuestion.deleteMany({ section_id: id });
    await base44.entities.PartnershipVersion.deleteMany({ section_id: id });
    await base44.entities.PartnershipSection.delete(id);
    setSections((prev) => (prev || []).filter((s) => s.id !== id));
    setNotes((prev) => (prev || []).filter((n) => n.section_id !== id));
    setTasks((prev) => (prev || []).filter((t) => t.section_id !== id));
    setQuestions((prev) => (prev || []).filter((q) => q.section_id !== id));
    setVersions((prev) => (prev || []).filter((v) => v.section_id !== id));
  }), [run]);

  const patchSection = useCallback((id, patch) => run(async () => {
    replaceIn(setSections, id, patch);
    await base44.entities.PartnershipSection.update(id, patch);
  }), [run]);

  const setStage = useCallback((id, stage) => {
    if (stage === "locked") return; // locking only happens through both approvals
    return patchSection(id, { stage, approved_luke: false, approved_max: false });
  }, [patchSection]);

  const saveContent = useCallback((id, content) => {
    const s = (sections || []).find((x) => x.id === id);
    if (s && s.content === content) return;
    return patchSection(id, { content, approved_luke: false, approved_max: false });
  }, [sections, patchSection]);

  const approve = useCallback((id, me) => run(async () => {
    const s = (sections || []).find((x) => x.id === id);
    if (!s || s.stage === "locked") return;
    const key = me === "Luke" ? "approved_luke" : me === "Max" ? "approved_max" : null;
    if (!key) return;
    const otherKey = key === "approved_luke" ? "approved_max" : "approved_luke";
    const patch = { [key]: true };
    if (s[otherKey]) patch.stage = "locked";
    const updated = await base44.entities.PartnershipSection.update(id, patch);
    replaceIn(setSections, id, updated);
    if (patch.stage === "locked") {
      const v = await base44.entities.PartnershipVersion.create({
        section_id: id, tab_id: s.tab_id, kind: "locked",
        content: s.content || "", approved_by: ["Luke", "Max"], workspace: WORKSPACE,
      });
      setVersions((prev) => [v, ...(prev || [])]);
    }
  }), [sections, run]);

  const unapprove = useCallback((id, me) => {
    const key = me === "Luke" ? "approved_luke" : "approved_max";
    return patchSection(id, { [key]: false });
  }, [patchSection]);

  const reopen = useCallback((id, reason) => run(async () => {
    const s = (sections || []).find((x) => x.id === id);
    if (!s || s.stage !== "locked") return;
    const v = await base44.entities.PartnershipVersion.create({
      section_id: id, tab_id: s.tab_id, kind: "reopen", reason, workspace: WORKSPACE,
    });
    const updated = await base44.entities.PartnershipSection.update(id, {
      stage: "in_discussion", approved_luke: false, approved_max: false,
    });
    replaceIn(setSections, id, updated);
    setVersions((prev) => [v, ...(prev || [])]);
  }), [sections, run]);

  // ----- discussion log -----
  const addEntry = useCallback((sectionId, tabId, body, author) => run(async () => {
    const created = await base44.entities.PartnershipNote.create({
      section_id: sectionId, tab_id: tabId, body, author, workspace: WORKSPACE,
    });
    setNotes((prev) => [created, ...(prev || [])]);
  }), [run]);

  const deleteEntry = useCallback((id) => run(async () => {
    await base44.entities.PartnershipNote.delete(id);
    setNotes((prev) => (prev || []).filter((n) => n.id !== id));
  }), [run]);

  // ----- tasks (section-scoped) -----
  const addTask = useCallback((section, values) => run(async () => {
    const created = await base44.entities.PartnershipTask.create({
      tab_id: section.tab_id, section_id: section.id,
      order: nextOrder(tasks, "section_id", section.id), workspace: WORKSPACE, ...values,
    });
    setTasks((prev) => byOrder([...(prev || []), created]));
  }), [tasks, run]);

  const updateTask = useCallback((id, patch) => run(async () => {
    replaceIn(setTasks, id, patch);
    await base44.entities.PartnershipTask.update(id, patch);
  }), [run]);

  const deleteTask = useCallback((id) => run(async () => {
    await base44.entities.PartnershipTask.delete(id);
    setTasks((prev) => (prev || []).filter((t) => t.id !== id));
  }), [run]);

  // ----- questions (section-scoped) -----
  const addQuestion = useCallback((section, values) => run(async () => {
    const created = await base44.entities.PartnershipQuestion.create({
      tab_id: section.tab_id, section_id: section.id,
      order: nextOrder(questions, "section_id", section.id), workspace: WORKSPACE, ...values,
    });
    setQuestions((prev) => byOrder([...(prev || []), created]));
  }), [questions, run]);

  const updateQuestion = useCallback((id, patch) => run(async () => {
    replaceIn(setQuestions, id, patch);
    await base44.entities.PartnershipQuestion.update(id, patch);
  }), [run]);

  const deleteQuestion = useCallback((id) => run(async () => {
    await base44.entities.PartnershipQuestion.delete(id);
    setQuestions((prev) => (prev || []).filter((q) => q.id !== id));
  }), [run]);

  const questionToLog = useCallback((question, author) =>
    addEntry(question.section_id, question.tab_id,
      `${question.question}\nAnswer: ${question.answer || ""}`, author), [addEntry]);

  return {
    tabs: tabs || [],
    sections: sections || [],
    notes: notes || [],
    tasks: tasks || [],
    questions: questions || [],
    versions: versions || [],
    loaded: tabs !== null && sections !== null && notes !== null && tasks !== null && questions !== null && versions !== null,
    saving: pending > 0,
    addTab, renameTab, moveTab, deleteTab,
    addSection, renameSection, moveSection, deleteSection,
    setStage, saveContent, approve, unapprove, reopen,
    addEntry, deleteEntry,
    addTask, updateTask, deleteTask,
    addQuestion, updateQuestion, deleteQuestion, questionToLog,
  };
}