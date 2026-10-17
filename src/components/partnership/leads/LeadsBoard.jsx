import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import moment from "moment";
import { STATUSES, faviconUrl, isDue } from "./leadMeta";
import OwnerChip from "./OwnerChip";

/** Board view: a column per status; drag cards between columns to update. */
export default function LeadsBoard({ leads, data, userName, onOpen }) {
  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || destination.droppableId === result.source.droppableId) return;
    data.updateLead(draggableId, { status: destination.droppableId }, userName);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-5 flex gap-3 overflow-x-auto pb-4">
        {STATUSES.map((s) => {
          const items = leads.filter((l) => l.status === s.value);
          return (
            <Droppable key={s.value} droppableId={s.value}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w-[248px] shrink-0">
                  <div className="mb-2 flex items-center gap-2 px-1">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[13px] font-semibold text-[#1a1a1a]">{s.label}</span>
                    <span className="text-[12px] text-[#9a9a9a]">{items.length}</span>
                  </div>
                  <div className="min-h-[110px] rounded-xl bg-[#f7f5f2] p-2">
                    {items.map((l, idx) => {
                      const icon = faviconUrl(l.website);
                      return (
                        <Draggable key={l.id} draggableId={l.id} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => !snapshot.isDragging && onOpen(l.id)}
                              className="mb-2 cursor-pointer rounded-xl border border-[#e5e2dc] bg-white p-3 transition-shadow hover:shadow-md"
                            >
                              <div className="flex items-center gap-2">
                                {icon && <img src={icon} alt="" className="h-4 w-4 shrink-0 rounded-sm" />}
                                <span className="truncate text-[14px] font-semibold text-[#1a1a1a]">
                                  {l.brand_name}
                                </span>
                              </div>
                              {l.contact_name && (
                                <p className="mt-1 truncate text-[12px] text-[#6b6b6b]">
                                  {l.contact_name}
                                </p>
                              )}
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <OwnerChip owner={l.owner} />
                                {l.next_follow_up && (
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                      isDue(l) ? "bg-[#fdece8] text-[#b0532f]" : "bg-[#f0eeea] text-[#6b6b6b]"
                                    }`}
                                  >
                                    {moment(l.next_follow_up).format("MMM D")}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}