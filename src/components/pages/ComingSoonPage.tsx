import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  body?: string;
};

export function ComingSoonPage({ title, subtitle, body }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs tracking-[0.4em] text-gold uppercase mb-4">Shivers</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink">{title}</h1>
        {subtitle && <p className="mt-4 text-base text-ink-soft">{subtitle}</p>}
        {body && <p className="mt-6 text-sm text-ink-soft leading-relaxed">{body}</p>}
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-card hover:shadow-luxury hover:-translate-y-0.5 transition-all"
        >
          Back to Home
        </a>
      </motion.div>
    </section>
  );
}
