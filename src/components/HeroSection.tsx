"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import SurfaceWaves from "./SurfaceWaves";

// ---- Deep Sea Ambient Particles ----
const PARTICLES = [
  { w: 2, h: 2, left: "8%",  animDuration: "22s", animDelay: "0s"    },
  { w: 3, h: 3, left: "17%", animDuration: "28s", animDelay: "4s"    },
  { w: 2, h: 2, left: "25%", animDuration: "19s", animDelay: "1.5s"  },
  { w: 4, h: 4, left: "33%", animDuration: "35s", animDelay: "7s"    },
  { w: 2, h: 2, left: "41%", animDuration: "24s", animDelay: "2s"    },
  { w: 3, h: 3, left: "52%", animDuration: "30s", animDelay: "9s"    },
  { w: 2, h: 2, left: "60%", animDuration: "21s", animDelay: "3s"    },
  { w: 3, h: 3, left: "68%", animDuration: "27s", animDelay: "6s"    },
  { w: 2, h: 2, left: "75%", animDuration: "18s", animDelay: "0.5s"  },
  { w: 4, h: 4, left: "83%", animDuration: "32s", animDelay: "11s"   },
  { w: 2, h: 2, left: "90%", animDuration: "20s", animDelay: "5s"    },
  { w: 3, h: 3, left: "48%", animDuration: "25s", animDelay: "8s"    },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax subtle shifts
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section-wrapper"
      style={{
        position: "relative",
        width: "100%",
        background: "linear-gradient(to bottom, #06121C 0%, #081726 50%, #0A1E30 80%, #0C263C 100%)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ---- Atmospheric Coastal Open Sky Gradient (acima da água) ---- */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 70% at 50% 10%, rgba(14, 45, 70, 0.22) 0%, transparent 70%), " +
            "linear-gradient(to bottom, rgba(4, 14, 24, 0.35) 0%, transparent 60%, rgba(7, 25, 42, 0.3) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ---- Surface Waves — linha do horizonte aquoso ---- */}
      <SurfaceWaves />

      {/* ---- Deep Sea Ambient Particles ---- */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
      >
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: p.w,
              height: p.h,
              left: p.left,
              bottom: "-10px",
              opacity: 0.35,
              animationDuration: p.animDuration,
              animationDelay: p.animDelay,
            }}
          />
        ))}
      </div>

      {/* ---- Top Navbar Bar (Header with Horizontal Logo) ---- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          borderBottom: "1px solid var(--hairline-dark)",
          padding: "0.875rem clamp(1rem, 3.5vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        {/* Horizontal Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="/Logo_2_Horizontal_PNG.png"
            alt="Thauã Felipe — Engenheiro da Computação"
            style={{
              height: "clamp(26px, 2.5vw, 36px)",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </motion.div>

        {/* Status top-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 8px #10B981",
            }}
          />
          <span className="maralto-label-dark" style={{ opacity: 0.85, fontSize: "clamp(0.6rem, 0.75vw, 0.6875rem)", whiteSpace: "nowrap" }}>
            DISPONÍVEL PARA PROJETOS
          </span>
          <span className="hidden sm:inline" style={{ color: "var(--hairline-dark)", margin: "0 0.15rem" }}>·</span>
          <span className="maralto-label-dark hidden sm:inline" style={{ opacity: 0.5, fontSize: "clamp(0.5625rem, 0.7vw, 0.6875rem)", whiteSpace: "nowrap" }}>
            PORTFÓLIO 2026
          </span>
        </motion.div>
      </div>

      {/* ---- Main Hero Content ---- */}
      <div
        className="hero-main-content-box"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          maxWidth: "min(1760px, 94vw)",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* === LEFT CONTENT — Logo Maior, Espaçamentos Calibrados, Frase & Card === */}
        <motion.div
          style={{
            flex: "0 0 min(720px, 100%)",
            maxWidth: "clamp(520px, 48vw, 780px)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.85rem, 1.8vh, 1.45rem)",
            y: leftY,
            position: "relative",
            zIndex: 4,
          }}
        >
          {/* Status Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span className="maralto-telemetry-dot" />
            <span className="maralto-label-dark" style={{ fontSize: "clamp(0.625rem, 0.75vw, 0.75rem)" }}>PORTFÓLIO // FULL-STACK & ENGENHARIA</span>
          </motion.div>

          {/* Logo 2 (Grande e imponente em telas grandes) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: "0.15rem 0" }}
          >
            <img
              src="/Logo_2_PNG.png"
              alt="Thauã Felipe — Engenheiro da Computação"
              style={{
                width: "clamp(260px, 24vw, 400px)",
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </motion.div>

          {/* Frase de Destaque Grande e Impactante */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(1.4rem, 2.2vw, 2.5rem)",
              lineHeight: 1.22,
              letterSpacing: "-0.025em",
              color: "var(--text-primary-on-dark)",
              maxWidth: "30ch",
            }}
          >
            Soluções digitais para os seus problemas{" "}
            <span
              style={{
                color: "var(--signal-amber-dark)",
                display: "block",
                fontWeight: 500,
                marginTop: "0.35rem",
                fontSize: "0.88em",
              }}
            >
              — Do conceito ao produto final
            </span>
          </motion.h1>

          {/* Foto de Thauã para Telas Menores (< 1024px) — fluida no fluxo, nunca sobrepõe texto */}
          <div className="hero-mobile-photo-box lg:hidden">
            <div className="hero-mobile-photo-inner">
              <div aria-hidden className="hero-mobile-photo-halo" />
              <Image
                src="/FotoPerfil_Estudio.png"
                alt="Thauã Felipe — Engenheiro da computação"
                width={360}
                height={430}
                priority
                className="hero-mobile-photo-img"
              />
            </div>
            <div className="hero-mobile-photo-badge">
              <span className="maralto-telemetry-dot" />
              <span>Engenheiro da Computação</span>
            </div>
          </div>

          {/* Card: Mais de 10 soluções desenvolvidas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(0.75rem, 1.2vw, 1rem)",
              padding: "clamp(0.6rem, 1vh, 0.85rem) clamp(0.85rem, 1.4vw, 1.25rem)",
              backgroundColor: "rgba(13, 29, 38, 0.75)",
              border: "1px solid rgba(88, 139, 158, 0.28)",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(10px)",
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(2.35rem, 2.8vw, 3rem)",
                height: "clamp(2.35rem, 2.8vw, 3rem)",
                borderRadius: "6px",
                backgroundColor: "rgba(224, 112, 60, 0.14)",
                border: "1px solid rgba(224, 112, 60, 0.35)",
                color: "var(--signal-amber-dark)",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              9
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(0.875rem, 1vw, 1.05rem)",
                  color: "var(--text-primary-on-dark)",
                  lineHeight: 1.25,
                }}
              >
                9 projetos desenvolvidos
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.6875rem, 0.75vw, 0.8rem)",
                  letterSpacing: "0.02em",
                  color: "var(--accent-pelagic)",
                  marginTop: "3px",
                }}
              >
                Sites, sistemas de gestão, Aplicativos Mobile
              </span>
            </div>
          </motion.div>

          {/* Subtitle Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-body"
            style={{
              color: "var(--text-secondary-on-dark)",
              maxWidth: "46ch",
              fontSize: "clamp(0.875rem, 1vw, 1.05rem)",
              lineHeight: 1.65,
            }}
          >
            Engenharia de software focada em resolver desafios reais com arquitetura
            sólida, interfaces imersivas e entrega com máxima confiabilidade.
          </motion.p>

          {/* CTA Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "clamp(1.25rem, 2vw, 2.25rem)",
              marginTop: "0.35rem",
            }}
          >
            <MagneticButton>
              <a
                href="#cases"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="maralto-link-dark"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "clamp(0.6875rem, 0.8vw, 0.75rem)" }}
              >
                VER PROJETOS
                <span className="arrow-icon">↓</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.6875rem, 0.8vw, 0.75rem)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--signal-amber-dark)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                CONTATO DIRETO
                <span style={{ fontSize: "0.85em" }}>↗</span>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* === RIGHT PHOTO — Grande, imponente e responsiva === */}
      <motion.div
        className="hero-photo-wrapper hidden lg:flex"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          y: photoY,
        }}
      >
        {/* Halo de Iluminação Atmosférica Oceânica */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "5%",
            bottom: "10%",
            width: "clamp(480px, 38vw, 760px)",
            height: "clamp(480px, 38vw, 760px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(22, 91, 117, 0.38) 0%, rgba(224, 112, 60, 0.08) 45%, transparent 70%)",
            filter: "blur(55px)",
            pointerEvents: "none",
          }}
        />

        {/* Foto de Perfil com Transparência Encostada na Borda Direita */}
        <div
          style={{
            position: "relative",
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            alignItems: "flex-end",
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          }}
        >
          <Image
            src="/FotoPerfil_Estudio.png"
            alt="Thauã Felipe — Engenheiro da computação"
            width={850}
            height={1020}
            priority
            className="hero-photo-img"
          />

          {/* Badge: apenas "Engenheiro da computação" em baixo por cima da foto */}
          <motion.div
            className="hero-badge-overlay"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            style={{
              gap: "0.55rem",
              padding: "0.5rem 1.15rem",
              backgroundColor: "rgba(8, 19, 26, 0.9)",
              border: "1px solid var(--hairline-dark)",
              borderRadius: "9999px",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.55)",
            }}
          >
            <span className="maralto-telemetry-dot" />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.75rem, 0.85vw, 0.95rem)",
                fontWeight: 500,
                color: "var(--text-secondary-on-dark)",
                letterSpacing: "0.01em",
              }}
            >
              Engenheiro da computação
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* ---- Scroll Indicator Bottom-Left ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.4rem",
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "1.75rem",
            backgroundColor: "var(--hairline-dark)",
            position: "relative",
            overflow: "hidden",
          }}
          className="scroll-indicator-line"
        />
        <span
          className="maralto-label-dark"
          style={{ opacity: 0.4, fontSize: "0.5rem", letterSpacing: "0.18em" }}
        >
          INICIAR IMERSÃO
        </span>
      </motion.div>
    </section>
  );
}
