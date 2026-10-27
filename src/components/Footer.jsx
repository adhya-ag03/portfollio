import { site, navLinks } from "@/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-edge/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#hero" className="font-display text-2xl font-bold tracking-widest" aria-label="Back to top">
              <span className="gradient-text">{site.logo}</span>
              <span className="text-violet-soft">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-violet-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-5">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-violet-soft">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-violet-soft">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-violet-soft">
              Email
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-edge/40 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted/70">
            Designed & built among the stars ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
