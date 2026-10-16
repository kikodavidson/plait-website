import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import usePartnership from "@/hooks/usePartnership";
import TopBar from "@/components/partnership/TopBar";
import TabBar from "@/components/partnership/TabBar";
import OverviewTab from "@/components/partnership/OverviewTab";
import AgendaTab from "@/components/partnership/AgendaTab";
import WorkspaceTab from "@/components/partnership/WorkspaceTab";
import NoAccess from "@/components/partnership/NoAccess";

export default function PartnershipHQ() {
  const { user, isLoadingAuth } = useAuth();
  const data = usePartnership();
  const [activeId, setActiveId] = useState("overview");

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
  if (!user || (user.role !== "admin" && slug !== "partnership")) return <NoAccess />;

  const userName = (user.full_name || user.email || "").split(" ")[0];
  const tabs = [
    { id: "overview", name: "Overview", fixed: true },
    ...data.tabs,
    { id: "agenda", name: "Open Questions", fixed: true },
  ];
  const activeTab = data.tabs.find((t) => t.id === activeId);
  const showOverview = activeId === "overview" || (!activeTab && activeId !== "agenda");
  const showAgenda = activeId === "agenda";

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8">
        <TopBar user={user} saving={data.saving} />
        {!data.loaded ? (
          <div className="mt-16 flex justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
          </div>
        ) : (
          <>
            <TabBar
              tabs={tabs}
              activeId={activeId}
              onSelect={setActiveId}
              contentTabs={data.tabs}
              onAdd={data.addTab}
              onRename={data.renameTab}
              onMove={data.moveTab}
              onDelete={data.deleteTab}
            />
            <div className="mt-10">
              {showOverview && <OverviewTab data={data} onSelectTab={setActiveId} />}
              {showAgenda && <AgendaTab data={data} userName={userName} />}
              {activeTab && !showOverview && !showAgenda && (
                <WorkspaceTab tab={activeTab} data={data} userName={userName} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}