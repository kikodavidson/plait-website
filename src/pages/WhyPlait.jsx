import React from "react";
import ComparisonTable from "@/components/plait/ComparisonTable";

export default function WhyPlait() {
  return (
    <div>
      <div className="h-[200px]" aria-hidden="true" />
      <section className="mx-auto max-w-3xl px-6 pb-8 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          Why PLAIT
        </h1>
        <p className="mt-5 text-base text-neutral-600 sm:text-lg">
          Agency firepower, freelancer proximity, and in-house depth — woven
          into one system. Compare the tradeoffs and see where PLAIT fits.
        </p>
      </section>
      <ComparisonTable />
    </div>
  );
}