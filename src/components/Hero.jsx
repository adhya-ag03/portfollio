"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { site } from "@/data";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";

const BlackHole = dynamic(() => import("./BlackHole"), { ssr: false });

const ArrowIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
});

export default function Hero() {
  const scrollTo = (hash) => (e) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden" aria-label="Introduction">
      <BlackHole />

      {/* Readability scrims over the shader */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/60 via-void/10 to-void" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_50%_52%,rgba(5,3,8,0.55),transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div {...fadeUp(2.1)} className="mb-8 flex justify-center">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-ink/85 sm:text-sm">
            <span className="relative inline-block h-2 w-2 rounded-full bg-green-400 ping-dot" />
            Open to opportunities
            <span className="h-3 w-px bg-ink/20" aria-hidden="true" />
            <span className="text-muted">{site.location}</span>
          </span>
        </motion.div>

        <h1 className="font-display text-5xl leading-tight font-bold uppercase sm:text-7xl md:text-8xl">
          <ScrambleText text="Adhya" as="span" className="glow-text block" startDelay={2200} />
          <ScrambleText text="Agarwal" as="span" className="gradient-text block" startDelay={2500} />
        </h1>

        <motion.p
          {...fadeUp(2.5)}
          className="mt-6 font-display text-lg font-medium tracking-wide text-ink drop-shadow-[0_2px_12px_rgba(5,3,8,0.9)] sm:text-2xl"
        >
          {site.title}
        </motion.p>

        <motion.p
          {...fadeUp(2.7)}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink/75 drop-shadow-[0_2px_10px_rgba(5,3,8,0.9)] sm:text-base"
        >
          {site.heroIntro}
        </motion.p>

        <motion.div {...fadeUp(2.9)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href="#projects"
              onClick={scrollTo("#projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-white"
            >
              View my work
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={scrollTo("#contact")}
              className="glass inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-ink/10"
            >
              Get in touch
            </a>
          </Magnetic>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Resume
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
