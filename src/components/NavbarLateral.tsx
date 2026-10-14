"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// Major Zones with their anchor depths and section target IDs
interface ZoneMarker {
  id: string;
  depth: number;
  depthFormatted: string;
  label: string;
}

const ZONES: ZoneMarker[] = [
  { id: "hero",      depth: 0,   depthFormatted: "00m",   label: "SUPERFÍCIE"   },
  { id: "cases",     depth: 120, depthFormatted: "-120m", label: "EUFÓTICA"     },
  { id: "evolution", depth: 350, depthFormatted: "-350m", label: "MESOPELÁGICA" },
  { id: "stack",     depth: 700, depthFormatted: "-700m", label: "BATIAL"       },
  { id: "footer",    depth: 950, depthFormatted: "-950m", label: "ABISSAL"      },
];

const MAX_DEPTH = 950;

// Percentage calculator (0 to 100% of ruler track)
const depthToPct = (d: number) => Math.min(100, Math.max(0, (d / MAX_DEPTH) * 100));

// Generate intermediate ruler ticks (every 25m from 0 to 950)
interface IntermediateTick {
  depth: number;
  isMedium: boolean;
  pct: number;
}

const generateIntermediateTicks = (): IntermediateTick[] => {
  const ticks: IntermediateTick[] = [];
  const majorDepths = new Set(ZONES.map((z) => z.depth));

  for (let d = 25; d < MAX_DEPTH; d += 25) {
    // Clear area around -120m (exclude 75m, 100m, 125m, 150m) to eliminate crowding
    if (Math.abs(d - 120) <= 30) continue;
    // Skip if it matches any major depth
    if (majorDepths.has(d)) continue;

    ticks.push({
      depth: d,
      isMedium: d % 100 === 0,
      pct: depthToPct(d),
    });
  }
  return ticks;
};

const INTERMEDIATE_TICKS = generateIntermediateTicks();

