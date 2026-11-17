import React from "react";
import { Plus } from "lucide-react";
import { ACCENT } from "@/lib/funnelPlan";
import ServiceRow from "./ServiceRow";

export default function ServicesList({ services, onAdd, onSave, onDelete }) {
  return (
    <div>
      {services.length === 0 && (
        <p className="text-[13px] text-[#5A5C55]">No services listed yet. Add the first one.</p>
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
        className="mt-4 flex items-center gap-2 rounded-full border border-[#2C2C31] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#A9ACA2] transition-colors hover:border-[#C8FF3D] hover:text-white"
      >
        <Plus className="h-3.5 w-3.5" style={{ color: ACCENT }} /> Add service
      </button>
    </div>
  );
}