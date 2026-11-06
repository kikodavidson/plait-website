import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import GoToMarketDoc from "@/components/partnership/GoToMarketDoc";

const byOrder = (list) => [...(list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
const byNewest = (list) =>
  [...(list || [])].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

export default function GoToMarket() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await base44.functions.invoke("getPublicGtmDoc", {});
      if (!alive) return;
      const d = res.data || {};
      setData({ tabs: byOrder(d.tabs), sections: byOrder(d.sections), versions: byNewest(d.versions) });
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:px-8">
        {user && (
          <Link
            to="/partnership"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to the studio
          </Link>
        )}

        <div className={user ? "mt-5" : ""}>
          {data ? (
            <GoToMarketDoc data={data} />
          ) : (
            <div className="flex justify-center py-24">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}