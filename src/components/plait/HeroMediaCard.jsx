import React from "react";
import { cn } from "@/lib/utils";

const IMAGE =
  "https://cdn.prod.website-files.com/6573df751dbab4bb0aac132c/69e121cedcd40a751260f0a9_2a2d4db04953177aef2fde1925614ade22f70a84.png";

export default function HeroMediaCard({ className = "" }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-2xl",
        className
      )}
    >
      <img
        src={IMAGE}
        alt="Two people sitting on a bench looking at their phones"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}