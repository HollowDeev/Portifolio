"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectItem } from "@/data/projectsData";

import MagneticButton from "./MagneticButton";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenGallery: (project: ProjectItem) => void;
  delay?: number;
}

export default function ProjectCard({
  project,
  onOpenGallery,
  delay = 0,
}: ProjectCardProps) {
  // Multi-sublink selection (Central Soluções SP)
  const [selectedUrl, setSelectedUrl] = useState<string>(
    project.liveUrl || (project.subLinks && project.subLinks[0]?.url) || ""
  );

  // View mode switch: supports live iframe vs photo gallery toggle
  const [viewMode, setViewMode] = useState<"live" | "photos">(
    project.liveUrl ? "live" : "photos"
  );

  const isUrlProject = Boolean(project.liveUrl);

  // Primary photo for preview display
  const primaryPhoto =
    project.photos && project.photos.length > 0 ? project.photos[0] : null;

  const currentLiveUrl = selectedUrl || project.liveUrl || "";

  // Button text determination matching wireframe
  const isCurrentlyUrl = isUrlProject && viewMode === "live";
  const buttonLabel = isCurrentlyUrl
    ? (project.id === "industrial-pro" ? "TESTAR SISTEMA AO VIVO ↗" : "VER DE PERTO | Acessar Site")
    : "VER DE PERTO | Galeria de Fotos";

  return (
    <div className="project-card-wrapper">
      {/* Big Corner Number — layered BEHIND the project card */}
      <span className="project-corner-number" aria-hidden="true">
        {project.index}
      </span>

      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        className="project-card-container"
      >

      {/* ============================================================
          1. TOP ROW: TWO COLUMNS (PHOTO/IFRAME LEFT, DETAILS RIGHT)
          ============================================================ */}
      <div className="project-top-row">
        {/* TOP-LEFT: Photo or Live Iframe Viewport with Single Docked Button */}
        <div className="project-preview-box">
          {/* Sub-links switcher for multi-site project (Central Soluções SP) */}
          {project.subLinks && project.subLinks.length > 0 && (
            <div className="project-subnav-bar">
              {project.subLinks.map((sub) => {
                const isActive = selectedUrl === sub.url;
                return (
                  <button
                    key={sub.url}
                    onClick={() => setSelectedUrl(sub.url)}
                    className={`project-subnav-btn ${isActive ? "active" : ""}`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Subnav switcher for IndustrialPRO (Ambiente de Testes vs Galeria) */}
          {project.id === "industrial-pro" && project.liveUrl && project.photos && (
            <div className="project-subnav-bar">
              <button
                onClick={() => setViewMode("live")}
                className={`project-subnav-btn ${viewMode === "live" ? "active" : ""}`}
              >
                ⚡ Ambiente de Testes (Ao Vivo)
              </button>
              <button
                onClick={() => setViewMode("photos")}
                className={`project-subnav-btn ${viewMode === "photos" ? "active" : ""}`}
              >
                📷 Galeria de Prints ({project.photos.length})
              </button>
            </div>
          )}

          {/* Dual-part toggle for Agro Preciosa (Loja Online vs Dashboard) */}
          {project.hasDashboardPhoto && (
            <div className="project-subnav-bar">
              <button
                onClick={() => setViewMode("live")}
                className={`project-subnav-btn ${viewMode === "live" ? "active" : ""}`}
              >
                Loja Online (Site)
              </button>
              <button
                onClick={() => setViewMode("photos")}
                className={`project-subnav-btn ${viewMode === "photos" ? "active" : ""}`}
              >
                Dashboard (Galeria)
              </button>
            </div>
          )}

          {/* Visual Display (Iframe or Photo) */}
          <div className="project-visual-viewport">
            {isCurrentlyUrl ? (
              <iframe
                src={currentLiveUrl}
                title={`Demonstração ao vivo de ${project.title}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                  backgroundColor: "#ffffff",
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            ) : (
              <div
                onClick={() => onOpenGallery(project)}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                {primaryPhoto ? (
                  <Image
                    src={primaryPhoto.url}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{
                      objectFit: "fill",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "var(--text-secondary-on-dark)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                    }}
                  >
                    Visualização do Projeto
                  </div>
                )}
              </div>
            )}

            {/* ONLY ONE BUTTON: Solid color, no emojis, no neon, anchored at bottom-left */}
            <div className="project-button-dock">
              <MagneticButton strength={0.25} radius={70}>
                {isCurrentlyUrl ? (
                  <a
                    href={currentLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ver-de-perto-solid"
                  >
                    {buttonLabel}
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenGallery(project)}
                    className="btn-ver-de-perto-solid"
                  >
                    {buttonLabel}
                  </button>
                )}
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* TOP-RIGHT: Title Box (Top) + Description Box (Bottom) */}
        <div className="project-details-right">
          {/* Upper: Title Box */}
          <div className="project-title-box">
            <div className="project-index-type">
              PROJETO {project.index} // {project.type}
            </div>
            <h3 className="project-main-title">{project.title}</h3>
            {project.subtitle && (
              <p className="project-sub-title">{project.subtitle}</p>
            )}
          </div>

          {/* Lower: Description Box */}
          <div className="project-description-box">
            <p className="project-description-text">
              {project.directDescription}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          2. MIDDLE ROW: 3 HORIZONTAL SPECIFICATION COLUMNS
          ============================================================ */}
      <div className="project-specs-row">
        <div className="project-spec-card">
          <h4 className="project-spec-title">CONTEXTO</h4>
          <p className="project-spec-content">{project.specs.contexto}</p>
        </div>

        <div className="project-spec-card">
          <h4 className="project-spec-title">ARQUITETURA</h4>
          <p className="project-spec-content">{project.specs.arquitetura}</p>
        </div>

        <div className="project-spec-card">
          <h4 className="project-spec-title">RESULTADO</h4>
          <p className="project-spec-content">{project.specs.resultado}</p>
        </div>
      </div>

      {/* ============================================================
          3. BOTTOM ROW: BADGES LINED UP HORIZONTALLY
          ============================================================ */}
      <div className="project-badges-row">
        {project.tags.map((tag) => (
          <span key={tag} className="project-badge-pill">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  </div>
  );
}
