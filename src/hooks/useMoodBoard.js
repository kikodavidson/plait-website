import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const WORKSPACE = "partnership";

/** Mood board data: references and feel words, synced live between the partners. */
export function useMoodBoard() {
  const [items, setItems] = useState(null);
  const [words, setWords] = useState(null);

  const load = useCallback(async () => {
    const [i, w] = await Promise.all([
      base44.entities.MoodItem.filter({}, { sort: "-created_date", limit: 500 }),
      base44.entities.MoodFeelWord.filter({}, { sort: "order", limit: 10 }),
    ]);
    setItems(i.items);
    setWords(w.items);
  }, []);

  useEffect(() => {
    load().catch(() => {
      setItems([]);
      setWords([]);
    });
    const subs = [
      base44.entities.MoodItem.subscribe(() => load().catch(() => {})),
      base44.entities.MoodFeelWord.subscribe(() => load().catch(() => {})),
    ];
    return () => subs.forEach((u) => u && u());
  }, [load]);

  const addItem = useCallback(
    async (values) => {
      return await base44.entities.MoodItem.create({ workspace: WORKSPACE, ...values });
    },
    []
  );

  const updateItem = useCallback(async (id, patch) => {
    await base44.entities.MoodItem.update(id, patch);
  }, []);

  const deleteItem = useCallback(async (id) => {
    await base44.entities.MoodItem.delete(id);
    setItems((prev) => (prev || []).filter((i) => i.id !== id));
  }, []);

  const addWord = useCallback(
    async (word, addedBy) => {
      return await base44.entities.MoodFeelWord.create({
        workspace: WORKSPACE,
        word,
        added_by: addedBy,
        order: Date.now(),
      });
    },
    []
  );

  const updateWord = useCallback(async (id, patch) => {
    await base44.entities.MoodFeelWord.update(id, patch);
  }, []);

  const deleteWord = useCallback(async (id) => {
    await base44.entities.MoodFeelWord.delete(id);
    setWords((prev) => (prev || []).filter((w) => w.id !== id));
  }, []);

  return {
    items: items || [],
    words: words || [],
    loading: items === null,
    addItem,
    updateItem,
    deleteItem,
    addWord,
    updateWord,
    deleteWord,
  };
}