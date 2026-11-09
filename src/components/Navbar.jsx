import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import useActiveSection from "./useActiveSection";
import { SITE } from "../config";

export const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "pricing", label: "Pricing" },
  { id: "process", label: "Process" },
  { id: "team", label: "Team" },
  { id: "hire", label: "Hire Us" },
  { id: "faq", label: "FAQ" },
];

const IDS = ["home", ...NAV_LINKS.map((l) => l.id), "contact"];

const Navbar = () => {
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 300);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || open ? "border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-5 py-3 sm:px-8">
          <a href="#home" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Logo className="h-10 w-auto" />
            <span className="text-lg font-semibold tracking-tight text-white">{SITE.name}</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === id ? "bg-purple-500/20 text-purple-300" : "text-neutral-400 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-purple-600 px-5 py-2 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(168,85,247,0.7)] transition hover:bg-purple-500 sm:inline-flex"
            >
              Start a project
            </a>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-lg transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-8 pb-10 pt-20 [&>*:first-child]:mt-auto [&>*:last-child]:mb-auto">
          <div className="space-y-1">
            {NAV_LINKS.map(({ id, label }, i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-xl font-medium transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                } ${active === id ? "bg-purple-500/15 text-purple-300" : "text-white"}`}
              >
                {label}
                {active === id && <span className="h-2 w-2 rounded-full bg-purple-400" />}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mx-4 mt-8 flex items-center justify-center rounded-xl bg-purple-600 py-3.5 font-medium text-white"
          >
            Start a project
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
