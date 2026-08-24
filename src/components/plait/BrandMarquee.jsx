import React from "react";
import { PerspectiveMarquee } from "@/components/ui/perspective-marquee";

/**
 * Brand marquee — a 3D perspective logo wall.
 *
 * 👉 Add your client / brand logos here. Each entry is { name, logo }.
 *    `logo` is a URL to the brand's logo image (transparent PNG / SVG works best).
 *    If you leave `logo` out, the `name` renders as styled text as a fallback.
 */
const BRAND_LOGOS = [
  { name: "Meta", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/cea2ebee9_Untitleddesign-2026-05-29T152821634.png" },
  { name: "Shopify", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/a52e929bd_logos2.png" },
  { name: "TikTok", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/78d50c267_logos1.png" },
  { name: "Google Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/77c3c7b74_Untitleddesign-2026-05-29T153409951.png" },
  { name: "LinkedIn", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/811fd1e37_logos.png" },
  { name: "GA4", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/1557e7da2_logos3.png" },
  { name: "Apple Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/f5b0265b5_Untitleddesign-2026-05-29T153159952.png" },
];

export default function BrandMarquee() {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#7a7a7a] mb-6">
          Brands we&apos;ve scaled
        </p>
        <PerspectiveMarquee
          items={BRAND_LOGOS}
          itemWidth={240}
          logoHeight={88}
          logoPadding={4}
          pixelsPerFrame={1.2}
          rotateY={-22}
          rotateX={6}
          fadeColor="#ffffff"
          background="transparent"
        />
      </div>
    </section>
  );
}