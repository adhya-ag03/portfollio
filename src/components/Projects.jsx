"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects, projectFilters } from "@/data";
import SectionHeading from "./SectionHeading";

function TiltCard({ project }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced) return;
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    card.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 4}deg) rotateX(${(0.5 - py) * 4}deg)`;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt-card glass group flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-200 ease-out will-change-transform"
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.cover}
          alt={`${project.title} cover`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-violet-core/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span
          className={`glass absolute top-3 right-3 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest uppercase ${
            project.category === "AI/ML" ? "text-magenta" : "text-cyan"
          }`}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-ink group-hover:text-violet-soft">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{project.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <ul className="mt-4 flex-1 space-y-2">
          {project.points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-magenta" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-ink/85 transition-colors hover:border-white/25 hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-ink py-2.5 text-center text-sm font-semibold text-void transition-colors hover:bg-white"
          >
            Live demo
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-28 sm:px-6" aria-label="Projects">
      <div className="pointer-events-none absolute top-32 -left-32 h-96 w-96 rounded-full bg-magenta/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-24 h-96 w-96 rounded-full bg-blue/10 blur-3xl" aria-hidden="true" />
      <SectionHeading index="02" title="Projects" subtitle="Metric-driven work across AI/ML and the web." />

      {/* Filter tabs */}
      <div className="glass mb-12 inline-flex flex-wrap gap-1 rounded-full p-1" role="tablist" aria-label="Project filters">
        {projectFilters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              filter === f ? "text-void" : "text-muted hover:text-ink"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="project-tab"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
