"use client";

import { motion } from "framer-motion";
import SleepingWhales from "./SleepingWhales";

export default function InterludeSection() {
  return (
    <section
      className="section-ocean-manifesto"
      style={{
        position: "relative",
      }}
    >
      {/* Baleias cachalotes dormindo na vertical com fundo desfocado */}
      <SleepingWhales />

      <div className="container-maralto" style={{ position: "relative", zIndex: 10 }}>
        {/* Batimetria index */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "3rem" }}
        >
          <span className="maralto-label-dark" style={{ opacity: 0.5 }}>
            MARALTO INGÉNIERIE · MANIFESTO
          </span>
        </motion.div>

        {/* Massive typography manifesto */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25em" }}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text-primary-on-dark)",
            }}
          >
            Construo produtos
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text-primary-on-dark)",
            }}
          >
            que duram.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text-secondary-on-dark)",
              opacity: 0.5,
            }}
          >
            Na camada que não pisca.
          </motion.p>
        </div>

        {/* Subtle divider + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          style={{ marginTop: "4rem", display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          <div
            style={{
              width: "3rem",
              height: "1px",
              backgroundColor: "var(--hairline-dark)",
            }}
          />
          <span className="maralto-label-dark" style={{ opacity: 0.6 }}>
            DO FLUXO À ESTRUTURA — ENGENHARIA DE PRECISÃO
          </span>
        </motion.div>
      </div>
    </section>
  );
}
