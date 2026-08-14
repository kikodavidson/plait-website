import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, LogOut } from "lucide-react";
import PlanSidebar from "@/components/portal/PlanSidebar";
import AngleSection from "@/components/portal/AngleSection";
import ClientSwitcher from "@/components/portal/ClientSwitcher";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const PLAIT_LOGO = "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/9f9827363_Untitleddesign-2026-08-14T032711954.png";
const INTRO = "This is where strategy turns into reality. Each plan lays out the audiences and concepts we're testing, the types of content we need to test them, and a visual example of a creative that's already winning so there's no guessing what good looks like. Then we take a method that already works and make it yours. New plans go up whenever there's something new to test. Pick one to see what's in motion.";

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [plans, setPlans] = useState([]);
  const [allAngles, setAllAngles] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [adminClients, setAdminClients] = useState([]);
  const [adminSlug, setAdminSlug] = useState(null);

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
      setBlocks([]);
      setExamples([]);
      let angles = [];
      if (sorted.length) {
        angles = await base44.entities.Angle.filter({ plan_id: { $in: sorted.map((p) => p.id) } });
      }
      setAllAngles(angles);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const anglesByPlan = useMemo(() => {
    const m = {};
    allAngles.forEach((a) => {
      if (a.plan_status === "published") m[a.plan_id] = (m[a.plan_id] || 0) + 1;
    });
    return m;
  }, [allAngles]);

  const selectedPlanAngles = useMemo(
    () => allAngles.filter((a) => a.plan_id === selectedPlanId && a.plan_status === "published"),
    [allAngles, selectedPlanId]
  );

  useEffect(() => {
    if (!selectedPlanId) return;
    (async () => {
      setLoadingChildren(true);
      try {
        const angIds = selectedPlanAngles.map((a) => a.id);
        let blks = [];
        if (angIds.length) blks = await base44.entities.Block.filter({ angle_id: { $in: angIds } }, "order");
        const blkIds = blks.map((b) => b.id);
        let exs = [];
        if (blkIds.length) exs = await base44.entities.Example.filter({ block_id: { $in: blkIds } }, "order");
        setBlocks(blks.filter((b) => b.plan_status === "published"));
        setExamples(exs.filter((e) => e.plan_status === "published"));
      } catch (e) {
        console.error(e);
      }
      setLoadingChildren(false);
    })();
  }, [selectedPlanId, selectedPlanAngles]);

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
      <header className="bg-[#222222] text-white px-6 py-1 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {client?.logo && <img src={client.logo} alt="" className="h-8 w-8 rounded object-contain bg-white/10 shrink-0" />}
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest opacity-50">{isAdmin ? "Admin preview" : "Client Portal"}</p>
            <h1 className="text-lg font-bold truncate">{client?.name || "Select a client"}</h1>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 justify-center px-4">
          <img src={PLAIT_LOGO} alt="Plait" className="h-8 object-contain" />
          <span className="text-white/40 text-base leading-none">|</span>
          <span className="text-sm font-semibold tracking-wide whitespace-nowrap">Creative Gameplan Studio</span>
        </div>
        <div className="flex items-center gap-3 justify-end flex-1">
          <button onClick={() => base44.auth.logout()} className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full shrink-0">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {showAdminPick ? (
          <div className="text-center py-20 flex flex-col items-center gap-6">
            {isAdmin && <ClientSwitcher clients={adminClients} value={adminSlug} onChange={setAdminSlug} />}
            <p className="text-gray-500">Use the switcher above to preview any client's portal exactly as they see it.</p>
          </div>
        ) : showEmptyClient ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium text-[#2d2d2d]">Your account isn't linked to a client.</p>
            <button onClick={() => base44.auth.logout()} className="text-sm text-gray-500 underline mt-3">Log out</button>
          </div>
        ) : plans.length === 0 ? (
          <p className="text-center text-[#777777] py-10">No published plans yet. Published content will appear here.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
            <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              {client?.logo && (
                <div className="flex justify-center mb-3">
                  <img src={client.logo} alt={client.name} className="max-h-10 object-contain" />
                </div>
              )}
              <PlanSidebar plans={plans} anglesByPlan={anglesByPlan} selectedPlanId={selectedPlanId} onSelect={setSelectedPlanId} />
            </aside>
            <section>
              {!selectedPlanId ? (
                <div className="py-10">
                  <p className="text-[#777777] leading-relaxed max-w-xl">{INTRO}</p>
                </div>
              ) : (
                <div>
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
                  ) : selectedPlanAngles.length === 0 ? (
                    <p className="text-gray-400">No published angles yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedPlanAngles.map((angle) => (
                        <AngleSection key={angle.id} angle={angle} blocks={blocks} examples={examples} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}