"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

/**
 * Uppercase section heading with an animated gradient rule that
 * draws itself in as the section scrolls into view.
 */
export default function SectionHeading({ title, subtitle }) {
  return (
    <Reveal className="mb-14">
      <h2 className="font-display text-3xl font-bold tracking-[0.18em] uppercase sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-xl text-muted">{subtitle}</p>}
      <motion.div
        className="mt-5 h-px w-32 origin-left bg-gradient-to-r from-violet-core via-magenta to-cyan"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
    </Reveal>
  );
}
