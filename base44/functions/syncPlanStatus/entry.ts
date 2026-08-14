import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { syncPlanStatus } from '../../shared/planStatusSync.js';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const { planId, status } = await req.json();
    if (!planId || !['draft', 'published'].includes(status)) {
      return Response.json({ error: 'planId and status (draft|published) are required' }, { status: 400 });
    }

    const result = await syncPlanStatus(base44, planId, status);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}