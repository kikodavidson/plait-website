import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, ShieldAlert, LogOut, Loader2, FolderDown, Eye } from "lucide-react";
import ClientLogoCard from "@/components/admin/ClientLogoCard";
import ClientDialog from "@/components/admin/ClientDialog";
import { WavesShaderBackground } from "@/components/ui/waves-shader-background";

export default function Clients() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const [c, p] = await Promise.all([base44.entities.Client.list(), base44.entities.Plan.list()]);
      setClients(c);
      setPlans(p);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const me = await base44.auth.me();
      setUser(me);
      if (me.role === "admin") load();
      else setLoading(false);
    })();
  }, []);

  const publishedCount = (slug) => plans.filter((p) => p.client_slug === slug && p.status === "published").length;

  const deleteClient = async (c) => {
    if (!window.confirm(`Delete "${c.name}"? This permanently removes the client and ALL of its plans, angles, blocks, and examples. This cannot be undone.`)) return;
    try {
      const clientPlans = plans.filter((p) => p.client_slug === c.slug);
      if (clientPlans.length) {
        const angles = await base44.entities.Angle.filter({ client_slug: c.slug });
        if (angles.length) {
          const blocks = await base44.entities.Block.filter({ angle_id: { $in: angles.map((a) => a.id) } });
          if (blocks.length) {
            await base44.entities.Example.deleteMany({ block_id: { $in: blocks.map((b) => b.id) } });
            await base44.entities.Block.deleteMany({ angle_id: { $in: angles.map((a) => a.id) } });
          }
          await base44.entities.Angle.deleteMany({ client_slug: c.slug });
        }
        await base44.entities.Plan.deleteMany({ client_slug: c.slug });
      }
      await base44.entities.Client.delete(c.id);
      await load();
    } catch (e) {
      console.error(e);
      alert("Could not delete client. " + (e.message || ""));
    }
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

  return (
    <div className="relative min-h-screen bg-black">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <WavesShaderBackground className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <header className="relative z-30 bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 border-b border-white/10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Admin</p>
          <h1 className="text-xl font-bold">Clients</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/15 p-1">
            <button onClick={() => navigate("/library")} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10">
              <FolderDown className="w-4 h-4" /> Swipe library
            </button>
            <div className="w-px h-5 bg-white/15" />
            <button onClick={() => navigate("/client")} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10">
              <Eye className="w-4 h-4" /> View portal
            </button>
          </div>
          <button onClick={() => { setEditing(null); setDialogOpen(true); }} className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:bg-gray-200">
            <Plus className="w-4 h-4" /> New client
          </button>
          <button onClick={() => base44.auth.logout()} className="text-sm text-white/70 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-full">Log out</button>
        </div>
      </header>
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-gray-300" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((c) => {
              const total = plans.filter((p) => p.client_slug === c.slug).length;
              const published = publishedCount(c.slug);
              return (
                <ClientLogoCard
                  key={c.id}
                  name={c.name}
                  logo={c.logo}
                  total={total}
                  onEdit={() => { setEditing(c); setDialogOpen(true); }}
                  onDelete={() => deleteClient(c)}
                  onOpen={() => navigate(`/admin/clients/${c.id}`)}
                />
              );
            })}
            {clients.length === 0 && <p className="text-gray-400 text-sm col-span-full text-center py-10">No clients yet.</p>}
          </div>
        )}
      </main>
      <ClientDialog open={dialogOpen} client={editing} clients={clients} onClose={() => setDialogOpen(false)} onSaved={() => { setDialogOpen(false); load(); }} />
    </div>
  );
}