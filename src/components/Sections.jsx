import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCode, FaMobileAlt, FaRobot, FaServer, FaCogs, FaShoppingCart,
  FaLinkedin, FaEnvelope, FaArrowRight, FaPlus, FaMinus, FaHandshake, FaStar, FaExternalLinkAlt, FaCheck, FaQuoteLeft, FaGift, FaTimes, FaChevronLeft, FaChevronRight, FaImages,
} from "react-icons/fa";
import {
  SiUpwork, SiFiverr, SiReact, SiAngular, SiNodedotjs, SiExpress, SiDotnet, SiFlutter, SiDart, SiFirebase, SiMongodb,
  SiMysql, SiPython, SiFlask, SiGooglegemini, SiOpenai, SiTailwindcss, SiShopify, SiWordpress, SiFigma,
} from "react-icons/si";
import { FaUtensils, FaHeartbeat, FaTshirt, FaHome, FaGraduationCap, FaRocket, FaHandHoldingHeart, FaTruck, FaClock } from "react-icons/fa";
import useCurrency, { setCurrency } from "./useCurrency";
import SectionHeading from "./SectionHeading";
import { SERVICES, WORK, WORK_FILTERS, PROCESS, TEAM, WHY_US, PLATFORMS, FAQ, FOUNDING_OFFER, TESTIMONIALS, PACKAGES, CUSTOM_PRICING, INCLUDED, CURRENCIES, INDUSTRIES, TECH } from "../config";

const card =
  "spotlight rounded-2xl border border-neutral-800 bg-neutral-900/60 transition hover:border-purple-500/40 hover:shadow-[0_0_40px_-12px_rgba(168,85,247,0.45)]";
const chip = "rounded bg-neutral-800 px-2 py-0.5 text-xs text-purple-400";

const SERVICE_ICONS = { web: FaCode, mobile: FaMobileAlt, ai: FaRobot, api: FaServer, automation: FaCogs, shop: FaShoppingCart };

export const Services = () => (
  <div className="py-14 sm:py-20">
    <SectionHeading eyebrow="What we do" title="Services" subtitle="From first idea to launch — one team covering backend, frontend, mobile and AI." />
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
      {SERVICES.map((s) => {
        const Icon = SERVICE_ICONS[s.icon] || FaCode;
        return (
          <div key={s.title} className={`${card} flex w-[82%] shrink-0 snap-center flex-col p-6 sm:w-auto`}>
            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-lg text-purple-300">
              <Icon />
            </span>
            <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">{s.text}</p>
            <div className="mt-auto hidden flex-wrap gap-1.5 sm:flex">
              {s.stack.map((t) => <span key={t} className={chip}>{t}</span>)}
            </div>
          </div>
        );
      })}
    </div>
    <p className="mt-1 text-center text-xs text-neutral-500 sm:hidden">Swipe to see more →</p>
  </div>
);

const INITIAL_WORK = 9;
const INITIAL_WORK_MOBILE = 4;