export default function NavbarLateral() {
  const [currentDepth, setCurrentDepth] = useState(0);
  const [activeId, setActiveId] = useState("hero");

  // Calibrated depth calculation: piecewise interpolation between exact section document positions
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const totalH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    // Compute exact document offset (getBoundingClientRect + window.scrollY) for each anchor
    const points = ZONES.map((zone, idx) => {
      if (idx === 0) {
        return { id: zone.id, depth: zone.depth, offset: 0 };
      }
      const el = document.getElementById(zone.id);
      if (!el) {
        return { id: zone.id, depth: zone.depth, offset: (zone.depth / MAX_DEPTH) * totalH };
      }
      const rect = el.getBoundingClientRect();
      const docTop = rect.top + scrollY;

      if (idx === ZONES.length - 1) {
        return { id: zone.id, depth: zone.depth, offset: Math.min(docTop - 60, totalH) };
      }
      return { id: zone.id, depth: zone.depth, offset: Math.max(0, docTop - 60) };
    });

    let depth = 0;
    if (scrollY <= points[0].offset) {
      depth = points[0].depth;
    } else if (scrollY >= points[points.length - 1].offset) {
      depth = points[points.length - 1].depth;
    } else {
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        if (scrollY >= p1.offset && scrollY <= p2.offset) {
          const range = p2.offset - p1.offset;
          const t = range > 0 ? (scrollY - p1.offset) / range : 0;
          depth = Math.round(p1.depth + t * (p2.depth - p1.depth));
          break;
        }
      }
    }

    setCurrentDepth(depth);

    // Determine active zone based on calibrated depth midpoints
    if (depth < 60) {
      setActiveId("hero");
    } else if (depth < 235) {
      setActiveId("cases");
    } else if (depth < 525) {
      setActiveId("evolution");
    } else if (depth < 825) {
      setActiveId("stack");
    } else {
      setActiveId("footer");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const scrollToZone = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const rect = el.getBoundingClientRect();
    const target = Math.max(0, rect.top + window.scrollY - 60);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  // Determine if the current active zone has a light background (Cases & Evolution)
  const isLight = activeId === "cases" || activeId === "evolution";
  const progressRatio = depthToPct(currentDepth) / 100;

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Régua Batimétrica de Profundidade"
      className="hidden md:flex"
      style={{
        position: "fixed",
        left: "1.75rem",
        top: "5.5rem",
        bottom: "3.5rem",
        zIndex: 90,
        width: "145px",
        flexDirection: "column",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* ── Integrated Ruler Track ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Vertical Ruler Spine Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "12px",
            width: "1px",
            backgroundColor: isLight ? "rgba(8, 19, 26, 0.25)" : "rgba(255, 255, 255, 0.22)",
            transition: "background-color 0.4s var(--ease-ocean)",
          }}
        />

        {/* Lit Progress Fill (Submarine depth descent) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "12px",
            width: "2px",
            height: `${progressRatio * 100}%`,
            backgroundColor: isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)",
            boxShadow: isLight
              ? "0 0 6px rgba(200, 90, 40, 0.5)"
              : "0 0 8px rgba(224, 112, 60, 0.8)",
            transition: "height 0.08s linear, background-color 0.4s",
          }}
        />

        {/* Intermediate Physical Ruler Ticks (Pure precision marks, no colliding numbers) */}
        {INTERMEDIATE_TICKS.map((t) => {
          const isPassed = currentDepth >= t.depth;
          return (
            <div
              key={t.depth}
              style={{
                position: "absolute",
                top: `${t.pct}%`,
                left: "12px",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              {/* Horizontal Tick Mark */}
              <div
                style={{
                  width: t.isMedium ? "9px" : "4px",
                  height: "1px",
                  backgroundColor: isPassed
                    ? isLight
                      ? "rgba(200, 90, 40, 0.7)"
                      : "rgba(224, 112, 60, 0.7)"
                    : isLight
                    ? t.isMedium
                      ? "rgba(8, 19, 26, 0.45)"
                      : "rgba(8, 19, 26, 0.25)"
                    : t.isMedium
                    ? "rgba(255, 255, 255, 0.38)"
                    : "rgba(255, 255, 255, 0.18)",
                  transition: "all 0.35s",
                }}
              />
            </div>
          );
        })}

        {/* Major Zone Markers & Interactive Triggers */}
        {ZONES.map((zone) => {
          const isActive = activeId === zone.id;
          const isPassed = currentDepth >= zone.depth;

          return (
            <button
              key={zone.id}
              onClick={() => scrollToZone(zone.id)}
              title={`Navegar para Zona ${zone.label} (${zone.depthFormatted})`}
              data-cursor-hover
              style={{
                position: "absolute",
                top: `${depthToPct(zone.depth)}%`,
                left: 0,
                width: "100%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                background: "transparent",
                border: "none",
                padding: "0.5rem 0.25rem",
                minHeight: "40px",
                cursor: "pointer",
                textAlign: "left",
                outline: "none",
                pointerEvents: "auto",
                transition: "all 0.25s var(--ease-ocean)",
              }}
              onMouseEnter={(e) => {
                const tick = e.currentTarget.querySelector(".major-tick") as HTMLElement | null;
                const dot = e.currentTarget.querySelector(".zone-dot") as HTMLElement | null;
                const depthText = e.currentTarget.querySelector(".zone-depth") as HTMLElement | null;
                if (!isActive) {
                  if (tick) {
                    tick.style.width = "20px";
                    tick.style.backgroundColor = isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)";
                  }
                  if (dot) {
                    dot.style.transform = "scale(1.3)";
                    dot.style.backgroundColor = isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)";
                  }
                  if (depthText) {
                    depthText.style.color = isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)";
                  }
                }
              }}
              onMouseLeave={(e) => {
                const tick = e.currentTarget.querySelector(".major-tick") as HTMLElement | null;
                const dot = e.currentTarget.querySelector(".zone-dot") as HTMLElement | null;
                const depthText = e.currentTarget.querySelector(".zone-depth") as HTMLElement | null;
                if (!isActive) {
                  if (tick) {
                    tick.style.width = "14px";
                    tick.style.backgroundColor = isPassed
                      ? isLight ? "rgba(200, 90, 40, 0.7)" : "rgba(224, 112, 60, 0.7)"
                      : isLight ? "rgba(8, 19, 26, 0.5)" : "rgba(255, 255, 255, 0.45)";
                  }
                  if (dot) {
                    dot.style.transform = "scale(1)";
                    dot.style.backgroundColor = isPassed
                      ? isLight ? "rgba(200, 90, 40, 0.7)" : "rgba(224, 112, 60, 0.7)"
                      : isLight ? "rgba(8, 19, 26, 0.4)" : "rgba(255, 255, 255, 0.4)";
                  }
                  if (depthText) {
                    depthText.style.color = isPassed
                      ? isLight ? "rgba(8, 19, 26, 0.9)" : "rgba(240, 245, 248, 0.9)"
                      : isLight ? "rgba(8, 19, 26, 0.6)" : "rgba(240, 245, 248, 0.65)";
                  }
                }
              }}
            >
              {/* Major Tick Mark (Traço Principal da Régua) */}
              <div
                className="major-tick"
                style={{
                  position: "relative",
                  width: isActive ? "20px" : "14px",
                  height: "2px",
                  backgroundColor: isActive
                    ? isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)"
                    : isPassed
                    ? isLight ? "rgba(200, 90, 40, 0.7)" : "rgba(224, 112, 60, 0.7)"
                    : isLight ? "rgba(8, 19, 26, 0.5)" : "rgba(255, 255, 255, 0.45)",
                  flexShrink: 0,
                  marginRight: "6px",
                  transition: "all 0.25s var(--ease-ocean)",
                  boxShadow: isActive
                    ? isLight
                      ? "0 0 6px rgba(200, 90, 40, 0.6)"
                      : "0 0 8px var(--signal-amber-dark)"
                    : "none",
                }}
              />

              {/* Indicator Dot */}
              <div
                className="zone-dot"
                style={{
                  width: isActive ? "6px" : "4px",
                  height: isActive ? "6px" : "4px",
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)"
                    : isPassed
                    ? isLight ? "rgba(200, 90, 40, 0.7)" : "rgba(224, 112, 60, 0.7)"
                    : isLight ? "rgba(8, 19, 26, 0.4)" : "rgba(255, 255, 255, 0.4)",
                  boxShadow: isActive
                    ? isLight
                      ? "0 0 8px rgba(200, 90, 40, 0.7)"
                      : "0 0 10px var(--signal-amber-dark)"
                    : "none",
                  flexShrink: 0,
                  marginRight: "7px",
                  transition: "all 0.25s var(--ease-ocean)",
                }}
              />

              {/* Zone Labels: Depth + Zone Name (Clean, without 01, 02 indices) */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  className="zone-depth"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "0.08em",
                    color: isActive
                      ? isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)"
                      : isPassed
                      ? isLight ? "rgba(8, 19, 26, 0.9)" : "rgba(240, 245, 248, 0.9)"
                      : isLight ? "rgba(8, 19, 26, 0.6)" : "rgba(240, 245, 248, 0.65)",
                    transition: "color 0.3s var(--ease-ocean)",
                    whiteSpace: "nowrap",
                    lineHeight: 1.1,
                  }}
                >
                  {zone.depthFormatted}
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.45rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    color: isActive
                      ? isLight ? "var(--text-primary-on-light)" : "var(--text-primary-on-dark)"
                      : isLight ? "var(--text-secondary-on-light)" : "var(--text-secondary-on-dark)",
                    opacity: isActive ? 1 : 0.75,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    lineHeight: 1.1,
                    marginTop: "2px",
                    transition: "color 0.3s var(--ease-ocean), opacity 0.3s",
                  }}
                >
                  {zone.label}
                </span>
              </div>
            </button>
          );
        })}

        {/* ── Sliding Altimeter Reticle Needle (Diamond Indicator) ── */}
        <div
          style={{
            position: "absolute",
            top: `${progressRatio * 100}%`,
            left: "12px",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            transition: "top 0.08s linear",
          }}
        >
          {/* Glowing Diamond Needle */}
          <div
            style={{
              width: "7px",
              height: "7px",
              transform: "rotate(45deg)",
              backgroundColor: isLight ? "var(--signal-amber)" : "var(--signal-amber-dark)",
              boxShadow: isLight
                ? "0 0 8px rgba(200, 90, 40, 0.7)"
                : "0 0 10px var(--signal-amber-dark), 0 0 4px #fff",
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </motion.nav>
  );
}
