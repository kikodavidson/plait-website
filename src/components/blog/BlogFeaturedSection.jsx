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
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-body text-2xl sm:text-3xl font-bold text-[#2d2d2d] tracking-tight">
          Plait Industry Insights
        </h2>
        <a
          href="#blog-list"
          className="text-sm font-semibold text-[#525252] hover:text-[#2d2d2d] transition-colors flex items-center gap-1 whitespace-nowrap"
        >
          see all posts <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* 3-post layout: large left card + 2 stacked right cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left large featured card */}
        <Link
          to={`/blog/${featured.slug}`}
          className="lg:col-span-2 group relative block overflow-hidden rounded-xl min-h-[280px] lg:min-h-[440px]"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
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

        {/* Right stacked cards */}
        <div className="flex flex-col gap-4">
          {post2 && (
            <Link
              to={`/blog/${post2.slug}`}
              className="group relative block overflow-hidden rounded-xl flex-1 min-h-[200px] lg:min-h-[212px]"
            >
              {post2.featured_image ? (
                <img
                  src={post2.featured_image}
                  alt={post2.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-[#1a1a1a]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {post2.category && (
                  <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 mb-2 rounded-full">
                    {post2.category}
                  </span>
                )}
                <h4 className="font-body text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                  {post2.title}
                </h4>
              </div>
            </Link>
          )}
          {post3 && (
            <Link
              to={`/blog/${post3.slug}`}
              className="group relative block overflow-hidden rounded-xl flex-1 min-h-[200px] lg:min-h-[212px]"
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