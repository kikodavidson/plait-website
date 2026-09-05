import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const cards = [
  {
    title: "Verified Buyer Motives",
    description:
      "We map the real reasons your customers buy so every message hits the nerve that converts.",
  },
  {
    title: "Defined Market Advantages",
    description:
      "Sharp positioning that separates you from competitors and makes the choice obvious.",
  },
  {
    title: "Higher Ad Efficiency",
    description:
      "More revenue from the same spend through tighter targeting, creative, and bidding.",
  },
  {
    title: "Optimal Account Architecture",
    description: "Campaign, ad set, and audience structures built to scale without waste.",
  },
  {
    title: "Swipe File Warehouse",
    description:
      "A living library of proven ads and angles that fuels nonstop content ideation.",
  },
  {
    title: "Optimized Checkout Flows",
    description: "Conversion paths engineered to move visitors from interest to purchase.",
  },
  {
    title: "Clean Data Tracking",
    description: "Accurate events and attribution so you trust every number in your reports.",
  },
  {
    title: "Automated Nurture & Retention",
    description: "Email and lifecycle sequences that turn one-time buyers into repeat revenue.",
  },
  {
    title: "Custom KPI Dashboard",
    description: "A dashboard built around the metrics that actually drive your business.",
  },
  {
    title: "Managed Content Pipelines",
    description:
      "A production pipeline that keeps fresh, on-brand creative shipping on schedule.",
  },
];

export default function JobSlider() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (idx) =>
    setExpandedCard((prev) => (prev === idx ? null : idx));

  return (
    <section
      className="
      w-full bg-white py-16 px-6
      "
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        {/* Left Section */}
        <div className="w-full md:w-2/5 text-left space-y-4">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
            alt="Marketing growth analytics"
            className="rounded-xl mx-auto md:mx-0 w-full max-w-[300px] object-cover"
          />
          <h2
            className="text-3xl md:text-5xl font-semibold text-gray-800"
            style={{ background: "none", WebkitTextFillColor: "currentcolor" }}
          >
            What you get.
          </h2>
          <p className="text-gray-600">
            Everything included when you partner with our team.
          </p>
        </div>

        {/* Right Section — all 10 cards */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-100">
            {cards.map((item, idx) => {
              const isOpen = expandedCard === idx;
              return (
                <Card
                  key={idx}
                  className="
                    text-center shadow-md p-4 cursor-pointer
                    bg-white
                    border border-gray-200
                    transition-colors hover:border-gray-400
                  "
                  onClick={() => toggleCard(idx)}
                >
                  <CardHeader className="text-base sm:text-lg font-semibold p-0 text-gray-800">
                    {item.title}
                  </CardHeader>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <CardContent className="text-sm text-gray-500 p-0">
                      {item.description}
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}