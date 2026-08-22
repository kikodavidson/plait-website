import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ExternalLink, Copy } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import LeverSwitch from "@/components/ui/lever-switch";

const sections = [
  {
    num: "01",
    title: "Create a Business Center",
    goal: "The Business Center is the container everything else lives in. If you already have one, skip ahead.",
    conditional: true,
    toggleLabel: "Does this apply to you?",
    defaultOpen: true,
    sectionLinks: [
      { label: "Video Guide", url: "https://drive.google.com/file/d/155L0INiuTPwdK1kucoa9AUGMGu-A3pe3/view?usp=sharing" },
      { label: "Text Guide", url: "https://ads.tiktok.com/help/article/create-tiktok-business-center?aadvid=7546193761853210641&lang=en" },
    ],
    steps: [
      { id: "1.1", task: "Create a TikTok Business Center using your business email.", owner: "Client", links: [{ label: "Open TikTok Business Center", url: "https://ads.tiktok.com/business/en" }] },
      { id: "1.2", task: "Complete your business info: name, address, website, industry.", owner: "Client" },
      { id: "1.3", task: "Add a payment method. Optional here, you can also do it in Section 2.", owner: "Client" },
    ],
  },
  {
    num: "02",
    title: "Ads Account Setup",
    goal: "Create the Ads Account inside your Business Center.",
    sectionLinks: [
      { label: "Text Guide", url: "https://ads.tiktok.com/help/article/create-tiktok-ads-manager-account?aadvid=7546193761853210641" },
    ],
    steps: [
      { id: "2.1", task: "In Business Center go to Assets, then Ad Accounts, then Create.", owner: "Client" },
      { id: "2.2", task: "Make sure your own email has full admin permissions on the Ads Account.", owner: "Client" },
      { id: "2.3", task: "Add billing inside Ads Manager under Billing, then Payment Method.", owner: "Client" },
      { id: "2.4", task: "Confirm the account shows Active, not Pending Review.", owner: "Client" },
    ],
  },
  {
    num: "03",
    title: "Add Plait as a Partner",
    goal: "Give my agency access through TikTok's partner system. No email invites and no new logins for you, just connect the two Business Centers and share the assets.",
    steps: [
      { id: "3.1", task: "In your Business Center go to Users, then Partners.", owner: "Client" },
      { id: "3.2", task: "Click Add Partner and enter Plait's Business Center ID:", owner: "Client", copyId: "7661057070241759248" },
      { id: "3.3", task: "Share assets with the partner: select your Ad Account and your Pixel. If we will run Spark Ads or Shop campaigns, also share your TikTok account and catalog when they exist.", owner: "Client" },
      { id: "3.4", task: "Set the permission level to Admin on each shared asset so I can build, edit, and manage tracking.", owner: "Client" },
      { id: "3.5", task: "I accept the partnership on my end and confirm access is live.", owner: "Luke" },
    ],
  },
  {
    num: "04",
    title: "TikTok Pixel Setup",
    goal: "Install the pixel and verify tracking before any money is spent.",
    steps: [
      { id: "4.1", task: "Create the pixel. Business Center, then Assets, then Events, then Web Events, then Create Pixel.", owner: "Client", links: [
        { label: "Step 1", url: "https://drive.google.com/file/d/1dM96iM0AGaOGTtuNxr4y8e5iEYbbW73G/view?usp=sharing" },
        { label: "Step 2", url: "https://drive.google.com/file/d/1b1IyjyX0PdbV-utXhHOSH9VyueiShfcq/view?usp=sharing" },
        { label: "Step 3", url: "https://drive.google.com/file/d/1y7ls-ZhuwwqcYpWkl27oKvYmskRscaLf/view?usp=sharing" },
        { label: "Step 4", url: "https://drive.google.com/file/d/1OMqc6AgSiXYJGHMsY0cnC7yfa13uB74U/view?usp=sharing" },
      ]},
      { id: "4.2", task: "Install the pixel via Shopify, GTM, or manually in the site head.", owner: "Luke" },
      { id: "4.3", task: "Enable Advanced Matching for better event matching and attribution.", owner: "Luke" },
      { id: "4.4", task: "Verify PageView, AddToCart, Checkout, and Purchase events with TikTok Pixel Helper.", owner: "Luke" },
    ],
  },
  {
    num: "05",
    title: "Spark Ads Access",
    goal: "Let us run your organic TikTok posts as ads. Organic posts that already have traction usually outperform standard ads.",
    conditional: true,
    toggleLabel: "Does this apply to you?",
    defaultOpen: false,
    steps: [
      { id: "5.1", task: "Enable ads authorization so organic posts are eligible.", owner: "Client", links: [
        { label: "Guide", url: "https://ads.tiktok.com/help/article/about-affiliate-product-change-authorization-for-video-codes?aadvid=7546193761853210641" },
        { label: "Video", url: "https://drive.google.com/file/d/1W8C8sWzyVdlsyhR0PeFgCm4_BaXSzbUL/view?usp=sharing" },
      ]},
      { id: "5.2", task: "Link your TikTok account to the ad account. Accounts, then TikTok Accounts, then Add TikTok Account, then Link Accounts to Ad Accounts and Shop if needed.", owner: "Client", links: [
        { label: "View", url: "https://drive.google.com/file/d/1V11z2PK95j46wmqNFPcmZubPWuuNInWc/view?usp=sharing" },
      ]},
      { id: "5.3", task: "For each organic post we want to run as an ad, generate a video authorization code and send it to me.", owner: "Client", links: [
        { label: "View", url: "https://drive.google.com/file/d/1DSpn4OyAf2tP96kc5gdSBuxp2d6qrxwN/view?usp=sharing" },
      ]},
    ],
  },
  {
    num: "06",
    title: "TikTok Shop Setup",
    goal: "Enable TikTok Shop so we can run Shopping Ads, sync products automatically, and let people buy without leaving TikTok.",
    conditional: true,
    toggleLabel: "Does this apply to you?",
    defaultOpen: false,
    sectionLinks: [
      { label: "Video Guide", url: "https://www.youtube.com/watch?v=xP9T4J1vnRA" },
    ],
    steps: [
      { id: "6.1", task: "Create a TikTok Shop Seller Center account with your business TikTok account.", owner: "Client", links: [{ label: "Open Seller Center", url: "https://seller.tiktok.com/" }] },
      { id: "6.2", task: "Verify business documents: registration, tax info, ID, address.", owner: "Client" },
      { id: "6.3", task: "Connect your TikTok business profile to Seller Center.", owner: "Client" },
      { id: "6.4", task: "Choose a fulfillment method: TikTok Fulfilled, 3PL, or your own shipping.", owner: "Client" },
      { id: "6.5", task: "Set up returns and customer policies: return window, refund rules, compliance info.", owner: "Client" },
      { id: "6.6", task: "Add payment settlement details, the bank account for payouts.", owner: "Client" },
      { id: "6.7", task: "If on Shopify, install the TikTok Shop app and sync your catalog.", owner: "Client", links: [{ label: "Shopify App", url: "https://apps.shopify.com/tiktok" }] },
      { id: "6.8", task: "Sync your product catalog: SKUs, variants, pricing, inventory, images, descriptions.", owner: "Client", links: [{ label: "Shopify Catalog Guide", url: "https://www.youtube.com/watch?v=kqFuxw5zikQ" }] },
      { id: "6.9", task: "In TikTok Ads Manager go to Assets, then Catalog, then link your TikTok Shop catalog.", owner: "Client", links: [{ label: "View", url: "https://drive.google.com/file/d/1nr3AB-EPESGpTC1TlsU5MrPsGfEKw7vj/view?usp=sharing" }] },
      { id: "6.10", task: "Assign agency access in TikTok Seller Center.", owner: "Client", links: [{ label: "View", url: "https://www.youtube.com/watch?v=pc0EZt2uMoQ" }] },
    ],
  },
];

