import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const wordCls =
  "text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight text-[#1a1a1a]";

/** Feel words as large headline type: click a word to edit, small + adds a new one (max 5). */
export default function FeelWordsHeadline({ words, onAdd, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
  const [adding, setAdding] = useState(false);
  const [newWord, setNewWord] = useState("");

  const startEdit = (w) => {
    setEditingId(w.id);
    setDraft(w.word);
  };

  const commitEdit = () => {
    if (!editingId) return;
    const v = draft.trim();
    const original = words.find((w) => w.id === editingId);
    if (v && v !== original?.word) onUpdate(editingId, { word: v });
    setEditingId(null);
  };

  const removeWord = (id) => {
    onDelete(id);
    setEditingId(null);
  };

  const addNew = () => {
    const v = newWord.trim();
    if (v && words.length < 5) onAdd(v);
    setNewWord("");
    setAdding(false);
  };

  return (
    <h1 className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
      {words.map((w) =>
        editingId === w.id ? (
          <span key={w.id} className="inline-flex items-center">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEdit();
                if (e.key === "Escape") setEditingId(null);
              }}
              className={`${wordCls} max-w-[70vw] border-b-2 border-[#1a1a1a] bg-transparent outline-none`}
            />
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => removeWord(w.id)}
              aria-label={`Remove ${w.word}`}
              className="ml-2 self-center rounded-full p-1 text-[#8a857c] transition-colors hover:bg-[#ece9e3] hover:text-[#1a1a1a]"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ) : (
          <span key={w.id} onClick={() => startEdit(w)} className={`${wordCls} cursor-text`}>
            {w.word}
          </span>
        )
      )}
      {words.length < 5 &&
        (adding ? (
          <input
            autoFocus
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onBlur={addNew}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNew();
              if (e.key === "Escape") {
                setNewWord("");
                setAdding(false);
              }
            }}
            placeholder="Word"
            className={`${wordCls} w-[min(300px,60vw)] border-b-2 border-[#1a1a1a] bg-transparent text-[#1a1a1a] outline-none placeholder:text-[#c9c4ba]`}
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            aria-label="Add feel word"
            className="self-center rounded-full p-1.5 text-[#8a857c] transition-colors hover:bg-[#ece9e3] hover:text-[#1a1a1a]"
          >
            <Plus className="h-6 w-6" />
          </button>
        ))}
    </h1>
  );
}