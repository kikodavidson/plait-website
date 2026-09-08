import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const COLORS = {
  green: "#01c3a8",
  orange: "#ffb741",
  red: "#a63d2a",
  blue: "#1890ff",
};

export default function CourseCard({ data, menuItems = [], onCountdown, onAdd }) {
  const color = COLORS[data.colorClass] || COLORS.blue;

  return (
    <div className="rounded-2xl overflow-hidden text-left text-white shadow-lg" style={{ background: "#232228" }}>
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] uppercase tracking-widest text-white/40 truncate">{data.date}</span>
          {data.status && (
            <span
              className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: `${color}26`, color }}
            >
              {data.status}
            </span>
          )}
        </div>
        {menuItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white/40 hover:text-white shrink-0" aria-label="Card menu">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={item.onClick}
                  className={item.danger ? "text-red-400 focus:text-red-400" : ""}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="px-5 pb-5 pt-3">
        <h3 className="text-lg font-bold truncate">{data.title}</h3>
        <p className="text-sm text-white/50 mt-0.5 truncate">{data.description}</p>
        <div className="flex items-center gap-3 mt-5 text-xs text-white/40">
          <span className="shrink-0">{data.progressLabel || "Progress"}</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: data.progressPercent, background: color }}
            />
          </div>
          <span className="text-white/70 font-medium whitespace-nowrap">{data.progressValue}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#151419" }}>
        <ul className="flex items-center -space-x-2">
          {(data.imgSrc1 || data.initial) && (
            <li>
              {data.imgSrc1 ? (
                <img
                  src={data.imgSrc1}
                  alt={data.imgAlt1 || "logo"}
                  className="w-8 h-8 rounded-full object-cover border-2"
                  style={{ borderColor: "#151419" }}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2"
                  style={{ background: "#3a3a41", color: "#ffffff", borderColor: "#151419" }}
                >
                  {data.initial}
                </div>
              )}
            </li>
          )}
          {onAdd && (
            <li>
              <button
                onClick={onAdd}
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white/5 text-white/50 hover:text-white"
                style={{ borderColor: "#151419" }}
                aria-label="Add"
              >
                <Plus className="w-4 h-4" />
              </button>
            </li>
          )}
        </ul>
        <button
          onClick={onCountdown}
          className="text-xs font-semibold px-3.5 py-1.5 rounded-full hover:opacity-90"
          style={{ background: `${color}26`, color }}
        >
          {data.countdownText}
        </button>
      </div>
    </div>
  );
}