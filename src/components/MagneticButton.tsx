"use client";

import { useEffect, useRef } from "react";

// Magnetic button — wraps children, pulls them toward cursor when nearby
export default function MagneticButton({
  children,
  strength = 0.3,
  radius = 80,
  className,
  style,
  onClick,
  href,
  tag = "div",
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  tag?: "div" | "a" | "button";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      } else {
        el.style.transform = "translate(0px, 0px)";
      }
    };

    const onLeave = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [radius, strength]);

  const sharedStyle = {
    ...style,
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    display: "inline-block" as const,
  };

  if (href) {
    return (
      <a ref={ref as unknown as React.RefObject<HTMLAnchorElement>} href={href} className={className} style={sharedStyle} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <div ref={ref} className={className} style={sharedStyle} onClick={onClick}>
      {children}
    </div>
  );
}
