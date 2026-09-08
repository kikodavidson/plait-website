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

  const applyPlanMeta = (planId, patch) => {
    setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, ...patch } : p)));
    setSelectedPlan((s) => (s?.id === planId ? { ...s, ...patch } : s));
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30 border-b border-white/10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Gameplan Builder</p>
          <h1 className="text-xl font-bold">Plait</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setInviteOpen(true)} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30">
            <UserPlus className="w-4 h-4" /> Invite client
          </button>
          <button onClick={() => base44.auth.logout()} className="text-sm font-medium text-white/70 hover:text-white px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30">Log out</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/admin/clients")}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2d2d2d] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to client overview
        </button>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-[#2d2d2d]">Plans</h2>
              <button onClick={() => setMonthDialog({ mode: "new" })} className="inline-flex items-center gap-1.5 btn-gradient text-xs px-3 py-1.5 rounded-full">
                <Plus className="w-3.5 h-3.5" /> New plan
              </button>
            </div>
            {plans.length === 0 ? (
              <p className="text-gray-400 text-sm">No plans yet. Create one to start building.</p>
            ) : (
              <nav className="space-y-2">
                {plans.map((p) => {
                  const active = selectedPlan?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      className={`rounded-xl border p-3 flex items-center justify-between gap-2 transition-colors ${active ? "bg-[#2d2d2d] border-[#2d2d2d] text-white" : "bg-white border-gray-200 hover:border-gray-400"}`}
                    >
                      <button onClick={() => setSelectedPlan(p)} className="text-left min-w-0 flex-1">
                        <p className={`font-bold truncate ${active ? "text-white" : "text-[#2d2d2d]"}`}>
                          {p.month} {p.year}
                        </p>
                        <p className={`text-xs mt-0.5 ${active ? "text-white/60" : "text-gray-500"}`}>
                          <span className="capitalize">{p.status}</span> · {p.strategy_status || "Proposed"}
                        </p>
                      </button>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => setMonthDialog({ mode: "duplicate", source: p })} className={active ? "text-white/50 hover:text-white" : "text-gray-400 hover:text-[#2d2d2d]"} title="Duplicate plan"><Copy className="w-4 h-4" /></button>
                        <button onClick={() => deletePlan(p.id)} className={active ? "text-white/50 hover:text-red-400" : "text-gray-400 hover:text-red-500"} title="Delete plan"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  );
                })}
              </nav>
            )}
          </aside>
          <div className="flex-1 min-w-0 w-full">
            {selectedPlan ? (
              <PlanEditor
                plan={selectedPlan}
                onDuplicate={(p) => setMonthDialog({ mode: "duplicate", source: p })}
                onMetaChange={(patch) => applyPlanMeta(selectedPlan.id, patch)}
              />
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-400 text-sm">
                Select a plan to start building.
              </div>
            )}
          </div>
        </div>
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