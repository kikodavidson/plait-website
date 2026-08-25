import React from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const FEATURED = {
  company: "Extern",
  tags: "SAAS / 90% REDUCTION IN CAC",
  title: "How we cut CAC for a SaaS platform.",
  subtitle: "Targeting one of the hardest audiences in paid media — broke college students.",
  image: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/244f33ae3_TestimonialBanners2.png",
  link: "/case-studies",
};

const SECONDARY = [
  {
    company: "Krýo",
    tags: "HEALTH / HIGH TICKET D2C",
    title: "Selling a $4,000 ice plunge takes more than good ads.",
    subtitle: "Here's what it takes to make ads work for a high ticket item.",
    link: "/case-studies",
  },
  {
    company: "Airia",
    tags: "SAAS / BRAND AWARENESS",
    title: "Building awareness for revolutionary AI Agentic Modeling software.",
    subtitle: "30M+ impressions in two months.",
    link: "/case-studies",
  },
  {
    company: "Tsunami Bar Sports",
    tags: "SPORTS EQUIPMENT / D2C",
    title: "We increased sales by 500%+ in 6 months.",
    subtitle: "At a consistent 5-15x ROAS.",
    link: "/case-studies",
  },
  {
    company: "Ivy Dating",
    tags: "APP / D2C",
    title: "How we doubled the number of users over two months.",
    subtitle: "205% increase in app downloads.",
    link: "/case-studies",
  },
  {
    company: "HG Training",
    tags: "COACHING / LEAD GEN",
    title: "Finding qualified leads in a market most advertisers would ignore.",
    subtitle: "$8 cost per lead at 12.4x blended ROAS.",
    link: "/case-studies",
  },
];

const DOTTED = "hidden w-28 shrink-0 bg-[radial-gradient(#00000022_1px,transparent_1px)] [background-size:10px_10px] opacity-15 xl:block";

export default function CaseStudySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 max-w-xl">
          <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-3">Proof</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] leading-tight font-body text-balance">
            Results that speak for themselves.
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
          {/* Featured */}
          <Link
            to={FEATURED.link}
            className="group grid gap-4 overflow-hidden px-6 transition-colors duration-500 ease-out hover:bg-[#F8F7FF] lg:grid-cols-2 xl:px-14"
          >
            <div className="flex flex-col justify-between gap-4 pt-8 md:pt-12 lg:pb-12">
              <div className="text-2xl font-semibold text-[#2d2d2d]">
                {FEATURED.company}
              </div>
              <div>
                <span className="text-xs text-[#525252] sm:text-sm tracking-wider">
                  {FEATURED.tags}
                </span>
                <h3 className="mt-4 mb-5 text-2xl font-semibold text-balance sm:text-3xl sm:leading-10 text-[#2d2d2d]">
                  {FEATURED.title}
                  <span className="font-medium text-[#4B87E7]/60 transition-colors duration-500 ease-out group-hover:text-[#4B87E7]">
                    {" "}{FEATURED.subtitle}
                  </span>
                </h3>
                <div className="flex items-center gap-2 font-medium text-[#2d2d2d]">
                  Read case study
                  <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            <div className="relative isolate py-12">
              <div className="relative isolate h-full border border-gray-200 bg-background p-2 rounded-lg">
                <div className="h-full overflow-hidden rounded-md">
                  <img
                    src={FEATURED.image}
                    alt={FEATURED.company}
                    className="aspect-[14/9] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary grid */}
          <div className="flex border-t border-gray-200">
            <div className={DOTTED} />
            <div className="grid lg:grid-cols-2 flex-1">
              {SECONDARY.map((item, idx) => (
                <Link
                  key={item.company}
                  to={item.link}
                  className={`group flex flex-col justify-between gap-10 border-gray-200 bg-white px-6 py-8 transition-colors duration-500 ease-out hover:bg-[#F8F7FF] md:py-12 lg:pb-12 ${
                    idx === 0
                      ? "border-t lg:border-t-0 lg:border-l"
                      : idx % 2 === 0
                        ? "border-t lg:border-t-0 lg:border-l"
                        : "border-t lg:border-l lg:border-t-0"
                  }`}
                >
                  <div className="text-xl font-semibold text-[#2d2d2d]">
                    {item.company}
                  </div>
                  <div>
                    <span className="text-xs text-[#525252] sm:text-sm tracking-wider">
                      {item.tags}
                    </span>
                    <h3 className="mt-4 mb-5 text-xl font-semibold text-balance sm:text-2xl leading-9 text-[#2d2d2d]">
                      {item.title}
                      <span className="font-medium text-[#4B87E7]/60 transition-colors duration-500 ease-out group-hover:text-[#4B87E7]">
                        {" "}{item.subtitle}
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 font-medium text-[#2d2d2d]">
                      Read case study
                      <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className={DOTTED} />
          </div>
        </div>
      </div>
    </section>
  );
}