import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Default media — swap these out or pass a `media` array to use your own
// images/videos. Each item: { type: 'image' | 'video', src, caption, sub }
const DEFAULT_MEDIA = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1260&h=1260&q=80",
    caption: "Attribution",
    sub: "Know where every sale comes from",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1260&h=1260&q=80",
    caption: "Analytics",
    sub: "Decisions, not guesses",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1260&h=1260&q=80",
    caption: "Creative",
    sub: "Ads that earn attention",
  },
];

function ProgressiveBlur({ className = "", blurIntensity = 8 }) {
  const mask =
    "linear-gradient(to top, black 0%, black 60%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.1) 95%, transparent 100%)";
  return (
    <div
      className={cn(className)}
      style={{
        backdropFilter: `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
        mask,
        WebkitMask: mask,
      }}
    />
  );
}

export default function HeroMediaCard({
  media = DEFAULT_MEDIA,
  interval = 5000,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (media.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % media.length), interval);
    return () => clearInterval(t);
  }, [media.length, interval]);

  const current = media[index % media.length];

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[420px] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] border-8 border-white overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02]",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {current.type === "video" ? (
            <video
              src={current.src}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={current.src}
              alt={current.caption}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <ProgressiveBlur
        className="pointer-events-none absolute bottom-0 left-0 h-[45%] w-full"
        blurIntensity={8}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-end justify-between px-6 py-6 group">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-white">{current.caption}</h2>
            <p className="text-sm text-white/90">{current.sub}</p>
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-white shadow-lg ring-1 ring-black/5 flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95"
          >
            <ArrowRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>

      {media.length > 1 && (
        <div className="absolute top-4 right-4 flex gap-1.5 z-10">
          {media.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}