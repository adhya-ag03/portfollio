"use client";

import { useEffect, useRef } from "react";

/**
 * Custom glowing cursor: a core dot that tracks the pointer 1:1 and a
 * trailing ring that eases behind it. Expands over links/buttons.
 * Only mounts on fine-pointer devices without reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.dataset.customCursor = "true";
    const dot = dotRef.current;
    const ring = ringRef.current;
    dot.style.display = "block";
    ring.style.display = "block";

    let x = -100, y = -100;      // pointer
    let rx = -100, ry = -100;    // ring (eased)
    let hovering = false;
    let rafId;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target;
      hovering = !!(t.closest && t.closest("a, button, [data-hover]"));
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const scale = hovering ? 2.2 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      ring.style.borderColor = hovering
        ? "rgba(217, 70, 239, 0.9)"
        : "rgba(167, 139, 250, 0.7)";
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      delete document.body.dataset.customCursor;
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden h-2 w-2 rounded-full bg-violet-soft shadow-[0_0_12px_3px_rgba(167,139,250,0.8)]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden h-9 w-9 rounded-full border transition-[border-color] duration-300"
      />
    </>
  );
}
