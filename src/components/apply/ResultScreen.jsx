import React from "react";
import BookingEmbed from "./BookingEmbed";
import { GUIDE_URL } from "@/lib/applyQuestions";

const COPY = {
  qualified: {
    headline: "You're a great fit. Let's talk.",
    subtext: "Pick a time below for a 30 minute call with Luke and Max.",
  },
  review: {
    headline: "Thanks, we're taking a look.",
    subtext: "We review every application by hand. You'll hear from us within 48 hours.",
  },
  not_fit: {
    headline: "Thanks for applying.",
    subtext:
      "We don't think we're the right fit right now, but here's something to help in the meantime.",
  },
};

export default function ResultScreen({ result }) {
  const copy = COPY[result] || COPY.review;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16 text-[#1a1a1a]">
      <div className="w-full max-w-xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#619e80]">Mile 27</p>
        <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">{copy.headline}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#6b6b6b]">{copy.subtext}</p>

        {result === "qualified" && <BookingEmbed />}

        {result === "not_fit" && (
          <a
            href={GUIDE_URL || "#"}
            className="mt-8 inline-flex rounded-full bg-[#2d2d2d] px-7 py-3.5 text-[15px] text-white transition-opacity hover:opacity-90"
          >
            Get the free guide
          </a>
        )}
      </div>
    </div>
  );
}