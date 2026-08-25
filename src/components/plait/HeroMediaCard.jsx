import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedTiles } from "@/components/ui/animated-tiles";

// Default media — swap these out or pass a `media` array to use your own
// images/videos. Each item: { type: 'image' | 'video', src, caption, sub }
const DEFAULT_MEDIA = [
{
  type: "image",
  src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1260&h=1260&q=80",
  caption: "Attribution",
  sub: "Know where every sale comes from"
},
{
  type: "image",
  src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1260&h=1260&q=80",
  caption: "Analytics",
  sub: "Decisions, not guesses"
},
{
  type: "image",
  src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1260&h=1260&q=80",
  caption: "Creative",
  sub: "Ads that earn attention"
}];


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
        WebkitMask: mask
      }} />);


}

export default function HeroMediaCard({
  media = DEFAULT_MEDIA,
  interval = 5000,
  className = ""
}) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (media.length <= 1) return;
    const t = setInterval(() => {
      setTransitioning(true);
      setIndex((i) => (i + 1) % media.length);
    }, interval);
    return () => clearInterval(t);
  }, [media.length, interval]);

  // Safety: never leave the transition overlay stuck on.
  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => setTransitioning(false), 1600);
    return () => clearTimeout(t);
  }, [transitioning, index]);

  const current = media[index % media.length];
  const canTile = current.type === "image" && !!current.src;

  return null;









































































}