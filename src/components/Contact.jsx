"use client";

import { useState } from "react";
import { site } from "@/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setStatus("sending");
    try {
      // Formspree takes priority if configured; otherwise our own API route.
      const res = site.formspreeEndpoint
        ? await fetch(site.formspreeEndpoint, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          })
        : await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (res.status === 503) {
        // Backend not configured yet → open the visitor's mail client.
        const subject = encodeURIComponent(`Portfolio contact from ${payload.name}`);
        const body = encodeURIComponent(`${payload.message}\n\n- ${payload.name} (${payload.email})`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-edge bg-space px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-violet-core focus:outline-none";

  return (
    <section id="contact" className="relative mx-auto max-w-4xl scroll-mt-24 px-4 py-28 sm:px-6" aria-label="Contact">
      <div className="pointer-events-none absolute -top-10 left-1/2 h-80 w-[38rem] max-w-full -translate-x-1/2 rounded-full bg-magenta/10 blur-3xl" aria-hidden="true" />
      <SectionHeading index="05" title="Contact" subtitle="Have a model to fine-tune or a product to ship? Let's talk." />

      <Reveal>
        <div className="glass rounded-3xl p-6 sm:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs tracking-widest text-ink uppercase">
              <span className="relative inline-block h-2 w-2 rounded-full bg-green-400 ping-dot" />
              Available for work
            </span>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-violet-soft underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>

          <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase">
                Name
              </label>
              <input id="contact-name" name="name" type="text" required placeholder="Ada Lovelace" className={inputClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase">
                Email
              </label>
              <input id="contact-email" name="email" type="email" required placeholder="ada@analytical.engine" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-subject" className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase">
                Subject
              </label>
              <input id="contact-subject" name="subject" type="text" placeholder="Let's build something" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase">
                Message
              </label>
              <textarea id="contact-message" name="message" rows={5} required placeholder="Tell me about your project…" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-gradient-to-r from-violet-core to-magenta px-10 py-3.5 font-display text-sm font-semibold tracking-wider text-white uppercase shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_0_48px_rgba(217,70,239,0.55)] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </Magnetic>
              {status === "sent" && (
                <p className="mt-4 font-mono text-sm text-green-400" role="status">
                  Message sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 font-mono text-sm text-red-400" role="alert">
                  Something went wrong. Email me directly at {site.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
