import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./plait/Navbar";
import Footer from "./plait/Footer";
import DynamicBackground from "./plait/DynamicBackground";
import MouseTracer from "./plait/MouseTracer";

export default function Layout() {
  return (
    <div className="min-h-screen font-body relative" style={{ background: "transparent" }}>
      <DynamicBackground />
      <MouseTracer />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}