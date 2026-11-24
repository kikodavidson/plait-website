import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import useSalesFunnel from "@/hooks/useSalesFunnel";
import SignInWall from "@/components/partnership/SignInWall";
import NoAccess from "@/components/partnership/NoAccess";
import BuilderHeader from "@/components/salesfunnel/BuilderHeader";
import SectionCard from "@/components/salesfunnel/SectionCard";
import OpenQuestions from "@/components/salesfunnel/OpenQuestions";
import { SECTIONS, byOrder } from "@/lib/salesFunnel";

export default function SalesFunnelBuilder() {
  const { user, isLoadingAuth } = useAuth();
  const data = useSalesFunnel();
  const [open, setOpen] = useState({ [SECTIONS[0].key]: true });

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
  if (!user) return <SignInWall returnTo="/partnership/sales-funnel" />;
  if (user.role !== "admin" && slug !== "partnership" && !workspaces.includes("partnership")) return <NoAccess />;

  const first = (user.full_name || user.email || "").split(" ")[0];
  const editor = ["Luke", "Max"].includes(first) ? first : user.role === "admin" ? "Luke" : "Max";

  const done = data.items.filter((item) => item.status === "done").length;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
        <BuilderHeader done={done} total={data.items.length} saving={data.saving} saved={data.saved} />

        {!data.loaded ? (
          <div className="mt-16 flex justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-3">
              {SECTIONS.map((section) => (
                <SectionCard
                  key={section.key}
                  section={section}
                  items={byOrder(data.items.filter((item) => item.section === section.key))}
                  open={!!open[section.key]}
                  onToggle={() => setOpen((o) => ({ ...o, [section.key]: !o[section.key] }))}
                  editor={editor}
                  onSave={data.updateItem}
                />
              ))}
            </div>

            <div className="mt-12">
              <OpenQuestions
                questions={data.questions}
                onAdd={data.addQuestion}
                onToggle={data.toggleQuestion}
                author={editor}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}