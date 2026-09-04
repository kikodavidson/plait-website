import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Our Process", path: "/our-process" },
  { label: "Industries", path: "/industries" },
  { label: "Why PLAIT", path: "/why-plait" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100/80 py-3 shadow-sm"
          : "bg-white py-5"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/56e6c8a0d_logos5.png"
            alt="PLAIT Marketing"
            className="h-40 w-auto mix-blend-multiply"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === link.path
                  ? "text-black"
                  : "text-black/70 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button className="btn-gradient rounded-none" onClick={() => navigate("/book")}>
            Get Started
          </Button>
        </div>

        <button
          className="lg:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <span className="text-2xl font-light leading-none">✕</span>
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-semibold py-2 ${
                  location.pathname === link.path ? "text-black" : "text-black/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="text-base font-semibold py-2 text-black/70">
              Contact
            </Link>
            <Button
              className="btn-gradient rounded-none w-full mt-2"
              onClick={() => navigate("/book")}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}