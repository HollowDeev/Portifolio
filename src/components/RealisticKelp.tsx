"use client";

import { useMemo } from "react";

/**
 * RealisticKelp — Floresta de algas marinhas realistas para o leito oceânico
 *
 * Cada haste de alga é composta por:
 * - Estípite (haste central) sinuosa com espessura variável
 * - Lâminas / frondes onduladas com nós de flutuação aerocistos
 * - Variações de matizes (verde-petróleo profundo, esmeralda oceânica e realce azulado)
 * - Animações de balanço INDEPENDENTES com frequências, fases e amplitudes desfasadas
 *   para simular o movimento das correntes no fundo do mar.
 */

interface KelpStrandConfig {
  id: string;
  xPercent: number;     // Posição horizontal na tela (%)
  height: number;       // Altura em pixels
  width: number;        // Largura da fronde
  scale: number;        // Escala
  layer: "back" | "mid" | "front"; // Camada de profundidade
  animType: "A" | "B" | "C" | "D" | "E";
  duration: string;     // Duração do ciclo (ex: '6.4s')
  delay: string;        // Delay/desfaseamento (ex: '-2.1s')
  flip?: boolean;
}

const KELP_STRANDS: KelpStrandConfig[] = [
  // Cluster Esquerdo (atrás e ao redor dos dados de contato)
  { id: "k1",  xPercent: 3,   height: 290, width: 44, scale: 1.05, layer: "back",  animType: "A", duration: "7.8s", delay: "-1.5s" },
  { id: "k2",  xPercent: 6,   height: 340, width: 50, scale: 1.15, layer: "mid",   animType: "B", duration: "6.2s", delay: "-3.2s" },
  { id: "k3",  xPercent: 9,   height: 240, width: 38, scale: 0.95, layer: "front", animType: "C", duration: "5.4s", delay: "-0.8s", flip: true },
  { id: "k4",  xPercent: 13,  height: 310, width: 46, scale: 1.08, layer: "mid",   animType: "D", duration: "6.9s", delay: "-4.1s" },
  { id: "k5",  xPercent: 17,  height: 220, width: 35, scale: 0.88, layer: "back",  animType: "E", duration: "8.3s", delay: "-2.7s", flip: true },
  { id: "k6",  xPercent: 22,  height: 280, width: 42, scale: 1.0,  layer: "front", animType: "B", duration: "5.8s", delay: "-1.1s" },

  // Meio-Esquerda (acompanhando a curvatura do relevo)
  { id: "k7",  xPercent: 28,  height: 190, width: 34, scale: 0.82, layer: "back",  animType: "A", duration: "7.2s", delay: "-3.9s" },
  { id: "k8",  xPercent: 34,  height: 250, width: 40, scale: 0.92, layer: "mid",   animType: "C", duration: "6.5s", delay: "-2.4s", flip: true },

  // Centro e Transição
  { id: "k9",  xPercent: 52,  height: 210, width: 36, scale: 0.85, layer: "back",  animType: "D", duration: "7.6s", delay: "-5.0s" },
  { id: "k10", xPercent: 58,  height: 270, width: 44, scale: 0.98, layer: "mid",   animType: "E", duration: "6.1s", delay: "-1.8s" },
  { id: "k11", xPercent: 65,  height: 195, width: 32, scale: 0.80, layer: "front", animType: "A", duration: "5.5s", delay: "-3.4s", flip: true },

  // Cluster Direito (emoldurando a zona da água-viva e abismo)
  { id: "k12", xPercent: 74,  height: 280, width: 45, scale: 1.02, layer: "back",  animType: "B", duration: "7.4s", delay: "-2.9s" },
  { id: "k13", xPercent: 79,  height: 330, width: 48, scale: 1.12, layer: "mid",   animType: "C", duration: "6.7s", delay: "-4.6s" },
  { id: "k14", xPercent: 84,  height: 260, width: 40, scale: 0.96, layer: "front", animType: "D", duration: "5.9s", delay: "-0.5s", flip: true },
  { id: "k15", xPercent: 88,  height: 310, width: 46, scale: 1.08, layer: "mid",   animType: "E", duration: "7.9s", delay: "-3.1s" },
  { id: "k16", xPercent: 93,  height: 230, width: 36, scale: 0.86, layer: "back",  animType: "A", duration: "6.3s", delay: "-1.7s", flip: true },
];

/**
 * Desenho de Alga Realista em SVG
 * Haste contínua sinuosa com folhas afiadas ondulantes saindo alternadamente
 */
