import React from "react";
import { Trash2, GripVertical, Image as ImageIcon } from "lucide-react";

export default function ExampleItem({ example, api, innerRef, draggableProps, dragHandleProps }) {
  return (
    <div ref={innerRef} {...draggableProps} className="flex items-start gap-2 py-2">
      <span {...dragHandleProps} className="cursor-grab text-white/30 mt-3"><GripVertical className="w-4 h-4" /></span>
      <div className="w-12 h-12 rounded-md overflow-hidden bg-white/10 shrink-0 flex items-center justify-center">
        {example.thumbnail_url ? (
          <img src={example.thumbnail_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-5 h-5 text-white/30" />
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <input
          value={example.label || ""}
          onChange={(e) => api.set("Example", example.id, { label: e.target.value })}
          onBlur={(e) => api.commit("Example", example.id, { label: e.target.value })}
          className="w-full text-sm font-semibold text-white bg-transparent focus:bg-white/10 rounded px-1 py-0.5 focus:outline-none"
          placeholder="Label"
        />
        <input
          value={example.note || ""}
          onChange={(e) => api.set("Example", example.id, { note: e.target.value })}
          onBlur={(e) => api.commit("Example", example.id, { note: e.target.value })}
          className="w-full text-xs text-white/60 bg-transparent placeholder:text-white/30 focus:bg-white/10 rounded px-1 py-0.5 focus:outline-none"
          placeholder="Why this example for this client…"
        />
      </div>
      <button onClick={() => api.deleteExample(example.id)} className="text-white/40 hover:text-red-400">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}