import React from "react";
import HeroSection from "../components/plait/HeroSection";
import PlatformMarquee from "../components/plait/PlatformMarquee";
import ProcessSection from "../components/plait/ProcessSection";
import WhyPlait from "../components/plait/WhyPlait";
import OrbitSection from "../components/plait/OrbitSection";
import ResultsSection from "../components/plait/ResultsSection";
import PackagesSection from "../components/plait/PackagesSection";
import TestimonialsSection from "../components/plait/TestimonialsSection";
import ContactCTA from "../components/plait/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PlatformMarquee />
      <ProcessSection />
      <WhyPlait />
      <OrbitSection />
      <ResultsSection />
      <PackagesSection />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}