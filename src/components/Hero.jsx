"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { site } from "@/data";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";

const BlackHole = dynamic(() => import("./BlackHole"), { ssr: false });

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
        <motion.p
          {...fadeUp(2.1)}
          className="mb-6 font-mono text-xs tracking-[0.35em] text-violet-soft uppercase drop-shadow-[0_2px_8px_rgba(5,3,8,0.9)] sm:text-sm"
        >
          {site.location}
        </motion.p>

        <h1 className="font-display text-5xl leading-tight font-bold uppercase sm:text-7xl md:text-8xl">
          <ScrambleText text="Adhya" as="span" className="glow-text block" startDelay={2200} />
          <ScrambleText text="Agarwal" as="span" className="gradient-text block" startDelay={2500} />
        </h1>

        <motion.p
          {...fadeUp(2.5)}
          className="mt-6 font-display text-lg tracking-[0.25em] text-ink uppercase drop-shadow-[0_2px_12px_rgba(5,3,8,0.9)] sm:text-2xl"
        >
          {site.title}
        </motion.p>

        <motion.p
          {...fadeUp(2.7)}
          className="mx-auto mt-5 max-w-2xl text-sm text-ink/85 drop-shadow-[0_2px_10px_rgba(5,3,8,0.9)] sm:text-base"
        >
          {site.heroIntro}
        </motion.p>

        <motion.div {...fadeUp(2.9)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#contact"
              onClick={scrollTo("#contact")}
              className="inline-block rounded-full bg-gradient-to-r from-violet-core to-magenta px-7 py-3 font-display text-sm font-semibold tracking-wider text-white uppercase shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-shadow hover:shadow-[0_0_48px_rgba(217,70,239,0.6)]"
            >
              Let&apos;s Connect
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#projects"
              onClick={scrollTo("#projects")}
              className="glass inline-block rounded-full px-7 py-3 font-display text-sm font-semibold tracking-wider text-ink uppercase transition-colors hover:border-violet-core/50 hover:text-violet-soft"
            >
              View Projects
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-ink/25 px-7 py-3 font-display text-sm font-semibold tracking-wider text-ink/85 uppercase transition-colors hover:border-cyan/60 hover:text-cyan"
            >
              Download Resume
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-violet-soft/40 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-violet-soft"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
