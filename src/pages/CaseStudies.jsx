import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const studies = [
  {
    slug: "extern",
    client: "Extern",
    category: "SaaS / Career Platform",
    stat: "90%",
    statLabel: "CAC Reduction",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
    headline: "How we cut Extern's customer acquisition cost by 90%.",
    body: [
      "Extern came in with a leaky funnel and a paid acquisition strategy that was technically running, but practically burning money. Cost per acquisition was unsustainable at their price point — they were buying customers at a loss.",
      "The problem wasn't the spend. It was the offer architecture and the creative. Cold audiences were seeing the same message as warm retargeting. The landing page was optimized for clicks, not conversions. The hooks were generic — the kind of thing you'd get if you asked ChatGPT to 'write a compelling ad.'",
      "We rebuilt the messaging from scratch — cold vs warm segmented, offer restructured, hooks written for their actual audience. CAC dropped 90% over 60 days. Not by spending less. By spending smarter.",
    ],
    results: [{ stat: "90%", label: "CAC Reduction" }, { stat: "60", label: "Days to Result" }, { stat: "3x", label: "ROAS Improvement" }],
  },
  {
    slug: "ivy-dating",
    client: "Ivy Dating",
    category: "App / D2C",
    stat: "345%",
    statLabel: "Active User Jump",
    image: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=900&h=600&fit=crop",
    headline: "345% active user growth in a single quarter.",
    body: [
      "Dating apps live and die on retention and active users. Ivy had the product. They didn't have the acquisition system to fill the top of funnel with the right people — and the wrong people churn faster than you can replace them.",
      "We rebuilt the creative strategy around platform-native TikTok content — UGC-style, pattern-interrupt hooks, real voices. Meta got a separate treatment: clean, minimal, trust-forward. Two different platforms, two different creative languages.",
      "The offer was restructured to reduce friction at first download. The funnel was rebuilt to front-load value. Active users jumped 345% in Q1. Not downloads — active users. The people actually using the product.",
    ],
    results: [{ stat: "345%", label: "Active User Growth" }, { stat: "Q1", label: "Timeline" }, { stat: "2x", label: "Retention Lift" }],
  },
  {
    slug: "airia-williams-f1",
    client: "Airia / Williams Racing F1",
    category: "Brand Partnership / D2C",
    stat: "30M+",
    statLabel: "Reached",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&h=600&fit=crop",
    headline: "30 million impressions on a campaign nobody expected to work.",
    body: [
      "Airia partnered with Williams Racing for an F1 collaboration — a brand nobody had heard of, in a sport with one of the most passionate and discerning fanbases on the planet. The brief was reach. The challenge was credibility.",
      "F1 fans can smell inauthenticity from the pit lane. The creative had to be built for the culture, not bolted onto it. We developed platform-native content that spoke the language of the sport — not a brand trying to capitalize on a sport.",
      "The campaign hit 30M+ reached. More importantly, it didn't feel like an ad. It felt like part of the conversation.",
    ],
    results: [{ stat: "30M+", label: "Reached" }, { stat: "F1", label: "Partnership Vertical" }, { stat: "High", label: "Brand Credibility" }],
  },
  {
    slug: "hg-training",
    client: "HG Training",
    category: "Health & Fitness",
    stat: "70%",
    statLabel: "Lower CPA",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=600&fit=crop",
    headline: "CPA down 70% in the first 60 days.",
    body: [
      "HG Training was running ads. The ads were getting clicks. The clicks weren't converting. Classic symptom of a funnel problem — everyone blames the ads, but the issue was the page.",
      "We ran a full funnel audit. The LP was asking for commitment too fast — cold audiences were hitting a purchase page before they had any reason to trust the brand. The checkout had friction. The offer wasn't differentiated from any other fitness program in the feed.",
      "New offer architecture. New LP sequencing (education funnel for cold, speed funnel for warm). Checkout simplified. CPA dropped 70% in 60 days. The spend didn't change. The funnel did.",
    ],
    results: [{ stat: "70%", label: "CPA Reduction" }, { stat: "60", label: "Days to Result" }, { stat: "4x", label: "Conversion Rate Lift" }],
  },
  {
    slug: "tsunami-bar-sports",
    client: "Tsunami Bar Sports",
    category: "Sports Equipment / D2C",
    stat: "4.1x",
    statLabel: "ROAS",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&h=600&fit=crop",
    headline: "From bleeding spend to 4.1x ROAS on a specialist product.",
    body: [
      "Tsunami Bar makes a specialty barbell — variable resistance, niche product, passionate buyers, but a tiny total addressable market. The challenge wasn't awareness. It was finding the exact people who would pay a premium for a product most casual gym-goers have never heard of.",
      "Broad targeting doesn't work for products like this. You need precision — audience discovery that finds the overlap between strength sport culture, equipment geeks, and people with disposable income and a home gym. Orbit ran the audience research. I built the strategy.",
      "Creative was highly product-forward, education-led — showing the product doing what nothing else does. We built an offer that justified the price point. ROAS went from barely break-even to 4.1x.",
    ],
    results: [{ stat: "4.1x", label: "ROAS" }, { stat: "65% lower", label: "CAC" }, { stat: "Niche", label: "Market Domination" }],
  },
];

export default function CaseStudies() {
  const [active, setActive] = useState(null);

  if (active !== null) {
    const s = studies[active];
    return (
      <div className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <button
            onClick={() => setActive(null)}
            className="text-sm text-[#525252] hover:text-[#0A0A0A] mb-8 flex items-center gap-2 transition-colors"
          >
            Back to Case Studies
          </button>

          <div className="rounded-3xl overflow-hidden h-64 md:h-96 mb-12">
            <img src={s.image} alt={s.client} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-3">{s.category}</p>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-8">{s.headline}</h1>
              <div className="space-y-5">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[#525252] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-[#F8F7FF] rounded-3xl p-8 border border-indigo-100">
                <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-6">Results</p>
                <div className="space-y-6">
                  {s.results.map((r) => (
                    <div key={r.label} className="border-b border-indigo-100 pb-5 last:border-0 last:pb-0">
                      <p className="font-display text-4xl font-extrabold text-[#4F46E5]">{r.stat}</p>
                      <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mt-1">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/contact" className="mt-6 block text-center bg-[#4F46E5] text-white font-semibold px-6 py-3.5 rounded-full hover:bg-indigo-700 transition-colors text-sm">
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="hero-gradient pb-16 px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-4">Case Studies</p>
            <h1 className="font-display text-6xl sm:text-7xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-6">
              Real brands.<br />Real numbers.
            </h1>
            <p className="text-[#525252] text-lg max-w-lg leading-relaxed">
              No made-up stats. No unnamed clients. These are the actual results from actual campaigns.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studies.map((s, i) => (
            <motion.button
              key={s.slug}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-left rounded-3xl overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all duration-300 bg-white"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={s.image} alt={s.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">{s.category}</span>
              </div>
              <div className="p-7">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display text-4xl font-extrabold text-[#4F46E5]">{s.stat}</span>
                  <span className="text-xs font-bold text-[#525252] uppercase tracking-wider">{s.statLabel}</span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-[#0A0A0A] mb-2 leading-tight">{s.client}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{s.headline}</p>
                <p className="text-xs font-semibold text-[#4F46E5] mt-4 group-hover:underline">Read case study</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}