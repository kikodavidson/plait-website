import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-28 pb-24">
      {/* Header */}
      <div className="hero-gradient pb-24 px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-4">About</p>
            <h1 className="font-body text-6xl sm:text-7xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-6">
              Stewardship<br />Over Exploitation.
            </h1>
            <p className="text-[#525252] text-lg leading-relaxed max-w-xl">
              I will pull spend that isn't earning even if it costs me the retainer. That's not a pitch. It's how I operate.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/af29b721b_Screenshot2026-05-29at64049PM.png"
                alt="Luke Davidson"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h2 className="font-body text-4xl font-extrabold text-[#0A0A0A] tracking-tight">Luke Davidson</h2>
            <p className="text-[#525252] text-base font-medium">Founder of Plait</p>

            <div className="space-y-4 text-[#525252] leading-relaxed text-base">
              <p>
                I have a problem. I really, really like winning.
              </p>
              <p>
                Growing up as a sponsored motocross racer and later an NCAA soccer player, I became obsessed with finding an edge, solving problems, and winning. When I discovered performance marketing, everything clicked.
              </p>
              <p>
                Marketing combines everything I love: psychology, creativity, strategy, and competition. Every business is a puzzle. Every market has opportunities hiding in plain sight. My job is to find them.
              </p>
              <p>
                Whether it's ads, websites, attribution, or messaging, I enjoy connecting the dots and uncovering what's holding growth back.
              </p>
              <p>
                Helping a client hit a record month gives me the same feeling as hitting black on the roulette table. It's a rush I chase — one that takes hard work and creativity to achieve.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "8+", label: "Years Experience" },
                  { value: "80+", label: "Brands Scaled" },
                  { value: "11+", label: "Channels" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-body text-3xl font-extrabold text-[#4F46E5]">{s.value}</p>
                    <p className="text-xs text-[#525252] uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#4F46E5] text-white font-semibold px-7 py-4 rounded-full text-sm hover:bg-indigo-700 transition-colors"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section-gradient py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-body text-4xl font-extrabold text-[#0A0A0A] tracking-tight mb-12">How I operate.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "I'll fire myself if your numbers don't work.", desc: "If a campaign isn't performing, I'll say so. I've walked away from retainers because the math didn't make sense for the client. I'll do it again." },
              { title: "No hiding behind dashboards.", desc: "You'll know exactly what's working, what's not, and what we're doing about it. No vanity metrics. No 40 slide decks with three meaningful slides buried inside." },
              { title: "One person. The whole funnel.", desc: "No handoffs to a junior account manager. No 'I just handle the ads.' I own the whole strategy, which means nothing falls through the cracks between departments." },
              { title: "Faith-driven, principle-led.", desc: "My faith isn't a brand prop. It's the thing that keeps me honest when it would be easier not to be. Stewardship over exploitation — in every client relationship." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 p-8"
              >
                <h3 className="font-body text-xl font-extrabold text-[#0A0A0A] mb-3">{v.title}</h3>
                <p className="text-[#525252] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}