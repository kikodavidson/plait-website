import React from "react";
import { Link } from "react-router-dom";
import { Search, Target, Share2, FileText, Mail, Monitor, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Search, title: "SEO", desc: "Dominate search results and drive organic traffic with proven strategies.", color: "from-primary to-primary/60" },
  { icon: Target, title: "PPC Advertising", desc: "Maximize ad spend ROI with precision-targeted campaigns across all platforms.", color: "from-accent to-accent/60" },
  { icon: Share2, title: "Social Media", desc: "Build engaged communities and turn followers into brand advocates.", color: "from-chart-3 to-chart-3/60" },
  { icon: FileText, title: "Content Marketing", desc: "Tell your brand story with content that educates, inspires, and converts.", color: "from-chart-4 to-chart-4/60" },
  { icon: Mail, title: "Email Marketing", desc: "Nurture leads and drive repeat sales with automated email workflows.", color: "from-chart-5 to-chart-5/60" },
  { icon: Monitor, title: "Web Design", desc: "High-converting websites that blend beautiful design with performance.", color: "from-primary to-accent" },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-heading font-semibold text-primary uppercase tracking-widest">What We Do</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
            Full-spectrum digital
            <br />marketing solutions.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Every service is backed by data, refined by creativity, and measured by results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to="/services" className="group block p-7 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 h-full">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}