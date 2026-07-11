import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ExternalLink, Copy } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import OnboardingChatbot from "@/components/OnboardingChatbot";

const STORAGE_KEY = "google_ads_onboarding_checked";

const sections = [
  {
    num: "01",
    title: "Create a Google Ads Account",
    subtitle: "Skip if you already have one",
    goal: "Set up your Google Ads account in Expert Mode so you have full control from day one.",
    steps: [
      {
        id: "1.1",
        task: "Go to Google Ads",
        description: "Visit ads.google.com and log in with the Google account you want tied to the business.",
        owner: "Client",
        links: [{ label: "ads.google.com", url: "https://ads.google.com" }],
      },
      {
        id: "1.2",
        task: 'Click "New Google Ads Account" or "Create an account without a campaign"',
        description: 'If Google pushes you into Smart Campaigns: scroll down → click "Switch to Expert Mode" → then click "Create an account without a campaign". If Google forces a campaign anyway, just fill in the blanks with anything, publish it, then immediately turn it off.',
        owner: "Client",
      },
      {
        id: "1.3",
        task: "Set your business info",
        description: "Choose your billing country, time zone, and currency. Then click Submit.",
        owner: "Client",
      },
      {
        id: "1.4",
        task: "Note your 10-digit Customer ID",
        description: "After account creation, your Customer ID appears in the top-right corner (format: 123-456-7890). You'll need this in the next section.",
        owner: "Client",
      },
    ],
  },
  {
    num: "02",
    title: "Give Plait Access",
    goal: "Share your Customer ID and approve the access request so we can manage campaigns on your behalf.",
    steps: [
      {
        id: "2.1",
        task: "Find and copy your 10-digit Customer ID",
        description: "Log in to ads.google.com. In the top-right corner you'll see your Customer ID (format: 123-456-7890). Copy it.",
        owner: "Client",
        links: [{ label: "ads.google.com", url: "https://ads.google.com" }],
      },
      {
        id: "2.2",
        task: "Send your Customer ID to Luke",
        description: "Once we have your ID, we'll send an access request from our Google Ads Manager Account.",
        owner: "Client",
      },
      {
        id: "2.3",
        task: "Approve the access request",
        description: 'After we send the request: log in to Google Ads → click the Tools & Settings icon (wrench) → under Setup, select "Access and security" → click the Managers tab → you\'ll see a pending request from us → click Approve.',
        owner: "Client",
      },
      {
        id: "2.4",
        task: "We confirm access is live",
        description: "We'll verify everything looks correct on our end and confirm we're all set.",
        owner: "Luke",
      },
    ],
  },
];

