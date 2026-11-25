import React from "react";

export default function IntroScreen({ onStart }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-[#1a1a1a]">
      <div className="w-full max-w-xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#619e80]">Mile 27</p>
        <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">Let's see if we're a fit</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6b6b6b]">
          Takes 2 minutes. We work with a small number of brands so each one gets real attention.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 w-full rounded-full bg-[#2d2d2d] px-8 py-4 text-[15px] text-white transition-opacity hover:opacity-90 sm:w-auto"
        >
          Start
        </button>
      </div>
    </div>
  );
}