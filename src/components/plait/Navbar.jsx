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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100/80 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo — matches Draftr's bold wordmark */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#4F46E5] flex items-center justify-center">
            <span className="text-white text-xs font-extrabold">P</span>
          </div>
          <span className="text-[#0A0A0A] font-extrabold text-lg tracking-tight">PLAIT</span>
        </Link>

        {/* Nav links — matches Draftr's minimal center nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === l.path ? "text-[#0A0A0A]" : "text-[#525252] hover:text-[#0A0A0A]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA — matches Draftr's dark pill "Login now" button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#1a1a1a] transition-colors"
          >
            Work With Me
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
                <Link key={l.path} to={l.path} className="text-sm font-semibold text-[#525252] hover:text-[#0A0A0A] py-1">
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" className="mt-2 text-center bg-[#0A0A0A] text-white text-sm font-bold px-5 py-3 rounded-full">
                Work With Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}