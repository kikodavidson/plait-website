import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";

/** Public report page: renders the uploaded HTML file untouched, full width. */
export default function ReportView() {
  const { code } = useParams();
  const [state, setState] = useState({ loading: true, report: null });
  const [height, setHeight] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  useEffect(() => {
    let alive = true;
    setState({ loading: true, report: null });
    base44.functions
      .invoke("getReportByCode", { code })
      .then((res) => {
        if (alive) setState({ loading: false, report: res.data });
      })
      .catch(() => {
        if (alive) setState({ loading: false, report: null });
      });
    return () => {
      alive = false;
    };
  }, [code]);

  const html = state.report && !state.report.error ? state.report.html : null;

  const measure = () => {
    const doc = frameRef.current && frameRef.current.contentDocument;
    if (!doc) return;
    const bodyHeight = doc.body ? doc.body.scrollHeight : 0;
    const rootHeight = doc.documentElement ? doc.documentElement.scrollHeight : 0;
    const next = Math.max(bodyHeight, rootHeight);
    if (next > 0) setHeight(next);
  };

  useEffect(() => {
    if (state.loading || html) return;
    const meta = document.createElement("meta");
    meta.name = "prerender-status-code";
    meta.content = "404";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, [state.loading, html]);

  if (state.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#eceae6] border-t-[#1a1a1a]" />
      </div>
    );
  }

  if (!html) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white px-6 text-center">
        <p className="text-[18px] font-bold text-[#1a1a1a]">This report link isn't available.</p>
        <p className="text-[14px] text-[#6b6b6b]">
          The link may have changed, or the report was removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <iframe
        ref={frameRef}
        title={state.report.report_title || "Performance report"}
        srcDoc={html}
        onLoad={() => {
          measure();
          window.setTimeout(measure, 400);
          window.setTimeout(measure, 1500);
        }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        className="block w-full border-0"
        style={{ height: height ? `${height}px` : "100vh", minHeight: "100vh" }}
      />
    </div>
  );
}