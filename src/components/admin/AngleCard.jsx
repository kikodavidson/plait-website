import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Trash2, Plus, GripVertical } from "lucide-react";
import BlockItem from "./BlockItem";

export default function AngleCard({ angle, blocks, examplesForBlock, api, innerRef, draggableProps, dragHandle }) {
  const onDragEnd = (result) => api.reorderBlocks(angle.id, result);

  return (
    <div ref={innerRef} {...draggableProps} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-start gap-2 p-4 border-b border-gray-100">
        <span {...dragHandle} className="cursor-grab text-gray-300 mt-1.5"><GripVertical className="w-5 h-5" /></span>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <input
              value={angle.label || ""}
              onChange={(e) => api.set("Angle", angle.id, { label: e.target.value })}
              onBlur={(e) => api.commit("Angle", angle.id, { label: e.target.value })}
              className="font-bold text-[#2d2d2d] bg-transparent flex-1 focus:outline-none focus:bg-gray-50 rounded px-1"
            />
            <select
              value={angle.type || "audience"}
              onChange={(e) => api.commit("Angle", angle.id, { type: e.target.value })}
              className={`text-xs font-bold uppercase tracking-wide rounded-full px-2 py-1 border-0 cursor-pointer ${angle.type === "audience" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
            >
              <option value="audience">Audience</option>
              <option value="concept">Concept</option>
            </select>
            <button onClick={() => api.deleteAngle(angle.id)} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <input
            value={angle.insight || ""}
            onChange={(e) => api.set("Angle", angle.id, { insight: e.target.value })}
            onBlur={(e) => api.commit("Angle", angle.id, { insight: e.target.value })}
            placeholder="Insight…"
            className="w-full text-sm text-gray-600 bg-transparent focus:outline-none focus:bg-gray-50 rounded px-1"
          />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={angle.id} type="block">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                {blocks.map((b, i) => (
                  <Draggable key={b.id} draggableId={b.id} index={i}>
                    {(pp) => (
                      <BlockItem
                        innerRef={pp.innerRef}
                        draggableProps={pp.draggableProps}
                        dragHandle={pp.dragHandleProps}
                        block={b}
                        examples={examplesForBlock(b.id)}
                        api={api}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={() => api.addBlock(angle.id)} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2d2d2d]">
          <Plus className="w-4 h-4" /> Add block
        </button>
      </div>
    </div>
  );
}