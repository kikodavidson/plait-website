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
    name: "Launch System",
    price: "$2,500 to $4,500",
    description: "You're launching (or re-launching) and you want it done right the first time.",
    items: [
      "Site or landing page build",
      "Meta & TikTok campaign setup",
      "Creative direction and asset specs",
      "Full tracking and pixel setup",
      "30 day post launch support",
      "Messaging and offer strategy",
    ],
    cta: "Let's Launch",
    highlight: true,
  },
  {
    name: "Growth Retainer",
    price: "Custom",
    description: "You want a growth partner in your corner every month, not a hired hand.",
    items: [
      "Ongoing ads management (all channels)",
      "Monthly CRO testing",
      "Content ideation and creative briefs",
      "Bi weekly strategy calls",
      "3 month minimum engagement",
      "Access to Orbit AI tooling",
    ],
    cta: "Talk Retainer",
    highlight: false,
  },
];

export default function PackagesSection() {
  return (
    <section className="py-28 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-xl">
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-3">Packages</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Pick your entry point.
          </h2>
          <p className="text-[#525252] text-base">
            Not sure which one? Start with the Clarity Audit. Most clients do.
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
                  ? "bg-[#4F46E5] border-[#4F46E5] shadow-2xl shadow-indigo-200"
                  : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all"
              }`}
            >
              <div className="mb-6">
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${pkg.highlight ? "text-indigo-200" : "text-[#4F46E5]"}`}>
                  {pkg.name}
                </p>
                <p className={`text-4xl font-extrabold tracking-tight mb-3 ${pkg.highlight ? "text-white" : "text-[#0A0A0A]"}`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {pkg.price}
                </p>
                <p className={`text-sm leading-relaxed ${pkg.highlight ? "text-indigo-100" : "text-[#525252]"}`}>
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {pkg.items.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-sm ${pkg.highlight ? "text-indigo-100" : "text-[#525252]"}`}>
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlight ? "text-white" : "text-[#4F46E5]"}`} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full transition-colors ${
                  pkg.highlight
                    ? "bg-white text-[#4F46E5] hover:bg-indigo-50"
                    : "bg-[#0A0A0A] text-white hover:bg-gray-800"
                }`}
              >
                {pkg.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}