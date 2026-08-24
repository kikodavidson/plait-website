import React from "react";
import { motion } from "framer-motion";
import VerticalTabs from "@/components/ui/vertical-tabs";

export default function WhatYouGet() {
  return (
    <section className="py-28 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            What you get.
          </h2>
        </motion.div>

        <VerticalTabs />
      </div>
    </section>
  );
}