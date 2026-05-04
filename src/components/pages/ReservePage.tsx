import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Users, Utensils, Phone, Mail, User, CheckCircle2, MapPin } from "lucide-react";
import restaurantHero from "@/assets/restaurant-hero.jpg";

const TIMES = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

type Table = {
  id: string;
  label: string;
  seats: number;
  zone: "Garden" | "Indoor" | "Terrace";
  premium?: boolean;
};

const TABLES: Table[] = [
  { id: "G1", label: "Garden 1", seats: 2, zone: "Garden" },
  { id: "G2", label: "Garden 2", seats: 4, zone: "Garden", premium: true },
  { id: "G3", label: "Garden 3", seats: 6, zone: "Garden" },
  { id: "I1", label: "Indoor 1", seats: 2, zone: "Indoor" },
  { id: "I2", label: "Indoor 2", seats: 4, zone: "Indoor" },
  { id: "I3", label: "Indoor 3", seats: 8, zone: "Indoor", premium: true },
  { id: "T1", label: "Terrace 1", seats: 2, zone: "Terrace", premium: true },
  { id: "T2", label: "Terrace 2", seats: 4, zone: "Terrace" },
  { id: "T3", label: "Terrace 3", seats: 6, zone: "Terrace" },
];

// deterministic pseudo-availability based on date+time
function isAvailable(tableId: string, date: string, time: string) {
  if (!date || !time) return true;
  const seed = (date + time + tableId)
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  return seed % 5 !== 0; // ~80% available
}

const today = new Date().toISOString().split("T")[0];

