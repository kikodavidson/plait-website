import React from "react";
import { Plus } from "lucide-react";
import ServiceRow from "./ServiceRow";

export default function ServicesList({ services, onAdd, onSave, onDelete }) {
  return (
    <div>
      {services.length === 0 && (
        <p className="text-[13px] text-[#9a9a9a]">No services listed yet. Add the first one.</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            onSave={(patch) => onSave(service.id, patch)}
            onDelete={() => onDelete(service.id)}
          />
        ))}
      </div>

      <button
        onClick={onAdd}
        className="mt-4 flex items-center gap-2 rounded-full border border-[#e5e2dc] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors hover:border-[#619e80] hover:text-[#1a1a1a]"
      >
        <Plus className="h-3.5 w-3.5 text-[#619e80]" /> Add service
      </button>
    </div>
  );
}