import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, LogOut } from "lucide-react";
import MonthSelector from "@/components/portal/MonthSelector";
import AngleSection from "@/components/portal/AngleSection";
import ClientSwitcher from "@/components/portal/ClientSwitcher";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [children, setChildren] = useState({ angles: [], blocks: [], examples: [] });
  const [loading, setLoading] = useState(true);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [adminClients, setAdminClients] = useState([]);
  const [adminSlug, setAdminSlug] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me?.role === "admin") {
          const cs = await base44.entities.Client.list();
          setAdminClients(cs);
        } else {
          const slug = me?.data?.client_slug || me?.client_slug;
          if (slug) await loadClient(slug);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (adminSlug) loadClient(adminSlug);
  }, [adminSlug]);

  const loadClient = async (slug) => {
    setLoading(true);
    try {
      const cs = await base44.entities.Client.filter({ slug });
      setClient(cs[0] || null);
      const ps = await base44.entities.Plan.filter({ client_slug: slug }, "-year");
      const published = ps.filter((p) => p.status === "published");
      const sorted = [...published].sort(
        (a, b) => (a.year - b.year) || (MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month))
      );
      setPlans(sorted);
      setSelectedPlanId(null);
      setRevealed(false);
      setChildren({ angles: [], blocks: [], examples: [] });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (plans.length === 0) { setSelectedPlanId(null); return; }
    const now = new Date();
    const cur = plans.find((p) => p.month === MONTHS[now.getMonth()] && p.year === now.getFullYear());
    setSelectedPlanId((cur || plans[plans.length - 1]).id);
  }, [plans]);

  useEffect(() => {
    if (!selectedPlanId) return;
    (async () => {
      setLoadingChildren(true);
      try {
        const angles = await base44.entities.Angle.filter({ plan_id: selectedPlanId }, "order");
        const angIds = angles.map((a) => a.id);
        let blocks = [];
        if (angIds.length) blocks = await base44.entities.Block.filter({ angle_id: { $in: angIds } }, "order");
        const blkIds = blocks.map((b) => b.id);
        let examples = [];
        if (blkIds.length) examples = await base44.entities.Example.filter({ block_id: { $in: blkIds } }, "order");
        setChildren({
          angles: angles.filter((a) => a.plan_status === "published"),
          blocks: blocks.filter((b) => b.plan_status === "published"),
          examples: examples.filter((e) => e.plan_status === "published"),
        });
      } catch (e) {
        console.error(e);
      }
      setLoadingChildren(false);
    })();
  }, [selectedPlanId]);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const showAdminPick = isAdmin && !adminSlug;
  const showEmptyClient = !isAdmin && !client;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-[#222222] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          {client?.logo && <img src={client.logo} alt="" className="h-8 w-8 rounded object-contain bg-white/10" />}
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest opacity-50">{isAdmin ? "Admin preview" : "Client Portal"}</p>
            <h1 className="text-lg font-bold truncate">{client?.name || "Select a client"}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {isAdmin && <ClientSwitcher clients={adminClients} value={adminSlug} onChange={setAdminSlug} />}
          <button onClick={() => base44.auth.logout()} className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {showAdminPick ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Use the switcher above to preview any client's portal exactly as they see it.</p>
          </div>
        ) : showEmptyClient ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium text-[#2d2d2d]">Your account isn't linked to a client.</p>
            <button onClick={() => base44.auth.logout()} className="text-sm text-gray-500 underline mt-3">Log out</button>
          </div>
        ) : (
          <>
            {client?.logo && (
              <div className="flex justify-center mb-4">
                <img src={client.logo} alt={client.name} className="max-h-20 object-contain" />
              </div>
            )}
            {plans.length === 0 ? (
              <p className="text-center text-[#777777] py-10">No published plans yet. Published content will appear here.</p>
            ) : (
              <>
                <h2 className="text-center text-lg font-bold text-[#222222] mb-3">Your monthly gameplan</h2>
                <div className="flex justify-center mb-6">
                  <MonthSelector plans={plans} selectedPlanId={selectedPlanId} onSelect={setSelectedPlanId} onReveal={() => setRevealed(true)} />
                </div>
                <p className="text-center text-[#777777] mb-2 leading-relaxed max-w-2xl mx-auto">
                  Welcome to your {client?.name || ""} client portal — published content will appear here.
                </p>
                <p className="text-center text-[#777777] mb-8 leading-relaxed max-w-2xl mx-auto">
                  This is your dedicated space for monthly creative gameplans. Each month, your strategy team publishes the angles, content blocks, and example creative you'll be running — so you always know what's being made, why it's being made, and what to expect. Pick a month above to view that month's plan.
                </p>

                {revealed && selectedPlan && (
                  <div className="mt-6">
                    {selectedPlan.headline && (
                      <h2 className="text-2xl font-bold text-[#222222] mb-2">{selectedPlan.headline}</h2>
                    )}
                    {selectedPlan.strategy_note && (
                      <p className="text-[#777777] leading-relaxed mb-6">{selectedPlan.strategy_note}</p>
                    )}

                    {loadingChildren ? (
                      <div className="flex justify-center py-10">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                      </div>
                    ) : children.angles.length === 0 ? (
                      <p className="text-gray-400">No published angles yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {children.angles.map((angle) => (
                          <AngleSection
                            key={angle.id}
                            angle={angle}
                            blocks={children.blocks}
                            examples={children.examples}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}