import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const serviceOptions = [
  { value: "seo", label: "SEO Optimization" },
  { value: "ppc", label: "PPC Advertising" },
  { value: "social_media", label: "Social Media Marketing" },
  { value: "content_marketing", label: "Content Marketing" },
  { value: "email_marketing", label: "Email Marketing" },
  { value: "web_design", label: "Web Design" },
  { value: "branding", label: "Branding" },
  { value: "other", label: "Other" },
];

const budgetOptions = [
  { value: "under_5k", label: "Under $5,000/mo" },
  { value: "5k_10k", label: "$5,000 – $10,000/mo" },
  { value: "10k_25k", label: "$10,000 – $25,000/mo" },
  { value: "25k_50k", label: "$25,000 – $50,000/mo" },
  { value: "50k_plus", label: "$50,000+/mo" },
];

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service_interest: "",
    budget: "",
    message: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Please fill in your name and email.", variant: "destructive" });
      return;
    }
    setLoading(true);
    await base44.entities.ContactInquiry.create(form);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-3">Thank You!</h2>
          <p className="text-muted-foreground leading-relaxed">
            We've received your inquiry and will get back to you within 24 hours. Let's build something great together.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-heading font-semibold text-primary uppercase tracking-widest">Contact Us</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 leading-tight">
            Let's start your
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              growth story.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
            Fill out the form below and we'll reach out within 24 hours to schedule your free strategy consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card/50 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Full Name *</Label>
                  <Input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-secondary/50 border-border h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email *</Label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-secondary/50 border-border h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Company</Label>
                <Input
                  placeholder="Your company name"
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="bg-secondary/50 border-border h-11"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Service Interest</Label>
                  <Select value={form.service_interest} onValueChange={(v) => handleChange("service_interest", v)}>
                    <SelectTrigger className="bg-secondary/50 border-border h-11">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Monthly Budget</Label>
                  <Select value={form.budget} onValueChange={(v) => handleChange("budget", v)}>
                    <SelectTrigger className="bg-secondary/50 border-border h-11">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tell us about your project</Label>
                <Textarea
                  placeholder="What are your goals? Any specific challenges?"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="bg-secondary/50 border-border h-32 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 font-heading font-semibold text-base h-12"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Inquiry
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card/50 p-7">
                <h3 className="font-heading font-semibold text-lg mb-5">Get in Touch</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">hello@pulsedigital.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Office</p>
                      <p className="text-sm text-muted-foreground">123 Marketing Ave, NYC</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Hours</p>
                      <p className="text-sm text-muted-foreground">Mon–Fri, 9AM–6PM EST</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-7">
                <h3 className="font-heading font-semibold text-lg mb-2">Free Strategy Session</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every engagement starts with a complimentary 30-minute strategy call. We'll review your current marketing, identify opportunities, and outline a roadmap — no strings attached.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}