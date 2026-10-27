"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

/**
 * Section heading: a small numbered label (the title) with a rule that
 * draws itself in on scroll, followed by the subtitle as the headline.
 */
export default function SectionHeading({ index, title, subtitle }) {
  return (
    <Reveal className="mb-14">
      <div className="mb-5 flex items-center gap-4 font-mono text-xs tracking-[0.25em] text-violet-soft uppercase">
        {index && <span className="text-muted">{index}</span>}
        <span>{title}</span>
        <motion.span
          className="h-px w-16 origin-left bg-gradient-to-r from-violet-core/80 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          aria-hidden="true"
        />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {subtitle || title}
      </h2>
    </Reveal>
  );
}
