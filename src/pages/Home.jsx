import React from "react";
import HeroSection from "../components/plait/HeroSection";
import PlatformMarquee from "../components/plait/PlatformMarquee";
import WhatYouGet from "../components/plait/WhatYouGet";
import GrowthTimeline from "../components/plait/GrowthTimeline";
import TestimonialsSection from "../components/plait/TestimonialsSection";
import OrbitSection from "../components/plait/OrbitSection";
import CaseStudySection from "../components/plait/CaseStudySection";
import ComparisonTable from "../components/plait/ComparisonTable";
import StrandToggle from "../components/plait/StrandToggle";
import BrandMarquee from "../components/plait/BrandMarquee";
import RolesCarousel from "../components/plait/RolesCarousel";
import PackagesSection from "../components/plait/PackagesSection";
import ContactCTA from "../components/plait/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PlatformMarquee />
      <StrandToggle />
      <BrandMarquee />
      <RolesCarousel />
      <WhatYouGet />
      <GrowthTimeline />
      <TestimonialsSection />
      <CaseStudySection />
      <ComparisonTable />
      <OrbitSection />
      <PackagesSection />
      <ContactCTA />
    </>
  );
}