import { useSyncExternalStore } from "react";

// Shared currency choice (PKR / USD) for Pricing and the contact form.
// Visitors in Pakistan default to PKR, everyone else to USD; the choice is remembered.
const KEY = "dl-currency";

const guess = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "PKR" || saved === "USD") return saved;
  } catch { /* storage unavailable */ }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Asia/Karachi") return "PKR";
  } catch { /* ignore */ }
  return "USD";
};

let current = typeof window === "undefined" ? "USD" : guess();
const listeners = new Set();

export const setCurrency = (c) => {
  current = c;
  try { localStorage.setItem(KEY, c); } catch { /* ignore */ }
  listeners.forEach((l) => l());
};

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const useCurrency = () => useSyncExternalStore(subscribe, () => current, () => current);

export default useCurrency;
