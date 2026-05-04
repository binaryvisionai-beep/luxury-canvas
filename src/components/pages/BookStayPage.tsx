import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Users, BedSingle, Maximize2, Wifi, Wind, Sparkles, Coffee, Tv, Bath,
  Calendar, ChevronRight, ChevronLeft, CheckCircle2, MapPin, ArrowLeft, Star,
} from "lucide-react";
import deluxe from "@/assets/room-deluxe.jpg";
import superDeluxe from "@/assets/room-super-deluxe.jpg";
import suite from "@/assets/room-suite.jpg";
import hero from "@/assets/hero-resort.jpg";

type Room = {
  id: string;
  name: string;
  category: string;
  images: string[];
  guests: number;
  bed: string;
  size: string;
  price: number;
  rating: number;
  short: string;
  long: string;
  amenities: string[];
};

const ROOMS: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    category: "Deluxe",
    images: [deluxe, hero, superDeluxe],
    guests: 2, bed: "1 King Bed", size: "350 sq ft", price: 4500, rating: 4.6,
    short: "Modern rooms with essential amenities and comfort.",
    long: "A warm, contemporary retreat featuring plush king bedding, curated artwork and an oversized rain shower — perfectly sized for couples seeking comfort with elegance.",
    amenities: ["Free Wi-Fi","Air Conditioning","Smart TV","Coffee Maker","Rain Shower","Daily Housekeeping"],
  },
  {
    id: "super",
    name: "Super Deluxe Room",
    category: "Super Deluxe",
    images: [superDeluxe, deluxe, suite],
    guests: 2, bed: "1 King Bed", size: "450 sq ft", price: 5500, rating: 4.8,
    short: "Spacious rooms with elegant decor and premium amenities.",
    long: "An indulgent space with a private sitting nook, garden-facing windows and refined teak interiors. Designed for travellers who appreciate the quieter side of luxury.",
    amenities: ["Free Wi-Fi","Air Conditioning","Smart TV","Espresso Bar","Soaking Tub","Garden View","Mini Bar"],
  },
  {
    id: "suite",
    name: "Luxury Suite",
    category: "Suites",
    images: [suite, hero, deluxe],
    guests: 2, bed: "1 King Bed", size: "650 sq ft", price: 7500, rating: 4.9,
    short: "Luxury suites with living area, balcony and premium experience.",
    long: "Our flagship suite — a layered sanctuary of separate living and sleeping zones, a private balcony with framed greenery, and a marble bath crafted for slow, luxurious mornings.",
    amenities: ["Free Wi-Fi","Air Conditioning","Smart TV","Espresso Bar","Marble Bath","Private Balcony","Mini Bar","Butler Service"],
  },
];

const AMENITY_ICON: Record<string, typeof Wifi> = {
  "Free Wi-Fi": Wifi, "Air Conditioning": Wind, "Smart TV": Tv,
  "Coffee Maker": Coffee, "Espresso Bar": Coffee, "Rain Shower": Bath,
  "Soaking Tub": Bath, "Marble Bath": Bath, "Daily Housekeeping": Sparkles,
  "Garden View": Sparkles, "Mini Bar": Coffee, "Private Balcony": Sparkles,
  "Butler Service": Sparkles,
};

const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now()+86400000).toISOString().split("T")[0];

