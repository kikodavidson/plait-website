import React from "react";
import { FORMULAS, scoreOf } from "@/lib/funnelPlan";
import FormulaCard from "./FormulaCard";

export default function NameTester({ names, onAdd, onUpdate, onVote, onDelete }) {
  const max = names.reduce((best, n) => Math.max(best, scoreOf(n)), 0);
  const top = max > 0 ? names.find((n) => scoreOf(n) === max) : null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {FORMULAS.map((formula) => (
        <FormulaCard
          key={formula.key}
          formula={formula}
          ideas={names.filter((n) => n.formula === formula.key)}
          topId={top ? top.id : null}
          onAdd={(name) => onAdd(formula.key, name)}
          onVote={(id, partner, delta) => onVote(id, partner, delta)}
          onNote={(id, note) => onUpdate(id, { test_note: note })}
          onDelete={(id) => onDelete(id)}
        />
      ))}
    </div>
  );
}