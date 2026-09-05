import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  Calendar,
  Coffee,
  Heart,
  Leaf,
  MapPin,
  MoreHorizontal,
  Plane,
  ShoppingBag,
  ShoppingCart,
  User,
  BarChart3,
} from "lucide-react";

const PERSONA_IMG =
  "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/a02611c62_Screenshot2026-09-04at111803PM.png";

function Ring({ percent, color, label }) {
  const r = 15.5;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r={r} fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - percent / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-black">
          {percent}%
        </span>
      </div>
      <span className="text-[10px] text-gray-500">{label}</span>
    </div>
  );
}

function CardHeader({ icon: Icon, label, iconColor }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        <Icon size={12} style={{ color: iconColor }} />
        <span className="text-[11px] font-bold text-black">{label}</span>
      </div>
      <MoreHorizontal size={12} className="text-gray-400" />
    </div>
  );
}

const INTERESTS = [
  { label: "Fashion", icon: ShoppingBag, color: "#FF7D8D" },
  { label: "Coffee", icon: Coffee, color: "#8B5E3C" },
  { label: "Wellness", icon: Leaf, color: "#4CAF50" },
  { label: "Online Shopping", icon: ShoppingCart, color: "#7C5CFF" },
  { label: "Travel", icon: Plane, color: "#418CFF" },
  { label: "Small Business", icon: BarChart3, color: "#2FA36B" },
];

export default function BuyerPersonaCard({ className = "" }) {
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
          src={PERSONA_IMG}
          alt="Verified buyer persona"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-between gap-3 p-4 pb-[130px]">
          <div className="flex items-start justify-between gap-3">
            <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2.5">
              <img
                src={PERSONA_IMG}
                alt="Sarah Johnson"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="pr-2">
                <p className="text-xs font-bold text-black leading-tight">Sarah Johnson</p>
                <p className="text-[10px] text-gray-500">Boutique owner</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-3 w-[52%]">
              <CardHeader icon={Heart} label="Interests" iconColor="#FF7D8D" />
              <div className="grid grid-cols-2 gap-1.5">
                {INTERESTS.map(({ label, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1"
                  >
                    <Icon size={9} style={{ color }} />
                    <span className="text-[9px] text-black truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="bg-white rounded-2xl shadow-lg p-3 w-[40%]">
              <CardHeader icon={User} label="Customer Profile" iconColor="#418CFF" />
              <ul className="space-y-1.5">
                {[
                  { icon: Calendar, text: "Age: 28–34" },
                  { icon: User, text: "Gender: Female" },
                  { icon: MapPin, text: "Location: Urban / Suburban" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-1.5">
                    <Icon size={10} className="text-[#418CFF] shrink-0" />
                    <span className="text-[10px] text-black">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-3 w-[38%]">
              <CardHeader icon={BarChart3} label="Audience Insights" iconColor="#418CFF" />
              <div className="flex justify-around">
                <Ring percent={68} color="#FF7D8D" label="Female" />
                <Ring percent={72} color="#418CFF" label="Age 28–34" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-10 z-20 isolate mt-[-110px] h-[14rem] backdrop-blur-xl text-white">
        <span className="text-xs uppercase tracking-[0.35em] text-white/60">Insight</span>
        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-white">
          Verified Buyer Motives
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-300">
          We map the real reasons your customers buy so every message hits the nerve
          that converts.
        </p>
      </div>
    </motion.div>
  );
}