import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const WORKSPACE = "partnership";

/** Dashboard data: every board plus its elements, kept live via subscriptions. */
export function useVibeBoardList() {
  const [boards, setBoards] = useState(null);
  const [elements, setElements] = useState(null);

  const load = useCallback(async () => {
    const [b, e] = await Promise.all([
      base44.entities.VibeBoard.filter({}, { sort: "-created_date", limit: 100 }),
      base44.entities.VibeElement.filter({}, { limit: 1000 }),
    ]);
    setBoards(b.items);
    setElements(e.items);
  }, []);

  useEffect(() => {
    load().catch(() => {
      setBoards([]);
      setElements([]);
    });
    const subs = [
      base44.entities.VibeBoard.subscribe(() => load().catch(() => {})),
      base44.entities.VibeElement.subscribe(() => load().catch(() => {})),
    ];
    return () => subs.forEach((u) => u && u());
  }, [load]);

  const createBoard = useCallback(async (name) => {
    return await base44.entities.VibeBoard.create({ name, workspace: WORKSPACE });
  }, []);

  return { boards: boards || [], elements: elements || [], loading: boards === null, createBoard };
}

/** Single board + its elements, synced live so both partners see the same canvas. */
export function useVibeBoard(boardId) {
  const [board, setBoard] = useState(null); // null = loading, false = not found
  const [elements, setElements] = useState([]);

  const load = useCallback(async () => {
    try {
      const b = await base44.entities.VibeBoard.get(boardId);
      setBoard(b);
    } catch (e) {
      setBoard(false);
      return;
    }
    const e = await base44.entities.VibeElement.filter(
      { board_id: boardId },
      { sort: "-created_date", limit: 300 }
    );
    setElements(e.items);
  }, [boardId]);

  useEffect(() => {
    if (!boardId) return;
    load().catch(() => setBoard(false));
    const subs = [
      base44.entities.VibeBoard.subscribe(() => load().catch(() => {})),
      base44.entities.VibeElement.subscribe(() => load().catch(() => {})),
    ];
    return () => subs.forEach((u) => u && u());
  }, [boardId, load]);

  const addElement = useCallback(
    async (values) => {
      const created = await base44.entities.VibeElement.create({
        board_id: boardId,
        workspace: WORKSPACE,
        ...values,
      });
      setElements((prev) => [created, ...prev]);
      return created;
    },
    [boardId]
  );

  const deleteElement = useCallback(async (id) => {
    await base44.entities.VibeElement.delete(id);
    setElements((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateBoard = useCallback(
    async (patch) => {
      setBoard((prev) => (prev ? { ...prev, ...patch } : prev));
      await base44.entities.VibeBoard.update(boardId, patch);
    },
    [boardId]
  );

  return { board, elements, addElement, deleteElement, updateBoard };
}