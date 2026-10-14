"use client";

import { motion } from "framer-motion";

function TimelineEntry({
  period,
  institution,
  title,
  description,
  delay,
}: {
  period: string;
  institution: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      className="timeline-entry-grid"
    >
      {/* Left: period + institution */}
      <div>
    <span className="maralto-label-dark" style={{ display: "block", marginBottom: "0.375rem" }}>
          {period}
        </span>
        <span
          className="text-body-sm"
          style={{ color: "var(--text-primary-on-dark)", fontWeight: 600 }}
        >
          {institution}
        </span>
      </div>

      {/* Right: title + description */}
      <div>
        <h4
          className="text-h3"
          style={{ color: "var(--text-primary-on-dark)", marginBottom: "0.625rem" }}
        >
          {title}
        </h4>
        <p className="text-body-sm" style={{ color: "var(--text-secondary-on-dark)", lineHeight: 1.75 }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function EvolutionSection() {
  return (
    <section
      id="evolution"
      className="section-ocean-mid"
      style={{
        position: "relative",
      }}
    >
      <div className="container-maralto">
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "3.5rem" }}
          >
            <h2
              className="text-h1"
              style={{ color: "var(--text-primary-on-dark)", marginBottom: "1rem" }}
            >
              Trajetória & Evolução
            </h2>
            <p
              className="text-body-lg"
              style={{ color: "var(--text-secondary-on-dark)", maxWidth: "56ch" }}
            >
              Uma imersão contínua na engenharia de software — do desenvolvimento
              prático multiplataforma à fundação científica da Computação.
            </p>
          </motion.div>

          {/* Timeline entries */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <TimelineEntry
              period="ATUAL"
              institution="FACAMP"
              title="Engenharia da Computação"
              description="Migração estratégica para aprimorar fundamentos matemáticos, arquitetura de hardware e abstrações de algoritmos pesados — complementando a experiência prática já consolidada."
              delay={0.1}
            />
            <TimelineEntry
              period="INÍCIO"
              institution="FATEC Itapira"
              title="Desenvolvimento de Software Multiplataforma"
              description="Ponto de partida da jornada tecnológica, com imersão em desenvolvimento de sistemas abrangentes, interfaces responsivas e metodologias de criação de aplicações reais para problemas concretos."
              delay={0.2}
            />
            <TimelineEntry
              period="EXTENSÃO"
              institution="Cursos Livres"
              title="Programação Full Stack & Inteligência Artificial"
              description="Busca ativa por conhecimentos de fronteira: integrações de APIs (WhatsApp Business, Mapas Leaflet), Supabase em produção, e uso avançado de modelos de linguagem integrados a produtos reais."
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
