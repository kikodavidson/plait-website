import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Loader2, ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import BlogFeaturedSection from "@/components/blog/BlogFeaturedSection";

const CATEGORIES = ["All", "Growth", "Analytics", "Paid Media", "Conversion", "Strategy", "Case Studies"];

const SORTS = [
  { label: "Newest", value: "-published_date" },
  { label: "Oldest", value: "published_date" },
];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("-published_date");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all = await base44.entities.BlogPost.list("-published_date", 100);
        const published = all.filter((p) => p.status === "published" || !p.status);
        const feat = published.find((p) => p.is_featured) || published[0] || null;
        setFeatured(feat);
        setPosts(feat ? published.filter((p) => p.id !== feat.id) : published);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, []);

  const secondaryPosts = posts.slice(0, 2);
  const secondaryIds = new Set(secondaryPosts.map((p) => p.id));
  const filtered = posts.filter((p) => !secondaryIds.has(p.id) && (activeCategory === "All" || p.category === activeCategory));
  const sorted = [...filtered].sort((a, b) => {
    const da = new Date(a.published_date || a.created_date || 0).getTime();
    const db = new Date(b.published_date || b.created_date || 0).getTime();
    return sortBy === "-published_date" ? db - da : da - db;
  });

  return (
    <div className="pt-40 pb-24 relative">
      {/* Local color boost — brightens the animated hues on this page */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(90,150,255,0.48), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(244,100,170,0.42), transparent 60%), radial-gradient(ellipse 50% 40% at 60% 50%, rgba(80,220,190,0.38), transparent 60%)",
        }}
      />

      {/* Coming Soon badge — overlays entire blog container */}
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 bg-[#2d2d2d] text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-lg">
          Coming Soon
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl overflow-hidden"
        >
          {/* Header — inside white container, semi-transparent for muted glass effect */}
          <div className="p-6 sm:p-8 pb-0">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-body text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight leading-none mb-3">
                  Plait Industry Insights
                </h2>
                <p className="text-[#525252] text-base sm:text-lg max-w-2xl leading-relaxed">
                  Real-world insights from the front lines of marketing.
                </p>
              </div>
              <a
                href="#blog-list"
                className="text-sm font-semibold text-[#525252]/30 hover:text-[#2d2d2d] transition-colors flex items-center gap-1 whitespace-nowrap mb-1"
              >
                See all posts <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Plait Industry Insights — staggered 3-post featured layout */}
          <BlogFeaturedSection featured={featured} secondaryPosts={secondaryPosts} />

          {/* Blog section — flush below hero */}
          <div id="blog-list" className="p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="font-body text-2xl sm:text-3xl font-bold text-[#2d2d2d] tracking-tight mb-2">
                Blog
              </h2>
              <p className="text-[#525252] text-base max-w-2xl leading-relaxed">
                Growth strategies, attribution insights, and playbooks from the front lines of performance marketing.
              </p>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm font-semibold transition-colors ${
                      activeCategory === cat
                        ? "text-[#2d2d2d] underline underline-offset-4"
                        : "text-gray-400 hover:text-[#2d2d2d]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#525252] font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-semibold text-[#2d2d2d] bg-gray-100 px-4 py-2 border-0 focus:outline-none cursor-pointer"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-[#2d2d2d]" />
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#525252]">No posts in this category yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}