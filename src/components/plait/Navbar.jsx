import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Services", path: "/services" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-[#0A0A0A]">PLAIT</span>
          <span className="text-xs text-[#4F46E5] font-medium ml-1 hidden sm:inline">by Luke Davidson</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors ${location.pathname === l.path ? "text-[#0A0A0A]" : "text-[#525252] hover:text-[#0A0A0A]"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#4F46E5] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Work With Me →
          </Link>
        </div>

        <button className="md:hidden text-[#0A0A0A]" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <Link key={l.path} to={l.path} className="text-sm font-medium text-[#525252] hover:text-[#0A0A0A] py-1">{l.label}</Link>
              ))}
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] text-white text-sm font-semibold px-5 py-3 rounded-full mt-2">
                Work With Me →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}