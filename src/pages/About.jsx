import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Zap, Globe } from "lucide-react";

const team = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Jordan Lee",
    role: "Head of Strategy",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sam Rivera",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Taylor Kim",
    role: "Head of SEO",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
  },
];

const values = [
  { icon: Zap, title: "Results-First", desc: "Every strategy is measured by its impact on your bottom line." },
  { icon: Users, title: "Transparency", desc: "Real-time reporting and open communication at every step." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards of craft and performance." },
  { icon: Globe, title: "Innovation", desc: "Always testing, learning, and staying ahead of the curve." },
];

export default function About() {
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
          <span className="text-xs font-heading font-semibold text-primary uppercase tracking-widest">About Us</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 leading-tight">
            We're the team behind
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              your next breakthrough.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed max-w-2xl">
            Founded in 2019, PulseDigital is a performance-driven digital marketing agency. We combine deep expertise with bold creativity to deliver results that matter.
          </p>
        </motion.div>
      </div>

      {/* Story section */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We started PulseDigital with a simple belief: marketing should be measurable, transparent, and genuinely impactful. Too many agencies hide behind vanity metrics. We focus on what actually moves the needle for your business.
              </p>
              <p>
                Today, we're a team of 25+ strategists, creatives, and data analysts who live and breathe digital growth. From startups to enterprise brands, we've helped over 250 businesses scale their digital presence and revenue.
              </p>
              <p>
                Our approach is rooted in data but driven by creativity. We don't do cookie-cutter campaigns — every strategy is custom-built around your goals, audience, and market.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-card/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card/50 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="text-xs font-heading font-semibold text-primary uppercase tracking-widest">Leadership</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="rounded-2xl overflow-hidden aspect-square mb-4 border border-border">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 font-heading font-semibold text-base px-8 h-13 group">
              Work With Us
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}