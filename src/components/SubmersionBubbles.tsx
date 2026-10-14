"use client";

import { useEffect, useRef } from "react";

/**
 * SubmersionBubbles — Sistema de bolhas de ar subaquáticas dinâmicas
 *
 * Características:
 * - Acima da água (Hero, scrollY < 150): quase sem bolhas (ar aberto).
 * - Ao cruzar a superfície (scrollY ~ 200-400): explosão de efervescência/cavitação
 *   simulando o mergulhador rompendo a tensão superficial.
 * - Conforme a tela desce (scroll down): a velocidade de deslocamento da água
 *   gera e acelera rajadas de bolhas subindo velozes com oscilação hidrodinâmica.
 * - Em repouso subaquático: deriva ambiente serena de micro e médias bolhas.
 * - Renderizado em Canvas 2D ultra-otimizado (sem peso no DOM, 60fps constante).
 */

interface Bubble {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  baseVy: number;
  vy: number;
  vx: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleOffset: number;
  opacity: number;
  maxOpacity: number;
  shimmerOffset: number;
}

export default function SubmersionBubbles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ajuste de DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Estado de scroll e física
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let hasTriggeredSurfacePlunge = false;

    const bubbles: Bubble[] = [];
    const MAX_BUBBLES = 85;

    const createBubble = (
      customY?: number,
      speedMultiplier = 1,
      sizeMultiplier = 1
    ): Bubble => {
      const radius = (Math.random() * 5 + 2) * sizeMultiplier;
      return {
        x: Math.random() * width,
        y: customY !== undefined ? customY : height + Math.random() * 80,
        radius,
        baseRadius: radius,
        baseVy: (Math.random() * 1.8 + 1.2) * speedMultiplier,
        vy: (Math.random() * 1.8 + 1.2) * speedMultiplier,
        vx: 0,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        wobbleAmp: Math.random() * 1.6 + 0.6,
        wobbleOffset: Math.random() * Math.PI * 2,
        opacity: 0,
        maxOpacity: Math.random() * 0.45 + 0.35,
        shimmerOffset: Math.random() * 10,
      };
    };

    // Sem bolhas estáticas iniciais — surgem apenas quando o usuário rola a página para baixo

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Aparecem apenas quando o usuário descer o scroll!
      if (delta > 0 && currentScrollY > 120) {
        scrollVelocity = Math.min(scrollVelocity + delta * 0.35, 18);

        // Quantidade de bolhas proporcional ao movimento de descida
        const spawnCount = Math.min(Math.floor(delta / 8) + 1, 6);
        for (let i = 0; i < spawnCount; i++) {
          if (bubbles.length < MAX_BUBBLES) {
            bubbles.push(createBubble(height + Math.random() * 40, 1 + delta * 0.04));
          }
        }
      } else if (delta < 0) {
        scrollVelocity = Math.max(scrollVelocity + delta * 0.2, -4);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    // Loop de Renderização
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Fator de profundidade
      const currentY = window.scrollY;
      const depthFactor = Math.min(Math.max((currentY - 120) / 250, 0), 1);

      // Amortecimento da velocidade do scroll
      scrollVelocity *= 0.90;

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];

        // Velocidade vertical impulsionada pelo scroll para baixo
        const extraVy = Math.max(scrollVelocity * 0.45, 0);
        b.vy = b.baseVy + extraVy;
        b.y -= b.vy;

        // Oscilação lateral sinusoidal orgânica (wobble de bolha subindo)
        b.x += Math.sin(time * 3 + b.wobbleOffset) * b.wobbleAmp;

        // Fade in suave ao nascer e fade out ao chegar no topo
        if (b.y > height - 40) {
          b.opacity = Math.min(b.opacity + 0.05, b.maxOpacity * depthFactor);
        } else if (b.y < 80) {
          b.opacity = Math.max(b.opacity - 0.06, 0);
        } else {
          b.opacity = Math.min(b.opacity + 0.03, b.maxOpacity * depthFactor);
        }

        // Leve deformação elíptica (squash & stretch pela pressão hidrodinâmica)
        const stretch = 1 + Math.sin(time * 4 + b.shimmerOffset) * 0.08 + extraVy * 0.03;
        const rx = b.radius / Math.sqrt(stretch);
        const ry = b.radius * Math.sqrt(stretch);

        if (b.opacity > 0.01) {
          ctx.save();
          ctx.translate(b.x, b.y);

          // 1. Corpo translúcido da bolha
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 52, 74, ${b.opacity * 0.25})`;
          ctx.fill();

          // 2. Anel de refração externa (halo aquático sutil)
          ctx.lineWidth = Math.max(0.8, b.radius * 0.14);
          ctx.strokeStyle = `rgba(140, 205, 235, ${b.opacity * 0.75})`;
          ctx.stroke();

          // 3. Brilho especular (ponto de luz no topo esquerdo)
          const glintX = -rx * 0.38;
          const glintY = -ry * 0.38;
          const glintR = Math.max(0.8, rx * 0.28);

          ctx.beginPath();
          ctx.arc(glintX, glintY, glintR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.95})`;
          ctx.fill();

          // 4. Reflexo secundário sutil na base interna
          ctx.beginPath();
          ctx.arc(rx * 0.25, ry * 0.25, glintR * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 230, 255, ${b.opacity * 0.45})`;
          ctx.fill();

          ctx.restore();
        }

        // Remove bolhas que saíram do topo da tela ou esvaneceram
        if (b.y < -30 || (b.y < 80 && b.opacity <= 0.01)) {
          bubbles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1, // Fica atrás dos cards e conteúdos (z-index: 10), mas sobre os fundos aquáticos
      }}
    />
  );
}
