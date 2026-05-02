import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Fish, Soup, ChefHat, Cake, Phone, MapPin, Clock, Star } from "lucide-react";
import restaurantHero from "@/assets/restaurant-hero.jpg";
import seafood from "@/assets/dish-seafood.jpg";
import curry from "@/assets/dish-curry.jpg";
import continental from "@/assets/dish-continental.jpg";
import dessert from "@/assets/dish-dessert.jpg";

const specialties = [
  { src: seafood, t: "Seafood Delicacies", icon: Fish },
  { src: curry, t: "Indian Curries", icon: Soup },
  { src: continental, t: "Continental Dishes", icon: ChefHat },
  { src: dessert, t: "Signature Desserts", icon: Cake },
];

const reviews = [
  { name: "Rahul Mehta", text: "Great stay, amazing food and wonderful hospitality.", initials: "RM" },
  { name: "Priya Sharma", text: "The ambience of the restaurant is just perfect.", initials: "PS" },
  { name: "Amit Verma", text: "Best place in North Goa for stay and dining.", initials: "AV" },
  { name: "Neha Kapoor", text: "Absolutely loved the seafood platter. Will be back!", initials: "NK" },
];

const insta = [seafood, curry, continental, dessert, restaurantHero, seafood];

export function RestaurantPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);

  const visible = [
    reviews[active],
    reviews[(active + 1) % reviews.length],
    reviews[(active + 2) % reviews.length],
  ];

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pt-2">
        <div className="relative overflow-hidden rounded-2xl shadow-luxury">
          <div className="aspect-[16/7] w-full">
            <img src={restaurantHero} alt="Shivers Garden Restaurant" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16 max-w-xl"
          >
            <h1 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">Shivers Garden Restaurant</h1>
            <p className="text-xs text-ink-soft mt-3">
              <Link to="/" className="hover:text-gold">Home</Link>  /  Restaurant
            </p>
            <p className="mt-5 text-ink-soft max-w-sm">
              A perfect blend of cosy ambience, warm hospitality and delicious cuisine made with love.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all">
                Reserve Table
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-gold px-6 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-white transition-all">
                View Menu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* tagline row */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: ChefHat, t: "Fine Dining", s: "Exquisite Cuisine" },
            { icon: Soup, t: "Cozy Ambiance", s: "Relax & Enjoy" },
            { icon: Fish, t: "Farm Fresh", s: "Quality Ingredients" },
            { icon: Star, t: "Top Rated", s: "Loved by Guests" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="flex flex-col items-center">
              <Icon size={22} className="text-gold" />
              <p className="mt-2 text-sm font-medium text-ink">{t}</p>
              <p className="text-xs text-ink-soft">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pb-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-ink mb-10">Our Specialties</h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {specialties.map((d) => (
            <motion.div
              key={d.t}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="text-center group"
            >
              <div className="aspect-square overflow-hidden rounded-full mx-auto max-w-[180px] shadow-card group-hover:shadow-luxury transition-shadow">
                <img src={d.src} alt={d.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="mt-4 font-serif text-base text-ink">{d.t}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RESERVATION + MAP */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pb-16">
        <div className="rounded-xl bg-cream border border-border p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
          <div>
            <h3 className="font-serif text-xl text-ink">Reserve Your Table</h3>
            <p className="text-sm text-ink-soft mt-1">
              Book your table now and enjoy a memorable dining experience.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all w-fit">
            Reserve Now
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <h4 className="font-serif text-lg text-ink mb-3">Opening Hours</h4>
              <div className="flex justify-between text-sm border-b border-border py-2.5">
                <span className="text-ink-soft inline-flex items-center gap-2"><Clock size={14} className="text-gold"/>Monday – Friday</span>
                <span className="text-ink">12:00 PM – 11:00 PM</span>
              </div>
              <div className="flex justify-between text-sm border-b border-border py-2.5">
                <span className="text-ink-soft inline-flex items-center gap-2"><Clock size={14} className="text-gold"/>Saturday – Sunday</span>
                <span className="text-ink">11:00 AM – 12:00 AM</span>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg text-ink mb-3">Contact</h4>
              <p className="text-sm text-ink-soft inline-flex items-center gap-2"><Phone size={14} className="text-gold"/> +91 98765 43210</p>
              <p className="mt-2 text-sm text-ink-soft inline-flex items-start gap-2"><MapPin size={14} className="text-gold mt-0.5"/> Shivers Garden Restaurant, Ozran, North Goa, Goa - 403509</p>
            </div>
          </div>

          {/* map placeholder */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-card border border-border bg-[oklch(0.95_0.02_140)]">
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0 L0 0 0 40" fill="none" stroke="oklch(0.85 0.03 140)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#grid)" />
              <path d="M0,180 Q120,140 220,170 T400,150" stroke="oklch(0.7 0.13 60)" strokeWidth="3" fill="none" />
              <path d="M40,40 L380,40 L380,80 L40,80 Z" fill="oklch(0.92 0.03 140)" opacity="0.5" />
              <circle cx="240" cy="160" r="8" fill="oklch(0.6 0.18 27)" />
              <circle cx="240" cy="160" r="14" fill="oklch(0.6 0.18 27)" opacity="0.3" />
            </svg>
            <span className="absolute top-4 left-4 bg-white rounded-md px-3 py-1.5 text-xs shadow-card text-ink">
              Shivers Garden Restaurant
            </span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream border-y border-border py-16">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/4 text-center lg:text-left">
              <p className="text-sm text-ink-soft">What Our Guests Say</p>
              <p className="mt-3 inline-flex items-center gap-2 text-2xl font-semibold text-ink">
                <span className="text-gold">G</span>oogle
              </p>
              <p className="mt-2 text-3xl font-serif text-ink">4.7 <span className="text-base text-gold">★★★★★</span></p>
              <p className="text-xs text-ink-soft mt-1">Based on 1000+ reviews</p>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              <AnimatePresence mode="popLayout">
                {visible.map((r) => (
                  <motion.div
                    key={r.name}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl bg-white p-5 shadow-card"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-white font-semibold text-sm">
                        {r.initials}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{r.name}</p>
                        <p className="text-[11px] text-gold">★★★★★</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-ink-soft">{r.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="font-serif text-lg text-ink mb-4">Follow Us On Instagram <span className="text-sm text-ink-soft">@shiversgoa</span></h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {insta.map((src, i) => (
                <a key={i} href="#" className="aspect-square overflow-hidden rounded-md group">
                  <img src={src} alt="instagram" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
