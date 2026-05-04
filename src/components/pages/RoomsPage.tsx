import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Users,
  BedSingle,
  Maximize2,
  Wifi,
  Wind,
  Sparkles,
  Clock,
  ShieldCheck,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import deluxe from "@/assets/room-deluxe.jpg";
import superDeluxe from "@/assets/room-super-deluxe.jpg";
import suite from "@/assets/room-suite.jpg";

type Room = {
  id: string;
  category: "Deluxe" | "Super Deluxe" | "Suites";
  name: string;
  img: string;
  guests: string;
  bed: string;
  size: string;
  desc: string;
  priceFrom: string;
};

const rooms: Room[] = [
  {
    id: "deluxe",
    category: "Deluxe",
    name: "Deluxe Room",
    img: deluxe,
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "350 sq ft",
    desc: "Modern rooms with essential amenities and comfort.",
    priceFrom: "₹4,500",
  },
  {
    id: "super",
    category: "Super Deluxe",
    name: "Super Deluxe Room",
    img: superDeluxe,
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "450 sq ft",
    desc: "Spacious rooms with elegant decor and premium amenities.",
    priceFrom: "₹5,500",
  },
  {
    id: "suite",
    category: "Suites",
    name: "Luxury Suite",
    img: suite,
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "650 sq ft",
    desc: "Luxury suites with living area, balcony and premium experience.",
    priceFrom: "₹7,500",
  },
];

const tabs = ["All Rooms", "Deluxe Rooms", "Super Deluxe Rooms", "Suites"] as const;

const features = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Sparkles, label: "Daily Housekeeping" },
  { icon: Clock, label: "24/7 Room Service" },
  { icon: ShieldCheck, label: "Secure Booking" },
];

const faqs = [
  { q: "What is the check-in and check-out time?", a: "Standard check-in is 2:00 PM and check-out is 11:00 AM. Early check-in / late check-out can be arranged subject to availability." },
  { q: "Do you offer airport pickup?", a: "Yes, we offer chargeable airport pickup and drop. Please request at least 24 hours in advance." },
  { q: "Is breakfast included?", a: "Complimentary breakfast is included with most room categories. Please verify at the time of booking." },
  { q: "Do you allow cancellations?", a: "Free cancellation is available up to 48 hours before check-in. Standard charges apply thereafter." },
];

export function RoomsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All Rooms");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered =
    tab === "All Rooms"
      ? rooms
      : rooms.filter((r) =>
          tab === "Deluxe Rooms" ? r.category === "Deluxe" :
          tab === "Super Deluxe Rooms" ? r.category === "Super Deluxe" :
          r.category === "Suites"
        );

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pt-2">
        <div className="relative overflow-hidden rounded-2xl shadow-luxury">
          <div className="aspect-[16/7] w-full">
            <img src={deluxe} alt="Our Rooms" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16 max-w-xl"
          >
            <h1 className="font-serif text-4xl sm:text-5xl text-ink">Our Rooms</h1>
            <p className="text-xs text-ink-soft mt-3">
              <Link to="/" className="hover:text-gold">Home</Link>  /  Rooms
            </p>
            <p className="mt-5 text-ink-soft max-w-sm">
              Experience unmatched comfort and luxury in our beautifully designed rooms.
            </p>
            <Link
              to="/book"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all"
            >
              Book Your Stay
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TABS */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-ink mb-8">
          Choose Your Perfect Stay
        </h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 border-b border-border pb-3 mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-sm font-medium transition-colors ${
                tab === t ? "text-gold" : "text-ink-soft hover:text-ink"
              }`}
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute -bottom-[13px] left-0 right-0 h-0.5 bg-gold rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((r) => (
              <motion.article
                key={r.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group rounded-xl overflow-hidden bg-white shadow-card hover:shadow-luxury transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-ink">{r.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-ink-soft">
                    <span className="inline-flex items-center gap-1"><Users size={12} className="text-gold" />{r.guests}</span>
                    <span className="inline-flex items-center gap-1"><BedSingle size={12} className="text-gold" />{r.bed}</span>
                    <span className="inline-flex items-center gap-1"><Maximize2 size={12} className="text-gold" />{r.size}</span>
                  </div>
                  <p className="text-xs text-ink-soft mt-3">{r.desc}</p>
                  <p className="text-sm text-ink mt-4">
                    From <span className="font-semibold text-gold">{r.priceFrom}</span>
                    <span className="text-ink-soft"> /Night</span>
                  </p>
                  <Link to="/book" className="mt-4 w-full inline-flex items-center justify-center gap-1 rounded-md bg-gradient-gold px-4 py-2.5 text-xs font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all">
                    Book Now <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* feature row */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs text-ink-soft">
          {features.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2">
              <Icon size={15} className="text-gold" /> {label}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 lg:px-8 pb-20">
        <h2 className="font-serif text-3xl text-center text-ink mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} className="rounded-lg border border-border bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink hover:bg-cream transition-colors"
                >
                  <span>{f.q}</span>
                  <span className="text-gold">{open ? <Minus size={16} /> : <Plus size={16} />}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-sm text-ink-soft">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
