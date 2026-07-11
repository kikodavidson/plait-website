import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function BlogCard({ post, index = 0 }) {
  const fmtDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/10]">
          {post.featured_image ? (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-300 text-sm">No image</span>
            </div>
          )}
          {post.category && (
            <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {post.category}
            </span>
          )}
        </div>
        <h3 className="font-body text-lg font-bold text-[#2d2d2d] leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-[#525252] leading-relaxed mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-[#525252]">
          <span className="font-semibold">{post.author || "PLAIT Team"}</span>
          <span>•</span>
          <span>{fmtDate(post.published_date)}</span>
          {post.read_time && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.read_time} min read
              </span>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}