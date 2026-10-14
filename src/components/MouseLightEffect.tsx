"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * MouseLightEffect — Luz de mergulhador que segue o cursor
 *
 * Um gradiente radial suave acompanha o mouse em todas as seções escuras.
 * A intensidade diminui com a profundidade (scroll), simulando que a
 * luz natural se atenua conforme o usuário desce no oceano.
 *
 * Usa MotionValues + useMotionTemplate para atualizar o DOM
 * diretamente, sem causar re-renders React.
 */
export default function MouseLightEffect() {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  // Intensidade diminui com profundidade
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0,    0.15, 0.45, 0.75, 1.0],
    [0.85, 1.0,  0.75, 0.45, 0.2]
  );

  // Raio da luz também diminui com a profundidade
  const radius = useTransform(
    scrollYProgress,
    [0,   0.5,  1.0],
    [400, 340,  240]
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  // Template reativo — atualiza o background sem re-render
  const background = useMotionTemplate`radial-gradient(
    circle ${radius}px at ${mouseX}px ${mouseY}px,
    rgba(140,200,240,0.07) 0%,
    rgba(80,150,200,0.035) 38%,
    rgba(30,90,140,0.015) 60%,
    transparent 75%
  )`;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 45,
        background,
        opacity,
        mixBlendMode: "screen",
      }}
    />
  );
}
