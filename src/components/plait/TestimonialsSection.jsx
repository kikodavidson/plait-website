import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";

const videoTestimonials = [
  {
    id: 1,
    name: "Brett S.",
    role: "Founder, Ivy Dating",
    thumbnail: "https://img.youtube.com/vi/tNLtESXCu88/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/tNLtESXCu88?autoplay=1",
    preview: "He's blown up my business and handled the areas that I haven't been too sure about.",
  },
  {
    id: 2,
    name: "Hudson G.",
    role: "Founder, HG Training",
    thumbnail: "https://img.youtube.com/vi/8OaMt_uDJmQ/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/8OaMt_uDJmQ?autoplay=1",
    preview: "The revenue that started coming in after Luke started helping with my marketing was unbelievable.",
  },
];

const writtenTestimonial = {
  quote: "At BluRevive we are prioneering wellness in 2026 and needed our Strategy Lead to have the right amount of Marketing knowledge combined with quickly evolving AI and social media integration and we've been blessed to have Luke at Plait meld it all together. ",
  name: "Keith W.",
  role: "CEO, BluRevive",
};

function VideoCard({ t, index, featured }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative rounded-3xl overflow-hidden shadow-xl aspect-video"
    >
      {playing ? (
        <iframe
          src={t.embedUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={t.name}
        />
      ) : (
        <>
          <img src={t.thumbnail} alt={t.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:border-[#0A0A0A] transition-all shadow-xl">
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            </div>
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">{t.role}</p>
            <p className="text-white font-bold text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>{t.name}</p>
            <p className="text-white/70 text-sm mt-1 leading-relaxed line-clamp-2">"{t.preview}"</p>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-28 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-3">Testimonials</p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Don't take my word for it.
          </h2>
        </motion.div>

        {/* Stacked / dynamic layout: 2 videos + 1 quote card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Left video — larger */}
          <div className="lg:col-span-3">
            <VideoCard t={videoTestimonials[0]} index={0} featured />
          </div>

          {/* Right column — smaller video + written quote stacked */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <VideoCard t={videoTestimonials[1]} index={1} />

            {/* Written testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-[#4F46E5] rounded-3xl p-8 flex flex-col justify-between flex-1"
            >
              <Quote className="w-8 h-8 text-indigo-300 mb-4" />
              <p className="text-white text-base font-medium leading-relaxed flex-1 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                "{writtenTestimonial.quote}"
              </p>
              <div>
                <p className="text-white font-extrabold text-sm">{writtenTestimonial.name}</p>
                <p className="text-indigo-200 text-xs font-semibold">{writtenTestimonial.role}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}