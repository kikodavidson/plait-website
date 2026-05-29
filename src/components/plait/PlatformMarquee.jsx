import React from "react";

const platforms = ["Meta", "Google", "TikTok", "LinkedIn", "Pinterest", "Reddit", "Snapchat", "X (Twitter)"];

export default function PlatformMarquee() {
  const doubled = [...platforms, ...platforms, ...platforms, ...platforms];

  return (
    <div className="bg-white border-y border-gray-100 py-5 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="text-sm font-semibold text-[#A0A0A0] uppercase tracking-widest whitespace-nowrap">{p}</span>
            <span className="text-[#D0D0D0] text-lg">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}