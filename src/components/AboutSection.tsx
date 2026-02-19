"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations";

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-32 md:py-44 bg-[#0E0E0E] overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C49A6C]/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left - Visual */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden glass p-4">
              <div
                className="w-full h-full bg-[#1A1A1A]"
                style={{
                  backgroundImage: `url(/images/coffee/about_brand.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C49A6C] rounded-full flex items-center justify-center p-4 text-center">
                <span 
                  className="text-black text-[0.6rem] font-bold uppercase tracking-widest leading-tight"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Est. 2024 NYC
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
          >
            <p
              className="text-[#C49A6C] text-[0.65rem] uppercase mb-4"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.35em" }}
            >
              The Brand
            </p>
            <h2
              className="text-4xl md:text-6xl text-white font-semibold mb-8 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Beyond the <br />
              <span className="italic text-[#C49A6C]">Surface</span>
            </h2>
            
            <div className="space-y-6 text-white/50 text-sm md:text-base leading-relaxed">
              <p>
                Starbucks Café was born from a simple obsession: to defy the expected.                We believe that coffee is more than a beverage; it is a ritual of precision 
                and a catalyst for human connection.
              </p>
              <p>
                Our flagship roastery in Soho serves as a laboratory for taste. Here, 
                we experiment with unconventional fermentation processes and roasting 
                curves to extract flavors that shift your perspective.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>Vision</h4>
                <p className="text-white/30 text-xs leading-relaxed">To elevate the daily ritual into an immersive sensory journey.</p>
              </div>
              <div>
                <h4 className="text-white text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>Values</h4>
                <p className="text-white/30 text-xs leading-relaxed">Radical transparency, uncompromising quality, and soulful service.</p>
              </div>
            </div>

            <div className="mt-12">
              <button className="btn-cta">
                JOIN OUR JOURNEY
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
