import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGlobeAsia, FaCheckCircle, FaStar } from "react-icons/fa";
import { SITE, STATS, HERO, WORK } from "../config";

// Hero visual: a browser window cycling through recent projects, a phone
// mockup with a mobile app, and a small award badge.
const Showcase = () => {
  const slides = HERO.previews.map((s) => WORK.find((w) => w.slug === s)).filter((w) => w?.image);
  const phone = WORK.find((w) => w.slug === HERO.phone && w.isScreenshot);
  const phoneShot = phone ? phone.gallery[1] || phone.gallery[0] : null;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return null;
  const cur = slides[i];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative mx-auto w-full max-w-xl pb-10 pl-6 sm:pl-10 lg:max-w-none"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-purple-600/20 blur-3xl" />

      {/* Browser window */}
      <a href="#work" aria-label="See our work" className="block overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl shadow-purple-950/50">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="mx-auto w-1/2 truncate rounded-md bg-neutral-800 px-3 py-0.5 text-center text-[11px] text-neutral-400">
            {cur.title}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-neutral-950">
          <AnimatePresence mode="sync">
            <motion.img
              key={cur.slug}
              src={cur.image}
              alt={`${cur.title} preview`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </AnimatePresence>
        </div>
      </a>

      {/* Phone mockup */}
      {phoneShot && (
        <div className="absolute bottom-0 left-0 w-[22%] min-w-[84px] overflow-hidden rounded-[1.4rem] border-[5px] border-neutral-800 bg-black shadow-2xl shadow-black/70">
          <img src={phoneShot} alt={`${phone.title} app`} className="aspect-[9/19.5] w-full object-cover object-top" />
        </div>
      )}

      {/* Award badge, only while an award-recognised project is on screen */}
      <AnimatePresence>
        {cur.label && !cur.label.startsWith("Concept") && (
          <motion.div
            key={cur.slug}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute -top-4 right-3 flex items-center gap-2 rounded-full border border-amber-400/30 bg-neutral-900/90 px-3 py-1.5 text-xs text-amber-200 shadow-lg backdrop-blur"
          >
            <FaStar className="text-amber-400" /> {cur.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-1 right-0 flex gap-1.5">
          {slides.map((s, k) => (
            <button
              key={s.slug}
              onClick={() => setI(k)}
              aria-label={`Show ${s.title}`}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-purple-400" : "w-1.5 bg-neutral-600 hover:bg-neutral-400"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Hero = () => (
  <div className="border-b border-neutral-900 pb-16 pt-8 lg:pt-14">
    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
      <div className="text-center lg:text-left">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {HERO.eyebrow}
        </span>

        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl">
          {HERO.title}{" "}
          <span className="bg-gradient-to-r from-pink-300 via-slate-400 to-purple-500 bg-clip-text text-transparent">
            {HERO.highlight}
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-neutral-400 lg:mx-0">{HERO.text}</p>

        <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
          <a
            href="#contact"
            className="rounded-full bg-purple-600 px-7 py-3 font-medium text-white shadow-[0_0_30px_-6px_rgba(168,85,247,0.7)] transition hover:bg-purple-500"
          >
            Get a free quote
          </a>
          <a href="#work" className="rounded-full border border-neutral-700 px-7 py-3 font-medium text-white transition hover:border-purple-500">
            See our work
          </a>
        </div>

        <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-400 lg:justify-start">
          <li className="flex items-center gap-2"><FaGlobeAsia className="text-purple-400" /> {SITE.location}</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-400" /> Free consultation</li>
          <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-400" /> You own the code</li>
        </ul>
      </div>

      <Showcase />
    </div>

    <div className="mx-auto mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 text-center sm:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-4">
          <div className="text-2xl font-semibold text-white">{s.value}</div>
          <div className="text-xs text-neutral-400">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Hero;
