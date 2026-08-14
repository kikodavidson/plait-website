import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function MultiSelect({ options, value = [], onChange, placeholder = "Select…" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (opt) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };

  const label = value.length ? `${value.length} selected` : placeholder;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-9 rounded-md border border-gray-200 bg-white px-2 text-xs text-left flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
      >
        <span className={value.length ? "text-[#2d2d2d]" : "text-gray-400"}>{label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full max-h-56 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg py-1">
          {options.map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => toggle(o)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs hover:bg-gray-50"
            >
              <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center shrink-0">
                {value.includes(o) && <Check className="w-3 h-3 text-[#2d2d2d]" />}
              </span>
              <span className="text-[#2d2d2d]">{o}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}