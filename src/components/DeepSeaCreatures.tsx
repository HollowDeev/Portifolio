"use client";

import { motion } from "framer-motion";

/**
 * DeepSeaCreatures — Criaturas do fundo oceânico para o Footer
 *
 * Medusa: pulsa suavemente com animação CSS (jellyfish-pulse)
 * Estrela-do-mar: deriva lentamente com rotação sutil (starfish-drift)
 *
 * Ambas são position:absolute, aria-hidden, pointer-events:none.
 * Adicionam vida ao fundo abissal sem poluir o conteúdo.
 */

// ── Medusa ─────────────────────────────────────────────────────────
function Jellyfish() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      style={{
        position: "absolute",
        right: "8%",
        top: "10%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.55,
      }}
    >
      <svg
        width="90"
        height="160"
        viewBox="0 0 90 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="jellyfish-pulse"
      >
        {/* Sino / campânula */}
        <path
          d="M8 45 Q5 10 45 6 Q85 10 82 45"
          fill="rgba(88,139,158,0.18)"
          stroke="rgba(140,200,240,0.35)"
          strokeWidth="1"
        />
        {/* Interior translúcido */}
        <path
          d="M14 44 Q12 18 45 14 Q78 18 76 44"
          fill="rgba(22,91,117,0.12)"
        />
        {/* Anel inferior */}
        <ellipse
          cx="45"
          cy="44"
          rx="37"
          ry="10"
          fill="rgba(88,139,158,0.22)"
        />
        {/* Brilho no sino */}
        <path
          d="M22 30 Q25 18 35 16"
          stroke="rgba(200,230,255,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Pontos de bio-luminescência */}
        <circle cx="32" cy="30" r="2.5" fill="rgba(140,200,240,0.5)" className="sea-glow" />
        <circle cx="58" cy="28" r="1.8" fill="rgba(140,200,240,0.4)" className="sea-glow" />
        <circle cx="45" cy="38" r="1.5" fill="rgba(140,200,240,0.35)" className="sea-glow" />

        {/* Tentáculos externos (pares laterais) */}
        {[18, 30, 42, 54, 66, 72].map((x, i) => (
          <path
            key={i}
            d={`M${x} 52 Q${x + (i % 2 === 0 ? 4 : -4)} ${90 + i * 8} ${x + (i % 2 === 0 ? -2 : 3)} ${120 + i * 6} Q${x + (i % 2 === 0 ? 6 : -5)} ${140 + i * 4} ${x + (i % 2 === 0 ? 2 : -2)} ${158}`}
            stroke={`rgba(88,139,158,${0.2 + (i % 3) * 0.05})`}
            strokeWidth={0.8 + (i % 2) * 0.4}
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* Tentáculos orais centrais — mais curtos */}
        {[35, 42, 50].map((x, i) => (
          <path
            key={i}
            d={`M${x} 50 Q${x - 3 + i * 2} ${75 + i * 5} ${x + 2} ${95 + i * 6}`}
            stroke="rgba(22,91,117,0.35)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </motion.div>
  );
}

// ── Estrela-do-mar ─────────────────────────────────────────────────
function Starfish() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      style={{
        position: "absolute",
        left: "6%",
        bottom: "12%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.5,
      }}
    >
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="starfish-drift"
      >
        {/* Corpo — estrela de 5 pontas */}
        <path
          d="M35 5 L39.5 22 L56 22 L42.5 32.5 L48 50 L35 40 L22 50 L27.5 32.5 L14 22 L30.5 22 Z"
          fill="rgba(168,80,48,0.35)"
          stroke="rgba(224,112,60,0.25)"
          strokeWidth="0.8"
        />
        {/* Textura — pontos e linhas radiais */}
        <circle cx="35" cy="30" r="4" fill="rgba(200,100,60,0.25)" />
        <circle cx="35" cy="30" r="2" fill="rgba(224,112,60,0.3)" />
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 35 + Math.cos(rad) * 10;
          const y = 30 + Math.sin(rad) * 10;
          return (
            <circle key={i} cx={x} cy={y} r="1.2" fill="rgba(224,112,60,0.2)" />
          );
        })}
        {/* Pontos de textura nas pontas */}
        {[35, 39, 31].map((x, i) => (
          <circle key={i} cx={x} cy={12 + i * 5} r="0.8" fill="rgba(224,112,60,0.15)" />
        ))}
      </svg>
    </motion.div>
  );
}

// ── Export principal ───────────────────────────────────────────────
export default function DeepSeaCreatures() {
  return (
    <>
      <Jellyfish />
      <Starfish />
    </>
  );
}
