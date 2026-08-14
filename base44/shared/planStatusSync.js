/**
 * Central plan_status sync.
 *
 * plan_status is denormalized onto Angle, Block, and Example so RLS can hide
 * draft-plan children from client users (RLS can't join a parent Plan field).
 * Because it's denormalized, every time the source-of-truth Plan status changes
 * — or new children appear under a plan — the mirror must be kept consistent.
 *
 * This single function is the ONLY place that writes plan_status on descendant
 * records. The four mutation paths must call it instead of setting the field
 * themselves:
 *
 *   1. Publish  a plan     -> syncPlanStatus(base44, planId, "published")
 *   2. Unpublish a plan    -> syncPlanStatus(base44, planId, "draft")
 *   3. Create a child record -> after creating it, syncPlanStatus(base44, planId, <plan.status>)
 *      (read the parent Plan's current status and cascade it; this normalizes
 *       the new child to match its siblings and is idempotent on the rest)
 *   4. Duplicate a plan     -> after creating the new plan + copied children,
 *      syncPlanStatus(base44, newPlanId, <newPlan.status>)
 *
 * @param {object} base44  - client from createClientFromRequest(req). Uses
 *                           asServiceRole so this works regardless of caller.
 * @param {string} planId  - the Plan whose descendants should be synced.
 * @param {"draft"|"published"} targetStatus - status to cascade down.
 * @returns {Promise<{angles:number,blocks:number,examples:number}>} counts updated.
 */
export async function syncPlanStatus(base44, planId, targetStatus) {
  const db = base44.asServiceRole.entities;

  // Angles link directly to the plan via plan_id.
  const angleRes = await db.Angle.updateMany(
    { plan_id: planId },
    { $set: { plan_status: targetStatus } }
  );

  // Blocks link via angle_id, so gather the plan's angle ids first.
  const angles = await db.Angle.filter({ plan_id: planId });
  const angleIds = angles.map((a) => a.id);

  let blockRes = { updated: 0 };
  if (angleIds.length) {
    blockRes = await db.Block.updateMany(
      { angle_id: { $in: angleIds } },
      { $set: { plan_status: targetStatus } }
    );
  }

  // Examples link via block_id, so gather the plan's block ids next.
  let exampleRes = { updated: 0 };
  if (angleIds.length) {
    const blocks = await db.Block.filter({ angle_id: { $in: angleIds } });
    const blockIds = blocks.map((b) => b.id);
    if (blockIds.length) {
      exampleRes = await db.Example.updateMany(
        { block_id: { $in: blockIds } },
        { $set: { plan_status: targetStatus } }
      );
    }
  }

  return {
    angles: angleRes.updated ?? 0,
    blocks: blockRes.updated ?? 0,
    examples: exampleRes.updated ?? 0,
  };
}