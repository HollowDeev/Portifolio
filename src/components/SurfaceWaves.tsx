"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SurfaceWaves — Linha d'água oceânica na base do Hero
 *
 * Posicionada na parte inferior do Hero (bottom: 0).
 * O Hero inteiro fica "para fora da água" (céu costeiro e ar aberto),
 * e a linha de ondas ondulantes marca a transição física onde o usuário
 * mergulha no oceano ao rolar para a seção seguinte (Cases).
 */
export default function SurfaceWaves() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Leve movimento parallax vertical com o scroll
  const translateY = useTransform(scrollYProgress, [0, 1], ["0px", "20px"]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "-1px", // Conecta rente à próxima seção sem frestas
        height: "140px",
        pointerEvents: "none",
        zIndex: 3,
        y: translateY,
        overflow: "hidden",
      }}
    >
      {/* ── Camada 3: Fundo — ondas mais altas e lentas ── */}
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "140px",
          opacity: 0.5,
          animation: "wave-drift-back 26s linear infinite",
        }}
      >
        <defs>
          <linearGradient id="waveGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(12, 45, 68, 0.35)" />
            <stop offset="100%" stopColor="rgba(7, 25, 42, 0.85)" />
          </linearGradient>
        </defs>
        {/* Corpo de água preenchido */}
        <path
          d="
            M 0,55
            C 120,25 240,85 360,55
            C 480,25 600,85 720,55
            C 840,25 960,85 1080,55
            C 1200,25 1320,85 1440,55
            C 1560,25 1680,85 1800,55
            C 1920,25 2040,85 2160,55
            C 2280,25 2400,85 2520,55
            C 2640,25 2760,85 2880,55
            L 2880,140 L 0,140 Z
          "
          fill="url(#waveGradBack)"
        />
        {/* Crista da onda */}
        <path
          d="
            M 0,55
            C 120,25 240,85 360,55
            C 480,25 600,85 720,55
            C 840,25 960,85 1080,55
            C 1200,25 1320,85 1440,55
            C 1560,25 1680,85 1800,55
            C 1920,25 2040,85 2160,55
            C 2280,25 2400,85 2520,55
            C 2640,25 2760,85 2880,55
          "
          stroke="rgba(88, 139, 158, 0.45)"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>

      {/* ── Camada 2: Meio — velocidade e densidade intermediárias ── */}
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "140px",
          opacity: 0.75,
          animation: "wave-drift-mid 17s linear infinite",
        }}
      >
        <defs>
          <linearGradient id="waveGradMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(14, 52, 78, 0.6)" />
            <stop offset="100%" stopColor="rgba(7, 25, 42, 0.95)" />
          </linearGradient>
        </defs>
        <path
          d="
            M 0,65
            C 90,35 180,95 270,65
            C 360,35 450,95 540,65
            C 630,35 720,95 810,65
            C 900,35 990,95 1080,65
            C 1170,35 1260,95 1350,65
            C 1440,35 1530,95 1620,65
            C 1710,35 1800,95 1890,65
            C 1980,35 2070,95 2160,65
            C 2250,35 2340,95 2430,65
            C 2520,35 2610,95 2700,65
            C 2790,35 2880,95 2970,65
            L 2970,140 L 0,140 Z
          "
          fill="url(#waveGradMid)"
        />
        <path
          d="
            M 0,65
            C 90,35 180,95 270,65
            C 360,35 450,95 540,65
            C 630,35 720,95 810,65
            C 900,35 990,95 1080,65
            C 1170,35 1260,95 1350,65
            C 1440,35 1530,95 1620,65
            C 1710,35 1800,95 1890,65
            C 1980,35 2070,95 2160,65
            C 2250,35 2340,95 2430,65
            C 2520,35 2610,95 2700,65
            C 2790,35 2880,95 2970,65
          "
          stroke="rgba(100, 160, 185, 0.7)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* ── Camada 1: Frente — cristas luminosas e preenchimento total ── */}
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "140px",
          opacity: 0.98,
          animation: "wave-drift-front 11s linear infinite",
        }}
      >
        <defs>
          <linearGradient id="waveGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(18, 64, 96, 0.85)" />
            <stop offset="35%" stopColor="rgba(9, 30, 48, 0.96)" />
            <stop offset="100%" stopColor="#07192A" />
          </linearGradient>
        </defs>

        {/* Corpo de água frontal com entrada no tom exato da seção Cases (#07192A) */}
        <path
          d="
            M 0,78
            C 60,52 120,98 180,78
            C 240,52 300,98 360,78
            C 420,52 480,98 540,78
            C 600,52 660,98 720,78
            C 780,52 840,98 900,78
            C 960,52 1020,98 1080,78
            C 1140,52 1200,98 1260,78
            C 1320,52 1380,98 1440,78
            C 1500,52 1560,98 1620,78
            C 1680,52 1740,98 1800,78
            C 1860,52 1920,98 1980,78
            C 2040,52 2100,98 2160,78
            C 2220,52 2280,98 2340,78
            C 2400,52 2460,98 2520,78
            C 2580,52 2640,98 2700,78
            C 2760,52 2820,98 2880,78
            L 2880,140 L 0,140 Z
          "
          fill="url(#waveGradFront)"
        />

        {/* Linha da crista luminosa com reflexo da superfície */}
        <path
          d="
            M 0,78
            C 60,52 120,98 180,78
            C 240,52 300,98 360,78
            C 420,52 480,98 540,78
            C 600,52 660,98 720,78
            C 780,52 840,98 900,78
            C 960,52 1020,98 1080,78
            C 1140,52 1200,98 1260,78
            C 1320,52 1380,98 1440,78
            C 1500,52 1560,98 1620,78
            C 1680,52 1740,98 1800,78
            C 1860,52 1920,98 1980,78
            C 2040,52 2100,98 2160,78
            C 2220,52 2280,98 2340,78
            C 2400,52 2460,98 2520,78
            C 2580,52 2640,98 2700,78
            C 2760,52 2820,98 2880,78
          "
          stroke="rgba(140, 210, 240, 0.85)"
          strokeWidth="1.8"
          fill="none"
        />

        {/* Reflexo âmbar cintilante na crista da onda */}
        <path
          d="
            M 0,80
            C 60,54 120,100 180,80
            C 240,54 300,100 360,80
            C 420,54 480,100 540,80
            C 600,54 660,100 720,80
            C 780,54 840,100 900,80
            C 960,54 1020,100 1080,80
            C 1140,54 1200,100 1260,80
            C 1320,54 1380,100 1440,80
            C 1500,54 1560,100 1620,80
            C 1680,54 1740,100 1800,80
          "
          stroke="rgba(224, 112, 60, 0.4)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="10 45"
        />
      </svg>
    </motion.div>
  );
}
