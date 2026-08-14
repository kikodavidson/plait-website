import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Loader2, LogOut, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPlan, setOpenPlan] = useState(null);
  const [children, setChildren] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        const slug = me?.data?.client_slug;
        if (!slug) { setLoading(false); return; }
        const clients = await base44.entities.Client.filter({ slug });
        setClient(clients[0] || null);
        const ps = await base44.entities.Plan.filter({ client_slug: slug }, "-year");
        setPlans(ps);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  const loadChildren = async (planId) => {
    if (children[planId]) return;
    const angles = await base44.entities.Angle.filter({ plan_id: planId }, "order");
    const angIds = angles.map((a) => a.id);
    let blocks = [];
    if (angIds.length) blocks = await base44.entities.Block.filter({ angle_id: { $in: angIds } }, "order");
    const blkIds = blocks.map((b) => b.id);
    let examples = [];
    if (blkIds.length) examples = await base44.entities.Example.filter({ block_id: { $in: blkIds } }, "order");
    setChildren((prev) => ({ ...prev, [planId]: { angles, blocks, examples } }));
  };

  const togglePlan = (planId) => {
    setOpenPlan(openPlan === planId ? null : planId);
    loadChildren(planId);
  };

  const blocksFor = (angleId) => (children[openPlan]?.blocks || []).filter((b) => b.angle_id === angleId);
  const examplesFor = (blockId) => (children[openPlan]?.examples || []).filter((e) => e.block_id === blockId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user?.data?.client_slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-gray-50">
        <p className="text-lg font-medium text-[#2d2d2d]">Your account isn't linked to a client.</p>
        <button onClick={() => base44.auth.logout()} className="text-sm text-gray-500 underline">Log out</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#2d2d2d] text-white px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-50">Client Portal</p>
          <h1 className="text-xl font-bold">{client?.name || "Client"}</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-60 hidden sm:block">{user?.email}</span>
          <button onClick={() => base44.auth.logout()} className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {client?.intro_note && (
          <p className="text-gray-600 mb-8 leading-relaxed">{client.intro_note}</p>
        )}

        <h2 className="text-lg font-bold text-[#2d2d2d] mb-4">Your Content Gameplans</h2>

        {plans.length === 0 ? (
          <p className="text-gray-500">No published plans yet. Published content will appear here.</p>
        ) : (
          <div className="space-y-3">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => togglePlan(plan.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-bold text-[#2d2d2d]">{plan.month} {plan.year}</p>
                    {plan.headline && <p className="text-sm text-gray-500 mt-1">{plan.headline}</p>}
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${openPlan === plan.id ? "rotate-90" : ""}`} />
                </button>

                {openPlan === plan.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-gray-100 p-5 bg-gray-50/50"
                  >
                    {plan.strategy_note && (
                      <p className="text-sm text-gray-600 mb-5 leading-relaxed">{plan.strategy_note}</p>
                    )}
                    {!children[plan.id] && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                    {children[plan.id] && children[plan.id].angles.length === 0 && (
                      <p className="text-sm text-gray-400">No published angles yet.</p>
                    )}
                    {children[plan.id] && children[plan.id].angles.length > 0 && (
                      <div className="space-y-4">
                        {children[plan.id].angles.map((angle) => (
                          <div key={angle.id} className="bg-white rounded-xl border border-gray-100 p-4">
                            <p className="font-semibold text-[#2d2d2d] text-sm">{angle.label}</p>
                            {angle.description && (
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{angle.description}</p>
                            )}
                            <div className="mt-3 space-y-3">
                              {blocksFor(angle.id).map((block) => (
                                <div key={block.id} className="pl-3 border-l-2 border-gray-200">
                                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                    {block.content_type}{block.quantity ? ` ×${block.quantity}` : ""}
                                  </p>
                                  {block.direction && (
                                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{block.direction}</p>
                                  )}
                                  {examplesFor(block.id).length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                      {examplesFor(block.id).map((ex) => (
                                        <div key={ex.id} className="rounded-lg overflow-hidden bg-gray-100">
                                          {ex.thumbnail_url ? (
                                            <img src={ex.thumbnail_url} alt={ex.label || ""} className="w-full h-24 object-cover" />
                                          ) : (
                                            <div className="w-full h-24 flex items-center justify-center">
                                              <ImageIcon className="w-6 h-6 text-gray-300" />
                                            </div>
                                          )}
                                          {ex.label && (
                                            <p className="text-xs text-gray-500 px-2 py-1 truncate">{ex.label}</p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}