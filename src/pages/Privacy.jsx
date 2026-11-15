import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "What we collect",
    body: [
      "Information you give us: your name, email, company, and anything you write in a contact form or booking request.",
      "Information collected automatically: pages viewed, browser and device type, approximate location derived from your IP address, and the site that referred you.",
      "Client work: if you are a PLAIT client, we hold the brand assets, ad accounts access, and performance data needed to run your account.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "To reply to your enquiry and, if we work together, to deliver and report on the work.",
      "To understand which pages and offers are useful so we can improve the site.",
      "To send you relevant updates, only where you have asked for them.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: [
      "We use cookies and similar technologies for analytics and, on some pages, advertising measurement. These help us see what brought you here and whether an ad worked.",
      "You can block or clear cookies in your browser at any time. The site still works; some measurement will not.",
    ],
  },
  {
    title: "Who we share it with",
    body: [
      "Service providers that run parts of our business: hosting, email, scheduling, analytics, and advertising platforms. They act on our instructions and are not allowed to use your data for their own marketing.",
      "We do not sell your personal information.",
      "We may disclose information where the law requires it, or to protect our rights and the safety of others.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "Enquiries are kept for as long as useful to follow up, then deleted or archived.",
      "Client records are kept for the length of the engagement and for as long afterwards as tax and contract law requires.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask to see, correct, or delete the personal information we hold about you, and you can ask us to stop emailing you at any time.",
      "If you are a California resident, you also have the right to know what we collect, to request deletion, and to opt out of any sharing for cross-context behavioural advertising. We do not sell personal information.",
      "To make a request, contact us and we will respond within 30 days.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use access controls, encryption in transit, and reputable providers to protect the information we hold. No system is perfect, so we keep the data we hold to what the work actually needs.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If this policy changes, the effective date below updates. Material changes will be flagged on this page.",
    ],
  },
];

export default function Privacy() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Privacy Policy | PLAIT";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[#2d2d2d] tracking-tight leading-tight mb-5">
            Privacy Policy
          </h1>
          <p className="text-[#525252] leading-relaxed">
            PLAIT handles a small amount of information about the people who visit this site
            and the brands we work with. This page explains what that is, why we have it, and
            what you can ask us to do with it.
          </p>
          <p className="text-xs text-[#8a8a8a] uppercase tracking-wider mt-6">
            Effective November 15, 2026
          </p>
        </motion.div>

        <div className="mt-14 space-y-12">
          {SECTIONS.map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.2) }}
            >
              <h2 className="text-lg font-extrabold text-[#2d2d2d] mb-3">
                {i + 1}. {section.title}
              </h2>
              <div className="space-y-3">
                {section.body.map((p) => (
                  <p key={p} className="text-[15px] leading-[1.75] text-[#525252]">
                    {p}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}

          <section className="rounded-2xl border border-gray-100 bg-[#F7F5F0] p-7">
            <h2 className="text-lg font-extrabold text-[#2d2d2d] mb-2">Questions</h2>
            <p className="text-[15px] leading-[1.75] text-[#525252]">
              Anything unclear, or want your information removed?{" "}
              <Link to="/contact" className="font-bold text-[#2d2d2d] underline underline-offset-4">
                Get in touch
              </Link>{" "}
              and we will sort it.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}