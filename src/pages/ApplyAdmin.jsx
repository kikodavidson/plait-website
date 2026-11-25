import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import NoAccess from "@/components/partnership/NoAccess";
import LeadFilters from "@/components/apply/admin/LeadFilters";
import LeadDetail from "@/components/apply/admin/LeadDetail";
import { RESULT_META, optionLabel } from "@/lib/applyQuestions";

const isPartner = (user) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  const first = (user.full_name || "").trim().split(" ")[0].toLowerCase();
  return first === "luke" || first === "max";
};

const dateLabel = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function ApplyAdmin() {
  const { user, isLoadingAuth } = useAuth();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, qualified: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ result: "all", industry: "all", spend: "all" });
  const [selectedId, setSelectedId] = useState(null);

  const allowed = isPartner(user);

  useEffect(() => {
    if (!allowed) return;
    (async () => {
      try {
        const response = await base44.functions.invoke("applyLeads", { action: "list" });
        setLeads(response.data?.items || []);
        setStats(response.data?.stats || { total: 0, qualified: 0 });
      } finally {
        setLoading(false);
      }
    })();
  }, [allowed]);

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const resultKey = lead.completed ? lead.result : "incomplete";
      if (filters.result !== "all" && resultKey !== filters.result) return false;
      if (filters.industry !== "all" && lead.sells !== filters.industry) return false;
      if (filters.spend !== "all" && lead.ad_spend !== filters.spend) return false;
      return true;
    });
  }, [leads, filters]);

  const selected = leads.find((lead) => lead.id === selectedId) || null;

  const updateLead = async (patch) => {
    if (!selected) return;
    setLeads((current) => current.map((lead) => (lead.id === selected.id ? { ...lead, ...patch } : lead)));
    await base44.functions.invoke("applyLeads", { action: "update", id: selected.id, patch });
  };

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
      </div>
    );
  }

  if (!allowed) return <NoAccess />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <Link
          to="/partnership"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a] transition-colors hover:text-[#3d6b52]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Partnership HQ
        </Link>

        <h1 className="mt-5 text-3xl leading-tight sm:text-4xl">Applications</h1>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-2xl border border-[#e5e2dc] bg-[#faf9f7] px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">Leads this month</p>
            <p className="mt-1 text-2xl">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-[#e5e2dc] bg-[#faf9f7] px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">Qualified this month</p>
            <p className="mt-1 text-2xl text-[#3d6b52]">{stats.qualified}</p>
          </div>
        </div>

        <div className="mt-6">
          <LeadFilters filters={filters} onChange={setFilters} leads={leads} />
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-[#dcd5c9] bg-[#faf9f7] px-6 py-10 text-center text-[14px] text-[#6b6b6b]">
            No applications match these filters yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e2dc]">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="bg-[#faf9f7]">
                  {["Date", "Name", "Company", "Website", "Ad spend", "Industry", "Result"].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const meta = lead.completed ? RESULT_META[lead.result] : RESULT_META.incomplete;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedId(lead.id)}
                      className="cursor-pointer border-t border-[#efece8] transition-colors hover:bg-[#faf9f7]"
                    >
                      <td className="px-4 py-3 text-[13px] text-[#6b6b6b]">{dateLabel(lead.created_date)}</td>
                      <td className="px-4 py-3 text-[14px]">{lead.name}</td>
                      <td className="px-4 py-3 text-[14px]">{lead.company}</td>
                      <td className="px-4 py-3 text-[13px] text-[#6b6b6b]">{lead.website}</td>
                      <td className="px-4 py-3 text-[13px] text-[#6b6b6b]">
                        {lead.ad_spend ? optionLabel("ad_spend", lead.ad_spend) : "—"}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-[#6b6b6b]">
                        {lead.sells ? optionLabel("sells", lead.sells) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.className}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <LeadDetail lead={selected} onClose={() => setSelectedId(null)} onUpdate={updateLead} />
      )}
    </div>
  );
}