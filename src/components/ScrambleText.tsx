"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&";

function scramble(target: string, progress: number): string {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i < Math.floor(progress * target.length)) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // ms
  duration?: number; // ms
}

export default function ScrambleText({
  text,
  className,
  style,
  delay = 0,
  duration = 1200,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(() => scramble(text, 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      startedRef.current = true;
      const startTime = performance.now();

      const tick = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setDisplayed(scramble(text, progress));
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setDisplayed(text); // lock final
        }
      };
      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, duration]);

  return (
    <span className={className} style={style} aria-label={text}>
      {displayed}
    </span>
  );
}
