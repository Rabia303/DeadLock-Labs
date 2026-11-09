import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import Audit from "./components/Audit";
import BottomNav from "./components/BottomNav";
import { SITE } from "./config";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Services, Work, Process, Team, HireUs, Faq, FoundingOffer, Testimonials, Pricing, Industries, TechStrip } from "./components/Sections";
import { Contact, Footer } from "./components/Contact";

// Each section fades and slides in once as it scrolls into view.
const Section = ({ id, children, animate = true }) => (
  <section id={id} className="scroll-mt-20">
    {animate ? (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    ) : (
      children
    )}
  </section>
);

const App = () => {
  const [showTop, setShowTop] = useState(false);

  // Feed cursor position to the nearest .spotlight card
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="overflow-x-clip text-neutral-300 antialiased selection:bg-purple-400 selection:text-purple-950">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-5 pb-20 pt-20 sm:px-8 lg:pb-0">
        <Section id="home" animate={false}><Hero /></Section>
        <Section id="stack"><TechStrip /></Section>
        <Section id="services"><Services /></Section>
        <Section id="industries"><Industries /></Section>
        <Section id="work"><Work /></Section>
        <Section id="audit"><Audit /></Section>
        <Section id="reviews"><Testimonials /></Section>
        <Section id="pricing"><Pricing /></Section>
        <Section id="offer"><FoundingOffer /></Section>
        <Section id="process"><Process /></Section>
        <Section id="team"><Team /></Section>
        <Section id="hire"><HireUs /></Section>
        <Section id="faq"><Faq /></Section>
        <Section id="contact"><Contact /></Section>
        <Footer />
      </main>

      {showTop && (
        <a
          href="#home"
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-50 hidden h-11 w-11 items-center justify-center rounded-full bg-neutral-800 text-white shadow-lg transition hover:bg-purple-600 lg:flex"
        >
          <FaArrowUp />
        </a>
      )}
      <BottomNav />

      {SITE.whatsapp && (
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Deadlock Labs! I'd like to discuss a project.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-12 w-12 text-2xl lg:bottom-5 lg:right-5 lg:h-14 lg:w-14 lg:text-3xl items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
          <FaWhatsapp className="relative" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-neutral-900 opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
            Chat with us
          </span>
        </a>
      )}
    </div>
  );
};

export default App;
