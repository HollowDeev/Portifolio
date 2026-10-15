"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import FishSchool from "./FishSchool";
import ProjectCard from "./ProjectCard";
import ProjectGalleryModal from "./ProjectGalleryModal";
import { PROJECTS_DATA, ProjectItem } from "@/data/projectsData";

// ---- FadeIn Wrapper ----
function FadeIn({
  children,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ---- Animated Wire (hover reacts with amber glow) ----
function AnimatedWire() {
  const [hoverX, setHoverX] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        setHoverX(e.clientX - rect.left);
      }}
      onMouseLeave={() => setHoverX(null)}
      style={{
        position: "relative",
        width: "100%",
        height: "1px",
        backgroundColor: "var(--hairline-shallow)",
        cursor: "crosshair",
        margin: "1rem 0",
      }}
    >
      {hoverX !== null && (
        <motion.div
          animate={{ left: hoverX - 48, opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            position: "absolute",
            top: 0,
            width: "96px",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, var(--signal-amber), transparent)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

// ---- Section ----
export default function CasesSection() {
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);

  return (
    <section id="cases" className="section-ocean-shallow">
      {/* Cardumes de peixe no fundo */}
      <FishSchool />

      <div className="container-maralto cases-container" style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "3.5rem",
          }}
        >
          {/* Section Header */}
          <FadeIn>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--hairline-shallow)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--signal-amber)",
                    boxShadow: "0 0 10px var(--signal-amber)",
                  }}
                />
                <span className="maralto-label">
                  01 // -120M ZONA EUFÓTICA — PROJETOS IMPLEMENTADOS
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: "1.75rem",
                }}
              >
                <div>
                  <h2
                    className="text-h1"
                    style={{
                      color: "var(--text-primary-on-dark)",
                      lineHeight: 1.15,
                    }}
                  >
                    Cases & Projetos
                  </h2>
                  <p
                    style={{
                      color: "var(--text-secondary-on-dark)",
                      fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)",
                      maxWidth: "60ch",
                      marginTop: "0.75rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Sistemas industriais, ERPs comerciais de alta cadência,
                    plataformas distribuídas em tempo real e ecossistemas web
                    desenvolvidos sob medida com foco em performance e resultados reais.
                  </p>
                </div>

                <div
                  className="cases-stats-bar"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.75rem",
                    padding: "0.75rem 1.25rem",
                    backgroundColor: "rgba(3, 14, 26, 0.75)",
                    borderRadius: "10px",
                    border: "1px solid rgba(80, 160, 240, 0.18)",
                  }}
                >
                  <div>
                    <span
                      className="maralto-label"
                      style={{ display: "block", marginBottom: "0.25rem" }}
                    >
                      PROJETOS
                    </span>
                    <AnimatedCounter
                      target={PROJECTS_DATA.length}
                      prefix="0"
                      suffix="+"
                      duration={1400}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: "var(--signal-amber)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "1px",
                      height: "36px",
                      backgroundColor: "var(--hairline-shallow)",
                    }}
                  />
                  <div>
                    <span
                      className="maralto-label"
                      style={{ display: "block", marginBottom: "0.25rem" }}
                    >
                      CATEGORIAS
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
                        fontWeight: 600,
                        color: "var(--text-primary-on-dark)",
                        lineHeight: 1.3,
                      }}
                    >
                      Aplicativos de Celular, Sites e Sistemas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* List of all 9 Project Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
            {PROJECTS_DATA.map((project, index) => (
              <div key={project.id} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <ProjectCard
                  project={project}
                  onOpenGallery={(proj) => setSelectedModalProject(proj)}
                  delay={index === 0 ? 0 : 0.05}
                />
                {index < PROJECTS_DATA.length - 1 && <AnimatedWire />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      <ProjectGalleryModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </section>
  );
}
