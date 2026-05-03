import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  BedDouble,
  UtensilsCrossed,
  Bike,
  ChevronRight,
  MapPin,
  Hand,
  Star,
  Leaf,
  BadgeIndianRupee,
} from "lucide-react";
import hero from "@/assets/hero-resort.jpg";
import wRoom from "@/assets/welcome-room.jpg";
import wDining from "@/assets/welcome-dining.jpg";
import wEvents from "@/assets/welcome-events.jpg";
import wLocation from "@/assets/welcome-location.jpg";
import offerFood from "@/assets/offering-food.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function HomePage() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* HERO */}
      <section className="relative mx-auto max-w-[1400px] px-4 lg:px-8 pt-2">
        <div className="relative overflow-hidden rounded-2xl shadow-luxury">
          <div className="relative aspect-[16/8] w-full">
            <img
              src={hero}
              alt="Luxury resort at sunset"
              className={`absolute inset-0 h-full w-full object-cover ${reduce ? "" : "ken-burns"}`}
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />

            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-2xl"
              >
                <p className="text-xs tracking-[0.4em] text-white/85 uppercase mb-5">
                  Welcome to Shivers
                </p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance"
                >
                  Luxury Stays.<br />
                  Exquisite Dining.<br />
                  Unforgettable<br />
                  Moments.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.5 }}
                  className="mt-6 text-white/85 max-w-md text-sm sm:text-base"
                >
                  Experience the perfect blend of luxury hospitality, fine dining and memorable events.
                </motion.p>
              </motion.div>

              {/* CTA cards */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } } }}
                className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  { icon: BedDouble, title: "BOOK ROOMS", sub: "Luxury Stay", to: "/rooms" },
                  { icon: UtensilsCrossed, title: "RESERVE TABLE", sub: "Shivers Garden Restaurant", to: "/restaurant" },
                  { icon: Bike, title: "ORDER FOOD", sub: "Delivery & Takeaway", to: "/restaurant" },
                ].map(({ icon: Icon, title, sub, to }) => (
                  <motion.div key={title} variants={fadeUp} transition={{ duration: 0.55, ease: "easeOut" }}>
                    <Link
                      to={to}
                      className="group flex items-center gap-4 rounded-xl bg-white/95 backdrop-blur px-5 py-4 shadow-card hover:shadow-luxury transition-all hover:-translate-y-1"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-gold text-white shrink-0">
                        <Icon size={20} />
                      </span>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold tracking-[0.18em] text-gold">
                          {title}
                        </p>
                        <p className="text-xs text-ink-soft mt-0.5">{sub}</p>
                      </div>
                      <ChevronRight size={16} className="text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-6 bg-gold" : "w-1.5 bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-5">
              Welcome to Shivers
            </h2>
            <p className="text-ink-soft leading-relaxed mb-7 max-w-md">
              A serene luxury escape in North Goa offering premium rooms, a fine dining
              restaurant, delicious cuisine and stunning experiences.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all"
            >
              Discover More
              <ChevronRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { src: wRoom, t: "Luxury Rooms", s: "Comfort & Relaxation" },
              { src: wDining, t: "Fine Dining", s: "Exquisite Cuisine" },
              { src: wEvents, t: "Events & Celebrations", s: "Memorable Moments" },
              { src: wLocation, t: "Prime Location", s: "North Goa" },
            ].map((c) => (
              <motion.div
                key={c.t}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl shadow-card">
                  <img
                    src={c.src}
                    alt={c.t}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-3 font-serif text-base text-ink">{c.t}</h3>
                <p className="text-xs text-ink-soft mt-0.5">{c.s}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-cream py-16 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl text-center text-ink mb-12"
          >
            Why Choose Shivers?
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {[
              { icon: MapPin, t: "Beautiful Location", s: "In the heart of North Goa" },
              { icon: Hand, t: "Premium Hospitality", s: "Warm & Personalized Service" },
              { icon: Star, t: "Top Rated", s: "Loved by 1000+ Guests" },
              { icon: Leaf, t: "Fresh & Delicious", s: "Farm Fresh Ingredients" },
              { icon: BadgeIndianRupee, t: "Best Price Guarantee", s: "Unbeatable Value" },
            ].map(({ icon: Icon, t, s }) => (
              <motion.div
                key={t}
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="text-center group"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-gold shadow-card transition-all group-hover:bg-gradient-gold group-hover:text-white group-hover:-translate-y-1">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-serif text-base text-ink">{t}</h3>
                <p className="text-xs text-ink-soft mt-1">{s}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl text-center text-ink mb-12"
        >
          Explore Our Offerings
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              src: wRoom,
              t: "Shivers Oasis Luxury Rooms",
              s: "Elegant rooms designed for your comfort and relaxation.",
              cta: "Book Now",
              to: "/rooms",
            },
            {
              src: wDining,
              t: "Shivers Garden Restaurant",
              s: "A perfect blend of ambience and flavors.",
              cta: "Reserve Now",
              to: "/restaurant",
            },
            {
              src: offerFood,
              t: "Delicious Food Delivered",
              s: "Tasty food delivered hot to your doorstep.",
              cta: "Order Now",
              to: "/restaurant",
            },
          ].map((o) => (
            <motion.article
              key={o.t}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group rounded-xl overflow-hidden bg-white shadow-card hover:shadow-luxury transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={o.src}
                  alt={o.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg text-ink">{o.t}</h3>
                <p className="text-sm text-ink-soft mt-2 mb-5">{o.s}</p>
                <Link
                  to={o.to}
                  className="inline-flex items-center gap-1.5 rounded-md bg-gradient-gold px-5 py-2.5 text-xs font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all"
                >
                  {o.cta}
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </>
  );
}