const STORAGE_KEY = "tiktok_onboarding_checks_v1";
const SECTION_STORAGE_KEY = "tiktok_onboarding_sections_v1";

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
        greenBg ? "bg-green-50 border-green-200"
        : isLuke ? "bg-gray-50/50 border-gray-100 opacity-60"
        : checked ? "bg-[#f4f2ee] border-gray-200" : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
      onClick={onToggle}
    >
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        greenBg ? "bg-green-500 border-green-500" : checked ? "bg-[#2d2d2d] border-[#2d2d2d]" : "border-gray-300"
      }`}>
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest">{step.id}</span>
          <span className={`font-semibold text-sm ${checked ? "line-through text-[#999]" : "text-[#2d2d2d]"}`}>{step.task}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isLuke ? "bg-gray-200 text-[#525252]" : "bg-gray-100 text-[#525252]"}`}>
            {step.owner}
          </span>
        </div>
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

export default function TikTokOnboarding() {
  const { toast } = useToast();
  const [checked, setChecked] = useState({});
  const [sectionOpen, setSectionOpen] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "Let us know when you're finished or if there's any area you need help completing.",
  });

  // Load saved checkbox state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}

    // Load section open/closed state
    const defaultSectionState = {};
    sections.forEach((s) => {
      if (s.conditional) {
        defaultSectionState[s.num] = s.defaultOpen ?? true;
      }
    });
    try {
      const savedSections = localStorage.getItem(SECTION_STORAGE_KEY);
      if (savedSections) {
        setSectionOpen({ ...defaultSectionState, ...JSON.parse(savedSections) });
      } else {
        setSectionOpen(defaultSectionState);
      }
    } catch {
      setSectionOpen(defaultSectionState);
    }
  }, []);

  // Save checkbox state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {}
  }, [checked]);

  // Save section state
  useEffect(() => {
    try {
      localStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(sectionOpen));
    } catch {}
  }, [sectionOpen]);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSection = (num) => setSectionOpen((prev) => ({ ...prev, [num]: !prev[num] }));

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

  // Progress: only count Client tasks in visible (open) sections
  const visibleSections = sections.filter((s) => !s.conditional || sectionOpen[s.num]);
  const clientSteps = visibleSections.flatMap((s) => s.steps.filter((step) => step.owner === "Client"));
  const doneCount = clientSteps.filter((s) => checked[s.id]).length;
  const total = clientSteps.length;
  const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const allClientDone = total > 0 && doneCount === total;

  return (
    <div className="min-h-screen pt-40 pb-24 px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-body text-5xl sm:text-6xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-4">
            TikTok Business Center Onboarding Checklist
          </h1>
          <p className="text-[#525252] text-lg leading-relaxed max-w-xl">
            Work through this top to bottom. Anything tagged Luke is handled on my end, so you can skip it. Check things off as you go.
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
            <span className="text-sm font-semibold text-[#2d2d2d]">Your Progress</span>
            <span className="text-sm font-bold text-[#2d2d2d]">{doneCount} / {total} completed</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2d2d2d] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#525252] mt-2">{progress}% done · Only counting your tasks</p>
        </motion.div>

        {/* Completion banner */}
        <AnimatePresenceFlag show={allClientDone}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3"
          >
            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
            <p className="text-sm font-semibold text-green-800 leading-relaxed">
              That's everything on your side. I'll take it from here and confirm when tracking is verified.
            </p>
          </motion.div>
        </AnimatePresenceFlag>
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto space-y-12">
        {sections.map((section, i) => {
          const sectionClientSteps = section.steps.filter((s) => s.owner === "Client");
          const sectionDone = sectionClientSteps.filter((s) => checked[s.id]).length;
          const sectionComplete = sectionClientSteps.length > 0 && sectionDone === sectionClientSteps.length;
          const isOpen = !section.conditional || sectionOpen[section.num];

          return (
            <motion.div
              key={section.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                  sectionComplete ? "bg-green-500 text-white" : "bg-[#2d2d2d] text-white"
                }`}>
                  {sectionComplete ? <Check className="w-5 h-5" strokeWidth={3} /> : section.num}
                </div>
                <div className="flex-1">
                  <h2 className="font-body text-2xl font-bold text-[#2d2d2d] tracking-tight leading-tight">{section.title}</h2>
                  <p className="text-sm text-[#525252] mt-1 leading-relaxed">{section.goal}</p>
                  {section.sectionLinks && section.sectionLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {section.sectionLinks.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d2d2d] bg-white border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                        >
                          {link.label}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {!section.conditional && (
                  <div className="ml-auto text-xs font-semibold text-[#525252] shrink-0 pt-1">
                    {sectionDone}/{sectionClientSteps.length}
                  </div>
                )}
              </div>

              {/* Conditional toggle */}
              {section.conditional && (
                <div className="pl-14 mb-4">
                  <div className="inline-flex items-center gap-2">
                    <LeverSwitch checked={isOpen} onChange={() => toggleSection(section.num)} />
                    <span
                      onClick={() => toggleSection(section.num)}
                      className="text-xs font-semibold text-[#525252] hover:text-[#2d2d2d] transition-colors cursor-pointer"
                    >
                      {section.toggleLabel || "Does this apply to you?"}
                    </span>
                  </div>
                </div>
              )}

              {/* Steps */}
              {(!section.conditional || isOpen) && (
                <div className="space-y-3 pl-14">
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
              )}
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
          Send us a quick message when you've finished the checklist, or if there's any area you need help completing.
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
    </div>
  );
}

// Simple wrapper to conditionally render with AnimatePresence
function AnimatePresenceFlag({ show, children }) {
  if (!show) return null;
  return <>{children}</>;
}