import { useState } from "react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const BAND_ONE = [
  {
    eyebrow: "Insight",
    title: "Verified Buyer Motives",
    description: "We map the real reasons your customers buy so every message hits the nerve that converts.",
    img: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/cd110776e_image.png",
  },
  {
    eyebrow: "Efficiency",
    title: "Higher Ad Efficiency",
    description: "More revenue from the same spend through tighter targeting, creative, and bidding.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "Library",
    title: "Swipe File Warehouse",
    description: "A living library of proven ads and angles that fuels nonstop content ideation.",
    img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "Structure",
    title: "Optimal Account Architecture",
    description: "Campaign, ad set, and audience structures built to scale without waste.",
    img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "Lifecycle",
    title: "Automated Nurture & Retention",
    description: "Email and lifecycle sequences that turn one-time buyers into repeat revenue.",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea14c?auto=format&fit=crop&w=1200&q=80",
  },
];

const BAND_TWO = [
  {
    eyebrow: "Data",
    title: "Clean Data Tracking",
    description: "Server-side tracking and naming conventions so every number is one you can trust.",
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "Visibility",
    title: "Custom KPI Dashboard",
    description: "One live view of spend, revenue, and margin — no more tab-hopping between platforms.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "Positioning",
    title: "Defined Market Advantages",
    description: "Sharp positioning that makes you the obvious choice in a crowded category.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "Conversion",
    title: "Optimized Checkout Flows",
    description: "Checkout, upsell, and post-purchase flows tuned to squeeze out lost revenue.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "Content",
    title: "Managed Content Pipelines",
    description: "A steady production line of creative so campaigns never go hungry.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  },
];

function Band({ cards }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
      <BentoCard {...cards[0]} className="lg:col-span-3" />
      <BentoCard {...cards[1]} className="lg:col-span-3" />
      <BentoCard {...cards[2]} className="lg:col-span-2" />
      <BentoCard {...cards[3]} className="lg:col-span-2" />
      <BentoCard {...cards[4]} className="lg:col-span-2" />
    </div>
  );
}

export default function FUIBentoGridDark() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-white py-16 px-6 md:px-10 container mx-auto flex flex-col">
      <h1
        className="tracking-tight text-3xl md:text-5xl text-black"
        style={{ background: "none", WebkitTextFillColor: "currentcolor" }}
      >
        What you get.
      </h1>
      <p className="max-w-3xl text-xl md:text-2xl font-medium tracking-tight mt-2 text-gray-500">
        Everything included when you partner with our team.
      </p>

      <div className="mt-10 sm:mt-16">
        <Band cards={BAND_ONE} />
      </div>

      <div
        className={clsx(
          "relative mt-4 overflow-hidden transition-[max-height] duration-700 ease-in-out",
          expanded ? "max-h-none" : "max-h-[380px]"
        )}
      >
        <Band cards={BAND_TWO} />

        <AnimatePresence>
          {!expanded && (
            <motion.div
              key="reveal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.75) 75%, #ffffff 92%)",
              }}
            />
          )}
        </AnimatePresence>

        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="absolute inset-x-0 bottom-8 z-10 mx-auto w-64 bg-black text-white uppercase tracking-[0.35em] font-bold text-xs py-2 hover:bg-gray-900 transition-colors"
          >
            Show more
          </button>
        )}
      </div>

      {expanded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => setExpanded(false)}
          className="mt-4 mx-auto block bg-black text-white uppercase tracking-[0.35em] font-bold text-xs py-2 w-64 hover:bg-gray-900 transition-colors"
        >
          Show less
        </motion.button>
      )}
    </div>
  );
}

export function BentoCard({ className = "", eyebrow, title, description, img }) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-black shadow-sm ring-1 ring-white/10 transform-gpu"
      )}
    >
      <div className="relative h-[29rem] shrink-0">
        <img
          src={img}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="relative p-10 z-20 isolate mt-[-110px] h-[14rem] backdrop-blur-xl text-white">
        <span className="text-xs uppercase tracking-[0.35em] text-white/60">
          {eyebrow}
        </span>
        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}