import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";

import room from "@/assets/welcome-room.jpg";
import dining from "@/assets/welcome-dining.jpg";
import events from "@/assets/welcome-events.jpg";
import location from "@/assets/welcome-location.jpg";
import dining from "@/assets/welcome-dining.jpg";
import events from "@/assets/welcome-events.jpg";
import location from "@/assets/welcome-location.jpg";

const tiles = [room, dining, events, location];

export function Footer() {
  return (
    <footer className="bg-cream border-t border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Logo showTag />
        </div>

        <div>
          <h4 className="font-serif text-base text-ink mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-ink-soft">
            {[
              ["/", "Home"],
              ["/rooms", "Rooms"],
              ["/restaurant", "Restaurant"],
              ["/events", "Events"],
              ["/gallery", "Gallery"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition-colors story-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-ink mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-ink-soft">
            <li className="flex items-start gap-2.5">
              <Phone size={15} className="text-gold mt-0.5 shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="text-gold mt-0.5 shrink-0" />
              <span>info@shiversgoa.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
              <span>Ozran, North Goa, Goa - 403509</span>
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid place-items-center h-9 w-9 rounded-full bg-white text-ink-soft hover:bg-gradient-gold hover:text-white transition-all hover:-translate-y-0.5"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-base text-ink mb-4">Newsletter</h4>
          <p className="text-sm text-ink-soft mb-3">
            Get updates on offers and events.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2.5"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="rounded-md border border-border bg-white px-3 py-2.5 text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all"
            >
              Subscribe
            </button>
          </form>
          <div className="grid grid-cols-4 gap-1.5 mt-5">
            {tiles.map((src, i) => (
              <a key={i} href="#" className="aspect-square overflow-hidden rounded-sm">
                <img
                  src={src}
                  alt="instagram tile"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-soft">
          <span>© 2024 Shivers. All Rights Reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
