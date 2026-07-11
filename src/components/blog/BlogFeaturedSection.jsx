import React from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";

const fmtDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function BlogFeaturedSection({ featured, secondaryPosts = [] }) {
  if (!featured) return null;
  const [post2, post3] = secondaryPosts;

  return (
    <div className="p-6 sm:p-8">
      {/* Title row */}
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-body text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight leading-none">
          Plait Industry Insights
        </h2>
        <a
          href="#blog-list"
          className="text-sm font-semibold text-[#525252] hover:text-[#2d2d2d] transition-colors flex items-center gap-1 whitespace-nowrap mb-1"
        >
          See all posts <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* 3-post layout: large left card + 2 stacked right cards, equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[460px]">
        {/* Left large featured card */}
        <Link
          to={`/blog/${featured.slug}`}
          className="lg:col-span-2 group relative block overflow-hidden rounded-xl h-[300px] lg:h-full"
        >
          {featured.featured_image ? (
            <img
              src={featured.featured_image}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            {featured.category && (
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 mb-4 rounded-full">
                {featured.category}
              </span>
            )}
            <h3 className="font-body text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-2 max-w-xl">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="text-white/70 text-sm max-w-lg leading-relaxed mb-4 line-clamp-2 hidden sm:block">
                {featured.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 text-white/80 text-xs">
              <span className="font-semibold">{featured.author || "PLAIT Team"}</span>
              <span>•</span>
              <span>{fmtDate(featured.published_date)}</span>
              {featured.read_time && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.read_time} min read
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>

        {/* Right stacked cards — top CTA card (shorter) + bottom image card (taller) */}
        <div className="flex flex-col gap-4 h-[300px] lg:h-full">
          {/* Top right — black CTA card */}
          <Link
            to="/book"
            className="group relative block overflow-hidden rounded-xl bg-[#0a0a0a] flex-[2] min-h-0"
          >
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <div>
                <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-2.5 py-1 mb-3 rounded-full">
                  CTA
                </span>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">
                  Book a free audit
                </p>
                <h4 className="font-body text-base sm:text-lg font-bold text-white leading-snug">
                  Want to see exactly where your funnel is leaking revenue?
                </h4>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
          {/* Bottom right — image card (taller) */}
          {post3 && (
            <Link
              to={`/blog/${post3.slug}`}
              className="group relative block overflow-hidden rounded-xl flex-[3] min-h-0"
            >
              {post3.featured_image ? (
                <img
                  src={post3.featured_image}
                  alt={post3.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-[#1a1a1a]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {post3.category && (
                  <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 mb-2 rounded-full">
                    {post3.category}
                  </span>
                )}
                <h4 className="font-body text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                  {post3.title}
                </h4>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}