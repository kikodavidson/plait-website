import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InlineWidget } from "react-calendly";
import { Mail, MessageCircle } from "lucide-react";

export default function Book() {
  useEffect(() => {
    const handler = (e) => {
      if (e.origin !== 'https://calendly.com') return;
      const event = e.data.event;
      if (!window.gtag) return;

      if (event === "calendly.profile_page_viewed") {
        window.gtag("event", "calendly_viewed", {
          event_category: "engagement",
          event_label: "Calendar Loaded",
        });
      } else if (event === "calendly.date_and_time_selected") {
        window.gtag("event", "calendly_time_selected", {
          event_category: "engagement",
          event_label: "Time Slot Picked",
        });
      } else if (event === "calendly.event_scheduled") {
        window.gtag("event", "calendly_booked", {
          event_category: "engagement",
          event_label: "Strategy Call Booked",
        });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="pt-28 pb-24">
      <div className="hero-gradient px-6 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-widest mb-4">Book a Call</p>
            <h1 className="font-body text-5xl sm:text-6xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-4">
              A fresh set of eyes on your marketing.
            </h1>
            <p className="text-[#525252] text-lg max-w-lg leading-relaxed">
              We'll spend 30 minutes learning about your business, unpacking your biggest challenges, and seeing if there's an opportunity to grow together.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-[#F8F7FF] rounded-3xl border border-indigo-100 p-6 sm:p-8 overflow-hidden"
        >
          <InlineWidget
            url="https://calendly.com/luke-plaitgrowth"
            styles={{ height: "640px", width: "100%" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 bg-[#F8F7FF] rounded-3xl border border-indigo-100 p-6 sm:p-8 text-center"
        >
          <h2 className="font-body text-2xl font-bold text-[#2d2d2d] mb-2">Tight on time?</h2>
          <p className="text-[#525252] leading-relaxed max-w-md mx-auto mb-5">
            Skip the meeting. Shoot me a quick text or email and I'll get back to you same day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="sms:3607736339"
              className="inline-flex items-center gap-2 bg-[#2d2d2d] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1a1a1a] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Text (360) 773-6339
            </a>
            <a
              href="mailto:luke@plaitgrowth.com"
              className="inline-flex items-center gap-2 border border-[#2d2d2d] text-[#2d2d2d] font-bold px-6 py-3 rounded-full hover:bg-[#2d2d2d] hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              luke@plaitgrowth.com
            </a>
          </div>
        </motion.div>

        <p className="text-center text-sm text-[#525252] mt-8">
          Prefer a form? <Link to="/contact" className="text-[#5E58D5] font-semibold hover:underline">Reach out here.</Link>
        </p>
      </div>
    </div>
  );
}