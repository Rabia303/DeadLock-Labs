import { useState } from "react";
import { FaSearch, FaCheck, FaPaperPlane } from "react-icons/fa";
import { AUDIT } from "../config";
import { sendForm } from "./sendForm";
import { FormStatus } from "./Contact";

const input =
  "w-full rounded-xl border border-neutral-800 bg-neutral-950/70 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-purple-500";

// Lead magnet: visitors submit their website for a free review.
const Audit = () => {
  const [form, setForm] = useState({ website: "", name: "", email: "", business: "" });
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!AUDIT.enabled) return null;

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await sendForm(`Free website audit request — ${form.website}`, {
        Website: form.website, Name: form.name, Email: form.email, Business: form.business || "Not given",
      });
      setStatus(r);
      if (r === "sent") setForm({ website: "", name: "", email: "", business: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/50 via-neutral-900 to-pink-950/30 p-7 sm:p-12">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/15 px-3 py-1 text-sm text-purple-300">
              <FaSearch className="text-xs" /> {AUDIT.eyebrow}
            </span>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">{AUDIT.title}</h2>
            <p className="leading-relaxed text-neutral-400 sm:hidden">{AUDIT.short}</p>
            <p className="mb-6 hidden leading-relaxed text-neutral-400 sm:block">{AUDIT.text}</p>
            <ul className="hidden gap-2.5 text-sm text-neutral-300 sm:grid sm:grid-cols-2">
              {AUDIT.checks.map((c) => (
                <li key={c} className="flex items-center gap-2.5"><FaCheck className="shrink-0 text-xs text-purple-400" /> {c}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={submit} className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 sm:p-6">
            <input required type="text" inputMode="url" className={input} placeholder="Your website, e.g. mybusiness.com" value={form.website} onChange={set("website")} aria-label="Website address" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input required className={input} placeholder="Your name" value={form.name} onChange={set("name")} aria-label="Your name" />
              <input required type="email" className={input} placeholder="Your email" value={form.email} onChange={set("email")} aria-label="Your email" />
            </div>
            <input className={input} placeholder="Type of business (optional)" value={form.business} onChange={set("business")} aria-label="Type of business" />
            <button type="submit" disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-medium text-white shadow-[0_0_30px_-6px_rgba(168,85,247,0.7)] transition hover:bg-purple-500 disabled:opacity-60">
              <FaPaperPlane /> {status === "sending" ? "Sending…" : "Get my free audit"}
            </button>
            <FormStatus status={status} />
            <p className="text-center text-xs text-neutral-500">No spam, ever. See our <a href="/privacy.html" className="underline hover:text-neutral-300">privacy policy</a>.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Audit;
