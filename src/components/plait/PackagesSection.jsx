import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Clarity Audit",
    price: "$500 to $800",
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
    name: "Growth Retainer",
    price: "Custom",
    description: "A true growth partner in your corner every month. Structured around your goals — including rev share arrangements where the upside is shared when you win.",
    items: [
      "Ongoing ads management (all channels)",
      "Monthly CRO testing",
      "Content ideation and creative briefs",
      "Bi weekly strategy calls",
      "3 month minimum engagement",
      "Access to Orbit AI tooling",
      "Rev share options available",
    ],
    cta: "Let's Talk",
    highlight: true,
  },
  {
    name: "Launch System",
    price: "$2,500 to $4,500",
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
              className={`rounded-3xl border p-8 flex flex-col ${
                pkg.highlight
                  ? "bg-[#2d2d2d] border-[#2d2d2d] shadow-2xl shadow-black/10"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
              }`}
            >
              <div className="mb-6">
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${pkg.highlight ? "text-[#f4f2ee]/40" : "text-[#2d2d2d]"}`}>
                  {pkg.name}
                </p>
                <p className={`text-4xl font-bold mb-3 font-body ${pkg.highlight ? "text-[#f4f2ee]" : "text-[#2d2d2d]"}`}>
                  {pkg.price}
                </p>
                <p className={`text-sm leading-relaxed ${pkg.highlight ? "text-[#f4f2ee]/60" : "text-[#525252]"}`}>
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {pkg.items.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-sm ${pkg.highlight ? "text-[#f4f2ee]/70" : "text-[#525252]"}`}>
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlight ? "text-[#f4f2ee]" : "text-[#2d2d2d]"}`} />
                    {item}
                  </li>
                ))}
              </ul>

              {pkg.highlight && (
                <div className="mb-4 px-4 py-3 rounded-2xl border border-[#f4f2ee]/10 bg-white/5">
                  <p className="text-[#f4f2ee] text-xs font-bold uppercase tracking-widest leading-relaxed">
                    ⚡ Rev share available — when you win, I win.
                  </p>
                </div>
              )}

              <a
                href="https://calendly.com/luke-plaitgrowth"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full transition-colors"
              >
                {pkg.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}