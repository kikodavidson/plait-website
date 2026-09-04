import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { useIsMobile } from "@/hooks/use-mobile";

const ROLES = [
  { common: "Paid Media Manager", binomial: "Paid ads & scaling" },
  { common: "Creative Strategist", binomial: "Concepts & angles" },
  { common: "CRO Specialist", binomial: "Conversion & testing" },
  { common: "Web Designer / Landing Page Developer", binomial: "Build & design" },
  { common: "Growth Marketing Manager", binomial: "Strategy & oversight" },
  { common: "Marketing Analytics Manager", binomial: "Data & reporting" },
  { common: "Email Marketing Manager", binomial: "Lifecycle & retention" },
  { common: "Copywriter", binomial: "Words & messaging" },
];

const GALLERY_ITEMS = ROLES.map((r) => ({
  common: r.common,
  binomial: r.binomial,
  photo: { url: "", text: r.common, by: "" },
}));

export default function RolesCarousel() {
  const isMobile = useIsMobile();

  return (
    <section className="py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#525252]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#525252]">Your extended team</span>
          </div>
          <h2
            className="font-body text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-4"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
          >
            The roles you're adding<br />to your team.
          </h2>
        </motion.div>

        {/* Circular 3D gallery — auto-rotates and responds to page scroll */}
        <div className="relative h-[380px] sm:h-[560px]">
          <CircularGallery items={GALLERY_ITEMS} radius={isMobile ? 300 : 480} autoRotateSpeed={0.015} />
        </div>
      </div>
    </section>
  );
}