function StepRow({ step, checked, onToggle, sectionComplete }) {
  const isLuke = step.owner === "Luke";
  const greenBg = sectionComplete && checked;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(step.copyId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
        greenBg
          ? "bg-green-50 border-green-200"
          : isLuke
          ? "bg-gray-50/50 border-gray-100 opacity-60"
          : checked
          ? "bg-[#f4f2ee] border-gray-200"
          : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
      onClick={onToggle}
    >
      <div
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          greenBg
            ? "bg-green-500 border-green-500"
            : checked
            ? "bg-[#2d2d2d] border-[#2d2d2d]"
            : "border-gray-300"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest">{step.id}</span>
          <span className={`font-semibold text-sm ${checked ? "line-through text-[#999]" : "text-[#2d2d2d]"}`}>
            {step.task}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isLuke ? "bg-gray-200 text-[#525252]" : "bg-gray-100 text-[#525252]"}`}>
            {step.owner}
          </span>
        </div>
        <p className="text-xs text-[#525252] mt-1 leading-relaxed">{step.description}</p>
        {step.copyId && (
          <div className="flex items-center gap-2 mt-2">
            <code className="text-sm font-mono font-semibold text-[#2d2d2d] bg-gray-100 px-3 py-1 rounded-lg">{step.copyId}</code>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                copied ? "bg-green-50 border-green-200 text-green-600" : "bg-white border-gray-200 text-[#2d2d2d] hover:bg-gray-50"
              }`}
            >
              {copied ? <Check className="w-3 h-3" strokeWidth={3} /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy ID"}
            </button>
          </div>
        )}
        {step.links && step.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {step.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d2d2d] bg-white border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
              >
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GoogleAdsOnboarding() {
  const { toast } = useToast();
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "Let us know when you're finished or if there's any area you need help completing.",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await base44.entities.ContactInquiry.create({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        service_interest: "other",
      });
      setFormSubmitted(true);
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    }
    setFormLoading(false);
  };

  const allSteps = sections.flatMap((s) => s.steps);
  const doneCount = allSteps.filter((s) => checked[s.id]).length;
  const total = allSteps.length;
  const progress = Math.round((doneCount / total) * 100);
  const allDone = doneCount === total;

  return (
    <div className="min-h-screen pt-40 pb-24 px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-body text-5xl sm:text-6xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-4">
            Google Ads Onboarding Checklist.
          </h1>
          <p className="text-[#525252] text-base leading-relaxed max-w-xl">
            Two sections — create your account if you don't have one, then share access so we can get started.
          </p>
        </motion.div>

        {/* Google's official docs link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6"
        >
          <a
            href="https://support.google.com/google-ads/answer/1722056"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d2d2d] bg-white border border-gray-200 px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Use Google's Official Directions Instead
          </a>
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

      {/* Completion banner */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-10 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <div>
            <p className="font-bold text-green-800 text-sm">All steps complete!</p>
            <p className="text-green-700 text-xs mt-0.5">Fill in the form below to let us know you're done.</p>
          </div>
        </motion.div>
      )}

      {/* Sections */}
      <div className="max-w-3xl mx-auto space-y-12">
        {sections.map((section, i) => {
          const sectionDone = section.steps.filter((s) => checked[s.id]).length;
          const sectionComplete = sectionDone === section.steps.length;
          return (
            <motion.div
              key={section.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="flex items-start gap-4 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${sectionComplete ? "bg-green-500 text-white" : "bg-[#2d2d2d] text-white"}`}>
                  {sectionComplete ? <Check className="w-5 h-5" strokeWidth={3} /> : section.num}
                </div>
                <div className="flex-1">
                  <h2 className="font-body text-2xl font-bold text-[#2d2d2d] tracking-tight leading-tight">
                    {section.title}
                    {section.subtitle && (
                      <span className="ml-2 text-sm font-normal text-[#525252] italic">({section.subtitle})</span>
                    )}
                  </h2>
                  {section.goal && (
                    <p className="text-xs text-[#525252] mt-1 leading-relaxed">{section.goal}</p>
                  )}
                </div>
                <div className="text-xs font-semibold text-[#525252] shrink-0 pt-1">
                  {sectionDone}/{section.steps.length}
                </div>
              </div>
              <div className="space-y-3 pl-14 mt-4">
                {section.steps.map((step) => (
                  <StepRow
                    key={step.id}
                    step={step}
                    checked={!!checked[step.id]}
                    onToggle={() => toggle(step.id)}
                    sectionComplete={sectionComplete}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-16 bg-white border border-gray-100 rounded-3xl p-10 shadow-sm"
      >
        <h3 className="font-body text-3xl font-bold text-[#2d2d2d] mb-3">All done? Let us know.</h3>
        <p className="text-[#525252] text-sm mb-8 leading-relaxed">
          Send us a quick message when you've finished the checklist — or if there's any area you need help with.
        </p>
        {formSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-500" strokeWidth={3} />
            </div>
            <p className="font-semibold text-[#2d2d2d] text-lg">Message sent!</p>
            <p className="text-[#525252] text-sm mt-1">We'll be in touch with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-full border border-gray-200 bg-white text-sm text-[#2d2d2d] focus:outline-none focus:border-[#2d2d2d] transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-full border border-gray-200 bg-white text-sm text-[#2d2d2d] focus:outline-none focus:border-[#2d2d2d] transition-colors"
              />
            </div>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-[#2d2d2d] focus:outline-none focus:border-[#2d2d2d] transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={formLoading}
              className="btn-gradient inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full disabled:opacity-60"
            >
              {formLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </motion.div>

      <OnboardingChatbot />
    </div>
  );
}