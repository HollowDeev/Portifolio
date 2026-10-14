"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posX = useRef(0);
  const posY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      posX.current = e.clientX;
      posY.current = e.clientY;
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    // Smooth ring follow via RAF
    let raf: number;
    const followRing = () => {
      ringX.current += (posX.current - ringX.current) * 0.12;
      ringY.current += (posY.current - ringY.current) * 0.12;
      ring.style.transform = `translate(${ringX.current - 16}px, ${ringY.current - 16}px)`;
      raf = requestAnimationFrame(followRing);
    };
    raf = requestAnimationFrame(followRing);

    const onEnterInteractive = () => {
      isHoveringRef.current = true;
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "var(--signal-amber-dark)";
      ring.style.opacity = "1";
    };
    const onLeaveInteractive = () => {
      isHoveringRef.current = false;
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "var(--accent-pelagic)";
      ring.style.opacity = "0.6";
    };

    const interactiveEls = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    window.addEventListener("mousemove", onMove);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot — exact cursor position */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--signal-amber-dark)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
      {/* Outer ring — lags behind smoothly */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid var(--accent-pelagic)",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.25s ease",
        }}
      />
    </>
  );
}
