import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service_interest: "", message: "" });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Name and email are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    await base44.entities.ContactInquiry.create(form);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h2 className="font-display text-4xl font-extrabold text-[#0A0A0A] mb-3">Got it.</h2>
          <p className="text-[#525252] leading-relaxed">
            I'll be in touch within 24 hours. If you want to skip the wait, grab a time on my calendar below.
          </p>
          <div className="mt-8 bg-[#F8F7FF] border border-indigo-100 rounded-2xl p-6">
            <p className="text-sm font-semibold text-[#0A0A0A] mb-2">Book a time directly</p>
            <p className="text-xs text-[#525252] mb-4">30-minute strategy call, no strings attached.</p>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4F46E5] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Open Calendly
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="hero-gradient pb-16 px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-4">Contact</p>
            <h1 className="font-display text-6xl sm:text-7xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-5">
              Let's talk.
            </h1>
            <p className="text-[#525252] text-lg max-w-lg leading-relaxed">
              No pressure. No sales pitch. Just an honest conversation about where your funnel is leaking and whether PLAIT is the right fit to fix it.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">Name *</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">Company</label>
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                placeholder="Brand name"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">What are you after?</label>
              <select
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                value={form.service_interest}
                onChange={(e) => set("service_interest", e.target.value)}
              >
                <option value="">Pick one...</option>
                <option value="clarity_audit">Clarity Audit ($500 to $800)</option>
                <option value="launch_system">Launch System ($2,500 to $4,500)</option>
                <option value="growth_retainer">Growth Retainer (Custom)</option>
                <option value="other">Not sure yet — let's talk</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-2">What's going on?</label>
              <textarea
                rows={5}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors resize-none"
                placeholder="Where's the funnel leaking? What have you tried? What does success look like?"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4F46E5] text-white font-semibold py-4 rounded-full text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send It"}
            </button>
          </motion.form>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-[#F8F7FF] rounded-3xl border border-indigo-100 p-8">
              <h3 className="font-display text-xl font-extrabold text-[#0A0A0A] mb-4">Prefer to book direct?</h3>
              <p className="text-sm text-[#525252] mb-5 leading-relaxed">
                Grab a free 30-minute strategy call. No pitch, no deck. Just an honest look at your funnel.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4F46E5] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Book on Calendly
              </a>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-4">
              <h3 className="font-display text-lg font-extrabold text-[#0A0A0A]">What to expect</h3>
              <ul className="space-y-3">
                {[
                  "Response within 24 hours (usually faster)",
                  "No sales pitch — a real conversation",
                  "Honest assessment of whether PLAIT is the right fit",
                  "If we move forward, a clear plan before any commitment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#525252]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0A0A0A] text-white rounded-3xl p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Current availability</p>
              <p className="font-display text-3xl font-extrabold mb-2">Taking on 2 new clients.</p>
              <p className="text-sm text-gray-400">Retainer spots go fast. Audit spots are always open.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}