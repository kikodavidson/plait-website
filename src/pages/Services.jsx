import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ServicesBanner from "@/components/plait/ServicesBanner";

const strands = [
  {
    num: "01",
    title: "Paid Media",
    tagline: "Getting attention is easy. Getting profitable attention is harder.",
    body: "We build, manage, and optimize campaigns across the platforms that matter most. Not just launching ads, but building systems that generate returns and scale without falling apart.",
    deliverables: [
      "Meta Ads (Facebook & Instagram)",
      "Google Search & Shopping",
      "Performance Max",
      "YouTube Ads",
      "TikTok Ads",
      "LinkedIn Ads",
      "Retargeting",
      "Creative Testing",
      "Campaign Audits",
      "Scaling Strategy",
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop",
  },
  {
    num: "02",
    title: "Attribution & Analytics",
    tagline: "You can't improve what you can't see.",
    body: "Good attribution creates better decisions. Better decisions create better results. Most businesses are flying half-blind because their data stack has gaps nobody fixed. We fix them.",
    deliverables: [
      "GA4 Setup & Audits",
      "Google Tag Manager",
      "Meta Pixel & Conversions API",
      "Server Side Tracking",
      "Event & Funnel Tracking",
      "UTM Frameworks",
      "Custom Conversions",
      "Dashboard Reporting",
      "Customer Journey Analysis",
      "Attribution Audits",
    ],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop",
  },
  {
    num: "03",
    title: "Websites & CRO",
    tagline: "Getting traffic is only half the battle. The website has to do its job too.",
    body: "More traffic won't fix a broken funnel. We build sites that earn the sale and audit existing ones to find every point of friction between click and conversion.",
    deliverables: [
      "Shopify Development",
      "Webflow Development",
      "WordPress Development",
      "Landing Pages",
      "E-Commerce Sites",
      "CRO Audits",
      "Checkout Optimization",
      "Heatmap Analysis",
      "Funnel Optimization",
      "A/B Testing Strategy",
    ],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop",
  },
  {
    num: "04",
    title: "Creative & Messaging",
    tagline: "Most ads don't fail because of targeting. They fail because nobody cares.",
    body: "Creative is a hypothesis. We treat it like one. Platform-native formats, audience-matched angles, hooks built to stop the scroll, not designed in a vacuum.",
    deliverables: [
      "Ad Creative Strategy",
      "Hook Development",
      "Angle Development",
      "UGC Concepts",
      "Creative Briefs",
      "Ad Scripts",
      "Offer Positioning",
      "Content Strategy",
      "Customer Research",
    ],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=500&fit=crop",
  },
  {
    num: "05",
    title: "Copywriting",
    tagline: "The right words can change performance overnight.",
    body: "The wrong ones can kill a campaign before it starts. Copy is strategy made visible. Every word earns its place or it doesn't make the cut.",
    deliverables: [
      "Website Copy",
      "Landing Page Copy",
      "Ad Copy",
      "Sales Pages",
      "Product Pages",
      "Email Campaigns",
      "Offer Development",
      "Positioning",
      "Messaging Frameworks",
      "Voice Of Customer Research",
    ],
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=500&fit=crop",
  },
  {
    num: "06",
    title: "Strategy & Network",
    tagline: "Sometimes the answer is ads. Sometimes it isn't.",
    body: "The best opportunities usually sit where nobody is looking. We help identify the bottleneck, remove it, and connect you to the right people when the right opportunity exists.",
    deliverables: [
      "Growth Audits",
      "Competitive Analysis",
      "Go-To-Market Planning",
      "Launch Strategy",
      "Scaling Roadmaps",
      "KPI Development",
      "Investor Introductions",
      "Creator & Influencer Partnerships",
      "Strategic Introductions",
      "Business Development",
    ],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop",
  },
];

export default function Services() {
  return (
    <div className="pt-28 pb-24">
      <div className="hero-gradient pb-16 px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-widest mb-4">What We Do</p>
            <h1 className="font-body text-6xl sm:text-7xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-6 max-w-3xl">
              Most marketing problems aren't caused by one thing.
            </h1>
            <p className="text-[#525252] text-lg max-w-xl leading-relaxed">
              They're caused by a dozen small issues hiding between your ads, website, analytics, creative, and customer journey. We find those gaps, connect the pieces, and help turn attention into revenue.
            </p>
          </motion.div>
        </div>
      </div>

      <ServicesBanner />

      <div className="max-w-6xl mx-auto px-6 py-8 border-b border-gray-100 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-4">How We Help</p>
          <p className="text-[#2d2d2d] text-xl font-semibold leading-relaxed mb-3">
            No two businesses need the exact same solution.
          </p>
          <p className="text-[#525252] leading-relaxed">
            Some need better ads. Some need a better website. Some have tracking issues that make every marketing decision harder than it should be. Our job is to identify the bottleneck and remove it.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="space-y-24">
          {strands.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start`}
            >
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <span className="text-[#2d2d2d] text-xs font-bold uppercase tracking-widest">{s.num}</span>
                <h2 className="font-body text-4xl sm:text-5xl font-bold text-[#2d2d2d] tracking-tight mt-2 mb-2">{s.title}</h2>
                <p className="text-[#2d2d2d] font-semibold text-sm mb-4 italic">{s.tagline}</p>
                <p className="text-[#525252] leading-relaxed mb-8">{s.body}</p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#2d2d2d] mb-4">Services</p>
                  <ul className="space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-[#525252]">
                        <Check className="w-4 h-4 text-[#2d2d2d] shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`rounded-3xl overflow-hidden aspect-[4/3] ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 pt-16 border-t border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-4">Not Sure What You Need?</p>
              <h2 className="font-body text-4xl sm:text-5xl font-bold text-[#2d2d2d] tracking-tight mb-6">That's normal.</h2>
              <p className="text-[#525252] leading-relaxed mb-4">
                Most clients don't come to us asking for a new attribution model, a landing page rebuild, or a creative testing framework.
              </p>
              <p className="text-[#525252] leading-relaxed mb-4">
                They come because something feels off. Performance has stalled. Costs are rising. Revenue isn't matching effort.
              </p>
              <p className="text-[#525252] leading-relaxed font-medium">
                We help figure out why.
              </p>
            </div>
            <div className="bg-[#2d2d2d] rounded-3xl p-10 flex flex-col gap-6">
              <h3 className="font-body text-3xl font-bold text-[#f4f2ee] leading-tight">Let's find the missing piece.</h3>
              <p className="text-[#f4f2ee]/60 leading-relaxed text-sm">
                If your marketing feels disconnected, inefficient, or harder than it should be, there's usually a reason. Let's find it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                  to="/contact"
                  className="btn-gradient inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full"
                >
                  Pull The Thread
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center justify-center gap-2 border border-[#f4f2ee]/20 text-[#f4f2ee] font-bold text-sm px-6 py-3.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}