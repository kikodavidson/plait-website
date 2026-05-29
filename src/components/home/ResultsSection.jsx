import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";

const caseStudies = [
  {
    client: "TechFlow SaaS",
    industry: "Technology",
    metric: "+312%",
    label: "Organic Traffic",
    icon: TrendingUp,
    desc: "Scaled organic traffic from 5K to 20K monthly visitors in 6 months through technical SEO and content strategy.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    client: "Luxe Beauty Co.",
    industry: "E-Commerce",
    metric: "4.8x",
    label: "ROAS",
    icon: DollarSign,
    desc: "Achieved 4.8x return on ad spend through targeted Meta and Google Ads campaigns with creative testing.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
  },
  {
    client: "FitLife App",
    industry: "Health & Fitness",
    metric: "85K",
    label: "New Users",
    icon: Users,
    desc: "Drove 85,000 app downloads in Q1 through influencer partnerships and performance marketing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
];

export default function ResultsSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-heading font-semibold text-accent uppercase tracking-widest">Case Studies</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
            Results that speak
            <br />louder than promises.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.client}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs font-medium text-muted-foreground bg-background/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    {study.industry}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="font-heading text-sm font-medium text-muted-foreground mb-2">{study.client}</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {study.metric}
                  </span>
                  <span className="text-sm text-muted-foreground">{study.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{study.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}