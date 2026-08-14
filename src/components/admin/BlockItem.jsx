import React, { useState } from "react";
import { Trash2, Plus, GripVertical } from "lucide-react";
import ExampleItem from "./ExampleItem";
import ExamplePicker from "./ExamplePicker";
import { CONTENT_TYPES } from "@/lib/planBuilder";

export default function BlockItem({ block, examples, api, innerRef, draggableProps, dragHandle }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div ref={innerRef} {...draggableProps} className="bg-gray-50 rounded-xl border border-gray-200 p-3">
      <div className="flex items-center gap-2 mb-2">
        <span {...dragHandle} className="cursor-grab text-gray-300"><GripVertical className="w-4 h-4" /></span>
        <select
          value={block.content_type || ""}
          onChange={(e) => api.commit("Block", block.id, { content_type: e.target.value })}
          className="text-sm font-bold bg-transparent focus:outline-none"
        >
          <option value="">Content type…</option>
          {CONTENT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="number"
          min="1"
          value={block.quantity ?? ""}
          onChange={(e) => api.set("Block", block.id, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })}
          onBlur={(e) => api.commit("Block", block.id, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })}
          className="w-16 text-sm rounded border border-gray-200 px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
          placeholder="Qty"
        />
        <button onClick={() => api.deleteBlock(block.id)} className="ml-auto text-gray-400 hover:text-red-500">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <textarea
        value={block.direction || ""}
        onChange={(e) => api.set("Block", block.id, { direction: e.target.value })}
        onBlur={(e) => api.commit("Block", block.id, { direction: e.target.value })}
        rows={2}
        placeholder="Creative direction…"
        className="w-full text-sm text-gray-600 bg-white rounded border border-gray-200 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
      />
      <div className="mt-2 divide-y divide-gray-200">
        {examples.map((ex) => <ExampleItem key={ex.id} example={ex} api={api} />)}
      </div>
      <button onClick={() => setPickerOpen(true)} className="mt-2 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#2d2d2d]">
        <Plus className="w-3.5 h-3.5" /> Add example
      </button>
      <ExamplePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onAdd={(swipes) => { api.addExamples(block.id, swipes); setPickerOpen(false); }}
      />
    </div>
  );
}