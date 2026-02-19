"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations";

const storyBlocks = [
  {
    subtitle: "Origin",
    title: "From Mountain Farms",
    text: "Our beans are hand-picked at dawn from the misty highlands of Ethiopia, Colombia, and Sumatra — where altitude meets artistry. Each origin tells a different chapter of flavor.",
  },
  {
    subtitle: "Craft",
    title: "Roasted by Instinct",
    text: "Our master roasters don't follow recipes — they follow senses. Small-batch roasting in copper drums, guided by the crack of the bean, the shimmer of oil, the shifting aroma.",
  },
  {
    subtitle: "Philosophy",
    title: "Sustainability First",
    text: "We pay 3× fair-trade prices. We fund water infrastructure in farming communities. Every bag you open was grown with care for both the land and the people who tend it.",
  },
];

export default function CoffeeStory() {
  return (
    <section id="story" className="relative min-h-screen py-32 md:py-44 bg-[#0E0E0E] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-24"
        >
          <p
            className="text-[#C49A6C] text-[0.65rem] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.35em" }}
          >
            Our Story
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold mb-6"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "0.02em" }}
          >
            From Bean to{" "}
            <span className="italic text-[#C49A6C]">Belief</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            From mountain farms to porcelain cups, every bean carries a story.
            We don&apos;t just serve coffee — we curate moments.
          </p>
          <div className="section-divider mx-auto mt-8" />
        </motion.div>

        {/* Story Blocks */}
        <div className="space-y-32 md:space-y-44">
          {storyBlocks.map((block, i) => (
            <div
              key={block.subtitle}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 md:gap-20`}
            >
              {/* Text Side */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={i % 2 === 0 ? slideInLeft : slideInRight}
                className="flex-1 max-w-lg"
              >
                <span
                  className="text-[#C49A6C] text-[0.6rem] uppercase block mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.3em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} — {block.subtitle}
                </span>
                <h3
                  className="text-2xl md:text-4xl text-white font-semibold mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {block.title}
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-[1.8]">
                  {block.text}
                </p>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={i % 2 === 0 ? slideInRight : slideInLeft}
                className="flex-1 w-full max-w-lg"
              >
                <div className="relative aspect-[4/5] overflow-hidden group">
                  <div
                    className="absolute inset-0 bg-[#1A1A1A]"
                    style={{
                      backgroundImage: `url(/images/coffee/story_${block.subtitle.toLowerCase()}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-[#0E0E0E]/20 group-hover:bg-[#0E0E0E]/10 transition-all duration-700" />
                  {/* Frame Border */}
                  <div className="absolute inset-4 border border-white/10" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
