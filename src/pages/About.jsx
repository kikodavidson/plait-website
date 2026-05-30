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
              Who and Why.
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
                Helping a client hit a record month gives me the same feeling as hitting black on the roulette table. It's a rush I chase, one that takes hard work and creativity to achieve.
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

      {/* Core Beliefs */}
      <div className="section-gradient py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-body text-4xl font-extrabold text-[#0A0A0A] tracking-tight mb-12">Core Beliefs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🏆",
                title: "Winning is everything.",
                desc: <>This is a competitive field. I treat it like one. That means staying aggressive about improvement, disciplined in execution, and persistent in finding edges others miss: <strong>winning conversions</strong>, <strong>winning channels</strong>, and <strong>winning in the margins</strong> that compound over time.</>,
              },
              {
                emoji: "🔍",
                title: "Transparency Over Optics. Always.",
                desc: <>Most agencies are optimized for <strong>retention</strong>, not <strong>outcomes</strong>. Reports are built to reassure instead of inform, and activity is used to create the appearance of progress rather than actual improvement. I take the opposite approach. You'll see <strong>what's working</strong>, what isn't, and <strong>why</strong>, in plain language, with full context.</>,
              },
              {
                emoji: "💰",
                title: "Client Capital is to be Treated Like It's My Own",
                desc: <>I treat client capital <strong>the same way I treat my own</strong>. Allocation is deliberate, <strong>spend is justified</strong>, and nothing runs just to look busy. If dollars aren't producing, they're questioned, reworked, or pulled.</>,
              },
              {
                emoji: "🎯",
                title: "Stewardship Over Exploitation",
                desc: "Exploitation shows up as over-spending, over-promising, and over-optimizing for the report instead of the business. Stewardship means restraint, clear tradeoffs, and decisions that leave the business stronger after the work, not dependent on it.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col gap-4"
              >
                <h3 className="font-body text-lg font-extrabold text-[#0A0A0A]">{v.title}</h3>
                <p className="text-[#525252] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="relative py-28 px-6 overflow-hidden bg-[#0A0A0A]">
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-purple-700 opacity-30 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-rose-600 opacity-25 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/60 text-sm italic mb-6">"Whatever your hand finds to do, do it with all your might" Ecclesiastes 9:10</p>
            <h2 className="font-body text-6xl sm:text-7xl font-extrabold text-white mb-8">My Mission</h2>
            <p className="text-white/80 text-xl leading-relaxed mb-10">
              I am on a mission to be a light in a crowded industry by helping people bring their ideas to life and scale them into making a real impact on people's lives. I believe winning is found in the margins, and I'm committed to turning ideas into reality through a process that values honesty, creativity, and always looking for the next tactical edge.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] font-bold text-base px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}