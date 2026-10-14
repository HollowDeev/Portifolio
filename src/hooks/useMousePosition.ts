"use client";

import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

/**
 * useMousePosition — retorna MotionValues normalizados [0,1]
 * Usa MotionValues para que os derivados (useTransform) atualizem
 * o DOM diretamente, sem causar re-renders React.
 */
export function useMousePosition() {
  const x = useMotionValue(0.5); // 0 = esquerda, 1 = direita
  const y = useMotionValue(0.5); // 0 = topo, 1 = baixo

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return { x, y };
}
