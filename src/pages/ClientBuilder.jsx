import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Plus, Copy, Trash2, ShieldAlert, LogOut, Loader2, UserPlus } from "lucide-react";
import PlanEditor from "@/components/admin/PlanEditor";
import PlanMonthDialog from "@/components/admin/PlanMonthDialog";
import InviteClientDialog from "@/components/admin/InviteClientDialog";
import { exampleLabel } from "@/lib/planBuilder";
// plan_status cascade runs through the shared syncPlanStatus backend function.

export default function ClientBuilder() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [monthDialog, setMonthDialog] = useState(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  const loadPlans = async (slug) => {
    const ps = await base44.entities.Plan.filter({ client_slug: slug }, "-year");
    setPlans(ps);
  };

  useEffect(() => {
    (async () => {
      const me = await base44.auth.me();
      setUser(me);
      if (me.role !== "admin") { setLoading(false); return; }
      try {
        const c = await base44.entities.Client.get(clientId);
        setClient(c);
        await loadPlans(c.slug);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, [clientId]);

  const createPlan = async (month, year) => {
    await base44.entities.Plan.create({ client_slug: client.slug, month, year, status: "draft", headline: "", strategy_note: "" });
    setMonthDialog(null);
    loadPlans(client.slug);
  };

  const duplicatePlan = async (sourcePlan, month, year) => {
    const newPlan = await base44.entities.Plan.create({
      client_slug: sourcePlan.client_slug, month, year,
      headline: sourcePlan.headline, strategy_note: sourcePlan.strategy_note, status: "draft",
    });
    const angles = await base44.entities.Angle.filter({ plan_id: sourcePlan.id }, "order");
    for (const a of angles) {
      const na = await base44.entities.Angle.create({
        client_slug: a.client_slug, plan_id: newPlan.id, label: a.label, type: a.type,
        order: a.order, description: a.description, insight: a.insight, plan_status: "draft",
      });
      const blocks = await base44.entities.Block.filter({ angle_id: a.id }, "order");
      for (const b of blocks) {
        const nb = await base44.entities.Block.create({
          client_slug: b.client_slug, angle_id: na.id, content_type: b.content_type,
          order: b.order, direction: b.direction, quantity: b.quantity, plan_status: "draft",
        });
        const exs = await base44.entities.Example.filter({ block_id: b.id }, "order");
        if (exs.length) {
          const recs = exs.map((e, i) => ({
            client_slug: e.client_slug, block_id: nb.id, swipe_id: e.swipe_id,
            file_url: e.file_url, thumbnail_url: e.thumbnail_url,
            label: exampleLabel({ month, angleType: a.type, angleOrder: a.order, contentType: b.content_type, seq: i + 1 }),
            note: e.note, order: e.order, plan_status: "draft",
          }));
          await base44.entities.Example.bulkCreate(recs);
        }
      }
    }
    try { await base44.functions.invoke("syncPlanStatus", { planId: newPlan.id, status: "draft" }); } catch (e) { console.error(e); }
    setMonthDialog(null);
    loadPlans(client.slug);
  };

  const deletePlan = async (planId) => {
    if (!window.confirm("Delete this plan and all its angles, blocks, and examples?")) return;
    const angles = await base44.entities.Angle.filter({ plan_id: planId });
    for (const a of angles) {
      const blocks = await base44.entities.Block.filter({ angle_id: a.id });
      for (const b of blocks) {
        await base44.entities.Example.deleteMany({ block_id: b.id }).catch(() => {});
      }
      if (blocks.length) await base44.entities.Block.deleteMany({ angle_id: a.id }).catch(() => {});
    }
    if (angles.length) await base44.entities.Angle.deleteMany({ plan_id: planId }).catch(() => {});
    await base44.entities.Plan.delete(planId);
    if (selectedPlan?.id === planId) setSelectedPlan(null);
    loadPlans(client.slug);
  };

  if (user && user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-gray-50">
        <ShieldAlert className="w-10 h-10 text-gray-400" />
        <p className="text-lg font-medium text-[#2d2d2d]">Admins only.</p>
        <button onClick={() => base44.auth.logout()} className="text-sm text-gray-500 underline inline-flex items-center gap-1">
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>
    );
  }

  if (loading || !client) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-6 h-6 animate-spin text-gray-300" /></div>;
  }

  const changeStrategyStatus = async (planId, val) => {
    await base44.entities.Plan.update(planId, { strategy_status: val });
    setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, strategy_status: val } : p)));
    if (selectedPlan?.id === planId) setSelectedPlan((s) => (s ? { ...s, strategy_status: val } : s));
  };

  const statusBadge = (s) => (s === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#2d2d2d] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/clients")} className="p-1 rounded hover:bg-white/10"><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-50">Gameplan Builder</p>
            <h1 className="text-xl font-bold">{client.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setInviteOpen(true)} className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">
            <UserPlus className="w-4 h-4" /> Invite client
          </button>
          <button onClick={() => base44.auth.logout()} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">Log out</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/admin/clients")}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2d2d2d] mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to client overview
        </button>
        {selectedPlan ? (
          <div className="space-y-4">
            <button onClick={() => setSelectedPlan(null)} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2d2d2d]">
              <ArrowLeft className="w-4 h-4" /> Back to plans
            </button>
            <PlanEditor plan={selectedPlan} onDuplicate={(p) => setMonthDialog({ mode: "duplicate", source: p })} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2d2d2d]">Plans</h2>
              <button onClick={() => setMonthDialog({ mode: "new" })} className="inline-flex items-center gap-2 btn-gradient text-sm px-4 py-2 rounded-full">
                <Plus className="w-4 h-4" /> New plan
              </button>
            </div>
            {plans.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-10">No plans yet.</p>
            ) : (
              <div className="space-y-2">
                {plans.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
                    <button onClick={() => setSelectedPlan(p)} className="text-left flex-1 min-w-0">
                      <p className="font-bold text-[#2d2d2d]">{p.month} {p.year}</p>
                      {p.headline && <p className="text-sm text-gray-500 truncate">{p.headline}</p>}
                    </button>
                    <div className="flex items-center gap-2 ml-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge(p.status)}`}>{p.status}</span>
                      <select
                        value={p.strategy_status || "Proposed"}
                        onChange={(e) => changeStrategyStatus(p.id, e.target.value)}
                        className="h-8 rounded-md border border-gray-200 bg-white px-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
                        title="Strategy status"
                      >
                        <option value="Proposed">Proposed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button onClick={() => setMonthDialog({ mode: "duplicate", source: p })} className="text-gray-400 hover:text-[#2d2d2d]" title="Duplicate plan"><Copy className="w-4 h-4" /></button>
                      <button onClick={() => deletePlan(p.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <InviteClientDialog open={inviteOpen} client={client} onClose={() => setInviteOpen(false)} />

      <PlanMonthDialog
        open={!!monthDialog}
        title={monthDialog?.mode === "duplicate" ? "Duplicate plan" : "New plan"}
        onClose={() => setMonthDialog(null)}
        onConfirm={(month, year) =>
          monthDialog?.mode === "duplicate"
            ? duplicatePlan(monthDialog.source, month, year)
            : createPlan(month, year)
        }
      />
    </div>
  );
}