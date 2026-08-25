import React from "react";

const platforms = [
  { name: "Meta", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/cea2ebee9_Untitleddesign-2026-05-29T152821634.png" },
  { name: "Google Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/77c3c7b74_Untitleddesign-2026-05-29T153409951.png" },
  { name: "TikTok Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/78d50c267_logos1.png" },
  { name: "Shopify", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/a52e929bd_logos2.png" },
  { name: "LinkedIn Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/811fd1e37_logos.png" },
  { name: "Apple Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/f5b0265b5_Untitleddesign-2026-05-29T153159952.png" },
  { name: "Google Analytics 4", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/1557e7da2_logos3.png" },
  { name: "Orbit", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/f9438ebe6_Untitleddesign-2026-05-29T153256805.png" },
];

export default function PlatformMarquee() {
  const doubled = [...platforms, ...platforms, ...platforms, ...platforms];

  return (
    <div className="bg-white border-y border-gray-100 py-4 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <div key={i} className="flex items-center gap-10 px-10">
            <img src={p.logo} alt={p.name} className="h-16 w-auto object-contain" style={{ maxWidth: '320px' }} />
            <span className="text-[#D0D0D0] text-2xl">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}