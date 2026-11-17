import React, { useEffect, useRef, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

export default function ServiceRow({ service, onSave, onDelete }) {
  const [name, setName] = useState(service.name || "");
  const [items, setItems] = useState(service.deliverables || []);
  const lastAdded = useRef(null);

  useEffect(() => {
    setName(service.name || "");
    setItems(service.deliverables || []);
  }, [service.id]);

  useEffect(() => {
    if (lastAdded.current === null) return;
    const input = document.getElementById(`deliverable-${service.id}-${lastAdded.current}`);
    if (input) input.focus();
    lastAdded.current = null;
  }, [items, service.id]);

  const commit = (next) => {
    setItems(next);
    onSave({ deliverables: next.filter((d) => d.trim()) });
  };

  const addItem = () => {
    lastAdded.current = items.length;
    setItems([...items, ""]);
  };

  const changeItem = (index, value) => {
    setItems(items.map((d, i) => (i === index ? value : d)));
  };

  const removeItem = (index) => {
    commit(items.filter((_, i) => i !== index));
  };

  const blurItem = (index) => {
    const cleaned = items.map((d, i) => (i === index ? d.trim() : d));
    commit(cleaned);
  };

  return (
    <div className="rounded-2xl border border-[#e5e2dc] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#619e80]" />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            const next = name.trim();
            setName(next);
            if (next !== (service.name || "")) onSave({ name: next });
          }}
          placeholder="Service name"
          className="min-w-0 flex-1 bg-transparent text-base font-extrabold text-[#1a1a1a] outline-none placeholder:text-[#b3aea6]"
        />
        <button
          onClick={onDelete}
          className="shrink-0 rounded-full p-1.5 text-[#b3aea6] transition-colors hover:bg-[#fdece8] hover:text-[#b0532f]"
          aria-label="Delete service"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <ul className="mt-3 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="group flex items-center gap-2">
            <span className="text-[#c9c4bb]">–</span>
            <input
              id={`deliverable-${service.id}-${index}`}
              value={item}
              onChange={(e) => changeItem(index, e.target.value)}
              onBlur={() => blurItem(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem();
                }
              }}
              placeholder="Deliverable"
              className="min-w-0 flex-1 border-b border-transparent bg-transparent py-1 text-[13.5px] text-[#1a1a1a] outline-none placeholder:text-[#c9c4bb] focus:border-[#e5e2dc]"
            />
            <button
              onClick={() => removeItem(index)}
              className="shrink-0 rounded p-1 text-[#d6d1c8] opacity-0 transition-opacity hover:text-[#b0532f] group-hover:opacity-100"
              aria-label="Remove deliverable"
            >
              <X className="h-3 w-3" />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={addItem}
        className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a] transition-colors hover:text-[#1a1a1a]"
      >
        <Plus className="h-3 w-3 text-[#619e80]" /> Add deliverable
      </button>
    </div>
  );
}