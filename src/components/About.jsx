import { site, about, experience } from "@/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Counter from "./Counter";

const STAT_ACCENTS = {
  cyan: { text: "text-cyan", border: "hover:border-cyan/50" },
  magenta: { text: "text-magenta", border: "hover:border-magenta/50" },
  violet: { text: "text-violet-soft", border: "hover:border-violet-soft/50" },
  blue: { text: "text-blue", border: "hover:border-blue/50" },
};

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-28 sm:px-6" aria-label="About me">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-core/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -left-28 h-80 w-80 rounded-full bg-cyan/5 blur-3xl" aria-hidden="true" />
      <SectionHeading title="About" subtitle="Who I am, what I build, and where I've been." />

      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Portrait + badge */}
        <Reveal>
          <div className="relative mx-auto w-fit lg:mx-0">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-core via-magenta to-violet-core opacity-60 blur-md" aria-hidden="true" />
            <img
              src="/IMG_2037.png"
              alt={`Portrait of ${site.name}`}
              width={300}
              height={360}
              className="relative h-[360px] w-[300px] rounded-3xl object-cover object-[50%_8%]"
            />
            <span className="glass absolute -bottom-4 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 font-mono text-xs tracking-wider text-ink uppercase">
              <span className="relative inline-block h-2 w-2 rounded-full bg-green-400 ping-dot" />
              {about.badge}
            </span>
          </div>
        </Reveal>

        <div>
          {/* Bio */}
          {about.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="mb-5 leading-relaxed text-muted">{para}</p>
            </Reveal>
          ))}

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div
                  className={`glass rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 ${
                    STAT_ACCENTS[stat.accent]?.border || "hover:border-violet-core/40"
                  }`}
                >
                  <div
                    className={`font-display text-2xl font-bold sm:text-3xl ${
                      STAT_ACCENTS[stat.accent]?.text || "gradient-text"
                    }`}
                  >
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <div className="mt-1.5 font-mono text-[11px] tracking-wider text-muted uppercase">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Work timeline */}
      <div className="mt-24">
        <Reveal>
          <h3 className="mb-10 font-display text-xl font-bold tracking-[0.2em] text-violet-soft uppercase">
            Experience
          </h3>
        </Reveal>

        <ol className="relative ml-3 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px before:bg-gradient-to-b before:from-violet-core before:via-magenta before:to-cyan/30">
          {experience.map((job, i) => (
            <li key={job.company} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
              <Reveal delay={i * 0.1}>
                {/* Timeline node */}
                <span
                  className={`absolute top-1 -left-[7px] h-3.5 w-3.5 rounded-full border-2 ${
                    job.current
                      ? "border-magenta bg-violet-core shadow-[0_0_14px_rgba(217,70,239,0.9)]"
                      : "border-edge bg-space"
                  }`}
                  style={{ left: "-7px" }}
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="font-display text-lg font-bold text-ink">
                    {job.role} <span className="text-violet-soft">@ {job.company}</span>
                  </h4>
                  {job.current && (
                    <span className="rounded-full border border-magenta/50 bg-magenta/10 px-3 py-0.5 font-mono text-[10px] tracking-widest text-magenta uppercase">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-xs tracking-wider text-muted uppercase">
                  {job.period} · {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-core" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
