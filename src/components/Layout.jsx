import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./plait/Navbar";
import Footer from "./plait/Footer";
import DynamicBackground from "./plait/DynamicBackground";

export default function Layout() {
  return (
    <div className="min-h-screen font-body relative">
      <DynamicBackground />
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