function KelpSVG({
  width,
  height,
  layer,
  flip,
}: {
  width: number;
  height: number;
  layer: "back" | "mid" | "front";
  flip?: boolean;
}) {
  const colors = useMemo(() => {
    if (layer === "back") {
      return {
        stem: "rgba(10, 36, 46, 0.65)",
        bladeFill: "rgba(12, 42, 54, 0.45)",
        bladeStroke: "rgba(22, 68, 86, 0.4)",
        nodeColor: "rgba(28, 85, 106, 0.45)",
        opacity: 0.5,
      };
    }
    if (layer === "mid") {
      return {
        stem: "rgba(16, 58, 74, 0.85)",
        bladeFill: "rgba(18, 64, 82, 0.65)",
        bladeStroke: "rgba(42, 116, 142, 0.6)",
        nodeColor: "rgba(50, 138, 168, 0.65)",
        opacity: 0.75,
      };
    }
    // front
    return {
      stem: "rgba(20, 75, 96, 0.95)",
      bladeFill: "rgba(22, 85, 108, 0.8)",
      bladeStroke: "rgba(68, 162, 195, 0.75)",
      nodeColor: "rgba(88, 185, 220, 0.8)",
      opacity: 0.9,
    };
  }, [layer]);

  // Proporção base (normalizada para 60 x 360)
  return (
    <svg
      viewBox="0 0 60 360"
      width={width}
      height={height}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
        overflow: "visible",
        opacity: colors.opacity,
      }}
    >
      {/* ── Haste Central Sinuosa (Stipe) ── */}
      <path
        d="M 30,360 C 26,300 36,240 28,180 C 22,120 34,60 29,15"
        stroke={colors.stem}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M 30,360 C 26,300 36,240 28,180 C 22,120 34,60 29,15"
        stroke="rgba(88, 165, 195, 0.25)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* ── Frondes / Lâminas de Alga Alternadas (Blades) ── */}

      {/* Folha 1 — Inferior Esquerda */}
      <g>
        <circle cx="28" cy="305" r="2.8" fill={colors.nodeColor} />
        <path
          d="M 28,305 C 15,302 4,285 2,260 C 8,272 18,285 28,295 Z"
          fill={colors.bladeFill}
          stroke={colors.bladeStroke}
          strokeWidth="0.8"
        />
      </g>

      {/* Folha 2 — Inferior Direita */}
      <g>
        <circle cx="33" cy="265" r="3" fill={colors.nodeColor} />
        <path
          d="M 33,265 C 48,258 56,238 58,212 C 50,228 42,245 31,256 Z"
          fill={colors.bladeFill}
          stroke={colors.bladeStroke}
          strokeWidth="0.8"
        />
      </g>

      {/* Folha 3 — Meio Esquerda */}
      <g>
        <circle cx="28" cy="225" r="2.8" fill={colors.nodeColor} />
        <path
          d="M 28,225 C 10,218 2,198 1,172 C 8,188 18,206 27,216 Z"
          fill={colors.bladeFill}
          stroke={colors.bladeStroke}
          strokeWidth="0.8"
        />
      </g>

      {/* Folha 4 — Meio Direita */}
      <g>
        <circle cx="30" cy="180" r="2.8" fill={colors.nodeColor} />
        <path
          d="M 30,180 C 46,172 55,152 57,125 C 48,142 39,160 28,172 Z"
          fill={colors.bladeFill}
          stroke={colors.bladeStroke}
          strokeWidth="0.8"
        />
      </g>

      {/* Folha 5 — Superior Esquerda */}
      <g>
        <circle cx="26" cy="135" r="2.5" fill={colors.nodeColor} />
        <path
          d="M 26,135 C 12,126 5,108 4,82 C 10,98 19,116 26,128 Z"
          fill={colors.bladeFill}
          stroke={colors.bladeStroke}
          strokeWidth="0.8"
        />
      </g>

      {/* Folha 6 — Superior Direita */}
      <g>
        <circle cx="31" cy="95" r="2.4" fill={colors.nodeColor} />
        <path
          d="M 31,95 C 44,86 52,68 53,42 C 45,58 38,76 29,88 Z"
          fill={colors.bladeFill}
          stroke={colors.bladeStroke}
          strokeWidth="0.8"
        />
      </g>

      {/* Folha 7 — Ponta Terminal */}
      <g>
        <circle cx="29" cy="45" r="2" fill={colors.nodeColor} />
        <path
          d="M 29,45 C 24,30 25,12 29,2 C 32,15 32,32 29,45 Z"
          fill={colors.bladeFill}
          stroke={colors.bladeStroke}
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}

export default function RealisticKelp() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "380px",
        pointerEvents: "none",
        zIndex: 1, // Fica imediatamente acima do fundo de rocha e abaixo do conteúdo de texto
        overflow: "hidden",
      }}
    >
      {KELP_STRANDS.map((k) => (
        <div
          key={k.id}
          className={`kelp-sway-${k.animType.toLowerCase()}`}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: `${k.xPercent}%`,
            transformOrigin: "bottom center",
            animationDuration: k.duration,
            animationDelay: k.delay,
            filter: k.layer === "back" ? "blur(1.5px)" : "none",
          }}
        >
          <KelpSVG
            width={k.width}
            height={k.height}
            layer={k.layer}
            flip={k.flip}
          />
        </div>
      ))}
    </div>
  );
}
