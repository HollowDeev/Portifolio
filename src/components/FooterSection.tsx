"use client";

import { motion } from "framer-motion";
import OceanRocks from "./OceanRocks";
import DeepSeaCreatures from "./DeepSeaCreatures";
import RealisticKelp from "./RealisticKelp";

// ---- SVGs Oficiais das Plataformas de Contato ----

function GitHubIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0-.01-3.06 1.53 1.53 0 0 0 .01 3.06m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z"/>
    </svg>
  );
}

function EmailIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E0703C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function FooterSection() {
  const contactChannels = [
    {
      id: "whatsapp",
      title: "WhatsApp",
      handle: "+55 (19) 99579-9224",
      description: "Mensagem direta para dúvidas, alinhamentos rápidos ou orçamentos imediatos.",
      badge: "ONLINE & RESPOSTA RÁPIDA",
      cta: "Conversar no WhatsApp ↗",
      href: "https://wa.me/5519995799224",
      external: true,
      cardClass: "card-whatsapp",
      iconBg: "rgba(37, 211, 102, 0.12)",
      iconBorder: "rgba(37, 211, 102, 0.3)",
      accentColor: "#25D366",
      renderIcon: () => <WhatsAppIcon size={28} />,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      handle: "in/thaua-felipe",
      description: "Conecte-se comigo para networking, histórico profissional completo e recomendações.",
      badge: "REDE PROFISSIONAL",
      cta: "Conectar no LinkedIn ↗",
      href: "https://www.linkedin.com/in/thaua-felipe/",
      external: true,
      cardClass: "card-linkedin",
      iconBg: "rgba(10, 102, 194, 0.14)",
      iconBorder: "rgba(10, 102, 194, 0.35)",
      accentColor: "#0A66C2",
      renderIcon: () => <LinkedInIcon size={28} />,
    },
    {
      id: "github",
      title: "GitHub",
      handle: "@HollowDeev",
      description: "Explore meus repositórios de código aberto, arquiteturas, commits e experimentos.",
      badge: "REPOSITÓRIOS & CÓDIGO",
      cta: "Ver Repositórios no GitHub ↗",
      href: "https://github.com/HollowDeev",
      external: true,
      cardClass: "card-github",
      iconBg: "rgba(255, 255, 255, 0.08)",
      iconBorder: "rgba(255, 255, 255, 0.25)",
      accentColor: "#FFFFFF",
      renderIcon: () => <GitHubIcon size={28} />,
    },
    {
      id: "email",
      title: "E-mail Direto",
      handle: "thaua19felipe@gmail.com",
      description: "Envie propostas formais, convites para projetos ou solicitações de consultoria.",
      badge: "CONTATO FORMAL",
      cta: "Enviar E-mail Direto ↗",
      href: "mailto:thaua19felipe@gmail.com",
      external: false,
      cardClass: "card-email",
      iconBg: "rgba(224, 112, 60, 0.14)",
      iconBorder: "rgba(224, 112, 60, 0.35)",
      accentColor: "#E0703C",
      renderIcon: () => <EmailIcon size={28} />,
    },
  ];

  return (
    <footer
      id="footer"
      className="section-ocean-abyssal"
      style={{
        position: "relative",
        paddingBottom: "4.5rem",
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
            maxWidth: "1000px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {/* Section heading reformulada & destacada */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "2.75rem" }}
          >
            {/* Status indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 12px #10B981, 0 0 4px #10B981",
                }}
              />
              <span
                className="maralto-label-dark"
                style={{
                  letterSpacing: "0.14em",
                  color: "var(--accent-pelagic)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                }}
              >
                CANAIS DE CONTATO & REDES OFICIAIS
              </span>
            </div>

            <h2
              className="text-h1"
              style={{
                color: "var(--text-primary-on-dark)",
                marginBottom: "1rem",
                letterSpacing: "-0.025em",
              }}
            >
              Vamos conversar?
            </h2>

            <p
              style={{
                color: "var(--text-secondary-on-dark)",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                lineHeight: 1.6,
                maxWidth: "720px",
                margin: 0,
              }}
            >
              Estou disponível para novos projetos, desenvolvimento full-stack sob medida,
              consultorias e oportunidades. Escolha o canal de sua preferência abaixo:
            </p>
          </motion.div>

          {/* Grid dos 4 Cards de Contato Destacados */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="contact-cards-grid"
          >
            {contactChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className={`contact-action-card ${channel.cardClass}`}
              >
                {/* Top Row: Icon + Badge */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      backgroundColor: channel.iconBg,
                      border: `1px solid ${channel.iconBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 16px rgba(0, 0, 0, 0.3)`,
                      flexShrink: 0,
                    }}
                  >
                    {channel.renderIcon()}
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: channel.accentColor,
                      backgroundColor: "rgba(8, 20, 32, 0.7)",
                      border: `1px solid ${channel.iconBorder}`,
                      padding: "0.35rem 0.65rem",
                      borderRadius: "999px",
                    }}
                  >
                    {channel.badge}
                  </span>
                </div>

                {/* Center / Title & Handle */}
                <div style={{ marginBottom: "1rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: "1.35rem",
                      lineHeight: 1.2,
                      color: "var(--text-primary-on-dark)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {channel.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: channel.accentColor,
                      display: "block",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {channel.handle}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    color: "var(--text-secondary-on-dark)",
                    marginBottom: "1.5rem",
                    flexGrow: 1,
                  }}
                >
                  {channel.description}
                </p>

                {/* Bottom CTA Pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-primary-on-dark)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(88, 139, 158, 0.25)",
                    padding: "0.65rem 1rem",
                    borderRadius: "8px",
                    width: "100%",
                    justifyContent: "center",
                    transition: "all 0.25s ease",
                  }}
                >
                  {channel.cta}
                </div>
              </a>
            ))}
          </motion.div>

          {/* Quick Direct Contact Bar (Telefone & Email Direto) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="contact-quick-bar"
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent-pelagic)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                LINHA DIRETA DE ATENDIMENTO
              </span>
              <div className="contact-quick-links">
                <a
                  href="tel:+5519995799224"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
                    color: "var(--text-primary-on-dark)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--signal-amber-dark)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary-on-dark)")}
                >
                  <PhoneIcon size={18} />
                  +55 (19) 99579-9224
                </a>
                <span className="hidden sm:inline" style={{ color: "rgba(88, 139, 158, 0.4)" }}>•</span>
                <a
                  href="mailto:thaua19felipe@gmail.com"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
                    color: "var(--text-secondary-on-dark)",
                    transition: "color 0.25s ease",
                    wordBreak: "break-all",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--signal-amber-dark)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary-on-dark)")}
                >
                  thaua19felipe@gmail.com
                </a>
              </div>
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--text-secondary-on-dark)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              📍 Campinas & São Paulo · Atendimento Global / Remoto
            </div>
          </motion.div>

          {/* Footer bottom — Logo + Copyright Responsivo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="footer-bottom-bar"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              <img
                src="/Logo_2_Horizontal_PNG.png"
                alt="Thauã Felipe — Engenheiro da Computação"
                style={{ height: "32px", width: "auto", opacity: 0.85, objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-secondary-on-dark)",
                opacity: 0.5,
              }}
            >
              THAUÃ FELIPE © 2026 · ENGENHEIRO DA COMPUTAÇÃO & DESENVOLVEDOR FULL-STACK
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
