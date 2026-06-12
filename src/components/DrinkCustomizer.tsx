"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

type CupSize = "Tall" | "Grande" | "Venti";
type MilkType = "Whole Milk" | "Oat Milk" | "Almond Milk" | "Coconut Milk";
type SyrupType = "Vanilla" | "Caramel" | "Hazelnut" | "None";

export default function DrinkCustomizer() {
  const { addToCart, setCartOpen } = useCart();

  // Customizer state
  const [size, setSize] = useState<CupSize>("Grande");
  const [milk, setMilk] = useState<MilkType>("Oat Milk");
  const [shots, setShots] = useState<number>(2);
  const [syrup, setSyrup] = useState<SyrupType>("Vanilla");
  const [syrupPumps, setSyrupPumps] = useState<number>(2);
  const [whippedCream, setWhippedCream] = useState<boolean>(true);
  const [caramelDrizzle, setCaramelDrizzle] = useState<boolean>(true);
  const [cinnamon, setCinnamon] = useState<boolean>(false);

  // Price Calculation
  const getBasePrice = () => {
    switch (size) {
      case "Tall":
        return 3.95;
      case "Grande":
        return 4.50;
      case "Venti":
        return 4.95;
    }
  };

  const getMilkPrice = () => (milk === "Whole Milk" ? 0 : 0.70);
  const getShotsPrice = () => Math.max(0, shots - 1) * 0.80; // 1 shot included, extra is $0.80 each
  const getSyrupPrice = () => (syrup === "None" ? 0 : syrupPumps * 0.15);
  const getToppingsPrice = () => {
    let total = 0;
    if (whippedCream) total += 0.50;
    if (caramelDrizzle) total += 0.40;
    if (cinnamon) total += 0.20;
    return total;
  };

  const totalPrice = getBasePrice() + getMilkPrice() + getShotsPrice() + getSyrupPrice() + getToppingsPrice();

  // SVG parameters
  const liquidBaseY = 260;
  const liquidMaxHeight = size === "Tall" ? 150 : size === "Grande" ? 190 : 230;
  const espressoHeight = shots * 35;
  const milkHeight = Math.max(0, liquidMaxHeight - espressoHeight);

  const espressoY = liquidBaseY - espressoHeight;
  const milkY = espressoY - milkHeight;

  const handleAddToOrder = () => {
    const toppingsList = [];
    if (whippedCream) toppingsList.push("Whipped Cream");
    if (caramelDrizzle) toppingsList.push("Caramel Drizzle");
    if (cinnamon) toppingsList.push("Cinnamon Powder");

    const toppingsStr = toppingsList.length > 0 ? ` + Toppings: ${toppingsList.join(", ")}` : "";
    const syrupStr = syrup !== "None" && syrupPumps > 0 ? ` + ${syrupPumps} pumps ${syrup}` : "";

    const item = {
      id: Date.now(), // Unique ID for custom drink
      name: `Custom Crafted ${size}`,
      subtitle: `${milk}${syrupStr}${toppingsStr}`,
      price: `$${totalPrice.toFixed(2)}`,
      image: "/sequences/coffee/coffee-scroll_001.webp",
      description: `A custom-tailored ${size} beverage crafted with ${milk}, ${shots} shots, and premium ingredients.`,
    };

    addToCart(item);
    setCartOpen(true);
  };

  return (
    <section id="customizer" className="relative py-24 md:py-32 bg-[#0E0E0E] overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#C49A6C]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[#C49A6C] text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.3em] block mb-3 font-mono font-bold"
          >
            Artisan Customizer
          </span>
          <h2
            className="text-3xl md:text-5xl text-white font-semibold uppercase tracking-wider"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Craft Your Cup
          </h2>
          <div className="w-12 h-[1px] bg-[#C49A6C] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Cup Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 p-8 md:p-12 relative">
            <div className="absolute top-4 left-4 text-white/20 text-[0.65rem] uppercase tracking-widest font-mono">
              Live Preview
            </div>

            {/* Cup Container */}
            <div className="relative w-64 h-96 flex items-center justify-center">
              <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl overflow-visible">
                <defs>
                  {/* Clip liquid inside the cup */}
                  <clipPath id="cup-clip">
                    <path d="M 45,20 L 155,20 L 135,260 L 65,260 Z" />
                  </clipPath>
                </defs>

                {/* Cup outline / Glass backing */}
                <path
                  d="M 45,20 L 155,20 L 135,260 L 65,260 Z"
                  fill="rgba(255,255,255,0.01)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                />

                {/* Masked Liquid layers */}
                <g clipPath="url(#cup-clip)">
                  {/* Espresso Layer */}
                  <motion.rect
                    x="0"
                    width="200"
                    fill="#3d2314"
                    animate={{ y: espressoY, height: espressoHeight }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  />

                  {/* Milk Layer */}
                  <motion.rect
                    x="0"
                    width="200"
                    fill={milk === "Whole Milk" ? "#fdfbf7" : milk === "Oat Milk" ? "#eae3d2" : milk === "Almond Milk" ? "#ebdcb9" : "#f5ebd5"}
                    animate={{ y: milkY, height: milkHeight }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  />

                  {/* Liquid surface foam reflection */}
                  <motion.ellipse
                    cx="100"
                    cy={milkY}
                    rx="50"
                    ry="6"
                    fill="rgba(255,255,255,0.2)"
                    animate={{ cy: milkY }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  />
                </g>

                {/* Whipped Cream Topping (drawn at the top) */}
                <AnimatePresence>
                  {whippedCream && (
                    <motion.path
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      d="M 45,22 C 55,0 75,-15 100,-15 C 125,-15 145,0 155,22 Z"
                      fill="#fbfaf5"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                    />
                  )}
                </AnimatePresence>

                {/* Caramel Drizzle Overlay */}
                <AnimatePresence>
                  {caramelDrizzle && (
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      d="M 50,30 Q 75,10 100,30 T 150,30"
                      fill="none"
                      stroke="#c98a3b"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  )}
                </AnimatePresence>

                {/* Cinnamon sprinkles */}
                <AnimatePresence>
                  {cinnamon && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <circle cx="80" cy="28" r="1.5" fill="#8b5a2b" />
                      <circle cx="100" cy="24" r="1" fill="#8b5a2b" />
                      <circle cx="120" cy="29" r="1.5" fill="#8b5a2b" />
                      <circle cx="90" cy="32" r="1.2" fill="#8b5a2b" />
                      <circle cx="110" cy="30" r="1" fill="#8b5a2b" />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Circular Starbucks-style badge */}
                <circle cx="100" cy="140" r="26" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <path d="M 85,140 C 85,120 115,120 115,140 C 115,150 85,150 85,140 Z" fill="none" stroke="#C49A6C" strokeWidth="1.5" />
                <text x="100" y="143" fill="#C49A6C" fontSize="6" fontWeight="bold" textAnchor="middle" letterSpacing="1">S.B.</text>

                {/* Cup Rim */}
                <ellipse cx="100" cy="20" rx="55" ry="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              </svg>
            </div>

            <div className="mt-8 text-center">
              <span className="text-white/40 text-[0.65rem] tracking-wider uppercase font-mono">ESTIMATED PRICE</span>
              <p className="text-3xl text-white font-semibold mt-1 font-mono">${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Right: Controls Panel */}
          <div className="lg:col-span-7 space-y-8">
            {/* Cup Size */}
            <div>
              <label className="text-white/40 text-[0.65rem] tracking-wider uppercase block mb-3 font-mono">1. Choose Size</label>
              <div className="grid grid-cols-3 gap-3">
                {(["Tall", "Grande", "Venti"] as CupSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`border p-3 text-xs tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                      size === s
                        ? "border-[#C49A6C] text-[#C49A6C] bg-[#C49A6C]/5"
                        : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Options */}
            <div>
              <label className="text-white/40 text-[0.65rem] tracking-wider uppercase block mb-3 font-mono">2. Milk Option</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["Whole Milk", "Oat Milk", "Almond Milk", "Coconut Milk"] as MilkType[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMilk(m)}
                    className={`border p-3 text-[10px] tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                      milk === m
                        ? "border-[#C49A6C] text-[#C49A6C] bg-[#C49A6C]/5"
                        : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Espresso Shots */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white/40 text-[0.65rem] tracking-wider uppercase font-mono">3. Espresso Shots</label>
                <span className="text-[#C49A6C] text-xs font-mono font-bold">{shots} {shots === 1 ? "Shot" : "Shots"}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShots(Math.max(1, shots - 1))}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/30 text-white hover:text-[#C49A6C] transition-colors cursor-pointer"
                >
                  -
                </button>
                <div className="flex-1 h-[2px] bg-white/10 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[#C49A6C]"
                    animate={{ width: `${(shots / 4) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => setShots(Math.min(4, shots + 1))}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/30 text-white hover:text-[#C49A6C] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Syrup Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white/40 text-[0.65rem] tracking-wider uppercase block mb-3 font-mono">4. Syrup Choice</label>
                <select
                  value={syrup}
                  onChange={(e) => setSyrup(e.target.value as SyrupType)}
                  className="w-full bg-[#141414] border border-white/10 text-white text-xs tracking-wider p-3 focus:outline-none focus:border-[#C49A6C] rounded-none cursor-pointer"
                >
                  <option value="None">NONE</option>
                  <option value="Vanilla">VANILLA</option>
                  <option value="Caramel">CARAMEL</option>
                  <option value="Hazelnut">HAZELNUT</option>
                </select>
              </div>

              {syrup !== "None" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-white/40 text-[0.65rem] tracking-wider uppercase font-mono">Syrup Pumps</label>
                    <span className="text-[#C49A6C] text-xs font-mono font-bold">{syrupPumps} {syrupPumps === 1 ? "Pump" : "Pumps"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSyrupPumps(Math.max(1, syrupPumps - 1))}
                      className="w-8 h-8 border border-white/10 flex items-center justify-center text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-white text-xs min-w-[20px] text-center font-mono">{syrupPumps}</span>
                    <button
                      onClick={() => setSyrupPumps(Math.min(6, syrupPumps + 1))}
                      className="w-8 h-8 border border-white/10 flex items-center justify-center text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Toppings Options */}
            <div>
              <label className="text-white/40 text-[0.65rem] tracking-wider uppercase block mb-3 font-mono">5. Add Toppings</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setWhippedCream(!whippedCream)}
                  className={`border p-4 text-xs tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    whippedCream
                      ? "border-[#C49A6C] text-[#C49A6C] bg-[#C49A6C]/5"
                      : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span>WHIPPED CREAM</span>
                  <span className="text-[9px] font-mono opacity-80">+$0.50</span>
                </button>
                <button
                  onClick={() => setCaramelDrizzle(!caramelDrizzle)}
                  className={`border p-4 text-xs tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    caramelDrizzle
                      ? "border-[#C49A6C] text-[#C49A6C] bg-[#C49A6C]/5"
                      : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span>CARAMEL DRIZZLE</span>
                  <span className="text-[9px] font-mono opacity-80">+$0.40</span>
                </button>
                <button
                  onClick={() => setCinnamon(!cinnamon)}
                  className={`border p-4 text-xs tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    cinnamon
                      ? "border-[#C49A6C] text-[#C49A6C] bg-[#C49A6C]/5"
                      : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span>CINNAMON</span>
                  <span className="text-[9px] font-mono opacity-80">+$0.20</span>
                </button>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                onClick={handleAddToOrder}
                className="w-full btn-cta text-center justify-center font-bold text-xs tracking-widest py-4 cursor-pointer"
              >
                ADD CUSTOM CUP TO ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
