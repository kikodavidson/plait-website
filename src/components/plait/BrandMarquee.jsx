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
  { name: "airia", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/e0a685770_Untitleddesign-2026-08-24T144848886.png" },
  { name: "BAMF HAMMER", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/afb3711bb_Untitleddesign-2026-08-24T144903223.png" },
  { name: "EDERRA", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/0893613d3_Untitleddesign-2026-08-24T144926146.png" },
  { name: "krýo.", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/6351ad400_Untitleddesign-2026-08-24T145005227.png" },
  { name: "Protouch Golf Wedges", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/6f67ed5ac_Untitleddesign-2026-08-24T145023440.png" },
  { name: "Ivy", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/bdd34c3db_Untitleddesign-2026-08-24T145230295.png" },
  { name: "Board", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/8dd1a0102_Untitleddesign-2026-08-24T144943174.png" },
  { name: "Leaderboard", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/84931deca_Untitleddesign-2026-08-24T145248184.png" },
  { name: "Open Heart", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/83d24461d_Untitleddesign-2026-08-24T145304840.png" },
  { name: "Left Behind Golf", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/544d8e152_Untitleddesign-2026-08-24T145327134.png" },
];


export default function BrandMarquee() {
  return (
    <section className="px-6">
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
          fadeColor="transparent"
          background="transparent" />
        
      </div>
    </section>);

}