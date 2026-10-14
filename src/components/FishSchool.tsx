"use client";

/**
 * FishSchool — Cardumes decorativos de fundo para CasesSection
 *
 * 3 bancos de peixe em alturas, velocidades e desfocagens distintas
 * criam a ilusão de profundidade (peixe longe = mais blur = menor).
 * Usados como overlay position:absolute, pointer-events:none.
 */

// ─── SVG de um único peixe (virado à direita por padrão) ────────────
function FishSvg({ opacity = 1 }: { opacity?: number }) {
  const c = `rgba(88,139,158,${(0.8 * opacity).toFixed(2)})`;
  return (
    <svg
      width="36"
      height="16"
      viewBox="0 0 36 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Cauda */}
      <polygon points="7,8 0,2 0,14" fill={c} />
      {/* Corpo */}
      <ellipse cx="22" cy="8" rx="13" ry="5.5" fill={c} />
      {/* Nadadeira dorsal */}
      <path d="M17 8 Q19 4 24 5 Q22 8 17 8Z" fill={c} opacity={0.55} />
      {/* Olho */}
      <circle cx="31" cy="7" r="1.5" fill="rgba(5,14,22,0.65)" />
    </svg>
  );
}

// ─── Posições relativas dos peixes dentro de cada cardume ───────────
type FishPos = { dx: number; dy: number; scale: number; opacity: number };

const SCHOOL_OFFSETS: FishPos[][] = [
  // Cardume 1 – médio, 6 peixes
  [
    { dx: 0,   dy: 0,   scale: 1.0,  opacity: 0.9 },
    { dx: 44,  dy: -9,  scale: 0.85, opacity: 0.8 },
    { dx: 28,  dy: 10,  scale: 0.9,  opacity: 0.85 },
    { dx: 80,  dy: -5,  scale: 0.8,  opacity: 0.75 },
    { dx: 62,  dy: 7,   scale: 0.95, opacity: 0.8 },
    { dx: 108, dy: 0,   scale: 0.7,  opacity: 0.7 },
  ],
  // Cardume 2 – mais fundo / mais blur, 8 peixes (RTL)
  [
    { dx: 0,   dy: 0,   scale: 0.7,  opacity: 0.8 },
    { dx: 32,  dy: -8,  scale: 0.65, opacity: 0.7 },
    { dx: 16,  dy: 9,   scale: 0.75, opacity: 0.75 },
    { dx: 58,  dy: 2,   scale: 0.6,  opacity: 0.65 },
    { dx: 48,  dy: -11, scale: 0.7,  opacity: 0.7 },
    { dx: 74,  dy: 5,   scale: 0.65, opacity: 0.6 },
    { dx: 92,  dy: -3,  scale: 0.55, opacity: 0.65 },
    { dx: 112, dy: 8,   scale: 0.6,  opacity: 0.6 },
  ],
  // Cardume 3 – mais superficial, peixes pequenos rápidos
  [
    { dx: 0,  dy: 0,  scale: 0.55, opacity: 0.9 },
    { dx: 22, dy: -7, scale: 0.5,  opacity: 0.8 },
    { dx: 12, dy: 7,  scale: 0.6,  opacity: 0.85 },
    { dx: 38, dy: -3, scale: 0.45, opacity: 0.75 },
    { dx: 50, dy: 5,  scale: 0.5,  opacity: 0.8 },
  ],
];

interface SchoolConfig {
  top: string;
  blur: number;
  duration: number;
  delay: number;
  direction: "ltr" | "rtl";
  schoolIndex: number;
}

const SCHOOL_CONFIGS: SchoolConfig[] = [
  { top: "22%", blur: 1.5, duration: 24, delay: 0,  direction: "ltr", schoolIndex: 0 },
  { top: "54%", blur: 3.5, duration: 38, delay: 9,  direction: "rtl", schoolIndex: 1 },
  { top: "73%", blur: 5.0, duration: 17, delay: 4,  direction: "ltr", schoolIndex: 2 },
];

function SchoolLayer({ config }: { config: SchoolConfig }) {
  const isRTL = config.direction === "rtl";
  const offsets = SCHOOL_OFFSETS[config.schoolIndex];
  const clusterW = Math.max(...offsets.map((o) => o.dx)) + 80;
  const clusterH = 60;

  return (
    <div
      className="fish-school"
      style={{
        position: "absolute",
        top: config.top,
        left: 0,
        width: clusterW,
        height: clusterH,
        filter: `blur(${config.blur}px)`,
        willChange: "transform",
        animation: `fish-swim-${config.direction} ${config.duration}s linear ${config.delay}s infinite`,
      }}
    >
      {offsets.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: pos.dx,
            top: pos.dy + clusterH / 2 - 8,
            transform: `scale(${pos.scale})${isRTL ? " scaleX(-1)" : ""}`,
            transformOrigin: "left center",
            lineHeight: 0,
          }}
        >
          <FishSvg opacity={pos.opacity} />
        </div>
      ))}
    </div>
  );
}

export default function FishSchool() {
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
      {SCHOOL_CONFIGS.map((cfg, i) => (
        <SchoolLayer key={i} config={cfg} />
      ))}
    </div>
  );
}
