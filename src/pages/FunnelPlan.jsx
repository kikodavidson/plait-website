import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import useFunnelPlan from "@/hooks/useFunnelPlan";
import SignInWall from "@/components/partnership/SignInWall";
import NoAccess from "@/components/partnership/NoAccess";
import FinishLineEditor from "@/components/funnel/FinishLineEditor";

export default function FunnelPlan() {
  const { user, isLoadingAuth } = useAuth();
  const data = useFunnelPlan();

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
      </div>
    );
  }

  const slug = user?.client_slug || user?.data?.client_slug;
  const workspaces = user?.workspaces || user?.data?.workspaces || [];
  if (!user) return <SignInWall returnTo="/partnership/funnel" />;
  if (user.role !== "admin" && slug !== "partnership" && !workspaces.includes("partnership")) return <NoAccess />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
        <div className="flex items-center justify-between">
          <Link
            to="/partnership"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a] transition-colors hover:text-[#1a1a1a]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Partnership HQ
          </Link>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#9a9a9a]">
            {data.saving ? "Saving…" : "Saved"}
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">Finish line language</h1>
        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#6b6b6b]">
          How a client's life is different after working with us. Write your own lines.
        </p>

        <div className="mt-8">
          {!data.loaded ? (
            <div className="flex justify-center py-10">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
            </div>
          ) : (
            <FinishLineEditor data={data} />
          )}
        </div>
      </div>
    </div>
  );
}