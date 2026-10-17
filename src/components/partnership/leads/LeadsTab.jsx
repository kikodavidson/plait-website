import React, { useState } from "react";
import { LayoutGrid, Plus, Table2, Upload } from "lucide-react";
import { isDue } from "./leadMeta";
import LeadsTable from "./LeadsTable";
import LeadsBoard from "./LeadsBoard";
import AddLeadDialog from "./AddLeadDialog";
import ImportDialog from "./ImportDialog";
import LeadDetail from "./LeadDetail";

/** Leads page: table/board toggle, add + import, due follow-up strip. */
export default function LeadsTab({ data, userName }) {
  const [viewMode, setViewMode] = useState("table");
  const [addOpen, setAddOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [openLeadId, setOpenLeadId] = useState(null);

  const due = data.leads.filter(isDue);
  const openLead = data.leads.find((l) => l.id === openLeadId) || null;

  return (
    <div className="fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-[18px] font-semibold text-[#1a1a1a]">Leads</h3>
          <p className="mt-0.5 text-[13px] text-[#9a9a9a]">
            {data.leads.length} lead{data.leads.length === 1 ? "" : "s"}
            {due.length > 0 ? ` · ${due.length} due for follow-up` : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-[#e5e2dc] bg-white p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                viewMode === "table" ? "bg-[#1a1a1a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f3ef]"
              }`}
            >
              <Table2 className="h-3.5 w-3.5" /> Table
            </button>
            <button
              onClick={() => setViewMode("board")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                viewMode === "board" ? "bg-[#1a1a1a] text-white" : "text-[#6b6b6b] hover:bg-[#f5f3ef]"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Board
            </button>
          </div>
          <button
            onClick={() => setImportOpen(true)}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#e5e2dc] bg-white px-2.5 text-[12px] font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5f3ef]"
          >
            <Upload className="h-3.5 w-3.5" /> Import
          </button>
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#00E676] px-2.5 text-[12px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" /> Add lead
          </button>
        </div>
      </div>

      {due.length > 0 && (
        <div className="mt-4 rounded-xl border border-[#f5d9cf] bg-[#fdf3ef] px-3 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold text-[#b0532f]">Due for follow-up:</span>
            {due.map((l) => (
              <button
                key={l.id}
                onClick={() => setOpenLeadId(l.id)}
                className="rounded-full bg-white px-2.5 py-1 text-[12px] text-[#1a1a1a] transition-colors hover:bg-[#f0eeea]"
              >
                {l.brand_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {viewMode === "table" ? (
        <LeadsTable leads={data.leads} onOpen={setOpenLeadId} />
      ) : (
        <LeadsBoard leads={data.leads} data={data} userName={userName} onOpen={setOpenLeadId} />
      )}

      {addOpen && <AddLeadDialog data={data} userName={userName} onClose={() => setAddOpen(false)} />}
      {importOpen && <ImportDialog data={data} onClose={() => setImportOpen(false)} />}
      <LeadDetail lead={openLead} data={data} userName={userName} onClose={() => setOpenLeadId(null)} />
    </div>
  );
}