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
  { name: "airia", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/8a877c4ba_Untitleddesign-2026-08-23T190010531.png" },
  { name: "BAMF HAMMER", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/62bb1b08e_Untitleddesign-2026-08-23T190026408.png" },
  { name: "EDERRA", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/b98d87b91_Untitleddesign-2026-08-23T190047744.png" },
  { name: "krýo.", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/fbaa237f3_Untitleddesign-2026-08-23T190104397.png" },
  { name: "Protouch Golf Wedges", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/4b02ab878_Untitleddesign-2026-08-23T190133474.png" },
  { name: "Ivy", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/e1cdb24d7_Untitleddesign-2026-08-23T190146436.png" },
  { name: "Board", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/d2a795161_Untitleddesign-2026-08-23T190159439.png" },
  { name: "Athletics", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/f7c736524_Untitleddesign-2026-08-23T190215463.png" },
  { name: "Open Heart", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/1b68406ab_Untitleddesign-2026-08-23T190226405.png" },
  { name: "Left Behind Golf", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/a82c85dad_Untitleddesign-2026-08-23T190244427.png" },
];

export default function BrandMarquee() {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-black mb-8">
          Brands we&apos;ve worked with
        </p>
        <PerspectiveMarquee
          items={BRAND_LOGOS}
          itemWidth={340}
          logoHeight={140}
          logoPadding={8}
          pixelsPerFrame={1.2}
          rotateY={-18}
          rotateX={4}
          fadeColor="#ffffff"
          background="transparent"
        />
      </div>
    </section>
  );
}