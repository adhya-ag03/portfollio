"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data";

/**
 * Page-load intro: letters of the name stagger in, then the curtain
 * slides up to reveal the hero.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduced ? 150 : 1900);
    return () => clearTimeout(t);
  }, []);

  const letters = site.name.split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-void"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <div className="font-display text-2xl font-bold tracking-[0.3em] uppercase sm:text-4xl">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                className={ch === " " ? "inline-block w-4" : "inline-block gradient-text"}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05, duration: 0.45, ease: "easeOut" }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="absolute bottom-16 h-px w-40 origin-left bg-gradient-to-r from-violet-core to-magenta"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
