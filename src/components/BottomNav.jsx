import { FaHome, FaLayerGroup, FaLaptopCode, FaTags, FaEnvelope } from "react-icons/fa";
import useActiveSection from "./useActiveSection";

// Thumb-reach navigation for phones and tablets.
const TABS = [
  { id: "home", label: "Home", icon: FaHome },
  { id: "services", label: "Services", icon: FaLayerGroup },
  { id: "work", label: "Work", icon: FaLaptopCode },
  { id: "pricing", label: "Pricing", icon: FaTags },
  { id: "contact", label: "Contact", icon: FaEnvelope },
];

// Every section, so the closest tab stays highlighted while scrolling.
const IDS = ["home", "stack", "services", "industries", "work", "audit", "pricing", "process", "team", "hire", "faq", "contact"];
const TAB_FOR = { stack: "home", industries: "services", audit: "work", process: "pricing", team: "pricing", hire: "contact", faq: "contact" };

const BottomNav = () => {
  const active = useActiveSection(IDS);
  const current = TAB_FOR[active] || active;

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800 bg-neutral-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-md justify-around">
        {TABS.map(({ id, label, icon: Icon }) => {
          const on = current === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={on ? "page" : undefined}
              className={`flex min-w-[60px] flex-col items-center gap-1 py-2.5 text-[11px] transition-colors ${on ? "text-purple-300" : "text-neutral-500"}`}
            >
              <span className={`flex h-7 w-12 items-center justify-center rounded-full text-base transition ${on ? "bg-purple-500/20" : ""}`}>
                <Icon />
              </span>
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
