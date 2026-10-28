import React, { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

/** Pick readable ink for a hex background. */
function inkFor(hex) {
  const h = (hex || "").replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#1a1a1a" : "#ffffff";
}

/** One canvas card: keyword, color swatch, or image. Each has a visible remove button. */
export default function ElementCard({ element, onDelete }) {
  const { toast } = useToast();
  const [broken, setBroken] = useState(false);

  const copyHex = async () => {
    try {
      await navigator.clipboard.writeText(element.value.toUpperCase());
      toast({ description: `${element.value.toUpperCase()} copied to clipboard` });
    } catch (e) {
      toast({
        description: "Couldn't access the clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] transition-colors hover:border-[#3d3d3d]">
      <button
        onClick={() => onDelete(element.id)}
        aria-label="Remove element"
        className="absolute right-2 top-2 z-10 rounded-md bg-black/70 p-1.5 text-white/80 transition-colors hover:bg-black hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {element.type === "text" && (
        <div className="flex min-h-[120px] items-center justify-center px-6 py-8">
          <span className="text-center text-[24px] font-bold leading-tight tracking-tight text-white">
            {element.value}
          </span>
        </div>
      )}

      {element.type === "color" && (
        <div role="button" tabIndex={0} onClick={copyHex} onKeyDown={(e) => e.key === "Enter" && copyHex()} className="cursor-pointer text-left">
          <div className="flex h-28 items-end justify-end p-2" style={{ backgroundColor: element.value }}>
            <span
              className="rounded-md bg-black/20 px-2 py-0.5 font-mono text-[11px] font-semibold"
              style={{ color: inkFor(element.value) }}
            >
              {element.value.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[13.5px] font-medium text-white">{element.label || "Untitled"}</span>
            <span className="text-[11px] text-[#9a9a9a]">Click to copy</span>
          </div>
        </div>
      )}

      {element.type === "image" &&
        (broken ? (
          <div className="flex aspect-[4/3] items-center justify-center bg-[#161616] px-4 text-center text-[12.5px] text-[#9a9a9a]">
            Couldn't load this image
          </div>
        ) : (
          <img
            src={element.value}
            alt={element.label || "Board image"}
            onError={() => setBroken(true)}
            className="aspect-[4/3] w-full object-cover"
          />
        ))}
    </div>
  );
}