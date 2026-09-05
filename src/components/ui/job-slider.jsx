import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  [
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
  ],
  [
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
  ],
];

export default function JobSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <section
      className="
      w-full flex flex-col md:flex-row items-center justify-between
      rounded-2xl border
      bg-[#fdf7f3]
      border-gray-200
      py-10 px-6 m-4 md:m-8
      relative min-h-[400px] transition-colors
      "
    >
      {/* Left Section */}
      <div className="w-full md:w-2/5 text-left space-y-4">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
          alt="Marketing growth analytics"
          className="rounded-xl mx-auto md:mx-0 w-full max-w-[300px] object-cover"
        />
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
          What you get.
        </h2>
        <p className="text-gray-600">
          Everything included when you partner with our team.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center relative mt-10 md:mt-0">
        {/* Prev Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="
            absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2
            rounded-full bg-white
            shadow hover:bg-gray-100
            z-10
          "
          onClick={handlePrev}
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </Button>

        {/* Slider */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="
                  grid grid-cols-1 sm:grid-cols-2 gap-4
                  min-w-full p-4 rounded-xl
                  bg-gray-100
                "
              >
                {slide.map((item, idx) => (
                  <Card
                    key={idx}
                    className="
                      text-center shadow-md p-4
                      bg-white
                      border border-gray-200
                      transition-colors
                    "
                  >
                    <CardHeader className="text-base sm:text-lg font-semibold p-0 text-gray-800">
                      {item.title}
                    </CardHeader>
                    <CardContent className="text-sm text-gray-500 p-0 mt-1">
                      {item.description}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="
            absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2
            rounded-full bg-white
            shadow hover:bg-gray-100
            z-10
          "
          onClick={handleNext}
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </Button>
      </div>
    </section>
  );
}