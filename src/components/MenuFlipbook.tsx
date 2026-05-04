import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { playPageFlip } from "@/lib/pageFlipSound";

import front from "@/assets/menu/00-front.jpg";
import coffee from "@/assets/menu/03-coffee-desserts.jpg";
import cocktails from "@/assets/menu/06-cocktails.jpg";
import veg1 from "@/assets/menu/08-veg-1.jpg";
import veg2 from "@/assets/menu/09-veg-2.jpg";
import euro1 from "@/assets/menu/10-eurasian-1.jpg";
import euro2 from "@/assets/menu/11-eurasian-2.jpg";
import nonSpicy from "@/assets/menu/15-non-spicy.jpg";
import back from "@/assets/menu/99-back.jpg";

type Page = string | null;

// Build spreads: cover alone on right, then dual pages, then back on left
const PAGES: Page[] = [front, cocktails, coffee, veg1, veg2, euro1, euro2, nonSpicy, back];

// Spreads = [left, right] pairs. Cover starts spread.
const SPREADS: [Page, Page][] = (() => {
  const out: [Page, Page][] = [[null, PAGES[0]]];
  for (let i = 1; i < PAGES.length; i += 2) {
    out.push([PAGES[i] ?? null, PAGES[i + 1] ?? null]);
  }
  return out;
})();

const CHAPTERS = [
  "Cover",
  "Aperitivo",
  "From the Garden",
  "Ocean & Coast",
  "Hearth & Fire",
  "Sweet Endings",
];

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="cgo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.06 80)" />
          <stop offset="50%" stopColor="oklch(0.78 0.13 75)" />
          <stop offset="100%" stopColor="oklch(0.55 0.13 60)" />
        </linearGradient>
      </defs>
      <path d="M4 40 Q4 4 40 4" stroke="url(#cgo)" strokeWidth="1.2" />
      <path d="M10 40 Q10 10 40 10" stroke="url(#cgo)" strokeWidth="0.8" opacity="0.7" />
      <path d="M16 22 Q22 16 30 16 Q22 22 22 30" stroke="url(#cgo)" strokeWidth="0.9" />
      <circle cx="14" cy="14" r="1.3" fill="url(#cgo)" />
      <circle cx="30" cy="6" r="0.9" fill="url(#cgo)" />
      <circle cx="6" cy="30" r="0.9" fill="url(#cgo)" />
      <path d="M22 12 q3 -3 8 0" stroke="url(#cgo)" strokeWidth="0.7" />
    </svg>
  );
}

function PageFace({ src, side }: { src: Page; side: "left" | "right" }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[var(--pearl)]"
      style={{
        boxShadow:
          side === "left"
            ? "inset -18px 0 30px -18px oklch(0 0 0 / 0.35)"
            : "inset 18px 0 30px -18px oklch(0 0 0 / 0.35)",
        borderTopLeftRadius: side === "left" ? 10 : 2,
        borderBottomLeftRadius: side === "left" ? 10 : 2,
        borderTopRightRadius: side === "right" ? 10 : 2,
        borderBottomRightRadius: side === "right" ? 10 : 2,
      }}
    >
      {/* paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.28 0.04 45) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      {/* gold hairline frame */}
      <div
        className="pointer-events-none absolute"
        style={{
          inset: 12,
          border: "1px solid oklch(0.78 0.13 75 / 0.55)",
          borderRadius: 4,
        }}
      />
      {src ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-contain p-5"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--brown-deep)]/5" />
      )}
    </div>
  );
}