export function BookStayPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [step, setStep] = useState<"browse" | "details" | "book" | "confirmed">("browse");

  // booking state
  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prefs, setPrefs] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const nights = useMemo(() => {
    const a = new Date(checkin).getTime();
    const b = new Date(checkout).getTime();
    return Math.max(1, Math.round((b-a)/86400000));
  }, [checkin, checkout]);

  const total = (selectedRoom?.price || 0) * nights;
  const taxes = Math.round(total * 0.12);

  const togglePref = (p: string) =>
    setPrefs((arr) => arr.includes(p) ? arr.filter(x=>x!==p) : [...arr, p]);

  const openRoom = (r: Room) => {
    setSelectedRoom(r); setImgIdx(0); setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pt-2">
        <div className="relative overflow-hidden rounded-2xl shadow-luxury">
          <div className="aspect-[16/6] w-full">
            <img src={hero} alt="Book your stay" className="absolute inset-0 h-full w-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16 max-w-xl"
          >
            <h1 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">Book Your Stay</h1>
            <p className="text-xs text-ink-soft mt-3">
              <Link to="/" className="hover:text-gold">Home</Link>  /  <Link to="/rooms" className="hover:text-gold">Rooms</Link>  /  Book
            </p>
            <p className="mt-5 text-ink-soft max-w-sm">
              Curated rooms, garden-facing balconies and quiet luxury — pick your moment to escape.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {/* STEP 1: BROWSE */}
        {step === "browse" && (
          <motion.section
            key="browse"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-[1400px] px-4 lg:px-8 py-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-ink mb-10">Choose Your Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROOMS.map((r) => (
                <motion.article
                  key={r.id}
                  whileHover={{ y: -6 }}
                  className="group rounded-xl overflow-hidden bg-white shadow-card hover:shadow-luxury transition-shadow cursor-pointer"
                  onClick={() => openRoom(r)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={r.images[0]} alt={r.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg text-ink">{r.name}</h3>
                      <span className="text-[11px] text-gold inline-flex items-center gap-1"><Star size={11} fill="currentColor"/>{r.rating}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-ink-soft">
                      <span className="inline-flex items-center gap-1"><Users size={12} className="text-gold"/>{r.guests} Guests</span>
                      <span className="inline-flex items-center gap-1"><BedSingle size={12} className="text-gold"/>{r.bed}</span>
                      <span className="inline-flex items-center gap-1"><Maximize2 size={12} className="text-gold"/>{r.size}</span>
                    </div>
                    <p className="text-xs text-ink-soft mt-3">{r.short}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-ink">From <span className="font-semibold text-gold">₹{r.price.toLocaleString()}</span><span className="text-ink-soft"> /Night</span></p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold">View <ChevronRight size={14}/></span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* STEP 2: DETAILS */}
        {step === "details" && selectedRoom && (
          <motion.section
            key="details"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-[1400px] px-4 lg:px-8 py-12"
          >
            <button onClick={() => setStep("browse")} className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-gold mb-5 transition-colors">
              <ArrowLeft size={14}/> Back to rooms
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
              {/* gallery */}
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-luxury">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIdx}
                      src={selectedRoom.images[imgIdx]}
                      alt={selectedRoom.name}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <button
                    onClick={() => setImgIdx((i) => (i-1+selectedRoom.images.length)%selectedRoom.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink hover:bg-white shadow-card"
                  ><ChevronLeft size={16}/></button>
                  <button
                    onClick={() => setImgIdx((i) => (i+1)%selectedRoom.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink hover:bg-white shadow-card"
                  ><ChevronRight size={16}/></button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {selectedRoom.images.map((src, i) => (
                    <button key={i} onClick={()=>setImgIdx(i)}
                      className={`aspect-[4/3] overflow-hidden rounded-md ring-2 transition-all ${imgIdx===i?"ring-gold":"ring-transparent opacity-70 hover:opacity-100"}`}>
                      <img src={src} alt="" className="h-full w-full object-cover"/>
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="font-serif text-3xl text-ink">{selectedRoom.name}</h2>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-soft">
                    <span className="inline-flex items-center gap-1.5"><Users size={13} className="text-gold"/>{selectedRoom.guests} Guests</span>
                    <span className="inline-flex items-center gap-1.5"><BedSingle size={13} className="text-gold"/>{selectedRoom.bed}</span>
                    <span className="inline-flex items-center gap-1.5"><Maximize2 size={13} className="text-gold"/>{selectedRoom.size}</span>
                    <span className="inline-flex items-center gap-1.5 text-gold"><Star size={13} fill="currentColor"/>{selectedRoom.rating}</span>
                  </div>
                  <p className="mt-5 text-ink-soft leading-relaxed">{selectedRoom.long}</p>

                  <h3 className="mt-8 font-serif text-lg text-ink">Amenities</h3>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedRoom.amenities.map((a) => {
                      const Icon = AMENITY_ICON[a] || Sparkles;
                      return (
                        <div key={a} className="flex items-center gap-2 rounded-lg bg-cream border border-border px-3 py-2.5 text-sm text-ink">
                          <Icon size={15} className="text-gold"/> {a}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* booking summary */}
              <aside className="lg:sticky lg:top-28 self-start rounded-xl border border-border bg-white p-6 shadow-card">
                <p className="text-sm text-ink-soft">From</p>
                <p className="font-serif text-3xl text-gold">₹{selectedRoom.price.toLocaleString()}<span className="text-sm text-ink-soft font-sans"> /night</span></p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs text-ink-soft inline-flex items-center gap-1.5"><Calendar size={11} className="text-gold"/> Check-in</span>
                    <input type="date" min={today} value={checkin} onChange={(e)=>setCheckin(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
                  </label>
                  <label className="block">
                    <span className="text-xs text-ink-soft inline-flex items-center gap-1.5"><Calendar size={11} className="text-gold"/> Check-out</span>
                    <input type="date" min={checkin} value={checkout} onChange={(e)=>setCheckout(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
                  </label>
                  <label className="block">
                    <span className="text-xs text-ink-soft">Adults</span>
                    <select value={adults} onChange={(e)=>setAdults(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40">
                      {[1,2,3,4].map(n=><option key={n} value={n}>{n}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs text-ink-soft">Children</span>
                    <select value={children} onChange={(e)=>setChildren(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40">
                      {[0,1,2,3].map(n=><option key={n} value={n}>{n}</option>)}
                    </select>
                  </label>
                </div>

                <div className="mt-5 rounded-lg bg-cream p-4 text-sm space-y-1.5">
                  <p className="flex justify-between"><span className="text-ink-soft">₹{selectedRoom.price.toLocaleString()} × {nights} night{nights>1?"s":""}</span><span className="text-ink">₹{total.toLocaleString()}</span></p>
                  <p className="flex justify-between"><span className="text-ink-soft">Taxes & fees (12%)</span><span className="text-ink">₹{taxes.toLocaleString()}</span></p>
                  <div className="border-t border-border my-2"/>
                  <p className="flex justify-between text-base"><span className="font-medium text-ink">Total</span><span className="font-semibold text-gold">₹{(total+taxes).toLocaleString()}</span></p>
                </div>

                <button onClick={()=>setStep("book")}
                  className="mt-5 w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all">
                  Continue to Book <ChevronRight size={14}/>
                </button>
                <p className="mt-3 text-[11px] text-ink-soft text-center">Free cancellation up to 48 hrs before check-in.</p>
              </aside>
            </div>
          </motion.section>
        )}

        {/* STEP 3: BOOK FORM */}
        {step === "book" && selectedRoom && (
          <motion.section
            key="book"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-[1400px] px-4 lg:px-8 py-12"
          >
            <button onClick={()=>setStep("details")} className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-gold mb-5 transition-colors">
              <ArrowLeft size={14}/> Back to room
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
              <form onSubmit={handleBook} className="rounded-xl bg-white border border-border p-6 sm:p-8 shadow-card space-y-5">
                <h2 className="font-serif text-2xl text-ink">Guest Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs text-ink-soft">Full Name</span>
                    <input value={name} onChange={(e)=>setName(e.target.value)} required className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
                  </label>
                  <label className="block">
                    <span className="text-xs text-ink-soft">Phone</span>
                    <input value={phone} onChange={(e)=>setPhone(e.target.value)} required className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs text-ink-soft">Email</span>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
                  </label>
                </div>

                <div>
                  <p className="text-sm font-medium text-ink mb-2">Preferences</p>
                  <div className="flex flex-wrap gap-2">
                    {["Airport Pickup","Late Check-in","Honeymoon Setup","High Floor","Quiet Room","Extra Bed"].map((p)=>{
                      const on = prefs.includes(p);
                      return (
                        <button type="button" key={p} onClick={()=>togglePref(p)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${on?"bg-gradient-gold text-white border-transparent":"border-border text-ink-soft hover:border-gold hover:text-gold"}`}>
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block">
                  <span className="text-xs text-ink-soft">Special requests</span>
                  <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={3} className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
                </label>

                <button type="submit" className="w-full inline-flex items-center justify-center rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all">
                  Confirm Booking
                </button>
              </form>

              <aside className="lg:sticky lg:top-28 self-start rounded-xl bg-white border border-border p-6 shadow-card">
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="h-full w-full object-cover"/>
                </div>
                <h3 className="font-serif text-lg text-ink">{selectedRoom.name}</h3>
                <p className="text-xs text-ink-soft mt-1">{selectedRoom.size} • {selectedRoom.bed}</p>

                <div className="mt-4 rounded-lg bg-cream p-4 text-sm space-y-1.5">
                  <p className="flex justify-between"><span className="text-ink-soft">Check-in</span><span className="text-ink">{checkin}</span></p>
                  <p className="flex justify-between"><span className="text-ink-soft">Check-out</span><span className="text-ink">{checkout}</span></p>
                  <p className="flex justify-between"><span className="text-ink-soft">Guests</span><span className="text-ink">{adults} adult{adults>1?"s":""}{children>0?`, ${children} child${children>1?"ren":""}`:""}</span></p>
                  <div className="border-t border-border my-2"/>
                  <p className="flex justify-between"><span className="text-ink-soft">Subtotal</span><span className="text-ink">₹{total.toLocaleString()}</span></p>
                  <p className="flex justify-between"><span className="text-ink-soft">Taxes & fees</span><span className="text-ink">₹{taxes.toLocaleString()}</span></p>
                  <p className="flex justify-between text-base pt-1"><span className="font-medium text-ink">Total</span><span className="font-semibold text-gold">₹{(total+taxes).toLocaleString()}</span></p>
                </div>
              </aside>
            </div>
          </motion.section>
        )}

        {/* STEP 4: CONFIRMED */}
        {step === "confirmed" && selectedRoom && (
          <motion.section
            key="confirmed"
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl px-4 lg:px-8 py-16"
          >
            <div className="rounded-2xl border border-gold/40 bg-cream p-8 sm:p-10 text-center shadow-luxury">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="inline-flex">
                <CheckCircle2 size={56} className="text-gold"/>
              </motion.div>
              <h2 className="font-serif text-3xl text-ink mt-4">Your Stay is Confirmed</h2>
              <p className="text-sm text-ink-soft mt-2">A confirmation has been sent to <span className="text-ink">{email}</span>.</p>

              <div className="mt-6 rounded-lg bg-white border border-border p-5 text-left text-sm space-y-1.5">
                <p className="flex justify-between"><span className="text-ink-soft">Booking ID</span><span className="text-ink font-mono">SHV-{Date.now().toString().slice(-6)}</span></p>
                <p className="flex justify-between"><span className="text-ink-soft">Room</span><span className="text-gold font-medium">{selectedRoom.name}</span></p>
                <p className="flex justify-between"><span className="text-ink-soft">Dates</span><span className="text-ink">{checkin} → {checkout} ({nights} night{nights>1?"s":""})</span></p>
                <p className="flex justify-between"><span className="text-ink-soft">Guests</span><span className="text-ink">{adults} adult{adults>1?"s":""}{children>0?`, ${children} child${children>1?"ren":""}`:""}</span></p>
                <p className="flex justify-between"><span className="text-ink-soft">Total Paid</span><span className="text-gold font-semibold">₹{(total+taxes).toLocaleString()}</span></p>
              </div>

              <p className="text-[11px] text-ink-soft mt-5 inline-flex items-center justify-center gap-1.5"><MapPin size={11} className="text-gold"/> Shivers, Ozran, North Goa</p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={()=>{ setStep("browse"); setSelectedRoom(null); }}
                  className="inline-flex items-center justify-center rounded-md border border-gold px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold hover:text-white transition-all">
                  Book Another Room
                </button>
                <Link to="/" className="inline-flex items-center justify-center rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:shadow-luxury transition-all">
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
