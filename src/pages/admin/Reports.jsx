import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ShieldAlert, Users } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ReportUploadForm from "@/components/reports/ReportUploadForm";
import ReportRow from "@/components/reports/ReportRow";

export default function Reports() {
  const [user, setUser] = useState(undefined);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    const page = await base44.entities.Report.list({ sort: "-created_date", limit: 200 });
    setReports(page.items || []);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const me = await base44.auth.me();
      setUser(me);
      if (me.role === "admin") await load();
      else setLoading(false);
    })();
  }, []);

  const replaceFile = async (report, file) => {
    const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
    await base44.entities.Report.update(report.id, { file_url, file_name: file.name });
    await load();
  };

  const remove = async (report) => {
    if (
      !window.confirm(
        `Delete "${report.report_title}"? The link /r/${report.code} will stop working.`
      )
    )
      return;
    await base44.entities.Report.delete(report.id);
    await load();
  };

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-[#c9c4bb]" />
      </div>
    );
  }

  if (user && user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-white px-6 text-center">
        <ShieldAlert className="h-9 w-9 text-[#c9c4bb]" />
        <p className="text-[16px] font-bold text-[#1a1a1a]">Admins only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#1a1a1a]">
      <header className="border-b border-[#e6e3dd] bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#a09b92]">Admin</p>
            <h1 className="text-[18px] font-bold">Client reports</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/admin/clients")}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e0ddd7] px-3 py-1.5 text-[12px] font-bold text-[#1a1a1a] hover:border-[#1a1a1a]"
            >
              <Users className="h-3.5 w-3.5" /> Clients
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e0ddd7] px-3 py-1.5 text-[12px] font-bold text-[#6b6b6b] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Site
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <ReportUploadForm
          existingCodes={reports.map((r) => r.code)}
          onCreated={load}
        />

        <section className="mt-8">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#a09b92]">
            All reports
          </h2>
          <div className="mt-3 overflow-hidden rounded-lg border border-[#e6e3dd] bg-white">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-[#c9c4bb]" />
              </div>
            ) : reports.length === 0 ? (
              <p className="px-4 py-10 text-center text-[13px] text-[#8a857c]">
                No reports yet. Upload one above and its link appears here.
              </p>
            ) : (
              reports.map((r) => (
                <ReportRow
                  key={r.id}
                  report={r}
                  onReplace={replaceFile}
                  onDelete={remove}
                />
              ))
            )}
          </div>
          <p className="mt-3 text-[12px] text-[#a09b92]">
            Each report gets a random 8-character link. No login is needed to view it, and the
            page is hidden from search engines and site navigation.
          </p>
        </section>
      </main>
    </div>
  );
}