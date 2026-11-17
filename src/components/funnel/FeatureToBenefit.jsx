import React, { useState } from "react";
import CoreBenefitCards from "./CoreBenefitCards";
import FeatureTable from "./FeatureTable";

export default function FeatureToBenefit({ features, onAdd, onSave, onDelete }) {
  const [filter, setFilter] = useState("");
  const toggle = (benefit) => setFilter((current) => (current === benefit ? "" : benefit));

  return (
    <div>
      <CoreBenefitCards features={features} active={filter} onSelect={toggle} />
      {filter && (
        <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#9a9a9a]">
          Showing rows tagged to {filter} · click the card again to clear
        </p>
      )}
      <div className="mt-4">
        <FeatureTable
          features={features}
          filter={filter}
          onAdd={() => onAdd({ core_benefit: filter || "" })}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}