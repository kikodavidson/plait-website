import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Trash2, Plus, GripVertical } from "lucide-react";
import ExampleItem from "./ExampleItem";
import ExamplePicker from "./ExamplePicker";
import { CONTENT_TYPES, VIDEO_FORMATS, ON_CAMERA, VIDEO_PRODUCTION_TIERS, IMAGE_STYLES, IMAGE_SUBJECTS, IMAGE_PRODUCTION_TIERS, CAROUSEL_STYLES, SLIDE_COUNTS, CAROUSEL_PRODUCTION_TIERS } from "@/lib/planBuilder";

const settingSelect =
  "w-full text-xs rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/80 px-2 py-1.5 focus:outline-none hover:border-white/20 focus:border-purple-400/40 transition-colors";

export default function BlockItem({ block, examples, api, innerRef, draggableProps, dragHandle }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [replacing, setReplacing] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const openPicker = (example) => {
    setReplacing(example || null);
    setPickerOpen(true);
  };

  const handleAdd = (swipes) => {
    if (replacing) {
      if (swipes[0]) api.replaceExample(replacing, swipes[0]);
    } else {
      api.addExamples(block.id, swipes);
    }
    setPickerOpen(false);
    setReplacing(null);
  };

  return (
    <div ref={innerRef} {...draggableProps} className="rounded-xl bg-white/[0.03] border border-white/10">
      {/* Block header — title, quantity, delete */}
      <div className="flex items-center gap-2 px-3.5 pt-3">
        <span {...dragHandle} className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50 transition-colors">
          <GripVertical className="w-4 h-4" />
        </span>
        <select
          value={block.content_type || ""}
          onChange={(e) => api.commit("Block", block.id, { content_type: e.target.value })}
          className="text-sm font-semibold text-white bg-transparent focus:outline-none cursor-pointer"
        >
          <option value="" className="bg-[#141416]">Content type…</option>
          {CONTENT_TYPES.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
        </select>
        <input
          type="number"
          min="1"
          value={block.quantity ?? ""}
          onChange={(e) => api.set("Block", block.id, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })}
          onBlur={(e) => api.commit("Block", block.id, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })}
          className="w-12 text-xs text-white/40 bg-transparent focus:outline-none focus:text-white rounded px-1 py-0.5"
          placeholder="Qty"
          title="Quantity"
        />
        <button onClick={() => api.deleteBlock(block.id)} className="ml-auto text-white/20 hover:text-red-400 transition-colors" title="Delete block">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Type settings — compact, quiet */}
      {block.content_type && (
        <div className="px-3.5 pt-2.5">
          {block.content_type === "Video" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              <select value={block.video_format || ""} onChange={(e) => api.commit("Block", block.id, { video_format: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">Video format…</option>
                {VIDEO_FORMATS.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
              <select value={block.on_camera || ""} onChange={(e) => api.commit("Block", block.id, { on_camera: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">On camera…</option>
                {ON_CAMERA.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
              <select value={block.video_production_tier || ""} onChange={(e) => api.commit("Block", block.id, { video_production_tier: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">Production tier…</option>
                {VIDEO_PRODUCTION_TIERS.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
            </div>
          )}
          {block.content_type === "Image" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              <select value={block.image_style || ""} onChange={(e) => api.commit("Block", block.id, { image_style: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">Image style…</option>
                {IMAGE_STYLES.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
              <select value={block.image_subject || ""} onChange={(e) => api.commit("Block", block.id, { image_subject: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">What's in it…</option>
                {IMAGE_SUBJECTS.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
              <select value={block.image_production_tier || ""} onChange={(e) => api.commit("Block", block.id, { image_production_tier: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">Production tier…</option>
                {IMAGE_PRODUCTION_TIERS.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
            </div>
          )}
          {block.content_type === "Carousel" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              <select value={block.carousel_style || ""} onChange={(e) => api.commit("Block", block.id, { carousel_style: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">Carousel style…</option>
                {CAROUSEL_STYLES.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
              <select value={block.slide_count || ""} onChange={(e) => api.commit("Block", block.id, { slide_count: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">Slide count…</option>
                {SLIDE_COUNTS.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
              <select value={block.carousel_production_tier || ""} onChange={(e) => api.commit("Block", block.id, { carousel_production_tier: e.target.value })} className={settingSelect}>
                <option value="" className="bg-[#141416]">Production tier…</option>
                {CAROUSEL_PRODUCTION_TIERS.map((c) => <option key={c} value={c} className="bg-[#141416]">{c}</option>)}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Creative direction — quiet ghost field */}
      <div className="px-3.5 pt-2.5">
        <textarea
          value={block.direction || ""}
          onChange={(e) => api.set("Block", block.id, { direction: e.target.value })}
          onBlur={(e) => api.commit("Block", block.id, { direction: e.target.value })}
          rows={2}
          placeholder="Creative direction…"
          className="w-full text-sm text-white/60 bg-transparent placeholder:text-white/25 rounded-lg px-1 py-1 focus:outline-none focus:bg-white/[0.04] resize-none transition-colors"
        />
      </div>

      {/* Creative references — the visual core of the block */}
      <div className="mt-2 border-t border-white/[0.06] px-3.5 pt-3 pb-3.5 rounded-b-xl">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Creative references</p>
          <span className="text-[10px] font-semibold text-purple-300/90 bg-purple-400/10 border border-purple-400/20 rounded-full px-1.5 py-0.5 leading-none">
            {examples.length}
          </span>
        </div>

        <DragDropContext onDragEnd={(result) => api.reorderExamples(block.id, result)}>
          <Droppable droppableId={`examples-${block.id}`} type="example" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]"
              >
                {examples.map((ex, i) => (
                  <Draggable key={ex.id} draggableId={ex.id} index={i}>
                    {(pp) => (
                      <ExampleItem
                        example={ex}
                        api={api}
                        swipe={api.swipeFor ? api.swipeFor(ex) : undefined}
                        selected={selectedId === ex.id}
                        onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
                        innerRef={pp.innerRef}
                        draggableProps={pp.draggableProps}
                        dragHandleProps={pp.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <button
                  onClick={() => openPicker(null)}
                  className="shrink-0 w-[190px] aspect-[4/5] rounded-xl border border-dashed border-white/15 hover:border-purple-400/50 hover:bg-purple-400/[0.04] flex flex-col items-center justify-center gap-2 text-white/35 hover:text-purple-300 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-xs font-medium">Add reference</span>
                </button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <ExamplePicker
        open={pickerOpen}
        onClose={() => { setPickerOpen(false); setReplacing(null); }}
        onAdd={handleAdd}
        multiple={!replacing}
        title={replacing ? "Replace reference" : "Add examples from swipe library"}
      />
    </div>
  );
}