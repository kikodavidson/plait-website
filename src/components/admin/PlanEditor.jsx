import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Copy } from "lucide-react";
import AngleCard from "./AngleCard";
import { MONTHS, exampleLabel } from "@/lib/planBuilder";
// plan_status cascade runs through the shared syncPlanStatus backend function.

const arrayMove = (arr, from, to) => {
  const a = [...arr];
  const [m] = a.splice(from, 1);
  a.splice(to, 0, m);
  return a;
};

export default function PlanEditor({ plan, onDuplicate }) {
  const [p, setP] = useState(plan);
  const [angles, setAngles] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setP(plan); }, [plan]);
  useEffect(() => { loadChildren(plan.id); }, [plan.id]);

  const loadChildren = async (planId) => {
    setLoading(true);
    try {
      const angs = await base44.entities.Angle.filter({ plan_id: planId }, "order");
      const angIds = angs.map((a) => a.id);
      let blks = [];
      if (angIds.length) blks = await base44.entities.Block.filter({ angle_id: { $in: angIds } }, "order");
      const blkIds = blks.map((b) => b.id);
      let exs = [];
      if (blkIds.length) exs = await base44.entities.Example.filter({ block_id: { $in: blkIds } }, "order");
      setAngles(angs); setBlocks(blks); setExamples(exs);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const setters = { Angle: setAngles, Block: setBlocks, Example: setExamples };
  const setEntity = (entity, id, patch) => setters[entity]((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const commitEntity = (entity, id, patch) => {
    setEntity(entity, id, patch);
    base44.entities[entity].update(id, patch).catch(console.error);
  };

  const commitPlan = (patch) => {
    setP((prev) => ({ ...prev, ...patch }));
    base44.entities.Plan.update(plan.id, patch).catch(console.error);
  };

  const changeStatus = async (newStatus) => {
    setP((prev) => ({ ...prev, status: newStatus }));
    await base44.entities.Plan.update(plan.id, { status: newStatus });
    try { await base44.functions.invoke("syncPlanStatus", { planId: plan.id, status: newStatus }); } catch (e) { console.error(e); }
    setAngles((prev) => prev.map((a) => ({ ...a, plan_status: newStatus })));
    setBlocks((prev) => prev.map((b) => ({ ...b, plan_status: newStatus })));
    setExamples((prev) => prev.map((e) => ({ ...e, plan_status: newStatus })));
  };

  const addAngle = async () => {
    const created = await base44.entities.Angle.create({
      client_slug: plan.client_slug, plan_id: plan.id, label: "New angle", type: "audience",
      order: angles.length + 1, plan_status: p.status,
    });
    setAngles((prev) => [...prev, created]);
  };

  const deleteAngle = async (angleId) => {
    const ab = blocks.filter((b) => b.angle_id === angleId);
    for (const b of ab) {
      await base44.entities.Example.deleteMany({ block_id: b.id }).catch(() => {});
    }
    if (ab.length) await base44.entities.Block.deleteMany({ angle_id: angleId }).catch(() => {});
    await base44.entities.Angle.delete(angleId);
    setAngles((prev) => prev.filter((a) => a.id !== angleId));
    setBlocks((prev) => prev.filter((b) => b.angle_id !== angleId));
    setExamples((prev) => prev.filter((e) => !ab.some((b) => b.id === e.block_id)));
  };

  const addBlock = async (angleId) => {
    const created = await base44.entities.Block.create({
      client_slug: plan.client_slug, angle_id: angleId, content_type: "HQ photo",
      order: blocks.filter((b) => b.angle_id === angleId).length + 1, plan_status: p.status,
    });
    setBlocks((prev) => [...prev, created]);
  };

  const deleteBlock = async (blockId) => {
    await base44.entities.Example.deleteMany({ block_id: blockId }).catch(() => {});
    await base44.entities.Block.delete(blockId);
    setBlocks((prev) => prev.filter((b) => b.id !== blockId));
    setExamples((prev) => prev.filter((e) => e.block_id !== blockId));
  };

  const reorderBlocks = (angleId, result) => {
    if (!result.destination) return;
    const ab = blocks.filter((b) => b.angle_id === angleId).sort((a, b) => (a.order || 0) - (b.order || 0));
    const moved = arrayMove(ab, result.source.index, result.destination.index).map((b, i) => ({ ...b, order: i + 1 }));
    base44.entities.Block.bulkUpdate(moved.map((b) => ({ id: b.id, order: b.order }))).catch(console.error);
    setBlocks((prev) => {
      const m = new Map(moved.map((b) => [b.id, b]));
      return prev.map((b) => m.get(b.id) || b);
    });
  };

  const addExamples = async (blockId, swipes) => {
    const block = blocks.find((b) => b.id === blockId);
    const angle = angles.find((a) => a.id === block.angle_id);
    const existing = examples.filter((e) => e.block_id === blockId);
    let seq = existing.length;
    const records = swipes.map((s) => {
      seq += 1;
      return {
        client_slug: plan.client_slug, block_id: blockId, swipe_id: s.id,
        file_url: s.file, thumbnail_url: s.thumbnail,
        label: exampleLabel({ month: p.month, angleType: angle.type, angleOrder: angle.order, contentType: block.content_type, seq }),
        note: "", order: seq, plan_status: p.status,
      };
    });
    const created = await base44.entities.Example.bulkCreate(records);
    setExamples((prev) => [...prev, ...created]);
    // New examples inherit the parent plan's current status via the shared sync function.
    try { await base44.functions.invoke("syncPlanStatus", { planId: plan.id, status: p.status }); } catch (e) { console.error(e); }
  };

  const reorderExamples = (blockId, result) => {
    if (!result.destination) return;
    const be = examples.filter((e) => e.block_id === blockId).sort((a, b) => (a.order || 0) - (b.order || 0));
    const moved = arrayMove(be, result.source.index, result.destination.index).map((e, i) => ({ ...e, order: i + 1 }));
    base44.entities.Example.bulkUpdate(moved.map((e) => ({ id: e.id, order: e.order }))).catch(console.error);
    setExamples((prev) => {
      const m = new Map(moved.map((e) => [e.id, e]));
      return prev.map((e) => m.get(e.id) || e);
    });
  };

  const deleteExample = async (id) => {
    await base44.entities.Example.delete(id);
    setExamples((prev) => prev.filter((e) => e.id !== id));
  };

  const onAngleDragEnd = (result) => {
    if (!result.destination) return;
    const moved = arrayMove(angles, result.source.index, result.destination.index).map((a, i) => ({ ...a, order: i + 1 }));
    base44.entities.Angle.bulkUpdate(moved.map((a) => ({ id: a.id, order: a.order }))).catch(console.error);
    setAngles(moved);
  };

  const api = { set: setEntity, commit: commitEntity, deleteAngle, addBlock, deleteBlock, reorderBlocks, reorderExamples, addExamples, deleteExample };

  const blocksForAngle = (angleId) => blocks.filter((b) => b.angle_id === angleId).sort((a, b) => (a.order || 0) - (b.order || 0));
  const examplesForBlock = (blockId) => examples.filter((e) => e.block_id === blockId).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Month</label>
            <select value={p.month || ""} onChange={(e) => commitPlan({ month: e.target.value })} className="block h-10 rounded-lg border border-gray-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]">
              <option value="">—</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Year</label>
            <input type="number" value={p.year || ""} onChange={(e) => setP((prev) => ({ ...prev, year: Number(e.target.value) }))} onBlur={(e) => commitPlan({ year: Number(e.target.value) })} className="block h-10 w-24 rounded-lg border border-gray-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
            <select value={p.status || "draft"} onChange={(e) => changeStatus(e.target.value)} className="block h-10 rounded-lg border border-gray-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Strategy</label>
            <select value={p.strategy_status || "Proposed"} onChange={(e) => commitPlan({ strategy_status: e.target.value })} className="block h-10 rounded-lg border border-gray-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]">
              <option value="Proposed">Proposed</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          {onDuplicate && (
            <button onClick={() => onDuplicate(p)} className="ml-auto inline-flex items-center gap-2 text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50">
              <Copy className="w-4 h-4" /> Duplicate plan
            </button>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Headline</label>
          <input value={p.headline || ""} onChange={(e) => setP((prev) => ({ ...prev, headline: e.target.value }))} onBlur={(e) => commitPlan({ headline: e.target.value })} className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]" placeholder="Plan headline" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Strategy note</label>
          <textarea value={p.strategy_note || ""} onChange={(e) => setP((prev) => ({ ...prev, strategy_note: e.target.value }))} onBlur={(e) => commitPlan({ strategy_note: e.target.value })} rows={3} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]" placeholder="High-level strategy for the month" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#2d2d2d]">Angles</h3>
          <button onClick={addAngle} className="inline-flex items-center gap-2 btn-gradient text-sm px-4 py-2 rounded-full">
            <Plus className="w-4 h-4" /> Add angle
          </button>
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Loading…</div>
        ) : (
          <DragDropContext onDragEnd={onAngleDragEnd}>
            <Droppable droppableId="angles" type="angle">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                  {angles.map((a, i) => (
                    <Draggable key={a.id} draggableId={a.id} index={i}>
                      {(pp) => (
                        <AngleCard
                          innerRef={pp.innerRef}
                          draggableProps={pp.draggableProps}
                          dragHandle={pp.dragHandleProps}
                          angle={a}
                          blocks={blocksForAngle(a.id)}
                          examplesForBlock={examplesForBlock}
                          api={api}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {angles.length === 0 && <p className="text-center text-gray-400 text-sm py-6">No angles yet. Add one to start building.</p>}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}