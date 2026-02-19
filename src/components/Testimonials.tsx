"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialData } from "@/data/testimonialData";
import { fadeUp } from "@/lib/animations";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonialData.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const testimonial = testimonialData[current];

  return (
    <section className="relative py-32 md:py-44 bg-[#0E0E0E]">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <p
            className="text-[#C49A6C] text-[0.65rem] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.35em" }}
          >
            Testimonials
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold mb-6"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "0.02em" }}
          >
            Words That{" "}
            <span className="italic text-[#C49A6C]">Linger</span>
          </h2>
          <div className="section-divider mx-auto mt-4" />
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-3xl"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-8">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-[#C49A6C] text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-white/80 text-lg md:text-2xl leading-relaxed mb-10 italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p
                  className="text-white text-sm font-medium mb-1"
                  style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-[#C49A6C] text-[0.65rem] uppercase"
                  style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.2em" }}
                >
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonialData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-[#C49A6C] w-6"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
