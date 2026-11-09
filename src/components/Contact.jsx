import { useState } from "react";
import { sendForm } from "./sendForm";
import { FaEnvelope, FaWhatsapp, FaPaperPlane, FaRegCopy, FaCheck, FaLinkedin, FaGithub, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { SiUpwork, SiFiverr } from "react-icons/si";
import Logo from "./Logo";
import { SITE, PROJECT_TYPES, BUDGETS, PLATFORMS } from "../config";
import useCurrency from "./useCurrency";

const input =
  "w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-purple-500";

// Shows the result of a form submission.
export const FormStatus = ({ status }) => {
  if (status === "sent") return <p className="flex items-center gap-2 text-sm text-emerald-400"><FaCheckCircle /> Thanks! We've got your message and will reply within 24 hours.</p>;
  if (status === "error") return <p className="flex items-center gap-2 text-sm text-amber-400"><FaExclamationTriangle /> Something went wrong. Please email or WhatsApp us instead.</p>;
  return null;
};

// Sends via Web3Forms when a key is set in config.js, otherwise opens the visitor's email app.
export const Contact = () => {
  const cur = useCurrency();
  const budgets = BUDGETS[cur] || BUDGETS.USD;
  const [form, setForm] = useState({ name: "", email: "", type: PROJECT_TYPES[0], budget: "Not sure yet", message: "" });
  const [copied, setCopied] = useState("");
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await sendForm(`New project: ${form.type} — ${form.name}`, {
        Name: form.name, Email: form.email, "Project type": form.type, Budget: form.budget, Message: form.message,
      });
      setStatus(r);
      if (r === "sent") setForm((f) => ({ ...f, name: "", email: "", message: "" }));
    } catch {
      setStatus("error");
    }
  };

  const copy = async (address) => {
    try { await navigator.clipboard.writeText(address); } catch { /* ignore */ }
    setCopied(address);
    setTimeout(() => setCopied(""), 2000);
  };
  const emails = [SITE.email, SITE.ccEmail].filter(Boolean);

  return (
    <div className="py-20">
      <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">Contact</p>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Let's build your idea</h2>
            <p className="mb-8 text-neutral-400">
              Tell us what you're building. We'll reply within 24 hours with questions or a quote, and set up a free call if it helps.
            </p>

            <div className="space-y-3">
              {emails.map((address) => (
                <button key={address} onClick={() => copy(address)} className="flex w-full items-center gap-3 rounded-xl border border-neutral-800 px-4 py-3 text-left text-sm text-neutral-300 transition hover:border-purple-500">
                  <FaEnvelope className="shrink-0 text-purple-400" />
                  <span className="min-w-0 flex-1 truncate">{address}</span>
                  <span className={`inline-flex shrink-0 items-center gap-1 text-xs ${copied === address ? "text-emerald-400" : "text-purple-400"}`}>
                    {copied === address ? <><FaCheck /> Copied</> : <><FaRegCopy /> Copy</>}
                  </span>
                </button>
              ))}
              {SITE.whatsapp && (
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-neutral-800 px-4 py-3 text-sm text-neutral-300 transition hover:border-emerald-500">
                  <FaWhatsapp className="text-emerald-400" /> Chat on WhatsApp
                </a>
              )}
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required className={input} placeholder="Your name" value={form.name} onChange={set("name")} aria-label="Your name" />
              <input required type="email" className={input} placeholder="Your email" value={form.email} onChange={set("email")} aria-label="Your email" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <select className={input} value={form.type} onChange={set("type")} aria-label="Project type">
                {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select className={input} value={form.budget} onChange={set("budget")} aria-label="Budget">
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <textarea required rows={5} className={input} placeholder="What are you building? Who is it for, and what should it do?" value={form.message} onChange={set("message")} aria-label="Project details" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <button type="submit" disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-3.5 font-medium text-white shadow-[0_0_30px_-6px_rgba(168,85,247,0.7)] transition hover:bg-purple-500 disabled:opacity-60 sm:w-auto">
                <FaPaperPlane /> {status === "sending" ? "Sending…" : "Send project details"}
              </button>
              <FormStatus status={status} />
            </div>
            <p className="text-xs text-neutral-500">By sending this form you agree to our <a href="/privacy.html" className="underline hover:text-neutral-300">privacy policy</a>.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const upwork = PLATFORMS.find((p) => p.id === "upwork")?.url;
  const fiverr = PLATFORMS.find((p) => p.id === "fiverr")?.url;
  const socials = [
    { href: upwork, icon: SiUpwork, label: "Upwork" },
    { href: fiverr, icon: SiFiverr, label: "Fiverr" },
    { href: SITE.linkedin, icon: FaLinkedin, label: "LinkedIn" },
    { href: SITE.github, icon: FaGithub, label: "GitHub" },
  ].filter((s) => s.href);

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-neutral-900 py-10 text-sm text-neutral-500 sm:flex-row">
      <div className="flex items-center gap-2.5">
        <Logo className="h-9 w-auto" />
        <div className="leading-tight">
          <div className="text-neutral-300">{SITE.name}</div>
          {SITE.slogan && <div className="text-xs text-neutral-500">{SITE.slogan}</div>}
        </div>
      </div>
      <div className="flex items-center gap-4 text-lg">
        {socials.map(({ href, icon: Icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition hover:text-white">
            <Icon />
          </a>
        ))}
      </div>
      <p className="text-center sm:text-right">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        <a href="/privacy.html" className="ml-3 underline-offset-4 hover:text-white hover:underline">Privacy</a>
      </p>
    </footer>
  );
};
