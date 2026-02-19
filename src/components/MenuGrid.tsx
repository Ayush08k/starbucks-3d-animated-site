"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { menuData } from "@/data/menuData";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function MenuGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="menu" className="relative min-h-screen py-32 md:py-44 bg-[#0E0E0E] flex flex-col justify-center overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-24 max-w-4xl mx-auto px-6"
        >
          <p
            className="text-[#C49A6C] text-[0.65rem] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.35em" }}
          >
            The Menu
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold mb-6"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "0.02em" }}
          >
            Crafted for the{" "}
            <span className="italic text-[#C49A6C]">Curious</span>
          </h2>
          <div className="section-divider mx-auto mt-8" />
        </motion.div>

        {/* Bento Grid - Full Width */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-full"
        >
          {menuData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              className={`group relative overflow-hidden cursor-pointer ${
                index === 0
                  ? "lg:col-span-2 lg:row-span-2"
                  : ""
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-square" : "aspect-[4/3] lg:aspect-auto lg:h-[45vh]"
                }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/60 to-[#0E0E0E]/20 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <span
                    className="text-[#C49A6C] text-[0.55rem] uppercase block mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.3em",
                    }}
                  >
                    {item.subtitle}
                  </span>
                  <h3
                    className="text-xl md:text-2xl text-white font-semibold mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-4 max-w-sm">
                    {item.description}
                  </p>

                  {/* Price + Arrow — revealed on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: hoveredId === item.id ? 1 : 0.6,
                      y: hoveredId === item.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between"
                  >
                    <span
                      className="text-white text-lg font-medium"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.price}
                    </span>
                    <span className="text-[#C49A6C] text-xl transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
