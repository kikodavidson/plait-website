import React from "react";
import { Users, ExternalLink } from "lucide-react";

export default function ClientSwitcher({ clients, value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <Users className="w-4 h-4 text-[#8C8480] absolute left-3 pointer-events-none" />
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none text-xs sm:text-sm font-medium text-[#2B2B2B] bg-white pl-9 pr-8 py-2 rounded-full border border-[#E9E2D6] hover:border-[#2B2B2B] focus:outline-none cursor-pointer max-w-[160px] sm:max-w-[220px] transition-colors"
      >
        <option value="" disabled>View as client…</option>
        {clients.map((c) => (
          <option key={c.id} value={c.slug}>{c.name}</option>
        ))}
      </select>
      <ExternalLink className="w-3 h-3 text-[#2d2d2d]/50 absolute right-3 pointer-events-none" />
    </div>
  );
}