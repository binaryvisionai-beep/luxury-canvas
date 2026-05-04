import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-lg shadow-card py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-10">
        <Link to="/" aria-label="Shivers home">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="story-link text-sm font-medium tracking-wide text-ink-soft hover:text-gold transition-colors"
              data-active={pathname === l.to}
              activeProps={{ className: "story-link text-sm font-medium tracking-wide text-gold" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:shadow-luxury hover:-translate-y-0.5 active:translate-y-0"
          >
            Book Now
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden rounded-md p-2 text-ink hover:bg-sand"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden border-t border-border bg-white"
        >
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-ink-soft hover:text-gold border-b border-border last:border-0"
                activeProps={{ className: "py-3 text-sm font-medium text-gold border-b border-border last:border-0" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
