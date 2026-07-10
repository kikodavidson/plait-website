import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

const sections = [
  {
    num: "01",
    emoji: "🟦",
    title: "Account Creation",
    goal: "Create the Meta Business Account and verify business details.",
    steps: [
      { id: "1.1", task: "Create Meta Business Account", description: "Go to business.facebook.com/create, log in with Facebook profile, and name the business." },
      { id: "1.2", task: "Add Business Details", description: "Enter official business name, address, email, and phone number." },
      { id: "1.3", task: "Verify Business Email", description: "Meta sends a confirmation email. Verify ownership." },
    ],
  },
  {
    num: "02",
    emoji: "🟦",
    title: "Create / Add Assets",
    goal: "Connect all the foundational business assets (Page, Instagram, Ad Account, Payment Method).",
    steps: [
      { id: "2.1", task: "Create Facebook Page", description: "Go to facebook.com/pages/create and follow prompts." },
      { id: "2.2", task: "Connect Instagram Account", description: "Business Settings → Accounts → Instagram → Add Account." },
      { id: "2.3", task: "Create Ad Account", description: "Business Settings → Accounts → Ad Accounts → Create New." },
      { id: "2.4", task: "Add Payment Method", description: "Inside Ad Account → Payment Settings → Add credit card or PayPal." },
    ],
  },
  {
    num: "03",
    emoji: "🟦",
    title: "Share Access With Our Team",
    goal: "Ensure we have full access to all necessary assets.",
    steps: [
      { id: "3.1", task: "Add Partner Access", description: "Instead of adding us under People, go to Settings → Users → Partners → Add." },
      { id: "3.2", task: "Enter Agency Business ID", description: "When prompted, enter our Business Manager ID: 2150213875802676." },
      { id: "3.3", task: "Assign Assets", description: "Grant access to your Facebook Page, Instagram, Ad Account, and Pixel — all with full control." },
    ],
  },
  {
    num: "04",
    emoji: "🟦",
    title: "Tracking Setup",
    goal: "Set up and verify conversion tracking to measure performance.",
    steps: [
      { id: "4.1", task: "Create Meta Pixel", description: "Business Settings → Data Sources → Pixels → Create.", responsibility: "You" },
      { id: "4.2", task: "Add Pixel to Website", description: "Use Shopify, GTM, or manual code.", responsibility: "Developer" },
      { id: "4.3", task: "Verify Pixel Firing", description: "Use Meta Pixel Helper Chrome Extension.", responsibility: "Marketing Team" },
      { id: "4.4", task: "Domain Verification", description: "Business Settings → Brand Safety → Domains → Add domain + add TXT record in DNS.", responsibility: "You" },
      { id: "4.5", task: "Configure Aggregated Events", description: "Events Manager → Select pixel → Configure Web Events → Rank top 8 conversion events.", responsibility: "Dev / Marketing Team" },
    ],
  },
];

function StepRow({ step, checked, onToggle }) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
        checked ? "bg-[#f4f2ee] border-gray-200" : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
      onClick={onToggle}
    >
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked ? "bg-[#2d2d2d] border-[#2d2d2d]" : "border-gray-300"
      }`}>
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest">{step.id}</span>
          <span className={`font-semibold text-sm ${checked ? "line-through text-[#999]" : "text-[#2d2d2d]"}`}>{step.task}</span>
          {step.responsibility && (
            <span className="text-xs bg-gray-100 text-[#525252] px-2 py-0.5 rounded-full">{step.responsibility}</span>
          )}
        </div>
        <p className="text-xs text-[#525252] mt-1 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

export default function MetaOnboarding() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const allSteps = sections.flatMap((s) => s.steps);
  const doneCount = allSteps.filter((s) => checked[s.id]).length;
  const total = allSteps.length;
  const progress = Math.round((doneCount / total) * 100);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-3">Meta Ads Setup</p>
          <h1 className="font-body text-5xl sm:text-6xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-4">
            Onboarding Checklist.
          </h1>
          <p className="text-[#525252] text-lg leading-relaxed max-w-xl">
            Your step-by-step guide to getting fully set up on Meta Ads. Work through each section in order — tick items off as you go.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#2d2d2d]">Overall Progress</span>
            <span className="text-sm font-bold text-[#2d2d2d]">{doneCount} / {total} completed</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2d2d2d] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#525252] mt-2">{progress}% done</p>
        </motion.div>
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto space-y-12">
        {sections.map((section, i) => {
          const sectionDone = section.steps.filter((s) => checked[s.id]).length;
          return (
            <motion.div
              key={section.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {section.num}
                </div>
                <div>
                  <h2 className="font-body text-2xl font-bold text-[#2d2d2d] tracking-tight leading-tight">{section.title}</h2>
                  <p className="text-sm text-[#525252] mt-0.5">
                    <span className="font-semibold text-[#2d2d2d]">Goal:</span> {section.goal}
                  </p>
                </div>
                <div className="ml-auto text-xs font-semibold text-[#525252] shrink-0 pt-1">
                  {sectionDone}/{section.steps.length}
                </div>
              </div>
              <div className="space-y-3 pl-14">
                {section.steps.map((step) => (
                  <StepRow
                    key={step.id}
                    step={step}
                    checked={!!checked[step.id]}
                    onToggle={() => toggle(step.id)}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-16 bg-[#2d2d2d] rounded-3xl p-10 text-center"
      >
        <h3 className="font-body text-3xl font-bold text-[#f4f2ee] mb-3">Need help with any step?</h3>
        <p className="text-[#f4f2ee]/60 text-sm mb-6 leading-relaxed">
          If you get stuck at any point, reach out and we'll walk you through it.
        </p>
        <a
          href="https://calendly.com/luke-plaitgrowth"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full"
        >
          Book a Setup Call
        </a>
      </motion.div>
    </div>
  );
}