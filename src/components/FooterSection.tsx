"use client";

import { motion } from "framer-motion";
import OceanRocks from "./OceanRocks";
import DeepSeaCreatures from "./DeepSeaCreatures";
import RealisticKelp from "./RealisticKelp";

function WavesSVG() {
  return (
    <svg width="36" height="18" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 12C8 12 10 2 16 2C22 2 26 22 32 22C38 22 40 12 48 12"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <path
        d="M0 12C8 12 10 22 16 22C22 22 26 2 32 2C38 2 40 12 48 12"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="section-ocean-abyssal"
      style={{
        position: "relative",
      }}
    >
      {/* Chão oceânico abissal: relevo rochoso */}
      <OceanRocks variant="abyssal" />

      {/* Floresta de algas marinhas realistas com balanço independente */}
      <RealisticKelp />

      {/* Criaturas do abismo (medusa bioluminescente e estrela-do-mar) */}
      <DeepSeaCreatures />

      <div className="container-maralto" style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >

            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "3rem" }}
            >
              <h2
                className="text-h1"
                style={{ color: "var(--text-primary-on-dark)" }}
              >
                Contato
              </h2>
            </motion.div>

            {/* Giant CTA contact */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{ marginBottom: "4.5rem" }}
            >
              <span className="maralto-label-dark" style={{ display: "block", marginBottom: "1rem", opacity: 0.6 }}>
                CONTATO DIRETO
              </span>
              <a
                href="tel:+5519995799224"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--text-primary-on-dark)",
                  transition: "color 0.35s var(--ease-ocean)",
                  display: "block",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--signal-amber-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary-on-dark)")}
              >
                +55 19 99579-9224
              </a>
              <a
                href="mailto:thaua19felipe@gmail.com"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  color: "var(--text-secondary-on-dark)",
                  transition: "color 0.35s var(--ease-ocean)",
                  display: "block",
                  marginTop: "0.75rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--signal-amber-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary-on-dark)")}
              >
                thaua19felipe@gmail.com
              </a>
            </motion.div>

            {/* Hairline divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{
                height: "1px",
                backgroundColor: "var(--hairline-dark)",
                transformOrigin: "left",
                marginBottom: "2.5rem",
              }}
            />

            {/* Links grid — Responsivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="footer-links-grid"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <span className="maralto-label-dark" style={{ marginBottom: "0.25rem" }}>CONEXÃO</span>
                <a href="#" className="maralto-link-dark">
                  LINKEDIN <span className="arrow-icon">↗</span>
                </a>
                <a href="#" className="maralto-link-dark">
                  GITHUB <span className="arrow-icon">↗</span>
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <span className="maralto-label-dark" style={{ marginBottom: "0.25rem" }}>COMUNICAÇÃO</span>
                <a href="mailto:thaua19felipe@gmail.com" className="maralto-link-dark">
                  EMAIL DIRETO <span className="arrow-icon">↗</span>
                </a>
                <a href="https://wa.me/5519995799224" target="_blank" rel="noopener noreferrer" className="maralto-link-dark">
                  WHATSAPP <span className="arrow-icon">↗</span>
                </a>
              </div>
            </motion.div>

            {/* Footer bottom — Logo + Copyright Responsivo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="footer-bottom-bar"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <img
                  src="/Logo_2_Horizontal_PNG.png"
                  alt="Thauã Felipe — Engenheiro da Computação"
                  style={{ height: "32px", width: "auto", opacity: 0.85, objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-secondary-on-dark)",
                opacity: 0.5,
              }}>
                THAUÃ FELIPE © 2026 · ENGENHEIRO DA COMPUTAÇÃO & DESENVOLVEDOR FULL-STACK
              </span>
            </motion.div>
          </div>
        </div>
      </footer>
  );
}
