"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ADHY¤#@&%$§ΔΞΨ01<>/*+=";

/**
 * Text scramble reveal: characters resolve left-to-right from random
 * glyphs into the target string. Renders plain text for reduced motion.
 */
export default function ScrambleText({ text, as: Tag = "span", className = "", startDelay = 0 }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let rafId;
    let timeoutId;
    const totalFrames = 36;

    const tick = () => {
      frame.current += 1;
      const progress = frame.current / totalFrames;
      const resolved = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") out += " ";
        else if (i < resolved) out += text[i];
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (frame.current < totalFrames) rafId = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    setDisplay(
      text.replace(/[^ ]/g, () => CHARS[Math.floor(Math.random() * CHARS.length)])
    );
    timeoutId = setTimeout(() => {
      frame.current = 0;
      rafId = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [text, startDelay]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
