"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if already played this session
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("maralto-intro-played");
      if (played) {
        setIsVisible(false);
        onComplete();
        return;
      }
    }

    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay blocked — skip to site
        handleVideoEnd();
      });
    };

    video.addEventListener("canplaythrough", playVideo, { once: true });

    // Fallback: if video doesn't load in 3s, skip
    const fallbackTimeout = setTimeout(() => {
      if (!hasPlayed) handleVideoEnd();
    }, 3000);

    return () => {
      video.removeEventListener("canplaythrough", playVideo);
      clearTimeout(fallbackTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideoEnd = () => {
    if (hasPlayed) return;
    setHasPlayed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("maralto-intro-played", "1");
    }
    setIsVisible(false);
    setTimeout(() => onComplete(), 1400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#08131A",
            overflow: "hidden",
          }}
        >
          {/* Video fullscreen */}
          <video
            ref={videoRef}
            src="/video.mp4"
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Subtle dark vignette overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 40%, #08131A 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Telemetry indicator bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "2rem",
              right: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <span className="maralto-telemetry-dot" />
            <span className="maralto-label-dark">INICIALIZANDO SISTEMA</span>
          </motion.div>

          {/* Logo top-left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "2rem",
              left: "2.5rem",
            }}
          >
            <svg
              width="40"
              height="20"
              viewBox="0 0 48 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12C8 12 10 2 16 2C22 2 26 22 32 22C38 22 40 12 48 12"
                stroke="#EEF2F3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M0 12C8 12 10 22 16 22C22 22 26 2 32 2C38 2 40 12 48 12"
                stroke="#EEF2F3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
