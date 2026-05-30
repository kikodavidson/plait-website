import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const strands = [
  {
    num: "01",
    title: "Messaging",
    tagline: "Say something worth hearing.",
    body: "Most brands say the same thing with slightly different fonts. Messaging strategy finds the angle that's actually true, actually differentiated, and actually makes someone stop scrolling.",
    deliverables: [
      "Unique value proposition development",
      "Secondary and tertiary benefit mapping",
      "Non obvious connection points (psychology, behavior, culture)",
      "Competitive differentiation analysis",
      "Audience language audits",
      "Message-market fit testing framework",
    ],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop",
  },
  {
    num: "02",
    title: "Creative",
    tagline: "Right hook. Right platform. Right creator.",
    body: "Creative isn't art. It's a hypothesis. We test it like one. Platform-native formats, audience-matched creators, Meta's Andromeda model baked into the brief — not bolted on after.",
    deliverables: [
      "Hook and angle ideation",
      "Creative brief development",
      "Creator selection and direction",
      "Platform native format execution (Meta clean, TikTok native UGC)",
      "Meta Andromeda optimized creative structure",
      "Iterative creative testing framework",
    ],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=500&fit=crop",
  },
  {
    num: "03",
    title: "Hooks",
    tagline: "Three seconds to earn the next ten.",
    body: "The first three seconds of an ad are the only seconds that matter if you blow them. Pattern interrupts, earned shock, audience callouts — engineered, not improvised.",
    deliverables: [
      "First three seconds audits on existing creative",
      "Audience callout development",
      "Pattern interrupt ideation",
      "Bait and switch frameworks",
      "Question driven and surprise led openings",
      "Hook split test planning",
    ],
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=700&h=500&fit=crop",
  },
  {
    num: "04",
    title: "Offers",
    tagline: "The best ad in the world can't fix a weak offer.",
    body: "Offer architecture is one of the highest-leverage moves in paid media. A restructured offer can double conversion rates without touching a single pixel of creative.",
    deliverables: [
      "Offer architecture and bundle design",
      "Discount strategy and promo calendar",
      "Cold vs warm segmented value props",
      "Urgency and scarcity mechanics",
      "Price sensitivity testing",
      "Upsell and cross sell architecture",
    ],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop",
  },
  {
    num: "05",
    title: "CRO",
    tagline: "Plug the leaks before you pour more in.",
    body: "More traffic won't fix a broken funnel. CRO finds every point of friction between click and purchase and eliminates it systematically.",
    deliverables: [
      "Full funnel audit and friction mapping",
      "Landing page teardown and redesign briefs",
      "Education vs. speed funnel architecture",
      "Checkout optimization",
      "Heatmap and session recording analysis",
      "A/B test roadmap and prioritization",
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop",
  },
  {
    num: "06",
    title: "Website",
    tagline: "Your website is either your best closer or your worst leak.",
    body: "First impressions, trust signals, navigation — it all has to work. A website that doesn't earn the sale is just an expensive place to send traffic.",
    deliverables: [
      "Homepage and key page audits",
      "Trust signal and social proof strategy",
      "Storytelling and education architecture",
      "Navigation and UX optimization",
      "Speed and performance improvements",
      "Design direction and build (if needed)",
    ],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop",
  },
];

export default function Services() {
  return (
    <div className="pt-28 pb-24">
      <div className="hero-gradient pb-16 px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-4">Services</p>
            <h1 className="font-body text-6xl sm:text-7xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-6 max-w-3xl">
              Six strands.<br />Every layer connected.
            </h1>
            <p className="text-[#525252] text-lg max-w-xl leading-relaxed">
              A funnel that leaks anywhere leaks everywhere. PLAIT works all six strands so nothing falls through the gap between "that's not my department."
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-20">
          {strands.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <span className="text-[#4F46E5] text-xs font-bold uppercase tracking-widest">{s.num}</span>
                <h2 className="font-body text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight mt-2 mb-2">{s.title}</h2>
                <p className="text-[#4F46E5] font-semibold text-sm mb-4 italic">{s.tagline}</p>
                <p className="text-[#525252] leading-relaxed mb-8">{s.body}</p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0A0A0A] mb-4">Deliverables</p>
                  <ul className="space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-[#525252]">
                        <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
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

        <div className="mt-20 pt-16 border-t border-gray-100 text-center">
          <h2 className="font-body text-4xl font-extrabold text-[#0A0A0A] mb-4">Ready to plug the leaks?</h2>
          <p className="text-[#525252] mb-8 max-w-md mx-auto">Start with the Clarity Audit and we'll find exactly where your funnel is bleeding.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#4F46E5] text-white font-semibold px-8 py-4 rounded-full hover:bg-indigo-700 transition-colors">
            Work With Me
          </Link>
        </div>
      </div>
    </div>
  );
}