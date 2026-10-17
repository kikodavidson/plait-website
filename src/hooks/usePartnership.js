import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { statusLabel } from "@/components/partnership/leads/leadMeta";

const WORKSPACE = "partnership";
const DEFAULT_FOLDERS = [
  { name: "Brand Assets", icon: "palette" },
  { name: "Inspiration", icon: "sparkles" },
  { name: "Contracts", icon: "signature" },
  { name: "Legal & Tax", icon: "scale" },
  { name: "Reference Files", icon: "library" },
];
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
  const [ideas, setIdeas] = useState(null);
  const [assets, setAssets] = useState(null);
  const [folders, setFolders] = useState(null);
  const [leads, setLeads] = useState(null);
  const [leadActivities, setLeadActivities] = useState(null);
  const [pending, setPending] = useState(0);

  const loadTabs = useCallback(async () => setTabs(byOrder(await base44.entities.PartnershipTab.list())), []);
  const loadFolders = useCallback(async () => {
    let list = byOrder(await base44.entities.PartnershipFolder.list());
    if (list.length === 0) {
      const res = await base44.entities.PartnershipFolder.bulkCreate(
        DEFAULT_FOLDERS.map((f, i) => ({ ...f, order: i + 1, workspace: WORKSPACE }))
      );
      const created = Array.isArray(res) ? res : res?.records || [];
      list = byOrder(created);
    }
    setFolders(list);
  }, []);
  const loadSections = useCallback(async () => setSections(byOrder(await base44.entities.PartnershipSection.list())), []);
  const loadNotes = useCallback(async () => setNotes(await base44.entities.PartnershipNote.list()), []);
  const loadTasks = useCallback(async () => setTasks(byOrder(await base44.entities.PartnershipTask.list())), []);
  const loadQuestions = useCallback(async () => setQuestions(byOrder(await base44.entities.PartnershipQuestion.list())), []);
  const loadVersions = useCallback(async () => setVersions(byNewest(await base44.entities.PartnershipVersion.list())), []);
  const loadIdeas = useCallback(async () => setIdeas(await base44.entities.PartnershipIdea.list()), []);
  const loadAssets = useCallback(async () => setAssets(await base44.entities.PartnershipAsset.list()), []);
  const loadLeads = useCallback(async () => setLeads(await base44.entities.PartnershipLead.list()), []);
  const loadLeadActivities = useCallback(
    async () => setLeadActivities(await base44.entities.PartnershipLeadActivity.list()),
    []
  );

  useEffect(() => {
    loadTabs().catch(() => setTabs([]));
    loadFolders().catch(() => setFolders([]));
    loadSections().catch(() => setSections([]));
    loadNotes().catch(() => setNotes([]));
    loadTasks().catch(() => setTasks([]));
    loadQuestions().catch(() => setQuestions([]));
    loadVersions().catch(() => setVersions([]));
    loadIdeas().catch(() => setIdeas([]));
    loadAssets().catch(() => setAssets([]));
    loadLeads().catch(() => setLeads([]));
    loadLeadActivities().catch(() => setLeadActivities([]));
    const subs = [
      base44.entities.PartnershipTab.subscribe(() => { loadTabs().catch(() => {}); }),
      base44.entities.PartnershipFolder.subscribe(() => { loadFolders().catch(() => {}); }),
      base44.entities.PartnershipSection.subscribe(() => { loadSections().catch(() => {}); }),
      base44.entities.PartnershipNote.subscribe(() => { loadNotes().catch(() => {}); }),
      base44.entities.PartnershipTask.subscribe(() => { loadTasks().catch(() => {}); }),
      base44.entities.PartnershipQuestion.subscribe(() => { loadQuestions().catch(() => {}); }),
      base44.entities.PartnershipVersion.subscribe(() => { loadVersions().catch(() => {}); }),
      base44.entities.PartnershipIdea.subscribe(() => { loadIdeas().catch(() => {}); }),
      base44.entities.PartnershipAsset.subscribe(() => { loadAssets().catch(() => {}); }),
      base44.entities.PartnershipLead.subscribe(() => { loadLeads().catch(() => {}); }),
      base44.entities.PartnershipLeadActivity.subscribe(() => { loadLeadActivities().catch(() => {}); }),
    ];
    return () => subs.forEach((unsub) => unsub && unsub());
  }, [loadTabs, loadSections, loadNotes, loadTasks, loadQuestions, loadVersions, loadIdeas, loadAssets, loadFolders, loadLeads, loadLeadActivities]);

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
    await base44.entities.PartnershipIdea.deleteMany({ tab_id: id });
    await base44.entities.PartnershipSection.deleteMany({ tab_id: id });
    await base44.entities.PartnershipTab.delete(id);
    setTabs((prev) => (prev || []).filter((t) => t.id !== id));
    setSections((prev) => (prev || []).filter((s) => s.tab_id !== id));
    setNotes((prev) => (prev || []).filter((n) => n.tab_id !== id));
    setTasks((prev) => (prev || []).filter((t) => t.tab_id !== id));
    setQuestions((prev) => (prev || []).filter((q) => q.tab_id !== id));
    setVersions((prev) => (prev || []).filter((v) => v.tab_id !== id));
    setIdeas((prev) => (prev || []).filter((i) => i.tab_id !== id));
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
    await base44.entities.PartnershipIdea.deleteMany({ section_id: id });
    await base44.entities.PartnershipSection.delete(id);
    setSections((prev) => (prev || []).filter((s) => s.id !== id));
    setNotes((prev) => (prev || []).filter((n) => n.section_id !== id));
    setTasks((prev) => (prev || []).filter((t) => t.section_id !== id));
    setQuestions((prev) => (prev || []).filter((q) => q.section_id !== id));
    setVersions((prev) => (prev || []).filter((v) => v.section_id !== id));
    setIdeas((prev) => (prev || []).filter((i) => i.section_id !== id));
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

  // ----- idea board -----
  const addIdea = useCallback((section, text, author) => run(async () => {
    const created = await base44.entities.PartnershipIdea.create({
      tab_id: section.tab_id, section_id: section.id, text, author, workspace: WORKSPACE,
    });
    setIdeas((prev) => [created, ...(prev || [])]);
  }), [run]);

  const deleteIdea = useCallback((id) => run(async () => {
    await base44.entities.PartnershipIdea.delete(id);
    setIdeas((prev) => (prev || []).filter((i) => i.id !== id));
  }), [run]);

  const updateIdea = useCallback((id, patch) => run(async () => {
    replaceIn(setIdeas, id, patch);
    await base44.entities.PartnershipIdea.update(id, patch);
  }), [run]);

  const voteIdea = useCallback((id, partner, vote) => run(async () => {
    const key = partner === "Luke" ? "vote_luke" : "vote_max";
    const existing = (ideas || []).find((i) => i.id === id);
    const next = existing && existing[key] === vote ? null : vote; // click again to clear
    replaceIn(setIdeas, id, { [key]: next });
    await base44.entities.PartnershipIdea.update(id, { [key]: next });
  }), [ideas, run]);

  const makeFinal = useCallback((idea) => run(async () => {
    const updated = await base44.entities.PartnershipSection.update(idea.section_id, {
      content: idea.text, stage: "draft", approved_luke: false, approved_max: false,
    });
    replaceIn(setSections, idea.section_id, updated);
  }), [run]);

  const setGuidingQuestion = useCallback((id, guiding_question) =>
    patchSection(id, { guiding_question }), [patchSection]);

  // ----- discussion log -----
  const addEntry = useCallback((sectionId, tabId, body, author) => run(async () => {
    const created = await base44.entities.PartnershipNote.create({
      section_id: sectionId, tab_id: tabId, body, author, workspace: WORKSPACE,
    });
    setNotes((prev) => [created, ...(prev || [])]);
  }), [run]);

  const updateEntry = useCallback((id, patch) => run(async () => {
    replaceIn(setNotes, id, patch);
    await base44.entities.PartnershipNote.update(id, patch);
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

  // ----- folders (asset library) -----
  const addFolder = useCallback((name) => run(async () => {
    const order = (folders || []).reduce((max, f) => Math.max(max, f.order || 0), 0) + 1;
    const created = await base44.entities.PartnershipFolder.create({
      name, icon: "library", order, workspace: WORKSPACE,
    });
    setFolders((prev) => byOrder([...(prev || []), created]));
    return created;
  }), [folders, run]);

  const renameFolder = useCallback((id, name) => run(async () => {
    replaceIn(setFolders, id, { name });
    await base44.entities.PartnershipFolder.update(id, { name });
  }), [run]);

  const moveFolder = useCallback((id, dir) => run(async () => {
    const sorted = byOrder(folders);
    const i = sorted.findIndex((f) => f.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= sorted.length) return;
    const a = sorted[i];
    const b = sorted[j];
    setFolders((prev) =>
      byOrder((prev || []).map((f) =>
        f.id === a.id ? { ...f, order: b.order } : f.id === b.id ? { ...f, order: a.order } : f
      ))
    );
    await base44.entities.PartnershipFolder.bulkUpdate([
      { id: a.id, order: b.order },
      { id: b.id, order: a.order },
    ]);
  }), [folders, run]);

  const deleteFolder = useCallback((id) => run(async () => {
    await base44.entities.PartnershipAsset.deleteMany({ folder_id: id });
    await base44.entities.PartnershipFolder.delete(id);
    setFolders((prev) => (prev || []).filter((f) => f.id !== id));
    setAssets((prev) => (prev || []).filter((a) => a.folder_id !== id));
  }), [run]);

  // ----- assets (folder library) -----
  const addAsset = useCallback((values) => run(async () => {
    const created = await base44.entities.PartnershipAsset.create({ workspace: WORKSPACE, ...values });
    setAssets((prev) => [created, ...(prev || [])]);
    return created;
  }), [run]);

  const deleteAsset = useCallback((id) => run(async () => {
    await base44.entities.PartnershipAsset.delete(id);
    setAssets((prev) => (prev || []).filter((a) => a.id !== id));
  }), [run]);

  const updateAsset = useCallback((id, patch) => run(async () => {
    replaceIn(setAssets, id, patch);
    await base44.entities.PartnershipAsset.update(id, patch);
  }), [run]);

  // ----- leads -----
  const addLead = useCallback((values) => run(async () => {
    const created = await base44.entities.PartnershipLead.create({ workspace: WORKSPACE, ...values });
    setLeads((prev) => [created, ...(prev || [])]);
    return created;
  }), [run]);

  const importLeads = useCallback((records) => run(async () => {
    const res = await base44.entities.PartnershipLead.bulkCreate(
      records.map((r) => ({ workspace: WORKSPACE, ...r }))
    );
    const created = Array.isArray(res) ? res : res?.records || [];
    setLeads((prev) => [...created, ...(prev || [])]);
    return created.length;
  }), [run]);

  const updateLead = useCallback((id, patch, author) => run(async () => {
    const existing = (leads || []).find((l) => l.id === id);
    replaceIn(setLeads, id, patch);
    await base44.entities.PartnershipLead.update(id, patch);
    // Changing status logs itself so the timeline stays honest.
    if (patch.status && existing && existing.status !== patch.status) {
      const entry = await base44.entities.PartnershipLeadActivity.create({
        lead_id: id,
        body: `Status changed to ${statusLabel(patch.status)}`,
        author: author || "",
        workspace: WORKSPACE,
      });
      setLeadActivities((prev) => [entry, ...(prev || [])]);
    }
  }), [leads, run]);

  const deleteLead = useCallback((id) => run(async () => {
    await base44.entities.PartnershipLeadActivity.deleteMany({ lead_id: id });
    await base44.entities.PartnershipLead.delete(id);
    setLeads((prev) => (prev || []).filter((l) => l.id !== id));
    setLeadActivities((prev) => (prev || []).filter((a) => a.lead_id !== id));
  }), [run]);

  const addLeadActivity = useCallback((leadId, body, author) => run(async () => {
    const entry = await base44.entities.PartnershipLeadActivity.create({
      lead_id: leadId, body, author, workspace: WORKSPACE,
    });
    setLeadActivities((prev) => [entry, ...(prev || [])]);
  }), [run]);

  return {
    tabs: tabs || [],
    sections: sections || [],
    notes: notes || [],
    tasks: tasks || [],
    questions: questions || [],
    versions: versions || [],
    ideas: ideas || [],
    loaded: tabs !== null && sections !== null && notes !== null && tasks !== null && questions !== null && versions !== null && ideas !== null && assets !== null && folders !== null && leads !== null && leadActivities !== null,
    saving: pending > 0,
    addTab, renameTab, moveTab, deleteTab,
    addSection, renameSection, moveSection, deleteSection,
    setStage, saveContent, approve, unapprove, reopen,
    addIdea, deleteIdea, updateIdea, voteIdea, makeFinal, setGuidingQuestion,
    addEntry, updateEntry, deleteEntry,
    addTask, updateTask, deleteTask,
    addQuestion, updateQuestion, deleteQuestion, questionToLog,
    folders: folders || [],
    assets: assets || [],
    addFolder, renameFolder, moveFolder, deleteFolder,
    addAsset, deleteAsset, updateAsset,
    leads: leads || [],
    leadActivities: leadActivities || [],
    addLead, importLeads, updateLead, deleteLead, addLeadActivity,
  };
}