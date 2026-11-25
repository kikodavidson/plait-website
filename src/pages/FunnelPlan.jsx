import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import useSalesFunnel from "@/hooks/useSalesFunnel";
import SignInWall from "@/components/partnership/SignInWall";
import NoAccess from "@/components/partnership/NoAccess";
import FunnelSection from "@/components/funnel/FunnelSection";
import { SECTIONS, byOrder } from "@/lib/salesFunnel";
import { RULES } from "@/lib/funnelPlan";

export default function FunnelPlan() {
  const { user, isLoadingAuth } = useAuth();
  const data = useSalesFunnel();

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

  const first = (user.full_name || user.email || "").split(" ")[0];
  const editor = ["Luke", "Max"].includes(first) ? first : user.role === "admin" ? "Luke" : "Max";

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
        <div className="flex items-center justify-between">
          <Link
            to="/partnership"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a] transition-colors hover:text-[#3d6b52]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Partnership HQ
          </Link>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#9a9a9a]">
            {data.saving ? "Saving…" : data.saved ? "Saved" : ""}
          </span>
        </div>

        <h1 className="mt-6 text-3xl leading-tight text-[#1a1a1a] sm:text-4xl">Sales funnel</h1>
        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#6b6b6b]">
          Work through the sections in order and type your answers. Everything saves as you go.
        </p>

        <div className="sticky top-0 z-20 -mx-4 mt-6 border-b border-[#efece8] bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {SECTIONS.map((section) => (
              <a
                key={section.key}
                href={`#${section.key}`}
                className="shrink-0 rounded-full border border-[#e5e2dc] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors hover:border-[#619e80] hover:text-[#1a1a1a]"
              >
                {section.number} · {section.title}
              </a>
            ))}
            <a
              href="#rules"
              className="shrink-0 rounded-full border border-[#e5e2dc] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors hover:border-[#619e80] hover:text-[#1a1a1a]"
            >
              Rules
            </a>
          </div>
        </div>

        {!data.loaded ? (
          <div className="mt-16 flex justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
          </div>
        ) : (
          <div className="mt-10 space-y-14">
            {SECTIONS.map((section) => (
              <FunnelSection
                key={section.key}
                section={section}
                items={byOrder(data.items.filter((item) => item.section === section.key))}
                editor={editor}
                onSave={data.updateItem}
              />
            ))}

            <section id="rules" className="scroll-mt-24">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#619e80]">Rules</p>
              <h2 className="mt-2 text-2xl leading-tight text-[#1a1a1a] sm:text-3xl">The non-negotiables</h2>
              <div className="mt-4 rounded-2xl border border-[#e5e2dc] bg-[#faf9f7] px-5 py-4">
                <ol className="space-y-2">
                  {RULES.map((rule, i) => (
                    <li key={rule} className="flex gap-3 text-[14px] leading-relaxed text-[#3a3a3a]">
                      <span className="text-[11px] font-extrabold text-[#619e80]">{String(i + 1).padStart(2, "0")}</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}