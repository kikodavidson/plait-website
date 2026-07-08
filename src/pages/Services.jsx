import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ServicesBanner from "@/components/plait/ServicesBanner";

const strands = [
  {
    num: "01",
    title: "Demand Gen",
    tagline: "Create attention and pull new audiences in.",
    body: "Paid media built for long term growth, not a one month spike.",
    deliverables: [
      "Creative led testing of hooks, angles & formats",
      "Audience & channel strategy matched to your buyer",
      "Budget pacing built toward growth that holds",
    ],
    whatYouGet: [
      { title: "Targeted traffic", body: "From existing, and new audiences." },
      { title: "Messaging that resonates", body: "With people who are new to your brand. Different hooks, content styles, and value props that drive more attention per thousand accounts reached." },
      { title: "An audience you own", body: "Retargeting pools, email lists, and future customers." },
    ],
    img: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/bdbd93ba4_pexels-brettjordan-7568297.jpg",
  },
  {
    num: "02",
    title: "Demand Capture",
    tagline: "Meet the demand that already exists.",
    body: "Show up the moment someone is looking, then close them.",
    deliverables: [
      "Show up the second someone searches for what you sell, when they're most ready to buy",
      "Appear in TikTok Search, a new surface most of your competitors haven't touched yet",
      "Turn one time visitors and past buyers into revenue you don't pay to reacquire",
    ],
    whatYouGet: [
      { title: "Sales from high intent buyers", body: "People already searching for what you sell." },
      { title: "The fastest payback", body: "Of any channel we run." },
      { title: "Your brand name defended", body: "Competitors can't pick off people looking for you." },
      { title: "Repeat purchases through email", body: "Revenue that doesn't need new ad spend." },
    ],
    img: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/fee6f40eb_pexels-firmbee-com-22729701-6961857.jpg",
  },
  {
    num: "03",
    title: "Conversion Rate Optimization",
    tagline: "Make every click you already paid for work harder.",
    body: "Before spending a dollar more.",
    deliverables: [
      "Funnel & landing page testing",
      "Friction & drop off removal",
      "Message and market fit experiments",
      "Continuous iteration on what actually converts",
    ],
    whatYouGet: [
      { title: "More visitors turned into customers", body: "From the traffic you already pay for." },
      { title: "Higher Average Order Values", body: "Bundles, upsells, and post purchase offers, so ROAS climbs without CAC having to move." },
      { title: "A higher ceiling on scale", body: "When each visitor is worth more, you can pay more for traffic than your competitors and still profit." },
      { title: "An understanding of why people buy or bounce", body: "Straight answers that sharpen your ads, offers, and email." },
    ],
    img: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/ffa117f1e_Screenshot2026-07-08at11821AM.png",
  },
  {
    num: "04",
    title: "Attribution",
    tagline: "The part most agencies can't actually deliver.",
    body: "Knowing what's working, down to the dollar.",
    deliverables: [
      "Pixel (browser side) setup",
      "Conversion API (server side) setup",
    ],
    whatYouGet: [
      { title: "Visibility into what drives revenue", body: "Budget decisions based on stronger data." },
      { title: "More complete conversion data", body: "Ad platforms get fuller signals and optimize toward higher quality results." },
      { title: "Scaling decisions with confidence", body: "Greater accuracy in the numbers you act on." },
    ],
    img: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/0e8bd084f_Screenshot2026-07-08at12029AM.png",
  },
  {
    num: "05",
    title: "Content & Creative",
    tagline: "The fuel. Proven frameworks meet creativity.",
    body: "The place where your brand gets to create a voice for itself. This is where the game is won or lost.",
    deliverables: [
      "Content ideation & scroll-stopping hooks",
      "Unique Value Proposition & angle testing",
      "Trend & format exploration",
      "A vetted influencer & creator network to tap into",
    ],
    whatYouGet: [
      { title: "Content that performs", body: "High engagement creative built to stop the scroll." },
      { title: "A distinct brand voice", body: "Messaging that stands out in a noisy feed." },
      { title: "A scalable production process", body: "Systems to keep the creative pipeline full." },
    ],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=500&fit=crop",
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
              The Plait Growth System.
            </h1>
            <p className="text-[#525252] text-lg max-w-xl leading-relaxed">
              Five connected services that work together to grow your brand — from generating demand to capturing it, optimizing conversions, attributing results, and creating content that stops the scroll.
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
            <React.Fragment key={s.num}>
            <motion.div
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

            <div className="mt-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-[#4B87E7] uppercase tracking-widest">What Your Brand Will Get</span>
                <span className="flex-1 h-px bg-gray-100" />
              </div>
              <div className={`grid grid-cols-1 ${s.whatYouGet.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"} gap-4`}>
                {s.whatYouGet.map((card) => (
                  <div
                    key={card.title}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-body font-bold text-[#2d2d2d] text-sm mb-2 leading-tight">{card.title}</h3>
                    <p className="text-xs text-[#525252] leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
            </React.Fragment>
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