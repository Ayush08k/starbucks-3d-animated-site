"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryData } from "@/data/galleryData";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative min-h-screen py-32 md:py-44 bg-[#0E0E0E] flex flex-col justify-center">
      <div className="w-full">
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
            Gallery
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold mb-6"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "0.02em" }}
          >
            Moments in <span className="italic text-[#C49A6C]">Motion</span>
          </h2>
          <div className="section-divider mx-auto mt-4" />
        </motion.div>

        {/* Grid - 3 Columns, 2 Rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full"
        >
          {galleryData.map((img) => (
            <motion.div
              key={img.id}
              variants={staggerItem}
              layoutId={`gallery-${img.id}`}
              onClick={() => setSelectedImage(img.id)}
              className="relative overflow-hidden cursor-pointer group"
            >
              <div className="aspect-square relative overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${img.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-[#0E0E0E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span
                    className="text-white text-[0.6rem] uppercase tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#0E0E0E]/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              layoutId={`gallery-${selectedImage}`}
              className="relative w-full max-w-4xl aspect-video overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${galleryData.find((g) => g.id === selectedImage)?.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>

            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <span className="text-2xl">✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
