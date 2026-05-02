type LogoProps = {
  variant?: "default" | "light";
  showTag?: boolean;
};

export function Logo({ variant = "default", showTag = false }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-ink";
  const sub = variant === "light" ? "text-white/70" : "text-ink-soft";

  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 text-gold"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M20 4 L22 18 L36 20 L22 22 L20 36 L18 22 L4 20 L18 18 Z" fill="currentColor" fillOpacity="0.15" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
        </g>
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-semibold tracking-[0.18em] ${text}`}>
          SHIVERS
        </span>
        <span className={`mt-0.5 text-[9px] tracking-[0.35em] uppercase ${sub}`}>
          Oasis of Luxury
        </span>
        {showTag && (
          <span className={`mt-2 text-xs ${sub} tracking-normal normal-case`}>
            Stay. Dine. Celebrate.
            <br />
            The Shivers Experience.
          </span>
        )}
      </div>
    </div>
  );
}
