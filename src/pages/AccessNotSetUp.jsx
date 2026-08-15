import React from "react";
import { base44 } from "@/api/base44Client";
import { LogOut, ShieldAlert } from "lucide-react";

export default function AccessNotSetUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-6">
      <div className="max-w-md text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
        <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-amber-50 flex items-center justify-center">
          <ShieldAlert className="w-6 h-6 text-amber-500" />
        </div>
        <h1 className="text-xl font-bold text-[#222222] mb-3">Your access isn't set up yet</h1>
        <p className="text-sm text-[#777777] leading-relaxed mb-6">
          We couldn't find a client portal linked to your account. Please contact your account manager at Plait so they can finish setting up your access.
        </p>
        <button
          onClick={() => base44.auth.logout()}
          className="inline-flex items-center gap-2 text-sm btn-gradient px-5 py-2.5 rounded-full"
        >
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>
    </div>
  );
}