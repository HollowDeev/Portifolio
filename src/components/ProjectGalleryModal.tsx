"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectItem } from "@/data/projectsData";
import MagneticButton from "./MagneticButton";

interface ProjectGalleryModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  initialPhotoIndex?: number;
}

export default function ProjectGalleryModal({
  project,
  onClose,
  initialPhotoIndex = 0,
}: ProjectGalleryModalProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(initialPhotoIndex);
  const [modalMouse, setModalMouse] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  // Reset photo index when project changes
  useEffect(() => {
    setActivePhotoIdx(initialPhotoIndex);
  }, [project, initialPhotoIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [project]);

  // Modal reacts to mouse movement like Hero buttons (subtle 3D magnetic pull)
  useEffect(() => {
    if (!project) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      setModalMouse({
        x: dx * 0.02,
        y: dy * 0.02,
        rotateX: -dy * 0.012,
        rotateY: dx * 0.012,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [project]);

  const photos = project?.photos || [];
  const hasMultiplePhotos = photos.length > 1;

  const nextPhoto = useCallback(() => {
    if (photos.length <= 1) return;
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    if (photos.length <= 1) return;
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation: ESC to close, arrows for gallery
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        nextPhoto();
      } else if (e.key === "ArrowLeft") {
        prevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, nextPhoto, prevPhoto]);

  if (!project) return null;

  const activePhoto = photos[activePhotoIdx] || photos[0];

  return (
    <AnimatePresence>
      <div
        className="modal-backdrop"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(2, 10, 20, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "clamp(1rem, 2.5vw, 2.5rem)",
          perspective: "1200px",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: modalMouse.x,
            y: modalMouse.y,
            rotateX: modalMouse.rotateX,
            rotateY: modalMouse.rotateY,
          }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{
            type: "spring",
            damping: 24,
            stiffness: 180,
            mass: 0.5,
          }}
          className="modal-dialog-surface"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1320px",
            maxHeight: "92vh",
            backgroundColor: "rgba(5, 18, 32, 0.96)",
            border: "1px solid rgba(80, 160, 240, 0.2)",
            boxShadow:
              "0 24px 72px -12px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 160, 220, 0.12)",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transformStyle: "preserve-3d",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Title & Close button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid var(--hairline-shallow)",
              backgroundColor: "rgba(3, 12, 22, 0.85)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#d4541b",
                }}
              />
              <span
                className="font-mono text-label"
                style={{
                  color: "#d4541b",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                PROJETO {project.index} // {project.type}
              </span>
            </div>

            <MagneticButton strength={0.3} radius={60}>
              <button
                onClick={onClose}
                className="maralto-button-close"
                aria-label="Fechar modal"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.45rem 0.95rem",
                  borderRadius: "8px",
                  border: "1px solid var(--hairline-shallow)",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  color: "var(--text-secondary-on-dark)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#d4541b";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "#d4541b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "var(--text-secondary-on-dark)";
                  e.currentTarget.style.borderColor = "var(--hairline-shallow)";
                }}
              >
                FECHAR ✕
              </button>
            </MagneticButton>
          </div>

          {/* Modal Body: Left = Gallery, Right = Explicação & Specs */}
          <div
            className="modal-split-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {/* LEFT: Photo Gallery Showcase */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(2, 9, 18, 0.9)",
                borderRight: "1px solid var(--hairline-shallow)",
                padding: "clamp(1rem, 2vw, 1.75rem)",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              {/* Main Photo Display */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  minHeight: "260px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "#030a12",
                  border: "1px solid rgba(80, 160, 240, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {activePhoto ? (
                  <Image
                    src={activePhoto.url}
                    alt={activePhoto.caption || project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    style={{ objectFit: "fill", width: "100%", height: "100%" }}
                    priority
                  />
                ) : (
                  <div style={{ color: "var(--text-secondary-on-dark)" }}>Sem imagem</div>
                )}

                {/* Left / Right Nav Arrows */}
                {hasMultiplePhotos && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                      }}
                    >
                      <MagneticButton strength={0.4} radius={60}>
                        <button
                          onClick={prevPhoto}
                          aria-label="Foto anterior"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(3, 12, 22, 0.85)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.25rem",
                            cursor: "pointer",
                            backdropFilter: "blur(6px)",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#d4541b";
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.borderColor = "#d4541b";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(3, 12, 22, 0.85)";
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                          }}
                        >
                          ‹
                        </button>
                      </MagneticButton>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                      }}
                    >
                      <MagneticButton strength={0.4} radius={60}>
                        <button
                          onClick={nextPhoto}
                          aria-label="Próxima foto"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(3, 12, 22, 0.85)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.25rem",
                            cursor: "pointer",
                            backdropFilter: "blur(6px)",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#d4541b";
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.borderColor = "#d4541b";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(3, 12, 22, 0.85)";
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                          }}
                        >
                          ›
                        </button>
                      </MagneticButton>
                    </div>
                  </>
                )}

                {/* Photo Badge / Counter */}
                {photos.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "12px",
                      backgroundColor: "rgba(2, 9, 18, 0.82)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--text-secondary-on-dark)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {activePhotoIdx + 1} / {photos.length}
                  </div>
                )}
              </div>

              {/* Active Photo Caption */}
              {activePhoto?.caption && (
                <div
                  style={{
                    backgroundColor: "rgba(8, 24, 40, 0.6)",
                    border: "1px solid rgba(80, 160, 240, 0.15)",
                    padding: "0.65rem 1rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#d4541b",
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.825rem",
                      color: "var(--text-primary-on-dark)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {activePhoto.caption}
                  </p>
                </div>
              )}

              {/* Thumbnails Strip */}
              {hasMultiplePhotos && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    overflowX: "auto",
                    paddingBottom: "0.25rem",
                  }}
                >
                  {photos.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      style={{
                        position: "relative",
                        flexShrink: 0,
                        width: "84px",
                        height: "56px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        border:
                          idx === activePhotoIdx
                            ? "2px solid #d4541b"
                            : "1px solid rgba(255, 255, 255, 0.15)",
                        backgroundColor: "#030a12",
                        cursor: "pointer",
                        opacity: idx === activePhotoIdx ? 1 : 0.6,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (idx !== activePhotoIdx) e.currentTarget.style.opacity = "0.9";
                      }}
                      onMouseLeave={(e) => {
                        if (idx !== activePhotoIdx) e.currentTarget.style.opacity = "0.6";
                      }}
                    >
                      <Image
                        src={item.url}
                        alt={`Miniatura ${idx + 1}`}
                        fill
                        sizes="84px"
                        style={{ objectFit: "fill" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Project Information, Direct Description & Specs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                padding: "clamp(1.25rem, 2.5vw, 2.25rem)",
                overflowY: "auto",
                backgroundColor: "rgba(5, 18, 32, 0.98)",
              }}
            >
              {/* Header */}
              <div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--signal-amber)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    CASE {project.index} — DETALHES DE ENGENHARIA
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary-on-dark)",
                    lineHeight: 1.2,
                    marginBottom: "0.5rem",
                  }}
                >
                  {project.title}
                </h3>

                {project.subtitle && (
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "rgba(160, 200, 230, 0.85)",
                      lineHeight: 1.4,
                    }}
                  >
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Direct Description Box */}
              <div
                style={{
                  backgroundColor: "rgba(10, 30, 52, 0.55)",
                  borderLeft: "3px solid var(--signal-amber)",
                  borderRadius: "0 8px 8px 0",
                  padding: "1rem 1.25rem",
                  borderTop: "1px solid rgba(80, 160, 240, 0.12)",
                  borderRight: "1px solid rgba(80, 160, 240, 0.12)",
                  borderBottom: "1px solid rgba(80, 160, 240, 0.12)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--signal-amber)",
                    letterSpacing: "0.1em",
                    marginBottom: "0.4rem",
                    fontWeight: 600,
                  }}
                >
                  DESCRIÇÃO & ESCOPO OPERACIONAL
                </span>
                <p
                  style={{
                    color: "var(--text-primary-on-dark)",
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {project.directDescription}
                </p>
              </div>

              {/* Specs Breakdown */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(3, 14, 26, 0.7)",
                    borderRadius: "8px",
                    padding: "0.875rem 1.1rem",
                    border: "1px solid var(--hairline-shallow)",
                  }}
                >
                  <h4
                    className="font-mono text-label"
                    style={{
                      color: "rgba(160, 200, 240, 0.9)",
                      fontSize: "0.72rem",
                      marginBottom: "0.35rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    01 // CONTEXTO OPERACIONAL
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary-on-dark)",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {project.specs.contexto}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(3, 14, 26, 0.7)",
                    borderRadius: "8px",
                    padding: "0.875rem 1.1rem",
                    border: "1px solid var(--hairline-shallow)",
                  }}
                >
                  <h4
                    className="font-mono text-label"
                    style={{
                      color: "rgba(160, 200, 240, 0.9)",
                      fontSize: "0.72rem",
                      marginBottom: "0.35rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    02 // ARQUITETURA DE SISTEMAS
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary-on-dark)",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {project.specs.arquitetura}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(3, 14, 26, 0.7)",
                    borderRadius: "8px",
                    padding: "0.875rem 1.1rem",
                    border: "1px solid var(--hairline-shallow)",
                  }}
                >
                  <h4
                    className="font-mono text-label"
                    style={{
                      color: "rgba(160, 200, 240, 0.9)",
                      fontSize: "0.72rem",
                      marginBottom: "0.35rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    03 // RESULTADO & IMPACTO
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary-on-dark)",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {project.specs.resultado}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "rgba(140, 180, 210, 0.7)",
                    letterSpacing: "0.1em",
                    marginBottom: "0.5rem",
                  }}
                >
                  STACK & COMPETÊNCIAS APLICADAS
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "4px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(80, 160, 240, 0.2)",
                        color: "var(--text-secondary-on-dark)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* External URL CTA if available */}
              {project.liveUrl && (
                <div style={{ marginTop: "0.5rem", paddingTop: "1rem", borderTop: "1px solid var(--hairline-shallow)" }}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ver-de-perto-solid"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.7rem 1.4rem",
                      borderRadius: "6px",
                      backgroundColor: "#d4541b",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.825rem",
                      textDecoration: "none",
                      boxShadow: "none",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#b54212";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#d4541b";
                    }}
                  >
                    ACESSAR SITE FINAL
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