export function MenuFlipbook({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState<null | "next" | "prev">(null);
  const total = SPREADS.length;

  // ambient embers (memoized to avoid hydration mismatch)
  const embers = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    [],
  );

  const goNext = useCallback(() => {
    if (flipping || spread >= total - 1) return;
    playPageFlip(0.32);
    setFlipping("next");
    window.setTimeout(() => {
      setSpread((s) => s + 1);
      setFlipping(null);
    }, 950);
  }, [flipping, spread, total]);

  const goPrev = useCallback(() => {
    if (flipping || spread <= 0) return;
    playPageFlip(0.32);
    setFlipping("prev");
    window.setTimeout(() => {
      setSpread((s) => s - 1);
      setFlipping(null);
    }, 950);
  }, [flipping, spread]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, goNext, goPrev, onClose]);

  useEffect(() => {
    if (open) setSpread(0);
  }, [open]);

  if (!open) return null;

  const cur = SPREADS[spread];
  const nextSpread = SPREADS[spread + 1];
  const prevSpread = SPREADS[spread - 1];
  const chapter = CHAPTERS[Math.min(spread, CHAPTERS.length - 1)];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[60] flex items-center justify-center px-4"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.18 0.02 60 / 0.92), oklch(0.08 0.01 60 / 0.98))",
          backdropFilter: "blur(28px) saturate(1.2)",
          WebkitBackdropFilter: "blur(28px) saturate(1.2)",
        }}
      >
        {/* embers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {embers.map((e) => (
            <motion.span
              key={e.id}
              className="absolute rounded-full"
              style={{
                left: `${e.left}%`,
                top: `${e.top}%`,
                width: e.size,
                height: e.size,
                background: "oklch(0.85 0.13 75)",
                boxShadow: "0 0 8px oklch(0.78 0.13 75)",
              }}
              animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* close */}
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90, backgroundColor: "oklch(0.78 0.13 75 / 0.18)" }}
          transition={{ duration: 0.5 }}
          className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full text-[var(--champagne)]"
          style={{ border: "1px solid oklch(0.78 0.13 75 / 0.55)" }}
          aria-label="Close menu"
        >
          <X size={20} />
        </motion.button>

        {/* top brand bar */}
        <div className="pointer-events-none absolute top-6 left-0 right-0 flex items-center justify-between px-10 text-[var(--champagne)]">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.5em] uppercase">
            <Sparkles size={12} className="text-[var(--gold-bright)]" />
            <span>Shivers · Eurasian Cuisine</span>
          </div>
          <div className="font-display text-sm tracking-widest">Est. MMXXV</div>
        </div>

        {/* center chapter title */}
        <div className="pointer-events-none absolute top-16 left-0 right-0 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-script text-4xl sm:text-5xl text-gradient-gold leading-none">
                {chapter}
              </h2>
              <p className="mt-1 text-[10px] tracking-[0.5em] uppercase text-[var(--champagne)]/70">
                The Menu · Chapter {String(spread + 1).padStart(2, "0")}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* book */}
        <div className="relative w-full max-w-[1320px] aspect-[2.1/1] mt-16">
          {/* gold halo */}
          <div
            className="pointer-events-none absolute -inset-10 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.78 0.13 75 / 0.25), transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* corner ornaments */}
          <CornerOrnament className="absolute -top-3 -left-3 h-14 w-14" />
          <CornerOrnament className="absolute -top-3 -right-3 h-14 w-14 rotate-90" />
          <CornerOrnament className="absolute -bottom-3 -left-3 h-14 w-14 -rotate-90" />
          <CornerOrnament className="absolute -bottom-3 -right-3 h-14 w-14 rotate-180" />

          <div
            className="perspective-book relative h-full w-full"
            style={{ filter: flipping ? "drop-shadow(0 30px 60px oklch(0 0 0 / 0.7))" : "drop-shadow(var(--shadow-luxe))" }}
          >
            <div className="relative h-full w-full flex">
              {/* LEFT static */}
              <div className="relative h-full w-1/2 preserve-3d">
                <PageFace src={cur[0]} side="left" />
                {/* peel hint left */}
                {spread > 0 && !flipping && (
                  <div
                    className="pointer-events-none absolute top-0 left-0 h-4 w-4 opacity-0 hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--pearl) 50%, transparent 50%)",
                      filter: "drop-shadow(0 2px 4px oklch(0 0 0 / 0.3))",
                    }}
                  />
                )}
              </div>

              {/* spine */}
              <div
                className="relative h-full w-[4px] z-10"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.18 0.02 60 / 0.6), oklch(0.28 0.04 45), oklch(0.18 0.02 60 / 0.6))",
                }}
              >
                <div
                  className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-px"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, oklch(0.78 0.13 75) 0 4px, transparent 4px 8px)",
                  }}
                />
              </div>

              {/* RIGHT static (next spread's left under the flipping page) */}
              <div className="relative h-full w-1/2 preserve-3d">
                {/* underlay: when flipping next, show next-left underneath */}
                {flipping === "next" && nextSpread && (
                  <div className="absolute inset-0">
                    <PageFace src={nextSpread[0]} side="left" />
                  </div>
                )}
                {flipping !== "next" && <PageFace src={cur[1]} side="right" />}

                {/* The flipping page — forward */}
                <AnimatePresence>
                  {flipping === "next" && (
                    <motion.div
                      key="flip-next"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: -180 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
                      className="absolute inset-0 preserve-3d"
                      style={{ transformOrigin: "left center" }}
                    >
                      <div className="absolute inset-0 backface-hidden">
                        <PageFace src={cur[1]} side="right" />
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 25%, oklch(1 0 0 / 0.22) 50%, transparent 75%)",
                          }}
                        />
                      </div>
                      <div
                        className="absolute inset-0 backface-hidden"
                        style={{ transform: "rotateY(180deg)" }}
                      >
                        {nextSpread && <PageFace src={nextSpread[0]} side="left" />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* The flipping page — backward (covers left side) */}
              <AnimatePresence>
                {flipping === "prev" && prevSpread && (
                  <motion.div
                    key="flip-prev"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 180 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute top-0 left-0 h-full w-1/2 preserve-3d"
                    style={{ transformOrigin: "right center" }}
                  >
                    <div className="absolute inset-0 backface-hidden">
                      <PageFace src={cur[0]} side="left" />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(-105deg, transparent 25%, oklch(1 0 0 / 0.22) 50%, transparent 75%)",
                        }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 backface-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <PageFace src={prevSpread[1]} side="right" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* click halves */}
            <button
              aria-label="Previous page"
              onClick={goPrev}
              disabled={!!flipping || spread === 0}
              className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize disabled:cursor-default"
            />
            <button
              aria-label="Next page"
              onClick={goNext}
              disabled={!!flipping || spread >= total - 1}
              className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize disabled:cursor-default"
            />
          </div>
        </div>

        {/* bottom controls */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 px-10">
          <div className="w-full max-w-md h-[2px] bg-[var(--champagne)]/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: "var(--gradient-gold-luxe)" }}
              animate={{ width: `${((spread + 1) / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            />
          </div>
          <div className="flex items-center gap-6">
            <motion.button
              onClick={goPrev}
              disabled={!!flipping || spread === 0}
              whileHover={{ x: -2, backgroundColor: "oklch(0.78 0.13 75 / 0.18)" }}
              className="grid h-11 w-11 place-items-center rounded-full text-[var(--champagne)] disabled:opacity-30"
              style={{ border: "1px solid oklch(0.78 0.13 75 / 0.55)" }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <div className="font-display tabular-nums text-[var(--champagne)]/70 text-sm">
              <span className="text-gradient-gold text-2xl mr-1">
                {String(spread + 1).padStart(2, "0")}
              </span>
              / {String(total).padStart(2, "0")}
            </div>
            <motion.button
              onClick={goNext}
              disabled={!!flipping || spread >= total - 1}
              whileHover={{ x: 2, backgroundColor: "oklch(0.78 0.13 75 / 0.18)" }}
              className="grid h-11 w-11 place-items-center rounded-full text-[var(--champagne)] disabled:opacity-30"
              style={{ border: "1px solid oklch(0.78 0.13 75 / 0.55)" }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--champagne)]/50">
            ← → Arrow keys · Esc to close
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
