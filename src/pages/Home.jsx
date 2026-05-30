import React from "react";
import HeroSection from "../components/plait/HeroSection";
import PlatformMarquee from "../components/plait/PlatformMarquee";
import WhatYouGet from "../components/plait/WhatYouGet";
import ProcessSteps from "../components/plait/ProcessSteps";
import TestimonialsSection from "../components/plait/TestimonialsSection";
import OrbitSection from "../components/plait/OrbitSection";
import ResultsSection from "../components/plait/ResultsSection";
import PlaitSystem from "../components/plait/PlaitSystem";
import PackagesSection from "../components/plait/PackagesSection";
import ContactCTA from "../components/plait/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PlatformMarquee />
      <WhatYouGet />
      <ProcessSteps />
      <TestimonialsSection />
      <OrbitSection />
      <PlaitSystem />
      <ResultsSection />
      <PackagesSection />
      <ContactCTA />
    </>
  );
}