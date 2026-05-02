import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Settings, ChefHat, Music, Briefcase, ChevronRight } from "lucide-react";
import eventsHero from "@/assets/events-hero.jpg";
import romantic from "@/assets/event-romantic.jpg";
import british from "@/assets/event-british.jpg";
import northwest from "@/assets/event-northwest.jpg";
import sports from "@/assets/event-sports.jpg";

const events = [
  { src: romantic, t: "Romantic Dinner Setup", s: "Perfect for your special evening." },
  { src: british, t: "British Sunday Roast", s: "Classic British feast every Sunday." },
  { src: northwest, t: "Northwest Kitchen", s: "Authentic Northwest flavours." },
  { src: sports, t: "Sportbar with Live Sports Screening", s: "Enjoy the game with drinks & great vibes." },
];

const features = [
  { icon: Settings, label: "Custom Setups" },
  { icon: ChefHat, label: "Delicious Food" },
  { icon: Music, label: "Great Ambiance" },
  { icon: Briefcase, label: "Professional Service" },
];

export function EventsPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pt-2">
        <div className="relative overflow-hidden rounded-2xl shadow-luxury">
          <div className="aspect-[16/7] w-full">
            <img src={eventsHero} alt="Events & Experiences" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16 max-w-xl"
          >
            <h1 className="font-serif text-4xl sm:text-5xl text-ink">Events & Experiences</h1>
            <p className="text-xs text-ink-soft mt-3">
              <Link to="/" className="hover:text-gold">Home</Link>  /  Events
            </p>
            <p className="mt-5 text-ink-soft max-w-sm">
              Celebrate every special moment with us. Unique setups, great food and unforgettable events.
            </p>
            <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all">
              Plan Your Event
            </button>
          </motion.div>
        </div>
      </section>

      {/* SPECIAL EVENTS */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-ink mb-10">Our Special Events</h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {events.map((e) => (
            <motion.article
              key={e.t}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="group rounded-xl overflow-hidden bg-white shadow-card hover:shadow-luxury transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={e.src} alt={e.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-base text-ink">{e.t}</h3>
                <p className="text-xs text-ink-soft mt-2">{e.s}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-ink-soft">
          {features.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2">
              <Icon size={16} className="text-gold" /> {label}
            </span>
          ))}
        </div>
      </section>

      {/* PLAN A SPECIAL EVENT */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pb-20">
        <div className="rounded-xl bg-cream border border-border p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h3 className="font-serif text-xl text-ink">Planning a Special Event?</h3>
            <p className="text-sm text-ink-soft mt-1">
              Contact us and we will make it unforgettable.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all w-fit"
          >
            Enquire Now <ChevronRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
