import React from "react";
import { MoreHorizontal, Pencil, StickyNote, ArrowRightLeft, Trash2 } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Per-item menu: Rename, Edit note, Move to folder, Delete. */
export default function ItemMenu({ asset, folders, onRename, onEditNote, onMove, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e5e2dc] bg-white/90 text-[#6b6b6b] shadow-sm transition-colors hover:text-[#1a1a1a]"
          aria-label={`Options for ${asset.title}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={onRename}>
          <Pencil /> Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEditNote}>
          <StickyNote /> Edit note
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ArrowRightLeft /> Move to folder
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {folders
              .filter((f) => f.id !== asset.folder_id)
              .map((f) => (
                <DropdownMenuItem key={f.id} onClick={() => onMove(f.id)}>
                  {f.name}
                </DropdownMenuItem>
              ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-[#b0532f] focus:text-[#b0532f]">
          <Trash2 /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}