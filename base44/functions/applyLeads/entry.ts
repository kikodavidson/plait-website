import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const PARTNER_EMAILS = ['luke@plaitgrowth.com', 'kikodavidson11@gmail.com', 'max@zero2ninety.co'];
const STATUSES = ['new', 'contacted', 'call_booked', 'client', 'passed'];

function isPartner(user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (PARTNER_EMAILS.includes((user.email || '').toLowerCase())) return true;
  const first = (user.full_name || '').trim().split(' ')[0].toLowerCase();
  return first === 'luke' || first === 'max';
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (!isPartner(user)) return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const action = body.action;

    if (action === 'list') {
      const { items } = await base44.asServiceRole.entities.ApplyLead.filter(
        {},
        { sort: '-created_date', limit: 500 }
      );
      const now = new Date();
      const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).getTime();
      const thisMonth = items.filter((i) => new Date(i.created_date).getTime() >= monthStart);
      return Response.json({
        items,
        stats: {
          total: thisMonth.length,
          qualified: thisMonth.filter((i) => i.result === 'qualified').length,
        },
      });
    }

    if (action === 'update') {
      const id = body.id;
      const patch = body.patch && typeof body.patch === 'object' ? body.patch : null;
      if (!id || !patch) return Response.json({ error: 'id and patch are required' }, { status: 400 });

      const data = {};
      if (typeof patch.status === 'string' && STATUSES.includes(patch.status)) data.status = patch.status;
      if (typeof patch.notes === 'string') data.notes = patch.notes.slice(0, 5000);
      if (!Object.keys(data).length) return Response.json({ error: 'Nothing to update' }, { status: 400 });

      const lead = await base44.asServiceRole.entities.ApplyLead.update(id, data);
      return Response.json({ lead });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}