import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import usePartnership from "@/hooks/usePartnership";
import TopBar from "@/components/partnership/TopBar";
import DocsSidebar from "@/components/partnership/DocsSidebar";
import OverviewTab from "@/components/partnership/OverviewTab";
import AgendaTab from "@/components/partnership/AgendaTab";
import OutstandingTasksTab from "@/components/partnership/OutstandingTasksTab";
import FilesTab from "@/components/partnership/FilesTab";
import LeadsTab from "@/components/partnership/leads/LeadsTab";
import VibeBoardsTab from "@/components/vibe/VibeBoardsTab";
import TimelineTab from "@/components/partnership/TimelineTab";
import SectionView from "@/components/partnership/SectionView";
import SectionPanel from "@/components/partnership/SectionPanel";
import NoAccess from "@/components/partnership/NoAccess";
import SignInWall from "@/components/partnership/SignInWall";
import InvitePartnerDialog from "@/components/partnership/InvitePartnerDialog";
import HalftoneHeader from "@/components/partnership/HalftoneHeader";

export default function PartnershipHQ() {
  const { user, isLoadingAuth } = useAuth();
  const data = usePartnership();
  const [view, setView] = useState("overview");
  const [sectionId, setSectionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

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
  if (!user) return <SignInWall />;
  if (user.role !== "admin" && slug !== "partnership" && !workspaces.includes("partnership")) return <NoAccess />;

  const first = (user.full_name || user.email || "").split(" ")[0];
  const userName = ["Luke", "Max"].includes(first) ? first : user.role === "admin" ? "Luke" : "Max";

  const activeSection = sectionId ? data.sections.find((s) => s.id === sectionId) : null;
  const tabName = (data.tabs.find((t) => t.id === activeSection?.tab_id) || {}).name || "";

  const selectSection = (id) => {
    setSectionId(id);
    setView("section");
  };
  const selectView = (v) => {
    setView(v);
    if (v !== "section") setSectionId(null);
  };
  const openTabFirstSection = (tabId) => {
    const firstSection = data.sections.find((s) => s.tab_id === tabId);
    if (firstSection) selectSection(firstSection.id);
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <HalftoneHeader />
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 sm:px-8">
        <div className="flex items-start gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mt-2 rounded-lg p-1.5 text-[#6b6b6b] transition-colors hover:bg-[#f4f2ef] hover:text-[#1a1a1a] xl:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <TopBar user={user} saving={data.saving} onInvite={() => setInviteOpen(true)} />
          </div>
        </div>

        {!data.loaded ? (
          <div className="mt-16 flex justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-12 xl:flex-row xl:gap-10">
            <aside className="hidden shrink-0 xl:block xl:w-[260px]">
              <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto pb-8">
                <DocsSidebar
                  data={data}
                  view={view}
                  activeSectionId={sectionId}
                  onSelectView={selectView}
                  onSelectSection={selectSection}
                />
              </div>
            </aside>

            <main className="min-w-0 flex-1">
              {view === "overview" && (
                <OverviewTab data={data} userName={userName} onSelectTab={openTabFirstSection} />
              )}
              {view === "agenda" && <AgendaTab data={data} userName={userName} />}
              {view === "tasks" && <OutstandingTasksTab data={data} />}
              {view === "files" && <FilesTab data={data} />}
              {view === "leads" && <LeadsTab data={data} userName={userName} />}
              {view === "vibe" && <VibeBoardsTab />}
              {view === "section" && activeSection && (
                <SectionView
                  section={activeSection}
                  tabName={tabName}
                  data={data}
                  userName={userName}
                  user={user}
                  onDeleted={() => {
                    setSectionId(null);
                    setView("overview");
                  }}
                />
              )}
              {view === "section" && !activeSection && (
                <p className="py-10 text-[15px] text-[#6b6b6b]">This section no longer exists.</p>
              )}
              {view === "timeline" && (
                <p className="py-6 text-[15px] text-[#6b6b6b]">Scroll down for the launch timeline.</p>
              )}
            </main>

            {view === "section" && activeSection && (
              <aside className="w-full shrink-0 xl:w-[320px]">
                <div className="xl:sticky xl:top-6">
                  <SectionPanel section={activeSection} data={data} userName={userName} />
                </div>
              </aside>
            )}
          </div>
        )}
      </div>

      {view === "timeline" && data.loaded && <TimelineTab />}

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[290px] overflow-y-auto bg-white p-5 shadow-xl">
            <DocsSidebar
              data={data}
              view={view}
              activeSectionId={sectionId}
              onSelectView={selectView}
              onSelectSection={selectSection}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <InvitePartnerDialog open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}