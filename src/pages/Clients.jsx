import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, ShieldAlert, LogOut, Loader2, FolderDown } from "lucide-react";
import ClientDialog from "@/components/admin/ClientDialog";

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#2d2d2d] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-30">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-50">Admin</p>
          <h1 className="text-xl font-bold">Clients</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/library")} className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white px-3 py-2 rounded-full hover:bg-white/10">
            <FolderDown className="w-4 h-4" /> Swipe library
          </button>
          <button onClick={() => { setEditing(null); setDialogOpen(true); }} className="inline-flex items-center gap-2 bg-white text-[#2d2d2d] text-sm font-bold px-4 py-2 rounded-full hover:bg-gray-100">
            <Plus className="w-4 h-4" /> New client
          </button>
          <button onClick={() => base44.auth.logout()} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full">Log out</button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-gray-300" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center gap-3">
                  {c.logo ? (
                    <img src={c.logo} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-bold">{(c.name || "?").slice(0, 1)}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#2d2d2d] truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 truncate">/{c.slug}</p>
                  </div>
                  <button onClick={() => { setEditing(c); setDialogOpen(true); }} className="text-gray-400 hover:text-[#2d2d2d]">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-green-100 text-green-700" : c.status === "paused" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                    {c.status || "active"}
                  </span>
                  <button onClick={() => navigate(`/admin/clients/${c.id}`)} className="text-sm font-medium text-[#2d2d2d] hover:underline">Open builder →</button>
                </div>
                <p className="text-xs text-gray-400 mt-2">{publishedCount(c.slug)} published plan(s)</p>
              </div>
            ))}
            {clients.length === 0 && <p className="text-gray-400 text-sm col-span-full text-center py-10">No clients yet.</p>}
          </div>
        )}
      </main>
      <ClientDialog open={dialogOpen} client={editing} clients={clients} onClose={() => setDialogOpen(false)} onSaved={() => { setDialogOpen(false); load(); }} />
    </div>
  );
}