// Card image. Screenshots sit in a browser frame on a soft gradient and scroll on hover;
// phone screenshots are shown uncropped; placeholders fill the frame.
const WorkImage = ({ w }) => {
  if (!w.isScreenshot) {
    return (
      <div className="aspect-[16/10] overflow-hidden bg-neutral-950">
        <img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-purple-900/40 via-neutral-900 to-indigo-950/50">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />
      {w.device === "mobile" ? (
        <img src={w.image} alt={w.title} loading="lazy" className="relative h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-x-5 bottom-0 top-5 flex flex-col overflow-hidden rounded-t-lg border border-b-0 border-white/10 bg-neutral-900 shadow-2xl shadow-black/60 transition-transform duration-500 group-hover:-translate-y-1">
          <div className="flex shrink-0 items-center gap-1 border-b border-white/5 bg-neutral-900 px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          </div>
          <img
            src={w.image}
            alt={w.title}
            loading="lazy"
            className="min-h-0 w-full flex-1 object-cover object-top transition-[object-position] duration-[4000ms] ease-in-out group-hover:object-bottom"
          />
        </div>
      )}
    </div>
  );
};

// Project popup: full description plus a screenshot gallery (arrows, thumbnails, keyboard).
const ProjectModal = ({ w, onClose }) => {
  const [i, setI] = useState(0);
  const shots = w.gallery.length ? w.gallery : [w.image];
  const mobile = w.device === "mobile";
  const go = (d) => setI((n) => (n + d + shots.length) % shots.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  });

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={w.title}
    >
      <motion.div
        className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-neutral-800 bg-neutral-950 sm:rounded-3xl"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-purple-600">
          <FaTimes />
        </button>

        <div className="overflow-y-auto">
          {/* Viewer: desktop screenshots scroll inside the frame; phone screens fit the height */}
          <div className="relative bg-neutral-900">
            {mobile ? (
              <div className="relative h-[60vh] overflow-hidden sm:h-[64vh]">
                <img src={shots[i]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl" />
                <img key={shots[i]} src={shots[i]} alt={`${w.title} screenshot ${i + 1}`} className="relative mx-auto h-full w-auto object-contain py-5" />
              </div>
            ) : (
              <div key={shots[i]} className="max-h-[64vh] overflow-y-auto">
                <img src={shots[i]} alt={`${w.title} screenshot ${i + 1}`} className="block w-full" />
              </div>
            )}
            {shots.length > 1 && (
              <>
                <button onClick={() => go(-1)} aria-label="Previous screenshot" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-purple-600">
                  <FaChevronLeft />
                </button>
                <button onClick={() => go(1)} aria-label="Next screenshot" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-purple-600">
                  <FaChevronRight />
                </button>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">{i + 1} / {shots.length}</span>
              </>
            )}
          </div>

          {shots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-b border-neutral-800 bg-neutral-950 px-5 py-3 [scrollbar-width:thin]">
              {shots.map((src, k) => (
                <button
                  key={src}
                  onClick={() => setI(k)}
                  aria-label={`Show screenshot ${k + 1}`}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${k === i ? "border-purple-500" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={src} alt="" className={`${mobile ? "h-20 w-10" : "h-14 w-24"} object-cover object-top`} loading="lazy" />
                </button>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-xs text-purple-300">{w.category}</span>
                {w.label && <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs text-amber-300"><FaStar className="text-[10px]" /> {w.label}</span>}
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{w.title}</h3>
              <p className="max-w-2xl leading-relaxed text-neutral-400">{w.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{w.stack.map((t) => <span key={t} className={chip}>{t}</span>)}</div>

              {w.caseStudy && (
                <div className="mt-8 grid gap-6 border-t border-neutral-800 pt-7 lg:grid-cols-3">
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">The challenge</h4>
                    <p className="text-sm leading-relaxed text-neutral-400">{w.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">What we built</h4>
                    <p className="text-sm leading-relaxed text-neutral-400">{w.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Results</h4>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      {w.caseStudy.results.map((r) => (
                        <li key={r} className="flex gap-2"><FaCheck className="mt-1 shrink-0 text-xs text-emerald-400" /> {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              {w.demo && (
                <a href={w.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-sm text-white transition hover:border-purple-500">
                  View live demo <FaExternalLinkAlt className="text-xs" />
                </a>
              )}
              <a href="#contact" onClick={onClose} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500">
                Build something similar <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Work = () => {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(null);
  const filtered = filter === "All" ? WORK : WORK.filter((w) => w.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_WORK);

  return (
    <div className="py-14 sm:py-20">
      <SectionHeading eyebrow="Selected work" title="Projects we've delivered" subtitle="Websites, business systems, AI products and mobile apps, from small business sites to platforms handling 100K+ records." />

      <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none]">
        {WORK_FILTERS.map((f) => {
          const count = f === "All" ? WORK.length : WORK.filter((w) => w.category === f).length;
          if (!count) return null;
          return (
            <button
              key={f}
              onClick={() => { setFilter(f); setShowAll(false); }}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${
                filter === f ? "bg-purple-600 text-white" : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              {f} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {visible.map((w, idx) => (
          <div
            key={w.slug}
            role="button"
            tabIndex={0}
            onClick={() => setOpen(w)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen(w))}
            className={`${card} group cursor-pointer flex-col overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${!showAll && idx >= INITIAL_WORK_MOBILE ? "hidden sm:flex" : "flex"}`}
          >
            <div className="relative">
              <WorkImage w={w} />
              {w.gallery.length > 1 && (
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white backdrop-blur">
                  <FaImages /> {w.gallery.length}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-xs text-purple-300">{w.category}</span>
                {w.label && (w.label.startsWith("Concept demo") ? (
                  <span className="rounded-full border border-neutral-700 px-2.5 py-0.5 text-xs text-neutral-300">{w.label}</span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs text-amber-300">
                    <FaStar className="text-[10px]" /> {w.label}
                  </span>
                ))}
              </div>
              <h3 className="mb-2 font-semibold text-white">{w.title}</h3>
              <p className="mb-4 line-clamp-2 text-sm text-neutral-400 sm:line-clamp-none">{w.summary}</p>
              <div className="mt-auto hidden flex-wrap items-center gap-1.5 sm:flex">
                {w.stack.map((t) => <span key={t} className={chip}>{t}</span>)}
              </div>
              <span className="mt-4 inline-flex w-fit items-center gap-2 text-sm text-purple-300 transition group-hover:gap-3">
                {w.caseStudy ? "Read case study" : "View project"} <FaArrowRight className="text-xs" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length > INITIAL_WORK_MOBILE && (
        <div className={`mt-10 text-center ${filtered.length > INITIAL_WORK ? "" : "sm:hidden"}`}>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full border border-purple-500/50 px-6 py-2.5 text-sm text-purple-300 transition hover:bg-purple-500/10"
          >
            {showAll ? "Show fewer" : `Show all ${filtered.length} projects`}
          </button>
        </div>
      )}

      <AnimatePresence>{open && <ProjectModal w={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
};

export const Process = () => (
  <div className="py-14 sm:py-20">
    <SectionHeading eyebrow="How we work" title="Process" subtitle="Simple, transparent and built around regular check-ins with you." />
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {PROCESS.map((p, i) => (
        <div key={p.title} className={`${card} p-4 sm:p-6`}>
          <div className="mb-3 bg-gradient-to-r from-pink-300 to-purple-500 bg-clip-text text-3xl font-bold text-transparent sm:mb-4 sm:text-4xl">
            0{i + 1}
          </div>
          <h3 className="mb-1.5 font-semibold text-white sm:mb-2 sm:text-lg">{p.title}</h3>
          <p className="line-clamp-3 text-xs leading-relaxed text-neutral-400 sm:line-clamp-none sm:text-sm">{p.text}</p>
        </div>
      ))}
    </div>

    <div className="mt-14 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      {WHY_US.map((w) => (
        <div key={w.title} className="border-l-2 border-purple-500/60 pl-4">
          <h4 className="mb-1 font-medium text-white">{w.title}</h4>
          <p className="text-sm text-neutral-400">{w.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Team = () => (
  <div className="py-14 sm:py-20">
    <SectionHeading eyebrow="Who you'll work with" title="The Team" subtitle="No middlemen. You talk directly to the engineers building your product." />
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      {TEAM.map((m) => (
        <div key={m.name} className={`${card} p-7`}>
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-purple-600 text-xl font-bold text-white">
              {m.initials}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{m.name}</h3>
              <p className="text-sm text-purple-300">{m.role}</p>
            </div>
          </div>
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-neutral-400 sm:line-clamp-none">{m.bio}</p>
          <div className="mb-5 hidden flex-wrap gap-1.5 sm:flex">
            {m.skills.map((s) => <span key={s} className={chip}>{s}</span>)}
          </div>
          <div className="flex gap-3">
            {m.links.linkedin && (
              <a href={m.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 transition hover:border-purple-500 hover:text-white">
                <FaLinkedin /> LinkedIn
              </a>
            )}
            {m.links.email && (
              <a href={`mailto:${m.links.email}`} className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 transition hover:border-purple-500 hover:text-white">
                <FaEnvelope /> Email
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PLATFORM_ICONS = { upwork: SiUpwork, fiverr: SiFiverr, direct: FaHandshake };

export const HireUs = () => (
  <div className="py-14 sm:py-20">
    <SectionHeading eyebrow="Hire us" title="Work with us your way" subtitle="Hire us through the platform you trust, or come to us directly." />
    <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
      {PLATFORMS.map((p) => {
        const Icon = PLATFORM_ICONS[p.id] || FaHandshake;
        const live = Boolean(p.url);
        const external = live && p.url.startsWith("http");
        return (
          <div key={p.id} className={`${card} grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 p-5 sm:flex sm:flex-col sm:items-stretch sm:p-7 ${p.id === "direct" ? "border-purple-500/40" : ""}`}>
            <span className="row-span-2 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-2xl text-white sm:mb-5">
              <Icon />
            </span>
            <h3 className="text-lg font-semibold text-white sm:mb-2">{p.name}</h3>
            <p className="mb-6 hidden text-sm text-neutral-400 sm:block">{p.blurb}</p>
            {live ? (
              <a
                href={p.url}
                target={external ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition sm:mt-auto sm:px-5 sm:py-2 ${
                  p.id === "direct" ? "bg-purple-600 text-white hover:bg-purple-500" : "border border-neutral-700 text-white hover:border-purple-500"
                }`}
              >
                {p.id === "direct" ? "Get a quote" : `View on ${p.name}`} <FaArrowRight className="text-xs" />
              </a>
            ) : (
              <span className="mt-auto w-fit rounded-full border border-dashed border-neutral-700 px-4 py-2 text-sm text-neutral-500">
                Profile coming soon
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export const Faq = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="py-14 sm:py-20">
      <SectionHeading eyebrow="Questions" title="FAQ" />
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-2xl border border-neutral-800 bg-neutral-900/60">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-white"
                aria-expanded={isOpen}
              >
                {f.q}
                <span className="shrink-0 text-purple-400">{isOpen ? <FaMinus /> : <FaPlus />}</span>
              </button>
              {isOpen && <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-400">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Founding client offer: shown while FOUNDING_OFFER.enabled is true.
export const FoundingOffer = () => {
  if (!FOUNDING_OFFER.enabled) return null;
  const o = FOUNDING_OFFER;
  return (
    <div className="py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-950/60 via-neutral-900 to-pink-950/30 p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/15 px-3 py-1 text-sm text-purple-300">
              <FaGift /> {o.eyebrow}
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{o.title}</h2>
            <p className="max-w-xl leading-relaxed text-neutral-400">{o.text}</p>
          </div>
          <div>
            <ul className="mb-7 space-y-3">
              {o.perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-neutral-200">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs text-white"><FaCheck /></span>
                  {p}
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3 font-medium text-white shadow-[0_0_30px_-6px_rgba(168,85,247,0.7)] transition hover:bg-purple-500">
              {o.cta} <FaArrowRight className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Client reviews: hidden until TESTIMONIALS has entries.
export const Testimonials = () => {
  if (!TESTIMONIALS.length) return null;
  return (
    <div className="py-14 sm:py-20">
      <SectionHeading eyebrow="Client reviews" title="What clients say" subtitle="Real feedback from people we've built for." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name + t.quote.slice(0, 12)} className={`${card} flex flex-col p-7`}>
            <FaQuoteLeft className="mb-4 text-2xl text-purple-500/60" />
            <blockquote className="mb-6 flex-1 leading-relaxed text-neutral-300">{t.quote}</blockquote>
            <figcaption>
              <div className="font-semibold text-white">{t.name}</div>
              <div className="text-sm text-neutral-400">{[t.role, t.project].filter(Boolean).join(" · ")}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

// ── Tech stack strip ─────────────────────────────────────────
const TECH_ICONS = {
  React: SiReact, Angular: SiAngular, "Node.js": SiNodedotjs, Express: SiExpress, ".NET": SiDotnet, Flutter: SiFlutter,
  Dart: SiDart, Firebase: SiFirebase, MongoDB: SiMongodb, MySQL: SiMysql, Python: SiPython, Flask: SiFlask,
  Gemini: SiGooglegemini, OpenAI: SiOpenai, Tailwind: SiTailwindcss, Shopify: SiShopify, WordPress: SiWordpress, Figma: SiFigma,
};

export const TechStrip = () => {
  const items = TECH.filter((t) => TECH_ICONS[t]);
  const row = (hidden) => (
    <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] gap-12 pr-12" aria-hidden={hidden || undefined}>
      {items.map((t) => {
        const Icon = TECH_ICONS[t];
        return (
          <span key={t} className="flex items-center gap-2.5 whitespace-nowrap text-neutral-500 transition hover:text-white">
            <Icon className="text-2xl" /> <span className="text-sm">{t}</span>
          </span>
        );
      })}
    </div>
  );
  return (
    <div className="py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">Built with modern, reliable technology</p>
      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

// ── Industries ───────────────────────────────────────────────
const INDUSTRY_ICONS = { food: FaUtensils, health: FaHeartbeat, shop: FaTshirt, home: FaHome, school: FaGraduationCap, rocket: FaRocket, heart: FaHandHoldingHeart, truck: FaTruck };

export const Industries = () => (
  <div className="py-14 sm:py-20">
    <SectionHeading eyebrow="Who we help" title="Built for your industry" subtitle="Whatever your business, we know what your customers expect to find on your website." />
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {INDUSTRIES.map((i) => {
        const Icon = INDUSTRY_ICONS[i.icon] || FaRocket;
        return (
          <div key={i.name} className={`${card} p-4 sm:p-6`}>
            <span className="mb-3 flex h-10 w-10 sm:mb-4 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 text-lg text-purple-300">
              <Icon />
            </span>
            <h3 className="mb-1 text-sm font-semibold text-white sm:text-base">{i.name}</h3>
            <p className="hidden text-sm text-neutral-400 sm:block">{i.text}</p>
          </div>
        );
      })}
    </div>
  </div>
);

// ── Pricing ──────────────────────────────────────────────────
export const CurrencyToggle = () => {
  const cur = useCurrency();
  return (
    <div className="inline-flex rounded-full border border-neutral-800 bg-neutral-900/80 p-1 text-sm">
      {Object.keys(CURRENCIES).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`rounded-full px-4 py-1.5 transition ${cur === c ? "bg-purple-600 text-white" : "text-neutral-400 hover:text-white"}`}
        >
          {c === "PKR" ? "PKR (Rs)" : "USD ($)"}
        </button>
      ))}
    </div>
  );
};

export const Pricing = () => {
  const cur = useCurrency();
  return (
    <div className="py-14 sm:py-20">
      <SectionHeading eyebrow="Pricing" title="Simple, honest pricing" subtitle="Starting prices for the most common projects. You get a fixed quote after a free call, with no hidden costs." />
      <div className="mb-10 flex justify-center"><CurrencyToggle /></div>

      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
        {PACKAGES.map((p) => (
          <div
            key={p.name}
            className={`${card} relative flex w-[85%] shrink-0 snap-center flex-col p-6 sm:w-[60%] sm:p-7 lg:w-auto ${p.popular ? "border-purple-500/60 bg-gradient-to-b from-purple-950/40 to-neutral-900/60 lg:-translate-y-3" : ""}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 text-xs font-medium text-white">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            <p className="mb-5 mt-1 text-sm text-neutral-400">{p.for}</p>
            <div className="mb-1 text-sm text-neutral-500">Starting from</div>
            <div className="mb-2 text-4xl font-bold tracking-tight text-white">{p.price[cur]}</div>
            <div className="mb-6 flex items-center gap-2 text-sm text-neutral-400"><FaClock className="text-purple-400" /> {p.time}</div>
            <ul className="mb-8 space-y-2.5 text-sm text-neutral-300">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5"><FaCheck className="mt-1 shrink-0 text-xs text-purple-400" /> {f}</li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-auto rounded-full px-6 py-3 text-center text-sm font-medium transition ${p.popular ? "bg-purple-600 text-white hover:bg-purple-500" : "border border-neutral-700 text-white hover:border-purple-500"}`}
            >
              Get started
            </a>
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-neutral-500 lg:hidden">Swipe to compare packages →</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className={`${card} p-7`}>
          <h3 className="mb-4 font-semibold text-white">Bigger projects</h3>
          <ul className="divide-y divide-neutral-800">
            {CUSTOM_PRICING.map((c) => (
              <li key={c.name} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-neutral-300">{c.name}</span>
                <span className="whitespace-nowrap font-medium text-purple-300">{c.price[cur]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} p-7`}>
          <h3 className="mb-4 font-semibold text-white">Included in every project</h3>
          <ul className="grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
            {INCLUDED.map((i) => (
              <li key={i} className="flex gap-2.5"><FaCheck className="mt-1 shrink-0 text-xs text-emerald-400" /> {i}</li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-neutral-500">Domain, hosting and paid plugins are billed at cost and stay in your name.</p>
        </div>
      </div>
    </div>
  );
};
