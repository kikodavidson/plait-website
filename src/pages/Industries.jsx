import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Check } from "lucide-react";

const industries = [
  {
    id: "ecommerce",
    label: "E-Commerce",
    headline: "Built for brands that sell.",
    subheadline: "E-commerce is a margin game. Every click costs money. Every conversion has to count.",
    body: "Most e-commerce brands have the same problem: they're running ads to a website that wasn't built to convert, and they're measuring results with tracking that's half-broken. We fix the foundation first — then scale what works.",
    focus: [
      "Meta & TikTok performance campaigns",
      "Google Shopping & Performance Max",
      "Shopify development & CRO",
      "Checkout optimization",
      "Attribution & pixel accuracy",
      "Creative testing frameworks",
      "Offer architecture & bundling",
      "Email & retention strategy",
    ],
    stat1: { value: "$2M+", label: "Ad spend managed" },
    stat2: { value: "80+", label: "Brands scaled" },
  },
  {
    id: "saas",
    label: "SaaS",
    headline: "Acquisition is only the beginning.",
    subheadline: "SaaS growth isn't about getting more signups. It's about getting the right ones.",
    body: "The wrong users churn. The wrong messaging attracts the wrong buyers. We help SaaS companies sharpen their positioning, tighten their funnel, and build acquisition systems that bring in users who actually stick around.",
    focus: [
      "Positioning & messaging strategy",
      "LinkedIn & Google demand gen",
      "Landing page development & CRO",
      "Trial-to-paid funnel optimization",
      "GA4 & attribution setup",
      "Product-led growth strategy",
      "ICP definition & targeting",
      "Competitive differentiation",
    ],
    stat1: { value: "11+", label: "Growth channels" },
    stat2: { value: "Full-funnel", label: "From awareness to activation" },
  },
  {
    id: "apps",
    label: "Apps",
    headline: "Downloads don't pay the bills.",
    subheadline: "App growth is about DAUs, retention, and revenue — not installs.",
    body: "Most app marketers optimize for the install and forget about what happens next. We build acquisition systems that attract users who actually engage, and we work backwards from retention to make sure the creative and messaging attracts the right audience from day one.",
    focus: [
      "Apple Search Ads & Google UAC",
      "TikTok & Meta app install campaigns",
      "Onboarding & activation optimization",
      "ASO strategy",
      "In-app event tracking",
      "Creative for mobile-native formats",
      "Retention & re-engagement",
      "LTV modeling & bid strategy",
    ],
    stat1: { value: "Mobile-first", label: "Creative built for the format" },
    stat2: { value: "Full-stack", label: "Acquisition to retention" },
  },
];

export default function Industries() {
  const [active, setActive] = useState("ecommerce");
  const navigate = useNavigate();
  const industry = industries.find((i) => i.id === active);

  return (
    <div className="pt-28 pb-24">
      <div className="hero-gradient pb-16 px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#5E58D5] uppercase tracking-widest mb-4">Industries</p>
            <h1 className="font-body text-6xl sm:text-7xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-6 max-w-3xl">
              Different businesses.<br />Same standard.
            </h1>
            <p className="text-[#525252] text-lg max-w-xl leading-relaxed">
              The principles don't change. The application does. Here's how we approach growth across the verticals we know best.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Tab switcher */}
        <div className="flex gap-3 mb-16 flex-wrap">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                active === ind.id
                  ? "bg-[#2d2d2d] text-[#f4f2ee] shadow-md"
                  : "bg-white border border-gray-200 text-[#525252] hover:border-gray-400 hover:text-[#2d2d2d]"
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-body text-4xl sm:text-5xl font-bold text-[#2d2d2d] tracking-tight mb-3">
                  {industry.headline}
                </h2>
                <p className="text-[#5E58D5] font-semibold text-sm mb-5 italic">{industry.subheadline}</p>
                <p className="text-[#525252] leading-relaxed mb-10">{industry.body}</p>

                {/* Stats */}
                <div className="flex gap-10">
                  <div>
                    <p className="font-body text-4xl font-bold text-[#2d2d2d]">{industry.stat1.value}</p>
                    <p className="text-xs text-[#525252] font-semibold uppercase tracking-wider mt-1">{industry.stat1.label}</p>
                  </div>
                  <div className="border-l border-gray-200 pl-10">
                    <p className="font-body text-4xl font-bold text-[#2d2d2d]">{industry.stat2.value}</p>
                    <p className="text-xs text-[#525252] font-semibold uppercase tracking-wider mt-1">{industry.stat2.label}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F7FF] border border-indigo-100 rounded-3xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] mb-6">Where We Focus</p>
                <ul className="space-y-3">
                  {industry.focus.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#525252]">
                      <Check className="w-4 h-4 text-[#5E58D5] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-indigo-100">
                  <LiquidMetalButton label="Start a Conversation" onClick={() => navigate("/book")} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}