"use client";

import { motion } from "framer-motion";

/**
 * SleepingWhales — Três baleias cachalotes dormindo na vertical
 * em suspensão no oceano profundo (Zonas Mesopelágica / Batial).
 *
 * Características:
 * - Orientação estritamente vertical (comportamento real de sono dos cachalotes)
 * - Fundo desfocado (bokeh/depth of field com filter: blur)
 * - Balanço hidrodinâmico ultra-suave e assíncrono (12s a 18s)
 * - Micro-bolhas sutis subindo lentamente
 * - Opacidade equilibrada (~0.4 - 0.5) para escala e profundidade atmosférica
 */

interface WhaleProps {
  scale?: number;
  flip?: boolean;
  blur?: number;
  opacity?: number;
  animDuration?: string;
  animDelay?: string;
  style?: React.CSSProperties;
}

function SpermWhale({
  scale = 1,
  flip = false,
  blur = 5,
  opacity = 0.42,
  animDuration = "16s",
  animDelay = "0s",
  style = {},
}: WhaleProps) {
  return (
    <div
      style={{
        position: "relative",
        width: `${140 * scale}px`,
        height: `${440 * scale}px`,
        filter: `blur(${blur}px) drop-shadow(0 0 25px rgba(10, 45, 70, 0.4))`,
        opacity,
        transform: flip ? "scaleX(-1)" : "none",
        animation: `whale-drift ${animDuration} ease-in-out infinite`,
        animationDelay: animDelay,
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 140 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Gradiente de volume corporal da baleia */}
          <linearGradient id="whaleBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C4459" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#133649" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0B2332" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#081A26" stopOpacity="0.98" />
          </linearGradient>

          {/* Realce suave na curvatura da cabeça */}
          <linearGradient id="whaleRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(140, 200, 230, 0.35)" />
            <stop offset="50%" stopColor="rgba(88, 139, 158, 0.15)" />
            <stop offset="100%" stopColor="rgba(10, 30, 45, 0.2)" />
          </linearGradient>

          {/* Gradiente da barbatana caudal */}
          <linearGradient id="whaleFluke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E2838" />
            <stop offset="100%" stopColor="#071924" />
          </linearGradient>
        </defs>

        {/* ── Silhueta Anatômica do Cachalote ── */}
        {/*
          Cabeça maciça quadrangular no topo (órgão do espermacete),
          ventre à esquerda com nadadeira peitoral,
          dorso à direita com corcova e cristas,
          pedúnculo caudal estreito e cauda aberta na base.
        */}
        <path
          d="
            M 70,18
            C 88,18 104,25 106,42
            C 108,60 106,120 102,170
            C 98,220 106,238 102,255
            C 99,268 94,275 92,290
            C 90,305 84,320 80,340
            C 77,358 74,375 73,385
            C 78,390 95,405 118,422
            C 112,425 94,420 73,408
            C 70,406 68,406 65,408
            C 44,420 26,425 20,422
            C 43,405 60,390 65,385
            C 64,375 61,358 58,340
            C 54,320 48,300 46,270
            C 44,240 38,200 40,165
            C 34,175 22,192 18,212
            C 16,218 20,220 24,212
            C 30,198 38,185 41,175
            C 42,150 44,110 46,70
            C 48,42 54,18 70,18
            Z
          "
          fill="url(#whaleBodyGrad)"
          stroke="url(#whaleRim)"
          strokeWidth="1.2"
        />

        {/* Sulco da mandíbula inferior (característica marcante do cachalote) */}
        <path
          d="M 52,65 C 50,85 50,115 54,130"
          stroke="rgba(88, 139, 158, 0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Olho sutil adormecido */}
        <circle cx="56" cy="142" r="1.8" fill="rgba(6, 18, 28, 0.9)" />
        <path
          d="M 53,140 Q 56,143 59,140"
          stroke="rgba(140, 200, 230, 0.4)"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Cristas dorsais sutis (crenulações no dorso inferior) */}
        <path
          d="M 98,245 Q 103,250 96,258 Q 93,268 89,275 Q 86,285 82,295"
          stroke="rgba(140, 200, 230, 0.2)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Textura sutil de pele enrugada (cachalotes têm pele rugosa característica) */}
        <path
          d="M 55,185 C 68,190 78,190 90,186"
          stroke="rgba(88, 139, 158, 0.15)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M 52,220 C 65,226 75,225 88,220"
          stroke="rgba(88, 139, 158, 0.12)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M 50,255 C 62,260 72,260 82,254"
          stroke="rgba(88, 139, 158, 0.12)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>

      {/* Micro-bolhas subindo da respiração pausada */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        <span
          className="particle"
          style={{
            width: "3px",
            height: "3px",
            left: "0px",
            bottom: "0px",
            opacity: 0.5,
            animationDuration: "9s",
            animationDelay: animDelay,
          }}
        />
        <span
          className="particle"
          style={{
            width: "2px",
            height: "2px",
            left: "-8px",
            bottom: "-15px",
            opacity: 0.4,
            animationDuration: "12s",
            animationDelay: `calc(${animDelay} + 3s)`,
          }}
        />
      </div>
    </div>
  );
}

export default function SleepingWhales() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/*
        Pod de 3 cachalotes dormindo na vertical (como no desenho do usuário):
        - Baleia 1: Maior (centro-direita), mais nítida, profundidade intermediária
        - Baleia 2: Média (à direita, mais ao fundo, mais desfocada)
        - Baleia 3: Menor (à esquerda, silhueta distante)
      */}
      <div
        style={{
          position: "absolute",
          right: "clamp(5%, 12vw, 18%)",
          top: "12%",
          display: "flex",
          alignItems: "flex-start",
          gap: "clamp(2rem, 5vw, 6rem)",
        }}
      >
        {/* Baleia 2: Distante, mais ao fundo, mais desfocada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ marginTop: "40px" }}
        >
          <SpermWhale
            scale={0.78}
            flip={false}
            blur={6}
            opacity={0.35}
            animDuration="19s"
            animDelay="-4s"
          />
        </motion.div>

        {/* Baleia 1: Principal, porte majestoso, no centro do pod */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <SpermWhale
            scale={1.1}
            flip={false}
            blur={4}
            opacity={0.48}
            animDuration="15s"
            animDelay="0s"
          />
        </motion.div>

        {/* Baleia 3: Menor, levemente rotacionada, flutuando em sintonia */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.3, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          style={{ marginTop: "90px" }}
        >
          <SpermWhale
            scale={0.65}
            flip={true}
            blur={7}
            opacity={0.3}
            animDuration="17s"
            animDelay="-8s"
          />
        </motion.div>
      </div>
    </div>
  );
}
