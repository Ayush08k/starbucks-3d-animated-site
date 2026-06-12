"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCanvasSequence } from "@/hooks/useCanvasSequence";
import { getSequencePath } from "@/lib/utils";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const getFramePath = useMemo(() => {
    return (index: number) => getSequencePath(index, 90);
  }, []);

  useCanvasSequence({
    frameCount: 90,
    getFramePath,
    canvasRef,
    containerRef,
  });

  return (
    <section id="home" ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/60 to-transparent" />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-start">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="px-6 md:px-16 lg:px-24 max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <p
                className="text-[#C49A6C] text-[0.65rem] md:text-xs uppercase mb-6"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.35em",
                }}
              >
                Est. 2019 — Artisan Roasters
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl text-white font-semibold leading-[1.1] mb-8"
              style={{
                fontFamily: "var(--font-playfair)",
                letterSpacing: "0.02em",
              }}
            >
              Brewed with
              <br />
              <span className="italic text-[#C49A6C]">Precision.</span>
              <br />
              Served with{" "}
              <span className="italic">Soul.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/50 text-sm md:text-base leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Experience artisan coffee like never before. Every cup is a
              journey from mountain farms to your fingertips.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 flex-wrap"
            >
              <a href="#menu" className="btn-cta">
                EXPLORE MENU
              </a>
              <a href="#story" className="btn-outline">
                OUR STORY
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span
            className="text-white/30 text-[0.6rem] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.25em",
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#C49A6C] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
