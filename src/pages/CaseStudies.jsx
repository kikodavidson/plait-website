import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const studies = [
  {
    slug: "extern",
    client: "Extern",
    category: "SaaS / Career Platform",
    stat: "90%",
    statLabel: "Reduction in CAC",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop",
    headline: "Turning fragmented SaaS acquisition into a scalable purchase engine.",
    body: [
      "Extern is a SaaS platform offering externships to college students. Their primary objective was clear: acquire customers at a sustainable customer acquisition cost.",
      "The challenge? College students are one of the most fiscally constrained audiences to sell to. Disposable income is limited. Decision making cycles are longer. Skepticism toward paid programs is high. Conversion friction is real.",
      "When I stepped in, the account had multiple campaigns running across different objectives. Budget was fragmented. Signals were diluted. The structure wasn't built to consistently drive purchases.",
      "Extern didn't need more traffic. They needed efficient customer acquisition.",
      "I consolidated the account into a unified evergreen purchase focused framework designed to strengthen signals, stabilize delivery, and lower CAC.",
      "After consolidating the campaign structure, we focused on driving down customer acquisition cost through signal clarity and strategic testing. Within weeks, CAC dropped by a substantial percentage as delivery stabilized and budget was concentrated into high performing segments.",
      "We moved beyond the original targeting pools and systematically identified new audience segments that showed stronger purchase intent. This included layered interest testing, algorithmic expansion, and refinement based on engagement behavior. As new pockets of efficiency emerged, we scaled into them deliberately.",
      "Rather than relying on a single core message, we tested multiple value angles tailored to a fiscally constrained student audience. Career leverage, ROI framing, credibility positioning, urgency hooks, and social proof were all explored across different content formats. This allowed us to identify which variables resonated most deeply and convert at lower costs.",
      "We strengthened top of funnel efforts by introducing new hooks and content types designed to stop the scroll and reframe the offer. These efforts fed higher quality traffic into the system, improving downstream conversion efficiency.",
      "Previously untested, we built and executed a dedicated bottom funnel strategy within paid ads. This included increasing frequency strategically, segmenting based on engagement depth, specific interactions, and serving tailored messaging to users who had demonstrated interest. By addressing objections and reinforcing value at this stage, purchase rates improved and CAC efficiency compounded.",
    ],
    results: [{ stat: "90%", label: "Reduction in CAC" }, { stat: "24x", label: "Increase in New Users" }],
  },
  {
    slug: "ivy-dating",
    client: "Ivy Dating",
    category: "App / D2C",
    stat: "205%",
    statLabel: "Increase in App Downloads",
    image: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=900&h=600&fit=crop",
    headline: "How we doubled the number of users over the course of two months.",
    body: [
      "Ivy is a location based dating app built around real world connection, not endless swiping. The platform encourages people to connect in the moments that matter, when they are nearby, active, and open to meeting someone new.",
      "The project began with driving user sign ups through paid acquisition, using a mix of ad formats and creative hooks to set clear expectations before download. From there, the focus shifted to improving early activation and long term retention through messaging and copy led optimizations.",
      "Work included auditing the full user journey and refining onboarding, in app education, notifications, and key prompts to reduce friction, reinforce urgency, and help users reach the aha moment faster.",
      "The result was a more intentional experience that mirrors real dating behavior, strengthens initial engagement, and supports sustained retention.",
      "Paid acquisition was launched with a lean, low cost creative approach focused on speed, testing, and iteration. Campaigns leveraged a mix of carousel ads, static graphics, and UGC style video, allowing for rapid creative rotation without heavy production costs.",
      "Ads were displayed across a blend of geo targeted audiences aligned with Ivy's core demographics and interests, alongside broader audiences that allowed the algorithm to learn and optimize. This balance helped capture high intent users while still giving platforms room to scale efficiently.",
      "From a measurement standpoint, campaigns initially optimized around custom in app events to validate early behavior and signal quality traffic. Once performance patterns were established, attribution and optimization were transitioned to Appsflyer to support more accurate tracking and long term scalability.",
      "This execution framework prioritized flexibility, fast learning, and efficient spend, creating a foundation that could be refined and scaled as the product matured.",
    ],
    results: [{ stat: "205%", label: "Increase in App Downloads" }, { stat: "345%", label: "Cohort Active Users Jump" }],
  },
  {
    slug: "airia-williams-f1",
    client: "Airia",
    category: "Enterprise / AI",
    stat: "30M+",
    statLabel: "Impressions in Two Months",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&h=600&fit=crop",
    headline: "Building awareness for revolutionary AI Agentic Modeling software.",
    body: [
      "Airia came to us with a clear mission: get their revolutionary AI Agentic Modeling platform in front of as many qualified decision makers as possible.",
      "This wasn't about niche positioning. It was about reach, visibility, and category presence in a rapidly accelerating AI market.",
      "To reinforce their credibility at the highest levels of performance and innovation, Airia had partnered with the Williams Racing Formula 1 team, a signal that they are building at world class speed and precision.",
      "Our job was to match that ambition with scale.",
      "Through strategic paid media deployment, we built a distribution engine designed to maximize visibility across enterprise AI audiences, technical leaders, and innovation teams.",
      "The goal was simple: own attention in the AI space race.",
    ],
    results: [{ stat: "30M+", label: "Impressions in Two Months" }, { stat: "89%", label: "CPM Decrease at Peak" }],
  },
  {
    slug: "hg-training",
    client: "HG Training",
    category: "Health & Fitness",
    stat: "$8",
    statLabel: "Cost Per Lead",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=600&fit=crop",
    headline: "How we helped achieve a blended 12.4x ROAS in the first month.",
    body: [
      "Hudson runs a private training business in a highly specific geographic market. This wasn't about reach. It was about generating qualified leads inside a 20 mile radius at a cost that made sense for the business.",
      "Budget was tight. There was no room to test and hope. We needed early traction and efficient conversions from the start.",
      "We used Meta's native lead forms to remove friction and capture intent instantly. With a tight budget, we couldn't afford wasted clicks or unnecessary drop off.",
      "The funnel was structured to pre frame the offer, set expectations, and qualify leads before they ever hit Hudson's inbox. This protected both ad spend and his time.",
      "Creative started simple. As conversions and conversations increased, we paid attention to patterns: what parents valued, what objections surfaced, and what language actually moved people.",
      "We refined messaging around those signals. Alignment improved. Lead quality improved. Performance improved.",
      "Disciplined execution. No wasted motion.",
    ],
    results: [{ stat: "$8", label: "Cost Per Lead" }, { stat: "12.4", label: "Lifetime ROAS" }],
  },
  {
    slug: "tsunami-bar-sports",
    client: "Tsunami Bar Sports",
    category: "Sports Equipment / D2C",
    stat: "500%+",
    statLabel: "Increase in Sales",
    image: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/f59cbe715_Untitleddesign-2026-06-18T141430059.png",
    headline: "We increased sales by 500%+ in 6 months at a consistent 5-15x ROAS.",
    sections: [
      {
        title: "The Situation",
        content: "Tsunami Bar Sports had real credibility. Hall of Fame NFL linebacker James Harrison and multiple college programs were already posting about the product organically. The brand had earned serious validation from serious athletes. What they didn't have was a system to turn that attention into consistent revenue. The organic momentum was real, but it wasn't scalable.",
      },
      {
        title: "Why It Was Hard",
        content: "There was a very wide range of products, all at a high ticket value. The challenge was choosing which products to boost, and finding a way to show value across the entire catalog with a limited budget.",
      },
      {
        title: "What I Did",
        content: "I pushed ads built around the top sellers and whatever would make the most engaging content, then targeted different audiences based on the movements they prioritize. Football players need a barbell, golfers need a swing bar. Matching the product to each audience's intent is what unlocked consistent, scalable performance.",
      },
    ],
    results: [{ stat: "500%+", label: "Increase in Sales" }, { stat: "5-15x", label: "ROAS" }],
  },
  {
    slug: "kryo",
    client: "Krýo",
    category: "Health / High Ticket D2C",
    stat: "4-6x",
    statLabel: "Return on Ad Spend",
    image: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/d1b832d18_JakePaul.png",
    headline: "Selling a $4,000 ice plunge takes more than good ads. Here's what it takes to make ads work for a high ticket item.",
    sections: [
      {
        title: "The Situation",
        content: "Kryo had something most brands don't early on — legitimate celebrity endorsements and content that actually performed. Jake Paul, Dana White, and Dwight Howard had already put the product in front of millions. The product had real credibility. What it needed was a system to convert that attention into revenue.",
      },
      {
        title: "The Challenge",
        content: "Nobody drops $4,000 on any product the first time they see an ad. This was never going to be a one-touch conversion. We were working with a smaller budget and a high consideration product, which meant we couldn't just run traffic and hope. We had to build a full funnel that met people where they were, warmed them up over time, and gave them every reason to trust the product before they ever hit the buy button.",
      },
      {
        title: "The Approach",
        content: "We built the funnel around one core insight: the value of cold therapy wasn't hard to sell — most people got it. The real job was convincing someone that THIS was the purchase worth making this year over everything else competing for that same $4,000.\n\nWe structured audiences around different entry points. At the top of the funnel we led with what made Kryo unique — portability, pump strength, and health benefits — each speaking to a different version of the same buyer. As people moved down the funnel, we shifted the message. Discounts and bundles weren't lead offers, they were closing tools.\n\nWe also removed every friction point we could find: high income targeting, athlete and wellness communities, payment plans, and HSA eligibility. The goal was to make it so that when someone was ready to say yes, there was nothing left to say no to.",
      },
      {
        title: "The Outcome",
        content: "A consistent 4–6x return on ad spend.",
      },
      {
        title: "The Takeaway",
        content: "High ticket isn't harder. It's just different. The brands that struggle with expensive products are usually trying to force them into a framework built for impulse purchases. We built Kryo a system designed around how their buyer actually makes decisions — and that's what made it work.\n\nA $4,000 ice plunge needs a completely different architecture than a $40 supplement. The funnel, the messaging, the timing, the offers — all of it has to reflect the psychology of that specific purchase. That's the job.",
      },
    ],
    results: [{ stat: "4-6x", label: "Return on Ad Spend" }],
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
              <p className="text-xs font-bold text-[#3b82f6] uppercase tracking-widest mb-3">{s.category}</p>
              <h1 className="font-body text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-8">{s.headline}</h1>
              {s.sections ? (
                <div className="space-y-8">
                  {s.sections.map((sec) => (
                    <div key={sec.title}>
                      <h2 className="font-body text-xl font-extrabold text-[#0A0A0A] mb-2">{sec.title}</h2>
                      <div className="space-y-3">
                        {sec.content.split("\n\n").map((para, pi) => (
                          <p key={pi} className="text-[#525252] leading-relaxed">{para}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-[#525252] leading-relaxed">{p}</p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="bg-[#F8F7FF] rounded-3xl p-8 border border-blue-100">
                <p className="text-xs font-bold text-[#3b82f6] uppercase tracking-widest mb-6">Results</p>
                <div className="space-y-6">
                  {s.results.map((r) => (
                    <div key={r.label} className="border-b border-blue-100 pb-5 last:border-0 last:pb-0">
                      <p className="font-body text-4xl font-extrabold text-[#3b82f6]">{r.stat}</p>
                      <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mt-1">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/contact" className="btn-gradient mt-6 block text-center font-semibold px-6 py-3.5 rounded-full text-sm">
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
            <p className="text-xs font-semibold text-[#3b82f6] uppercase tracking-widest mb-4">Case Studies</p>
            <h1 className="font-body text-6xl sm:text-7xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-6">
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
              className="group text-left rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300 bg-white"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={s.image} alt={s.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">{s.category}</span>
              </div>
              <div className="p-7">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-body text-4xl font-extrabold text-[#3b82f6]">{s.stat}</span>
                  <span className="text-xs font-bold text-[#525252] uppercase tracking-wider">{s.statLabel}</span>
                </div>
                <h3 className="font-body text-xl font-extrabold text-[#0A0A0A] mb-2 leading-tight">{s.client}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{s.headline}</p>
                <p className="text-xs font-semibold text-[#3b82f6] mt-4 group-hover:underline">Read case study</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}