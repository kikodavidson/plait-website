import React from "react";
import { MoreVertical, FolderOpen, Copy, Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BUSINESS_TYPES } from "@/lib/attributionTasks";

export default function ProjectCard({ project, done, total, badgeClass, onOpen, onDuplicate, onArchive, onDelete }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const archived = project.status === "archived";
  const label = BUSINESS_TYPES[project.business_type]?.label || project.business_type;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow ${archived ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <button onClick={onOpen} className="text-left flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{project.name}</h3>
          <p className="text-xs text-gray-500 truncate mt-0.5">{project.client_name || "No client"}</p>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onOpen}>
              <FolderOpen className="w-3.5 h-3.5 mr-2" /> Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onArchive}>
              {archived ? (
                <>
                  <ArchiveRestore className="w-3.5 h-3.5 mr-2" /> Unarchive
                </>
              ) : (
                <>
                  <Archive className="w-3.5 h-3.5 mr-2" /> Archive
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600">
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <span className={`inline-block mt-2.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${badgeClass}`}>
        {label}
      </span>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 mb-1.5">
        <span>{done} of {total} done</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}