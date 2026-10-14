"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1500,
  style,
  className,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = () => {
            const elapsed = performance.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
}
