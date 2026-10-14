"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import NavbarLateral from "@/components/NavbarLateral";
import CustomCursor from "@/components/CustomCursor";
import MouseLightEffect from "@/components/MouseLightEffect";
import SubmersionBubbles from "@/components/SubmersionBubbles";
import HeroSection from "@/components/HeroSection";
import CasesSection from "@/components/CasesSection";
import EvolutionSection from "@/components/EvolutionSection";
import InterludeSection from "@/components/InterludeSection";
import StackSection from "@/components/StackSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      {/* Global custom cursor */}
      <CustomCursor />

      {/* Luz de mergulhador — segue o cursor em todas as seções escuras */}
      <MouseLightEffect />

      {/* Loading screen — fixed overlay, crossfades out */}
      <LoadingScreen onComplete={() => setLoadingDone(true)} />

      {/* Page reveal — entire site rises into view after loading */}
      <AnimatePresence>
        {loadingDone && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <main style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
              {/* Bolhas dinâmicas de submersão ativadas com o scroll descendente */}
              <SubmersionBubbles />

              {/* Batimetry altimeter ruler — appears after loading */}
              <NavbarLateral />

              {/* 00 // 00m — SUPERFÍCIE */}
              <HeroSection />

              {/* 01 // -120m — ZONA EUFÓTICA */}
              <CasesSection />

              {/* 02 // -350m — ZONA MESOPELÁGICA */}
              <EvolutionSection />

              {/* Interlude — Manifesto */}
              <InterludeSection />

              {/* 03 // -700m — ZONA BATIAL */}
              <StackSection />

              {/* 04 // -950m — ZONA ABISSAL */}
              <FooterSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