export function ReservePage() {
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [selected, setSelected] = useState<string | null>(null);
  const [zone, setZone] = useState<"All" | Table["zone"]>("All");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const filtered = useMemo(
    () =>
      TABLES.filter((t) => (zone === "All" ? true : t.zone === zone)).filter(
        (t) => t.seats >= guests,
      ),
    [zone, guests],
  );

  const selectedTable = TABLES.find((t) => t.id === selected) || null;

  const canSubmit = date && time && selectedTable && name && phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 pt-2">
        <div className="relative overflow-hidden rounded-2xl shadow-luxury">
          <div className="aspect-[16/6] w-full">
            <img src={restaurantHero} alt="Reserve a Table" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16 max-w-xl"
          >
            <h1 className="font-serif text-3xl sm:text-5xl text-ink leading-tight">Reserve Your Table</h1>
            <p className="text-xs text-ink-soft mt-3">
              <Link to="/" className="hover:text-gold">Home</Link>  /  <Link to="/restaurant" className="hover:text-gold">Restaurant</Link>  /  Reserve
            </p>
            <p className="mt-5 text-ink-soft max-w-sm">
              Choose your moment — pick a date, time, and the perfect table for an unforgettable evening.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {confirmed && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-[1400px] px-4 lg:px-8 mt-8"
          >
            <div className="rounded-xl border border-gold/40 bg-cream p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 shadow-luxury">
              <CheckCircle2 size={42} className="text-gold shrink-0" />
              <div className="flex-1">
                <h3 className="font-serif text-2xl text-ink">Reservation Confirmed</h3>
                <p className="text-sm text-ink-soft mt-1">
                  Thank you, <span className="text-ink font-medium">{name}</span>. Your table{" "}
                  <span className="text-gold font-medium">{selectedTable?.label}</span> is booked for{" "}
                  <span className="text-ink">{date}</span> at{" "}
                  <span className="text-ink">{time}</span> for{" "}
                  <span className="text-ink">{guests} guest{guests > 1 ? "s" : ""}</span>.
                </p>
              </div>
              <button
                onClick={() => { setConfirmed(false); setSelected(null); }}
                className="inline-flex items-center justify-center rounded-md border border-gold px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold hover:text-white transition-all"
              >
                Make Another
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* MAIN GRID */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* LEFT: filters + tables */}
        <div className="space-y-8">
          {/* date / time / guests */}
          <div className="rounded-xl bg-white border border-border p-5 sm:p-6 shadow-card">
            <h2 className="font-serif text-xl text-ink mb-5">When are you joining us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block">
                <span className="text-xs text-ink-soft inline-flex items-center gap-2"><Calendar size={13} className="text-gold"/> Date</span>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setSelected(null); }}
                  className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              </label>
              <label className="block">
                <span className="text-xs text-ink-soft inline-flex items-center gap-2"><Users size={13} className="text-gold"/> Guests</span>
                <select
                  value={guests}
                  onChange={(e) => { setGuests(Number(e.target.value)); setSelected(null); }}
                  className="mt-1.5 w-full rounded-md border border-border bg-cream px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} guest{n>1?"s":""}</option>
                  ))}
                </select>
              </label>
              <div>
                <span className="text-xs text-ink-soft inline-flex items-center gap-2"><Clock size={13} className="text-gold"/> Time</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTime(t); setSelected(null); }}
                      className={`text-[11px] px-2.5 py-1.5 rounded-md border transition-all ${
                        time === t
                          ? "bg-gradient-gold text-white border-transparent shadow-card"
                          : "border-border text-ink-soft hover:border-gold hover:text-gold"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* tables */}
          <div className="rounded-xl bg-white border border-border p-5 sm:p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h2 className="font-serif text-xl text-ink">Choose Your Table</h2>
              <div className="flex flex-wrap gap-2">
                {(["All","Garden","Indoor","Terrace"] as const).map((z) => (
                  <button
                    key={z}
                    onClick={() => setZone(z)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-all ${
                      zone === z
                        ? "bg-gold text-white border-transparent"
                        : "border-border text-ink-soft hover:border-gold hover:text-gold"
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* legend */}
            <div className="flex flex-wrap gap-4 text-[11px] text-ink-soft mb-5">
              <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm border border-border bg-cream"/>Available</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-gradient-gold"/>Selected</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-[oklch(0.92_0.012_80)] opacity-60"/>Unavailable</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm border border-gold"/>Premium</span>
            </div>

            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((t) => {
                  const avail = isAvailable(t.id, date, time);
                  const isSel = selected === t.id;
                  return (
                    <motion.button
                      key={t.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      whileHover={avail ? { y: -3 } : {}}
                      disabled={!avail}
                      onClick={() => avail && setSelected(t.id)}
                      className={`relative text-left rounded-lg p-4 border transition-all ${
                        isSel
                          ? "bg-gradient-gold text-white border-transparent shadow-luxury"
                          : avail
                            ? "bg-cream border-border hover:border-gold cursor-pointer"
                            : "bg-[oklch(0.95_0.005_80)] border-border opacity-50 cursor-not-allowed"
                      } ${t.premium && !isSel ? "ring-1 ring-gold/40" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-serif text-base ${isSel ? "text-white" : "text-ink"}`}>{t.label}</span>
                        <Utensils size={14} className={isSel ? "text-white" : "text-gold"} />
                      </div>
                      <p className={`text-[11px] mt-1 ${isSel ? "text-white/85" : "text-ink-soft"}`}>
                        {t.zone} • Seats {t.seats}
                      </p>
                      {t.premium && (
                        <span className={`absolute top-2 right-2 text-[9px] uppercase tracking-wider ${isSel ? "text-white/90" : "text-gold"}`}>
                          Premium
                        </span>
                      )}
                      {!avail && (
                        <span className="absolute inset-0 grid place-items-center text-[10px] uppercase tracking-wider text-ink-soft">
                          Booked
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <p className="text-sm text-ink-soft text-center py-8">No tables match this party size in the selected zone.</p>
            )}
          </div>
        </div>

        {/* RIGHT: summary + form */}
        <aside className="lg:sticky lg:top-28 self-start space-y-5">
          <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-border p-5 sm:p-6 shadow-card space-y-4">
            <h3 className="font-serif text-xl text-ink">Reservation Details</h3>

            <div className="rounded-lg bg-cream p-4 text-sm space-y-1.5">
              <p className="flex justify-between"><span className="text-ink-soft">Date</span><span className="text-ink">{date || "—"}</span></p>
              <p className="flex justify-between"><span className="text-ink-soft">Time</span><span className="text-ink">{time || "—"}</span></p>
              <p className="flex justify-between"><span className="text-ink-soft">Guests</span><span className="text-ink">{guests}</span></p>
              <p className="flex justify-between"><span className="text-ink-soft">Table</span><span className="text-gold font-medium">{selectedTable?.label || "—"}</span></p>
            </div>

            <label className="block">
              <span className="text-xs text-ink-soft inline-flex items-center gap-2"><User size={12} className="text-gold"/> Full Name</span>
              <input value={name} onChange={(e)=>setName(e.target.value)} required className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
            </label>
            <label className="block">
              <span className="text-xs text-ink-soft inline-flex items-center gap-2"><Phone size={12} className="text-gold"/> Phone</span>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} required className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
            </label>
            <label className="block">
              <span className="text-xs text-ink-soft inline-flex items-center gap-2"><Mail size={12} className="text-gold"/> Email <span className="text-ink-soft/70">(optional)</span></span>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
            </label>
            <label className="block">
              <span className="text-xs text-ink-soft">Special requests</span>
              <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={3} className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"/>
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full inline-flex items-center justify-center rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Confirm Reservation
            </button>
            <p className="text-[11px] text-ink-soft text-center inline-flex items-center justify-center gap-1.5 w-full"><MapPin size={11} className="text-gold"/> Ozran, North Goa</p>
          </form>
        </aside>
      </section>
    </>
  );
}
