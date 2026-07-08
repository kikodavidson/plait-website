import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f4f2ee]/60 backdrop-blur-sm border-t border-gray-100/60 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <img src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/9dbd7f3cd_logos4.png" alt="PLAIT" className="h-16 w-auto mb-1" />
            <p className="text-sm text-[#525252]">Human strategy. AI velocity.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-[#525252]">
            <Link to="/services" className="hover:text-[#0A0A0A] transition-colors">Services</Link>
            <Link to="/case-studies" className="hover:text-[#0A0A0A] transition-colors">Case Studies</Link>
            <Link to="/about" className="hover:text-[#0A0A0A] transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#0A0A0A] transition-colors">Contact</Link>
          </div>
          <Link
            to="/contact"
            className="btn-gradient inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Work With Me
          </Link>
        </div>
        <div className="border-t border-gray-100 mt-10 pt-6 text-xs text-[#525252]">
          © {new Date().getFullYear()} PLAIT. Luke Davidson. All rights reserved.
        </div>
      </div>
    </footer>
  );
}