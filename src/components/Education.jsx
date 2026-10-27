import { education } from "@/data";
import SectionHeading from "./SectionHeading";

function Card({ item }) {
  return (
    <div className="glass w-80 shrink-0 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-core/40 hover:shadow-[0_8px_32px_rgba(139,92,246,0.18)]">
      <span
        className={`rounded-full px-3 py-1 font-mono text-[10px] tracking-widest uppercase ${
          item.type === "Education"
            ? "border border-magenta/50 bg-magenta/10 text-magenta"
            : "border border-cyan/40 bg-cyan/10 text-cyan"
        }`}
      >
        {item.type}
      </span>
      <h3 className="mt-4 font-display text-lg leading-snug font-bold text-ink">{item.title}</h3>
      <p className="mt-1.5 text-sm text-violet-soft">{item.org}</p>
      <p className="mt-2 font-mono text-xs tracking-wider text-muted">{item.detail}</p>
    </div>
  );
}

/**
 * Auto-scrolling marquee of education + certification cards.
 * The track is duplicated for a seamless loop; pauses on hover.
 */
export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-28" aria-label="Education and certifications">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="03" title="Education & Certs" subtitle="Academic foundation and continuous learning." />
      </div>

      <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-6 pr-6">
          {[...education, ...education].map((item, i) => (
            <Card key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
