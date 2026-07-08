import React from "react";
import { motion } from "framer-motion";

const strands = [
  {
    num: "01",
    title: "MESSAGING",
    body: "Before you run a single ad, you need to know why anyone should give a damn. We find the angles that actually resonate — not the ones your competitor already used.",
    items: ["Unique value propositions", "Secondary and tertiary benefits", "Non-obvious connection points", "Psychology, behavior, culture"],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=650&fit=crop",
  },
  {
    num: "02",
    title: "CREATIVE",
    body: "The right hook with the wrong format is still a loss. Creative is matched to platform, audience, and Meta's Andromeda model — tested before scaled.",
    items: ["Hook and angle ideation", "Right creator for the audience", "Platform-native formats (Meta vs TikTok)", "Built for Meta's Andromeda model"],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&h=650&fit=crop",
  },
  {
    num: "03",
    title: "HOOKS",
    body: "You have three seconds. Three. If you blow it, it's over. Pattern interrupts, audience callouts, earned shock — not cheap tricks.",
    items: ["First three seconds, engineered", "Audience callouts that stop the scroll", "Pattern interrupts and bait-and-switch", "Question-driven and surprise-led openings"],
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&h=650&fit=crop",
  },
  {
    num: "04",
    title: "OFFERS",
    body: "A great ad sending people to a mediocre offer is just expensive brand awareness. Offer architecture can double your conversion rate without touching the funnel.",
    items: ["Offer architecture and bundles", "Discount strategy and promos", "Segmented value props for cold vs warm", "Urgency mechanics that don't feel gross"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=650&fit=crop",
  },
  {
    num: "05",
    title: "CRO",
    body: "The LP is where money gets made or flushed. Friction audits, education vs. speed funnels, checkout optimization — every drop-off point mapped and fixed.",
    items: ["Seamless LP-to-purchase flow", "Friction audits and heatmap analysis", "Education vs. speed funnels", "Checkout optimization"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=650&fit=crop",
  },
  {
    num: "06",
    title: "WEBSITE",
    body: "Your website is either your best closer or your biggest leak. First impressions, trust signals, navigation — it either earns the sale or kills it.",
    items: ["Design and first impression", "Trust signals and social proof", "Storytelling and education architecture", "Navigation that doesn't fight itself"],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=650&fit=crop",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#f4f2ee]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs font-semibold text-[#5E58D5] uppercase tracking-widest mb-3">The Process</p>
          <h2 className="font-display text-5xl sm:text-6xl font-extrabold text-[#2d2d2d] tracking-tight leading-tight max-w-xl">
            Six strands.<br />One system.
          </h2>
          <p className="text-[#525252] mt-4 max-w-lg text-base leading-relaxed">
            Most agencies optimize one or two of these. PLAIT works all six — because a broken link anywhere leaks the whole funnel.
          </p>
        </div>

        <div className="space-y-0">
          {strands.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-gray-100 ${i === strands.length - 1 ? "border-b" : ""}`}
              >
                {/* Text side */}
                <div className={`py-16 lg:py-20 ${isEven ? "lg:pr-16 order-2 lg:order-1" : "lg:pl-16 order-2"}`}>
                  <span className="text-[#5E58D5] font-display text-sm font-bold tracking-widest uppercase">{s.num}</span>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-[#2d2d2d] tracking-tight mt-3 mb-5">{s.title}</h3>
                  <p className="text-[#525252] text-base leading-relaxed mb-8 max-w-lg">{s.body}</p>
                  <ul className="space-y-0">
                    {s.items.map((item) => (
                      <li key={item} className="py-3 border-b border-gray-100 text-sm text-[#525252] last:border-0">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Image side */}
                <div className={`relative min-h-[320px] lg:min-h-[460px] overflow-hidden ${isEven ? "order-1 lg:order-2" : "order-1"}`}>
                  <img
                    src={s.img}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}