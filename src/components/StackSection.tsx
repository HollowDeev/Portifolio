"use client";

import { useState, useRef, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import OceanRocks from "./OceanRocks";
import {
  ShieldCheck,
  Cloud,
  PlugsConnected,
  DeviceMobile,
  Sparkle,
  GearSix,
  Broadcast,
  TreeStructure,
} from "@phosphor-icons/react";

// ---- SVGs Oficiais das Principais Tecnologias ----

function PostgresLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
        fill="#336791"
        fillOpacity="0.2"
      />
      <path
        d="M17.2 14.8C16.8 14.5 16.2 14.3 15.6 14.3C15.1 14.3 14.7 14.4 14.3 14.7C13.9 14.2 13.7 13.5 13.7 12.6C14.3 12.4 14.8 12.1 15.2 11.6C15.6 11.1 15.8 10.4 15.8 9.6C15.8 8.6 15.4 7.7 14.7 7.1C14 6.5 13.1 6.2 12 6.2C10.9 6.2 10 6.5 9.3 7.1C8.6 7.7 8.2 8.6 8.2 9.6C8.2 10.4 8.4 11.1 8.8 11.6C9.2 12.1 9.7 12.4 10.3 12.6C10.3 13.5 10.1 14.2 9.7 14.7C9.3 14.4 8.9 14.3 8.4 14.3C7.8 14.3 7.2 14.5 6.8 14.8C6.3 15.1 6 15.6 6 16.2C6 17 6.6 17.6 7.4 17.8C7.6 17.8 7.8 17.8 8 17.8C8.8 17.8 9.5 17.4 10 16.8C10.5 17.4 11.2 17.8 12 17.8C12.8 17.8 13.5 17.4 14 16.8C14.5 17.4 15.2 17.8 16 17.8C16.2 17.8 16.4 17.8 16.6 17.8C17.4 17.6 18 17 18 16.2C18 15.6 17.7 15.1 17.2 14.8Z"
        fill="#336791"
      />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.4 2.1C13.2 1.6 12.5 1.5 12.2 1.9L2.5 13.3C2.1 13.8 2.5 14.5 3.1 14.5H11.2L9.4 22.3C9.2 22.8 9.9 23.1 10.3 22.7L21.4 10.2C21.8 9.7 21.4 9 20.8 9H13.6L13.4 2.1Z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.5 10.5C22.1 10.5 21.6 10.7 21.3 11C20.6 9.8 19.3 9.1 18 9.1C17.8 9.1 17.6 9.1 17.4 9.2C16.8 8.4 15.7 7.9 14.6 8.1C14.4 7.6 14.1 7.2 13.7 6.8C12.7 6 11.2 6.1 10.4 7.1C9.6 8.1 9.8 9.6 10.8 10.4C10.9 10.5 11.1 10.6 11.3 10.7C10.7 10.9 10.1 11.3 9.7 11.8H2.5C2.2 11.8 2 12 2 12.3C2 15.8 4.6 18.8 8.1 19.3C13.2 20 18.2 17.2 20.4 12.5C21.3 12.6 22.1 12.1 22.4 11.2C22.5 10.8 22.5 10.5 22.5 10.5Z"
        fill="#2496ED"
      />
      <rect x="7" y="9" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="9.5" y="9" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="7" y="11.5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="9.5" y="11.5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="12" y="11.5" width="2" height="2" rx="0.3" fill="#2496ED" />
    </svg>
  );
}

function VercelLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L23 21H1L12 2Z" fill="#FFFFFF" />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#000000" stroke="#FFFFFF" strokeWidth="1.2" />
      <path
        d="M15.5 8.5V15.5M8.5 8.5V15.5L15.5 8.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.5"
        stroke="#61DAFB"
        strokeWidth="1.2"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.5"
        stroke="#61DAFB"
        strokeWidth="1.2"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

function TsLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11 9H6.5V10.5H8V17H9.5V10.5H11V9ZM16.8 11.2C16.4 10.6 15.6 10.3 14.6 10.3C13.5 10.3 12.7 10.7 12.7 11.6C12.7 12.5 13.4 12.9 14.5 13.3C16 13.8 17.2 14.4 17.2 15.7C17.2 17.1 15.8 17.8 14.3 17.8C13 17.8 12.1 17.3 11.6 16.3L12.9 15.5C13.2 16.1 13.7 16.4 14.4 16.4C15 16.4 15.6 16.1 15.6 15.6C15.6 15 15.1 14.6 13.9 14.2C12.6 13.7 11.3 13.1 11.3 11.7C11.3 10.4 12.6 9 14.6 9C15.7 9 16.7 9.5 17.2 10.4L16.8 11.2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 6C9.5 6 8 7.25 7.5 9.75C8.5 8.5 9.75 8 11.25 8.25C12.3 8.42 13 9.15 13.8 9.95C15.1 11.25 16.65 12.8 20.5 12.8C23 12.8 24.5 11.55 25 9.05C24 10.3 22.75 10.8 21.25 10.55C20.2 10.38 19.5 9.65 18.7 8.85C17.4 7.55 15.85 6 12 6ZM3.5 12.2C1 12.2 -0.5 13.45 -1 15.95C0 14.7 1.25 14.2 2.75 14.45C3.8 14.62 4.5 15.35 5.3 16.15C6.6 17.45 8.15 19 12 19C14.5 19 16 17.75 16.5 15.25C15.5 16.5 14.25 17 12.75 16.75C11.7 16.58 11 15.85 10.2 15.05C8.9 13.75 7.35 12.2 3.5 12.2Z"
        fill="#38BDF8"
        transform="scale(0.7) translate(3, 3)"
      />
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z"
        fill="#5FA04E"
        fillOpacity="0.18"
        stroke="#5FA04E"
        strokeWidth="1.3"
      />
      <path
        d="M12 6L7 9V15L12 18L17 15V9L12 6Z"
        fill="#5FA04E"
      />
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.5 2 2 6.5 2 12C2 13.8 2.5 15.5 3.4 17L2.1 21.9L7.2 20.6C8.6 21.5 10.3 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z"
        fill="#25D366"
      />
      <path
        d="M16.8 14.3C16.6 14.2 15.2 13.5 14.9 13.4C14.7 13.3 14.5 13.3 14.3 13.5C14.1 13.8 13.6 14.4 13.4 14.6C13.3 14.7 13.1 14.8 12.9 14.7C12.7 14.6 12 14.3 11.2 13.6C10.5 13 10 12.3 9.9 12.1C9.8 11.9 9.9 11.7 10 11.6C10.1 11.5 10.2 11.3 10.4 11.2C10.5 11 10.6 10.9 10.6 10.8C10.7 10.6 10.6 10.5 10.6 10.4C10.5 10.3 10 9 9.8 8.5C9.6 8 9.4 8.1 9.2 8.1C9.1 8.1 8.9 8.1 8.7 8.1C8.5 8.1 8.2 8.2 8 8.4C7.8 8.6 7.2 9.2 7.2 10.4C7.2 11.6 8.1 12.7 8.2 12.9C8.3 13 10 15.6 12.5 16.7C14.6 17.6 15 17.4 15.5 17.3C16 17.3 17 16.7 17.2 16.1C17.4 15.6 17.4 15.1 17.3 15C17.2 14.8 17 14.7 16.8 14.3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function PythonLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.9 2C8.3 2 8.5 3.5 8.5 3.5V5.1H12.1V5.6H5.2C5.2 5.6 2 5.2 2 8.9C2 12.5 4.8 12.3 4.8 12.3H6.3V10.7C6.3 8.9 7.8 8.9 7.8 8.9H11.5C13.2 8.9 13.2 7.2 13.2 7.2V3.7C13.2 3.7 13.3 2 11.9 2ZM10.3 3.1C10.7 3.1 11.1 3.5 11.1 3.9C11.1 4.3 10.7 4.7 10.3 4.7C9.9 4.7 9.5 4.3 9.5 3.9C9.5 3.5 9.9 3.1 10.3 3.1Z"
        fill="#3776AB"
      />
      <path
        d="M12.1 22C15.7 22 15.5 20.5 15.5 20.5V18.9H11.9V18.4H18.8C18.8 18.4 22 18.8 22 15.1C22 11.5 19.2 11.7 19.2 11.7H17.7V13.3C17.7 15.1 16.2 15.1 16.2 15.1H12.5C10.8 15.1 10.8 16.8 10.8 16.8V20.3C10.8 20.3 10.7 22 12.1 22ZM13.7 20.9C13.3 20.9 12.9 20.5 12.9 20.1C12.9 19.7 13.3 19.3 13.7 19.3C14.1 19.3 14.5 19.7 14.5 20.1C14.5 20.5 14.1 20.9 13.7 20.9Z"
        fill="#FFD43B"
      />
    </svg>
  );
}

function OpenAiLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5 10.3C21.3 7.8 19.6 5.8 17.2 5.2C16.8 3.5 15.3 2.2 13.5 2.1C11.7 2 10 2.9 9.1 4.4C7.4 4.5 5.8 5.6 5.2 7.2C3.6 8 2.5 9.6 2.4 11.4C2.3 13.2 3.2 14.9 4.7 15.8C4.5 17.5 5.3 19.2 6.8 20.2C8.3 21.2 10.3 21.3 11.9 20.5C12.8 21.9 14.5 22.6 16.1 22.3C17.7 22 19.1 20.8 19.6 19.2C21.1 18.3 22 16.7 21.9 14.9C21.8 13.2 21 11.5 21.5 10.3Z"
        fill="#10A37F"
        fillOpacity="0.2"
        stroke="#10A37F"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="3.5" fill="#10A37F" />
    </svg>
  );
}

// ---- Estrutura dos 5 Pilares Simplificados ----

interface SimpleTechItem {
  name: string;
  icon: ReactNode;
}

interface CleanStackCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: SimpleTechItem[];
}

const CLEAN_STACK_CARDS: CleanStackCard[] = [
  {
    id: "database",
    title: "Banco de Dados, Nuvem & Segurança",
    subtitle: "PostgreSQL, Supabase e Servidores em Nuvem",
    description:
      "Armazenamento seguro de informações de clientes e produtos, com proteção rigorosa de acesso e servidores em nuvem que nunca caem.",
    items: [
      { name: "PostgreSQL", icon: <PostgresLogo /> },
      { name: "Supabase", icon: <SupabaseLogo /> },
      { name: "RLS (Segurança por Usuário)", icon: <ShieldCheck size={18} color="#E0703C" weight="bold" /> },
      { name: "Vercel & Nuvem", icon: <VercelLogo /> },
      { name: "Docker", icon: <DockerLogo /> },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Interfaces Web",
    subtitle: "Next.js, React e TypeScript",
    description:
      "Desenvolvimento de páginas e sistemas rápidos, que abrem instantaneamente no computador ou no celular, com visual limpo e moderno.",
    items: [
      { name: "Next.js", icon: <NextLogo /> },
      { name: "React", icon: <ReactLogo /> },
      { name: "TypeScript", icon: <TsLogo /> },
      { name: "Tailwind CSS", icon: <TailwindLogo /> },
      { name: "Animações Fluidas", icon: <Sparkle size={18} color="#E0703C" weight="fill" /> },
    ],
  },
  {
    id: "backend",
    title: "Backend & Conexões em Tempo Real",
    subtitle: "Node.js, APIs e WebSockets",
    description:
      "O motor por trás dos sistemas: processa dados sem travamentos, atualiza telas em tempo real e integra com o WhatsApp e meios de pagamento.",
    items: [
      { name: "Node.js", icon: <NodeLogo /> },
      { name: "WebSockets (Tempo Real)", icon: <Broadcast size={18} color="#3ECF8E" weight="bold" /> },
      { name: "APIs & Integrações", icon: <PlugsConnected size={18} color="#588B9E" weight="bold" /> },
      { name: "WhatsApp API", icon: <WhatsAppLogo /> },
    ],
  },
  {
    id: "ai",
    title: "Inteligência Artificial & Automação",
    subtitle: "IA Aplicada, Scripts e Cálculos",
    description:
      "Uso prático de Inteligência Artificial para automatizar rotinas chatas, tirar dúvidas de clientes no WhatsApp e calcular regras complexas de negócio.",
    items: [
      { name: "OpenAI & Claude", icon: <OpenAiLogo /> },
      { name: "Python", icon: <PythonLogo /> },
      { name: "Automação de Tarefas", icon: <GearSix size={18} color="#E0703C" weight="bold" /> },
      { name: "Cálculo de Custos e Fórmulas", icon: <TreeStructure size={18} color="#588B9E" weight="bold" /> },
    ],
  },
  {
    id: "mobile",
    title: "Aplicativos de Celular (Mobile)",
    subtitle: "React Native e Expo",
    description:
      "Criação de aplicativos para iPhone e celulares Android com código único, funcionando de forma ágil, intuitiva e com suporte a uso offline.",
    items: [
      { name: "React Native", icon: <ReactLogo /> },
      { name: "Expo", icon: <DeviceMobile size={18} color="#FFFFFF" weight="bold" /> },
      { name: "iOS & Android", icon: <DeviceMobile size={18} color="#3ECF8E" weight="bold" /> },
      { name: "Funcionamento Offline", icon: <Cloud size={18} color="#588B9E" weight="bold" /> },
    ],
  },
];

// ---- Card com Iluminação Sutil no Mouse ----
function StackCardItem({ card, index }: { card: CleanStackCard; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        borderRadius: "16px",
        backgroundColor: "rgba(5, 16, 28, 0.82)",
        border: "1px solid rgba(88, 139, 158, 0.22)",
        padding: "clamp(1.5rem, 2.5vw, 2.25rem)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1.5rem",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 28px rgba(0, 0, 0, 0.3)",
      }}
      className="stack-bento-card"
    >
      {/* ── Brilho suave que acompanha o mouse ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 84, 27, 0.12), rgba(88, 139, 158, 0.05) 50%, transparent 80%)`,
          opacity: mousePos.opacity,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* ── Conteúdo Principal do Card ── */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.2rem, 1.5vw, 1.45rem)",
            fontWeight: 700,
            color: "var(--text-primary-on-dark)",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            marginBottom: "0.35rem",
          }}
        >
          {card.title}
        </h3>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.825rem",
            color: "var(--signal-amber-dark)",
            marginBottom: "1rem",
            fontWeight: 500,
          }}
        >
          {card.subtitle}
        </div>

        <p
          style={{
            color: "var(--text-secondary-on-dark)",
            fontSize: "0.925rem",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          {card.description}
        </p>

        {/* ── Tecnologias com Ícones e Logos Oficiais ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
          }}
        >
          {card.items.map((tech) => (
            <div
              key={tech.name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.45rem 0.85rem",
                borderRadius: "8px",
                backgroundColor: "rgba(10, 26, 42, 0.6)",
                border: "1px solid rgba(88, 139, 158, 0.24)",
              }}
              className="stack-pill-hover"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {tech.icon}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--text-primary-on-dark)",
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Seção Principal: Stack Tecnológico Simplificado
// ─────────────────────────────────────────────────────────────
export default function StackSection() {
  return (
    <section
      id="stack"
      className="section-ocean-deep"
      style={{
        position: "relative",
      }}
    >
      {/* Formações rochosas do fundo oceânico */}
      <OceanRocks variant="deep" />

      <div className="container-maralto" style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          {/* ── Header Simples e Direto ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              borderBottom: "1px solid var(--hairline-deep)",
              paddingBottom: "1.75rem",
            }}
          >
            {/* Tag Batimétrica Sutil */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--signal-amber)",
                  boxShadow: "0 0 10px var(--signal-amber)",
                }}
              />
              <span
                className="maralto-label-dark"
                style={{ color: "var(--signal-amber-dark)", letterSpacing: "0.1em" }}
              >
                03 // -700M — ZONA BATIAL
              </span>
            </div>

            <h2
              className="text-h1"
              style={{
                color: "var(--text-primary-on-dark)",
                lineHeight: 1.15,
              }}
            >
              Stack Tecnológico
            </h2>
            <p
              style={{
                color: "var(--text-secondary-on-dark)",
                fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)",
                maxWidth: "60ch",
                lineHeight: 1.6,
              }}
            >
              As principais ferramentas, linguagens e serviços que utilizo no dia a dia para
              criar sistemas velozes, seguros e prontos para atender qualquer negócio.
            </p>
          </motion.div>

          {/* ── Grade Limpa dos Pilares Tecnológicos ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              gap: "1.75rem",
            }}
          >
            {CLEAN_STACK_CARDS.map((card, idx) => (
              <StackCardItem key={card.id} card={card} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
