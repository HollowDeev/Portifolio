"use client";

import { motion, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * OceanRocks — Formações rochosas SVG oceânicas com parallax de mouse
 *
 * variant="deep"    → Zona Batial (StackSection): rochas altas e dramáticas
 * variant="abyssal" → Zona Abissal (FooterSection): chão oceânico com algas
 *
 * Três camadas em diferentes opacidades e intensidades de parallax
 * criam profundidade visual convincente.
 */

interface OceanRocksProps {
  variant?: "deep" | "abyssal";
}

export default function OceanRocks({ variant = "deep" }: OceanRocksProps) {
  const { x: mouseX } = useMousePosition();

  // Parallax: camada de frente se move mais, fundo menos
  // mouseX [0,1] → offset em pixels
  const backX  = useTransform(mouseX, [0, 1], [-5,  5]);
  const midX   = useTransform(mouseX, [0, 1], [-10, 10]);
  const frontX = useTransform(mouseX, [0, 1], [-18, 18]);

  if (variant === "abyssal") {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "260px",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* ── Chão oceânico abissal: sedimento + algas ── */}

        {/* Camada traseira — sedimento plano */}
        <motion.div style={{ x: backX, position: "absolute", inset: 0 }}>
          <svg
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}
          >
            <path
              d="M0,260 L0,215 Q120,205 240,218 Q360,208 480,220 Q600,210 720,222 Q840,212 960,220 Q1080,210 1200,218 Q1320,208 1440,215 L1440,260 Z"
              fill="rgba(2,7,13,0.6)"
            />
          </svg>
        </motion.div>

        {/* Camada meio — amontoados de sedimento com variação */}
        <motion.div style={{ x: midX, position: "absolute", inset: 0 }}>
          <svg
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}
          >
            <path
              d="M0,260 L0,230 Q60,218 130,228 Q200,215 280,226 Q360,210 440,224 Q520,212 610,225 Q690,213 770,226 Q860,212 950,225 Q1040,210 1120,224 Q1200,210 1300,224 Q1380,212 1440,220 L1440,260 Z"
              fill="rgba(2,8,14,0.75)"
            />
          </svg>
        </motion.div>

        {/* Camada frente — pedras pequenas e estrelas */}
        <motion.div style={{ x: frontX, position: "absolute", inset: 0 }}>
          <svg
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}
          >
            <path
              d="M0,260 L0,248 Q45,238 100,246 Q165,234 230,244 Q310,232 390,243 Q470,232 560,243 Q640,232 720,244 Q810,232 890,244 Q970,232 1060,244 Q1150,232 1230,243 Q1320,232 1440,242 L1440,260 Z"
              fill="rgba(2,8,14,0.88)"
            />
            {/* Pedrinhas */}
            {[150, 380, 580, 780, 990, 1190, 1380].map((cx, i) => (
              <ellipse
                key={i}
                cx={cx}
                cy={252}
                rx={8 + (i % 3) * 4}
                ry={4 + (i % 2) * 2}
                fill="rgba(7,22,40,0.9)"
                stroke="rgba(88,139,158,0.08)"
                strokeWidth={0.5}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    );
  }

  // ── variant === "deep" — Zona Batial ──────────────────────────────
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "320px",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Camada traseira — picos altos, mais transparente */}
      <motion.div style={{ x: backX, position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="rock-glow-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(22,91,117,0.12)" />
              <stop offset="100%" stopColor="rgba(2,8,14,0.5)" />
            </linearGradient>
          </defs>
          <path
            d="M0,320 L0,200 Q80,130 170,160 Q240,90 330,118 Q410,55 510,88 Q590,30 690,62 Q770,10 870,42 Q960,5 1060,38 Q1150,5 1250,30 Q1350,10 1440,28 L1440,320 Z"
            fill="url(#rock-glow-back)"
          />
        </svg>
      </motion.div>

      {/* Camada meio — rochas médias */}
      <motion.div style={{ x: midX, position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="rock-glow-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(7,22,40,0.4)" />
              <stop offset="100%" stopColor="rgba(3,11,21,0.75)" />
            </linearGradient>
          </defs>
          <path
            d="M0,320 L0,240 Q55,205 120,228 Q195,175 280,202 Q360,148 460,178 Q550,125 650,158 Q740,105 840,140 Q930,90 1030,125 Q1110,78 1210,112 Q1310,70 1440,98 L1440,320 Z"
            fill="url(#rock-glow-mid)"
          />
          {/* Detalhes de rocha — quebras e fissuras */}
          {[180, 420, 680, 920, 1200].map((x, i) => (
            <path
              key={i}
              d={`M${x},320 L${x - 5},${260 - i * 8} L${x + 8},${275 - i * 6} L${x + 3},320`}
              fill="rgba(2,8,14,0.4)"
            />
          ))}
        </svg>
      </motion.div>

      {/* Camada frente — rochas baixas mais opacas */}
      <motion.div style={{ x: frontX, position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}
        >
          <path
            d="M0,320 L0,282 Q50,260 110,272 Q180,248 260,265 Q340,242 430,258 Q510,235 600,252 Q680,230 770,248 Q860,225 950,244 Q1040,222 1130,240 Q1220,218 1330,238 Q1400,222 1440,232 L1440,320 Z"
            fill="rgba(3,11,21,0.88)"
          />
          {/* Pontos de bio-luminescência */}
          {[80, 220, 440, 660, 820, 1040, 1260].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={290 - (i % 3) * 6}
              r={1.5 + (i % 2)}
              fill="rgba(88,139,158,0.35)"
              className="sea-glow"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
