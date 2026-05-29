import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./plait/Navbar";
import Footer from "./plait/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}