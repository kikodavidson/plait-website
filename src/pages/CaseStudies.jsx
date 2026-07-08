import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const studies = [
  {
    slug: "extern",
    client: "Extern",
    category: "SaaS / Increase in Users",
    stat: "90%",
    statLabel: "Reduction in CAC",
    image: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/244f33ae3_TestimonialBanners2.png",
    headline: "How we cut CAC for a SaaS platform targeting one of the hardest audiences in paid media: broke college students.",
    sections: [
      {
        title: "The Situation",
        content: "Extern had a real product and a clear goal — acquire customers at a sustainable cost. The problem wasn't demand. It was structure. When I came in, budget was fragmented across multiple campaigns with competing objectives. Signals were diluted, delivery was inconsistent, and the account wasn't built to drive purchases efficiently. They didn't need more traffic. They needed a system that could actually convert it.",
      },
      {
        title: "The Challenge",
        content: "College students are one of the most difficult audiences to sell to in paid media. Disposable income is limited, skepticism toward paid programs is high, and the decision making cycle is longer than most advertisers plan for. Every dollar had to work harder because the audience was predisposed to hesitate. There was no margin for a sloppy funnel.",
      },
      {
        title: "The Approach",
        content: "The first move was consolidation. Multiple campaigns with fragmented budgets mean diluted signals, and diluted signals mean Meta can't optimize properly. We collapsed the account into a unified evergreen framework built entirely around purchase intent. Once the structure was clean, the platform had what it needed to stabilize delivery and find the right buyers.\n\nFrom there we expanded methodically. New audience segments were identified through layered interest testing and algorithmic expansion, scaling into pockets of efficiency as they emerged rather than guessing upfront.\n\nCreative was treated as a testing system, not a production line. We explored career leverage, ROI framing, credibility positioning, urgency, and social proof across multiple formats to find what actually moved a fiscally constrained student to convert.\n\nAt the bottom of the funnel we built something that didn't exist before — a dedicated retargeting strategy segmented by engagement depth, increasing frequency strategically and serving tailored messaging to users who had already shown interest. Objections got addressed. Value got reinforced. And conversion rates improved as a result.",
      },
      {
        title: "The Outcome",
        content: "CAC dropped significantly within weeks of consolidating the account structure. As delivery stabilized and budget concentrated into high performing segments, efficiency compounded across the funnel. The system didn't just perform — it got more efficient over time.",
      },
      {
        title: "The Takeaway",
        content: "A fragmented account is a self-inflicted handicap. Before testing creative, before expanding audiences, before scaling spend — the structure has to be right. Clean signals give the algorithm what it needs to find your buyer. Everything else builds on top of that foundation.",
      },
    ],
    results: [{ stat: "90%", label: "Reduction in CAC" }, { stat: "24x", label: "Increase in New Users" }],
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
  {
    slug: "airia-williams-f1",
    client: "Airia",
    category: "SaaS / Brand Awareness",
    stat: "30M+",
    statLabel: "Impressions in Two Months",
    image: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/88a18da6f_TestimonialBanners.png",
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
    slug: "ivy-dating",
    client: "Ivy Dating",
    category: "App / D2C",
    stat: "205%",
    statLabel: "Increase in App Downloads",
    image: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/1a7ae7e87_TestimonialBanners5.png",
    headline: "How we doubled the number of users over the course of two months.",
    sections: [
      {
        title: "The Situation",
        content: "Ivy isn't another swipe app. It's built around real world connection, meeting people when you're nearby, active, and open. The concept was strong. What it needed was a paid acquisition system that could communicate that difference fast enough to stop a scroll, set the right expectations before download, and bring in users who would actually stick around.",
      },
      {
        title: "The Challenge",
        content: "Dating apps live and die by activation and retention. Getting someone to download is the easy part. Getting them to their first real connection before they ghost the app is where most platforms lose. We had to build a system that drove efficient signups AND fed quality users into an experience that could hold them. Both problems had to be solved at the same time.",
      },
      {
        title: "The Approach",
        content: "On the paid side we moved fast and kept production lean. Carousels, statics, and UGC style video gave us creative variety without heavy costs, which meant we could rotate and iterate quickly based on what the data was telling us.\n\nTargeting evolved as the platform did. We started with geo and demographic targeting to capture the most obvious pockets of intent. As Meta shifted toward broader, more conceptual audience structures we adapted, building audiences around ideas and behaviors rather than rigid interest stacks. That flexibility kept performance stable through the transition instead of fighting the algorithm.\n\nAttribution was set up through Appsflyer to ensure accurate tracking and give the campaigns a foundation built for long term scalability rather than guesswork.\n\nWhile acquisition ran, we audited the full user journey from first open to first connection. Onboarding, in app education, notifications, key prompts. Everything got pressure tested for friction. The goal was to get users to their aha moment faster and make sure the app experience matched the promise the ads made.",
      },
      {
        title: "The Outcome",
        content: "Downloads increased, and the ripple effect mattered more than the number itself. More users meant more activity, more activity meant more real feedback, and that feedback became the engine behind a significantly improved product over the last year. The campaigns didn't just drive growth. They accelerated Ivy's ability to build a better app.",
      },
      {
        title: "The Takeaway",
        content: "An app is only as good as the experience waiting on the other side of the download. Paid acquisition can fill the top of the funnel but if the product doesn't deliver on what the ad promised, you're just buying churn. The work that matters most happens at the intersection of acquisition and activation, and that's exactly where we focused.",
      },
    ],
    results: [{ stat: "205%", label: "Increase in App Downloads" }, { stat: "345%", label: "Cohort Active Users Jump" }],
  },
  {
    slug: "hg-training",
    client: "HG Training",
    category: "Coaching | Lead Gen",
    stat: "12.4x",
    statLabel: "Blended ROAS",
    image: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/729d88341_TestimonialBanners1.png",
    headline: "Finding Qualified Leads in a Market Most Advertisers Would Ignore",
    sections: [
      {
        title: "The Situation",
        content: "Hudson runs a private soccer training business with a hyper specific geographic constraint. We weren't targeting a city. We were targeting parents of soccer players within a 20 mile radius who were ready to invest in private coaching for their kid. The addressable audience was small by design. Every dollar had to count.",
      },
      {
        title: "The Challenge",
        content: "A tight geo plus a tight budget leaves zero margin for error. You can't test broadly and optimize later when the pool of people you're reaching is already limited. We needed to get the message right early, reach the right people, and convert them efficiently before the audience ran out of room.",
      },
      {
        title: "The Approach",
        content: "Trust was the first problem to solve. Parents don't hand their kid over to a trainer they don't know. So we led with Hudson's credentials: his background coaching at Liberty University and the top junior college program in the country. That established credibility before anyone had to take our word for it.\n\nFrom there we built content around the experience itself. What a session looks like. What players actually work on. What they leave with. Parents needed to see the process, not just hear a pitch.\n\nWe ran a leads campaign using Meta's native lead forms to remove friction and capture intent without sending people off platform. The funnel was structured to pre frame the offer and qualify leads before they ever hit Hudson's inbox, protecting both his time and the ad spend.\n\nAs conversions came in we paid attention to the patterns. What language moved parents. What objections kept surfacing. What concepts outperformed. We doubled down on what worked and cut everything else.",
      },
      {
        title: "The Outcome",
        content: "$8 cost per lead. 12.4x blended ROAS. In a market most advertisers would consider too small to bother with.",
      },
      {
        title: "The Takeaway",
        content: "Small markets don't require small thinking. They require precision. When you can't rely on volume to bail you out, everything has to be intentional: the message, the creative, the funnel structure, the targeting. Get those right and a tight geo stops being a limitation. It becomes an advantage.",
      },
    ],
    results: [{ stat: "$8", label: "Cost Per Lead" }, { stat: "12.4x", label: "Blended ROAS" }],
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
            className="mt-10 mb-12 inline-flex items-center gap-2 bg-[#1c1b1a] text-[#f4f2ee] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#333] transition-colors"
          >
            <span>←</span> Back to Case Studies
          </button>

          <div className="rounded-3xl overflow-hidden h-64 md:h-96 mb-12">
            <img src={s.image} alt={s.client} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-xs font-bold text-[#4B87E7] uppercase tracking-widest mb-3">{s.category}</p>
              <h1 className="font-body text-4xl sm:text-5xl font-bold text-[#1c1b1a] tracking-tight leading-tight mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.02em' }}>{s.headline}</h1>
              {s.sections ? (
                <div className="space-y-8">
                  {s.sections.map((sec) => (
                    <div key={sec.title}>
                      <h2 className="font-body text-xl font-bold text-[#1c1b1a] mb-2">{sec.title}</h2>
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
                <p className="text-xs font-bold text-[#4B87E7] uppercase tracking-widest mb-6">Results</p>
                <div className="space-y-6">
                  {s.results.map((r) => (
                    <div key={r.label} className="border-b border-blue-100 pb-5 last:border-0 last:pb-0">
                      <p className="font-body text-4xl font-bold text-[#4B87E7]">{r.stat}</p>
                      <p className="text-xs font-bold text-[#1c1b1a] uppercase tracking-wider mt-1">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/contact" className="btn-gradient mt-6 block text-center font-semibold px-6 py-3.5 rounded-full text-sm">
                Get in Touch
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
            <p className="text-xs font-semibold text-[#4B87E7] uppercase tracking-widest mb-4">Case Studies</p>
            <h1 className="font-body text-6xl sm:text-7xl font-bold text-[#1c1b1a] tracking-tight leading-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.02em' }}>
              What Winning<br />Looks Like.
            </h1>
            <p className="text-[#525252] text-lg max-w-lg leading-relaxed">
              Numbers never lie and we came with the receipts.
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
              <div className="relative h-40 sm:h-52 overflow-hidden bg-[#1c1b1a]">
                <img src={s.image} alt={s.client} className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1a]/40 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold text-[#f4f2ee] bg-[#1c1b1a]/40 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">{s.category}</span>
              </div>
              <div className="p-7">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-body text-4xl font-bold text-[#4B87E7]">{s.stat}</span>
                  <span className="text-xs font-bold text-[#525252] uppercase tracking-wider">{s.statLabel}</span>
                </div>
                <h3 className="font-body text-xl font-bold text-[#1c1b1a] mb-2 leading-tight">{s.client}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{s.headline}</p>
                <p className="text-xs font-semibold text-[#4B87E7] mt-4 group-hover:underline">Read case study</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}