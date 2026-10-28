import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Palette } from "lucide-react";

/** Sticky dark sidebar shared by the vibe board dashboard and canvas views. */
export default function VibeShell({ children }) {
  const { pathname } = useLocation();
  const onDashboard = pathname === "/vibe";

  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-white md:flex-row">
      <aside className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-[#2A2A2A] bg-[#181818] px-4 py-3 md:h-screen md:w-56 md:flex-col md:items-stretch md:justify-start md:border-b-0 md:border-r md:py-6">
        <Link to="/vibe" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00E676] text-black">
            <Palette className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-bold tracking-tight">Vibe Boards</span>
        </Link>
        <nav className="flex items-center gap-1 md:mt-8 md:flex-col md:items-stretch">
          <Link
            to="/vibe"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
              onDashboard ? "bg-[#242424] text-white" : "text-[#9a9a9a] hover:bg-[#1f1f1f] hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
        <p className="hidden text-[11.5px] leading-relaxed text-[#6b6b6b] md:mt-auto md:block">
          Collect the feeling. Boards sync live between partners.
        </p>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}