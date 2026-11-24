import { useCallback, useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { SECTIONS, WORKSPACE } from "@/lib/salesFunnel";

const SEED = SECTIONS.flatMap((section) =>
  section.items.map((title, i) => ({
    section: section.key,
    title,
    order: i + 1,
    seed_key: `${section.key}-${i}`,
    status: "not_started",
    owner: "Both",
    need_discuss: false,
    workspace: WORKSPACE,
  }))
);

const dedupeSeeds = (list) => {
  const seen = new Set();
  return list.filter((row) => {
    if (!row.seed_key) return true;
    if (seen.has(row.seed_key)) return false;
    seen.add(row.seed_key);
    return true;
  });
};

const loadItems = async () => {
  let list = dedupeSeeds(await base44.entities.SalesFunnelItem.list());
  if (list.length === 0) {
    await base44.entities.SalesFunnelItem.bulkCreate(SEED);
    list = dedupeSeeds(await base44.entities.SalesFunnelItem.list());
  }
  return list;
};

export default function useSalesFunnel() {
  const [items, setItems] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [saving, setSaving] = useState(0);
  const [saved, setSaved] = useState(false);
  const savedTimer = useRef(null);

  useEffect(() => {
    loadItems().then(setItems).catch(() => setItems([]));
    base44.entities.SalesFunnelQuestion.list().then(setQuestions).catch(() => setQuestions([]));

    const subs = [
      base44.entities.SalesFunnelItem.subscribe(() => loadItems().then(setItems).catch(() => {})),
      base44.entities.SalesFunnelQuestion.subscribe(() =>
        base44.entities.SalesFunnelQuestion.list().then(setQuestions).catch(() => {})
      ),
    ];
    return () => subs.forEach((unsub) => unsub && unsub());
  }, []);

  useEffect(() => () => clearTimeout(savedTimer.current), []);

  const run = useCallback(async (fn) => {
    setSaving((n) => n + 1);
    try {
      const result = await fn();
      setSaved(true);
      clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setSaved(false), 2200);
      return result;
    } finally {
      setSaving((n) => n - 1);
    }
  }, []);

  const updateItem = useCallback(
    (id, patch, editor) =>
      run(async () => {
        const full = { ...patch, last_editor: editor, edited_at: new Date().toISOString() };
        setItems((prev) => (prev || []).map((item) => (item.id === id ? { ...item, ...full } : item)));
        await base44.entities.SalesFunnelItem.update(id, full);
      }),
    [run]
  );

  const addQuestion = useCallback(
    (question, owner, author) =>
      run(async () => {
        const created = await base44.entities.SalesFunnelQuestion.create({
          question,
          owner,
          answered: false,
          author,
          workspace: WORKSPACE,
        });
        setQuestions((prev) => [...(prev || []), created]);
        return created;
      }),
    [run]
  );

  const toggleQuestion = useCallback(
    (id, answered) =>
      run(async () => {
        setQuestions((prev) => (prev || []).map((q) => (q.id === id ? { ...q, answered } : q)));
        await base44.entities.SalesFunnelQuestion.update(id, { answered });
      }),
    [run]
  );

  return {
    items: items || [],
    questions: questions || [],
    loaded: items !== null && questions !== null,
    saving: saving > 0,
    saved,
    updateItem,
    addQuestion,
    toggleQuestion,
  };
}