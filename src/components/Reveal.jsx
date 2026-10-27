"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered fade-up reveal. Wrap any block; `delay` staggers siblings.
 */
export default function Reveal({ children, delay = 0, y = 32, className = "", once = true }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
