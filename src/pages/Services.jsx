import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search, Target, Share2, FileText, Mail, Monitor,
  ArrowRight, CheckCircle2, BarChart3, Palette
} from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Search Engine Optimization",
    desc: "We craft comprehensive SEO strategies that increase visibility, drive qualified organic traffic, and build lasting authority in your market.",
    features: ["Technical SEO Audits", "Content Strategy", "Link Building", "Local SEO", "Analytics & Reporting"],
    color: "from-primary to-primary/60",
  },
  {
    icon: Target,
    title: "PPC & Paid Advertising",
    desc: "Maximize every dollar with precision-targeted campaigns on Google Ads, Meta, LinkedIn, and beyond. We optimize relentlessly for ROAS.",
    features: ["Google Ads Management", "Meta Ads (FB & IG)", "LinkedIn Advertising", "Retargeting Campaigns", "A/B Testing"],
    color: "from-accent to-accent/60",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Build authentic connections with your audience through strategic content, community management, and paid social campaigns.",
    features: ["Content Calendar", "Community Management", "Influencer Partnerships", "Social Analytics", "Brand Voice Development"],
    color: "from-chart-3 to-chart-3/60",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Tell your brand's story with content that ranks, engages, and converts. From blog posts to video production, we handle it all.",
    features: ["Blog Writing", "Video Production", "Infographics", "Whitepapers & eBooks", "Content Distribution"],
    color: "from-chart-4 to-chart-4/60",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Nurture leads and drive repeat revenue with automated email sequences, segmentation, and compelling copy that gets clicks.",
    features: ["Automation Workflows", "List Segmentation", "A/B Testing", "Template Design", "Deliverability Optimization"],
    color: "from-chart-5 to-chart-5/60",
  },
  {
    icon: Monitor,
    title: "Web Design & Development",
    desc: "High-performance websites designed to convert. We combine stunning aesthetics with UX best practices and lightning-fast speed.",
    features: ["Responsive Design", "Conversion Optimization", "Speed Optimization", "Custom Development", "UI/UX Design"],
    color: "from-primary to-accent",
  },
];

export default function Services() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs font-heading font-semibold text-primary uppercase tracking-widest">Our Services</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 leading-tight">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              win online.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
            From strategy to execution, we provide end-to-end digital marketing services that drive measurable growth for your business.
          </p>
        </motion.div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card/50 hover:border-primary/20 transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-4">What's Included</p>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6 text-lg">Not sure which service is right for you?</p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 font-heading font-semibold text-base px-8 h-13 group">
              Let's Talk Strategy
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}