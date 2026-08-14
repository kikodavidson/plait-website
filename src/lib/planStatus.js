import { base44 } from "@/api/base44Client";

// Frontend cascade of plan_status to all descendants. Runs as the admin user,
// whose RLS permits updateMany on Angle/Block/Example.
export async function cascadePlanStatus(planId, status) {
  await base44.entities.Angle.updateMany(
    { plan_id: planId },
    { $set: { plan_status: status } }
  ).catch(() => {});
  const angles = await base44.entities.Angle.filter({ plan_id: planId });
  const angleIds = angles.map((a) => a.id);
  if (!angleIds.length) return;
  await base44.entities.Block.updateMany(
    { angle_id: { $in: angleIds } },
    { $set: { plan_status: status } }
  ).catch(() => {});
  const blocks = await base44.entities.Block.filter({ angle_id: { $in: angleIds } });
  const blockIds = blocks.map((b) => b.id);
  if (blockIds.length) {
    await base44.entities.Example.updateMany(
      { block_id: { $in: blockIds } },
      { $set: { plan_status: status } }
    ).catch(() => {});
  }
}