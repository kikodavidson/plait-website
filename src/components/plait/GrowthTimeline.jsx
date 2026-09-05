import { Search, Map, Rocket, RefreshCw, BarChart3 } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Audit",
    date: "1-3 DAYS",
    content:
      "We dig into your accounts, attribution, funnel, and creative. Find the leaks before we start spending.",
    category: "Audit",
    icon: Search,
    relatedIds: [2],
    status: "pending",
    statusLabel: "START NOW",
    energy: 100,
  },
  {
    id: 2,
    title: "Strategize",
    date: "2-5 DAYS",
    content:
      "Build the roadmap. Channels, offers, messaging hierarchy, creative angles, and testing priorities.",
    category: "Strategy",
    icon: Map,
    relatedIds: [1, 3],
    status: "pending",
    energy: 85,
  },
  {
    id: 3,
    title: "Execute",
    date: "1-3 WEEKS",
    content:
      "Launch campaigns, build pages, set up tracking. Everything goes live with intention, not hope.",
    category: "Launch",
    icon: Rocket,
    relatedIds: [2, 4],
    status: "pending",
    energy: 65,
  },
  {
    id: 4,
    title: "Optimize",
    date: "VARIES BY SPEND",
    content:
      "Iterate fast. Kill what's not working, double down on what is. Data driven decisions, weekly.",
    category: "Optimize",
    icon: RefreshCw,
    relatedIds: [3, 5],
    status: "pending",
    energy: 45,
  },
  {
    id: 5,
    title: "Scale",
    date: "AFTER STAGE 4",
    content:
      "When the unit economics work, we push the throttle. Controlled, profitable, sustainable growth.",
    category: "Scale",
    icon: BarChart3,
    relatedIds: [4],
    status: "pending",
    energy: 30,
  },
];

export default function GrowthTimeline() {
  return (
    <section className="relative bg-black">
      <div className="absolute top-12 left-6 sm:left-12 z-[400] pointer-events-none">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
          The Roadmap for Growth
        </p>
        <h2 className="hero-headline text-3xl sm:text-4xl font-bold text-white">
          How we work together.
        </h2>
      </div>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </section>
  );
}