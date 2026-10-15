"use client";

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
  return (
    <>
      {/* Global custom cursor */}
      <CustomCursor />

      {/* Luz de mergulhador — segue o cursor em todas as seções escuras */}
      <MouseLightEffect />

      <main style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
        {/* Bolhas dinâmicas de submersão ativadas com o scroll descendente */}
        <SubmersionBubbles />

        {/* Batimetry altimeter ruler */}
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
    </>
  );
}
