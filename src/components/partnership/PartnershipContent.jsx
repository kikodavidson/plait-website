import React from "react";
import { useTabs } from "@/components/ui/sidebar-with-chrome-like-tabs";
import OverviewTab from "@/components/partnership/OverviewTab";
import AgendaTab from "@/components/partnership/AgendaTab";
import OutstandingTasksTab from "@/components/partnership/OutstandingTasksTab";
import FilesTab from "@/components/partnership/FilesTab";
import TimelineTab from "@/components/partnership/TimelineTab";
import EditTabsView from "@/components/partnership/EditTabsView";
import SectionView from "@/components/partnership/SectionView";

/**
 * Renders the active view inside the shell's rounded panel, by nav id:
 * "overview", "timeline", "questions", "tasks", "files", "edittabs",
 * or "section:<id>" for a single section.
 */
export default function PartnershipContent({ navId, data, userName, user }) {
  const { setActiveNav } = useTabs();

  if (navId.startsWith("section:")) {
    const section = data.sections.find((s) => s.id === navId.slice(8));
    if (!section) {
      return <p className="p-6 text-[15px] text-[#6b6b6b] sm:p-8">This section no longer exists.</p>;
    }
    const tabName = (data.tabs.find((t) => t.id === section.tab_id) || {}).name || "";
    return (
      <div className="p-6 sm:p-8">
        <SectionView
          section={section}
          tabName={tabName}
          data={data}
          userName={userName}
          user={user}
          onDeleted={() => setActiveNav("overview")}
        />
      </div>
    );
  }

  const openTab = (tabId) => {
    const firstSection = data.sections.find((s) => s.tab_id === tabId);
    setActiveNav(firstSection ? `section:${firstSection.id}` : "overview");
  };

  return (
    <div className="p-6 sm:p-8">
      {navId === "overview" && (
        <OverviewTab data={data} userName={userName} onSelectTab={openTab} />
      )}
      {navId === "questions" && <AgendaTab data={data} userName={userName} />}
      {navId === "tasks" && <OutstandingTasksTab data={data} />}
      {navId === "files" && <FilesTab />}
      {navId === "timeline" && <TimelineTab />}
      {navId === "edittabs" && <EditTabsView data={data} />}
    </div>
  );
}