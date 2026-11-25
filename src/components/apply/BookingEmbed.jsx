import React from "react";
import { BOOKING_URL } from "@/lib/applyQuestions";

export default function BookingEmbed() {
  if (!BOOKING_URL) {
    return (
      <div className="mt-6 flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-[#dcd5c9] bg-[#faf9f7] px-6 text-center">
        <p className="text-[13px] leading-relaxed text-[#9a9a9a]">
          Booking calendar goes here. Add your Calendly or Cal.com link to show it.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#e5e2dc]">
      <iframe
        src={BOOKING_URL}
        title="Book a call"
        className="h-[680px] w-full"
        frameBorder="0"
      />
    </div>
  );
}