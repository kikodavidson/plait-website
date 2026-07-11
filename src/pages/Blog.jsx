import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Loader2, Clock, ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";

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

  const filtered = posts.filter((p) => activeCategory === "All" || p.category === activeCategory);
  const sorted = [...filtered].sort((a, b) => {
    const da = new Date(a.published_date || a.created_date || 0).getTime();
    const db = new Date(b.published_date || b.created_date || 0).getTime();
    return sortBy === "-published_date" ? db - da : da - db;
  });

  const fmtDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="pt-28 pb-24 relative">
      {/* Fixed full-viewport background image — replace URL with your own */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        }}
      />

      {/* Featured hero post */}
      {featured && (
        <div className="px-6 mb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/blog/${featured.slug}`} className="group block relative overflow-hidden rounded-3xl">
                <div className="relative aspect-[21/9] sm:aspect-[2.4/1]">
                  <img
                    src={featured.featured_image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  {featured.category && (
                    <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                      {featured.category}
                    </span>
                  )}
                  <h1 className="font-body text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 max-w-2xl">
                    {featured.title}
                  </h1>
                  <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-white/90 text-xs sm:text-sm">
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
            </motion.div>
          </div>
        </div>
      )}

      {/* Blog grid section */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-body text-4xl sm:text-5xl font-bold text-[#2d2d2d] tracking-tight mb-3">
            Blog
          </h2>
          <p className="text-[#525252] text-lg max-w-2xl leading-relaxed">
            Growth strategies, attribution insights, and playbooks from the front lines of performance marketing.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                  activeCategory === cat
                    ? "bg-[#2d2d2d] text-white"
                    : "bg-gray-100 text-[#525252] hover:bg-gray-200"
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
              className="text-sm font-semibold text-[#2d2d2d] bg-gray-100 rounded-full px-4 py-2 border-0 focus:outline-none cursor-pointer"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}