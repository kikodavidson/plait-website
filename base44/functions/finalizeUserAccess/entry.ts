import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

// Called after login. If the authenticated user has no client_slug, look up a
// PendingInvite stored at invite time and apply it to the real user record.
// Returns the resolved client_slug/role so the client can route correctly.
export default async function (req) {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });

  const existingSlug = user.client_slug || user.data?.client_slug;
  if (existingSlug) {
    return Response.json({ ok: true, repaired: false, client_slug: existingSlug, role: user.role });
  }

  const email = (user.email || "").toLowerCase().trim();
  if (!email) return Response.json({ ok: false, reason: "no_email" });

  let pending = [];
  try {
    pending = await base44.asServiceRole.entities.PendingInvite.filter({ email });
  } catch (e) {
    return Response.json({ ok: false, reason: "lookup_failed", error: e.message }, { status: 500 });
  }

  if (!pending.length) return Response.json({ ok: false, reason: "no_pending_invite" });

  const p = pending[0];
  const role = p.role || "client";
  try {
    await base44.asServiceRole.entities.User.update(user.id, { client_slug: p.client_slug, role });
  } catch (e) {
    return Response.json({ ok: false, reason: "update_failed", error: e.message }, { status: 500 });
  }

  try { await base44.asServiceRole.entities.PendingInvite.delete(p.id); } catch (e) {}

  return Response.json({ ok: true, repaired: true, client_slug: p.client_slug, role });
}