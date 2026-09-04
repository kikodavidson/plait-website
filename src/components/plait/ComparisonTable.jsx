import React from "react";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const check = (text) => ({ icon: "check", text });
const x = (text) => ({ icon: "x", text });
const dot = (text) => ({ icon: "dot", text });

const ROWS = [
  {
    label: "Cost",
    values: [
      check("Affordable"),
      check("Most affordable"),
      x("Highest investment"),
      check("Agency value, freelancer price"),
    ],
  },
  {
    label: "Dedicated attention",
    values: [
      x("Shared across many clients"),
      check("Smaller client roster"),
      check("Exclusive focus"),
      check("Capped client list"),
    ],
  },
  {
    label: "Collaboration",
    values: [
      check("Multiple specialists"),
      dot("Embedded in your team"),
      dot("Embedded in your team"),
      dot("Embedded in your team"),
    ],
  },
  {
    label: "Flexibility",
    values: [
      x("Restricted to business model"),
      check("Highly adaptable"),
      check("Most adaptable"),
      check("Highly adaptable"),
    ],
  },
  {
    label: "Scalability",
    values: [
      check("Large support team"),
      x("Limited by one person"),
      x("Requires more hiring"),
      check("Network scales with you"),
    ],
  },
  {
    label: "Business knowledge",
    values: [
      dot("Deep for priority clients"),
      check("Deeper than an agency"),
      check("Deep on one company"),
      check("Deep on your brand"),
    ],
  },
  {
    label: "Processes & reporting",
    values: [
      check("Established systems"),
      dot("Some systems"),
      check("Established systems"),
      check("Established systems plus in-house reporting"),
    ],
  },
  {
    label: "Communication",
    values: [
      x("Multiple layers - delayed response"),
      check("Direct access"),
      check("Direct access"),
      check("Direct access to me"),
    ],
  },
  {
    label: "Innovation",
    values: [
      check("Exposure to many markets"),
      check("Fresh perspective"),
      dot("Deep internal knowledge"),
      check("Many markets, fresh eyes"),
    ],
  },
];

function CellContent({ value }) {
  if (value.icon === "check") {
    return (
      <span className="inline-flex items-start gap-1.5 text-left">
        <Check className="mt-0.5 size-3.5 shrink-0 text-[#3B82F6]" aria-hidden />
        <span>{value.text}</span>
      </span>
    );
  }
  if (value.icon === "x") {
    return (
      <span className="inline-flex items-start gap-1.5 text-left">
        <X className="mt-0.5 size-3.5 shrink-0 text-[#EF4444]" aria-hidden />
        <span className="text-neutral-500">{value.text}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-start gap-1.5 text-left">
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#9CA3AF]" aria-hidden />
      <span>{value.text}</span>
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <section className="bg-[#F8F9FC] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
          Compare the tradeoffs before you decide
        </p>
        <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Not All Marketing Partners Are Built the Same
        </h2>
        <div className="overflow-x-auto border border-neutral-200 bg-white">
          <Table className="min-w-[900px] table-fixed text-sm">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[24%] border-b border-neutral-200 bg-white align-bottom">
                  <span className="inline-block pb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Category
                  </span>
                </TableHead>
                {["Agency", "Freelancer", "In-house"].map((name) => (
                  <TableHead
                    key={name}
                    className="border-b border-neutral-200 bg-white text-center align-bottom"
                  >
                    <span className="inline-block pb-3 font-bold">{name}</span>
                  </TableHead>
                ))}
                <TableHead className="border-b-0 bg-gradient-to-b from-[#7C3AED] to-[#2DD4BF] text-center align-bottom">
                  <span className="inline-block pb-3 font-bold text-white">PLAIT</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((row) => (
                <TableRow key={row.label} className="hover:bg-transparent">
                  <TableCell className="py-3 font-semibold">{row.label}</TableCell>
                  {row.values.map((value, i) => (
                    <TableCell
                      key={`${row.label}-${i}`}
                      className={cn("py-3", i === 3 && "bg-[#7C3AED]/5")}
                    >
                      <CellContent value={value} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}