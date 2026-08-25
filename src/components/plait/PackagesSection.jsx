import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
    featured: false,
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
    featured: true,
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
    featured: false,
  },
];

export default function PackagesSection() {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-xl">
          <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-3">Packages</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] leading-tight mb-4 font-body text-balance">
            Pick your entry point.
          </h2>
          <p className="text-[#525252] text-base text-pretty">
            Not sure where to start? The Clarity Audit tells you exactly what to fix. Most clients begin there. Reach out for pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-lg p-8 flex flex-col border transition-all ${
                pkg.featured
                  ? "bg-[#2d2d2d] text-white shadow-2xl lg:scale-105 border-transparent"
                  : "bg-[#F8F7FF] border-gray-200 hover:shadow-lg hover:border-gray-300"
              }`}
            >
              <div className="text-left mb-8">
                <h4 className="font-bold text-lg">{pkg.name}</h4>
                <p className={`text-sm ${pkg.featured ? "text-white/60" : "text-[#525252]"}`}>
                  {pkg.description}
                </p>
              </div>

              <div className="mb-8 text-left">
                <p className={`text-xs font-bold uppercase tracking-widest ${pkg.featured ? "text-white/70" : "text-[#2d2d2d]"}`}>
                  Reach out for pricing
                </p>
              </div>

              <div className="flex justify-center mb-10">
                <LiquidMetalButton label={pkg.cta} onClick={() => navigate("/book")} />
              </div>

              <div className={`space-y-4 pt-8 border-t text-left ${pkg.featured ? "border-white/20" : "border-gray-200"}`}>
                {pkg.items.map((item) => (
                  <div key={item} className={`flex items-center gap-3 text-sm ${pkg.featured ? "text-white/80" : "text-[#525252]"}`}>
                    <Check className={`w-4 h-4 shrink-0 ${pkg.featured ? "text-white" : "text-[#4F46E5]"}`} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}