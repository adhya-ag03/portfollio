"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Floating "Tap to make contact!" badge: circular spinning text around a
 * pulsing core. Appears after scrolling past the hero; hides over the
 * contact section itself.
 */
export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8;
      const contact = document.getElementById("contact");
      const overContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.6
        : false;
      setShow(past && !overContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          onClick={go}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group fixed right-6 bottom-6 z-40 hidden h-24 w-24 items-center justify-center sm:flex"
          aria-label="Tap to make contact"
        >
          <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <path id="contact-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-violet-soft font-mono text-[10.5px] uppercase" style={{ letterSpacing: "2.5px" }}>
              <textPath href="#contact-circle">tap to make contact! · · ·</textPath>
            </text>
          </svg>
          <span className="glass flex h-11 w-11 items-center justify-center rounded-full transition-all group-hover:bg-violet-core/30 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-soft" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
