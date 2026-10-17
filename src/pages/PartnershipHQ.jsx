import React, { useEffect, useState } from "react";
import {
  Clock,
  Folder,
  HelpCircle,
  Home,
  ListTodo,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import usePartnership from "@/hooks/usePartnership";
import usePartnerPhotos from "@/hooks/usePartnerPhotos";
import { SidebarWithTabs } from "@/components/ui/sidebar-with-chrome-like-tabs";
import PartnershipContent from "@/components/partnership/PartnershipContent";
import { STAGE_DOTS } from "@/components/partnership/stageMeta";
import { ACCENT } from "@/components/partnership/accent";
import NoAccess from "@/components/partnership/NoAccess";
import SignInWall from "@/components/partnership/SignInWall";
import InvitePartnerDialog from "@/components/partnership/InvitePartnerDialog";

export default function PartnershipHQ() {
  const { user, isLoadingAuth } = useAuth();
  const data = usePartnership();
  const [inviteOpen, setInviteOpen] = useState(false);

  const first = (user?.full_name || user?.email || "").split(" ")[0];
  const userName = ["Luke", "Max"].includes(first)
    ? first
    : user?.role === "admin"
      ? "Luke"
      : "Max";
  const [photos] = usePartnerPhotos(user, userName);

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
  if (!user) return <SignInWall />;
  if (user.role !== "admin" && slug !== "partnership") return <NoAccess />;

  if (!data.loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sidebar">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#2d6a4f]" />
      </div>
    );
  }

  const openQuestions = (sectionId) =>
    data.questions.filter((q) => q.section_id === sectionId && !q.resolved).length;
  const totalOpen = data.questions.filter((q) => !q.resolved).length;
  const openTasks = data.tasks.filter((t) => t.status !== "done").length;

  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "d1", label: "", kind: "divider" },
    ...data.tabs.map((tab) => ({
      id: `group:${tab.id}`,
      label: tab.name,
      kind: "group",
      children: data.sections
        .filter((s) => s.tab_id === tab.id)
        .map((s) => ({
          id: `section:${s.id}`,
          label: s.name,
          dot: STAGE_DOTS[s.stage] || "#9a9a9a",
          badge: openQuestions(s.id) || undefined,
        })),
    })),
    { id: "d2", label: "", kind: "divider" },
    { id: "questions", label: "Open questions", icon: HelpCircle, badge: totalOpen || undefined },
    { id: "tasks", label: "Outstanding tasks", icon: ListTodo, badge: openTasks || undefined },
    { id: "files", label: "Files", icon: Folder },
    { id: "edittabs", label: "Edit tabs", icon: Pencil },
  ];

  const addChild = async (groupId) => {
    const tabId = groupId.replace("group:", "");
    const created = await data.addSection(tabId, "New section");
    return created ? `section:${created.id}` : undefined;
  };

  const logo = (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
      style={{ backgroundColor: ACCENT, color: "#ffffff" }}
    >
      P
    </div>
  );

  const footer = (
    <div className="flex w-full items-center gap-2">
      <div className="flex shrink-0 -space-x-1.5">
        {["Luke", "Max"].map((name) => (
          <span key={name} className="relative h-7 w-7 rounded-full ring-2 ring-sidebar">
            {photos[name] ? (
              <img src={photos[name]} alt={name} className="h-full w-full rounded-full object-cover" />
            ) : (
              <span
                className="flex h-full w-full items-center justify-center rounded-full bg-[#e8f0eb] text-[11px] font-bold text-[#2d6a4f]"
              >
                {name[0]}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="truncate text-[12px] font-semibold text-sidebar-foreground">
          Signed in as {userName}
        </p>
        {data.saving && <p className="text-[10px] text-muted-foreground">Saving…</p>}
      </div>
      <button
        onClick={() => setInviteOpen(true)}
        className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: ACCENT }}
      >
        Invite
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-sidebar"
      style={{ "--sidebar-primary": "153 40% 30%", "--sidebar-ring": "153 40% 30%" }}
    >
      <SidebarWithTabs
        logo={logo}
        companyName="Partnership HQ"
        navItems={navItems}
        renderContent={(navId) => (
          <PartnershipContent navId={navId} data={data} userName={userName} user={user} />
        )}
        defaultNavId="overview"
        onAddChild={addChild}
        footer={footer}
      />
      <InvitePartnerDialog open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}