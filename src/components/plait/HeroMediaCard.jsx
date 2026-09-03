import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedTiles } from "@/components/ui/animated-tiles";

const IMAGE =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1260&h=1260&q=80";

export default function HeroMediaCard({ className = "" }) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[420px]", className)}>
      <AnimatedTiles imageUrl={IMAGE} />
    </div>
  );
}