import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoAccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#e5e2dc] p-8 text-center">
        <Lock className="mx-auto mb-4 h-6 w-6 text-[#6b6b6b]" />
        <h1 className="mb-2 text-2xl">Partners only</h1>
        <p className="mb-6 text-[15px] leading-relaxed text-[#6b6b6b]">
          This workspace is private to Luke and Max.
        </p>
        <Link to="/" className="text-[13px] text-[#6b6b6b] underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}