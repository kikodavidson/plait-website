import { clsx } from "clsx";
import { motion } from "framer-motion";

export default function FUIBentoGridDark() {
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
      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Insight"
          title="Verified Buyer Motives"
          description="We map the real reasons your customers buy so every message hits the nerve that converts."
          graphic={
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
              alt="Marketing analytics"
              className="absolute inset-0 h-full w-full object-cover"
            />
          }
          className="lg:col-span-3"
        />
        <BentoCard
          eyebrow="Efficiency"
          title="Higher Ad Efficiency"
          description="More revenue from the same spend through tighter targeting, creative, and bidding."
          graphic={
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
              alt="Growth dashboard"
              className="absolute inset-0 h-full w-full object-cover"
            />
          }
          className="lg:col-span-3"
        />
        <BentoCard
          eyebrow="Library"
          title="Swipe File Warehouse"
          description="A living library of proven ads and angles that fuels nonstop content ideation."
          graphic={
            <img
              src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80"
              alt="Data and code"
              className="absolute inset-0 h-full w-full object-cover"
            />
          }
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Structure"
          title="Optimal Account Architecture"
          description="Campaign, ad set, and audience structures built to scale without waste."
          graphic={
            <img
              src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80"
              alt="Charts and graphs"
              className="absolute inset-0 h-full w-full object-cover"
            />
          }
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Lifecycle"
          title="Automated Nurture & Retention"
          description="Email and lifecycle sequences that turn one-time buyers into repeat revenue."
          graphic={
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea14c?auto=format&fit=crop&w=1200&q=80"
              alt="Team reviewing performance"
              className="absolute inset-0 h-full w-full object-cover"
            />
          }
          className="lg:col-span-2"
        />
      </div>
    </div>
  );
}

export function BentoCard({ className = "", eyebrow, title, description, graphic }) {
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
      <div className="relative h-[29rem] shrink-0">{graphic}</div>
      <div className="relative p-10 z-20 isolate mt-[-110px] h-[14rem] backdrop-blur-xl text-white">
        <span className="text-xs uppercase tracking-[0.35em] text-white/60">
          {eyebrow}
        </span>
        <p className="mt-1 text-2xl font-medium tracking-tight text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}