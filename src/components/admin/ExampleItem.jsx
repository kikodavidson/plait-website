import React from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";

export default function ExampleItem({ example, api }) {
  return (
    <div className="flex items-start gap-2 py-2">
      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center">
        {example.thumbnail_url ? (
          <img src={example.thumbnail_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-5 h-5 text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <input
          value={example.label || ""}
          onChange={(e) => api.set("Example", example.id, { label: e.target.value })}
          onBlur={(e) => api.commit("Example", example.id, { label: e.target.value })}
          className="w-full text-sm font-semibold text-[#2d2d2d] bg-transparent focus:bg-gray-100 rounded px-1 py-0.5 focus:outline-none"
          placeholder="Label"
        />
        <input
          value={example.note || ""}
          onChange={(e) => api.set("Example", example.id, { note: e.target.value })}
          onBlur={(e) => api.commit("Example", example.id, { note: e.target.value })}
          className="w-full text-xs text-gray-600 bg-transparent focus:bg-gray-100 rounded px-1 py-0.5 focus:outline-none"
          placeholder="Why this example for this client…"
        />
      </div>
      <button onClick={() => api.deleteExample(example.id)} className="text-gray-400 hover:text-red-500">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}