import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function ClientLogoCard({
  name,
  logo,
  total,
  onEdit,
  onDelete,
  onOpen,
}) {
  return (
    <div className="group relative rounded-xl bg-[#141416] border border-white/10 overflow-hidden hover:border-white/30 transition-colors">
      <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1c1c1e] border-white/15 text-white">
            <DropdownMenuItem onClick={onEdit} className="gap-2 hover:bg-white/10 focus:bg-white/10">
              <Pencil className="w-3.5 h-3.5" /> Edit client
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="gap-2 text-red-400 hover:bg-white/10 focus:bg-white/10 focus:text-red-400">
              <Trash2 className="w-3.5 h-3.5" /> Delete client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-52 flex items-center justify-center p-8">
        {logo ? (
          <img
            src={logo}
            alt={name}
            className="max-h-full max-w-full object-contain mix-blend-screen"
          />
        ) : (
          <span className="text-4xl font-bold tracking-tight text-white/70">
            {(name || "?").slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>

      <div className="border-t border-white/10 p-4">
        <p className="font-bold text-white">{name}</p>
        <p className="mt-1 text-xs text-white/40">
          {total} {total === 1 ? "campaign" : "campaigns"}
        </p>
        <LiquidButton
          size="sm"
          className="mt-3 w-full text-white/80 hover:text-white"
          onClick={onOpen}
        >
          Open builder
        </LiquidButton>
      </div>
    </div>
  );
}