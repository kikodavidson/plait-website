import React from "react";

const platforms = [
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png" },
  { name: "TikTok", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/200px-TikTok_logo.svg.png" },
  { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/200px-LinkedIn_Logo.svg.png" },
  { name: "Pinterest", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pinterest_Logo.svg/200px-Pinterest_Logo.svg.png" },
  { name: "Reddit", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Reddit_logo_new.svg/200px-Reddit_logo_new.svg.png" },
  { name: "Snapchat", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Snapchat_logo.svg/200px-Snapchat_logo.svg.png" },
  { name: "X", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/200px-X_icon_2.svg.png" },
];

export default function PlatformMarquee() {
  const doubled = [...platforms, ...platforms, ...platforms, ...platforms];

  return (
    <div className="bg-white border-y border-gray-100 py-5 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <img src={p.logo} alt={p.name} className="h-5 w-auto object-contain opacity-40 grayscale" />
            <span className="text-[#D0D0D0] text-lg">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}