"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloadImages } from "@/hooks/usePreloadImages";
import { getSequencePath } from "@/lib/utils";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  const paths = useMemo(
    () => Array.from({ length: 90 }, (_, i) => getSequencePath(i + 1)),
    []
  );

  const { loaded } = usePreloadImages(paths, (p) => {
    setProgress(Math.round(p * 100));
  });

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 800);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [loaded, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0E0E0E]"
        >
          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1
              className="text-3xl md:text-5xl font-bold text-white uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-playfair)",
              }}
            >
              STARBUCKS CAFÉ
            </h1>
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="block w-8 h-[1px] bg-[#C49A6C]" />
              <span
                className="text-[#C49A6C] text-[0.65rem] uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.3em",
                }}
              >
                Coffee
              </span>
              <span className="block w-8 h-[1px] bg-[#C49A6C]" />
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 md:w-64">
            <div className="h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#C49A6C]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <p
              className="text-center text-white/40 text-[0.65rem] mt-4"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.2em",
              }}
            >
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
