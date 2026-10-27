"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Floating "Let's talk" pill. Appears after scrolling past the hero;
 * hides over the contact section itself.
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="glass fixed right-6 bottom-6 z-40 hidden items-center gap-2 rounded-full py-2.5 pr-5 pl-4 text-sm font-medium text-ink shadow-[0_8px_32px_rgba(5,3,8,0.6)] transition-colors hover:border-violet-soft/40 hover:bg-violet-core/15 sm:flex"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-soft" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
            <path d="m22 6-10 7L2 6" />
          </svg>
          Let&apos;s talk
        </motion.a>
      )}
    </AnimatePresence>
  );
}
