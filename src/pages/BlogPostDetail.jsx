import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Loader2, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all = await base44.entities.BlogPost.list("-published_date", 100);
        const found = all.find((p) => p.slug === slug);
        setPost(found || null);
        setAllPosts(all.filter((p) => p.status === "published" || !p.status));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  const fmtDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#2d2d2d] mt-20" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-28 min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-body text-3xl font-bold text-[#2d2d2d] mb-4">Post not found</h1>
        <Link to="/blog" className="btn-gradient inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <div className="pt-40 pb-24">
      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#525252] hover:text-[#2d2d2d] mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <h1 className="font-body text-3xl sm:text-5xl font-bold text-[#2d2d2d] leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-[#525252] text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-sm text-[#525252] mb-8">
            <span className="font-semibold text-[#2d2d2d]">{post.author || "PLAIT Team"}</span>
            <span>•</span>
            <span>{fmtDate(post.published_date)}</span>
            {post.read_time && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.read_time} min read
                </span>
              </>
            )}
          </div>

          {post.category && (
            <span className="inline-block bg-black/5 text-[#2d2d2d] text-xs font-semibold px-4 py-2 rounded-full mb-6">
              {post.category}
            </span>
          )}

          {post.featured_image && (
            <div className="relative overflow-hidden rounded-3xl mb-10 aspect-[16/9]">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <ReactMarkdown className="text-[#2d2d2d] leading-relaxed space-y-4 [&_h2]:font-body [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-[#2d2d2d] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-[#525252] [&_a]:text-indigo-600 [&_a]:underline [&_ul]:text-[#525252] [&_ol]:text-[#525252] [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#525252]">
            {post.content || post.excerpt || ""}
          </ReactMarkdown>
        </motion.div>

        {/* CTA */}
        <div className="mt-12 bg-[#F8F7FF] border border-indigo-100 rounded-3xl p-8 text-center">
          <h3 className="font-body text-xl font-bold text-[#2d2d2d] mb-2">Want a free funnel audit?</h3>
          <p className="text-sm text-[#525252] mb-5">Book a 30-minute strategy call. No pitch, just an honest look at your funnel.</p>
          <Link to="/book" className="btn-hero-gradient inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full">
            Book a Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-body text-2xl font-bold text-[#2d2d2d] mb-6">Related posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl mb-3 aspect-[16/10]">
                    <img src={rp.featured_image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-body text-sm font-bold text-[#2d2d2d] leading-snug group-hover:text-indigo-600 transition-colors">
                    {rp.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}