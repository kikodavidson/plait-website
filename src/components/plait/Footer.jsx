import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isDarkPage = location.pathname.startsWith("/blog");

  return (
    <footer className={`bg-transparent py-12 ${isDarkPage ? "border-t border-white/10" : "border-t border-gray-100/60"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <img src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/9dbd7f3cd_logos4.png" alt="PLAIT" className={`h-16 w-auto mb-1 ${isDarkPage ? "brightness-0 invert" : ""}`} />
            <p className={`text-sm ${isDarkPage ? "text-white/50" : "text-[#525252]"}`}>Human strategy. AI velocity.</p>
          </div>
          <div className={`flex flex-wrap gap-6 text-sm ${isDarkPage ? "text-white/50" : "text-[#525252]"}`}>
            <Link to="/services" className={`transition-colors ${isDarkPage ? "hover:text-white" : "hover:text-[#0A0A0A]"}`}>Services</Link>
            <Link to="/case-studies" className={`transition-colors ${isDarkPage ? "hover:text-white" : "hover:text-[#0A0A0A]"}`}>Case Studies</Link>
            <Link to="/about" className={`transition-colors ${isDarkPage ? "hover:text-white" : "hover:text-[#0A0A0A]"}`}>About</Link>
            <Link to="/contact" className={`transition-colors ${isDarkPage ? "hover:text-white" : "hover:text-[#0A0A0A]"}`}>Contact</Link>
            <Link to="/blog" className={`transition-colors ${isDarkPage ? "hover:text-white" : "hover:text-[#0A0A0A]"}`}>Blog</Link>
          </div>
          <Link
            to="/book"
            className="btn-gradient inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Get Started
          </Link>
        </div>
        <div className={`border-t mt-10 pt-6 text-xs ${isDarkPage ? "border-white/10 text-white/40" : "border-gray-100 text-[#525252]"}`}>
          © {new Date().getFullYear()} PLAIT. Luke Davidson. All rights reserved.
        </div>
      </div>
    </footer>
  );
}