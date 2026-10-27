"use client";

import { useState } from "react";
import { skillGroups } from "@/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/* Static class maps so Tailwind can see every class name */
const ACCENTS = {
  cyan: {
    dot: "bg-cyan",
    label: "text-cyan",
    icon: "text-cyan",
    chip: "hover:border-cyan/60 hover:shadow-[0_6px_28px_rgba(34,211,238,0.22)]",
  },
  magenta: {
    dot: "bg-magenta",
    label: "text-magenta",
    icon: "text-magenta",
    chip: "hover:border-magenta/60 hover:shadow-[0_6px_28px_rgba(217,70,239,0.22)]",
  },
  violet: {
    dot: "bg-violet-soft",
    label: "text-violet-soft",
    icon: "text-violet-soft",
    chip: "hover:border-violet-soft/60 hover:shadow-[0_6px_28px_rgba(167,139,250,0.25)]",
  },
  blue: {
    dot: "bg-blue",
    label: "text-blue",
    icon: "text-blue",
    chip: "hover:border-blue/60 hover:shadow-[0_6px_28px_rgba(96,165,250,0.22)]",
  },
  emerald: {
    dot: "bg-emerald",
    label: "text-emerald",
    icon: "text-emerald",
    chip: "hover:border-emerald/60 hover:shadow-[0_6px_28px_rgba(52,211,153,0.22)]",
  },
};

/* Inline stroke icons for skills without a brand logo */
const INLINE_ICONS = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 5.3 5.3 1.9-5.3 1.9L12 17.4l-1.9-5.3-5.3-1.9 5.3-1.9L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </>
  ),
  refresh: (
    <>
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.5 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.5 15" />
    </>
  ),
  terminal: (
    <>
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <path d="M12 4v4" />
      <circle cx="12" cy="3" r="1" />
      <path d="M9.5 12.5v1.5M14.5 12.5v1.5M9 16.5h6" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="19" r="2.2" />
      <circle cx="19" cy="19" r="2.2" />
      <path d="M12 7.2v4.3M12 11.5l-5.6 5.6M12 11.5l5.6 5.6" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M8.5 20h7" />
      <path d="M6 7h12M6 7L3.5 13M6 7l2.5 6M18 7l-2.5 6M18 7l2.5 6" />
      <path d="M3.5 13a2.5 2.5 0 0 0 5 0M15.5 13a2.5 2.5 0 0 0 5 0" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <path d="M7 21v-6M12 21V11M17 21V5" />
    </>
  ),
  checklist: (
    <>
      <path d="M3 5.5L4.5 7 7 4.5M3 12l1.5 1.5L7 11M3 18.5L4.5 20 7 17.5" />
      <path d="M10.5 6H21M10.5 12.5H21M10.5 19H21" />
    </>
  ),
  zap: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  cloud: <path d="M17.5 19a4.5 4.5 0 0 0 .4-9A7 7 0 0 0 4.3 12.7 3.5 3.5 0 0 0 6.5 19h11z" />,
  eye: (
    <>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  brain: (
    <>
      <path d="M12 3v18" />
      <path d="M12 3a3 3 0 0 0-3-0.5A3 3 0 0 0 7 5.3 3.2 3.2 0 0 0 4.6 9 3.2 3.2 0 0 0 4 14.4 3.2 3.2 0 0 0 7 19.3a3 3 0 0 0 5 .2" />
      <path d="M12 3a3 3 0 0 1 3-0.5A3 3 0 0 1 17 5.3 3.2 3.2 0 0 1 19.4 9a3.2 3.2 0 0 1 .6 5.4 3.2 3.2 0 0 1-3 4.9 3 3 0 0 1-5 .2" />
    </>
  ),
};

function SkillChip({ skill, accent }) {
  const [imgFailed, setImgFailed] = useState(false);
  const useInline = skill.svg || imgFailed;

  return (
    <div
      data-hover
      className={`group flex items-center gap-2.5 rounded-xl border border-edge bg-panel/60 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${accent.chip}`}
    >
      {useInline ? (
        <svg
          viewBox="0 0 24 24"
          width="19"
          height="19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 ${accent.icon}`}
          aria-hidden="true"
        >
          {INLINE_ICONS[skill.svg] || INLINE_ICONS.sparkles}
        </svg>
      ) : (
        <img
          src={`https://cdn.simple-icons.org/${skill.icon}${skill.color ? `/${skill.color}` : ""}`}
          alt=""
          width={19}
          height={19}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="h-[19px] w-[19px] shrink-0 transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <span className="text-sm font-medium whitespace-nowrap text-ink/85 group-hover:text-ink">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-28 sm:px-6" aria-label="Skills">
      <div className="pointer-events-none absolute top-24 -right-28 h-96 w-96 rounded-full bg-violet-core/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-10 -left-28 h-80 w-80 rounded-full bg-emerald/5 blur-3xl" aria-hidden="true" />
      <SectionHeading index="04" title="Skills" subtitle="The stack I think in." />

      <div className="space-y-10">
        {skillGroups.map((group, gi) => {
          const accent = ACCENTS[group.accent] || ACCENTS.violet;
          return (
            <Reveal key={group.group} delay={gi * 0.06}>
              <div className="glass rounded-2xl p-6 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${accent.dot}`} aria-hidden="true" />
                  <h3 className={`font-mono text-xs tracking-[0.3em] uppercase ${accent.label}`}>
                    {group.group}
                  </h3>
                  <span className="h-px flex-1 bg-edge/60" aria-hidden="true" />
                  <span className="font-mono text-[11px] text-muted">{group.items.length}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} accent={accent} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
