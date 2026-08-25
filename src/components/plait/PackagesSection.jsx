import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const packages = [
  {
    name: "Clarity Audit",
    description: "You're bleeding somewhere and you don't know where. This finds it.",
    items: [
      "Full account audit (ads, analytics, tracking)",
      "Funnel teardown",
      "Conversion analysis",
      "Written report with prioritized fixes",
      "60 minute debrief call",
      "90 day growth roadmap",
    ],
    cta: "Book an Audit",
    highlight: false,
  },
  {
    name: "Growth Partner",
    description: "A true growth partner in your corner every month. Structured around your goals — including rev share arrangements where the upside is shared when you win.",
    items: [
      "Ongoing ads management (all channels)",
      "Monthly CRO testing",
      "Content ideation and creative briefs",
      "Weekly to biweekly strategy calls",
      "3 month minimum engagement",
      "Access to Orbit AI tooling",
      "Flexible pricing models",
    ],
    cta: "Let's Talk",
    highlight: true,
  },
  {
    name: "Launch System",
    description: "Launching (or re-launching) and want it done right the first time.",
    items: [
      "Site or landing page build",
      "Meta & TikTok campaign setup",
      "Creative direction and asset specs",
      "Full tracking and pixel setup",
      "30 day post launch support",
      "Messaging and offer strategy",
    ],
    cta: "Let's Launch",
    highlight: false,
  },
];

export default function PackagesSection() {
  const navigate = useNavigate();
  return (
    <section className="py-28 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-xl">
          <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-3">Packages</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] leading-tight mb-4 font-body">
            Pick your entry point.
          </h2>
          <p className="text-[#525252] text-base">
            Not sure where to start? The Clarity Audit tells you exactly what to fix. Most clients begin there.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative rounded-2xl border p-8 flex flex-col bg-white shadow-md transition-all ${
                pkg.highlight
                  ? "border-[#4F46E5] shadow-lg md:scale-105"
                  : "border-gray-100 hover:border-gray-200 hover:shadow-lg"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-[#4F46E5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Star className="h-3 w-3 fill-current" /> Popular
                </span>
              )}

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#2d2d2d]">
                  {pkg.name}
                </p>
                <p className="text-sm leading-relaxed text-[#525252]">
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#525252]">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#4F46E5]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex justify-center">
                <LiquidMetalButton label={pkg.cta} onClick={() => navigate("/book")} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}