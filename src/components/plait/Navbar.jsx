import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Services", path: "/services" },
  { label: "Our Process", path: "/our-process" },
  { label: "Industries", path: "/industries" },
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
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo — matches Draftr's bold wordmark */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/56e6c8a0d_logos5.png" alt="PLAIT Marketing" className={`h-40 w-auto ${scrolled ? "mix-blend-multiply" : (location.pathname.startsWith("/blog") ? "brightness-0 invert" : "mix-blend-screen brightness-150")}`} />
        </Link>

        {/* Nav links — matches Draftr's minimal center nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-semibold transition-colors ${
                scrolled
                  ? location.pathname === l.path ? "text-[#2d2d2d]" : "text-[#525252] hover:text-[#2d2d2d]"
                  : location.pathname === l.path ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA — matches Draftr's dark pill "Login now" button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/book"
            className="btn-gradient inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full"
          >
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-[#2d2d2d]" onClick={() => setOpen(!open)}>
          {open ? <span className="text-xl font-light leading-none">✕</span> : <Menu className="w-5 h-5" />}
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
                <Link key={l.path} to={l.path} className="text-sm font-semibold text-[#525252] hover:text-[#2d2d2d] py-1">
                  {l.label}
                </Link>
              ))}
              <Link to="/book" className="mt-2 text-center btn-gradient text-sm font-bold px-5 py-3 rounded-full">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}